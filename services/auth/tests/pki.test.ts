import { describe, it, expect } from 'vitest';
import { PkiService } from '../src/services/pki.service.js';

describe('PKI Certificate Validation Suite', () => {
  const pkiService = new PkiService();

  it('should successfully verify a valid X.509 PKI certificate', () => {
    const { certPem } = PkiService.generateSelfSignedCert({
      serialNumber: 'CERT_12345678',
      nationalId: 'AA1234567'
    });

    const result = pkiService.verifyCertificate(certPem);
    expect(result.valid).toBe(true);
    expect(result.code).toBe('VALID');
    expect(result.subject?.nationalId).toBe('AA1234567');
    expect(result.verificationReceipt).toBeDefined();
  });

  it('should reject an EXPIRED PKI digital certificate', () => {
    const { certPem } = PkiService.generateSelfSignedCert({
      expired: true,
      serialNumber: 'CERT_EXPIRED_001'
    });

    const result = pkiService.verifyCertificate(certPem);
    expect(result.valid).toBe(false);
    expect(result.code).toBe('EXPIRED');
    expect(result.message).toContain('Certificate expired');
  });

  it('should reject a NOT YET VALID PKI digital certificate', () => {
    const { certPem } = PkiService.generateSelfSignedCert({
      notYetValid: true,
      serialNumber: 'CERT_FUTURE_001'
    });

    const result = pkiService.verifyCertificate(certPem);
    expect(result.valid).toBe(false);
    expect(result.code).toBe('NOT_YET_VALID');
  });

  it('should reject a REVOKED PKI digital certificate against CRL', () => {
    const { certPem } = PkiService.generateSelfSignedCert({
      serialNumber: '999999999' // Blacklisted serial number
    });

    const result = pkiService.verifyCertificate(certPem);
    expect(result.valid).toBe(false);
    expect(result.code).toBe('REVOKED');
    expect(result.message).toContain('revoked by Government Root Certificate Authority');
  });

  it('should reject malformed certificate PEM string', () => {
    const result = pkiService.verifyCertificate('INVALID_PEM_DATA');
    expect(result.valid).toBe(false);
    expect(result.code).toBe('INVALID_FORMAT');
  });
});
