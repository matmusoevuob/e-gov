import React, { useState } from 'react';
import { Search, Building2, CheckCircle2, ShieldCheck, FileText, QrCode } from 'lucide-react';

export const ERegistrySearch: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [searched, setSearched] = useState<boolean>(false);

  const mockRegistry = [
    {
      tin: '040058912',
      name: 'ҶДММ "Сомон Сохтмон ва Сифат"',
      type: 'Ҷамъияти дорои масъулияти маҳдуд',
      director: 'Раҳимов Алишер Ҷамшедович',
      registrationDate: '2026-08-01',
      status: 'Фаъол (Active)',
      region: 'ш. Душанбе'
    },
    {
      tin: '030011928',
      name: 'ҶДММ "Авас Трейдинг"',
      type: 'Ҷамъияти дорои масъулияти маҳдуд',
      director: 'Каримов Саид Амонович',
      registrationDate: '2024-03-15',
      status: 'Фаъол (Active)',
      region: 'Вилояти Суғд'
    },
    {
      tin: '050098112',
      name: 'СИ "Ҳасанов Иброҳим"',
      type: 'Соҳибкори инфиродӣ',
      director: 'Ҳасанов Иброҳим',
      registrationDate: '2025-01-10',
      status: 'Фаъол (Active)',
      region: 'Вилояти Хатлон'
    }
  ];

  const results = searched ? mockRegistry.filter(r => 
    r.name.toLowerCase().includes(query.toLowerCase()) || 
    r.tin.includes(query) ||
    r.director.toLowerCase().includes(query.toLowerCase())
  ) : mockRegistry;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="glass-panel rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4" /> Пойгоҳи ягонаи кушоди давлатӣ
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
          Реестри ягонаи давлатии шахсони ҳуқуқӣ ва соҳибкорон (biz.gov.tj)
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Ҷустуҷӯ ва санҷиши қонунияти фаъолияти корхонаҳо, ШИН (ИНН) ва мақоми шаҳодатномаҳо
        </p>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="ШИН (ИНН), номи корхона ё номи директорро ворид кунед..."
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              value={query}
              onChange={e => {
                setQuery(e.target.value);
                setSearched(true);
              }}
            />
          </div>
          <button 
            onClick={() => setSearched(true)}
            className="btn btn-primary text-xs shrink-0"
          >
            Ҷустуҷӯ дар Реестр
          </button>
        </div>
      </div>

      <div className="glass-panel rounded-2xl p-6 space-y-4">
        <div className="font-bold text-sm text-slate-800 dark:text-slate-200">
          Натиҷаҳои Реестр ({results.length} субъект)
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {results.map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                  ШИН: {item.tin}
                </span>
                <span className="badge badge-approved">
                  <CheckCircle2 className="w-3 h-3" /> {item.status}
                </span>
              </div>

              <div className="font-extrabold text-sm text-slate-900 dark:text-white">
                {item.name}
              </div>

              <div className="text-slate-500 space-y-0.5">
                <div>Шакл: <span className="text-slate-800 dark:text-slate-200">{item.type}</span></div>
                <div>Директор: <span className="text-slate-800 dark:text-slate-200">{item.director}</span></div>
                <div>Суроға: <span className="text-slate-800 dark:text-slate-200">{item.region}</span></div>
                <div>Санаи бақайдгирӣ: <span className="text-slate-800 dark:text-slate-200">{item.registrationDate}</span></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
