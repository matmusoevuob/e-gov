import { describe, it, expect } from 'vitest';
import { createApp } from '../src/server.js';
import { CircuitBreaker } from '../src/middleware/circuitBreaker.middleware.js';
import { CircuitState } from '../src/types/index.js';

describe('X-Road API Gateway Unit & Integration Suite', () => {
  const { app, circuitBreaker, routerService } = createApp();

  it('should list all registered X-Road subsystem routes', () => {
    const routes = routerService.getRegisteredRoutes();
    expect(routes.length).toBeGreaterThanOrEqual(3);
    const authRoute = routes.find(r => r.id === 'route_auth');
    expect(authRoute?.targetUrl).toContain('4001');
  });

  it('should test Circuit Breaker transition from CLOSED to OPEN on repeated failures', () => {
    const serviceName = 'TestService';
    expect(circuitBreaker.getMetrics(serviceName).state).toBe(CircuitState.CLOSED);

    circuitBreaker.recordFailure(serviceName);
    circuitBreaker.recordFailure(serviceName);
    circuitBreaker.recordFailure(serviceName);

    expect(circuitBreaker.getMetrics(serviceName).state).toBe(CircuitState.OPEN);
  });

  it('should reset Circuit Breaker on successful request in HALF_OPEN state', () => {
    const serviceName = 'RecoverableService';
    circuitBreaker.getMetrics(serviceName).state = CircuitState.HALF_OPEN;

    circuitBreaker.recordSuccess(serviceName);
    expect(circuitBreaker.getMetrics(serviceName).state).toBe(CircuitState.CLOSED);
  });
});
