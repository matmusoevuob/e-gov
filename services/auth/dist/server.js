"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = createApp;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const pki_service_js_1 = require("./services/pki.service.js");
const keycloak_service_js_1 = require("./services/keycloak.service.js");
const db_service_js_1 = require("./services/db.service.js");
const auth_routes_js_1 = require("./routes/auth.routes.js");
dotenv_1.default.config();
function createApp() {
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
    // Services Initialization
    const pkiService = new pki_service_js_1.PkiService();
    const keycloakService = new keycloak_service_js_1.KeycloakService();
    const dbService = new db_service_js_1.DbService();
    // Health check endpoint
    app.get('/health', (req, res) => {
        res.status(200).json({
            status: 'UP',
            service: 'e-ID Authentication Service',
            version: '1.0.0',
            timestamp: new Date().toISOString()
        });
    });
    // Auth Routes
    app.use('/api/v1/auth', (0, auth_routes_js_1.createAuthRouter)(pkiService, keycloakService, dbService));
    // Global Error Handler
    app.use((err, req, res, next) => {
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
