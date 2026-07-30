"use client";

import { motion } from "framer-motion";

export interface WorkshopItem {
  workshop: string;
  date: string;
  day: string;
  time: string;
  speaker: string;
  speakerInitials: string;
  organization: string;
  flag: string;
  description: string;
  accent: string;
}

export function WorkshopsSection({
  t,
  tArray,
}: {
  t: (key: string) => string;
  tArray: (key: string) => WorkshopItem[];
}) {
  const items = tArray("workshops.items");

  return (
    <section
      id="workshops"
      className="py-24 border-t border-border relative z-10 bg-bg transition-colors duration-300"
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 flex flex-col items-center">
          <h2
            className="text-3xl md:text-5xl font-bold tracking-tight"
            style={{ letterSpacing: "-0.02em" }}
          >
            {t("workshops.title")}{" "}
            <span className="text-gradient-sunset font-extrabold">{t("workshops.accent")}</span>
          </h2>
          <p className="text-fg/60 text-lg font-light mt-4 max-w-2xl">
            {t("workshops.description")}
          </p>
        </div>

        {/* ── MOBILE: stacked cards ── */}
        <div className="flex flex-col gap-4 md:hidden">
          {items.map((item: WorkshopItem, idx: number) => {
            const chipFg =
              item.accent === "#3dbed5" || item.accent === "#2ca89f" ? "#0b0717" : "#fff8ee";
            const newDay = idx === 0 || items[idx - 1].date !== item.date;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
                className={`card p-5 ${newDay ? "mt-6" : ""}`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className="inline-grid place-items-center w-9 h-9 rounded-lg font-display font-extrabold text-sm leading-none flex-shrink-0"
                    style={{ backgroundColor: item.accent, color: chipFg }}
                  >
                    {idx + 1}
                  </span>
                  <span
                    className="font-mono text-xs font-semibold px-2 py-1 rounded-md whitespace-nowrap"
                    style={{
                      backgroundColor: `${item.accent}1a`,
                      color: item.accent,
                    }}
                  >
                    {item.time}
                  </span>
                  <span className="text-[11px] text-fg-muted font-mono ml-auto">{item.date}</span>
                </div>
                <h3 className="font-semibold text-fg text-[15px] leading-snug mb-1">
                  {item.workshop}
                </h3>
                {item.description && (
                  <p className="text-fg/50 text-[12.5px] leading-relaxed mt-0.5 mb-3">
                    {item.description}
                  </p>
                )}
                <div className="flex items-center gap-3 pt-3 border-t border-border/50">
                  {item.speaker && (
                    <span
                      className="grid place-items-center w-8 h-8 rounded-full font-display font-bold text-[11px] leading-none flex-shrink-0"
                      style={{ backgroundColor: item.accent, color: chipFg }}
                    >
                      {item.speakerInitials}
                    </span>
                  )}
                  <div className="min-w-0">
                    <span className="text-[13px] leading-tight block font-medium">
                      {item.speaker || t("workshops.speakerTbaLabel")}
                    </span>
                    <span className="text-[11px] text-fg-muted leading-tight flex items-center gap-1 mt-0.5">
                      {item.organization}
                      {item.flag && (
                        <>
                          <span className="mx-0.5 opacity-50">·</span>
                          <span>{item.flag}</span>
                        </>
                      )}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ── DESKTOP: grid rows ── */}
        <div className="hidden md:block relative overflow-hidden rounded-2xl border border-border bg-surface">
          {/* Header */}
          <div
            className="grid gap-0 items-center px-6 py-3 border-b border-border bg-surface-2 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-fg-muted"
            style={{
              gridTemplateColumns: "3rem 6rem 5rem 1fr minmax(150px, auto)",
            }}
          >
            <span>{t("workshops.columns.mod")}</span>
            <span>{t("workshops.columns.date")}</span>
            <span>{t("workshops.columns.time")}</span>
            <span>{t("workshops.columns.topic")}</span>
            <span>{t("workshops.columns.speaker")}</span>
          </div>

          {items.map((item: WorkshopItem, idx: number) => {
            const accent = item.accent;
            const chipFg = accent === "#3dbed5" || accent === "#2ca89f" ? "#0b0717" : "#fff8ee";
            const newDay = idx === 0 || items[idx - 1].date !== item.date;
            const speakerName = item.speaker ? item.speaker : t("workshops.speakerTbaLabel");
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
                className={`grid gap-0 items-center px-6 py-3.5 border-b border-border/50 hover:bg-surface-2 transition-colors duration-200 ${newDay ? "border-t-2 border-t-border" : ""}`}
                style={{
                  gridTemplateColumns: "3rem 6rem 5rem 1fr minmax(150px, auto)",
                }}
              >
                {/* Module chip */}
                <div>
                  <span
                    className="inline-grid place-items-center w-9 h-9 rounded-lg font-display font-extrabold text-sm leading-none"
                    style={{ backgroundColor: accent, color: chipFg }}
                    title={`${t("workshops.columns.mod")} ${idx + 1}`}
                  >
                    {idx + 1}
                  </span>
                </div>

                {/* Date */}
                <div>
                  <span className="font-semibold text-[14px] leading-tight block">{item.date}</span>
                  <span className="text-[12px] text-fg-muted leading-tight block">{item.day}</span>
                </div>

                {/* Time */}
                <div>
                  <span
                    className="font-mono text-[12px] font-semibold px-2 py-1 rounded-md whitespace-nowrap"
                    style={{ backgroundColor: `${accent}1a`, color: accent }}
                  >
                    {item.time}
                  </span>
                </div>

                {/* Topic */}
                <div className="min-w-0">
                  <span className="font-semibold text-[15px] leading-snug block">
                    {item.workshop}
                  </span>
                  {item.description && (
                    <span className="hidden lg:block text-[12.5px] text-fg-muted leading-relaxed mt-0.5 max-w-[42ch]">
                      {item.description}
                    </span>
                  )}
                </div>

                {/* Speaker */}
                <div className="flex items-center gap-2.5 min-w-0">
                  {item.speaker && (
                    <span
                      className="grid place-items-center w-8 h-8 rounded-full font-display font-bold text-[11px] leading-none flex-shrink-0"
                      style={{ backgroundColor: accent, color: chipFg }}
                    >
                      {item.speakerInitials}
                    </span>
                  )}
                  <span className="min-w-0">
                    <span className="text-[13.5px] leading-tight block font-semibold truncate">
                      {speakerName}
                    </span>
                    <span className="text-[11.5px] text-fg-muted leading-tight flex items-center gap-1 mt-0.5">
                      {item.organization}
                      {item.flag && (
                        <>
                          <span className="opacity-40">·</span>
                          <span>{item.flag}</span>
                        </>
                      )}
                    </span>
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* === Outcome card === */}
        <div className="card mt-6 p-6 sm:p-7 lg:p-8 relative overflow-hidden">
          <div className="relative flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl grid place-items-center bg-brand-accent text-bg flex-shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={3}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <div>
              <span className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-brand-accent">
                {t("workshops.outcomeEyebrow")}
              </span>
              <h3 className="font-display text-2xl lg:text-[28px] font-bold leading-tight mt-2 mb-2">
                {t("workshops.outcomeTitle")}
              </h3>
              <p className="text-fg/60 leading-relaxed max-w-[60ch]">
                {t("workshops.outcomeBody")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
