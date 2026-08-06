import { Request, Response, NextFunction } from 'express';
import { XRoadHeaders } from '../types/index.js';

export function xroadHeaderMiddleware(req: Request, res: Response, next: NextFunction) {
  // Public health / doc endpoints skip X-Road strict headers
  if (req.path === '/health' || req.path === '/api/v1/gateway/openapi.json' || req.path === '/api/v1/gateway/routes') {
    return next();
  }

  const client = req.headers['x-road-client'] as string;
  const service = req.headers['x-road-service'] as string;
  const userId = req.headers['x-road-userid'] as string;
  const requestId = (req.headers['x-road-id'] as string) || (req.headers['x-request-id'] as string);

  if (!client || !service) {
    return res.status(400).json({
      status: 'ERROR',
      code: 'XROAD_HEADER_MISSING',
      message: 'Missing mandatory X-Road protocol headers: X-Road-Client and X-Road-Service are required.'
    });
  }

  // Validate Client Format: INSTANCE/MEMBER_CLASS/MEMBER_CODE/SUBSYSTEM or GOV/CODE/SUBSYSTEM
  if (!client.includes('/')) {
    return res.status(400).json({
      status: 'ERROR',
      code: 'XROAD_INVALID_CLIENT',
      message: 'Malformed X-Road-Client header. Expected format: INSTANCE/MEMBER_CODE/SUBSYSTEM'
    });
  }

  const parsedHeaders: XRoadHeaders = {
    client,
    service,
    userId: userId || 'ANONYMOUS',
    requestId: requestId || `xroad_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
    securityServer: (req.headers['x-road-securityserver'] as string) || 'sec-gateway-01.egov.gov',
    protocolVersion: (req.headers['x-road-protocolversion'] as string) || '4.0'
  };

  (req as any).xroad = parsedHeaders;
  res.setHeader('X-Road-Id', parsedHeaders.requestId);
  res.setHeader('X-Road-Processed-By', 'GovPulse-XRoad-Gateway-v1');

  next();
}
