import React, { useState } from 'react';
import { ApplicationRecord } from '../types';
import { 
  Building2, 
  FileCheck2, 
  Layers, 
  ShieldCheck, 
  Plus, 
  ArrowUpRight, 
  Clock, 
  Search, 
  Filter, 
  Award, 
  CheckCircle2, 
  AlertCircle, 
  ChevronRight,
  Sparkles,
  Calendar
} from 'lucide-react';

interface DashboardProps {
  applications: ApplicationRecord[];
  onNavigate: (tab: string) => void;
  onSelectApp: (app: ApplicationRecord) => void;
  onViewCertificate: (app: ApplicationRecord) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ 
  applications, 
  onNavigate, 
  onSelectApp, 
  onViewCertificate 
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const approvedCount = applications.filter(a => a.status === 'approved').length;
  const reviewCount = applications.filter(a => a.status === 'under_review').length;
  const actionCount = applications.filter(a => a.status === 'action_required').length;

  const filteredApps = applications.filter(app => {
    const matchesSearch = app.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          app.applicationNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          app.applicantName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || app.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Top Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 opacity-10 flex items-center pr-6 pointer-events-none">
          <Building2 className="w-72 h-72 text-emerald-400" />
        </div>

        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 border border-emerald-600 text-emerald-200 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Хуш омадед ба biz.gov.tj
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Кабинети Шахсии Соҳибкор ва Субъекти Хоҷагидорӣ
          </h1>

          <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
            Бақайдгирии давлатии тиҷорат, гирифтани иҷозатномаҳои соҳавӣ ва пайгирии дараҷаи иҷрои аризаҳо дар як макон.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onNavigate('registration')}
              className="btn bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg"
            >
              <Plus className="w-4 h-4" /> Бақайдгирии тиҷорати нав
            </button>
            <button
              onClick={() => onNavigate('permits')}
              className="btn btn-outline border-emerald-400 text-emerald-100 hover:bg-emerald-800/50 text-xs"
            >
              <Layers className="w-4 h-4" /> Каталоги иҷозатномаҳо
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Metric 1 */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Корхонаҳои фаъол</span>
            <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white">1 ҶДММ</div>
          <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
            ҶДММ "Сомон Сохтмон" (ШИН: 040058912)
          </div>
        </div>

        {/* Metric 2 */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Дархостҳо дар баррасӣ</span>
            <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white">{reviewCount} дархост</div>
          <div className="text-[11px] text-blue-600 dark:text-blue-400 font-medium">
            Мақомоти андоз ва сохтмон
          </div>
        </div>

        {/* Metric 3 */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Шаҳодатномаҳо ва Литсензияҳо</span>
            <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-600">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white">{approvedCount} ҳуҷҷат</div>
          <div className="text-[11px] text-amber-600 dark:text-amber-400 font-medium">
            Бо рамзи QR-и давлатӣ тасдиқ шудааст
          </div>
        </div>

        {/* Metric 4 */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Огоҳиномаҳои фаврӣ</span>
            <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-600">
              <AlertCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white">{actionCount} амал</div>
          <div className="text-[11px] text-amber-600 dark:text-amber-400 font-medium">
            Талаби мушаххасоти иловагӣ
          </div>
        </div>

      </div>

      {/* Main Applications Section */}
      <div className="glass-panel rounded-2xl p-6 space-y-6">
        
        {/* Table Header & Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-700 pb-4">
          <div>
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
              Ҷадвали ягонаи дархостҳо ва иҷозатномаҳо
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Барои муоинаи марҳила ба марҳила ё гирифтани Шаҳодатнома ба сатр пахш намоед.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: 'Ҳама' },
              { id: 'under_review', label: 'Дар баррасӣ' },
              { id: 'approved', label: 'Тасдиқшуда' },
              { id: 'action_required', label: 'Огоҳидошта' }
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setFilterStatus(f.id)}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                  filterStatus === f.id
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Ҷустуҷӯ мувофиқи рақами ариза ё номи субъект..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 font-bold uppercase tracking-wider">
              <tr>
                <th className="p-3">Рақами Ариза</th>
                <th className="p-3">Мавзӯъ ва Шакл</th>
                <th className="p-3">Санаи Ирсол</th>
                <th className="p-3">Ҳолат (Status)</th>
                <th className="p-3">Пешрафт</th>
                <th className="p-3 text-right">Амал</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-medium">
              {filteredApps.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500">
                    Ҳеҷ як дархост бо ин меъёр ёфта нашуд.
                  </td>
                </tr>
              ) : (
                filteredApps.map(app => (
                  <tr 
                    key={app.id}
                    onClick={() => onSelectApp(app)}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors"
                  >
                    <td className="p-3 font-mono font-bold text-emerald-600 dark:text-emerald-400">
                      {app.applicationNumber}
                    </td>
                    <td className="p-3">
                      <div className="font-bold text-slate-900 dark:text-white">{app.title}</div>
                      <div className="text-[10px] text-slate-400">{app.category}</div>
                    </td>
                    <td className="p-3 text-slate-600 dark:text-slate-300">{app.submittedDate}</td>
                    <td className="p-3">
                      <span className={`badge ${
                        app.status === 'approved' ? 'badge-approved' :
                        app.status === 'under_review' ? 'badge-under_review' : 'badge-action_required'
                      }`}>
                        {app.status === 'approved' ? 'Тасдиқ шуд' :
                         app.status === 'under_review' ? 'Дар баррасӣ' : 'Огоҳӣ'}
                      </span>
                    </td>
                    <td className="p-3 w-36">
                      <div className="flex items-center gap-2">
                        <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                          <div 
                            className="bg-emerald-600 h-full rounded-full"
                            style={{ width: `${app.progressPercent}%` }}
                          />
                        </div>
                        <span className="text-[10px] font-bold text-slate-500">{app.progressPercent}%</span>
                      </div>
                    </td>
                    <td className="p-3 text-right">
                      {app.status === 'approved' ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onViewCertificate(app);
                          }}
                          className="btn btn-sm bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-[11px]"
                        >
                          <Award className="w-3.5 h-3.5" /> Шаҳодатнома
                        </button>
                      ) : (
                        <button className="p-1 rounded-lg text-slate-400 hover:text-emerald-600">
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
};
