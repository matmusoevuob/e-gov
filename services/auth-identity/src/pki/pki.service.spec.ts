import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { PkiService } from './pki.service';
import { PkiUtils } from './utils/pki.utils';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';

describe('PkiService', () => {
  let service: PkiService;
  let mockCertPair: { certPem: string; privateKeyPem: string };

  beforeAll(() => {
    mockCertPair = PkiUtils.generateMockGovCertificate({
      cn: 'Test Citizen Tajikistan',
      organization: 'Ministry of Technology',
      tin: '123456789012',
    });
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PkiService,
        {
          provide: ConfigService,
          useValue: {
            get: (key: string) => {
              if (key === 'pki.allowSelfSignedTestCertificates') return true;
              if (key === 'pki.trustedRootsPem') return [];
              return null;
            },
          },
        },
      ],
    }).compile();

    service = module.get<PkiService>(PkiService);
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
      await expect(
        service.validateCertificate({
          certificatePem: 'INVALID_PEM_STRING',
        }),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('generateAuthChallenge & authenticateWithPki', () => {
    it('should generate challenge and authenticate successfully with valid signature', async () => {
      // 1. Generate challenge
      const challenge = service.generateAuthChallenge();
      expect(challenge.challengeId).toBeDefined();
      expect(challenge.challengeNonce).toContain('AUTH_GOV_TJ_CHALLENGE_');

      // 2. Sign challenge string using private key
      const cert = PkiUtils.parseCertificate(mockCertPair.certPem);
      const forge = require('node-forge');
      const privateKey = forge.pki.privateKeyFromPem(mockCertPair.privateKeyPem);
      const md = forge.md.sha256.create();
      md.update(challenge.challengeNonce, 'utf8');
      const signatureBytes = privateKey.sign(md);
      const signatureBase64 = forge.util.encode64(signatureBytes);

      // 3. Authenticate
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
      await expect(
        service.authenticateWithPki({
          challengeId: 'NON_EXISTENT_CHALLENGE_ID',
          certificatePem: mockCertPair.certPem,
          signatureBase64: 'dGVzdA==',
        }),
      ).rejects.toThrow(UnauthorizedException);
    });
  });
});
