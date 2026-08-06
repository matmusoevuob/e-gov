import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { LedgerService } from './services/ledger.service.js';
import { createAuditRouter } from './routes/audit.routes.js';

dotenv.config();

export function createApp() {
  const app = express();
  const ledgerService = new LedgerService();

  app.use(cors());
  app.use(express.json());

  // Health check endpoint
  app.get('/health', (req: Request, res: Response) => {
    const integrity = ledgerService.verifyChainIntegrity();
    res.status(200).json({
      status: 'UP',
      service: 'Cryptographic Immutable Audit Ledger',
      version: '1.0.0',
      totalBlocks: integrity.totalBlocks,
      isChainValid: integrity.isChainValid,
      timestamp: new Date().toISOString()
    });
  });

  // Audit Router
  app.use('/api/v1/audit', createAuditRouter(ledgerService));

  // Global Error Handler
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error('Audit Service Error:', err);
    res.status(500).json({ status: 'ERROR', message: 'Internal Audit Service Error' });
  });

  return { app, ledgerService };
}

if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 4002;
  const { app } = createApp();
  app.listen(PORT, () => {
    console.log(`🛡️ [Audit Ledger Service] Running on port ${PORT}`);
    console.log(`📘 OpenAPI Spec available at http://localhost:${PORT}/api/v1/audit/openapi.json`);
  });
}
