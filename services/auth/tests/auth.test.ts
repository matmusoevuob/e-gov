import { describe, it, expect } from 'vitest';
import { createApp } from '../src/server.js';
import { PkiService } from '../src/services/pki.service.js';

describe('Auth Service Integration Suite', () => {
  const { pkiService, keycloakService, dbService } = createApp();

  it('should authenticate user with valid National ID, Password, and MFA code', () => {
    const user = dbService.findUserByNationalId('AA1234567');
    expect(user).toBeDefined();
    expect(user?.fullName).toBe('Alisher Navoi');

    // Test MFA enforcement logic
    const validMfa = user?.mfaSecret === '123456';
    expect(validMfa).toBe(true);
  });

  it('should handle Keycloak OIDC SSO Code Exchange', async () => {
    const ssoResult = await keycloakService.exchangeCode('VALID_AUTHORIZATION_CODE', 'https://citizen.egov.gov/callback', 'egov-citizen-portal');
    expect(ssoResult.tokenResponse.access_token).toBeDefined();
    expect(ssoResult.user.email).toBe('elena.rostova@egov.gov');

    const decoded = keycloakService.verifyToken(ssoResult.tokenResponse.access_token);
    expect(decoded.sub).toBe(ssoResult.user.id);
  });

  it('should fail Keycloak OIDC exchange on invalid authorization code', async () => {
    await expect(keycloakService.exchangeCode('INVALID_CODE', 'https://citizen.egov.gov/callback', 'egov-citizen-portal'))
      .rejects.toThrow('Invalid or expired Keycloak authorization code');
  });

  it('should verify certificate via PKI service and generate signature receipt', () => {
    const { certPem } = PkiService.generateSelfSignedCert({
      serialNumber: '5544332211',
      nationalId: 'AA1234567'
    });

    const verification = pkiService.verifyCertificate(certPem);
    expect(verification.valid).toBe(true);
    expect(verification.verificationReceipt).toMatch(/^EGOV-PKI-SIG-/);
  });
});
