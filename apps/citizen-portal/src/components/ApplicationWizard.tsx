import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, UploadCloud, CreditCard, Key, ArrowRight, ArrowLeft, Lock, RotateCcw, FileCheck2, SendHorizontal } from 'lucide-react';
import { ServiceItem, ApplicationRecord } from '../types';
import { Language, translations } from '../locales/i18n';

interface ApplicationWizardProps {
  service: ServiceItem;
  onCancel: () => void;
  onSubmitSuccess: (newApp: ApplicationRecord) => void;
  lang: Language;
}

export const ApplicationWizard: React.FC<ApplicationWizardProps> = ({
  service,
  onCancel,
  onSubmitSuccess,
  lang
}) => {
  const t = translations[lang];
  const [step, setStep] = useState<number>(1);
  const [nationalId, setNationalId] = useState('AA1234567');
  const [fullName, setFullName] = useState('Alisher Navoi');
  const [email, setEmail] = useState('alisher.navoi@citizen.gov.uz');
  const [uploadedDoc, setUploadedDoc] = useState<string | null>(null);
  const [isVerifyingXroad, setIsVerifyingXroad] = useState(false);
  const [isSigning, setIsSigning] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedApp, setSubmittedApp] = useState<ApplicationRecord | null>(null);

  const handleNextStep = () => {
    if (step === 2) {
      setIsVerifyingXroad(true);
      setTimeout(() => {
        setIsVerifyingXroad(false);
        setStep(3);
      }, 1000);
    } else {
      setStep(prev => prev + 1);
    }
  };

  const handleFinalSubmit = () => {
    setIsSigning(true);
    setTimeout(() => {
      setIsSigning(false);

      const refCode = `EGOV-REF-${Math.floor(100000 + Math.random() * 900000)}`;
      const xroadTxId = `XROAD-TX-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;

      const newApp: ApplicationRecord = {
        id: `app_${Date.now()}`,
        serviceId: service.id,
        serviceTitle: service.title,
        category: service.category,
        applicantName: fullName,
        nationalId: nationalId,
        submittedAt: new Date().toISOString().split('T')[0],
        status: 'PENDING_REVIEW',
        stepProgress: 2,
        refCode,
        xroadTransactionId: xroadTxId,
        documents: [uploadedDoc || 'Identity_Verification_Document.pdf']
      };

      setSubmittedApp(newApp);
      setIsSubmitted(true);
      onSubmitSuccess(newApp);
    }, 1500);
  };

  return (
    <div style={{ padding: '28px', maxWidth: '900px', margin: '0 auto' }}>
      <div className="gov-card" style={{ padding: '32px' }}>
        {/* Header */}
        <div style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: '20px', marginBottom: '28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span className="badge badge-info" style={{ marginBottom: '6px' }}>{service.category}</span>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>{service.title}</h2>
          </div>

          {/* Contextual Discard Button */}
          <button className="btn-gov-secondary" onClick={onCancel} style={{ fontSize: '0.85rem', color: 'var(--accent-rose)' }}>
            <RotateCcw size={16} />
            <span>{t.cancelBtn}</span>
          </button>
        </div>

        {/* Step Progress */}
        {!isSubmitted && (
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '32px' }}>
            {[1, 2, 3, 4].map((s) => (
              <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', flex: 1 }}>
                <div style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  background: step >= s ? 'var(--gov-blue)' : 'var(--bg-main)',
                  border: step >= s ? 'none' : '1px solid var(--border-strong)',
                  color: step >= s ? '#ffffff' : 'var(--text-muted)',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.9rem'
                }}>
                  {step > s ? <CheckCircle2 size={18} /> : s}
                </div>
                <span style={{ fontSize: '0.78rem', fontWeight: 600, color: step >= s ? 'var(--gov-blue)' : 'var(--text-muted)', textAlign: 'center' }}>
                  {s === 1 ? 'e-ID Info' : s === 2 ? 'Upload Docs' : s === 3 ? 'GovPay Fee' : 'PKI Signature'}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Form Body */}
        {!isSubmitted ? (
          <div>
            {step === 1 && (
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ShieldCheck color="var(--gov-blue)" />
                  {t.step1Title}
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px', fontWeight: 600 }}>National e-ID Number</label>
                    <input type="text" value={nationalId} onChange={e => setNationalId(e.target.value)} className="gov-input" />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px', fontWeight: 600 }}>Applicant Name (e-ID Registered)</label>
                    <input type="text" value={fullName} onChange={e => setFullName(e.target.value)} className="gov-input" />
                  </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px', fontWeight: 600 }}>Official Digital Notification Email</label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="gov-input" />
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <UploadCloud color="var(--gov-blue)" />
                  {t.step2Title}
                </h3>

                <div style={{
                  border: '2px dashed var(--border-strong)',
                  borderRadius: 'var(--radius-md)',
                  padding: '36px',
                  textAlign: 'center',
                  background: 'var(--bg-main)',
                  marginBottom: '20px',
                  cursor: 'pointer'
                }} onClick={() => setUploadedDoc('Biometric_Pass_Scan_Verified.pdf')}>
                  <UploadCloud size={36} color="var(--gov-blue)" style={{ marginBottom: '10px' }} />
                  <p style={{ fontWeight: 700, marginBottom: '4px' }}>Click to upload required supporting document</p>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Accepted: PDF, PNG, PKI Certificate File (Max 10MB)</span>
                  {uploadedDoc && (
                    <div className="badge badge-success" style={{ marginTop: '12px' }}>
                      <CheckCircle2 size={14} />
                      <span>Uploaded: {uploadedDoc}</span>
                    </div>
                  )}
                </div>

                {isVerifyingXroad && (
                  <div style={{ textAlign: 'center', padding: '12px', color: 'var(--gov-blue)', fontWeight: 600, fontSize: '0.9rem' }}>
                    ⚡ Validating payload against X-Road Interoperability Bus...
                  </div>
                )}
              </div>
            )}

            {step === 3 && (
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CreditCard color="var(--gov-blue)" />
                  {t.step3Title}
                </h3>

                <div className="gov-card" style={{ padding: '24px', marginBottom: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Service Processing Fee</span>
                    <span style={{ fontWeight: 700 }}>{service.fee}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Treasury Clearing Levy</span>
                    <span style={{ fontWeight: 700 }}>$0.00</span>
                  </div>
                  <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '10px', display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', fontWeight: 800, color: 'var(--gov-blue)' }}>
                    <span>Total Payable via GovPay</span>
                    <span>{service.fee}</span>
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Key color="var(--gov-blue)" />
                  {t.step4Title}
                </h3>

                <div className="gov-card" style={{ padding: '24px', marginBottom: '24px', borderLeft: '4px solid var(--accent-emerald)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                    <Lock color="var(--accent-emerald)" />
                    <div>
                      <h4 style={{ fontSize: '1rem', fontWeight: 700 }}>X.509 PKI Digital Certificate Binding</h4>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Serial: 1029384756 • Issued by Republic e-Gov Root CA</p>
                    </div>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    Executing this digital signature legally certifies the authenticity of submitted records in accordance with National Electronic Signature Regulations.
                  </p>
                </div>
              </div>
            )}

            {/* Contextual Action Buttons */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '28px', borderTop: '1px solid var(--border-subtle)', paddingTop: '20px' }}>
              {step > 1 ? (
                <button className="btn-gov-secondary" onClick={() => setStep(prev => prev - 1)}>
                  <ArrowLeft size={16} />
                  <span>{t.previousBtn}</span>
                </button>
              ) : <div />}

              {step < 4 ? (
                <button className="btn-gov-primary" onClick={handleNextStep}>
                  <span>{t.nextStepBtn}</span>
                  <ArrowRight size={16} />
                </button>
              ) : (
                <button className="btn-gov-primary" onClick={handleFinalSubmit} disabled={isSigning} style={{ background: 'var(--accent-emerald)' }}>
                  <SendHorizontal size={16} />
                  <span>{isSigning ? t.signingProgress : t.executeSignBtn}</span>
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Confirmation Screen */
          <div style={{ textAlign: 'center', padding: '32px 16px' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: '#dcfce7',
              color: '#15803d',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px'
            }}>
              <FileCheck2 size={36} />
            </div>

            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '8px' }}>
              Application Transmitted & Queued
            </h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', maxWidth: '520px', margin: '0 auto 24px' }}>
              Your application has been cryptographically signed and routed to the ministry review queue via X-Road bus.
            </p>

            <div className="gov-card" style={{ padding: '20px', maxWidth: '480px', margin: '0 auto 28px', textAlign: 'left' }}>
              <div style={{ marginBottom: '10px' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Official Reference Code</span>
                <p style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--gov-blue)' }}>{submittedApp?.refCode}</p>
              </div>
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>X-Road Transaction Correlation ID</span>
                <p style={{ fontSize: '0.85rem', fontWeight: 600, fontFamily: 'monospace' }}>{submittedApp?.xroadTransactionId}</p>
              </div>
            </div>

            <button className="btn-gov-primary" onClick={onCancel}>
              <span>Return to Dashboard</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
