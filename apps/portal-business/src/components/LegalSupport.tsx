import React from 'react';
import { HelpCircle, FileText, Download, Phone, ShieldCheck, ExternalLink } from 'lucide-react';

export const LegalSupport: React.FC = () => {
  const faqs = [
    {
      q: 'Мӯҳлати бақайдгирии давлатии ҶДММ дар системаи biz.gov.tj чанд рӯз аст?',
      a: 'Бақайдгирии давлатӣ дар низоми "Тирезаи ягона" дар муҳлати то 3 рӯзи корӣ аз ҷониби мақомоти андоз ва адлия анҷом дода мешавад.'
    },
    {
      q: 'Сармояи ҳадди ақали низомномавии ҶДММ чӣ қадар аст?',
      a: 'Мувофиқи қонунгузории Ҷумҳурии Тоҷикистон сармояи низомномавии ҳадди ақал барои ҶДММ 500 сомониро ташкил медиҳад.'
    },
    {
      q: 'Чӣ тавр метавонам имзои рақамии E-Key-ро ба даст орам?',
      a: 'Имзои рақамӣ дар ҳама гуна маркази хизматрасонии мақомоти андоз ё тавассути барномаи мобилии E-Gov бевосита дода мешавад.'
    }
  ];

  const templates = [
    { name: 'Намунаи Оинномаи ҶДММ (Charter Template 2026)', size: '245 KB' },
    { name: 'Протоколи маҷлиси муассисон (Founders Resolution)', size: '180 KB' },
    { name: 'Шартномаи намунавии иҷора барои суроғаи ҳуқуқӣ', size: '310 KB' }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="glass-panel rounded-2xl p-6 space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
          <HelpCircle className="w-4 h-4" /> Маркази раҳнамо ва қонунгузорӣ
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
          Дастгирии ҳуқуқӣ ва қоидаҳои соҳибкорӣ дар ҶТ
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Шаблонҳои расими ҳуҷҷатҳо, Кодекси андози ҶТ ва саволҳои зуд-зуд додашаванда
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Templates */}
        <div className="glass-panel rounded-2xl p-6 space-y-4">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
            <FileText className="w-4 h-4 text-emerald-600" /> Шаблонҳо ва намунаи ҳуҷҷатҳо
          </h3>
          <div className="space-y-2">
            {templates.map((tmpl, idx) => (
              <div key={idx} className="p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-slate-800 dark:text-slate-200">{tmpl.name}</div>
                  <div className="text-[10px] text-slate-400">{tmpl.size}</div>
                </div>
                <button 
                  onClick={() => alert(`Шаблони "${tmpl.name}" боргирӣ шуд.`)}
                  className="btn btn-outline btn-sm text-[11px]"
                >
                  <Download className="w-3.5 h-3.5" /> Bor
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Support Hotline */}
        <div className="glass-panel rounded-2xl p-6 space-y-4">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
            <Phone className="w-4 h-4 text-emerald-600" /> Маркази алоқа ва машварат
          </h3>
          <div className="p-4 rounded-xl bg-emerald-950 text-white space-y-2 text-xs">
            <div className="text-amber-400 font-bold">Телефони боэътимоди мақомоти андоз:</div>
            <div className="text-xl font-extrabold font-mono text-emerald-200">+992 (37) 221-88-00</div>
            <div className="text-[11px] text-emerald-300">
              Рӯзҳои корӣ: Дӯшанбе - Ҷумъа (08:00 - 17:00)
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="glass-panel rounded-2xl p-6 space-y-4">
        <h3 className="font-bold text-sm text-slate-900 dark:text-white">
          Саволҳои зуд-зуд додашаванда (FAQ)
        </h3>
        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 space-y-1 text-xs">
              <div className="font-bold text-slate-900 dark:text-white">{faq.q}</div>
              <div className="text-slate-600 dark:text-slate-400">{faq.a}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
