"use client";

import React from "react";
import Link from "next/link";
import { Shield, Phone, Mail, FileCheck2, Globe, Heart } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-sm mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Column 1: Platform info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2 text-white font-extrabold text-lg">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white text-xs font-bold">
                TJ
              </div>
              <span>my.gov.tj</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Портали ягонаи хизматрасониҳои давлатии Ҷумҳурии Тоҷикистон. Осон, шаффоф ва дастрас барои ҳамаи шаҳрвандон.
            </p>
          </div>

          {/* Column 2: Civil Registry Links */}
          <div className="space-y-3">
            <h2 className="text-sm font-bold text-white tracking-wider uppercase">
              Сабти Аснод / Civil Registry
            </h2>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/civil-registry" className="hover:text-emerald-400 underline-offset-4 hover:underline transition-colors focus:ring-2 focus:ring-emerald-400">
                  Шаҳодатномаи Таваллуд (Birth Cert)
                </Link>
              </li>
              <li>
                <Link href="/civil-registry" className="hover:text-emerald-400 underline-offset-4 hover:underline transition-colors focus:ring-2 focus:ring-emerald-400">
                  Сабти Ақди Никоҳ (Marriage Cert)
                </Link>
              </li>
              <li>
                <Link href="/civil-registry" className="hover:text-emerald-400 underline-offset-4 hover:underline transition-colors focus:ring-2 focus:ring-emerald-400">
                  Ивази Ному Насаб (Name Change)
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Document Vault & Security */}
          <div className="space-y-3">
            <h2 className="text-sm font-bold text-white tracking-wider uppercase">
              Хизматрасониҳо / Vault & Security
            </h2>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/document-vault" className="hover:text-emerald-400 underline-offset-4 hover:underline transition-colors focus:ring-2 focus:ring-emerald-400">
                  Захираи Ҳуҷҷатҳои Рақамӣ (Vault)
                </Link>
              </li>
              <li>
                <Link href="/accessibility" className="hover:text-emerald-400 underline-offset-4 hover:underline transition-colors focus:ring-2 focus:ring-emerald-400">
                  Баёнияи Дастрасӣ (WCAG 2.1 Statement)
                </Link>
              </li>
              <li>
                <a href="#main-content" className="hover:text-emerald-400 underline-offset-4 hover:underline transition-colors focus:ring-2 focus:ring-emerald-400">
                  Муҳофизати Маълумоти Шахсӣ (Privacy Policy)
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Hotline Support */}
          <div className="space-y-3">
            <h2 className="text-sm font-bold text-white tracking-wider uppercase">
              Маркази Муроҷиат / Support
            </h2>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-base">
                <Phone className="w-4 h-4" aria-hidden="true" />
                <span>1919 / +992 (37) 221-0000</span>
              </div>
              <p className="text-slate-400 text-[11px]">
                Дастгирии техникии 24/7 барои шаҳрвандон
              </p>
              <div className="flex items-center gap-2 text-slate-300 pt-1">
                <Mail className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                <span>support@my.gov.tj</span>
              </div>
            </div>
          </div>

        </div>

        {/* Divider & Copyright */}
        <div className="border-t border-slate-900 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Портали ягонаи давлатии my.gov.tj. Ҳамаи ҳуқуқҳо ҳифз шудаанд.</p>
          <div className="flex items-center gap-2 text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-3 py-1 rounded-full font-medium">
            <FileCheck2 className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Мутобиқат бо стандарти WCAG 2.1 Level AA</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
