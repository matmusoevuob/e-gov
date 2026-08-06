import { describe, it, expect } from 'vitest';
import { LedgerService } from '../src/services/ledger.service.js';

describe('Cryptographic Audit Ledger Suite', () => {
  it('should initialize genesis block and verify 100% chain integrity', () => {
    const ledgerService = new LedgerService();
    const chain = ledgerService.getChain();
    expect(chain.length).toBe(1);
    expect(chain[0].action).toBe('GENESIS_BLOCK');

    const integrity = ledgerService.verifyChainIntegrity();
    expect(integrity.isChainValid).toBe(true);
    expect(integrity.totalBlocks).toBe(1);
  });

  it('should sequentially append blocks with valid previousHash linking', () => {
    const ledgerService = new LedgerService();
    const block1 = ledgerService.recordAuditLog('EID_LOGIN', 'AA1234567', 'AuthService', { ip: '127.0.0.1' });
    const block2 = ledgerService.recordAuditLog('TAX_FILING_SUBMITTED', 'AA1234567', 'TaxService', { amount: 500 });

    expect(block1.index).toBe(1);
    expect(block2.index).toBe(2);
    expect(block2.previousHash).toBe(block1.blockHash);

    const integrity = ledgerService.verifyChainIntegrity();
    expect(integrity.isChainValid).toBe(true);
    expect(integrity.totalBlocks).toBe(3);
  });

  it('should detect data tampering if block content is altered', () => {
    const ledgerService = new LedgerService();
    ledgerService.recordAuditLog('PAYMENT_EXECUTED', 'AA998877', 'GovPay', { amount: 1000 });

    const chain = ledgerService.getChain();
    // Maliciously tamper block content
    chain[1].details.amount = 9999999;

    const integrity = ledgerService.verifyChainIntegrity();
    expect(integrity.isChainValid).toBe(false);
    expect(integrity.tamperedBlockIndex).toBe(1);
    expect(integrity.message).toContain('data tampering detected');
  });
});
