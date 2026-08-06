import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AccessibilityProvider } from "@/context/AccessibilityContext";
import { SkipLink } from "@/components/SkipLink";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AccessibilityToolbar } from "@/components/AccessibilityToolbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "my.gov.tj | Портали ягонаи хизматрасониҳои давлатӣ",
  description: "Портали ягонаи хизматрасониҳои давлатии Ҷумҳурии Тоҷикистон бо мутобиқати пурра ба стандарти дастрасии WCAG 2.1 AA",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="tj"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-100">
        <AccessibilityProvider>
          <SkipLink />
          <Navbar />
          <main id="main-content" tabIndex={-1} className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 focus:outline-none">
            {children}
          </main>
          <AccessibilityToolbar />
          <Footer />
        </AccessibilityProvider>
      </body>
    </html>
  );
}
