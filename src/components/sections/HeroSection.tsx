"use client";

import { motion } from "framer-motion";
import { Calendar, Terminal, ArrowRight } from "lucide-react";

export function HeroSection({ t, terminalText, isDark }: { t: (key: string) => string, terminalText: string, isDark: boolean }) {
  return (
    <section className="relative pt-24 pb-20 md:pt-32 md:pb-32 z-10">
      <div className="container relative mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Coming Soon Badge with Live Dot */}
          <div className="flex flex-col items-center gap-3 mb-8">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-brand-accent/30 bg-brand-accent/5 text-fg font-semibold text-sm shadow-md font-mono">
              <div className="live-dot" />
              {t("hero.badge")}
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-fg/60 font-mono text-xs sm:text-sm uppercase tracking-widest">
              <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-brand-accent" /> {t("hero.date")}</div>
              <div className="flex items-center gap-2">🌍 {t("hero.hybrid")}</div>
            </div>
          </div>

          {/* Plus Jakarta Sans Heading with letter-spacing & accent gradient */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-6 leading-none" style={{ letterSpacing: "-0.02em" }}>
            <span className="text-gradient-sunset">{t("hero.title_main")}</span>{" "}
            {t("hero.title_sub")} <span className="block text-fg">2026</span>
          </h1>

          <p className="text-xl text-fg/70 max-w-2xl mx-auto mb-8 font-light leading-relaxed">
            {t("hero.description")}
          </p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-12 flex justify-center"
          >
            <a
              href="https://tally.so/r/aQa4GX"
              target="_blank"
              rel="noreferrer"
              className="group relative inline-flex items-center justify-center gap-3 bg-fg text-bg px-8 py-4 rounded-full font-bold text-lg overflow-hidden transition-all hover:scale-105 shadow-xl hover:shadow-brand-accent/20"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-coral via-orange to-teal opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
                {t("hero.waitlist_btn")} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </a>
          </motion.div>

          {/* Premium Glassmorphic Terminal Window */}
          <div className="max-w-3xl mx-auto my-12 text-left glass-card overflow-hidden shadow-xl border-brand-accent/10">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-surface/40">
              <div className="w-3 h-3 rounded-full bg-coral opacity-80"></div>
              <div className="w-3 h-3 rounded-full bg-orange opacity-80"></div>
              <div className="w-3 h-3 rounded-full bg-teal opacity-80"></div>
              <div className="ml-2 flex items-center text-fg/50 text-xs font-mono"><Terminal className="w-3 h-3 mr-1" /> {t("hero.terminal_title")}</div>
            </div>
            <div className="p-6 font-mono text-sm md:text-base text-brand-accent whitespace-pre-wrap min-h-[160px]">
              {terminalText}
              <span className="animate-pulse text-fg">_</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
