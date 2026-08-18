"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var PkiService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PkiService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const pki_utils_1 = require("./utils/pki.utils");
const crypto_1 = require("crypto");
let PkiService = PkiService_1 = class PkiService {
    constructor(configService) {
        this.configService = configService;
        this.logger = new common_1.Logger(PkiService_1.name);
        this.activeChallenges = new Map();
    }
    async validateCertificate(dto) {
        const errors = [];
        let cert;
        try {
            cert = pki_utils_1.PkiUtils.parseCertificate(dto.certificatePem);
        }
        catch (e) {
            throw new common_1.BadRequestException(`Failed to parse X.509 Certificate: ${e.message}`);
        }
        const certInfo = pki_utils_1.PkiUtils.extractCertificateInfo(cert);
        if (!certInfo.validity.isCurrentlyValid) {
            if (new Date() < certInfo.validity.notBefore) {
                errors.push(`Certificate is not yet valid (valid from: ${certInfo.validity.notBefore.toISOString()})`);
            }
            else {
                errors.push(`Certificate expired on ${certInfo.validity.notAfter.toISOString()}`);
            }
        }
        if (dto.requireDigitalSignatureUsage !== false) {
            if (!certInfo.keyUsage.includes('digitalSignature') && !certInfo.keyUsage.includes('nonRepudiation')) {
                errors.push('Certificate missing required Key Usage attributes: digitalSignature or nonRepudiation');
            }
        }
        const allowSelfSigned = this.configService.get('pki.allowSelfSignedTestCertificates');
        if (certInfo.isSelfSigned && !allowSelfSigned) {
            errors.push('Self-signed certificates are not trusted in production environment');
        }
        return {
            isValid: errors.length === 0,
            validationErrors: errors,
            certificateDetails: certInfo,
        };
    }
    async verifySignature(dto) {
        let cert;
        try {
            cert = pki_utils_1.PkiUtils.parseCertificate(dto.certificatePem);
        }
        catch (e) {
            throw new common_1.BadRequestException(`Invalid Certificate PEM: ${e.message}`);
        }
        const certInfo = pki_utils_1.PkiUtils.extractCertificateInfo(cert);
        if (!certInfo.validity.isCurrentlyValid) {
            throw new common_1.UnauthorizedException('Certificate has expired or is not yet active');
        }
        const verified = pki_utils_1.PkiUtils.verifySignature(cert, dto.challengeData, dto.signatureBase64);
        return {
            verified,
            certInfo,
        };
    }
    generateAuthChallenge() {
        const challengeId = `TJ-GOV-AUTH-${(0, crypto_1.randomUUID)()}`;
        const nonce = (0, crypto_1.randomBytes)(32).toString('hex');
        const now = Date.now();
        const expiresAt = now + 5 * 60 * 1000;
        this.activeChallenges.set(challengeId, {
            challengeId,
            nonce,
            createdAt: now,
            expiresAt,
        });
        this.cleanExpiredChallenges();
        return {
            challengeId,
            challengeNonce: `AUTH_GOV_TJ_CHALLENGE_${nonce}_${challengeId}`,
            expiresAt: new Date(expiresAt).toISOString(),
        };
    }
    async authenticateWithPki(dto) {
        const active = this.activeChallenges.get(dto.challengeId);
        if (!active) {
            throw new common_1.UnauthorizedException('Invalid or expired PKI authentication challenge ID');
        }
        if (Date.now() > active.expiresAt) {
            this.activeChallenges.delete(dto.challengeId);
            throw new common_1.UnauthorizedException('PKI authentication challenge has expired');
        }
        const expectedChallengeString = `AUTH_GOV_TJ_CHALLENGE_${active.nonce}_${active.challengeId}`;
        const { verified, certInfo } = await this.verifySignature({
            certificatePem: dto.certificatePem,
            challengeData: expectedChallengeString,
            signatureBase64: dto.signatureBase64,
        });
        if (!verified) {
            throw new common_1.UnauthorizedException('Digital signature verification failed for PKI challenge');
        }
        this.activeChallenges.delete(dto.challengeId);
        this.logger.log(`PKI Authentication successful for user TIN/CN: ${certInfo.subject.tin || certInfo.subject.commonName}`);
        return {
            authenticated: true,
            user: {
                tin: certInfo.subject.tin,
                pinfl: certInfo.subject.pinfl,
                commonName: certInfo.subject.commonName,
                organization: certInfo.subject.organization,
                country: certInfo.subject.country,
                serialNumber: certInfo.subject.serialNumber,
            },
            certFingerprint: certInfo.fingerprintSha256,
            issuedAt: new Date().toISOString(),
            tokenType: 'PKI_X509_GOV_IDENTITY',
        };
    }
    getCaCertificates() {
        const roots = this.configService.get('pki.trustedRootsPem') || [];
        return {
            count: roots.length,
            trustedRoots: roots,
        };
    }
    generateMockCert(cn, tin) {
        return pki_utils_1.PkiUtils.generateMockGovCertificate({
            cn,
            tin: tin || '123456789',
            organization: 'Ministry of Digital Technologies Tajikistan',
        });
    }
    cleanExpiredChallenges() {
        const now = Date.now();
        for (const [id, challenge] of this.activeChallenges.entries()) {
            if (now > challenge.expiresAt) {
                this.activeChallenges.delete(id);
            }
        }
    }
};
exports.PkiService = PkiService;
exports.PkiService = PkiService = PkiService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], PkiService);
//# sourceMappingURL=pki.service.js.map