"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "@/components/ui/logo";

const statuses = [
  "INITIALIZING ETH LIMA NODE...",
  "ESTABLISHING PEER CONNECTIONS...",
  "SYNCING SMART CONTRACT STATE...",
  "GENERATING CRYPTOGRAPHIC PROOFS...",
  "ACCESS GRANTED. ENJOY HACKETHL26!",
];

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Mobile/tablet fast bypass
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      onComplete();
      return;
    }

    // Increment progress bar
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        // Random incremental value to feel organic
        const increment = Math.floor(Math.random() * 25) + 15;
        return Math.min(prev + increment, 100);
      });
    }, 25);

    // Rotate status messages
    const statusInterval = setInterval(() => {
      setStatusIndex((prev) => (prev < statuses.length - 1 ? prev + 1 : prev));
    }, 200);

    return () => {
      clearInterval(progressInterval);
      clearInterval(statusInterval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- run once on mount; onComplete/statuses are stable
  }, []);

  useEffect(() => {
    if (progress === 100) {
      const exitTimeout = setTimeout(() => {
        setIsExiting(true);
        const completeTimeout = setTimeout(() => {
          onComplete();
        }, 500); // Allow spectacular exit animation to finish
        return () => clearTimeout(completeTimeout);
      }, 200); // Pause briefly at 100%
      return () => clearTimeout(exitTimeout);
    }
  }, [progress, onComplete]);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-bg overflow-hidden select-none"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.1,
            filter: "blur(10px)",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          {/* Cyberpunk network particles */}
          <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#3dbed5_1px,transparent_1px)] [background-size:32px_32px] md:[background-size:48px_48px] animate-pulse" />

          {/* Glowing background circles simulating Web3 nodes / orbits */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
            <motion.div
              className="absolute w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] rounded-full border border-teal/20"
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute w-[450px] h-[450px] sm:w-[700px] sm:h-[700px] rounded-full border border-dashed border-coral/15"
              animate={{ rotate: -360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute w-[600px] h-[600px] sm:w-[900px] sm:h-[900px] rounded-full border border-orange/10"
              animate={{ rotate: 180 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            />

            {/* Glowing blur blobs */}
            <div className="absolute top-[20%] left-[20%] w-48 h-48 sm:w-96 sm:h-96 rounded-full bg-coral/10 blur-[80px] sm:blur-[150px] animate-pulse" />
            <div className="absolute bottom-[20%] right-[20%] w-48 h-48 sm:w-96 sm:h-96 rounded-full bg-teal/15 blur-[80px] sm:blur-[150px] animate-pulse" />
          </div>

          {/* Central Logo Container */}
          <div className="relative flex flex-col items-center justify-center p-4">
            {/* Spinning geometric structure surrounding logo (Ethereum shape inspired) */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <motion.div
                className="w-48 h-48 sm:w-72 sm:h-72 opacity-30"
                style={{
                  background: "radial-gradient(circle, rgba(61,190,213,0.15) 0%, transparent 70%)",
                }}
                animate={{
                  scale: [1, 1.15, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Pulsing Outer Rings */}
              <svg className="w-56 h-56 sm:w-80 sm:h-80 absolute" viewBox="0 0 100 100">
                <motion.circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="url(#eth-grad)"
                  strokeWidth="0.5"
                  strokeDasharray="6 3 9 5"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="url(#eth-grad2)"
                  strokeWidth="0.3"
                  strokeDasharray="15 10"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                />

                <defs>
                  <linearGradient id="eth-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#e64a30" />
                    <stop offset="50%" stopColor="#f18a2e" />
                    <stop offset="100%" stopColor="#3dbed5" />
                  </linearGradient>
                  <linearGradient id="eth-grad2" x1="100%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#3dbed5" />
                    <stop offset="100%" stopColor="#2ca89f" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Logo Wrapper with Spectacular Scale & Rotation */}
            <motion.div
              initial={{ scale: 0.1, opacity: 0, rotate: -45 }}
              animate={{
                scale: [0.1, 1.15, 1],
                opacity: 1,
                rotate: 0,
              }}
              transition={{
                duration: 1.8,
                ease: [0.34, 1.56, 0.64, 1], // Spring effect
              }}
              className="relative w-32 h-32 sm:w-48 sm:h-48 flex items-center justify-center z-10"
            >
              <motion.div
                className="w-full h-full relative z-10"
                animate={{ y: [-8, 8, -8] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <Logo alt="Ethereum Lima Logo" className="w-full h-full object-contain" />
              </motion.div>

              {/* Spectacular Shine Effect Swipe */}
              <div className="absolute inset-0 w-full h-full overflow-hidden rounded-full pointer-events-none z-20">
                <motion.div
                  className="absolute w-[200%] h-full bg-gradient-to-r from-transparent via-white/50 to-transparent -skew-x-12 top-0"
                  animate={{
                    left: ["-150%", "150%"],
                  }}
                  transition={{
                    duration: 2.2,
                    repeat: Infinity,
                    repeatDelay: 1,
                    ease: "easeInOut",
                  }}
                />
              </div>
            </motion.div>
          </div>

          {/* Loading Progress & Metadata */}
          <div className="absolute bottom-[10%] left-0 right-0 flex flex-col items-center justify-center px-6 text-center max-w-md mx-auto z-10">
            {/* Elegant glowing Ethereum network status */}
            <motion.div
              key={statusIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="text-xs sm:text-sm font-mono tracking-[0.2em] font-semibold text-fg/80 mb-4 h-6 uppercase"
              style={{
                textShadow: "0 0 10px rgba(61,190,213,0.3)",
              }}
            >
              {statuses[statusIndex]}
            </motion.div>

            {/* Premium Sleek Progress Bar */}
            <div className="w-full h-[3px] bg-white/10 rounded-full overflow-hidden mb-3 relative">
              <motion.div
                className="h-full bg-gradient-to-r from-coral via-orange to-cyan rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ ease: "easeOut" }}
              />
              {/* Glowing leading dot on progress bar */}
              {progress > 0 && progress < 100 && (
                <div
                  className="absolute top-0 w-4 h-full bg-cyan blur-sm"
                  style={{ left: `calc(${progress}% - 8px)` }}
                />
              )}
            </div>

            {/* Percentage Display */}
            <div className="flex justify-between items-center w-full font-mono text-[10px] uppercase text-fg/40 tracking-widest font-bold">
              <span>HACKETHL26 MAINNET</span>
              <motion.span
                className="text-cyan font-bold"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                {progress}%
              </motion.span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
