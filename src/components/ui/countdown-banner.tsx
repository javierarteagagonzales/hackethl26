"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "@/components/providers/language-provider";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const TARGET_DATE = new Date("2026-07-31T09:00:00").getTime();

export function CountdownBanner() {
  const { t } = useTranslation();
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const calc = () => {
      const distance = TARGET_DATE - Date.now();
      if (distance <= 0) {
        setVisible(false);
        return null;
      }
      return {
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      };
    };

    const initial = calc();
    if (initial) {
      setTimeLeft(initial);
      setVisible(true);
    }

    const interval = setInterval(() => {
      const result = calc();
      if (result) {
        setTimeLeft(result);
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!visible || !timeLeft) return null;

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div
      id="countdown-banner"
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
        <span style={{ whiteSpace: "nowrap" }}>
          {t("countdown.slogan")}
        </span>

        {/* Timer blocks */}
        <div
          className="countdown-timer-wrapper"
          style={{
            display: "flex",
            gap: "8px",
            fontFamily: "var(--font-mono, monospace)",
            animation: "pulse-subtle 2s cubic-bezier(0.4,0,0.6,1) infinite",
          }}
        >
          {[
            { value: pad(timeLeft.days), label: t("countdown.days") },
            { value: pad(timeLeft.hours), label: t("countdown.hours") },
            { value: pad(timeLeft.minutes), label: t("countdown.minutes") },
            { value: pad(timeLeft.seconds), label: t("countdown.seconds") },
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
              <span style={{ fontSize: "9px", opacity: 0.6 }}>{label}</span>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <a
          href="https://hackathon.ethlima.org/"
          target="_blank"
          rel="noreferrer"
          className="countdown-cta-btn"
        >
          {t("countdown.cta")}
        </a>
      </div>
    </div>
  );
}
