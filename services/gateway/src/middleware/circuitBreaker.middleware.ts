import { Request, Response, NextFunction } from 'express';
import { CircuitState, CircuitBreakerMetrics } from '../types/index.js';

export class CircuitBreaker {
  private failureThreshold = 3;
  private recoveryTimeoutMs = 5000;
  private metricsMap = new Map<string, CircuitBreakerMetrics>();

  public getMetrics(serviceName: string): CircuitBreakerMetrics {
    if (!this.metricsMap.has(serviceName)) {
      this.metricsMap.set(serviceName, {
        state: CircuitState.CLOSED,
        failures: 0,
        successes: 0
      });
    }
    return this.metricsMap.get(serviceName)!;
  }

  public recordSuccess(serviceName: string) {
    const metrics = this.getMetrics(serviceName);
    metrics.successes++;
    if (metrics.state === CircuitState.HALF_OPEN) {
      metrics.state = CircuitState.CLOSED;
      metrics.failures = 0;
    }
  }

  public recordFailure(serviceName: string) {
    const metrics = this.getMetrics(serviceName);
    metrics.failures++;
    metrics.lastFailureTime = Date.now();

    if (metrics.failures >= this.failureThreshold) {
      metrics.state = CircuitState.OPEN;
    }
  }

  public middleware(serviceName: string) {
    return (req: Request, res: Response, next: NextFunction) => {
      const metrics = this.getMetrics(serviceName);

      if (metrics.state === CircuitState.OPEN) {
        const now = Date.now();
        if (metrics.lastFailureTime && (now - metrics.lastFailureTime > this.recoveryTimeoutMs)) {
          metrics.state = CircuitState.HALF_OPEN;
        } else {
          return res.status(503).json({
            status: 'ERROR',
            code: 'CIRCUIT_BREAKER_OPEN',
            message: `Service '${serviceName}' is temporarily unavailable due to upstream failure protection (Circuit Breaker OPEN).`
          });
        }
      }

      next();
    };
  }
}
