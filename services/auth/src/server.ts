import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PkiService } from './services/pki.service.js';
import { KeycloakService } from './services/keycloak.service.js';
import { DbService } from './services/db.service.js';
import { createAuthRouter } from './routes/auth.routes.js';

dotenv.config();

export function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  // Services Initialization
  const pkiService = new PkiService();
  const keycloakService = new KeycloakService();
  const dbService = new DbService();

  // Health check endpoint
  app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({
      status: 'UP',
      service: 'e-ID Authentication Service',
      version: '1.0.0',
      timestamp: new Date().toISOString()
    });
  });

  // Auth Routes
  app.use('/api/v1/auth', createAuthRouter(pkiService, keycloakService, dbService));

  // Global Error Handler
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error('Unhandled Error:', err);
    res.status(500).json({
      status: 'ERROR',
      message: 'Internal Server Error',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  });

  return { app, pkiService, keycloakService, dbService };
}

if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 4001;
  const { app } = createApp();
  app.listen(PORT, () => {
    console.log(`🔒 [e-ID Auth Service] Running on port ${PORT}`);
    console.log(`📘 OpenAPI Spec available at http://localhost:${PORT}/api/v1/auth/openapi.json`);
  });
}
