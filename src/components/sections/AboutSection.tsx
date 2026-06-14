"use client";

import { motion } from "framer-motion";
import { Code2, Mic, Users } from "lucide-react";
import { Logo } from "@/components/ui/logo";

export function AboutSection({ t, isDark }: { t: (key: string) => string, isDark: boolean }) {
  return (
    <section id="about" className="py-24 border-t border-border relative z-10 bg-surface/20">
      {/* Visual Blockchain Link Node to Hero */}
      <div className="absolute top-0 left-6 md:left-12 lg:left-16 h-12 w-[1px] bg-gradient-to-b from-transparent to-coral/40 hidden md:block"></div>
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="hidden md:flex items-center justify-center w-10 h-10 rounded-full border border-coral/20 bg-coral/5 backdrop-blur-sm z-10 shrink-0">
                <div className="w-3 h-3 rounded-full bg-coral animate-pulse" />
              </div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight" style={{ letterSpacing: "-0.02em" }}>
                {t("about.title")} <span className="text-gradient-sunset font-extrabold">{t("about.accent")}</span>
              </h2>
            </div>
            <p className="text-fg/70 text-lg mb-6 leading-relaxed">
              {t("about.description")}
            </p>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-fg/80"><Code2 className="text-coral w-5 h-5 font-bold" /> {t("about.perk1")}</li>
              <li className="flex items-center gap-3 text-fg/80"><Mic className="text-orange w-5 h-5 font-bold" /> {t("about.perk2")}</li>
              <li className="flex items-center gap-3 text-fg/80"><Users className="text-teal w-5 h-5 font-bold" /> {t("about.perk3")}</li>
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-full min-h-[300px] glass-card p-8 flex items-center justify-center overflow-hidden shadow-lg border-brand-accent/15"
          >
            <div className="absolute inset-0 pattern-dots opacity-10"></div>
            <Logo
              alt="ETH Lima Logo"
              width={200}
              height={200}
              className="object-contain drop-shadow-[0_0_30px_rgba(230,74,48,0.3)] animate-pulse relative z-10"
              style={{ filter: !isDark ? "none" : "drop-shadow(0 0 30px rgba(199, 247, 58, 0.4))" }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
