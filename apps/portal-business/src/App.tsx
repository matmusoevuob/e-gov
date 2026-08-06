import React, { useState, useEffect } from 'react';
import { Language, ApplicationRecord } from './types';
import { MOCK_APPLICATIONS } from './data/mockData';

// Components
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { BusinessRegistrationForm } from './components/BusinessRegistrationForm';
import { PermitCatalogAndApply } from './components/PermitCatalogAndApply';
import { ApplicationDetailModal } from './components/ApplicationDetailModal';
import { ECertificateModal } from './components/ECertificateModal';
import { ERegistrySearch } from './components/ERegistrySearch';
import { LegalSupport } from './components/LegalSupport';

export const App: React.FC = () => {
  const [currentLang, setCurrentLang] = useState<Language>('tj');
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [applications, setApplications] = useState<ApplicationRecord[]>(MOCK_APPLICATIONS);
  
  // Modals
  const [selectedAppForDetail, setSelectedAppForDetail] = useState<ApplicationRecord | null>(null);
  const [selectedAppForCert, setSelectedAppForCert] = useState<ApplicationRecord | null>(null);
  
  // Toast notifications
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleAddNewApp = (newApp: ApplicationRecord) => {
    setApplications(prev => [newApp, ...prev]);
    showToast(`Дархости нав (${newApp.applicationNumber}) бо муваффақият сабт шуд!`);
  };

  const pendingCount = applications.filter(a => a.status === 'under_review' || a.status === 'action_required').length;

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 animate-fade-in">
          <div className="px-4 py-3 rounded-xl bg-emerald-600 text-white font-semibold text-xs shadow-2xl flex items-center gap-2 border border-emerald-400">
            <span>✓</span>
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Header */}
      <Header
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        activeTab={activeTab}
        onNavigate={setActiveTab}
      />

      {/* Main Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar */}
          <Sidebar
            activeTab={activeTab}
            onNavigate={setActiveTab}
            pendingCount={pendingCount}
          />

          {/* Main Workspace Area */}
          <main className="flex-1 min-w-0">
            {activeTab === 'dashboard' && (
              <Dashboard
                applications={applications}
                onNavigate={setActiveTab}
                onSelectApp={setSelectedAppForDetail}
                onViewCertificate={setSelectedAppForCert}
              />
            )}

            {activeTab === 'registration' && (
              <BusinessRegistrationForm
                onSubmitSuccess={(newApp) => {
                  handleAddNewApp(newApp);
                  setActiveTab('dashboard');
                }}
                onCancel={() => setActiveTab('dashboard')}
              />
            )}

            {activeTab === 'permits' && (
              <PermitCatalogAndApply
                onApplySuccess={(newApp) => {
                  handleAddNewApp(newApp);
                  setActiveTab('dashboard');
                }}
              />
            )}

            {activeTab === 'applications' && (
              <Dashboard
                applications={applications}
                onNavigate={setActiveTab}
                onSelectApp={setSelectedAppForDetail}
                onViewCertificate={setSelectedAppForCert}
              />
            )}

            {activeTab === 'search' && (
              <ERegistrySearch />
            )}

            {activeTab === 'support' && (
              <LegalSupport />
            )}
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 glass-panel py-6 text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            © 2026 biz.gov.tj — Портали ягонаи давлатии соҳибкорӣ ва иҷозатномадиҳӣ. Ҷумҳурии Тоҷикистон.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:underline cursor-pointer">Сиёсати махфият</span>
            <span className="hover:underline cursor-pointer">Шартҳои истифода</span>
            <span className="hover:underline cursor-pointer"> API ва Интегратсия</span>
          </div>
        </div>
      </footer>

      {/* Application Detail Modal */}
      {selectedAppForDetail && (
        <ApplicationDetailModal
          app={selectedAppForDetail}
          onClose={() => setSelectedAppForDetail(null)}
          onViewCertificate={(app) => setSelectedAppForCert(app)}
        />
      )}

      {/* Official Certificate Viewer Modal */}
      {selectedAppForCert && (
        <ECertificateModal
          app={selectedAppForCert}
          onClose={() => setSelectedAppForCert(null)}
        />
      )}

    </div>
  );
};
export default App;
