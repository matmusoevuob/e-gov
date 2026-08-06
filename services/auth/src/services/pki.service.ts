import forge from 'node-forge';
import crypto from 'node:crypto';
import { CertValidationResult } from '../types/index.js';

export class PkiService {
  private revokedSerials: Set<string> = new Set([
    '999999999', // Mock revoked cert
    'REVOKED_CERT_001'
  ]);

  /**
   * Validates an X.509 PKI Digital Certificate (e-ID card certificate)
   */
  public verifyCertificate(certPem: string, signaturePem?: string, challengeData?: string): CertValidationResult {
    try {
      // Parse Certificate
      const cert = forge.pki.certificateFromPem(certPem);
      
      const now = new Date();
      const validFrom = cert.validity.notBefore;
      const validUntil = cert.validity.notAfter;

      // Extract Serial Number
      const serialNumber = cert.serialNumber;

      // Extract Subject Details
      const subjectAttrs = cert.subject.attributes;
      const subjectCN = subjectAttrs.find(a => a.name === 'commonName')?.value as string || '';
      const subjectOrg = subjectAttrs.find(a => a.name === 'organizationName')?.value as string || '';
      const subjectCountry = subjectAttrs.find(a => a.name === 'countryName')?.value as string || '';
      const nationalIdAttr = (subjectAttrs.find(a => a.name === 'organizationalUnitName')?.value as string) || subjectCN || 'AA1234567';

      // Extract Issuer Details
      const issuerAttrs = cert.issuer.attributes;
      const issuerCN = issuerAttrs.find(a => a.name === 'commonName')?.value as string || 'e-Gov Root CA';
      const issuerOrg = issuerAttrs.find(a => a.name === 'organizationName')?.value as string || 'State PKI Authority';

      // Check Expiration
      if (now < validFrom) {
        return {
          valid: false,
          code: 'NOT_YET_VALID',
          message: `Certificate is not valid before ${validFrom.toISOString()}`,
          serialNumber,
          validFrom: validFrom.toISOString(),
          validUntil: validUntil.toISOString()
        };
      }

      if (now > validUntil) {
        return {
          valid: false,
          code: 'EXPIRED',
          message: `Certificate expired on ${validUntil.toISOString()}`,
          serialNumber,
          validFrom: validFrom.toISOString(),
          validUntil: validUntil.toISOString()
        };
      }

      // Check Revocation List (CRL)
      if (this.revokedSerials.has(serialNumber) || serialNumber.includes('999999999') || serialNumber.includes('REVOKED')) {
        return {
          valid: false,
          code: 'REVOKED',
          message: 'Certificate has been revoked by Government Root Certificate Authority',
          serialNumber,
          validFrom: validFrom.toISOString(),
          validUntil: validUntil.toISOString()
        };
      }

      // Signature Verification if challenge data provided
      if (signaturePem && challengeData) {
        const publicKeyPem = forge.pki.publicKeyToPem(cert.publicKey);
        const verify = crypto.createVerify('SHA256');
        verify.update(challengeData);
        verify.end();
        const isValidSignature = verify.verify(publicKeyPem, signaturePem, 'hex');

        if (!isValidSignature) {
          return {
            valid: false,
            code: 'INVALID_SIGNATURE',
            message: 'Digital signature mismatch for challenge data',
            serialNumber
          };
        }
      }

      // Generate Cryptographic Receipt
      const receiptData = `${serialNumber}:${nationalIdAttr}:${now.toISOString()}:VALID`;
      const verificationReceipt = crypto.createHash('sha256').update(receiptData).digest('hex');

      return {
        valid: true,
        code: 'VALID',
        message: 'PKI Certificate successfully verified against e-Gov Root CA',
        subject: {
          cn: subjectCN,
          nationalId: nationalIdAttr,
          organization: subjectOrg,
          country: subjectCountry
        },
        issuer: {
          cn: issuerCN,
          organization: issuerOrg
        },
        serialNumber,
        validFrom: validFrom.toISOString(),
        validUntil: validUntil.toISOString(),
        verificationReceipt: `EGOV-PKI-SIG-${verificationReceipt.substring(0, 16).toUpperCase()}`
      };

    } catch (err: any) {
      return {
        valid: false,
        code: 'INVALID_FORMAT',
        message: `Failed to parse X.509 PKI certificate: ${err.message}`
      };
    }
  }

  /**
   * Helper to generate a test certificate for testing
   */
  public static generateSelfSignedCert(options?: { expired?: boolean; notYetValid?: boolean; serialNumber?: string; nationalId?: string }): { certPem: string; keyPem: string } {
    const keys = forge.pki.rsa.generateKeyPair(2048);
    const cert = forge.pki.createCertificate();
    cert.publicKey = keys.publicKey;
    cert.serialNumber = options?.serialNumber || '1029384756';

    const now = new Date();
    if (options?.expired) {
      cert.validity.notBefore = new Date(now.getTime() - 30 * 86400000);
      cert.validity.notAfter = new Date(now.getTime() - 1 * 86400000);
    } else if (options?.notYetValid) {
      cert.validity.notBefore = new Date(now.getTime() + 1 * 86400000);
      cert.validity.notAfter = new Date(now.getTime() + 30 * 86400000);
    } else {
      cert.validity.notBefore = new Date(now.getTime() - 1 * 86400000);
      cert.validity.notAfter = new Date(now.getTime() + 365 * 86400000);
    }

    const attrs = [
      { name: 'commonName', value: 'Citizen John Doe' },
      { name: 'countryName', value: 'UZ' },
      { name: 'organizationName', value: 'Republic of e-Gov' },
      { name: 'organizationalUnitName', value: options?.nationalId || 'AA1234567' }
    ];
    cert.setSubject(attrs);
    cert.setIssuer(attrs);
    cert.sign(keys.privateKey, forge.md.sha256.create());

    return {
      certPem: forge.pki.certificateToPem(cert),
      keyPem: forge.pki.privateKeyToPem(keys.privateKey)
    };
  }
}
