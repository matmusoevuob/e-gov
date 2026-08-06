import React, { useState } from 'react';
import { PermitCategory } from '../types';
import { PERMIT_CATEGORIES } from '../data/mockData';
import { 
  Layers, 
  Search, 
  Filter, 
  Clock, 
  CreditCard, 
  CheckCircle2, 
  FileText, 
  ArrowRight, 
  ShieldCheck, 
  Upload, 
  X,
  Building,
  QrCode
} from 'lucide-react';

interface PermitsProps {
  onApplySuccess: (newApp: any) => void;
}

export const PermitCatalogAndApply: React.FC<PermitsProps> = ({ onApplySuccess }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedSector, setSelectedSector] = useState<string>('all');
  const [selectedPermit, setSelectedPermit] = useState<PermitCategory | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  
  // Application modal state
  const [uploadedDocs, setUploadedDocs] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [paymentDone, setPaymentDone] = useState<boolean>(false);

  const filteredPermits = PERMIT_CATEGORIES.filter(permit => {
    const matchesSearch = permit.titleTajik.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          permit.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          permit.authority.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSector = selectedSector === 'all' || permit.sector === selectedSector;
    return matchesSearch && matchesSector;
  });

  const sectors = ['all', ...Array.from(new Set(PERMIT_CATEGORIES.map(p => p.sector)))];

  const handleOpenApply = (permit: PermitCategory) => {
    setSelectedPermit(permit);
    setUploadedDocs({});
    setPaymentDone(false);
    setIsModalOpen(true);
  };

  const handleToggleDoc = (docName: string) => {
    setUploadedDocs(prev => ({
      ...prev,
      [docName]: !prev[docName]
    }));
  };

  const handleConfirmSubmit = () => {
    if (!selectedPermit) return;
    setIsSubmitting(true);

    setTimeout(() => {
      const appNum = `TJ-PERM-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      setIsSubmitting(false);
      setIsModalOpen(false);

      const newPermitApp = {
        id: `app-perm-${Date.now()}`,
        applicationNumber: appNum,
        type: 'permit',
        title: selectedPermit.titleTajik,
        category: selectedPermit.sector,
        submittedDate: new Date().toISOString().split('T')[0],
        updatedDate: new Date().toISOString().split('T')[0],
        status: 'under_review',
        processingStage: `Ариза ба ${selectedPermit.authority} ирсол шуд`,
        progressPercent: 20,
        applicantName: 'ҶДММ "Сомон Сохтмон ва Сифат"',
        tin: '040058912',
        feeAmount: selectedPermit.feeTJS,
        paymentStatus: paymentDone ? 'paid' : 'pending',
        notes: 'Ҳуҷҷатҳо дар баррасӣ мебошанд.'
      };

      onApplySuccess(newPermitApp);
    }, 1200);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Title & Filters */}
      <div className="glass-panel rounded-2xl p-6 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
              <Layers className="w-4 h-4" /> Каталоги ягонаи иҷозатномадиҳӣ
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
              Иҷозатномаҳо, литсензияҳо ва шаҳодатномаҳо
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Дархости онлайнии иҷозатномаҳои соҳавӣ аз мақомоти давлатии Ҷумҳурии Тоҷикистон
            </p>
          </div>

          <div className="px-3 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs font-semibold text-emerald-800 dark:text-emerald-300">
            Журнали ягона: {PERMIT_CATEGORIES.length} намуди иҷозатномаҳои фаъол
          </div>
        </div>

        {/* Search & Sector Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 border-t border-slate-200 dark:border-slate-700">
          <div className="md:col-span-2 relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Ҷустуҷӯи иҷозатнома мувофиқи ном, код ё мақомоти ваколатдор..."
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="relative">
            <Filter className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <select
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              value={selectedSector}
              onChange={e => setSelectedSector(e.target.value)}
            >
              {sectors.map(sec => (
                <option key={sec} value={sec}>
                  {sec === 'all' ? 'Ҳамаи соҳаҳо (All Sectors)' : sec}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Grid of Permits */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPermits.map(permit => (
          <div 
            key={permit.id}
            className="glass-panel rounded-2xl p-6 flex flex-col justify-between hover:shadow-xl transition-all duration-300 border border-slate-200/80 dark:border-slate-800 group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-mono text-[11px] font-bold rounded-lg border border-slate-200 dark:border-slate-700">
                  {permit.code}
                </span>
                <span className="text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {permit.processingDays} рӯзи корӣ
                </span>
              </div>

              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white line-clamp-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                {permit.titleTajik}
              </h3>

              <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="truncate">{permit.authority}</span>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                {permit.description}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-700/80 mt-4 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 block font-medium">Боҷи давлатӣ:</span>
                <span className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400">
                  {permit.feeTJS} TJS
                </span>
              </div>

              <button
                onClick={() => handleOpenApply(permit)}
                className="btn btn-primary btn-sm text-xs flex items-center gap-1"
              >
                Ирсоли ариза <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Application Modal */}
      {isModalOpen && selectedPermit && (
        <div className="modal-backdrop animate-fade-in">
          <div className="modal-content max-w-2xl">
            <div className="p-6 space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-4">
                <div>
                  <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider font-mono">
                    {selectedPermit.code}
                  </span>
                  <h3 className="text-lg font-extrabold text-slate-900 dark:text-white mt-0.5">
                    {selectedPermit.titleTajik}
                  </h3>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Requirements Checklist */}
              <div className="space-y-3">
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500">
                  Ҳуҷҷатҳои зарурӣ барои боргирӣ ({Object.keys(uploadedDocs).filter(k => uploadedDocs[k]).length}/{selectedPermit.requiredDocuments.length})
                </h4>

                <div className="space-y-2">
                  {selectedPermit.requiredDocuments.map((doc, idx) => {
                    const isUploaded = !!uploadedDocs[doc];
                    return (
                      <div 
                        key={idx}
                        onClick={() => handleToggleDoc(doc)}
                        className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                          isUploaded
                            ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/30 text-emerald-950 dark:text-emerald-100'
                            : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-3 text-xs font-medium">
                          <FileText className={`w-4 h-4 ${isUploaded ? 'text-emerald-600' : 'text-slate-400'}`} />
                          <span>{doc}</span>
                        </div>
                        <span className={`px-2 py-0.5 text-[10px] font-bold rounded ${
                          isUploaded ? 'bg-emerald-600 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                        }`}>
                          {isUploaded ? '✓ Боргирӣ шуд' : 'Боргирӣ'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Payment Section */}
              <div className="p-4 rounded-xl bg-slate-900 text-white space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 flex items-center gap-1">
                    <CreditCard className="w-4 h-4 text-emerald-400" /> Пардохти боҷ тавассути Шлюзи давлатӣ:
                  </span>
                  <span className="text-base font-extrabold text-emerald-400">{selectedPermit.feeTJS} TJS</span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
                  <span className="text-slate-400 flex items-center gap-1">
                    <QrCode className="w-4 h-4 text-amber-400" /> Пардохти фаврӣ бо QR Корти милли / Alif / Korti Milli
                  </span>
                  <button
                    onClick={() => setPaymentDone(!paymentDone)}
                    className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors ${
                      paymentDone 
                        ? 'bg-emerald-500 text-white' 
                        : 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                    }`}
                  >
                    {paymentDone ? '✓ Пардохт шуд' : 'Симулятсияи пардохт'}
                  </button>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200 dark:border-slate-700">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="btn btn-outline text-xs"
                >
                  Бекор кардан
                </button>
                <button
                  onClick={handleConfirmSubmit}
                  disabled={isSubmitting}
                  className="btn btn-primary text-xs flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Дар ҳоли ирсол...
                    </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      Ирсоли ариза <CheckCircle2 className="w-4 h-4" />
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
