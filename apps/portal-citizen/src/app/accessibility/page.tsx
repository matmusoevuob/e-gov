import React from "react";
import { Metadata } from "next";
import { CheckCircle2, ShieldCheck, Eye, Keyboard, Sparkles, PhoneCall } from "lucide-react";

export const metadata: Metadata = {
  title: "Баёнияи Дастрасӣ (WCAG 2.1 AA) | my.gov.tj",
  description: "Маълумот оид ба мутобиқати портали my.gov.tj ба стандарти байналмилалии дастрасии WCAG 2.1 Level AA",
};

export default function AccessibilityPage() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
          <ShieldCheck className="w-4 h-4" aria-hidden="true" />
          <span>WCAG 2.1 AA Standard Compliant</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white">
          Баёнияи Дастрасии Рақамӣ (Accessibility Statement)
        </h1>
        <p className="text-slate-300 text-sm leading-relaxed">
          Портали ягонаи хизматрасониҳои давлатии Ҷумҳурии Тоҷикистон (my.gov.tj) ба он нигаронида шудааст, ки ҳамаи шаҳрвандон, аз ҷумла шахсони дорои имкониятҳои маҳдуди ҷисмонӣ ва биниш, тавонанд ба таври баробар ва бемамониат аз хизматномаҳои рақамӣ фоида баранд.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-base">
            <Eye className="w-5 h-5" aria-hidden="true" />
            <span>Контраст ва Андозаи Матн</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Нисбати контрасти рангҳо ба талаботи WCAG 2.1 AA (4.5:1 барои матни муқаррарӣ ва 3:1 барои матни калон) тобеъ аст. Илова бар ин, танзимоти контрасти баланд ва такмили андозаи матн то 130% мавҷуд аст.
          </p>
        </div>

        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-base">
            <Keyboard className="w-5 h-5" aria-hidden="true" />
            <span>Навигатсияи Клавиатуравӣ</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Ҳамаи тугмаҳо, пайвандҳо ва равзанаҳои муколамавӣ (Modal dialogues) пурра тавассути тугмаҳои <kbd className="bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700 font-mono text-[10px]">Tab</kbd>, <kbd className="bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700 font-mono text-[10px]">Enter</kbd> ва <kbd className="bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700 font-mono text-[10px]">Escape</kbd> идора мешаванд.
          </p>
        </div>
      </div>

      <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-emerald-400" aria-hidden="true" />
          Хусусиятҳои амалисозишудаи дастрасӣ:
        </h2>
        <ul className="space-y-3 text-xs text-slate-300">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
            <span><strong>Пайванди "Ба қисми асосӣ гузаред" (Skip Link):</strong> Иҷозат медиҳад, ки корбар мустақиман ба муҳтавои асосии саҳифа бидуни гузаштан аз меню ворид шавад.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
            <span><strong>Атрибутҳои ARIA ва HTML Semantic:</strong> Истифодаи тегҳои <code>&lt;header&gt;</code>, <code>&lt;nav&gt;</code>, <code>&lt;main&gt;</code>, <code>&lt;footer&gt;</code> ва <code>aria-live</code> барои огоҳиҳои мустақим.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
            <span><strong>Муҳофизати фокус (Focus Trapping):</strong> Ҳангоми кушодани равзанаҳои муколамавӣ (Modal dialogues) фокус дар дохили равзана нигоҳ дошта шуда, бо <code>Escape</code> пӯшида мешавад.</span>
          </li>
        </ul>
      </div>

      <div className="bg-emerald-950/40 border border-emerald-500/40 p-6 rounded-2xl space-y-2">
        <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
          <PhoneCall className="w-4 h-4" aria-hidden="true" />
          Муроҷиат оид ба мушкилоти дастрасӣ
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          Агар шумо ҳангоми истифодаи портали my.gov.tj бо ягон мушкилии дастрасӣ дучор шавед, лутфан ба маркази дастгирӣ тавассути почтаи <strong>accessibility@my.gov.tj</strong> ё рақами кӯтоҳи <strong>1919</strong> хабар диҳед.
        </p>
      </div>
    </div>
  );
}
