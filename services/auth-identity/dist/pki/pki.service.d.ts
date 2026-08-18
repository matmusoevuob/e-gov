import { ConfigService } from '@nestjs/config';
import { ParsedCertificateInfo } from './utils/pki.utils';
import { ValidateCertificateDto } from './dto/validate-cert.dto';
import { VerifySignatureDto } from './dto/verify-signature.dto';
import { VerifyAuthChallengeDto } from './dto/pki-auth.dto';
export interface PkiAuthResult {
    authenticated: boolean;
    user: {
        tin?: string;
        pinfl?: string;
        commonName: string;
        organization?: string;
        country?: string;
        serialNumber?: string;
    };
    certFingerprint: string;
    issuedAt: string;
    tokenType: string;
}
export declare class PkiService {
    private readonly configService;
    private readonly logger;
    private readonly activeChallenges;
    constructor(configService: ConfigService);
    validateCertificate(dto: ValidateCertificateDto): Promise<{
        isValid: boolean;
        validationErrors: string[];
        certificateDetails: ParsedCertificateInfo;
    }>;
    verifySignature(dto: VerifySignatureDto): Promise<{
        verified: boolean;
        certInfo: ParsedCertificateInfo;
    }>;
    generateAuthChallenge(): {
        challengeId: string;
        challengeNonce: string;
        expiresAt: string;
    };
    authenticateWithPki(dto: VerifyAuthChallengeDto): Promise<PkiAuthResult>;
    getCaCertificates(): {
        count: number;
        trustedRoots: string[];
    };
    generateMockCert(cn: string, tin?: string): {
        certPem: string;
        privateKeyPem: string;
    };
    private cleanExpiredChallenges;
}
