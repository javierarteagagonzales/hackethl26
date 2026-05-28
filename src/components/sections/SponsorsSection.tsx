"use client";

export function SponsorsSection({ t, isDark }: { t: (key: string) => string, isDark: boolean }) {
  return (
    <section id="sponsors" className="py-24 border-t border-border relative z-10 bg-surface/10">
      {/* Visual Blockchain Link Node to Tracks */}
      <div className="absolute top-0 left-6 md:left-12 lg:left-16 h-12 w-[1px] bg-gradient-to-b from-transparent to-cyan/40 hidden md:block"></div>
      <div className="container mx-auto px-6 text-center flex flex-col items-center">
        <div className="flex items-center gap-4 mb-4">
          <div className="hidden md:flex items-center justify-center w-10 h-10 rounded-full border border-cyan/20 bg-cyan/5 backdrop-blur-sm z-10 shrink-0">
            <div className="w-3 h-3 rounded-full bg-cyan animate-pulse" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight" style={{ letterSpacing: "-0.02em" }}>{t("sponsors.title")} <span className="text-gradient-sunset font-extrabold">{t("sponsors.accent")}</span></h2>
        </div>
        <p className="text-fg/60 text-lg mb-16 max-w-2xl mx-auto font-light">{t("sponsors.description")}</p>

        <div className="marquee-container py-6 flex">
          {[1, 2].map((idx) => (
            <div key={idx} className="marquee-content items-center">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex gap-20 items-center justify-around">
                  <div className="h-14 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300">
                    <img
                      src="/assets/sponsors/arbitrum-logo.svg"
                      alt="Arbitrum"
                      className={`h-12 md:h-16 w-auto object-contain filter transition-all ${isDark ? 'brightness-100' : 'brightness-75'}`}
                    />
                  </div>
                  <div className="h-14 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300">
                    <img
                      src="/assets/sponsors/logo-arkiv.png"
                      alt="Arkiv"
                      className={`h-8 md:h-10 w-auto object-contain filter transition-all ${isDark ? 'brightness-100' : 'brightness-75'}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
