export interface XRoadHeaders {
  client: string;           // e.g. "EGov/10001/CitizenPortal"
  service: string;          // e.g. "EGov/20002/AuthService/login"
  userId: string;           // e.g. "AA1234567"
  requestId: string;        // UUIDv4 correlation id
  securityServer?: string;  // e.g. "sec-server-prod-01.egov.gov"
  protocolVersion: string;  // "4.0"
}

export interface RouteDefinition {
  id: string;
  subsystem: string;
  pathPrefix: string;
  targetUrl: string;
  isPublic: boolean;
  rateLimitMax: number;
}

export enum CircuitState {
  CLOSED = 'CLOSED',
  OPEN = 'OPEN',
  HALF_OPEN = 'HALF_OPEN'
}

export interface CircuitBreakerMetrics {
  state: CircuitState;
  failures: number;
  successes: number;
  lastFailureTime?: number;
}
