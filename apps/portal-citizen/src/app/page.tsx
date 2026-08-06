"use client";

import React from "react";
import Link from "next/link";
import {
  FileText,
  FolderLock,
  ShieldCheck,
  CheckCircle2,
  Bell,
  ArrowRight,
  Sparkles,
  QrCode,
  Building2,
  Users,
  Award,
  PhoneCall
} from "lucide-react";

export default function Home() {
  return (
    <div className="space-y-10">
      {/* Hero Welcome Section */}
      <section aria-labelledby="welcome-heading" className="bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/40 border border-slate-800 p-8 sm:p-12 rounded-3xl shadow-2xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
            <ShieldCheck className="w-4 h-4" aria-hidden="true" />
            <span>Хуш омадед ба my.gov.tj</span>
          </div>

          <h1 id="welcome-heading" className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Портали ягонаи хизматрасониҳои рақамии Тоҷикистон
          </h1>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Хизматномаҳои Сабти Асноди Ҳолати Шаҳрвандӣ (ЗАГС), захираи рақамии ҳуҷҷатҳо, тасдиқи имзои электронӣ ва пайгирии дархостҳо дар як ҷо.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <Link
              href="/civil-registry"
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold px-6 py-4 rounded-2xl shadow-xl shadow-emerald-950/60 flex items-center justify-center gap-3 transition-all hover:scale-105 active:scale-95 focus:ring-4 focus:ring-emerald-400"
            >
              <FileText className="w-5 h-5" aria-hidden="true" />
              <span>Панели ЗАГС (Civil Registry)</span>
            </Link>

            <Link
              href="/document-vault"
              className="bg-slate-800 hover:bg-slate-700 text-slate-100 font-extrabold px-6 py-4 rounded-2xl border border-slate-700 flex items-center justify-center gap-3 transition-all hover:scale-105 active:scale-95 focus:ring-4 focus:ring-emerald-400"
            >
              <FolderLock className="w-5 h-5 text-cyan-400" aria-hidden="true" />
              <span>Сайфи Ҳуҷҷатҳо (Document Vault)</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Citizen Identity & Quick Status Card */}
      <section aria-labelledby="status-heading" className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Мақоми Шахсият</span>
            <CheckCircle2 className="w-5 h-5 text-emerald-400" aria-hidden="true" />
          </div>
          <p className="text-xl font-bold text-white">Раҳимов Анушервон</p>
          <p className="text-xs text-slate-400 font-mono">ИНН: 339102941029 • SIM-ID Active</p>
        </div>

        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Дархостҳои фаъол</span>
            <span className="bg-amber-950 text-amber-300 font-bold px-2.5 py-0.5 rounded-full text-xs border border-amber-500/40">
              1 дар баррасӣ
            </span>
          </div>
          <p className="text-xl font-bold text-white">ЗАГС № TJ-ZAGS-8849102</p>
          <p className="text-xs text-emerald-400 font-semibold">Шаҳодатнома дар бораи таваллуд</p>
        </div>

        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Ҳуҷҷатҳои сайф</span>
            <QrCode className="w-5 h-5 text-cyan-400" aria-hidden="true" />
          </div>
          <p className="text-xl font-bold text-white">5 Ҳуҷҷат бо E-Seal</p>
          <p className="text-xs text-slate-400">1 ҳуҷҷат мӯҳлаташ наздик аст (БДА)</p>
        </div>
      </section>

      {/* Main Portals Grid */}
      <section aria-labelledby="main-modules-heading" className="space-y-6">
        <h2 id="main-modules-heading" className="text-2xl font-bold text-white flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-emerald-400" aria-hidden="true" />
          Хизматномаҳои асосии шаҳрвандӣ
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Module 1: Civil Registry */}
          <div className="bg-slate-900/90 border border-slate-800 hover:border-emerald-500/50 p-8 rounded-3xl space-y-6 transition-all group shadow-xl">
            <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-2xl flex items-center justify-center">
              <Building2 className="w-7 h-7" aria-hidden="true" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-extrabold text-white group-hover:text-emerald-400 transition-colors">
                Сабти Асноди Ҳолати Шаҳрвандӣ (ЗАГС)
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Пешниҳоди аризаҳо барои қайди таваллуд, никоҳ, ивази ному насаб ва пайгирии рақами дархостҳо дар мақомоти адлия.
              </p>
            </div>
            <ul className="space-y-2 text-xs text-slate-400 font-semibold">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                <span>Шаҳодатнома дар бораи таваллуд (Birth Cert)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                <span>Сабти ақди никоҳ ва шаҳодатнома (Marriage)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                <span>Иваз ва ислоҳи ному насаби шаҳрвандӣ</span>
              </li>
            </ul>
            <div className="pt-2">
              <Link
                href="/civil-registry"
                className="inline-flex items-center gap-2 text-sm font-bold text-emerald-400 hover:text-emerald-300 transition-colors focus:ring-4 focus:ring-emerald-400 rounded-lg p-1"
              >
                <span>Гузаштан ба панели ЗАГС</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* Module 2: Document Vault */}
          <div className="bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 p-8 rounded-3xl space-y-6 transition-all group shadow-xl">
            <div className="w-14 h-14 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 rounded-2xl flex items-center justify-center">
              <FolderLock className="w-7 h-7" aria-hidden="true" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-extrabold text-white group-hover:text-cyan-400 transition-colors">
                Сайфи Ҳуҷҷатҳои Рақамӣ (Document Vault)
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Нигоҳдории амн, гирифтани коди QR барои мубодилаи расмии паспорт, шаҳодатномаҳо ва ҳуҷҷатҳо бо имзои рақамӣ.
              </p>
            </div>
            <ul className="space-y-2 text-xs text-slate-400 font-semibold">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" aria-hidden="true" />
                <span>Паспорти шаҳрвандӣ ва БДА (National ID & License)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" aria-hidden="true" />
                <span>Муҳофизат бо мӯҳри рақамии E-Seal ва QR Code</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" aria-hidden="true" />
                <span>Мубодила ва боргирии озоди PDF</span>
              </li>
            </ul>
            <div className="pt-2">
              <Link
                href="/document-vault"
                className="inline-flex items-center gap-2 text-sm font-bold text-cyan-400 hover:text-cyan-300 transition-colors focus:ring-4 focus:ring-emerald-400 rounded-lg p-1"
              >
                <span>Гузаштан ба сайфи ҳуҷҷатҳо</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* WCAG Compliance Announcement Banner */}
      <section aria-labelledby="wcag-info-heading" className="bg-slate-900 p-6 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
            <Award className="w-6 h-6" aria-hidden="true" />
          </div>
          <div>
            <h2 id="wcag-info-heading" className="text-base font-bold text-white">
              Дастрасии пурра мутобиқи WCAG 2.1 AA
            </h2>
            <p className="text-xs text-slate-400">
              Портали my.gov.tj бо дастгирии пӯшидахонҳо, навигатсияи клавиатуравӣ ва контрасти баланд сохта шудааст.
            </p>
          </div>
        </div>
        <Link
          href="/accessibility"
          className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold px-4 py-2.5 rounded-xl text-xs border border-slate-700 whitespace-nowrap focus:ring-4 focus:ring-emerald-400"
        >
          Баёнияи дастрасӣ / Read Statement
        </Link>
      </section>
    </div>
  );
}
