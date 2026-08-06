import React, { useState } from 'react';
import { Landmark, ShieldCheck, Search, Moon, Sun, UserCheck, Building2, Globe, Check, X } from 'lucide-react';
import { UserRole } from '../types';
import { ApiHealthStatus } from '../services/api';
import { Language, translations } from '../locales/i18n';

interface HeaderProps {
  currentRole: UserRole;
  setRole: (role: UserRole) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  backendHealth: ApiHealthStatus;
  lang: Language;
  setLang: (lang: Language) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentRole,
  setRole,
  activeTab,
  setActiveTab,
  theme,
  toggleTheme,
  backendHealth,
  lang,
  setLang
}) => {
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const t = translations[lang];

  const languages: Array<{ code: Language; flag: string; label: string }> = [
    { code: 'TJ', flag: '🇹🇯', label: 'Тоҷикӣ' },
    { code: 'EN', flag: '🇬🇧', label: 'English' },
    { code: 'RU', flag: '🇷🇺', label: 'Русский' },
    { code: 'UZ', flag: '🇺🇿', label: "O'zbekcha" }
  ];

  return (
    <>
      {/* Official Top Banner */}
      <div style={{ background: '#09101d', color: '#cbd5e1', padding: '6px 28px', fontSize: '0.78rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1e293b' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Landmark size={14} color="#60a5fa" />
          <span>{t.portalSubtitle}</span>
        </div>

        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          {/* Language Switcher Dropdown */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowLangMenu(!showLangMenu)}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#fff',
                padding: '3px 10px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.75rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Globe size={12} />
              <span>{languages.find(l => l.code === lang)?.flag} {lang}</span>
            </button>

            {showLangMenu && (
              <div className="gov-card" style={{
                position: 'absolute',
                top: '28px',
                right: 0,
                width: '150px',
                zIndex: 210,
                padding: '6px',
                background: '#1e293b',
                borderColor: '#334155'
              }}>
                {languages.map(l => (
                  <div
                    key={l.code}
                    onClick={() => { setLang(l.code); setShowLangMenu(false); }}
                    style={{
                      padding: '8px 10px',
                      fontSize: '0.8rem',
                      color: '#fff',
                      borderRadius: 'var(--radius-sm)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: lang === l.code ? 'var(--gov-blue)' : 'transparent'
                    }}
                  >
                    <span>{l.flag} {l.label}</span>
                    {lang === l.code && <Check size={12} />}
                  </div>
                ))}
              </div>
            )}
          </div>

          <span>Security Protocol: X-Road v6 (gov.tj)</span>
          <span style={{ color: '#10b981', fontWeight: 600 }}>● Active</span>
        </div>
      </div>

      {/* Main Header */}
      <header style={{
        background: 'var(--bg-header)',
        color: '#ffffff',
        padding: '14px 28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '2px solid var(--gov-blue)'
      }}>
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer' }} onClick={() => setActiveTab('dashboard')}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: 'var(--radius-sm)',
            background: 'var(--gov-blue)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff'
          }}>
            <Landmark size={24} />
          </div>
          <div>
            <h1 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ffffff', letterSpacing: '-0.01em' }}>
              {t.portalTitle}
            </h1>
            <span style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 500 }}>
              {t.portalSubtitle}
            </span>
          </div>
        </div>

        {/* Center Navigation */}
        <nav style={{ display: 'flex', gap: '4px' }}>
          {[
            { id: 'dashboard', label: t.citizenHub },
            { id: 'services', label: t.servicesCatalog },
            { id: 'vault', label: t.govidWallet },
            ...(currentRole === 'OFFICER' ? [{ id: 'officer', label: t.officerConsole }] : [])
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '8px 18px',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                background: activeTab === tab.id ? 'var(--gov-blue)' : 'transparent',
                color: activeTab === tab.id ? '#ffffff' : '#cbd5e1',
                fontWeight: 600,
                fontSize: '0.9rem',
                cursor: 'pointer',
                transition: 'all 0.15s'
              }}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Right Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Verified User Badge */}
          <div className="badge badge-success" style={{ background: 'rgba(21, 128, 61, 0.2)', color: '#4ade80', border: '1px solid rgba(74, 222, 128, 0.3)' }}>
            <UserCheck size={14} />
            <span>{t.eIdVerified}: TJ9876543</span>
          </div>

          {/* Search Trigger */}
          <button
            onClick={() => setShowSearchModal(true)}
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#cbd5e1',
              padding: '8px 12px',
              borderRadius: 'var(--radius-sm)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.85rem'
            }}
          >
            <Search size={16} />
            <span>Search</span>
          </button>

          {/* Role Switcher */}
          <button
            onClick={() => setRole(currentRole === 'CITIZEN' ? 'OFFICER' : 'CITIZEN')}
            style={{
              background: currentRole === 'OFFICER' ? '#b45309' : 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: '#ffffff',
              padding: '8px 14px',
              borderRadius: 'var(--radius-sm)',
              fontWeight: 600,
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            {currentRole === 'CITIZEN' ? <Building2 size={16} /> : <UserCheck size={16} />}
            <span>{currentRole === 'CITIZEN' ? t.officerMode : t.citizenMode}</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#ffffff',
              padding: '8px',
              borderRadius: 'var(--radius-sm)',
              cursor: 'pointer'
            }}
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>
      </header>

      {/* Quick Search Modal */}
      {showSearchModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          zIndex: 200,
          display: 'flex',
          justifyContent: 'center',
          paddingTop: '80px'
        }} onClick={() => setShowSearchModal(false)}>
          <div className="gov-card" style={{ width: '600px', height: 'fit-content', padding: '24px' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '12px', marginBottom: '16px' }}>
              <Search size={20} color="var(--gov-blue)" />
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                autoFocus
                className="gov-input"
                style={{ border: 'none' }}
              />
              <button onClick={() => setShowSearchModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
