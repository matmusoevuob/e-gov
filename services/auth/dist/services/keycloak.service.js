"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeycloakService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const index_js_1 = require("../types/index.js");
class KeycloakService {
    keycloakIssuer = process.env.KEYCLOAK_ISSUER || 'https://auth.egov.gov/auth/realms/egov-realm';
    secretKey = process.env.JWT_SECRET || 'super-secret-egov-keycloak-key-2026';
    /**
     * Exchanges authorization code from Keycloak OIDC SSO
     */
    async exchangeCode(code, redirectUri, clientId) {
        // Simulated OIDC Code exchange logic with Keycloak Realm
        if (!code || code === 'INVALID_CODE') {
            throw new Error('Invalid or expired Keycloak authorization code');
        }
        const mockUser = {
            id: 'usr_kc_987654321',
            nationalId: 'AA9876543',
            fullName: 'Elena Rostova',
            email: 'elena.rostova@egov.gov',
            phoneNumber: '+998901234567',
            role: index_js_1.UserRole.OFFICER,
            mfaEnabled: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        const payload = {
            iss: this.keycloakIssuer,
            sub: mockUser.id,
            aud: clientId,
            national_id: mockUser.nationalId,
            email: mockUser.email,
            name: mockUser.fullName,
            preferred_username: mockUser.email,
            realm_access: {
                roles: ['egov_user', 'egov_officer']
            }
        };
        const accessToken = jsonwebtoken_1.default.sign(payload, this.secretKey, { expiresIn: '1h' });
        const idToken = jsonwebtoken_1.default.sign({ ...payload, nonce: 'nonce_12345' }, this.secretKey, { expiresIn: '1h' });
        const refreshToken = jsonwebtoken_1.default.sign({ sub: mockUser.id, typ: 'Refresh' }, this.secretKey, { expiresIn: '1d' });
        return {
            tokenResponse: {
                access_token: accessToken,
                id_token: idToken,
                refresh_token: refreshToken,
                expires_in: 3600,
                token_type: 'Bearer'
            },
            user: mockUser
        };
    }
    /**
     * Verifies incoming Keycloak JWT token
     */
    verifyToken(token) {
        try {
            return jsonwebtoken_1.default.verify(token, this.secretKey);
        }
        catch (err) {
            throw new Error(`Invalid Keycloak Token: ${err.message}`);
        }
    }
}
exports.KeycloakService = KeycloakService;
