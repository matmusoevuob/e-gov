import React, { useState } from 'react';
import { ShieldCheck, QrCode, Download, CheckCircle2 } from 'lucide-react';
import { DigitalDocument } from '../types';
import { Language, translations } from '../locales/i18n';

interface DigitalVaultProps {
  lang: Language;
}

const DOC_KEYS = ['doc_id', 'doc_dl', 'doc_health', 'doc_tax'];

export const DigitalVault: React.FC<DigitalVaultProps> = ({ lang }) => {
  const t = translations[lang];
  const [selectedDocId, setSelectedDocId] = useState<string>('doc_id');
  const [isFlipped, setIsFlipped] = useState(false);
  const [showQr, setShowQr] = useState(false);

  const docs = [
    {
      id: 'doc_id',
      title: t.vaultDocs.doc_id.title,
      issuer: t.vaultDocs.doc_id.issuer,
      issueDate: '2022-04-15',
      expiryDate: '2032-04-15',
      documentNumber: 'TJ9876543',
      verificationHash: '0x9A8B7C6D5E4F321',
      type: 'NATIONAL_ID' as const
    },
    {
      id: 'doc_dl',
      title: t.vaultDocs.doc_dl.title,
      issuer: t.vaultDocs.doc_dl.issuer,
      issueDate: '2023-01-10',
      expiryDate: '2033-01-10',
      documentNumber: 'DL99887766',
      verificationHash: '0x123456789ABCDEF',
      type: 'DRIVERS_LICENSE' as const
    },
    {
      id: 'doc_health',
      title: t.vaultDocs.doc_health.title,
      issuer: t.vaultDocs.doc_health.issuer,
      issueDate: '2024-05-01',
      expiryDate: '2029-05-01',
      documentNumber: 'HC-55443322',
      verificationHash: '0xFEFDFCFBFA98765',
      type: 'HEALTH_PASS' as const
    },
    {
      id: 'doc_tax',
      title: t.vaultDocs.doc_tax.title,
      issuer: t.vaultDocs.doc_tax.issuer,
      issueDate: '2020-09-01',
      expiryDate: 'PERMANENT',
      documentNumber: 'TIN-304928172',
      verificationHash: '0x776655443322110',
      type: 'TAX_TIN' as const
    }
  ];

  const selectedDoc = docs.find(d => d.id === selectedDocId) || docs[0];

  return (
    <div style={{ padding: '28px', maxWidth: '1300px', margin: '0 auto' }}>
      <div style={{ marginBottom: '28px' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '6px' }}>
          {t.govidWallet}
        </h2>
        <p style={{ color: 'var(--text-secondary)' }}>
          Cryptographically signed digital credentials issued directly by state authorities (gov.tj).
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '28px' }}>
        {/* Left Column: Official Card */}
        <div>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldCheck color="var(--gov-blue)" />
            {t.digitalPassTitle}
          </h3>

          <div
            className="gov-card"
            style={{
              padding: '28px',
              borderRadius: 'var(--radius-lg)',
              background: 'linear-gradient(135deg, #0f172a, #1e293b)',
              color: '#ffffff',
              minHeight: '250px',
              cursor: 'pointer',
              marginBottom: '20px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
            onClick={() => setIsFlipped(!isFlipped)}
          >
            {!isFlipped ? (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                  <div>
                    <span style={{ fontSize: '0.7rem', letterSpacing: '0.08em', fontWeight: 800, color: '#94a3b8' }}>REPUBLIC OF TAJIKISTAN DIGITAL CREDENTIAL</span>
                    <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff' }}>{selectedDoc.title}</h4>
                  </div>
                  <ShieldCheck size={26} color="#60a5fa" />
                </div>

                <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '16px' }}>
                  <div style={{
                    width: '64px',
                    height: '80px',
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--gov-blue)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: '1.5rem',
                    color: '#ffffff'
                  }}>
                    SR
                  </div>

                  <div>
                    <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{t.cardholderName}</span>
                    <p style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff', marginBottom: '6px' }}>{t.cardholderName}</p>

                    <div style={{ display: 'flex', gap: '16px', fontSize: '0.82rem' }}>
                      <div>
                        <span style={{ fontSize: '0.68rem', color: '#94a3b8' }}>{t.docNumberLabel}</span>
                        <p style={{ fontWeight: 700 }}>{selectedDoc.documentNumber}</p>
                      </div>
                      <div>
                        <span style={{ fontSize: '0.68rem', color: '#94a3b8' }}>{t.expiryDateLabel}</span>
                        <p style={{ fontWeight: 700 }}>{selectedDoc.expiryDate}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#94a3b8', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '10px' }}>
                  <span>{t.issuerLabel}: {selectedDoc.issuer}</span>
                  <span style={{ color: '#60a5fa', fontWeight: 700 }}>{t.clickToFlip}</span>
                </div>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '10px 0' }}>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '10px' }}>{t.officialVerificationQr}</h4>
                <div style={{ width: '110px', height: '110px', background: '#fff', padding: '8px', borderRadius: 'var(--radius-sm)', margin: '0 auto 10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <QrCode size={94} color="#0f172a" />
                </div>
                <p style={{ fontSize: '0.78rem', color: '#cbd5e1' }}>{t.scanQrPrompt}</p>
                <span style={{ fontSize: '0.72rem', color: '#60a5fa', fontWeight: 700, display: 'block', marginTop: '8px' }}>{t.clickToFlip}</span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '12px' }}>
            <button className="btn-gov-primary" onClick={() => alert(`Downloading signed PDF certificate...`)}>
              <Download size={16} />
              <span>{t.downloadPdfBtn}</span>
            </button>
            <button className="btn-gov-secondary" onClick={() => setShowQr(!showQr)}>
              <QrCode size={16} />
              <span>{showQr ? t.hideQrBtn : t.generateQrBtn}</span>
            </button>
          </div>
        </div>

        {/* Right Column: Credentials Store List */}
        <div>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '14px' }}>
            {t.issuedDocs} ({docs.length})
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {docs.map(doc => (
              <div
                key={doc.id}
                className="gov-card"
                style={{
                  padding: '16px',
                  cursor: 'pointer',
                  borderLeft: selectedDocId === doc.id ? '4px solid var(--gov-blue)' : '1px solid var(--border-subtle)',
                  background: selectedDocId === doc.id ? 'var(--bg-card-hover)' : 'var(--bg-card)'
                }}
                onClick={() => { setSelectedDocId(doc.id); setIsFlipped(false); }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span className="badge badge-success" style={{ marginBottom: '4px' }}>VERIFIED</span>
                    <h4 style={{ fontSize: '0.98rem', fontWeight: 700 }}>{doc.title}</h4>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{doc.documentNumber}</span>
                  </div>

                  <CheckCircle2 size={18} color={selectedDocId === doc.id ? 'var(--gov-blue)' : 'var(--text-muted)'} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
