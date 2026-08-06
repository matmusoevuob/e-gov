import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { CitizenDashboard } from './components/CitizenDashboard';
import { ServiceCatalog } from './components/ServiceCatalog';
import { ApplicationWizard } from './components/ApplicationWizard';
import { DigitalVault } from './components/DigitalVault';
import { OfficerPortal } from './components/OfficerPortal';
import { GovBot } from './components/GovBot';
import { UserRole, ServiceItem, ApplicationRecord } from './types';
import { checkBackendHealth, ApiHealthStatus, sendAuditLog } from './services/api';
import { Language } from './locales/i18n';

const INITIAL_APPLICATIONS: ApplicationRecord[] = [
  {
    id: 'app_1',
    serviceId: 'srv_passport',
    serviceTitle: 'Иваз ва Додани Паспорти Биометрӣ (gov.tj)',
    category: 'Identity',
    applicantName: 'Сомони Раҳматов',
    nationalId: 'TJ9876543',
    submittedAt: '2026-07-28',
    status: 'IN_AUDIT',
    stepProgress: 2,
    refCode: 'EGOV-TJ-849201',
    xroadTransactionId: 'XROAD-TJ-89A7B6C5',
    documents: ['Biometric_Passport_Scan_Tajikistan.pdf', 'National_ID_Verified.pdf']
  },
  {
    id: 'app_2',
    serviceId: 'srv_business',
    serviceTitle: 'Рӯйхатгирии ҶДММ (Бизнес Субъект)',
    category: 'Business',
    applicantName: 'Сомони Раҳматов',
    nationalId: 'TJ9876543',
    submittedAt: '2026-07-30',
    status: 'PENDING_REVIEW',
    stepProgress: 3,
    refCode: 'EGOV-TJ-109283',
    xroadTransactionId: 'XROAD-TJ-33B211A9',
    documents: ['Charter_Draft_Dushanbe.pdf', 'Property_Lease_Agreement.pdf']
  }
];

export const App: React.FC = () => {
  const [role, setRole] = useState<UserRole>('CITIZEN');
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [theme, setTheme] = useState<'dark' | 'light'>('light');
  const [lang, setLang] = useState<Language>('TJ'); // Default to Tajik (TJ)
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [applications, setApplications] = useState<ApplicationRecord[]>(INITIAL_APPLICATIONS);
  const [backendHealth, setBackendHealth] = useState<ApiHealthStatus>({ gateway: true, auth: true, audit: true });

  useEffect(() => {
    checkBackendHealth().then(status => setBackendHealth(status));
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const handleStartApplication = (service: ServiceItem) => {
    setSelectedService(service);
    setActiveTab('wizard');
    sendAuditLog('SERVICE_APPLICATION_STARTED', 'TJ9876543', service.category, { serviceId: service.id });
  };

  const handleApplicationSubmitted = (newApp: ApplicationRecord) => {
    setApplications(prev => [newApp, ...prev]);
    sendAuditLog('SERVICE_APPLICATION_SUBMITTED', newApp.nationalId, newApp.category, { refCode: newApp.refCode, xroadTx: newApp.xroadTransactionId });
  };

  const handleApprove = (appId: string) => {
    setApplications(prev => prev.map(a => a.id === appId ? { ...a, status: 'APPROVED', stepProgress: 4 } : a));
    sendAuditLog('OFFICER_APPLICATION_APPROVED', 'OF-TJ-9988', 'MinistryOfficerTajikistan', { appId });
  };

  const handleReject = (appId: string) => {
    setApplications(prev => prev.map(a => a.id === appId ? { ...a, status: 'REJECTED' } : a));
    sendAuditLog('OFFICER_APPLICATION_REJECTED', 'OF-TJ-9988', 'MinistryOfficerTajikistan', { appId });
  };

  return (
    <div style={{ minHeight: '100vh', position: 'relative' }}>
      {/* Global Navigation Header */}
      <Header
        currentRole={role}
        setRole={(newRole) => {
          setRole(newRole);
          if (newRole === 'OFFICER') setActiveTab('officer');
          else if (activeTab === 'officer') setActiveTab('dashboard');
        }}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        theme={theme}
        toggleTheme={toggleTheme}
        backendHealth={backendHealth}
        lang={lang}
        setLang={setLang}
      />

      {/* Main Content Router */}
      <main style={{ position: 'relative', zIndex: 1, paddingBottom: '60px' }}>
        {activeTab === 'dashboard' && (
          <CitizenDashboard
            applications={applications}
            onSelectService={(serviceId) => {
              const srv: ServiceItem = {
                id: serviceId,
                title: serviceId === 'srv_business' ? 'Рӯйхатгирии ҶДММ (Бизнес)' : 'Иваз ва Додани Паспорти Биометрӣ',
                category: serviceId === 'srv_business' ? 'Business' : 'Identity',
                description: 'Хизматрасонии давлатии электронӣ (gov.tj)',
                processingTime: '24 Соат',
                fee: '$45.00',
                department: 'Вазорати Корҳои Дохилии ҶТ'
              };
              handleStartApplication(srv);
            }}
            onOpenVault={() => setActiveTab('vault')}
            lang={lang}
          />
        )}

        {activeTab === 'services' && (
          <ServiceCatalog onStartApplication={handleStartApplication} lang={lang} />
        )}

        {activeTab === 'wizard' && selectedService && (
          <ApplicationWizard
            service={selectedService}
            onCancel={() => setActiveTab('services')}
            onSubmitSuccess={handleApplicationSubmitted}
            lang={lang}
          />
        )}

        {activeTab === 'vault' && <DigitalVault lang={lang} />}

        {activeTab === 'officer' && (
          <OfficerPortal
            applications={applications}
            onApprove={handleApprove}
            onReject={handleReject}
            lang={lang}
          />
        )}
      </main>

      {/* 24/7 AI Public Assistant Widget */}
      <GovBot lang={lang} />
    </div>
  );
};

export default App;
