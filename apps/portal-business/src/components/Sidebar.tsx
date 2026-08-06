import React from 'react';
import { 
  LayoutDashboard, 
  FilePlus, 
  FileCheck2, 
  Layers, 
  Search, 
  HelpCircle,
  Sparkles,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onNavigate: (tab: string) => void;
  pendingCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onNavigate, pendingCount }) => {
  const menuItems = [
    {
      id: 'dashboard',
      label: 'Омор ва Идоракунӣ',
      sublabel: 'Dashboard & Metrics',
      icon: LayoutDashboard
    },
    {
      id: 'registration',
      label: 'Бақайдгирии тиҷорат',
      sublabel: 'Business Registration Wizard',
      icon: FilePlus,
      badge: 'Асосӣ'
    },
    {
      id: 'permits',
      label: 'Иҷозатнома ва литсензияҳо',
      sublabel: 'Permits & Clearances',
      icon: Layers
    },
    {
      id: 'applications',
      label: 'Дархостҳои ман',
      sublabel: 'My Applications',
      icon: FileCheck2,
      count: pendingCount
    },
    {
      id: 'search',
      label: 'Реестри ягонаи давлатӣ',
      sublabel: 'Public E-Registry',
      icon: Search
    },
    {
      id: 'support',
      label: 'Раҳнамо ва қонунгузорӣ',
      sublabel: 'Legal Guide & Support',
      icon: HelpCircle
    }
  ];

  return (
    <aside className="w-full lg:w-72 flex-shrink-0">
      <div className="glass-panel rounded-2xl p-4 sticky top-24 space-y-6">
        {/* User Workspace Card */}
        <div className="p-3.5 rounded-xl bg-gradient-to-r from-emerald-900 to-teal-900 text-white shadow-md">
          <div className="flex items-center gap-2 text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Портали Соҳибкорӣ
          </div>
          <h3 className="font-bold text-sm">ҶДММ "Сомон Сохтмон"</h3>
          <p className="text-[11px] text-emerald-200 mt-0.5">Ҳолат: Фаъолияти қонунӣ (ШИН: 040058912)</p>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-all duration-200 group ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20 font-semibold'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold leading-tight">{item.label}</div>
                    <div className={`text-[10px] ${isActive ? 'text-emerald-100' : 'text-slate-400'}`}>
                      {item.sublabel}
                    </div>
                  </div>
                </div>

                {item.badge && (
                  <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                    {item.badge}
                  </span>
                )}

                {item.count !== undefined && item.count > 0 && (
                  <span className={`px-2 py-0.5 text-[10px] font-extrabold rounded-full ${
                    isActive 
                      ? 'bg-white text-emerald-700' 
                      : 'bg-amber-500 text-white'
                  }`}>
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Fast CTA Card */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400 mb-1">
            <Sparkles className="w-4 h-4" />
            Дастгирии тиҷорат
          </div>
          <p className="text-[11px] text-slate-600 dark:text-slate-400 mb-3">
            Оё мехоҳед тиҷорати навро дар 15 дақиқа ба қайд гиред? Раванди 5-марҳилаиро оғоз кунед.
          </p>
          <button
            onClick={() => onNavigate('registration')}
            className="w-full btn btn-primary text-xs py-2 flex items-center justify-center gap-1.5"
          >
            Оғози бақайдгирӣ <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
};
