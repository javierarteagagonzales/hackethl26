"use client";

import { motion } from "framer-motion";

export interface TimelineItem {
  title: string;
  day: string;
  time: string;
  desc: string;
}

export function TimelineSection({
  t,
  tArray,
}: {
  t: (key: string) => string;
  tArray: (key: string) => TimelineItem[];
}) {
  const items = tArray("timeline.items");
  const colors = ["bg-coral", "bg-teal", "bg-orange", "bg-cyan", "bg-brand-accent"];

  return (
    <section
      id="timeline"
      className="py-24 border-t border-border relative z-10 bg-bg transition-colors duration-300"
    >
      {/* Visual Blockchain Link Node to Sponsors */}
      <div className="absolute top-0 left-6 md:left-12 lg:left-16 h-12 w-[1px] bg-gradient-to-b from-transparent to-teal/40 hidden md:block"></div>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 flex flex-col items-center">
          <div className="flex items-center gap-4 mb-4">
            <div className="hidden md:flex items-center justify-center w-10 h-10 rounded-full border border-teal/20 bg-teal/5 backdrop-blur-sm z-10 shrink-0">
              <div className="w-3 h-3 rounded-full bg-teal animate-pulse" />
            </div>
            <h2
              className="text-3xl md:text-5xl font-bold tracking-tight"
              style={{ letterSpacing: "-0.02em" }}
            >
              {t("timeline.title")}{" "}
              <span className="text-gradient-sunset font-extrabold">{t("timeline.accent")}</span>
            </h2>
          </div>
          <p className="text-fg/60 text-lg font-light">{t("timeline.description")}</p>
        </div>

        {/* ── MOBILE: vertical stack ── */}
        <div className="flex flex-col gap-8 md:hidden">
          {items.map((item: TimelineItem, idx: number) => {
            const color = colors[idx % colors.length];
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="relative flex flex-col items-center text-center group"
              >
                <div
                  className={`flex items-center justify-center w-7 h-7 rounded-full border-[4px] border-bg ${color} z-10 mb-4 transition-transform duration-300 group-hover:scale-110 shadow-sm`}
                ></div>
                <div className="glass-card w-full p-6 transition-all duration-300 hover:border-brand-accent/30">
                  <h3 className="font-bold text-fg text-lg mb-2">{item.title}</h3>
                  <div className="font-mono text-xs mb-3 text-fg/50 font-semibold">
                    {item.day} <span className="mx-1 text-fg/30">•</span> {item.time}
                  </div>
                  <p className="text-fg/60 text-sm leading-relaxed font-light">{item.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ── DESKTOP: centered row ── */}
        <div className="hidden md:block relative mt-10">
          <div className="relative flex flex-row flex-wrap justify-center gap-6">
            {items.map((item: TimelineItem, idx: number) => {
              const color = colors[idx % colors.length];
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="relative flex flex-col items-center text-center group"
                  style={{ width: "220px", flexShrink: 0 }}
                >
                  {/* Node */}
                  <div
                    className={`flex items-center justify-center w-7 h-7 rounded-full border-[4px] border-bg ${color} z-10 mb-6 transition-transform duration-300 group-hover:scale-110 shadow-sm`}
                  ></div>

                  {/* Content Card */}
                  <div className="glass-card w-full p-5 transition-all duration-300 hover:border-brand-accent/30">
                    <h3 className="font-bold text-fg text-base mb-2">{item.title}</h3>
                    <div className="font-mono text-xs mb-3 text-fg/50 font-semibold">
                      {item.day} <span className="mx-1 text-fg/30">•</span> {item.time}
                    </div>
                    <p className="text-fg/60 text-sm leading-relaxed font-light">{item.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
