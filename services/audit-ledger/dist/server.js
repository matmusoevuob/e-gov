"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = createApp;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const ledger_service_js_1 = require("./services/ledger.service.js");
const audit_routes_js_1 = require("./routes/audit.routes.js");
dotenv_1.default.config();
function createApp() {
    const app = (0, express_1.default)();
    const ledgerService = new ledger_service_js_1.LedgerService();
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
    // Health check endpoint
    app.get('/health', (req, res) => {
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
    app.use('/api/v1/audit', (0, audit_routes_js_1.createAuditRouter)(ledgerService));
    // Global Error Handler
    app.use((err, req, res, next) => {
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
