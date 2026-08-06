"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LedgerService = void 0;
const node_crypto_1 = __importDefault(require("node:crypto"));
class LedgerService {
    chain = [];
    constructor() {
        this.createGenesisBlock();
    }
    calculateBlockHash(index, timestamp, action, actorId, subsystem, details, previousHash) {
        const raw = `${index}:${timestamp}:${action}:${actorId}:${subsystem}:${JSON.stringify(details)}:${previousHash}`;
        return node_crypto_1.default.createHash('sha256').update(raw).digest('hex');
    }
    createGenesisBlock() {
        const timestamp = new Date().toISOString();
        const previousHash = '0'.repeat(64);
        const blockHash = this.calculateBlockHash(0, timestamp, 'GENESIS_BLOCK', 'SYSTEM_ROOT', 'AuditLedger', { note: 'e-Gov System Ledger Initialization' }, previousHash);
        const genesis = {
            index: 0,
            timestamp,
            action: 'GENESIS_BLOCK',
            actorId: 'SYSTEM_ROOT',
            subsystem: 'AuditLedger',
            details: { note: 'e-Gov System Ledger Initialization' },
            previousHash,
            blockHash
        };
        this.chain.push(genesis);
    }
    recordAuditLog(action, actorId, subsystem, details) {
        const previousBlock = this.chain[this.chain.length - 1];
        const index = previousBlock.index + 1;
        const timestamp = new Date().toISOString();
        const previousHash = previousBlock.blockHash;
        const blockHash = this.calculateBlockHash(index, timestamp, action, actorId, subsystem, details, previousHash);
        const block = {
            index,
            timestamp,
            action,
            actorId,
            subsystem,
            details,
            previousHash,
            blockHash
        };
        this.chain.push(block);
        return block;
    }
    getChain() {
        return this.chain;
    }
    verifyChainIntegrity() {
        for (let i = 1; i < this.chain.length; i++) {
            const current = this.chain[i];
            const previous = this.chain[i - 1];
            // Check link to previous hash
            if (current.previousHash !== previous.blockHash) {
                return {
                    isChainValid: false,
                    totalBlocks: this.chain.length,
                    tamperedBlockIndex: i,
                    message: `Chain broken at block ${i}: previousHash does not match block ${i - 1} hash`
                };
            }
            // Re-verify current block hash
            const recalculatedHash = this.calculateBlockHash(current.index, current.timestamp, current.action, current.actorId, current.subsystem, current.details, current.previousHash);
            if (recalculatedHash !== current.blockHash) {
                return {
                    isChainValid: false,
                    totalBlocks: this.chain.length,
                    tamperedBlockIndex: i,
                    message: `Block ${i} payload hash mismatch (data tampering detected!)`
                };
            }
        }
        return {
            isChainValid: true,
            totalBlocks: this.chain.length,
            message: 'Cryptographic ledger chain verified 100% valid with zero tamper detected'
        };
    }
}
exports.LedgerService = LedgerService;
