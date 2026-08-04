"use client";

import { motion } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";
import Link from "next/link";

export function FAQSection({
  t,
  tArray,
}: {
  t: (key: string) => string;
  tArray: (key: string) => { q: string; a: string }[];
}) {
  const allQuestions = tArray("faq.questions") || [];
  const previewQuestions = allQuestions.slice(0, 3);

  return (
    <section id="faq" className="py-16 md:py-24 border-t border-border relative z-10 bg-surface/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 flex flex-col items-center">
          <h2
            className="text-3xl md:text-5xl font-bold tracking-tight mb-4"
            style={{ letterSpacing: "-0.02em" }}
          >
            {t("faq.title")}{" "}
            <span className="text-gradient-sunset font-extrabold">{t("faq.title_accent")}</span>
          </h2>
          <p className="text-fg/70 text-lg max-w-2xl mx-auto font-light">{t("faq.subtitle")}</p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {previewQuestions.map((item, i) => (
              <motion.details
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-card group overflow-hidden cursor-pointer bg-surface/40 hover:bg-surface/60 transition-colors"
              >
                <summary className="p-6 md:p-8 flex items-center justify-between font-bold text-lg text-fg list-none focus:outline-none">
                  <span className="pr-4">{item.q}</span>
                  <ChevronDown className="w-5 h-5 text-brand-accent transform transition-transform group-open:rotate-180 flex-shrink-0" />
                </summary>
                <div className="px-6 md:px-8 pb-6 md:pb-8 pt-0 border-t border-border/20 mt-2">
                  <p className="text-fg/70 leading-relaxed pt-4">{item.a}</p>
                </div>
              </motion.details>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-10 flex justify-center"
          >
            <Link
              href="/faq"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-brand-accent/10 border border-brand-accent/30 text-brand-accent font-semibold hover:bg-brand-accent hover:text-bg transition-all duration-300"
            >
              {t("faq.view_all")} <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
