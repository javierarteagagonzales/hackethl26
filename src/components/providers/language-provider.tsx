"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import enTranslations from "@/locales/en.json";
import esTranslations from "@/locales/es.json";
import ptTranslations from "@/locales/pt.json";

export type Locale = "en" | "es" | "pt";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const translations: Record<Locale, any> = {
  en: enTranslations,
  es: esTranslations,
  pt: ptTranslations,
};

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, variables?: Record<string, string | number>) => string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tArray: (key: string) => any[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [locale, setLocaleState] = useState<Locale>("en");
  const [isInitialized, setIsInitialized] = useState(false);

  // Helper to set cookie
  const setCookie = (name: string, value: string, days = 365) => {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Lax`;
  };

  // Detect and set initial language
  useEffect(() => {
    // 1. Check path prefix first
    const pathParts = pathname.split("/");
    const firstSegment = pathParts[1] as Locale;

    let detectedLocale: Locale = "en";

    if (["en", "es", "pt"].includes(firstSegment)) {
      detectedLocale = firstSegment;
    } else {
      // 2. Check localStorage
      const saved = localStorage.getItem("lang") as Locale;
      if (saved && ["en", "es", "pt"].includes(saved)) {
        detectedLocale = saved;
      } else {
        // 3. Detect browser language
        const browserLang = navigator.language.split("-")[0];
        if (browserLang === "es") {
          detectedLocale = "es";
        } else if (browserLang === "pt") {
          detectedLocale = "pt";
        }
      }

      // If the current path doesn't have a locale prefix but we detected one,
      // we can redirect or let the middleware handle it. For smooth SPA transitions,
      // we update the URL to include the locale prefix if it's not the default (en)
      // or if we want clean routing.
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLocaleState(detectedLocale);
    localStorage.setItem("lang", detectedLocale);
    setCookie("lang", detectedLocale);
    setIsInitialized(true);
  }, [pathname]);

  // Sync HTML lang attribute
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = (newLocale: Locale) => {
    if (newLocale === locale) return;

    setLocaleState(newLocale);
    localStorage.setItem("lang", newLocale);
    setCookie("lang", newLocale);

    // Dynamic routing transition
    const pathParts = pathname.split("/");
    const firstSegment = pathParts[1];

    let newPath = "";
    if (["en", "es", "pt"].includes(firstSegment)) {
      // Replace existing prefix
      pathParts[1] = newLocale;
      newPath = pathParts.join("/");
    } else {
      // Prepend prefix
      newPath = `/${newLocale}${pathname === "/" ? "" : pathname}`;
    }

    // Direct SPA router transition without layout shifts or full reload
    router.push(newPath);
  };

  // Deep key lookup (e.g. "login.welcome")
  const t = (key: string, variables?: Record<string, string | number>): string => {
    const keys = key.split(".");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let current: any = translations[locale] || translations["en"];

    for (const k of keys) {
      if (current && typeof current === "object" && k in current) {
        current = current[k];
      } else {
        // Fallback to English
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let fallback: any = translations["en"];
        for (const fk of keys) {
          if (fallback && typeof fallback === "object" && fk in fallback) {
            fallback = fallback[fk];
          } else {
            fallback = key; // Fallback to raw key if not found in English
            break;
          }
        }
        current = fallback;
        break;
      }
    }

    if (typeof current !== "string") {
      return key;
    }

    // Replace variables
    if (variables) {
      let str = current;
      Object.entries(variables).forEach(([k, v]) => {
        str = str.replace(new RegExp(`{${k}}`, "g"), String(v));
      });
      return str;
    }

    return current;
  };

  // Retrieve translation arrays (e.g., timeline items)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tArray = (key: string): any[] => {
    const keys = key.split(".");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let current: any = translations[locale] || translations["en"];

    for (const k of keys) {
      if (current && typeof current === "object" && k in current) {
        current = current[k];
      } else {
        // Fallback to English
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let fallback: any = translations["en"];
        for (const fk of keys) {
          if (fallback && typeof fallback === "object" && fk in fallback) {
            fallback = fallback[fk];
          } else {
            fallback = [];
            break;
          }
        }
        current = fallback;
        break;
      }
    }

    return Array.isArray(current) ? current : [];
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t, tArray }}>
      {/* Prevent render flash until we've detected the language preference */}
      {isInitialized ? (
        children
      ) : (
        <div className="min-h-screen bg-bg opacity-0 transition-opacity duration-300" />
      )}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useTranslation must be used within a LanguageProvider");
  }
  return context;
};
