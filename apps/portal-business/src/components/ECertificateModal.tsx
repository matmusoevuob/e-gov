import React from 'react';
import { ApplicationRecord } from '../types';
import { ShieldCheck, Award, QrCode, Download, Printer, X, CheckCircle2 } from 'lucide-react';

interface CertificateProps {
  app: ApplicationRecord;
  onClose: () => void;
}

export const ECertificateModal: React.FC<CertificateProps> = ({ app, onClose }) => {
  const details = app.details || {};

  return (
    <div className="modal-backdrop animate-fade-in">
      <div className="modal-content max-w-3xl border-2 border-emerald-500/50 shadow-2xl bg-slate-900 text-slate-100">
        <div className="p-6 sm:p-8 space-y-6 relative overflow-hidden">
          
          {/* Watermark Emblem simulation */}
          <div className="absolute right-6 top-12 opacity-5 pointer-events-none">
            <Award className="w-80 h-80 text-emerald-400" />
          </div>

          {/* Top Bar */}
          <div className="flex items-center justify-between border-b border-slate-700 pb-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
              <span className="font-bold text-xs uppercase tracking-widest text-emerald-400">
                ҶУМҲУРИИ ТОҶИКИСТОН | ВАЗОРАТИ АНДОЗ ВА АДЛИЯ
              </span>
            </div>
            <button 
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-slate-800 text-slate-400"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Certificate Main Title Box */}
          <div className="text-center space-y-2 py-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-wide text-amber-300 uppercase">
              ШАҲОДАТНОМАИ БАҚАЙДГИРИИ ДАВЛАТӢ
            </h2>
            <p className="text-xs text-slate-300 font-serif italic">
              Реестри ягонаи давлатии шахсони ҳуқуқӣ ва соҳибкорони инфиродии Ҷумҳурии Тоҷикистон
            </p>
            <div className="inline-block px-4 py-1 rounded-full bg-emerald-950 border border-emerald-600 text-emerald-300 font-mono text-sm font-bold">
              № {app.certificateNumber || 'E-REG-TJ-2026-994102'}
            </div>
          </div>

          {/* Main Attributes Grid */}
          <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="text-slate-400 block">Номи пурраи субъект:</span>
                <span className="font-bold text-sm text-white">{details.fullNameTajik || app.title}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Рақами мушаххаси андозсупоранда (ШИН/ИНН):</span>
                <span className="font-mono font-bold text-sm text-emerald-400">{app.tin || '040058912'}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3 border-t border-slate-700">
              <div>
                <span className="text-slate-400 block">Шакли ташкилию ҳуқуқӣ:</span>
                <span className="font-semibold text-slate-200">{app.category}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Муассис ва роҳбар:</span>
                <span className="font-semibold text-slate-200">{details.founderName || app.applicantName}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Санаи бақайдгирӣ:</span>
                <span className="font-semibold text-slate-200">{app.submittedDate}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-700">
              <span className="text-slate-400 block">Суроғаи ҳуқуқӣ:</span>
              <span className="font-semibold text-slate-200">{details.region || 'ш. Душанбе'}, {details.streetAddress || 'кӯчаи Рӯдакӣ, 45'}</span>
            </div>
          </div>

          {/* QR & Digital Seal Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-700">
            <div className="flex items-center gap-3">
              <div className="w-20 h-20 bg-white p-2 rounded-xl flex items-center justify-center shrink-0">
                <QrCode className="w-16 h-16 text-slate-950" />
              </div>
              <div className="text-[11px] text-slate-400 space-y-0.5">
                <div className="text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Тасдиқи рақамӣ дар biz.gov.tj
                </div>
                <div>Коди QR барои санҷиши ҳақиқӣ дар Реестр</div>
                <div className="font-mono text-[10px]">HASH: 8f9a2b7e1c9d4e5f</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={() => window.print()}
                className="btn btn-outline btn-sm text-xs border-slate-600 text-slate-300 hover:bg-slate-800"
              >
                <Printer className="w-3.5 h-3.5" /> Чоп кардан
              </button>
              <button 
                onClick={() => alert('Файли PDF-и Шаҳодатнома боргирӣ шуд.')}
                className="btn btn-primary btn-sm text-xs bg-emerald-600 hover:bg-emerald-500"
              >
                <Download className="w-3.5 h-3.5" /> Боргирии PDF
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
