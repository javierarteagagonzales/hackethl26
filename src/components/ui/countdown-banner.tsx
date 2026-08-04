"use client";

import { useState, useEffect, useMemo } from "react";
import { useTranslation } from "@/components/providers/language-provider";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

type Phase = "pre" | "live" | "ended";

// Deadlines are in Lima local time (UTC-5, no DST).
// Converted to UTC epochs so behavior is identical regardless of the server/runtime timezone.
// REG_END: Aug 3 23:59 Peru  -> Aug 4 02:59 UTC
const REG_END = new Date("2026-08-04T02:59:00Z").getTime();
// LIVE_END: Aug 12 15:00 Peru -> Aug 12 20:00 UTC
const LIVE_END = new Date("2026-08-12T20:00:00Z").getTime();

function getPhase(now = Date.now()): Phase {
  if (now < REG_END) return "pre";
  if (now < LIVE_END) return "live";
  return "ended";
}

function calc(target: number): TimeLeft | null {
  const distance = target - Date.now();
  if (distance <= 0) return null;
  return {
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((distance % (1000 * 60)) / 1000),
  };
}

const pad = (n: number) => String(n).padStart(2, "0");

export function CountdownBanner() {
  const { t } = useTranslation();
  const [now, setNow] = useState(() => Date.now());

  const phase: Phase = useMemo(() => getPhase(now), [now]);
  const timeLeft = useMemo(() => (phase === "pre" ? calc(REG_END) : null), [phase]);

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  // --- Phase 3: ended -------------------------------------------------
  if (phase === "ended") {
    return (
      <div
        id="countdown-banner"
        role="status"
        aria-live="polite"
        style={{
          background: "#111",
          color: "#fff",
          padding: "10px 24px",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          position: "relative",
          zIndex: 60,
          width: "100%",
        }}
      >
        <div
          style={{
            maxWidth: "960px",
            margin: "auto",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            gap: "16px",
            fontSize: "13px",
            fontWeight: 700,
          }}
        >
          <span style={{ whiteSpace: "nowrap" }}>{t("countdown.slogan_thanks")}</span>
        </div>
      </div>
    );
  }

  // --- Phase 2: live --------------------------------------------------
  if (phase === "live") {
    return (
      <div
        id="countdown-banner"
        role="status"
        aria-live="polite"
        style={{
          background: "#c7f73a",
          color: "#111",
          padding: "10px 24px",
          borderBottom: "1px solid rgba(0,0,0,0.1)",
          position: "relative",
          zIndex: 60,
          width: "100%",
        }}
      >
        <div
          style={{
            maxWidth: "960px",
            margin: "auto",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            gap: "16px",
            fontSize: "13px",
            fontWeight: 700,
          }}
        >
          <span style={{ whiteSpace: "nowrap" }}>{t("countdown.slogan_live")}</span>
          <a
            href="https://discord.gg/vBBebr5vE"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-md bg-black/10 px-3 py-1 text-xs font-semibold transition-opacity hover:bg-black/20"
          >
            {t("countdown.live_cta")}
          </a>
        </div>
      </div>
    );
  }

  // --- Phase 1: pre (registrations countdown) -------------------------
  if (!timeLeft) return null;
  const tl = timeLeft;

  return (
    <div
      id="countdown-banner"
      role="timer"
      aria-live="off"
      style={{
        background: "#c7f73a",
        color: "#111",
        padding: "10px 24px",
        borderBottom: "1px solid rgba(0,0,0,0.1)",
        position: "relative",
        zIndex: 60,
        width: "100%",
      }}
    >
      <div
        style={{
          maxWidth: "960px",
          margin: "auto",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          gap: "16px",
          fontSize: "13px",
          fontWeight: 700,
        }}
      >
        {/* Slogan */}
        <span style={{ whiteSpace: "nowrap" }}>{t("countdown.slogan")}</span>

        {/* Timer blocks */}
        <div
          className="countdown-timer-wrapper"
          suppressHydrationWarning
          style={{
            display: "flex",
            gap: "8px",
            fontFamily: "var(--font-mono, monospace)",
            animation: "pulse-subtle 2s cubic-bezier(0.4,0,0.6,1) infinite",
          }}
        >
          {[
            { value: pad(tl.days), label: t("countdown.days") },
            { value: pad(tl.hours), label: t("countdown.hours") },
            { value: pad(tl.minutes), label: t("countdown.minutes") },
            { value: pad(tl.seconds), label: t("countdown.seconds") },
          ].map(({ value, label }) => (
            <div
              key={label}
              style={{
                background: "rgba(0,0,0,0.1)",
                padding: "2px 6px",
                borderRadius: "4px",
                display: "flex",
                alignItems: "baseline",
                gap: "2px",
              }}
            >
              <span style={{ fontVariantNumeric: "tabular-nums" }}>{value}</span>
              <span style={{ fontSize: "9px", opacity: 0.85 }}>{label}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <a
          href="https://tally.so/r/VLyg5J"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-md bg-black/10 px-3 py-1 text-xs font-semibold transition-opacity hover:bg-black/20"
        >
          {t("countdown.cta")}
        </a>
      </div>
    </div>
  );
}
