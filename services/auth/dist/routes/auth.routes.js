"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAuthRouter = createAuthRouter;
const express_1 = require("express");
const index_js_1 = require("../types/index.js");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function createAuthRouter(pkiService, keycloakService, dbService) {
    const router = (0, express_1.Router)();
    const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-egov-keycloak-key-2026';
    /**
     * POST /api/v1/auth/login
     * Authenticates National ID + Password + MFA
     */
    router.post('/login', (req, res) => {
        try {
            const parseResult = index_js_1.LoginSchema.safeParse(req.body);
            if (!parseResult.success) {
                return res.status(400).json({
                    status: 'ERROR',
                    code: 'INVALID_INPUT',
                    errors: parseResult.error.errors
                });
            }
            const { nationalId, password, mfaCode } = parseResult.data;
            const user = dbService.findUserByNationalId(nationalId);
            if (!user) {
                return res.status(401).json({
                    status: 'ERROR',
                    code: 'UNAUTHORIZED',
                    message: 'Invalid National ID or Password'
                });
            }
            // Check Password (for demo standard password 'GovSecure2026!')
            if (password !== 'GovSecure2026!') {
                return res.status(401).json({
                    status: 'ERROR',
                    code: 'UNAUTHORIZED',
                    message: 'Invalid National ID or Password'
                });
            }
            // MFA Enforcement
            if (user.mfaEnabled) {
                if (!mfaCode) {
                    return res.status(422).json({
                        status: 'ERROR',
                        code: 'MFA_REQUIRED',
                        message: 'Multi-Factor Authentication (MFA) code is required for this account'
                    });
                }
                if (mfaCode !== user.mfaSecret) {
                    return res.status(401).json({
                        status: 'ERROR',
                        code: 'INVALID_MFA',
                        message: 'Invalid MFA verification code provided'
                    });
                }
            }
            const token = jsonwebtoken_1.default.sign({
                sub: user.id,
                nationalId: user.nationalId,
                role: user.role,
                name: user.fullName,
                email: user.email
            }, JWT_SECRET, { expiresIn: '8h' });
            const session = dbService.createSession(user.id, undefined, req.ip, req.headers['user-agent']);
            return res.status(200).json({
                status: 'SUCCESS',
                message: 'Authentication successful',
                data: {
                    token,
                    sessionToken: session.sessionToken,
                    expiresIn: 28800,
                    user: {
                        id: user.id,
                        nationalId: user.nationalId,
                        fullName: user.fullName,
                        email: user.email,
                        role: user.role
                    }
                }
            });
        }
        catch (err) {
            return res.status(500).json({ status: 'ERROR', message: err.message });
        }
    });
    /**
     * POST /api/v1/auth/verify-cert
     * Validates PKI X.509 Digital Certificate & mTLS token
     */
    router.post('/verify-cert', (req, res) => {
        try {
            const parseResult = index_js_1.VerifyCertSchema.safeParse(req.body);
            if (!parseResult.success) {
                return res.status(400).json({
                    status: 'ERROR',
                    code: 'INVALID_INPUT',
                    errors: parseResult.error.errors
                });
            }
            const { certificatePem, signaturePem, challengeData } = parseResult.data;
            const verification = pkiService.verifyCertificate(certificatePem, signaturePem, challengeData);
            if (!verification.valid) {
                return res.status(400).json({
                    status: 'ERROR',
                    code: verification.code,
                    message: verification.message,
                    verification
                });
            }
            // Issue PKI-bound authentication token if nationalId matches registered user
            let matchedUser = verification.subject?.nationalId ? dbService.findUserByNationalId(verification.subject.nationalId) : undefined;
            return res.status(200).json({
                status: 'SUCCESS',
                message: 'Digital PKI Certificate verified successfully',
                data: {
                    verification,
                    user: matchedUser ? {
                        id: matchedUser.id,
                        nationalId: matchedUser.nationalId,
                        fullName: matchedUser.fullName,
                        role: matchedUser.role
                    } : null
                }
            });
        }
        catch (err) {
            return res.status(500).json({ status: 'ERROR', message: err.message });
        }
    });
    /**
     * POST /api/v1/auth/sso
     * Keycloak OIDC SSO Token Exchange
     */
    router.post('/sso', async (req, res) => {
        try {
            const parseResult = index_js_1.SsoSchema.safeParse(req.body);
            if (!parseResult.success) {
                return res.status(400).json({
                    status: 'ERROR',
                    code: 'INVALID_INPUT',
                    errors: parseResult.error.errors
                });
            }
            const { code, redirectUri, clientId } = parseResult.data;
            const ssoResult = await keycloakService.exchangeCode(code, redirectUri, clientId);
            const session = dbService.createSession(ssoResult.user.id, ssoResult.tokenResponse.id_token, req.ip, req.headers['user-agent']);
            return res.status(200).json({
                status: 'SUCCESS',
                message: 'Keycloak SSO authentication successful',
                data: {
                    tokens: ssoResult.tokenResponse,
                    sessionToken: session.sessionToken,
                    user: ssoResult.user
                }
            });
        }
        catch (err) {
            return res.status(401).json({ status: 'ERROR', code: 'SSO_FAILED', message: err.message });
        }
    });
    /**
     * GET /api/v1/auth/me
     */
    router.get('/me', (req, res) => {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ status: 'ERROR', code: 'UNAUTHORIZED', message: 'Missing Authorization header' });
        }
        const token = authHeader.split(' ')[1];
        try {
            const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
            return res.status(200).json({
                status: 'SUCCESS',
                data: {
                    user: decoded
                }
            });
        }
        catch (err) {
            return res.status(401).json({ status: 'ERROR', code: 'INVALID_TOKEN', message: 'Token verification failed' });
        }
    });
    /**
     * GET /api/v1/auth/openapi.json
     */
    router.get('/openapi.json', (req, res) => {
        return res.status(200).json({
            openapi: '3.0.3',
            info: {
                title: 'Unified e-ID Authentication Microservice API',
                version: '1.0.0',
                description: 'Keycloak OIDC & PKI Certificate Authentication Service for e-Gov System'
            },
            paths: {
                '/api/v1/auth/login': {
                    post: {
                        summary: 'Authenticate National ID & Password with MFA',
                        requestBody: { required: true, content: { 'application/json': {} } },
                        responses: { '200': { description: 'Authenticated' }, '401': { description: 'Unauthorized' } }
                    }
                },
                '/api/v1/auth/verify-cert': {
                    post: {
                        summary: 'Verify X.509 Digital Certificate & mTLS token',
                        requestBody: { required: true, content: { 'application/json': {} } },
                        responses: { '200': { description: 'Verified' }, '400': { description: 'Invalid Certificate' } }
                    }
                },
                '/api/v1/auth/sso': {
                    post: {
                        summary: 'Exchange Keycloak OIDC Authorization Code',
                        responses: { '200': { description: 'SSO Success' } }
                    }
                }
            }
        });
    });
    return router;
}
