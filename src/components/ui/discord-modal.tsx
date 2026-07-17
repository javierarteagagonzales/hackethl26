/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface DiscordModalProps {
  open: boolean;
  onClose: () => void;
  t: (key: string) => string;
}

export function DiscordModal({ open, onClose, t }: DiscordModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={overlayRef}
          id="discord-modal-overlay"
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.target === overlayRef.current && onClose()}
          style={{ background: "rgba(10,6,25,0.78)", backdropFilter: "blur(6px)" }}
        >
          <motion.div
            id="discord-modal-card"
            initial={{ opacity: 0, scale: 0.93, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: 24 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-md rounded-2xl overflow-hidden shadow-2xl"
            style={{
              background: "linear-gradient(145deg, #14102a 60%, #1a1035 100%)",
              border: "1px solid rgba(255,255,255,0.09)",
            }}
          >
            {/* Close button */}
            <button
              id="discord-modal-close"
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-1.5 rounded-full text-white/40 hover:text-white hover:bg-white/10 transition-all"
              aria-label="Cerrar"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header strip */}
            <div
              className="flex flex-col items-center px-8 pt-8 pb-6 text-center"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
            >
              {/* Ethereum Lima logo */}
              <img
                src="https://raw.githubusercontent.com/ethlima/imgs/main/ethereum.png"
                alt="Ethereum Lima"
                width={64}
                height={64}
                className="mb-3"
                style={{ objectFit: "contain" }}
              />
              <div
                className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-3"
                style={{ background: "#c7f73a", color: "#0b0717" }}
              >
                {t("discord_modal.badge")}
              </div>
              <h2 className="text-xl font-extrabold text-white mb-1">{t("discord_modal.title")}</h2>
              <p className="text-sm text-white/50">{t("discord_modal.subtitle")}</p>
            </div>

            {/* Body */}
            <div className="px-8 py-6 text-sm leading-relaxed text-white/70 space-y-3">
              <p>{t("discord_modal.body1")}</p>
              <p className="font-semibold" style={{ color: "#c7f73a" }}>
                {t("discord_modal.body2")}
              </p>

              {/* Channel instruction */}
              <div
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/90 font-mono text-xs"
                style={{
                  background: "rgba(199,247,58,0.07)",
                  border: "1px solid rgba(199,247,58,0.2)",
                }}
              >
                <span className="text-lg">🚀</span>
                <div>
                  <span className="block font-bold text-[#c7f73a]">
                    {t("discord_modal.channel_label")}
                  </span>
                  <span className="text-white/60">{t("discord_modal.channel_name")}</span>
                </div>
              </div>

              <p className="text-white/50 text-xs">{t("discord_modal.instruction")}</p>
            </div>

            {/* CTA */}
            <div className="px-8 pb-8">
              <a
                id="discord-modal-cta"
                href="https://discord.gg/vBBebr5vE"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-center gap-3 w-full py-3.5 rounded-xl font-bold text-sm transition-all hover:scale-[1.02] shadow-lg"
                style={{
                  background: "#5865F2",
                  color: "#fff",
                  boxShadow: "0 4px 24px rgba(88,101,242,0.35)",
                }}
              >
                {/* Discord icon */}
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 71 55"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.44077 45.4204 0.52529C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.52529C25.5141 0.44359 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.0384 50.6035 51.2557 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978ZM23.7259 37.3253C20.2276 37.3253 17.3451 34.1136 17.3451 30.1693C17.3451 26.225 20.1717 23.0133 23.7259 23.0133C27.308 23.0133 30.1626 26.2532 30.1066 30.1693C30.1066 34.1136 27.28 37.3253 23.7259 37.3253ZM47.3178 37.3253C43.8196 37.3253 40.9371 34.1136 40.9371 30.1693C40.9371 26.225 43.7636 23.0133 47.3178 23.0133C50.9 23.0133 53.7545 26.2532 53.6986 30.1693C53.6986 34.1136 50.9 37.3253 47.3178 37.3253Z"
                    fill="white"
                  />
                </svg>
                {t("discord_modal.cta")}
              </a>

              {/* Logos strip */}
              <div className="flex items-center justify-center gap-6 mt-5 opacity-50">
                <img
                  src="https://raw.githubusercontent.com/ethlima/imgs/main/ethereum.png"
                  alt="Ethereum Lima"
                  width={36}
                  style={{ objectFit: "contain" }}
                />
                <img
                  src="/assets/sponsors/arbitrum-logo.svg"
                  alt="Arbitrum"
                  width={90}
                  style={{ objectFit: "contain", filter: "brightness(0) invert(1)" }}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
