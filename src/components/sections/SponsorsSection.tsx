"use client";

export function SponsorsSection({ t, isDark }: { t: (key: string) => string; isDark: boolean }) {
  return (
    <section id="sponsors" className="py-24 border-t border-border relative z-10 bg-surface/10">
      {/* Visual Blockchain Link Node to Tracks */}
      <div className="absolute top-0 left-6 md:left-12 lg:left-16 h-12 w-[1px] bg-gradient-to-b from-transparent to-cyan/40 hidden md:block"></div>
      <div className="container mx-auto px-6 text-center flex flex-col items-center">
        <div className="flex items-center gap-4 mb-12">
          <div className="hidden md:flex items-center justify-center w-10 h-10 rounded-full border border-cyan/20 bg-cyan/5 backdrop-blur-sm z-10 shrink-0">
            <div className="w-3 h-3 rounded-full bg-cyan animate-pulse" />
          </div>
          <h2
            className="text-3xl md:text-5xl font-bold tracking-tight"
            style={{ letterSpacing: "-0.02em" }}
          >
            {t("sponsors.title")}
          </h2>
        </div>

        <div className="flex justify-center items-center py-6">
          <div className="h-20 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300">
            {/* eslint-disable-next-line @next/next/no-img-element -- static local SVG, no remote optimization needed */}
            <img
              src="/assets/sponsors/arbitrum-logo.svg"
              alt="Arbitrum"
              className={`h-16 md:h-24 w-auto object-contain filter transition-all hover:scale-105 duration-300 ${isDark ? "brightness-100" : "brightness-75"}`}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
