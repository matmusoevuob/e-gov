import { z } from 'zod';

export enum UserRole {
  CITIZEN = 'CITIZEN',
  OFFICER = 'OFFICER',
  SYSTEM_ADMIN = 'SYSTEM_ADMIN'
}

export interface User {
  id: string;
  nationalId: string;
  fullName: string;
  email: string;
  phoneNumber?: string;
  role: UserRole;
  mfaEnabled: boolean;
  mfaSecret?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PkiCertificate {
  id: string;
  userId: string;
  serialNumber: string;
  issuerDn: string;
  subjectDn: string;
  publicKeyPem: string;
  validFrom: string;
  validUntil: string;
  isRevoked: boolean;
  revokedAt?: string;
}

export interface AuthSession {
  id: string;
  userId: string;
  sessionToken: string;
  idToken?: string;
  ipAddress?: string;
  userAgent?: string;
  expiresAt: string;
  createdAt: string;
}

// Input validation schemas
export const LoginSchema = z.object({
  nationalId: z.string().min(5, 'National ID must be at least 5 characters').max(20),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  mfaCode: z.string().length(6, 'MFA Code must be 6 digits').optional()
});

export type LoginDto = z.infer<typeof LoginSchema>;

export const VerifyCertSchema = z.object({
  certificatePem: z.string().min(20, 'Invalid Certificate PEM format'),
  signaturePem: z.string().optional(),
  challengeData: z.string().optional()
});

export type VerifyCertDto = z.infer<typeof VerifyCertSchema>;

export const SsoSchema = z.object({
  code: z.string().min(1, 'SSO Authorization Code is required'),
  redirectUri: z.string().url('Valid redirect URI required'),
  clientId: z.string().default('egov-citizen-portal')
});

export type SsoDto = z.infer<typeof SsoSchema>;

export interface CertValidationResult {
  valid: boolean;
  code: 'VALID' | 'EXPIRED' | 'NOT_YET_VALID' | 'REVOKED' | 'INVALID_SIGNATURE' | 'INVALID_FORMAT';
  message: string;
  subject?: {
    cn?: string;
    nationalId?: string;
    organization?: string;
    country?: string;
  };
  issuer?: {
    cn?: string;
    organization?: string;
  };
  serialNumber?: string;
  validFrom?: string;
  validUntil?: string;
  verificationReceipt?: string;
}
