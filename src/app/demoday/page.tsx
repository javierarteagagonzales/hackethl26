"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Ticket,
  Presentation,
  MessageSquare,
  Network,
  Sparkles,
  Clock,
  Home,
  CheckCircle2,
} from "lucide-react";
import { useTranslation } from "@/components/providers/language-provider";
import { Logo } from "@/components/ui/logo";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { LanguageSwitcher } from "@/components/ui/language-switcher";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

export default function DemoDayPage() {
  const { t } = useTranslation();

  const whyCards = [
    { icon: Presentation, id: "present" },
    { icon: MessageSquare, id: "feedback" },
    { icon: Network, id: "connect" },
    { icon: Sparkles, id: "experience" },
  ];

  const comingItems = [
    "agenda",
    "venue",
    "teams",
    "speakers",
    "guests",
    "registration",
    "activities",
  ];

  return (
    <div className="min-h-screen bg-bg text-fg font-sans transition-colors duration-300 overflow-x-hidden">
      {/* Glow overlay */}
      <div
        className="fixed inset-0 z-0 pointer-events-none opacity-20 hidden lg:block"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 20% 10%, rgba(230,74,48,0.18), transparent 60%), radial-gradient(ellipse 60% 50% at 80% 20%, rgba(61,190,213,0.14), transparent 60%), radial-gradient(ellipse 80% 60% at 50% 80%, rgba(241,138,46,0.12), transparent 60%)",
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

      {/* Hero */}
      <section className="relative pt-20 pb-24 md:pt-32 md:pb-36 z-10 border-b border-border overflow-hidden">
        {/* Decorative grid */}
        <div className="absolute inset-0 pattern-grid opacity-30 pointer-events-none" />

        {/* Floating blobs */}
        <div
          className="absolute top-10 right-10 w-64 h-64 rounded-full pointer-events-none hidden lg:block"
          style={{
            background:
              "radial-gradient(circle, rgba(230,74,48,0.12) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        <div
          className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full pointer-events-none hidden lg:block"
          style={{
            background:
              "radial-gradient(circle, rgba(61,190,213,0.1) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />

        <div className="container mx-auto px-6 text-center relative">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-fg/50 hover:text-brand-accent transition-colors text-sm font-mono mb-10 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              {t("demoday.back_home")}
            </Link>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="flex justify-center mb-6"
          >
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-brand-accent/30 bg-brand-accent/5 text-brand-accent text-xs font-mono font-semibold tracking-widest uppercase">
              <span className="live-dot" />
              {t("demoday.badge")}
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-6 leading-none"
            style={{ letterSpacing: "-0.02em" }}
          >
            <span className="text-gradient-sunset">{t("demoday.hero_title")}</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
            className="text-lg md:text-xl text-fg/70 max-w-2xl mx-auto mb-10 font-light leading-relaxed"
          >
            {t("demoday.hero_subtitle")}
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={4}
          >
            <button
              disabled
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-base border border-border bg-surface/60 text-fg/50 cursor-not-allowed backdrop-blur-sm shadow-inner select-none"
            >
              <Clock className="w-5 h-5 text-brand-accent/60" />
              {t("demoday.hero_cta")}
            </button>
          </motion.div>
        </div>
      </section>

      {/* What is Demo Day */}
      <section className="py-20 md:py-28 z-10 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0}
              className="text-center mb-12"
            >
              <h2
                className="text-3xl md:text-5xl font-bold tracking-tight mb-4"
                style={{ letterSpacing: "-0.02em" }}
              >
                {t("demoday.what_title")}{" "}
                <span className="text-gradient-sunset font-extrabold">
                  {t("demoday.what_accent")}
                </span>
              </h2>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={1}
              className="glass-card p-8 md:p-12 text-center md:text-left"
            >
              <p className="text-fg/75 text-lg leading-relaxed">
                {t("demoday.what_body")}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Attend */}
      <section className="py-20 md:py-28 border-t border-border bg-surface/30 relative z-10">
        <div className="container mx-auto px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            className="text-center mb-16"
          >
            <h2
              className="text-3xl md:text-5xl font-bold tracking-tight"
              style={{ letterSpacing: "-0.02em" }}
            >
              {t("demoday.why_title")}{" "}
              <span className="text-gradient-sunset font-extrabold">
                {t("demoday.why_accent")}
              </span>
            </h2>
            <p className="text-fg/60 text-lg max-w-xl mx-auto mt-4 font-light">
              {t("demoday.why_subtitle")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {whyCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.id}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i + 1}
                  className="glass-card p-7 flex flex-col group"
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-brand-accent/15 transition-all duration-300">
                    <Icon className="w-5 h-5 text-brand-accent" />
                  </div>
                  <h3 className="font-bold text-lg text-fg mb-2">
                    {t(`demoday.why_${card.id}_title`)}
                  </h3>
                  <p className="text-fg/65 text-sm leading-relaxed font-light">
                    {t(`demoday.why_${card.id}_desc`)}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Event Info */}
      <section className="py-20 md:py-28 relative z-10">
        <div className="container mx-auto px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            className="text-center mb-16"
          >
            <h2
              className="text-3xl md:text-5xl font-bold tracking-tight"
              style={{ letterSpacing: "-0.02em" }}
            >
              {t("demoday.info_title")}{" "}
              <span className="text-gradient-sunset font-extrabold">
                {t("demoday.info_accent")}
              </span>
            </h2>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            className="max-w-3xl mx-auto"
          >
            <div className="vibrant-border rounded-3xl p-px">
              <div className="rounded-3xl bg-surface/80 backdrop-blur-sm p-8 md:p-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                {/* Date */}
                <div className="flex flex-col items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-brand-accent" />
                  </div>
                  <div>
                    <p className="text-fg/50 text-xs font-mono uppercase tracking-widest mb-1">
                      {t("demoday.info_date_label")}
                    </p>
                    <p className="font-bold text-fg text-lg leading-tight">
                      {t("demoday.info_date_value")}
                    </p>
                  </div>
                </div>

                {/* Place */}
                <div className="flex flex-col items-center gap-4 md:border-x md:border-border/50">
                  <div className="w-14 h-14 rounded-2xl bg-cyan/10 border border-cyan/20 flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-cyan" />
                  </div>
                  <div>
                    <p className="text-fg/50 text-xs font-mono uppercase tracking-widest mb-1">
                      {t("demoday.info_place_label")}
                    </p>
                    <p className="font-bold text-fg text-lg leading-tight">
                      {t("demoday.info_place_value")}
                    </p>
                  </div>
                </div>

                {/* Modality */}
                <div className="flex flex-col items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-teal/10 border border-teal/20 flex items-center justify-center">
                    <Ticket className="w-6 h-6 text-teal" />
                  </div>
                  <div>
                    <p className="text-fg/50 text-xs font-mono uppercase tracking-widest mb-1">
                      {t("demoday.info_modality_label")}
                    </p>
                    <p className="font-bold text-fg text-lg leading-tight">
                      {t("demoday.info_modality_value")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Coming Soon Timeline */}
      <section className="py-20 md:py-28 border-t border-border bg-surface/30 relative z-10">
        <div className="container mx-auto px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            className="text-center mb-16"
          >
            <h2
              className="text-3xl md:text-5xl font-bold tracking-tight"
              style={{ letterSpacing: "-0.02em" }}
            >
              {t("demoday.coming_title")}{" "}
              <span className="text-gradient-sunset font-extrabold">
                {t("demoday.coming_accent")}
              </span>
            </h2>
            <p className="text-fg/60 text-lg max-w-xl mx-auto mt-4 font-light">
              {t("demoday.coming_subtitle")}
            </p>
          </motion.div>

          <div className="max-w-2xl mx-auto space-y-4">
            {comingItems.map((item, i) => (
              <motion.div
                key={item}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i + 1}
                className="glass-card p-5 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="w-9 h-9 rounded-lg bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-brand-accent/50" />
                  </div>
                  <span className="font-medium text-fg text-sm md:text-base">
                    {t(`demoday.coming_${item}`)}
                  </span>
                </div>
                <span className="flex-shrink-0 text-xs font-mono font-semibold px-3 py-1 rounded-full border border-border bg-surface/80 text-fg/40 uppercase tracking-wider">
                  {t("demoday.coming_badge")}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 md:py-32 relative z-10 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none hidden lg:block"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(230,74,48,0.07), transparent 70%)",
          }}
        />
        <div className="container mx-auto px-6 text-center relative">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
          >
            <div className="max-w-3xl mx-auto">
              <h2
                className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6 text-gradient-sunset"
                style={{ letterSpacing: "-0.02em" }}
              >
                {t("demoday.cta_title")}
              </h2>
              <p className="text-fg/65 text-lg font-light leading-relaxed mb-10 max-w-2xl mx-auto">
                {t("demoday.cta_body")}
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-base bg-brand-accent text-bg hover:opacity-90 transition-all hover:scale-105 shadow-xl"
                style={{ boxShadow: "0 4px 28px rgba(var(--color-brand-accent), 0.3)" }}
              >
                <Home className="w-5 h-5" />
                {t("demoday.cta_btn")}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-surface/40 py-8">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-fg/40">
          <div className="flex items-center gap-3">
            <Logo alt="ETH Lima Logo" className="h-7 w-auto grayscale opacity-50" />
          </div>
          <p className="font-mono text-xs text-center md:text-left">
            © 2026 Ethereum Lima. {t("demoday.all_rights")}
          </p>
          <Link
            href="/"
            className="hover:text-brand-accent transition-colors font-mono text-xs"
          >
            ← {t("demoday.back_home")}
          </Link>
        </div>
      </footer>
    </div>
  );
}
