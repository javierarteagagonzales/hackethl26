"use client";

import Link from "next/link";
import { ArrowLeft, HelpCircle, MessageSquare, ChevronDown } from "lucide-react";
import { useTranslation } from "@/components/providers/language-provider";
import { Logo } from "@/components/ui/logo";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { motion } from "framer-motion";

export default function FAQPage() {
  const { t, tArray } = useTranslation();
  const questions = tArray("faq.questions") || [];

  return (
    <div className="min-h-screen bg-bg text-fg font-sans transition-colors duration-300">
      {/* Subtle glow overlay */}
      <div
        className="fixed inset-0 z-0 pointer-events-none opacity-20 hidden lg:block"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 10%, rgba(230,74,48,0.18), transparent 60%), radial-gradient(ellipse 60% 50% at 50% 90%, rgba(61,190,213,0.14), transparent 60%)",
        }}
      />

      {/* Nav */}
      <nav className="sticky top-0 w-full z-50 border-b border-border bg-surface/75 backdrop-blur-xl transition-all duration-300">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Logo alt="ETH Lima Logo" className="h-8 sm:h-10 w-auto object-contain" />
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* Hero Header */}
      <div className="relative border-b border-border bg-surface/40 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center md:text-left"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-fg/50 hover:text-brand-accent transition-colors text-sm font-mono mb-8 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              {t("faq.back_home")}
            </Link>

            <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-brand-accent text-xs font-mono font-semibold tracking-wider uppercase">
                <HelpCircle className="w-3.5 h-3.5" />
                {t("faq.badge")}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">
              {t("faq.title")} <span className="text-gradient-sunset">{t("faq.title_accent")}</span>
            </h1>
            <p className="text-fg/60 text-lg leading-relaxed max-w-2xl mx-auto md:mx-0">
              {t("faq.subtitle")}
            </p>
            <p className="text-fg/40 text-sm font-mono mt-4">
              {t("faq.last_updated")}: <span className="text-brand-accent">2026-06-24</span>
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-3xl mx-auto">
          {/* Intro card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="glass-card p-6 md:p-8 mb-10 text-center md:text-left"
          >
            <p className="text-fg/70 leading-relaxed text-base">{t("faq.intro")}</p>
          </motion.div>

          {/* Accordion Questions */}
          <div className="space-y-4">
            {questions && questions.length > 0 ? (
              questions.map((item: { q: string; a: string }, i: number) => (
                <motion.details
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.05, duration: 0.5 }}
                  className="glass-card group overflow-hidden cursor-pointer"
                >
                  <summary className="p-6 md:p-8 flex items-center justify-between font-bold text-lg text-fg list-none focus:outline-none">
                    <span className="pr-4">{item.q}</span>
                    <ChevronDown className="w-5 h-5 text-brand-accent transform transition-transform group-open:rotate-180 flex-shrink-0" />
                  </summary>
                  <div className="px-6 md:px-8 pb-6 md:pb-8 pt-0 border-t border-border/20 mt-2">
                    <p className="text-fg/70 leading-relaxed pt-4">{item.a}</p>
                  </div>
                </motion.details>
              ))
            ) : (
              <div className="p-12 border border-dashed border-border/50 rounded-xl flex items-center justify-center text-fg/40 font-mono text-sm">
                [ FAQ Data Not Found ]
              </div>
            )}
          </div>

          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="mt-12 p-6 md:p-8 rounded-3xl border border-brand-accent/20 bg-brand-accent/5 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left"
          >
            <div>
              <p className="font-semibold text-fg mb-1">{t("faq.cta_title")}</p>
              <p className="text-fg/50 text-sm">{t("faq.cta_desc")}</p>
            </div>
            <a
              href="https://discord.gg/vBBebr5vE"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-accent text-bg text-sm font-bold hover:opacity-90 transition-opacity whitespace-nowrap shadow-[0_0_15px_rgba(var(--brand-accent),0.3)]"
            >
              <MessageSquare className="w-4 h-4" />
              {t("faq.cta_btn")}
            </a>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border bg-surface/40 py-8 mt-12">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-fg/40">
          <div className="flex items-center gap-3">
            <Logo alt="ETH Lima Logo" className="h-7 w-auto grayscale opacity-50" />
          </div>
          <p className="font-mono text-xs text-center md:text-left">
            © 2026 Ethereum Lima. {t("faq.all_rights")}
          </p>
          <Link href="/" className="hover:text-brand-accent transition-colors font-mono text-xs">
            ← {t("faq.back_home")}
          </Link>
        </div>
      </footer>
    </div>
  );
}
