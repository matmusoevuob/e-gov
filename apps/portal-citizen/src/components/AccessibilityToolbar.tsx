"use client";

import React, { useState } from "react";
import { useAccessibility } from "@/context/AccessibilityContext";
import { Eye, Type, Activity, Settings2, Check, X } from "lucide-react";

export const AccessibilityToolbar: React.FC = () => {
  const {
    highContrast,
    fontSizeScale,
    dyslexicFont,
    reducedMotion,
    toggleHighContrast,
    setFontSizeScale,
    toggleDyslexicFont,
    toggleReducedMotion,
  } = useAccessibility();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <aside aria-label="Accessibility options" className="relative z-50">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls="accessibility-panel"
        aria-label="Имкониятҳои дастрасӣ / Open Accessibility Tools"
        className="fixed bottom-6 right-6 bg-emerald-600 hover:bg-emerald-500 text-white p-3.5 rounded-full shadow-2xl focus:ring-4 focus:ring-emerald-300 transition-transform active:scale-95 flex items-center gap-2 font-medium text-sm border-2 border-emerald-400"
      >
        <Settings2 className="w-5 h-5" aria-hidden="true" />
        <span className="hidden sm:inline">Дастрасӣ / Accessibility</span>
      </button>

      {isOpen && (
        <div
          id="accessibility-panel"
          role="region"
          aria-label="Accessibility settings panel"
          className="fixed bottom-20 right-6 w-80 sm:w-96 bg-slate-900 border-2 border-slate-700 text-slate-100 p-6 rounded-2xl shadow-2xl space-y-5 animate-in fade-in slide-in-from-bottom-5"
        >
          <div className="flex items-center justify-between border-b border-slate-700 pb-3">
            <h2 className="text-lg font-bold text-emerald-400 flex items-center gap-2">
              <Eye className="w-5 h-5" aria-hidden="true" />
              Танзимоти дастрасӣ (WCAG 2.1 AA)
            </h2>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Пӯшидани равзанаи дастрасӣ / Close accessibility panel"
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>

          <div className="space-y-4">
            {/* High Contrast Toggle */}
            <div className="flex items-center justify-between bg-slate-800/80 p-3 rounded-xl border border-slate-700">
              <div className="space-y-0.5">
                <span className="text-sm font-semibold block text-slate-200">
                  Контрасти баланд / High Contrast
                </span>
                <span className="text-xs text-slate-400 block">
                  Рангҳои баландконтраст барои диди беҳтар
                </span>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={highContrast}
                onClick={toggleHighContrast}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  highContrast ? "bg-emerald-500" : "bg-slate-600"
                }`}
              >
                <span className="sr-only">Toggle high contrast mode</span>
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    highContrast ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            {/* Font Size Adjuster */}
            <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-200 flex items-center gap-1.5">
                  <Type className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                  Андозаи матн / Font Size
                </span>
                <span className="text-xs font-mono text-emerald-400 font-bold">
                  {Math.round(fontSizeScale * 100)}%
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: "100%", scale: 1 },
                  { label: "115%", scale: 1.15 },
                  { label: "130%", scale: 1.3 },
                ].map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => setFontSizeScale(item.scale)}
                    aria-pressed={fontSizeScale === item.scale}
                    className={`py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                      fontSizeScale === item.scale
                        ? "bg-emerald-600 text-white border-emerald-400"
                        : "bg-slate-700 text-slate-300 border-slate-600 hover:bg-slate-600"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Dyslexia Friendly Font Toggle */}
            <div className="flex items-center justify-between bg-slate-800/80 p-3 rounded-xl border border-slate-700">
              <div className="space-y-0.5">
                <span className="text-sm font-semibold block text-slate-200">
                  Шрифти хондани осон / Readable Font
                </span>
                <span className="text-xs text-slate-400 block">
                  Осон барои хониши шаҳрвандон
                </span>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={dyslexicFont}
                onClick={toggleDyslexicFont}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  dyslexicFont ? "bg-emerald-500" : "bg-slate-600"
                }`}
              >
                <span className="sr-only">Toggle readable font</span>
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    dyslexicFont ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            {/* Reduced Motion Toggle */}
            <div className="flex items-center justify-between bg-slate-800/80 p-3 rounded-xl border border-slate-700">
              <div className="space-y-0.5">
                <span className="text-sm font-semibold block text-slate-200 flex items-center gap-1">
                  <Activity className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                  Кам кардани ҳаракат / Reduced Motion
                </span>
                <span className="text-xs text-slate-400 block">
                  Пешгирӣ аз аниматсияҳои ногаҳонӣ
                </span>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={reducedMotion}
                onClick={toggleReducedMotion}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  reducedMotion ? "bg-emerald-500" : "bg-slate-600"
                }`}
              >
                <span className="sr-only">Toggle reduced motion</span>
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    reducedMotion ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};
