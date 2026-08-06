"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouterService = void 0;
class RouterService {
    routes = [
        {
            id: 'route_auth',
            subsystem: 'AuthService',
            pathPrefix: '/api/v1/auth',
            targetUrl: process.env.AUTH_SERVICE_URL || 'http://localhost:4001',
            isPublic: true,
            rateLimitMax: 100
        },
        {
            id: 'route_audit',
            subsystem: 'AuditLedgerService',
            pathPrefix: '/api/v1/audit',
            targetUrl: process.env.AUDIT_SERVICE_URL || 'http://localhost:4002',
            isPublic: false,
            rateLimitMax: 50
        },
        {
            id: 'route_civil',
            subsystem: 'CivilRegistry',
            pathPrefix: '/api/v1/civil',
            targetUrl: process.env.CIVIL_SERVICE_URL || 'http://localhost:4003',
            isPublic: false,
            rateLimitMax: 60
        }
    ];
    getRegisteredRoutes() {
        return this.routes;
    }
    matchRoute(path) {
        return this.routes.find(r => path.startsWith(r.pathPrefix));
    }
}
exports.RouterService = RouterService;
