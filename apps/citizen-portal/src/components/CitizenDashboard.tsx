import React from 'react';
import { FileText, ShieldCheck, CreditCard, Calendar, ArrowRight, Clock, CheckCircle2, FilePlus2 } from 'lucide-react';
import { ApplicationRecord } from '../types';
import { Language, translations } from '../locales/i18n';

interface CitizenDashboardProps {
  applications: ApplicationRecord[];
  onSelectService: (serviceId: string) => void;
  onOpenVault: () => void;
  lang: Language;
}

export const CitizenDashboard: React.FC<CitizenDashboardProps> = ({
  applications,
  onSelectService,
  onOpenVault,
  lang
}) => {
  const t = translations[lang];

  return (
    <div style={{ padding: '28px', maxWidth: '1300px', margin: '0 auto' }}>
      {/* Official Banner */}
      <div className="gov-card" style={{
        padding: '28px',
        marginBottom: '28px',
        borderLeft: '5px solid var(--gov-blue)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--gov-blue)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {t.citizenHub}
            </span>
          </div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '6px' }}>
            {t.welcomeTitle}
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '650px' }}>
            {t.welcomeDesc}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="btn-gov-primary" onClick={() => onSelectService('srv_passport')}>
            <FilePlus2 size={18} />
            <span>{t.newApplicationBtn}</span>
          </button>
          <button className="btn-gov-secondary" onClick={onOpenVault}>
            <ShieldCheck size={18} />
            <span>{t.govidWallet}</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '28px' }}>
        <div className="gov-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.85rem' }}>{t.activeApps}</span>
            <FileText size={20} color="var(--gov-blue)" />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800 }}>{applications.filter(a => a.status !== 'APPROVED').length}</div>
          <span style={{ fontSize: '0.8rem', color: 'var(--gov-blue)', fontWeight: 600 }}>{t.underReview}</span>
        </div>

        <div className="gov-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.85rem' }}>{t.verifiedCredentials}</span>
            <ShieldCheck size={20} color="var(--accent-emerald)" />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800 }}>4 {t.issuedDocs}</div>
          <span style={{ fontSize: '0.8rem', color: 'var(--accent-emerald)', fontWeight: 600 }}>e-ID, Driver's Pass, Health, TIN</span>
        </div>

        <div className="gov-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.85rem' }}>{t.govpayBalance}</span>
            <CreditCard size={20} color="var(--accent-emerald)" />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800 }}>$0.00</div>
          <span style={{ fontSize: '0.8rem', color: 'var(--accent-emerald)', fontWeight: 600 }}>{t.noFeesDue}</span>
        </div>

        <div className="gov-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.85rem' }}>{t.nextAppointment}</span>
            <Calendar size={20} color="var(--gov-blue)" />
          </div>
          <div style={{ fontSize: '1.4rem', fontWeight: 800 }}>Aug 12, 2026</div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{t.nextAppointmentDesc}</span>
        </div>
      </div>

      {/* Main Content Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '28px' }}>
        {/* Left: Active Applications Table */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FileText size={18} color="var(--gov-blue)" />
              {t.applicationRecords}
            </h3>
          </div>

          <div className="gov-card" style={{ overflow: 'hidden' }}>
            <table className="gov-table">
              <thead>
                <tr>
                  <th>{t.thServiceTitle}</th>
                  <th>{t.thRefCode}</th>
                  <th>{t.thSubmitted}</th>
                  <th>{t.thStatus}</th>
                  <th>{t.thAction}</th>
                </tr>
              </thead>
              <tbody>
                {applications.map(app => (
                  <tr key={app.id}>
                    <td>
                      <p style={{ fontWeight: 700 }}>
                        {t.services[app.serviceId]?.title || app.serviceTitle}
                      </p>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{app.category}</span>
                    </td>
                    <td style={{ fontFamily: 'monospace', fontWeight: 600 }}>{app.refCode}</td>
                    <td style={{ color: 'var(--text-secondary)' }}>{app.submittedAt}</td>
                    <td>
                      <span className={`badge ${app.status === 'APPROVED' ? 'badge-success' : app.status === 'PENDING_REVIEW' ? 'badge-warning' : 'badge-info'}`}>
                        {app.status === 'APPROVED' ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                        {app.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td>
                      <button className="btn-gov-secondary" style={{ padding: '4px 10px', fontSize: '0.8rem' }} onClick={() => alert(`Viewing details for ${app.refCode}`)}>
                        {t.viewDetailsBtn}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Quick Actions & Audit Trail */}
        <div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '16px' }}>
            {t.popularServices}
          </h3>

          <div className="gov-card" style={{ padding: '16px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button
                onClick={() => onSelectService('srv_passport')}
                className="btn-gov-secondary"
                style={{ width: '100%', justifyContent: 'space-between' }}
              >
                <span>{t.services.srv_passport.title}</span>
                <ArrowRight size={16} />
              </button>

              <button
                onClick={() => onSelectService('srv_business')}
                className="btn-gov-secondary"
                style={{ width: '100%', justifyContent: 'space-between' }}
              >
                <span>{t.services.srv_business.title}</span>
                <ArrowRight size={16} />
              </button>

              <button
                onClick={() => onSelectService('srv_tax')}
                className="btn-gov-secondary"
                style={{ width: '100%', justifyContent: 'space-between' }}
              >
                <span>{t.services.srv_tax.title}</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '16px' }}>
            {t.securityAuditTrail}
          </h3>

          <div className="gov-card" style={{ padding: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.85rem' }}>
              <div style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: '8px' }}>
                <p style={{ fontWeight: 600 }}>e-ID PKI Signature Verified</p>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Today, 22:58 • mTLS Session</span>
              </div>

              <div style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: '8px' }}>
                <p style={{ fontWeight: 600 }}>X-Road Interoperability Gateway</p>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Yesterday, 14:20 • CivilRegistry</span>
              </div>

              <div>
                <p style={{ fontWeight: 600 }}>GovPay Treasury Settlement</p>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Jul 28, 2026 • Ref: 849201</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
