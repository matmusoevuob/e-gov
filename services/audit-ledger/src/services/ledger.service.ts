import crypto from 'node:crypto';
import { AuditBlock, LedgerVerificationResult } from '../types/index.js';

export class LedgerService {
  private chain: AuditBlock[] = [];

  constructor() {
    this.createGenesisBlock();
  }

  private calculateBlockHash(index: number, timestamp: string, action: string, actorId: string, subsystem: string, details: any, previousHash: string): string {
    const raw = `${index}:${timestamp}:${action}:${actorId}:${subsystem}:${JSON.stringify(details)}:${previousHash}`;
    return crypto.createHash('sha256').update(raw).digest('hex');
  }

  private createGenesisBlock() {
    const timestamp = new Date().toISOString();
    const previousHash = '0'.repeat(64);
    const blockHash = this.calculateBlockHash(0, timestamp, 'GENESIS_BLOCK', 'SYSTEM_ROOT', 'AuditLedger', { note: 'e-Gov System Ledger Initialization' }, previousHash);

    const genesis: AuditBlock = {
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

  public recordAuditLog(action: string, actorId: string, subsystem: string, details: Record<string, any>): AuditBlock {
    const previousBlock = this.chain[this.chain.length - 1];
    const index = previousBlock.index + 1;
    const timestamp = new Date().toISOString();
    const previousHash = previousBlock.blockHash;
    const blockHash = this.calculateBlockHash(index, timestamp, action, actorId, subsystem, details, previousHash);

    const block: AuditBlock = {
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

  public getChain(): AuditBlock[] {
    return this.chain;
  }

  public verifyChainIntegrity(): LedgerVerificationResult {
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
      const recalculatedHash = this.calculateBlockHash(
        current.index,
        current.timestamp,
        current.action,
        current.actorId,
        current.subsystem,
        current.details,
        current.previousHash
      );

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
