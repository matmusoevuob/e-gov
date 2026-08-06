import React from 'react';
import { ApplicationRecord } from '../types';
import { 
  X, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  Building2, 
  CreditCard, 
  Award,
  ArrowRight
} from 'lucide-react';

interface ModalProps {
  app: ApplicationRecord;
  onClose: () => void;
  onViewCertificate?: (app: ApplicationRecord) => void;
}

export const ApplicationDetailModal: React.FC<ModalProps> = ({ app, onClose, onViewCertificate }) => {
  const getBadgeClass = (status: string) => {
    switch (status) {
      case 'approved': return 'badge-approved';
      case 'under_review': return 'badge-under_review';
      case 'action_required': return 'badge-action_required';
      default: return 'badge-draft';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved': return 'Тасдиқ шуд ва дода шуд';
      case 'under_review': return 'Дар баррасии мақомот';
      case 'action_required': return 'Талаби маълумоти иловагӣ';
      default: return 'Лоиҳа (Draft)';
    }
  };

  return (
    <div className="modal-backdrop animate-fade-in">
      <div className="modal-content max-w-2xl">
        <div className="p-6 space-y-6">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  {app.applicationNumber}
                </span>
                <span className={`badge ${getBadgeClass(app.status)}`}>
                  {getStatusText(app.status)}
                </span>
              </div>
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white mt-1">
                {app.title}
              </h3>
            </div>
            <button 
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Workflow Timeline */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
              <span>Хатти раванди коркарди ариза (Workflow Timeline)</span>
              <span>{app.progressPercent}% Анҷом ёфт</span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-200 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
              <div 
                className="bg-emerald-600 h-full transition-all duration-500 rounded-full"
                style={{ width: `${app.progressPercent}%` }}
              />
            </div>

            <div className="text-xs text-emerald-700 dark:text-emerald-300 font-semibold flex items-center gap-1.5">
              <Clock className="w-4 h-4 shrink-0" />
              <span>Марҳилаи ҷорӣ: {app.processingStage}</span>
            </div>
          </div>

          {/* Application Attributes */}
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-700">
              <span className="text-slate-400 block">Аризадиҳанда:</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">{app.applicantName}</span>
            </div>
            <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-700">
              <span className="text-slate-400 block">Соҳа / Категория:</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">{app.category}</span>
            </div>
            <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-700">
              <span className="text-slate-400 block">Санаи ирсол:</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">{app.submittedDate}</span>
            </div>
            <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-700">
              <span className="text-slate-400 block">Ҳолати пардохт (Боҷ):</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">
                {app.feeAmount} TJS ({app.paymentStatus === 'paid' ? 'Пардохт шуд' : 'Интизорӣ'})
              </span>
            </div>
          </div>

          {/* Notes / Remarks */}
          {app.notes && (
            <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 space-y-1">
              <div className="font-bold flex items-center gap-1">
                <AlertCircle className="w-4 h-4 text-amber-600" /> Эзоҳ ва огоҳии мақомот:
              </div>
              <p>{app.notes}</p>
            </div>
          )}

          {/* Certificate CTA if approved */}
          {app.status === 'approved' && onViewCertificate && (
            <div className="p-4 rounded-xl bg-emerald-950 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Award className="w-8 h-8 text-amber-400 shrink-0" />
                <div>
                  <div className="font-extrabold text-sm">Шаҳодатномаи давлатӣ омода аст!</div>
                  <div className="text-xs text-emerald-300">Рақами Шаҳодатнома: {app.certificateNumber}</div>
                </div>
              </div>
              <button
                onClick={() => {
                  onClose();
                  onViewCertificate(app);
                }}
                className="btn btn-sm bg-amber-500 text-slate-950 font-bold hover:bg-amber-400"
              >
                Муоинаи Шаҳодатнома
              </button>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200 dark:border-slate-700">
            <button 
              onClick={onClose}
              className="btn btn-outline text-xs"
            >
              Пӯшидан
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
