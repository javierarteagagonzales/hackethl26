"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation, Locale } from "@/components/providers/language-provider";
import { Globe, ChevronDown, Check } from "lucide-react";

const languages: Record<Locale, { label: string; flag: string; short: string }> = {
  en: { label: "English", flag: "🇬🇧", short: "EN" },
  es: { label: "Español", flag: "🇪🇸", short: "ES" },
  pt: { label: "Português", flag: "🇵🇹", short: "PT" },
};

export function LanguageSwitcher() {
  const { locale, setLocale } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (lang: Locale) => {
    setLocale(lang);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 h-10 px-3 rounded-full border border-border bg-surface/80 text-fg hover:border-brand-accent/50 transition-all duration-200 cursor-pointer shadow-sm hover:scale-105 active:scale-95 text-xs font-mono font-semibold"
        aria-label="Select Language"
      >
        <Globe className="w-3.5 h-3.5 text-brand-accent animate-pulse" />
        <span>{languages[locale].short}</span>
        <ChevronDown className={`w-3 h-3 text-fg/50 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute right-0 mt-2 w-40 z-50 rounded-xl border border-border bg-surface/90 backdrop-blur-xl shadow-xl overflow-hidden py-1.5"
          >
            {(Object.keys(languages) as Locale[]).map((lang) => {
              const active = lang === locale;
              return (
                <button
                  key={lang}
                  onClick={() => handleSelect(lang)}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium transition-colors text-left cursor-pointer hover:bg-fg/5 ${
                    active ? "text-brand-accent bg-brand-accent/5" : "text-fg/80"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-base select-none leading-none">{languages[lang].flag}</span>
                    <span>{languages[lang].label}</span>
                  </span>
                  {active && <Check className="w-3 h-3 text-brand-accent" />}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
