"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CircuitBreaker = void 0;
const index_js_1 = require("../types/index.js");
class CircuitBreaker {
    failureThreshold = 3;
    recoveryTimeoutMs = 5000;
    metricsMap = new Map();
    getMetrics(serviceName) {
        if (!this.metricsMap.has(serviceName)) {
            this.metricsMap.set(serviceName, {
                state: index_js_1.CircuitState.CLOSED,
                failures: 0,
                successes: 0
            });
        }
        return this.metricsMap.get(serviceName);
    }
    recordSuccess(serviceName) {
        const metrics = this.getMetrics(serviceName);
        metrics.successes++;
        if (metrics.state === index_js_1.CircuitState.HALF_OPEN) {
            metrics.state = index_js_1.CircuitState.CLOSED;
            metrics.failures = 0;
        }
    }
    recordFailure(serviceName) {
        const metrics = this.getMetrics(serviceName);
        metrics.failures++;
        metrics.lastFailureTime = Date.now();
        if (metrics.failures >= this.failureThreshold) {
            metrics.state = index_js_1.CircuitState.OPEN;
        }
    }
    middleware(serviceName) {
        return (req, res, next) => {
            const metrics = this.getMetrics(serviceName);
            if (metrics.state === index_js_1.CircuitState.OPEN) {
                const now = Date.now();
                if (metrics.lastFailureTime && (now - metrics.lastFailureTime > this.recoveryTimeoutMs)) {
                    metrics.state = index_js_1.CircuitState.HALF_OPEN;
                }
                else {
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
exports.CircuitBreaker = CircuitBreaker;
