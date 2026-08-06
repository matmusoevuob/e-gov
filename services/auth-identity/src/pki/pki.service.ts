import { Injectable, BadRequestException, UnauthorizedException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PkiUtils, ParsedCertificateInfo } from './utils/pki.utils';
import { ValidateCertificateDto } from './dto/validate-cert.dto';
import { VerifySignatureDto } from './dto/verify-signature.dto';
import { VerifyAuthChallengeDto } from './dto/pki-auth.dto';
import { randomBytes, randomUUID } from 'crypto';

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

interface ActiveChallenge {
  challengeId: string;
  nonce: string;
  createdAt: number;
  expiresAt: number;
}

@Injectable()
export class PkiService {
  private readonly logger = new Logger(PkiService.name);
  private readonly activeChallenges = new Map<string, ActiveChallenge>();

  constructor(private readonly configService: ConfigService) {}

  /**
   * Validate an X.509 Certificate against Tajikistan E-Government PKI rules.
   */
  public async validateCertificate(dto: ValidateCertificateDto): Promise<{
    isValid: boolean;
    validationErrors: string[];
    certificateDetails: ParsedCertificateInfo;
  }> {
    const errors: string[] = [];

    let cert;
    try {
      cert = PkiUtils.parseCertificate(dto.certificatePem);
    } catch (e) {
      throw new BadRequestException(`Failed to parse X.509 Certificate: ${e.message}`);
    }

    const certInfo = PkiUtils.extractCertificateInfo(cert);

    // 1. Check date validity
    if (!certInfo.validity.isCurrentlyValid) {
      if (new Date() < certInfo.validity.notBefore) {
        errors.push(`Certificate is not yet valid (valid from: ${certInfo.validity.notBefore.toISOString()})`);
      } else {
        errors.push(`Certificate expired on ${certInfo.validity.notAfter.toISOString()}`);
      }
    }

    // 2. Check Key Usage if requested
    if (dto.requireDigitalSignatureUsage !== false) {
      if (!certInfo.keyUsage.includes('digitalSignature') && !certInfo.keyUsage.includes('nonRepudiation')) {
        errors.push('Certificate missing required Key Usage attributes: digitalSignature or nonRepudiation');
      }
    }

    // 3. Check Root CA Trust (if non-test environment and roots are configured)
    const allowSelfSigned = this.configService.get<boolean>('pki.allowSelfSignedTestCertificates');
    if (certInfo.isSelfSigned && !allowSelfSigned) {
      errors.push('Self-signed certificates are not trusted in production environment');
    }

    return {
      isValid: errors.length === 0,
      validationErrors: errors,
      certificateDetails: certInfo,
    };
  }

  /**
   * Verify digital signature of a challenge string.
   */
  public async verifySignature(dto: VerifySignatureDto): Promise<{
    verified: boolean;
    certInfo: ParsedCertificateInfo;
  }> {
    let cert;
    try {
      cert = PkiUtils.parseCertificate(dto.certificatePem);
    } catch (e) {
      throw new BadRequestException(`Invalid Certificate PEM: ${e.message}`);
    }

    const certInfo = PkiUtils.extractCertificateInfo(cert);

    if (!certInfo.validity.isCurrentlyValid) {
      throw new UnauthorizedException('Certificate has expired or is not yet active');
    }

    const verified = PkiUtils.verifySignature(cert, dto.challengeData, dto.signatureBase64);

    return {
      verified,
      certInfo,
    };
  }

  /**
   * Create a challenge nonce for PKI login.
   */
  public generateAuthChallenge(): { challengeId: string; challengeNonce: string; expiresAt: string } {
    const challengeId = `TJ-GOV-AUTH-${randomUUID()}`;
    const nonce = randomBytes(32).toString('hex');
    const now = Date.now();
    const expiresAt = now + 5 * 60 * 1000; // 5 minutes expiration

    this.activeChallenges.set(challengeId, {
      challengeId,
      nonce,
      createdAt: now,
      expiresAt,
    });

    // Cleanup expired challenges
    this.cleanExpiredChallenges();

    return {
      challengeId,
      challengeNonce: `AUTH_GOV_TJ_CHALLENGE_${nonce}_${challengeId}`,
      expiresAt: new Date(expiresAt).toISOString(),
    };
  }

  /**
   * Verify PKI Auth challenge and generate session payload.
   */
  public async authenticateWithPki(dto: VerifyAuthChallengeDto): Promise<PkiAuthResult> {
    const active = this.activeChallenges.get(dto.challengeId);
    if (!active) {
      throw new UnauthorizedException('Invalid or expired PKI authentication challenge ID');
    }

    if (Date.now() > active.expiresAt) {
      this.activeChallenges.delete(dto.challengeId);
      throw new UnauthorizedException('PKI authentication challenge has expired');
    }

    const expectedChallengeString = `AUTH_GOV_TJ_CHALLENGE_${active.nonce}_${active.challengeId}`;

    const { verified, certInfo } = await this.verifySignature({
      certificatePem: dto.certificatePem,
      challengeData: expectedChallengeString,
      signatureBase64: dto.signatureBase64,
    });

    if (!verified) {
      throw new UnauthorizedException('Digital signature verification failed for PKI challenge');
    }

    // Remove used challenge to prevent replay attack
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

  /**
   * Retrieve list of trusted Root CAs.
   */
  public getCaCertificates(): { count: number; trustedRoots: string[] } {
    const roots = this.configService.get<string[]>('pki.trustedRootsPem') || [];
    return {
      count: roots.length,
      trustedRoots: roots,
    };
  }

  /**
   * Generate mock cert for test/dev mode.
   */
  public generateMockCert(cn: string, tin?: string) {
    return PkiUtils.generateMockGovCertificate({
      cn,
      tin: tin || '123456789',
      organization: 'Ministry of Digital Technologies Tajikistan',
    });
  }

  private cleanExpiredChallenges() {
    const now = Date.now();
    for (const [id, challenge] of this.activeChallenges.entries()) {
      if (now > challenge.expiresAt) {
        this.activeChallenges.delete(id);
      }
    }
  }
}
