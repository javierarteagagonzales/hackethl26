"use client";

import { motion } from "framer-motion";
import { Users, ArrowRight } from "lucide-react";

export function CallsSection({ t }: { t: (key: string) => string }) {
  const callsData = [
    {
      id: "mentor_judge",
      icon: Users,
      link: "https://tally.so/r/VLyg5J",
    },
  ];

  return (
    <section
      id="calls"
      className="py-16 md:py-24 border-t border-border relative z-10 bg-surface/30"
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 flex flex-col items-center">
          <h2
            className="text-3xl md:text-5xl font-bold tracking-tight"
            style={{ letterSpacing: "-0.02em" }}
          >
            {t("calls.title")}{" "}
            <span className="text-gradient-sunset font-extrabold">{t("calls.accent")}</span>
          </h2>
          <p className="text-fg/70 text-lg max-w-2xl mx-auto mt-4 font-light">
            {t("calls.description")}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 justify-center max-w-sm mx-auto">
          {callsData.map((call, index) => {
            const Icon = call.icon;
            const isActive = call.link !== "#";

            const cardContent = (
              <>
                {isActive && (
                  <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent/5 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-brand-accent/10 transition-colors"></div>
                )}

                <div
                  className={`w-14 h-14 rounded-2xl bg-surface/80 border border-border flex items-center justify-center mb-6 shadow-sm ${isActive ? "group-hover:border-brand-accent/30 group-hover:scale-110 transition-all" : ""}`}
                >
                  <Icon className={`w-6 h-6 ${isActive ? "text-brand-accent" : "text-fg/60"}`} />
                </div>

                <h3 className="text-2xl font-bold mb-3 text-fg">{t(`calls.${call.id}.title`)}</h3>
                <p className="text-fg/70 mb-8 font-light flex-grow leading-relaxed">
                  {t(`calls.${call.id}.description`)}
                </p>

                <div
                  className={`mt-auto inline-flex items-center gap-2 font-mono text-sm uppercase tracking-wider font-semibold ${isActive ? "text-brand-accent group-hover:gap-3 transition-all" : "text-fg/40 cursor-not-allowed"}`}
                >
                  {t(`calls.${call.id}.cta`)} {isActive && <ArrowRight className="w-4 h-4" />}
                </div>
              </>
            );

            return (
              <motion.div
                key={call.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                className="flex-1"
              >
                {isActive ? (
                  <a
                    href={call.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-card p-8 h-full flex flex-col group hover:border-brand-accent/40 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
                  >
                    {cardContent}
                  </a>
                ) : (
                  <div className="glass-card p-8 h-full flex flex-col group relative overflow-hidden opacity-80 hover:opacity-100 transition-opacity">
                    {cardContent}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
