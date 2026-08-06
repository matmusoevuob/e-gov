"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShieldCheck, FileText, FolderLock, User, Menu, X, Globe, Bell } from "lucide-react";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lang, setLang] = useState<"tj" | "ru" | "en">("tj");

  const navLinks = [
    { href: "/", label: "Асосӣ / Home", icon: ShieldCheck },
    { href: "/civil-registry", label: "Сабти Аснод / Civil Registry", icon: FileText },
    { href: "/document-vault", label: "Захираи Ҳуҷҷатҳо / Vault", icon: FolderLock },
  ];

  return (
    <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-40 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Platform Name */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-3 group focus:outline-none focus:ring-4 focus:ring-emerald-400 p-1.5 rounded-xl"
              aria-label="Портали ягонаи давлатии Тоҷикистон - my.gov.tj Home"
            >
              <div className="w-11 h-11 bg-gradient-to-tr from-emerald-600 via-teal-600 to-cyan-500 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-emerald-900/40 border border-emerald-400/30">
                TJ
              </div>
              <div>
                <span className="text-xl font-extrabold tracking-tight text-white block">
                  my.gov<span className="text-emerald-400">.tj</span>
                </span>
                <span className="text-xs text-slate-400 font-medium block">
                  Портали ягонаи хизматрасониҳои давлатӣ
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav aria-label="Навигатсияи асосӣ / Main Navigation" className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-inner"
                      : "text-slate-300 hover:text-white hover:bg-slate-800"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-emerald-400" : "text-slate-400"}`} aria-hidden="true" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Header Controls: Language Switcher, Notifications, User Profile */}
          <div className="hidden lg:flex items-center gap-4 border-l border-slate-800 pl-6">
            {/* Language Switcher */}
            <div className="relative flex items-center bg-slate-800 p-1 rounded-xl border border-slate-700">
              <Globe className="w-4 h-4 text-slate-400 ml-2 mr-1" aria-hidden="true" />
              <label htmlFor="language-select" className="sr-only">
                Интихоби забон / Select Language
              </label>
              <select
                id="language-select"
                value={lang}
                onChange={(e) => setLang(e.target.value as "tj" | "ru" | "en")}
                className="bg-transparent text-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-400 rounded-lg px-2 py-1 cursor-pointer"
              >
                <option value="tj" className="bg-slate-900 text-white">Тоҷикӣ (TJ)</option>
                <option value="ru" className="bg-slate-900 text-white">Русский (RU)</option>
                <option value="en" className="bg-slate-900 text-white">English (EN)</option>
              </select>
            </div>

            {/* Notification Center */}
            <button
              type="button"
              aria-label="Огоҳиномаҳо (2 паёми нав) / Notifications (2 unread)"
              className="relative p-2.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl transition-colors focus:ring-4 focus:ring-emerald-400"
            >
              <Bell className="w-5 h-5" aria-hidden="true" />
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-slate-900 animate-pulse" />
            </button>

            {/* User Profile */}
            <div className="flex items-center gap-3 bg-slate-800/80 px-3.5 py-1.5 rounded-xl border border-slate-700/80">
              <div className="w-8 h-8 rounded-lg bg-emerald-600/30 border border-emerald-500/40 text-emerald-400 flex items-center justify-center font-bold text-sm">
                <User className="w-4 h-4" aria-hidden="true" />
              </div>
              <div className="text-left">
                <span className="text-xs font-bold text-slate-200 block">Раҳимов А. Ҷ.</span>
                <span className="text-[10px] text-emerald-400 font-semibold block flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                  Тасдиқшуда (SIM-ID)
                </span>
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
              aria-label={mobileMenuOpen ? "Пӯшидани меню / Close menu" : "Кушодани меню / Open menu"}
              className="p-2.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl border border-slate-700"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" aria-hidden="true" />
              ) : (
                <Menu className="w-6 h-6" aria-hidden="true" />
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation"
          className="md:hidden border-t border-slate-800 bg-slate-900/95 backdrop-blur-xl px-4 pt-3 pb-6 space-y-3"
        >
          <nav aria-label="Навигатсияи мобилӣ / Mobile Navigation" className="space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  aria-current={isActive ? "page" : undefined}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-semibold transition-all ${
                    isActive
                      ? "bg-emerald-600 text-white shadow-lg"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <Icon className="w-5 h-5" aria-hidden="true" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
};
