"use client";

import React, { useState, useRef, useEffect } from "react";
import { useAccessibility } from "@/context/AccessibilityContext";
import {
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  PlusCircle,
  Search,
  Filter,
  Eye,
  Download,
  QrCode,
  Sparkles,
  ChevronRight,
  X,
  FileCheck,
  Building2,
  Calendar,
  UserCheck
} from "lucide-react";

export interface CivilRegistryRecord {
  id: string;
  trackingNumber: string;
  type: "birth" | "marriage" | "name_change" | "death";
  title: string;
  applicantName: string;
  submissionDate: string;
  status: "in_progress" | "approved" | "action_required";
  statusText: string;
  currentStep: number; // 1 to 4
  steps: string[];
  department: string;
  pdfUrl?: string;
  qrCode?: string;
}

const mockRecords: CivilRegistryRecord[] = [
  {
    id: "REG-2026-0891",
    trackingNumber: "TJ-ZAGS-8849102",
    type: "birth",
    title: "Шаҳодатнома дар бораи таваллуди фарзанд (Birth Certificate)",
    applicantName: "Раҳимова Манижа Аҳмадовна",
    submissionDate: "2026-08-01",
    status: "in_progress",
    statusText: "Дар баррасии мутахассис",
    currentStep: 3,
    steps: ["Дархост гирифта шуд", "Санҷиши ҳуҷҷатҳо", "Тасдиқи ЗАГС", "Супоридани ҳуҷҷат"],
    department: "Раёсати ЗАГС-и н. Шоҳмансур, ш. Душанбе",
  },
  {
    id: "REG-2026-0412",
    trackingNumber: "TJ-ZAGS-7731940",
    type: "marriage",
    title: "Сабти ақди никоҳ (Marriage Registration)",
    applicantName: "Раҳимов Анушервон & Каримова З.",
    submissionDate: "2026-07-15",
    status: "approved",
    statusText: "Тасдиқ ва рақамӣ шуд",
    currentStep: 4,
    steps: ["Дархост гирифта шуд", "Санҷиши ҳуҷҷатҳо", "Тасдиқи ЗАГС", "Ҳуҷҷат омода аст"],
    department: "Раёсати ЗАГС-и н. Исмоили Сомонӣ, ш. Душанбе",
    pdfUrl: "/docs/marriage_cert.pdf",
    qrCode: "QR-TJ-ZAGS-7731940",
  },
  {
    id: "REG-2026-0105",
    trackingNumber: "TJ-ZAGS-5520194",
    type: "name_change",
    title: "Дархост барои ивази насаб (Surname Correction)",
    applicantName: "Раҳимов Анушервон Ҷалолиддинович",
    submissionDate: "2026-06-20",
    status: "action_required",
    statusText: "Ниёз ба иловаи нусхаи паспорт",
    currentStep: 2,
    steps: ["Дархост гирифта шуд", "Ислоҳи хуҷҷат", "Барраси дубора", "Хулосаи ҳуқуқӣ"],
    department: "Вазорати адлияи Ҷумҳурии Тоҷикистон",
  },
];

export const CivilRegistryDashboard: React.FC = () => {
  const { announce } = useAccessibility();
  const [records, setRecords] = useState<CivilRegistryRecord[]>(mockRecords);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedRecord, setSelectedRecord] = useState<CivilRegistryRecord | null>(null);
  const [isNewAppModalOpen, setIsNewAppModalOpen] = useState(false);

  // New Application Form State
  const [formType, setFormType] = useState<"birth" | "marriage" | "name_change">("birth");
  const [fullName, setFullName] = useState("");
  const [identityNumber, setIdentityNumber] = useState("");
  const [region, setRegion] = useState("Душанбе");
  const [notes, setNotes] = useState("");
  const [formError, setFormError] = useState("");

  const modalCloseButtonRef = useRef<HTMLButtonElement>(null);
  const newAppButtonRef = useRef<HTMLButtonElement>(null);

  // Auto focus modal close button when opened (WCAG modal requirement)
  useEffect(() => {
    if (selectedRecord || isNewAppModalOpen) {
      modalCloseButtonRef.current?.focus();
    }
  }, [selectedRecord, isNewAppModalOpen]);

  // Filtered records
  const filteredRecords = records.filter((rec) => {
    const matchesSearch =
      rec.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.trackingNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.applicantName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "all" || rec.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleCreateApplication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !identityNumber.trim()) {
      setFormError("Лутфан ҳамаи майдонҳои ҳатмиро пур кунед!");
      announce("Хатогӣ: Лутфан ҳамаи майдонҳои ҳатмиро пур кунед.");
      return;
    }

    const newRec: CivilRegistryRecord = {
      id: `REG-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      trackingNumber: `TJ-ZAGS-${Math.floor(1000000 + Math.random() * 9000000)}`,
      type: formType,
      title:
        formType === "birth"
          ? "Шаҳодатнома дар бораи таваллуд (Birth Certificate)"
          : formType === "marriage"
          ? "Сабти ақди никоҳ (Marriage Registration)"
          : "Дархост барои ивази ному насаб",
      applicantName: fullName,
      submissionDate: new Date().toISOString().split("T")[0],
      status: "in_progress",
      statusText: "Дархост гирифта шуд ва дар навбат аст",
      currentStep: 1,
      steps: ["Дархост гирифта шуд", "Санҷиши ҳуҷҷатҳо", "Тасдиқи ЗАГС", "Супоридани ҳуҷҷат"],
      department: `Раёсати ЗАГС-и ${region}`,
    };

    setRecords([newRec, ...records]);
    setIsNewAppModalOpen(false);
    setFullName("");
    setIdentityNumber("");
    setNotes("");
    setFormError("");
    announce(`Дархости нав бо рақами пайгирии ${newRec.trackingNumber} бомуваффақият сабт шуд.`);
  };

  const getStatusBadge = (status: CivilRegistryRecord["status"], text: string) => {
    switch (status) {
      case "approved":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-950 text-emerald-300 border border-emerald-500/50">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
            {text}
          </span>
        );
      case "in_progress":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-950 text-amber-300 border border-amber-500/50">
            <Clock className="w-3.5 h-3.5 text-amber-400 animate-spin" aria-hidden="true" />
            {text}
          </span>
        );
      case "action_required":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-950 text-rose-300 border border-rose-500/50">
            <AlertCircle className="w-3.5 h-3.5 text-rose-400" aria-hidden="true" />
            {text}
          </span>
        );
    }
  };

  return (
    <section aria-labelledby="civil-registry-heading" className="space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-8 rounded-3xl border border-slate-700/80 shadow-2xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-10 -translate-y-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
              <Building2 className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Сабти Асноди Ҳолати Шаҳрвандӣ (ЗАГС)</span>
            </div>
            <h1 id="civil-registry-heading" className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Панели хизматномаҳои ЗАГС
            </h1>
            <p className="text-slate-300 max-w-2xl text-sm sm:text-base leading-relaxed">
              Пешниҳоди дархостҳо барои гирифтани шаҳодатномаи таваллуд, сабти никоҳ, ва пайгирии мақоми ҳуҷҷатҳо бо стандарти WCAG 2.1 AA.
            </p>
          </div>

          <div>
            <button
              ref={newAppButtonRef}
              type="button"
              onClick={() => {
                setIsNewAppModalOpen(true);
                announce("Равзанаи пешниҳоди дархости нав кушода шуд.");
              }}
              className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold px-6 py-4 rounded-2xl shadow-xl shadow-emerald-950/50 border border-emerald-400/40 flex items-center gap-3 transition-all hover:scale-105 active:scale-95 focus:ring-4 focus:ring-emerald-400"
            >
              <PlusCircle className="w-5 h-5" aria-hidden="true" />
              <span>Пешниҳоди дархости нав / New Request</span>
            </button>
          </div>
        </div>
      </div>

      {/* Action Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          {
            title: "Шаҳодатномаи Таваллуд",
            desc: "Сабти таваллуди кӯдак ва гирифтани шаҳодатнома",
            type: "birth",
            icon: FileCheck,
            badge: "Хизматрасонии рақамӣ",
          },
          {
            title: "Сабти Ақди Никоҳ",
            desc: "Дархост барои қайди ақди никоҳи шаҳрвандӣ",
            type: "marriage",
            icon: UserCheck,
            badge: "Рӯзи интихобшуда",
          },
          {
            title: "Ивази Ному Насаб",
            desc: "Ариза барои иваз ё ислоҳи ному насаб",
            type: "name_change",
            icon: FileText,
            badge: "Баррасии ҳуқуқӣ",
          },
          {
            title: "Сабти Фоҷиавӣ (Death)",
            desc: "Сабти вафот ва гирифтани маълумотнома",
            type: "death",
            icon: Calendar,
            badge: "Тезонидашуда",
          },
        ].map((service) => {
          const IconComponent = service.icon;
          return (
            <button
              key={service.title}
              type="button"
              onClick={() => {
                setFormType(service.type as "birth" | "marriage" | "name_change");
                setIsNewAppModalOpen(true);
              }}
              className="bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/50 p-6 rounded-2xl text-left space-y-4 transition-all group focus:ring-4 focus:ring-emerald-400 relative overflow-hidden"
            >
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <IconComponent className="w-6 h-6" aria-hidden="true" />
                </div>
                <span className="text-[10px] font-bold text-emerald-300 bg-emerald-950/80 border border-emerald-800/60 px-2.5 py-1 rounded-full">
                  {service.badge}
                </span>
              </div>
              <div>
                <h2 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors">
                  {service.title}
                </h2>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">{service.desc}</p>
              </div>
              <div className="flex items-center gap-1 text-xs font-semibold text-emerald-400 pt-2">
                <span>Идома додан</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </div>
            </button>
          );
        })}
      </div>

      {/* Filter and Search Controls */}
      <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Search Box */}
          <div className="relative w-full md:w-96">
            <label htmlFor="search-records" className="sr-only">
              Ҷустуҷӯи дархостҳо бо рақам ё ном / Search applications
            </label>
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" aria-hidden="true" />
            <input
              id="search-records"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Ҷустуҷӯи рақами пайгирӣ ё ном..."
              className="w-full bg-slate-800 border border-slate-700 text-slate-100 pl-11 pr-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-emerald-400 placeholder:text-slate-500"
            />
          </div>

          {/* Filter Status Selector */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <Filter className="w-4 h-4 text-slate-400" aria-hidden="true" />
            <label htmlFor="status-filter" className="text-xs font-semibold text-slate-300">
              Статус / Status:
            </label>
            <select
              id="status-filter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-slate-800 text-slate-200 border border-slate-700 text-xs font-semibold rounded-xl px-3 py-2.5 focus:ring-4 focus:ring-emerald-400 cursor-pointer"
            >
              <option value="all">Ҳамаи дархостҳо (All)</option>
              <option value="in_progress">Дар баррасӣ (In Progress)</option>
              <option value="approved">Тасдиқшуда (Approved)</option>
              <option value="action_required">Ниёз ба ислоҳ (Action Required)</option>
            </select>
          </div>

        </div>

        {/* Live Applications Table / List */}
        <div className="overflow-x-auto border border-slate-800 rounded-xl">
          <table className="w-full text-left text-sm text-slate-300">
            <caption className="sr-only">Рӯйхати дархостҳои сабти аснод ва мақоми онҳо</caption>
            <thead className="bg-slate-950 text-xs uppercase font-bold text-slate-400 border-b border-slate-800">
              <tr>
                <th scope="col" className="p-4">Рақами Пайгирӣ / ID</th>
                <th scope="col" className="p-4">Намуди Хизматрасонӣ</th>
                <th scope="col" className="p-4">Муроҷиаткунанда</th>
                <th scope="col" className="p-4">Таърихи Пешниҳод</th>
                <th scope="col" className="p-4">Статус</th>
                <th scope="col" className="p-4 text-right">Амалҳо</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 bg-slate-900/60">
              {filteredRecords.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-400">
                    Ҳеҷ дархосте пайдо нашуд.
                  </td>
                </tr>
              ) : (
                filteredRecords.map((rec) => (
                  <tr key={rec.id} className="hover:bg-slate-800/50 transition-colors">
                    <td className="p-4 font-mono font-bold text-emerald-400">
                      {rec.trackingNumber}
                    </td>
                    <td className="p-4 font-semibold text-slate-100 max-w-xs">
                      {rec.title}
                    </td>
                    <td className="p-4 text-slate-300">{rec.applicantName}</td>
                    <td className="p-4 text-slate-400 font-mono text-xs">{rec.submissionDate}</td>
                    <td className="p-4">{getStatusBadge(rec.status, rec.statusText)}</td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedRecord(rec);
                          announce(`Тафсилоти дархости ${rec.trackingNumber} кушода шуд.`);
                        }}
                        aria-label={`Тафсилоти дархости ${rec.trackingNumber}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold border border-slate-700 focus:ring-4 focus:ring-emerald-400"
                      >
                        <Eye className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
                        <span>Тафсилот</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Record Details Modal */}
      {selectedRecord && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title-details"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in"
        >
          <div className="bg-slate-900 border-2 border-slate-700 text-slate-100 max-w-2xl w-full p-6 sm:p-8 rounded-3xl shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded-md border border-emerald-800">
                  {selectedRecord.trackingNumber}
                </span>
                <h2 id="modal-title-details" className="text-xl font-extrabold text-white mt-2">
                  {selectedRecord.title}
                </h2>
              </div>
              <button
                ref={modalCloseButtonRef}
                type="button"
                onClick={() => setSelectedRecord(null)}
                aria-label="Пӯшидани равзана / Close modal"
                className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-slate-800 focus:ring-4 focus:ring-emerald-400"
              >
                <X className="w-6 h-6" aria-hidden="true" />
              </button>
            </div>

            {/* Application Progress Stepper */}
            <div className="space-y-3 bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Мақоми иҷрои дархост (Progress Stepper)
              </h3>
              <ol className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-center" role="list">
                {selectedRecord.steps.map((stepName, idx) => {
                  const stepNum = idx + 1;
                  const isCompleted = stepNum < selectedRecord.currentStep;
                  const isCurrent = stepNum === selectedRecord.currentStep;

                  return (
                    <li
                      key={stepName}
                      aria-current={isCurrent ? "step" : undefined}
                      className={`p-3 rounded-xl border text-xs font-semibold space-y-1 ${
                        isCompleted
                          ? "bg-emerald-950/60 border-emerald-500/40 text-emerald-300"
                          : isCurrent
                          ? "bg-amber-950/60 border-amber-500/60 text-amber-200 ring-2 ring-amber-400/50"
                          : "bg-slate-900 border-slate-800 text-slate-500"
                      }`}
                    >
                      <div className="flex items-center justify-center gap-1">
                        {isCompleted ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                        ) : (
                          <span className="w-4 h-4 rounded-full border text-[10px] flex items-center justify-center font-bold">
                            {stepNum}
                          </span>
                        )}
                      </div>
                      <p className="line-clamp-2">{stepName}</p>
                    </li>
                  );
                })}
              </ol>
            </div>

            {/* Key Information details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60 space-y-1">
                <span className="text-xs text-slate-400 font-semibold block">Муроҷиаткунанда</span>
                <span className="font-bold text-slate-100 block">{selectedRecord.applicantName}</span>
              </div>
              <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60 space-y-1">
                <span className="text-xs text-slate-400 font-semibold block">Идора / Мақомоти иҷрокунанда</span>
                <span className="font-bold text-slate-100 block">{selectedRecord.department}</span>
              </div>
            </div>

            {/* Actions & QR Verification if approved */}
            {selectedRecord.status === "approved" && (
              <div className="bg-emerald-950/40 border border-emerald-500/30 p-5 rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                    <QrCode className="w-5 h-5" aria-hidden="true" />
                    <span>Ҳуҷҷат бо имзои рақамӣ ва коди QR муҳофизат шудааст</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => announce("Нусхаи PDF бомуваффақият боргирӣ шуд.")}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-2 focus:ring-4 focus:ring-emerald-400"
                  >
                    <Download className="w-4 h-4" aria-hidden="true" />
                    <span>Боргирии PDF</span>
                  </button>
                </div>
              </div>
            )}

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setSelectedRecord(null)}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold px-5 py-2.5 rounded-xl text-sm border border-slate-700 focus:ring-4 focus:ring-emerald-400"
              >
                Пӯшидан / Close
              </button>
            </div>

          </div>
        </div>
      )}

      {/* New Application Form Modal */}
      {isNewAppModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title-new"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in"
        >
          <div className="bg-slate-900 border-2 border-slate-700 text-slate-100 max-w-xl w-full p-6 sm:p-8 rounded-3xl shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h2 id="modal-title-new" className="text-xl font-extrabold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-400" aria-hidden="true" />
                Пешниҳоди дархости нав ба ЗАГС
              </h2>
              <button
                ref={modalCloseButtonRef}
                type="button"
                onClick={() => setIsNewAppModalOpen(false)}
                aria-label="Пӯшидани равзана / Close modal"
                className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-slate-800 focus:ring-4 focus:ring-emerald-400"
              >
                <X className="w-6 h-6" aria-hidden="true" />
              </button>
            </div>

            {formError && (
              <div role="alert" className="bg-rose-950/80 border border-rose-500/60 p-4 rounded-xl text-rose-200 text-xs font-semibold flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" aria-hidden="true" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleCreateApplication} className="space-y-4">
              {/* Form Type Select */}
              <div className="space-y-1.5">
                <label htmlFor="service-type" className="text-xs font-bold text-slate-300 block">
                  Намуди хизматрасонӣ <span className="text-emerald-400">*</span>
                </label>
                <select
                  id="service-type"
                  value={formType}
                  onChange={(e) => setFormType(e.target.value as "birth" | "marriage" | "name_change")}
                  className="w-full bg-slate-800 border border-slate-700 text-slate-100 p-3 rounded-xl text-sm focus:ring-4 focus:ring-emerald-400"
                  required
                >
                  <option value="birth">Шаҳодатнома дар бораи таваллуд (Birth Certificate)</option>
                  <option value="marriage">Сабти ақди никоҳ (Marriage Registration)</option>
                  <option value="name_change">Ивази ному насаб (Name Correction)</option>
                </select>
              </div>

              {/* Full Name Field */}
              <div className="space-y-1.5">
                <label htmlFor="applicant-fullname" className="text-xs font-bold text-slate-300 block">
                  Ному насаби пурра (Ф.И.О.) <span className="text-emerald-400">*</span>
                </label>
                <input
                  id="applicant-fullname"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Минсалан: Раҳимов Анушервон Ҷалолиддинович"
                  className="w-full bg-slate-800 border border-slate-700 text-slate-100 p-3 rounded-xl text-sm focus:ring-4 focus:ring-emerald-400 placeholder:text-slate-500"
                  required
                  aria-required="true"
                />
              </div>

              {/* Identity Number (NIN / Passport) */}
              <div className="space-y-1.5">
                <label htmlFor="identity-number" className="text-xs font-bold text-slate-300 block">
                  Рақами муайянкунандаи шахс (ИНН / Паспорт) <span className="text-emerald-400">*</span>
                </label>
                <input
                  id="identity-number"
                  type="text"
                  value={identityNumber}
                  onChange={(e) => setIdentityNumber(e.target.value)}
                  placeholder="А01234567 ё ИНН 12 рақам"
                  className="w-full bg-slate-800 border border-slate-700 text-slate-100 p-3 rounded-xl text-sm focus:ring-4 focus:ring-emerald-400 placeholder:text-slate-500"
                  required
                  aria-required="true"
                />
              </div>

              {/* Region Selector */}
              <div className="space-y-1.5">
                <label htmlFor="region-select" className="text-xs font-bold text-slate-300 block">
                  Минтақа ва Раёсати ЗАГС <span className="text-emerald-400">*</span>
                </label>
                <select
                  id="region-select"
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 text-slate-100 p-3 rounded-xl text-sm focus:ring-4 focus:ring-emerald-400"
                >
                  <option value="Душанбе (н. Шоҳмансур)">Душанбе (н. Шоҳмансур)</option>
                  <option value="Душанбе (н. Исмоили Сомонӣ)">Душанбе (н. Исмоили Сомонӣ)</option>
                  <option value="Хуҷанд">Хуҷанд (Вилояти Суғд)</option>
                  <option value="Бохтар">Бохтар (Вилояти Хатлон)</option>
                  <option value="Хоруғ">Хоруғ (ВМКБ)</option>
                </select>
              </div>

              {/* Additional notes */}
              <div className="space-y-1.5">
                <label htmlFor="additional-notes" className="text-xs font-bold text-slate-300 block">
                  Эзоҳ ва суроғаи истиқомат (Ихтиёрӣ)
                </label>
                <textarea
                  id="additional-notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  placeholder="Суроға ё маълумоти иловагӣ..."
                  className="w-full bg-slate-800 border border-slate-700 text-slate-100 p-3 rounded-xl text-sm focus:ring-4 focus:ring-emerald-400 placeholder:text-slate-500"
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsNewAppModalOpen(false)}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold px-5 py-3 rounded-xl text-sm border border-slate-700 focus:ring-4 focus:ring-emerald-400"
                >
                  Бекор кардан / Cancel
                </button>
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3 rounded-xl text-sm focus:ring-4 focus:ring-emerald-400 shadow-lg shadow-emerald-950"
                >
                  Ирсоли дархост / Submit Application
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </section>
  );
};
