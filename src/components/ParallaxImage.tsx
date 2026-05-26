"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface ParallaxImageProps {
  src: string;
  alt: string;
  intensity?: number;
  className?: string;
  objectPosition?: string;
  children?: React.ReactNode;
}

export function ParallaxImage({
  src,
  alt,
  intensity = 0.5,
  className = "",
  objectPosition = "center",
  children,
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Throttle scroll events for performance
    let ticking = false;
    let lastScrollY = 0;

    const handleScroll = () => {
      lastScrollY = window.scrollY;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const container = containerRef.current;
          if (container) {
            const rect = container.getBoundingClientRect();
            const elementScrolled = rect.top + window.scrollY;
            const parallaxOffset =
              (window.scrollY - elementScrolled) * intensity;
            setScrollY(parallaxOffset);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [intensity]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{ perspective: "1000px" } as React.CSSProperties}
    >
      <motion.div
        className="will-change-transform"
        style={{
          transform: `translateY(${scrollY}px)`,
        }}
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          style={{ objectPosition }}
          loading="lazy"
        />
      </motion.div>

      {/* Overlay content */}
      {children && (
        <div className="absolute inset-0 flex items-center justify-center">
          {children}
        </div>
      )}
    </div>
  );
}
