import React from 'react';
import { Language } from '../types';
import { 
  Building2, 
  Globe, 
  Moon, 
  Sun, 
  Bell, 
  CheckCircle2, 
  ShieldCheck, 
  User,
  Search
} from 'lucide-react';

interface HeaderProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  activeTab: string;
  onNavigate: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLang,
  onLanguageChange,
  darkMode,
  onToggleDarkMode,
  onNavigate
}) => {
  const getLangLabel = (lang: Language) => {
    switch (lang) {
      case 'tj': return 'Тоҷикӣ';
      case 'ru': return 'Русский';
      case 'en': return 'English';
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b transition-colors">
      {/* Top Government Ribbon */}
      <div className="bg-emerald-800 text-emerald-100 text-xs px-4 py-1.5 flex items-center justify-between font-medium">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
          <span>Ҷумҳурии Тоҷикистон | Сайти расмии мақомоти давлатӣ (biz.gov.tj)</span>
        </div>
        <div className="flex items-center gap-4 text-emerald-200">
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" /> E-Signature (Калиди рақамӣ): Фаъол
          </span>
          <span>Дастгирӣ: +992 (37) 221-88-00</span>
        </div>
      </div>

      {/* Main Header Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <div 
          onClick={() => onNavigate('dashboard')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight text-emerald-700 dark:text-emerald-400">biz.gov.tj</span>
              <span className="px-1.5 py-0.5 text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 rounded uppercase">
                Реестр
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Портали ягонаи соҳибкорӣ ва иҷозатномадиҳӣ
            </p>
          </div>
        </div>

        {/* Global Quick Search */}
        <div className="hidden md:flex items-center relative max-w-xs w-full">
          <Search className="w-4 h-4 absolute left-3 text-slate-400" />
          <input
            type="text"
            placeholder="Ҷустуҷӯи хизматрасонӣ ё иҷозатнома..."
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Actions & Utilities */}
        <div className="flex items-center gap-3">
          {/* Language Selector */}
          <div className="relative flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg border border-slate-200 dark:border-slate-700">
            <Globe className="w-3.5 h-3.5 text-slate-500 ml-1.5" />
            {(['tj', 'ru', 'en'] as Language[]).map((lang) => (
              <button
                key={lang}
                onClick={() => onLanguageChange(lang)}
                className={`px-2 py-0.5 text-xs font-semibold rounded-md transition-all ${
                  currentLang === lang
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Dark Mode Toggle */}
          <button
            onClick={onToggleDarkMode}
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Табдили низоми рӯшноӣ/торикӣ"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Notifications */}
          <button className="relative p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-900" />
          </button>

          {/* User Profile Badge */}
          <div className="pl-2 border-l border-slate-200 dark:border-slate-700 flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 flex items-center justify-center font-bold text-xs">
              РА
            </div>
            <div className="hidden lg:block text-left">
              <div className="text-xs font-bold text-slate-800 dark:text-slate-200">Раҳимов А. Ҷ.</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400">ШИН: 040058912</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
