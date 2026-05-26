"use client";

import { useEffect, useRef, useState } from "react";
import { CountUp } from "countup.js";

interface CountUpCardProps {
  end: number;
  start?: number;
  duration?: number;
  label: string;
  suffix?: string;
  prefix?: string;
  decimals?: number;
}

export function CountUpCard({
  end,
  start = 0,
  duration = 2,
  label,
  suffix = "",
  prefix = "",
  decimals = 0,
}: CountUpCardProps) {
  const countUpRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!countUpRef.current || hasAnimated) return;

    // Create IntersectionObserver to trigger on scroll into view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            // Trigger animation when element comes into view
            const countUp = new CountUp(countUpRef.current!, end, {
              startVal: start,
              duration,
              suffix,
              prefix,
              decimalPlaces: decimals,
              enableScrollSpy: false,
              separator: ",",
            });

            if (!countUp.error) {
              countUp.start();
              setHasAnimated(true);
            }

            // Stop observing after animation triggers
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: "50px",
      }
    );

    observer.observe(countUpRef.current);

    return () => {
      if (countUpRef.current) {
        observer.unobserve(countUpRef.current);
      }
    };
  }, [end, start, duration, suffix, prefix, decimals, hasAnimated]);

  return (
    <div className="text-center">
      <div
        ref={countUpRef}
        className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-brand-accent to-brand-accent/60 bg-clip-text text-transparent mb-2"
      >
        {start}
      </div>
      <p className="text-fg/70 text-sm md:text-base font-medium">{label}</p>
    </div>
  );
}
