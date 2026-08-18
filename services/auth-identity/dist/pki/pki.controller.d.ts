import { PkiService } from './pki.service';
import { ValidateCertificateDto } from './dto/validate-cert.dto';
import { VerifySignatureDto } from './dto/verify-signature.dto';
import { RequestAuthChallengeDto, VerifyAuthChallengeDto } from './dto/pki-auth.dto';
export declare class PkiController {
    private readonly pkiService;
    constructor(pkiService: PkiService);
    validateCertificate(dto: ValidateCertificateDto): Promise<{
        isValid: boolean;
        validationErrors: string[];
        certificateDetails: import("./utils/pki.utils").ParsedCertificateInfo;
    }>;
    verifySignature(dto: VerifySignatureDto): Promise<{
        verified: boolean;
        certInfo: import("./utils/pki.utils").ParsedCertificateInfo;
    }>;
    requestChallenge(_dto: RequestAuthChallengeDto): Promise<{
        challengeId: string;
        challengeNonce: string;
        expiresAt: string;
    }>;
    authenticateWithPki(dto: VerifyAuthChallengeDto): Promise<import("./pki.service").PkiAuthResult>;
    getCaCertificates(): Promise<{
        count: number;
        trustedRoots: string[];
    }>;
    generateTestCert(cn?: string, tin?: string): Promise<{
        certPem: string;
        privateKeyPem: string;
    }>;
}
