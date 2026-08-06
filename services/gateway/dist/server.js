"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = createApp;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const xroad_middleware_js_1 = require("./middleware/xroad.middleware.js");
const circuitBreaker_middleware_js_1 = require("./middleware/circuitBreaker.middleware.js");
const router_service_js_1 = require("./services/router.service.js");
dotenv_1.default.config();
function createApp() {
    const app = (0, express_1.default)();
    const circuitBreaker = new circuitBreaker_middleware_js_1.CircuitBreaker();
    const routerService = new router_service_js_1.RouterService();
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
    // X-Road Header Validation Middleware
    app.use(xroad_middleware_js_1.xroadHeaderMiddleware);
    // Health check endpoint
    app.get('/health', (req, res) => {
        res.status(200).json({
            status: 'UP',
            service: 'Kong / X-Road Interoperability Gateway',
            version: '1.0.0',
            protocol: 'X-Road v6 / REST Gateway',
            activeRoutes: routerService.getRegisteredRoutes().length,
            timestamp: new Date().toISOString()
        });
    });
    // Registered Routes Catalog Endpoint
    app.get('/api/v1/gateway/routes', (req, res) => {
        res.status(200).json({
            status: 'SUCCESS',
            routes: routerService.getRegisteredRoutes()
        });
    });
    // OpenAPI spec endpoint
    app.get('/api/v1/gateway/openapi.json', (req, res) => {
        res.status(200).json({
            openapi: '3.0.3',
            info: {
                title: 'Kong / X-Road Interoperability API Gateway',
                version: '1.0.0',
                description: 'Federated X-Road Data Exchange Gateway for e-Gov System'
            },
            paths: {
                '/xroad/v6/*': {
                    post: {
                        summary: 'Execute X-Road Interoperability Call across Subsystems',
                        parameters: [
                            { name: 'X-Road-Client', in: 'header', required: true, schema: { type: 'string' } },
                            { name: 'X-Road-Service', in: 'header', required: true, schema: { type: 'string' } },
                            { name: 'X-Road-Id', in: 'header', required: true, schema: { type: 'string' } }
                        ],
                        responses: { '200': { description: 'Routed successfully' }, '400': { description: 'X-Road Header Error' } }
                    }
                }
            }
        });
    });
    // Core X-Road Proxy Router Endpoint
    app.all('/xroad/v6/*', async (req, res) => {
        const xroad = req.xroad;
        const targetPath = req.path.replace('/xroad/v6', '');
        const route = routerService.matchRoute(targetPath);
        if (!route) {
            return res.status(404).json({
                status: 'ERROR',
                code: 'ROUTE_NOT_FOUND',
                message: `No registered X-Road target subsystem route matching path '${targetPath}'`
            });
        }
        try {
            // Simulate/Proxy call to target microservice
            const targetEndpoint = `${route.targetUrl}${targetPath}`;
            circuitBreaker.recordSuccess(route.subsystem);
            return res.status(200).json({
                status: 'SUCCESS',
                xroadReceipt: {
                    client: xroad.client,
                    service: xroad.service,
                    userId: xroad.userId,
                    requestId: xroad.requestId,
                    subsystem: route.subsystem,
                    forwardedTo: targetEndpoint,
                    timestamp: new Date().toISOString()
                },
                data: {
                    message: `X-Road payload successfully routed through security server to ${route.subsystem}`,
                    path: targetPath
                }
            });
        }
        catch (err) {
            circuitBreaker.recordFailure(route.subsystem);
            return res.status(502).json({
                status: 'ERROR',
                code: 'BAD_GATEWAY',
                message: `X-Road Gateway failed to connect to upstream service '${route.subsystem}': ${err.message}`
            });
        }
    });
    // Global Error Handler
    app.use((err, req, res, next) => {
        console.error('Gateway Error:', err);
        res.status(500).json({ status: 'ERROR', message: 'Internal Gateway Error' });
    });
    return { app, circuitBreaker, routerService };
}
if (process.env.NODE_ENV !== 'test') {
    const PORT = process.env.PORT || 4000;
    const { app } = createApp();
    app.listen(PORT, () => {
        console.log(`🌉 [X-Road API Gateway] Running on port ${PORT}`);
        console.log(`📘 OpenAPI Spec available at http://localhost:${PORT}/api/v1/gateway/openapi.json`);
    });
}
