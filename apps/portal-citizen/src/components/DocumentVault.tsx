"use client";

import React, { useState, useRef, useEffect } from "react";
import { useAccessibility } from "@/context/AccessibilityContext";
import {
  FolderLock,
  FileCheck2,
  ShieldCheck,
  Download,
  Share2,
  UploadCloud,
  Search,
  Filter,
  CheckCircle,
  Clock,
  AlertTriangle,
  QrCode,
  Lock,
  Eye,
  X,
  FileText,
  Copy,
  ExternalLink,
  Sparkles,
  ShieldAlert
} from "lucide-react";

export interface VaultDocument {
  id: string;
  title: string;
  category: "identity" | "civil" | "legal" | "education";
  documentNumber: string;
  issueDate: string;
  expiryDate?: string;
  status: "verified" | "pending" | "expiring_soon";
  verificationSeal: string; // E-Seal ID
  fileSize: string;
  issuer: string;
  qrToken: string;
}

const mockDocuments: VaultDocument[] = [
  {
    id: "DOC-TJ-001",
    title: "Паспорти шаҳрванди Ҷумҳурии Тоҷикистон (National ID)",
    category: "identity",
    documentNumber: "А04910294",
    issueDate: "2022-03-15",
    expiryDate: "2032-03-15",
    status: "verified",
    verificationSeal: "E-SEAL-TJ-GOV-9918",
    fileSize: "2.4 MB",
    issuer: "Вазорати корҳои дохилии Ҷумҳурии Тоҷикистон",
    qrToken: "MYGOVTJ-PASS-04910294-VERIFIED",
  },
  {
    id: "DOC-TJ-002",
    title: "Шаҳодатнома дар бораи таваллуд (Birth Certificate)",
    category: "civil",
    documentNumber: "I-ТҶ №884910",
    issueDate: "2026-08-01",
    status: "verified",
    verificationSeal: "E-SEAL-ZAGS-DU-4412",
    fileSize: "1.8 MB",
    issuer: "Раёсати ЗАГС-и н. Шоҳмансур, ш. Душанбе",
    qrToken: "MYGOVTJ-BIRTH-884910-VERIFIED",
  },
  {
    id: "DOC-TJ-003",
    title: "Шаҳодатномаи ақди никоҳ (Marriage Certificate)",
    category: "civil",
    documentNumber: "I-АК №773194",
    issueDate: "2026-07-15",
    status: "verified",
    verificationSeal: "E-SEAL-ZAGS-IS-3310",
    fileSize: "3.1 MB",
    issuer: "Раёсати ЗАГС-и н. Исмоили Сомонӣ",
    qrToken: "MYGOVTJ-MARRIAGE-773194-VERIFIED",
  },
  {
    id: "DOC-TJ-004",
    title: "Шаҳодатномаи ронандагӣ (Driver's License)",
    category: "identity",
    documentNumber: "TJ-DR-2026-991",
    issueDate: "2021-09-10",
    expiryDate: "2026-09-10",
    status: "expiring_soon",
    verificationSeal: "E-SEAL-GAI-TJ-1102",
    fileSize: "1.5 MB",
    issuer: "БДА-и Вкд Ҷумҳурии Тоҷикистон",
    qrToken: "MYGOVTJ-DRIVE-2026991-EXPIRING",
  },
  {
    id: "DOC-TJ-005",
    title: "Гувоҳномаи андозсупоранда (ИНН)",
    category: "legal",
    documentNumber: "ИНН 339102941029",
    issueDate: "2019-01-20",
    status: "verified",
    verificationSeal: "E-SEAL-TAX-TJ-8819",
    fileSize: "0.9 MB",
    issuer: "Кумитаи андози назди Ҳукумати ҶТ",
    qrToken: "MYGOVTJ-INN-339102941029-VERIFIED",
  },
];

export const DocumentVault: React.FC = () => {
  const { announce } = useAccessibility();
  const [documents, setDocuments] = useState<VaultDocument[]>(mockDocuments);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [selectedDoc, setSelectedDoc] = useState<VaultDocument | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // Upload Form State
  const [uploadTitle, setUploadTitle] = useState("");
  const [uploadCategory, setUploadCategory] = useState<"identity" | "civil" | "legal" | "education">("legal");
  const [uploadNumber, setUploadNumber] = useState("");
  const [uploadIssuer, setUploadIssuer] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState("");

  const modalCloseButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (selectedDoc || isUploadModalOpen) {
      modalCloseButtonRef.current?.focus();
    }
  }, [selectedDoc, isUploadModalOpen]);

  const filteredDocs = documents.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.documentNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.issuer.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = categoryFilter === "all" || doc.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadTitle.trim() || !uploadNumber.trim()) {
      setUploadError("Лутфан номи ҳуҷҷат ва рақами онро дохил кунед!");
      announce("Хатогӣ: Лутфан номи ҳуҷҷат ва рақами онро дохил кунед.");
      return;
    }

    const newDoc: VaultDocument = {
      id: `DOC-TJ-${Math.floor(100 + Math.random() * 900)}`,
      title: uploadTitle,
      category: uploadCategory,
      documentNumber: uploadNumber,
      issueDate: new Date().toISOString().split("T")[0],
      status: "pending",
      verificationSeal: `E-SEAL-PENDING-${Math.floor(1000 + Math.random() * 9000)}`,
      fileSize: selectedFile ? `${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB` : "1.2 MB",
      issuer: uploadIssuer || "Мақомоти давлатии ҶТ",
      qrToken: `MYGOVTJ-UPLOAD-${uploadNumber}-PENDING`,
    };

    setDocuments([newDoc, ...documents]);
    setIsUploadModalOpen(false);
    setUploadTitle("");
    setUploadNumber("");
    setUploadIssuer("");
    setSelectedFile(null);
    setUploadError("");
    announce(`Ҳуҷҷати "${newDoc.title}" бомуваффақият боргирӣ ва ба санҷиш ирсол шуд.`);
  };

  const getStatusBadge = (status: VaultDocument["status"]) => {
    switch (status) {
      case "verified":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-950 text-emerald-300 border border-emerald-500/50">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
            Тасдиқшуда (Verified E-Seal)
          </span>
        );
      case "expiring_soon":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-950 text-amber-300 border border-amber-500/50">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" aria-hidden="true" />
            Мӯҳлаташ наздик аст (Expiring)
          </span>
        );
      case "pending":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-sky-950 text-sky-300 border border-sky-500/50">
            <Clock className="w-3.5 h-3.5 text-sky-400 animate-spin" aria-hidden="true" />
            Дар санҷиш (Pending)
          </span>
        );
    }
  };

  return (
    <section aria-labelledby="vault-heading" className="space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-8 rounded-3xl border border-slate-700/80 shadow-2xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-10 -translate-y-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-bold">
              <Lock className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Сайфи Ҳуҷҷатҳои Рақамӣ (Digital Vault)</span>
            </div>
            <h1 id="vault-heading" className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Захираи рақамии ҳуҷҷатҳо
            </h1>
            <p className="text-slate-300 max-w-2xl text-sm sm:text-base leading-relaxed">
              Нигоҳдории бехатар, тасдиқи рамзӣ бо коди QR ва мубодилаи расмии ҳуҷҷатҳои шахсӣ бо имзои рақамӣ.
            </p>
          </div>

          <div>
            <button
              type="button"
              onClick={() => {
                setIsUploadModalOpen(true);
                announce("Равзанаи боргирии ҳуҷҷати нав кушода шуд.");
              }}
              className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold px-6 py-4 rounded-2xl shadow-xl shadow-cyan-950/50 border border-cyan-400/40 flex items-center gap-3 transition-all hover:scale-105 active:scale-95 focus:ring-4 focus:ring-cyan-400"
            >
              <UploadCloud className="w-5 h-5" aria-hidden="true" />
              <span>Иловаи ҳуҷҷат / Upload Document</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter and Search Toolbar */}
      <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Search Box */}
          <div className="relative w-full md:w-96">
            <label htmlFor="search-vault-docs" className="sr-only">
              Ҷустуҷӯи ҳуҷҷатҳо бо рақам ё ном / Search vault documents
            </label>
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" aria-hidden="true" />
            <input
              id="search-vault-docs"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Ҷустуҷӯи номи ҳуҷҷат ё рақами он..."
              className="w-full bg-slate-800 border border-slate-700 text-slate-100 pl-11 pr-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-emerald-400 placeholder:text-slate-500"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0" role="tablist" aria-label="Филтри категорияҳои ҳуҷҷатҳо">
            {[
              { id: "all", label: "Ҳама (All)" },
              { id: "identity", label: "Шахсият (Identity)" },
              { id: "civil", label: "ЗАГС (Civil)" },
              { id: "legal", label: "Ҳуқуқӣ ва Андоз (Legal)" },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={categoryFilter === cat.id}
                onClick={() => {
                  setCategoryFilter(cat.id);
                  announce(`Категорияи ${cat.label} интихоб шуд.`);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                  categoryFilter === cat.id
                    ? "bg-emerald-600 text-white border-emerald-400 shadow-md"
                    : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

        </div>

        {/* Documents Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
          {filteredDocs.length === 0 ? (
            <div className="col-span-full p-12 text-center text-slate-400 bg-slate-950/50 rounded-2xl border border-slate-800 space-y-2">
              <FolderLock className="w-12 h-12 text-slate-600 mx-auto" aria-hidden="true" />
              <p className="text-base font-semibold">Ҳеҷ ҳуҷҷате пайдо нашуд.</p>
              <p className="text-xs">Ҷустуҷӯро иваз кунед ё ҳуҷҷати нав илова намоед.</p>
            </div>
          ) : (
            filteredDocs.map((doc) => (
              <div
                key={doc.id}
                className="bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-2xl p-6 space-y-5 flex flex-col justify-between shadow-xl transition-all hover:scale-[1.01]"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 text-emerald-400 flex items-center justify-center shrink-0">
                      <FileText className="w-6 h-6" aria-hidden="true" />
                    </div>
                    <div>{getStatusBadge(doc.status)}</div>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block">
                      {doc.category} • {doc.fileSize}
                    </span>
                    <h2 className="text-base font-bold text-white mt-1 line-clamp-2">
                      {doc.title}
                    </h2>
                  </div>

                  <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800 space-y-1 font-mono text-xs">
                    <div className="flex justify-between text-slate-400">
                      <span>Рақами ҳуҷҷат:</span>
                      <span className="text-emerald-400 font-bold">{doc.documentNumber}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Имзои рақамӣ:</span>
                      <span className="text-slate-300 truncate max-w-[140px]">{doc.verificationSeal}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedDoc(doc);
                      announce(`Муоинаи ҳуҷҷати ${doc.title} кушода шуд.`);
                    }}
                    className="flex-1 bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white border border-emerald-500/40 font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all focus:ring-4 focus:ring-emerald-400"
                  >
                    <Eye className="w-4 h-4" aria-hidden="true" />
                    <span>Тамошо & QR</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => announce(`Ҳуҷҷати ${doc.title} ба компютер боргирӣ шуд.`)}
                    aria-label={`Боргирии ${doc.title}`}
                    className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl border border-slate-700 focus:ring-4 focus:ring-emerald-400"
                  >
                    <Download className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Document View & QR Verification Modal */}
      {selectedDoc && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-doc-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in"
        >
          <div className="bg-slate-900 border-2 border-slate-700 text-slate-100 max-w-2xl w-full p-6 sm:p-8 rounded-3xl shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded-md border border-emerald-800">
                  {selectedDoc.documentNumber}
                </span>
                <h2 id="modal-doc-title" className="text-xl font-extrabold text-white mt-2">
                  {selectedDoc.title}
                </h2>
              </div>
              <button
                ref={modalCloseButtonRef}
                type="button"
                onClick={() => setSelectedDoc(null)}
                aria-label="Пӯшидани равзана / Close document modal"
                className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-slate-800 focus:ring-4 focus:ring-emerald-400"
              >
                <X className="w-6 h-6" aria-hidden="true" />
              </button>
            </div>

            {/* Verification Status Card */}
            <div className="bg-emerald-950/40 border border-emerald-500/40 p-5 rounded-2xl flex flex-col sm:flex-row items-center gap-5">
              <div className="w-24 h-24 bg-white p-2 rounded-xl shadow-lg flex items-center justify-center shrink-0">
                <QrCode className="w-20 h-20 text-slate-950" aria-hidden="true" />
              </div>
              <div className="space-y-1.5 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-1.5 text-emerald-400 font-extrabold text-sm">
                  <ShieldCheck className="w-5 h-5" aria-hidden="true" />
                  <span>Имзои электронӣ-рақамӣ (E-Seal Verified)</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Ин ҳуҷҷат расман аз тарафи <strong>{selectedDoc.issuer}</strong> бо мӯҳри рақамӣ тасдиқ шудааст.
                </p>
                <p className="text-[11px] font-mono text-emerald-300">
                  Seal ID: {selectedDoc.verificationSeal}
                </p>
              </div>
            </div>

            {/* Document Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60 space-y-1">
                <span className="text-xs text-slate-400 font-semibold block">Таърихи содиршуда</span>
                <span className="font-bold text-slate-100 font-mono block">{selectedDoc.issueDate}</span>
              </div>
              <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60 space-y-1">
                <span className="text-xs text-slate-400 font-semibold block">Мӯҳлати амал</span>
                <span className="font-bold text-slate-100 font-mono block">
                  {selectedDoc.expiryDate || "Бехат (Даимӣ)"}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(selectedDoc.qrToken);
                  announce("Ишораи рамзии ҳуҷҷат ба ҳофиза нусхабардорӣ шуд.");
                }}
                className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold px-4 py-2.5 rounded-xl text-xs border border-slate-700 flex items-center justify-center gap-2 focus:ring-4 focus:ring-emerald-400"
              >
                <Copy className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                <span>Нусхабардории QR Токен</span>
              </button>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setSelectedDoc(null)}
                  className="flex-1 sm:flex-initial bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold px-5 py-2.5 rounded-xl text-xs border border-slate-700 focus:ring-4 focus:ring-emerald-400"
                >
                  Пӯшидан / Close
                </button>
                <button
                  type="button"
                  onClick={() => announce(`Ҳуҷҷат боргирӣ карда шуд.`)}
                  className="flex-1 sm:flex-initial bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-5 py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 focus:ring-4 focus:ring-emerald-400 shadow-lg"
                >
                  <Download className="w-4 h-4" aria-hidden="true" />
                  <span>Боргирии PDF</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Upload Document Modal */}
      {isUploadModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title-upload"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in"
        >
          <div className="bg-slate-900 border-2 border-slate-700 text-slate-100 max-w-xl w-full p-6 sm:p-8 rounded-3xl shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h2 id="modal-title-upload" className="text-xl font-extrabold text-white flex items-center gap-2">
                <UploadCloud className="w-5 h-5 text-cyan-400" aria-hidden="true" />
                Иловаи ҳуҷҷати нав ба сайф
              </h2>
              <button
                ref={modalCloseButtonRef}
                type="button"
                onClick={() => setIsUploadModalOpen(false)}
                aria-label="Пӯшидани равзана / Close upload modal"
                className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-slate-800 focus:ring-4 focus:ring-emerald-400"
              >
                <X className="w-6 h-6" aria-hidden="true" />
              </button>
            </div>

            {uploadError && (
              <div role="alert" className="bg-rose-950/80 border border-rose-500/60 p-4 rounded-xl text-rose-200 text-xs font-semibold flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0" aria-hidden="true" />
                <span>{uploadError}</span>
              </div>
            )}

            <form onSubmit={handleUploadSubmit} className="space-y-4">
              {/* Document Title */}
              <div className="space-y-1.5">
                <label htmlFor="upload-title" className="text-xs font-bold text-slate-300 block">
                  Номи ҳуҷҷат <span className="text-emerald-400">*</span>
                </label>
                <input
                  id="upload-title"
                  type="text"
                  value={uploadTitle}
                  onChange={(e) => setUploadTitle(e.target.value)}
                  placeholder="Минсалан: Дипломи Олӣ / Гувоҳномаи мулк"
                  className="w-full bg-slate-800 border border-slate-700 text-slate-100 p-3 rounded-xl text-sm focus:ring-4 focus:ring-emerald-400 placeholder:text-slate-500"
                  required
                  aria-required="true"
                />
              </div>

              {/* Category */}
              <div className="space-y-1.5">
                <label htmlFor="upload-category" className="text-xs font-bold text-slate-300 block">
                  Категорияи ҳуҷҷат <span className="text-emerald-400">*</span>
                </label>
                <select
                  id="upload-category"
                  value={uploadCategory}
                  onChange={(e) => setUploadCategory(e.target.value as any)}
                  className="w-full bg-slate-800 border border-slate-700 text-slate-100 p-3 rounded-xl text-sm focus:ring-4 focus:ring-emerald-400"
                >
                  <option value="identity">Шахсият ва Паспорт (Identity)</option>
                  <option value="civil">Сабти Аснод ва Оила (Civil Status)</option>
                  <option value="legal">Ҳуқуқӣ ва Андоз (Legal & Tax)</option>
                  <option value="education">Маълумот ва Диплом (Education)</option>
                </select>
              </div>

              {/* Document Number */}
              <div className="space-y-1.5">
                <label htmlFor="upload-number" className="text-xs font-bold text-slate-300 block">
                  Рақами силсилавӣ ва силсила <span className="text-emerald-400">*</span>
                </label>
                <input
                  id="upload-number"
                  type="text"
                  value={uploadNumber}
                  onChange={(e) => setUploadNumber(e.target.value)}
                  placeholder="Минсалан: А№ 1029481"
                  className="w-full bg-slate-800 border border-slate-700 text-slate-100 p-3 rounded-xl text-sm focus:ring-4 focus:ring-emerald-400 placeholder:text-slate-500"
                  required
                  aria-required="true"
                />
              </div>

              {/* Issuer */}
              <div className="space-y-1.5">
                <label htmlFor="upload-issuer" className="text-xs font-bold text-slate-300 block">
                  Мақомоти содиркунанда (Issuer)
                </label>
                <input
                  id="upload-issuer"
                  type="text"
                  value={uploadIssuer}
                  onChange={(e) => setUploadIssuer(e.target.value)}
                  placeholder="Минсалан: Донишгоҳи Миллии Тоҷикистон"
                  className="w-full bg-slate-800 border border-slate-700 text-slate-100 p-3 rounded-xl text-sm focus:ring-4 focus:ring-emerald-400 placeholder:text-slate-500"
                />
              </div>

              {/* File Dropzone */}
              <div className="space-y-1.5">
                <label htmlFor="file-upload-input" className="text-xs font-bold text-slate-300 block">
                  Файли ҳуҷҷат (PDF, PNG, JPG то 10MB)
                </label>
                <div className="border-2 border-dashed border-slate-700 bg-slate-950/50 p-6 rounded-2xl text-center space-y-2 hover:border-emerald-500/50 transition-colors">
                  <UploadCloud className="w-8 h-8 text-emerald-400 mx-auto" aria-hidden="true" />
                  <div className="text-xs text-slate-300">
                    <label htmlFor="file-upload-input" className="text-emerald-400 font-bold underline cursor-pointer hover:text-emerald-300 focus:outline-none">
                      Файлро интихоб кунед
                    </label>
                    <input
                      id="file-upload-input"
                      type="file"
                      accept=".pdf,.png,.jpg,.jpeg"
                      onChange={(e) => setSelectedFile(e.target.files ? e.target.files[0] : null)}
                      className="sr-only"
                    />
                    <span> ё ин ҷо кашед</span>
                  </div>
                  {selectedFile && (
                    <p className="text-xs text-emerald-300 font-mono font-bold pt-1">
                      Файли интихобшуда: {selectedFile.name} ({(selectedFile.size / (1024 * 1024)).toFixed(1)} MB)
                    </p>
                  )}
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold px-5 py-3 rounded-xl text-sm border border-slate-700 focus:ring-4 focus:ring-emerald-400"
                >
                  Бекор кардан / Cancel
                </button>
                <button
                  type="submit"
                  className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold px-6 py-3 rounded-xl text-sm focus:ring-4 focus:ring-emerald-400 shadow-lg shadow-cyan-950"
                >
                  Боргирӣ ва Имзои Рақамӣ / Upload & Seal
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </section>
  );
};
