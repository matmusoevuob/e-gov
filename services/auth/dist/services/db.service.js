"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbService = void 0;
const node_crypto_1 = __importDefault(require("node:crypto"));
const index_js_1 = require("../types/index.js");
class DbService {
    usersMap = new Map();
    certsMap = new Map();
    sessionsMap = new Map();
    constructor() {
        this.seedDatabase();
    }
    seedDatabase() {
        // Seed Citizen User
        const citizen = {
            id: 'usr_citizen_001',
            nationalId: 'AA1234567',
            fullName: 'Alisher Navoi',
            email: 'alisher.navoi@citizen.gov.uz',
            phoneNumber: '+998901112233',
            role: index_js_1.UserRole.CITIZEN,
            mfaEnabled: true,
            mfaSecret: '123456', // Test MFA Code
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        this.usersMap.set(citizen.nationalId, citizen);
        // Seed Government Officer User
        const officer = {
            id: 'usr_officer_002',
            nationalId: 'OF9988776',
            fullName: 'Chief Officer Karimova',
            email: 'officer.karimova@egov.gov.uz',
            phoneNumber: '+998909998877',
            role: index_js_1.UserRole.OFFICER,
            mfaEnabled: true,
            mfaSecret: '654321', // Test MFA Code
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        this.usersMap.set(officer.nationalId, officer);
    }
    findUserByNationalId(nationalId) {
        return this.usersMap.get(nationalId);
    }
    findUserById(id) {
        return Array.from(this.usersMap.values()).find(u => u.id === id);
    }
    createSession(userId, idToken, ipAddress, userAgent) {
        const sessionToken = `EGOV_SESS_${node_crypto_1.default.randomBytes(24).toString('hex')}`;
        const session = {
            id: `sess_${node_crypto_1.default.randomUUID()}`,
            userId,
            sessionToken,
            idToken,
            ipAddress,
            userAgent,
            expiresAt: new Date(Date.now() + 24 * 3600 * 1000).toISOString(),
            createdAt: new Date().toISOString()
        };
        this.sessionsMap.set(sessionToken, session);
        return session;
    }
    getSession(sessionToken) {
        const session = this.sessionsMap.get(sessionToken);
        if (session && new Date(session.expiresAt) < new Date()) {
            this.sessionsMap.delete(sessionToken);
            return undefined;
        }
        return session;
    }
}
exports.DbService = DbService;
