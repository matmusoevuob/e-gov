import { Router, Request, Response } from 'express';
import { CreateAuditLogSchema } from '../types/index.js';
import { LedgerService } from '../services/ledger.service.js';

export function createAuditRouter(ledgerService: LedgerService): Router {
  const router = Router();

  /**
   * POST /api/v1/audit/log
   * Appends an immutable cryptographic block to the audit ledger
   */
  router.post('/log', (req: Request, res: Response) => {
    try {
      const parseResult = CreateAuditLogSchema.safeParse(req.body);
      if (!parseResult.success) {
        return res.status(400).json({
          status: 'ERROR',
          code: 'INVALID_INPUT',
          errors: parseResult.error.errors
        });
      }

      const { action, actorId, subsystem, details } = parseResult.data;
      const block = ledgerService.recordAuditLog(action, actorId, subsystem, details);

      return res.status(201).json({
        status: 'SUCCESS',
        message: 'Immutable audit log block committed to cryptographic ledger',
        block
      });
    } catch (err: any) {
      return res.status(500).json({ status: 'ERROR', message: err.message });
    }
  });

  /**
   * GET /api/v1/audit/verify
   * Verifies overall cryptographic chain integrity across all blocks
   */
  router.get('/verify', (req: Request, res: Response) => {
    const result = ledgerService.verifyChainIntegrity();
    return res.status(200).json({
      status: 'SUCCESS',
      verification: result
    });
  });

  /**
   * GET /api/v1/audit/logs
   * Retrieves audit ledger chain blocks
   */
  router.get('/logs', (req: Request, res: Response) => {
    return res.status(200).json({
      status: 'SUCCESS',
      totalBlocks: ledgerService.getChain().length,
      chain: ledgerService.getChain()
    });
  });

  /**
   * GET /api/v1/audit/openapi.json
   */
  router.get('/openapi.json', (req: Request, res: Response) => {
    return res.status(200).json({
      openapi: '3.0.3',
      info: {
        title: 'Cryptographic Immutable Security Audit Ledger Service',
        version: '1.0.0',
        description: 'SHA-256 Hash Chained Audit Logger for e-Gov System Compliance'
      },
      paths: {
        '/api/v1/audit/log': {
          post: {
            summary: 'Append immutable block to audit ledger',
            requestBody: { required: true, content: { 'application/json': {} } },
            responses: { '201': { description: 'Committed' } }
          }
        },
        '/api/v1/audit/verify': {
          get: {
            summary: 'Verify cryptographic chain integrity',
            responses: { '200': { description: 'Chain Status' } }
          }
        }
      }
    });
  });

  return router;
}
