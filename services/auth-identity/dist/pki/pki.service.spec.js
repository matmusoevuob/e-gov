"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const config_1 = require("@nestjs/config");
const pki_service_1 = require("./pki.service");
const pki_utils_1 = require("./utils/pki.utils");
const common_1 = require("@nestjs/common");
describe('PkiService', () => {
    let service;
    let mockCertPair;
    beforeAll(() => {
        mockCertPair = pki_utils_1.PkiUtils.generateMockGovCertificate({
            cn: 'Test Citizen Tajikistan',
            organization: 'Ministry of Technology',
            tin: '123456789012',
        });
    });
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                pki_service_1.PkiService,
                {
                    provide: config_1.ConfigService,
                    useValue: {
                        get: (key) => {
                            if (key === 'pki.allowSelfSignedTestCertificates')
                                return true;
                            if (key === 'pki.trustedRootsPem')
                                return [];
                            return null;
                        },
                    },
                },
            ],
        }).compile();
        service = module.get(pki_service_1.PkiService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    describe('validateCertificate', () => {
        it('should validate a valid X.509 government certificate', async () => {
            const result = await service.validateCertificate({
                certificatePem: mockCertPair.certPem,
                requireDigitalSignatureUsage: true,
            });
            expect(result.isValid).toBe(true);
            expect(result.validationErrors).toHaveLength(0);
            expect(result.certificateDetails.subject.commonName).toBe('Test Citizen Tajikistan');
            expect(result.certificateDetails.subject.tin).toBe('123456789012');
        });
        it('should throw BadRequestException if certificate string is invalid', async () => {
            await expect(service.validateCertificate({
                certificatePem: 'INVALID_PEM_STRING',
            })).rejects.toThrow(common_1.BadRequestException);
        });
    });
    describe('generateAuthChallenge & authenticateWithPki', () => {
        it('should generate challenge and authenticate successfully with valid signature', async () => {
            const challenge = service.generateAuthChallenge();
            expect(challenge.challengeId).toBeDefined();
            expect(challenge.challengeNonce).toContain('AUTH_GOV_TJ_CHALLENGE_');
            const cert = pki_utils_1.PkiUtils.parseCertificate(mockCertPair.certPem);
            const forge = require('node-forge');
            const privateKey = forge.pki.privateKeyFromPem(mockCertPair.privateKeyPem);
            const md = forge.md.sha256.create();
            md.update(challenge.challengeNonce, 'utf8');
            const signatureBytes = privateKey.sign(md);
            const signatureBase64 = forge.util.encode64(signatureBytes);
            const authResult = await service.authenticateWithPki({
                challengeId: challenge.challengeId,
                certificatePem: mockCertPair.certPem,
                signatureBase64,
            });
            expect(authResult.authenticated).toBe(true);
            expect(authResult.user.commonName).toBe('Test Citizen Tajikistan');
            expect(authResult.tokenType).toBe('PKI_X509_GOV_IDENTITY');
        });
        it('should fail authentication with invalid challenge ID', async () => {
            await expect(service.authenticateWithPki({
                challengeId: 'NON_EXISTENT_CHALLENGE_ID',
                certificatePem: mockCertPair.certPem,
                signatureBase64: 'dGVzdA==',
            })).rejects.toThrow(common_1.UnauthorizedException);
        });
    });
});
//# sourceMappingURL=pki.service.spec.js.map