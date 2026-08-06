"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface AccessibilityState {
  highContrast: boolean;
  fontSizeScale: number; // 1, 1.15, 1.3
  dyslexicFont: boolean;
  reducedMotion: boolean;
  announcement: string;
  toggleHighContrast: () => void;
  setFontSizeScale: (scale: number) => void;
  toggleDyslexicFont: () => void;
  toggleReducedMotion: () => void;
  announce: (message: string) => void;
}

const AccessibilityContext = createContext<AccessibilityState | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [highContrast, setHighContrast] = useState<boolean>(false);
  const [fontSizeScale, setFontSizeScaleState] = useState<number>(1);
  const [dyslexicFont, setDyslexicFont] = useState<boolean>(false);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);
  const [announcement, setAnnouncement] = useState<string>("");

  useEffect(() => {
    if (typeof document !== "undefined") {
      if (highContrast) {
        document.documentElement.classList.add("high-contrast");
      } else {
        document.documentElement.classList.remove("high-contrast");
      }
    }
  }, [highContrast]);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.style.setProperty("--font-scale", fontSizeScale.toString());
    }
  }, [fontSizeScale]);

  const toggleHighContrast = () => {
    setHighContrast((prev) => !prev);
    announce(highContrast ? "High contrast mode disabled." : "High contrast mode enabled.");
  };

  const setFontSizeScale = (scale: number) => {
    setFontSizeScaleState(scale);
    announce(`Font size scaled to ${Math.round(scale * 100)} percent.`);
  };

  const toggleDyslexicFont = () => {
    setDyslexicFont((prev) => !prev);
    announce(dyslexicFont ? "Standard font activated." : "Dyslexia-friendly font activated.");
  };

  const toggleReducedMotion = () => {
    setReducedMotion((prev) => !prev);
    announce(reducedMotion ? "Standard animation speed restored." : "Reduced motion mode enabled.");
  };

  const announce = (message: string) => {
    setAnnouncement(message);
    // Reset after reading
    setTimeout(() => {
      setAnnouncement("");
    }, 4000);
  };

  return (
    <AccessibilityContext.Provider
      value={{
        highContrast,
        fontSizeScale,
        dyslexicFont,
        reducedMotion,
        announcement,
        toggleHighContrast,
        setFontSizeScale,
        toggleDyslexicFont,
        toggleReducedMotion,
        announce,
      }}
    >
      <div className={dyslexicFont ? "font-sans" : ""}>
        {/* Screen Reader ARIA Live Region */}
        <div
          aria-live="polite"
          aria-atomic="true"
          className="sr-only"
          role="status"
          id="accessibility-announcer"
        >
          {announcement}
        </div>
        {children}
      </div>
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error("useAccessibility must be used within an AccessibilityProvider");
  }
  return context;
};
