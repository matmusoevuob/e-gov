import React, { useState } from 'react';
import { FileText, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { ApplicationRecord } from '../types';
import { Language, translations } from '../locales/i18n';

interface OfficerPortalProps {
  applications: ApplicationRecord[];
  onApprove: (appId: string) => void;
  onReject: (appId: string) => void;
  lang: Language;
}

export const OfficerPortal: React.FC<OfficerPortalProps> = ({
  applications,
  onApprove,
  onReject,
  lang
}) => {
  const t = translations[lang];
  const [selectedApp, setSelectedApp] = useState<ApplicationRecord | null>(applications[0] || null);

  return (
    <div style={{ padding: '28px', maxWidth: '1300px', margin: '0 auto' }}>
      {/* Officer Header */}
      <div className="gov-card" style={{ padding: '20px 24px', marginBottom: '28px', borderLeft: '5px solid #b45309' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span className="badge badge-warning" style={{ marginBottom: '4px' }}>OFFICER ADMINISTRATION CONSOLE</span>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800 }}>Ministry Service Triage & Approval Console</h2>
          </div>

          <div style={{ display: 'flex', gap: '20px', fontSize: '0.85rem' }}>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Pending Audit</span>
              <p style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent-amber)' }}>{applications.filter(a => a.status === 'PENDING_REVIEW').length}</p>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Approved Today</span>
              <p style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>14</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '28px' }}>
        {/* Left: Triage Queue */}
        <div>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileText size={18} color="var(--gov-blue)" />
            Review Queue ({applications.length})
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {applications.map(app => (
              <div
                key={app.id}
                className="gov-card"
                style={{
                  padding: '16px',
                  cursor: 'pointer',
                  borderLeft: selectedApp?.id === app.id ? '4px solid var(--gov-blue)' : '1px solid var(--border-subtle)',
                  background: selectedApp?.id === app.id ? 'var(--bg-card-hover)' : 'var(--bg-card)'
                }}
                onClick={() => setSelectedApp(app)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span className="badge badge-info">{app.category}</span>
                  <span className={`badge ${app.status === 'APPROVED' ? 'badge-success' : app.status === 'REJECTED' ? 'badge-warning' : 'badge-info'}`}>
                    {app.status}
                  </span>
                </div>

                <h4 style={{ fontSize: '0.98rem', fontWeight: 700, marginBottom: '4px' }}>{app.serviceTitle}</h4>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>Applicant: {app.applicantName} ({app.nationalId})</p>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Ref: {app.refCode} • Submitted {app.submittedAt}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Inspection Console */}
        {selectedApp ? (
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '14px' }}>
              Application Audit Console
            </h3>

            <div className="gov-card" style={{ padding: '24px' }}>
              <div style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: '14px', marginBottom: '16px' }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>REF: {selectedApp.refCode}</span>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800 }}>{selectedApp.serviceTitle}</h3>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '20px', fontSize: '0.88rem' }}>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Applicant Name</span>
                  <p style={{ fontWeight: 700 }}>{selectedApp.applicantName}</p>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>National e-ID</span>
                  <p style={{ fontWeight: 700 }}>{selectedApp.nationalId}</p>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Submission Date</span>
                  <p style={{ fontWeight: 700 }}>{selectedApp.submittedAt}</p>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>X-Road Transaction ID</span>
                  <p style={{ fontWeight: 700, fontSize: '0.78rem', fontFamily: 'monospace' }}>{selectedApp.xroadTransactionId}</p>
                </div>
              </div>

              {/* Verified Documents */}
              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '10px' }}>Verified Attachments</h4>
                {selectedApp.documents.map((doc, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-main)', border: '1px solid var(--border-subtle)', marginBottom: '6px' }}>
                    <span style={{ fontSize: '0.82rem' }}>📄 {doc}</span>
                    <span className="badge badge-success">X-Road Verified</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              {selectedApp.status === 'PENDING_REVIEW' ? (
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button className="btn-gov-primary" style={{ flex: 1, justifyContent: 'center', background: 'var(--accent-emerald)' }} onClick={() => onApprove(selectedApp.id)}>
                    <CheckCircle2 size={16} />
                    <span>{t.approveAppBtn}</span>
                  </button>
                  <button className="btn-gov-secondary" style={{ flex: 1, justifyContent: 'center', borderColor: 'var(--accent-rose)', color: 'var(--accent-rose)' }} onClick={() => onReject(selectedApp.id)}>
                    <XCircle size={16} />
                    <span>{t.rejectAppBtn}</span>
                  </button>
                </div>
              ) : (
                <div className={`badge ${selectedApp.status === 'APPROVED' ? 'badge-success' : 'badge-warning'}`} style={{ padding: '8px 14px', width: '100%', justifyContent: 'center' }}>
                  Decision Recorded: {selectedApp.status}
                </div>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
