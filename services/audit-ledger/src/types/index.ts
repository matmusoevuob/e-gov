import { z } from 'zod';

export interface AuditBlock {
  index: number;
  timestamp: string;
  action: string;             // e.g. "EID_LOGIN", "TAX_FILING_SUBMITTED", "CERT_VERIFIED"
  actorId: string;            // National ID or Service ID
  subsystem: string;          // e.g. "AuthService", "CivilRegistry"
  details: Record<string, any>;
  previousHash: string;
  blockHash: string;
}

export const CreateAuditLogSchema = z.object({
  action: z.string().min(2),
  actorId: z.string().min(2),
  subsystem: z.string().min(2),
  details: z.record(z.any()).default({})
});

export type CreateAuditLogDto = z.infer<typeof CreateAuditLogSchema>;

export interface LedgerVerificationResult {
  isChainValid: boolean;
  totalBlocks: number;
  tamperedBlockIndex?: number;
  message: string;
}
