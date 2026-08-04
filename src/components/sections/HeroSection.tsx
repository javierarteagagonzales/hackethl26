"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Terminal } from "lucide-react";
import { DiscordModal } from "@/components/ui/discord-modal";

const REGISTRATION_DEADLINE = new Date("2026-08-03T23:59:00").getTime();

export function HeroSection({
  t,
  terminalText,
}: {
  t: (key: string) => string;
  terminalText: string;
}) {
  const [discordOpen, setDiscordOpen] = useState(false);
  const [registrationsClosed, setRegistrationsClosed] = useState(
    () => Date.now() >= REGISTRATION_DEADLINE
  );

  useEffect(() => {
    if (registrationsClosed) return;
    const interval = setInterval(() => {
      if (Date.now() >= REGISTRATION_DEADLINE) {
        setRegistrationsClosed(true);
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [registrationsClosed]);

  return (
    <section className="relative pt-24 pb-20 md:pt-32 md:pb-32 z-10">
      <DiscordModal open={discordOpen} onClose={() => setDiscordOpen(false)} t={t} />

      <div className="container relative mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Coming Soon Badge with Live Dot */}
          <div className="flex flex-col items-center gap-3 mb-8">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-brand-accent/30 bg-brand-accent/5 text-fg font-semibold text-sm shadow-md font-mono">
              <div className="live-dot" />
              {t("hero.badge")}
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-fg/60 font-mono text-xs sm:text-sm uppercase tracking-widest">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-brand-accent" /> {t("hero.date")}
              </div>
              <div className="flex items-center gap-2">🌍 {t("hero.hybrid")}</div>
            </div>
          </div>

          {/* Plus Jakarta Sans Heading with letter-spacing & accent gradient */}
          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-6 leading-none"
            style={{ letterSpacing: "-0.02em" }}
          >
            <span className="text-gradient-sunset">{t("hero.title_main")}</span>{" "}
            {t("hero.title_sub")} <span className="block text-fg">2026</span>
          </h1>

          <p className="text-xl text-fg/70 max-w-2xl mx-auto mb-8 font-light leading-relaxed">
            {t("hero.description")}
          </p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-12 flex flex-col items-center gap-4"
          >
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                id="hero-discord-btn"
                onClick={() => setDiscordOpen(true)}
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-bold text-lg overflow-hidden transition-all hover:scale-105 shadow-xl"
                style={{
                  background: "#5865F2",
                  color: "#fff",
                  boxShadow: "0 4px 28px rgba(88,101,242,0.4)",
                }}
              >
                {/* Discord icon */}
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 71 55"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="flex-shrink-0"
                >
                  <path
                    d="M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.44077 45.4204 0.52529C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.52529C25.5141 0.44359 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.0384 50.6035 51.2557 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978ZM23.7259 37.3253C20.2276 37.3253 17.3451 34.1136 17.3451 30.1693C17.3451 26.225 20.1717 23.0133 23.7259 23.0133C27.308 23.0133 30.1626 26.2532 30.1066 30.1693C30.1066 34.1136 27.28 37.3253 23.7259 37.3253ZM47.3178 37.3253C43.8196 37.3253 40.9371 34.1136 40.9371 30.1693C40.9371 26.225 43.7636 23.0133 47.3178 23.0133C50.9 23.0133 53.7545 26.2532 53.6986 30.1693C53.6986 34.1136 50.9 37.3253 47.3178 37.3253Z"
                    fill="white"
                  />
                </svg>
                <span>{t("hero.discord_btn")}</span>
              </button>

              {/* Luma Calendar CTA */}
              <a
                id="hero-luma-btn"
                href="https://luma.com/hackEthLima26"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-bold text-lg overflow-hidden transition-all hover:scale-105 shadow-xl border border-brand-accent/30"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(230,74,48,0.12) 0%, rgba(61,190,213,0.10) 100%)",
                  color: "inherit",
                  backdropFilter: "blur(12px)",
                }}
              >
                <Calendar className="w-5 h-5 text-brand-accent flex-shrink-0" />
                <span>{t("hero.luma_btn")}</span>
              </a>

              {/* Apply CTA */}
              {registrationsClosed ? (
                <button
                  id="hero-apply-btn"
                  disabled
                  aria-disabled="true"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-bold text-lg cursor-not-allowed opacity-70"
                  style={{
                    background: "#6b7280",
                    color: "#fff",
                    boxShadow: "none",
                  }}
                >
                  <svg
                    className="w-5 h-5 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                  <span>{t("hero.apply_btn")}</span>
                </button>
              ) : (
                <a
                  id="hero-apply-btn"
                  href="https://platform.ethlima.org/apply"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-bold text-lg overflow-hidden transition-all hover:scale-105 shadow-xl"
                  style={{
                    background: "linear-gradient(135deg, #EA5B3D 0%, #3DBED5 100%)",
                    color: "#fff",
                    boxShadow: "0 4px 28px rgba(234,91,61,0.4)",
                  }}
                >
                  <svg
                    className="w-5 h-5 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                  <span>{t("hero.apply_btn")}</span>
                </a>
              )}
            </div>

            {/* Luma subtle note */}
            <p className="text-fg/40 text-xs font-mono tracking-wider">{t("hero.luma_note")}</p>
          </motion.div>

          {/* Premium Glassmorphic Terminal Window */}
          <div className="max-w-3xl mx-auto my-12 text-left glass-card overflow-hidden shadow-xl border-brand-accent/10">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-surface/40">
              <div className="w-3 h-3 rounded-full bg-coral opacity-80"></div>
              <div className="w-3 h-3 rounded-full bg-orange opacity-80"></div>
              <div className="w-3 h-3 rounded-full bg-teal opacity-80"></div>
              <div className="ml-2 flex items-center text-fg/50 text-xs font-mono">
                <Terminal className="w-3 h-3 mr-1" /> {t("hero.terminal_title")}
              </div>
            </div>
            <div className="p-6 font-mono text-sm md:text-base text-brand-accent whitespace-pre-wrap min-h-[160px]">
              {terminalText}
              <span className="animate-pulse text-fg">_</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
