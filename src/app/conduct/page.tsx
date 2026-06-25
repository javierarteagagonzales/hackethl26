"use client";

import Link from "next/link";
import { ArrowLeft, Heart, XOctagon, AlertCircle, Mail, Users } from "lucide-react";
import { useTranslation } from "@/components/providers/language-provider";
import { Logo } from "@/components/ui/logo";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { motion } from "framer-motion";

const sectionIcons: Record<string, React.ReactNode> = {
  expected: <Heart className="w-5 h-5" />,
  unacceptable: <XOctagon className="w-5 h-5" />,
  consequences: <AlertCircle className="w-5 h-5" />,
};

const sectionKeys = [
  "expected",
  "unacceptable",
  "consequences",
];

export default function ConductPage() {
  const { t, tArray } = useTranslation();

  return (
    <div className="min-h-screen bg-bg text-fg font-sans transition-colors duration-300">
      {/* Subtle glow overlay */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20 hidden lg:block"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 10%, rgba(230,74,48,0.18), transparent 60%), radial-gradient(ellipse 60% 50% at 20% 90%, rgba(61,190,213,0.14), transparent 60%)",
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
            className="max-w-3xl"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-fg/50 hover:text-brand-accent transition-colors text-sm font-mono mb-8 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              {t("conduct.back_home")}
            </Link>

            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-brand-accent text-xs font-mono font-semibold tracking-wider uppercase">
                <Users className="w-3.5 h-3.5" />
                {t("conduct.badge")}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">
              {t("conduct.title")}{" "}
              <span className="text-gradient-sunset">{t("conduct.title_accent")}</span>
            </h1>
            <p className="text-fg/60 text-lg leading-relaxed max-w-2xl">
              {t("conduct.subtitle")}
            </p>
            <p className="text-fg/40 text-sm font-mono mt-4">
              {t("conduct.last_updated")}: <span className="text-brand-accent">2026-06-24</span>
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Intro card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="glass-card p-6 md:p-8 mb-10"
          >
            <p className="text-fg/70 leading-relaxed text-base">
              {t("conduct.intro")}
            </p>
          </motion.div>

          {/* Sections */}
          <div className="space-y-8">
            {sectionKeys.map((key, i) => {
              const items = tArray(`conduct.sections.${key}.items`);
              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.07, duration: 0.5 }}
                  className="glass-card p-6 md:p-8"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center text-brand-accent">
                      {sectionIcons[key]}
                    </div>
                    <div>
                      <span className="text-xs font-mono text-brand-accent/60 uppercase tracking-widest block">
                        0{i + 1}
                      </span>
                      <h2 className="text-lg font-bold text-fg leading-tight">
                        {t(`conduct.sections.${key}.title`)}
                      </h2>
                    </div>
                  </div>

                  <p className="text-fg/60 text-sm leading-relaxed mb-4">
                    {t(`conduct.sections.${key}.description`)}
                  </p>

                  {items && items.length > 0 && (
                    <ul className="space-y-2">
                      {items.map((item: string, idx: number) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2.5 text-sm text-fg/70"
                        >
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-accent flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="mt-10 p-6 md:p-8 rounded-3xl border border-brand-accent/20 bg-brand-accent/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
          >
            <div>
              <p className="font-semibold text-fg mb-1">{t("conduct.cta_title")}</p>
              <p className="text-fg/50 text-sm">{t("conduct.cta_desc")}</p>
            </div>
            <a
              href="mailto:contact@ethlima.org"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-accent text-bg text-sm font-semibold hover:opacity-90 transition-opacity whitespace-nowrap"
            >
              <Mail className="w-4 h-4" />
              {t("conduct.cta_btn")}
            </a>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border bg-surface/40 py-8 mt-8">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-fg/40">
          <div className="flex items-center gap-3">
            <Logo alt="ETH Lima Logo" className="h-7 w-auto grayscale opacity-50" />
          </div>
          <p className="font-mono text-xs">
            © 2026 Ethereum Lima. {t("conduct.all_rights")}
          </p>
          <Link href="/" className="hover:text-brand-accent transition-colors font-mono text-xs">
            ← {t("conduct.back_home")}
          </Link>
        </div>
      </footer>
    </div>
  );
}
