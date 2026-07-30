"use client";

import { motion } from "framer-motion";
import { Trophy, Users, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export interface Track {
  id: string;
  title: string;
  sponsor: string;
  sponsorLogo: string | null;
  description: string;
  color: string;
  categories: string[];
  prizes: { name: string; amount: string }[];
  totalPrizePool: string;
}

export function TracksSection({
  t,
  tracks,
  isDark,
}: {
  t: (key: string) => string;
  tracks: Track[];
  isDark: boolean;
}) {
  const callsData = [
    {
      id: "mentor_judge",
      icon: Users,
      link: "https://tally.so/r/VLyg5J",
    },
  ];
  return (
    <section id="tracks" className="py-24 border-t border-border relative z-10">
      {/* Visual Blockchain Link Node to About */}
      <div className="absolute top-0 left-6 md:left-12 lg:left-16 h-12 w-[1px] bg-gradient-to-b from-transparent to-orange/40 hidden md:block"></div>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 flex flex-col items-center">
          <div className="flex items-center gap-4 mb-4">
            <div className="hidden md:flex items-center justify-center w-10 h-10 rounded-full border border-orange/20 bg-orange/5 backdrop-blur-sm z-10 shrink-0">
              <div className="w-3 h-3 rounded-full bg-orange animate-pulse" />
            </div>
            <h2
              className="text-3xl md:text-5xl font-bold tracking-tight"
              style={{ letterSpacing: "-0.02em" }}
            >
              {t("tracks.title")}{" "}
              <span className="text-gradient-sunset font-extrabold">{t("tracks.accent")}</span>
            </h2>
          </div>
          <p className="text-fg/70 text-lg max-w-2xl mx-auto font-light">
            {t("tracks.description")}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {tracks.map((track, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group w-full sm:w-[calc(50%-12px)] lg:w-[440px] max-w-lg"
            >
              <Link
                href={`/tracks/${track.title.toLowerCase().split(" ")[0]}-track`}
                className="glass-card h-full overflow-hidden flex flex-col hover:border-brand-accent/30 shadow-md block transition-all hover:-translate-y-1"
              >
                <div className={`h-1.5 w-full bg-gradient-to-r ${track.color}`}></div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start gap-4 mb-4">
                    <h3 className="text-2xl font-bold tracking-tight text-fg">{track.title}</h3>
                    {track.sponsorLogo ? (
                      <img
                        src={track.sponsorLogo}
                        alt={track.sponsor}
                        className={`h-6 w-auto object-contain transition-all duration-300 ${isDark ? "brightness-0 invert opacity-60 group-hover:opacity-100" : "opacity-80 group-hover:opacity-100"}`}
                      />
                    ) : (
                      <span className="bg-fg/5 text-fg/80 border border-border px-2 py-0.5 rounded font-mono text-xs">
                        {track.sponsor}
                      </span>
                    )}
                  </div>
                  <p className="text-fg/70 text-sm mb-6 line-clamp-3 leading-relaxed font-light">
                    {track.description}
                  </p>

                  <div className="space-y-6 mt-auto">
                    <div>
                      {track.title.toLowerCase().includes("arbitrum") ? (
                        <div className="flex items-center gap-3 bg-brand-accent/10 border border-brand-accent/25 rounded-xl px-4 py-3">
                          <Trophy className="w-5 h-5 text-brand-accent shrink-0" />
                          <span className="text-sm font-bold text-fg">
                            Pozo de premios: <span className="text-brand-accent">+2000$</span>
                          </span>
                        </div>
                      ) : (
                        <>
                          <h4 className="text-xs font-mono text-fg/40 uppercase tracking-widest mb-3">
                            {t("tracks.categories")}
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {track.categories.map((cat: string, j: number) => (
                              <Badge
                                key={j}
                                className="bg-brand-accent/10 text-fg hover:bg-brand-accent/25 border border-brand-accent/20 transition-all font-mono text-xs py-0.5"
                              >
                                {cat}
                              </Badge>
                            ))}
                          </div>
                        </>
                      )}
                    </div>

                    {!track.title.toLowerCase().includes("arbitrum") && (
                      <div>
                        <h4 className="text-xs font-mono text-fg/40 uppercase tracking-widest mb-3 flex items-center gap-2">
                          <Trophy className="w-3 h-3 text-brand-accent" /> {t("tracks.prizes")}
                        </h4>
                        {track.prizes && track.prizes.length > 0 ? (
                          <div className="space-y-2">
                            {track.prizes.map((prize, pIdx) => (
                              <div
                                key={pIdx}
                                className="flex items-center justify-between bg-surface/30 px-3 py-2 rounded border border-border/50"
                              >
                                <span className="text-sm font-medium text-fg/80">{prize.name}</span>
                                <span className="text-sm font-bold text-brand-accent">
                                  {prize.amount}
                                </span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="flex justify-center items-center bg-surface/50 px-3 py-6 rounded-lg border border-border border-dashed">
                            <span className="text-fg/60 font-mono font-medium tracking-wider text-sm animate-pulse">
                              {t("tracks.soon")}
                            </span>
                          </div>
                        )}
                      </div>
                    )}

                    {!track.title.toLowerCase().includes("arbitrum") && (
                      <div className="pt-4 border-t border-border flex items-center justify-between mt-auto">
                        <span className="text-xs font-mono text-fg/40 uppercase tracking-widest">
                          {t("tracks.prize_pool")}
                        </span>
                        <span className="text-xl font-extrabold text-fg">
                          {track.totalPrizePool && track.totalPrizePool !== "TBA"
                            ? track.totalPrizePool
                            : t("tracks.tba")}
                        </span>
                      </div>
                    )}

                    <div className="pt-4 flex justify-end">
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold font-mono uppercase tracking-wider text-brand-accent bg-brand-accent/10 border border-brand-accent/25 px-3 py-1.5 rounded-full group-hover:bg-brand-accent/20 transition-colors">
                        {t("tracks.view_more")} →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Convocatorias */}
        <div className="mt-16 mb-4 text-center">
          <h3 className="text-2xl font-bold tracking-tight text-fg">
            {t("calls.title")}{" "}
            <span className="text-gradient-sunset font-extrabold">{t("calls.accent")}</span>
          </h3>
          <p className="text-fg/70 text-lg max-w-2xl mx-auto mt-2 font-light">
            {t("calls.description")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {callsData.map((call, index) => {
            const Icon = call.icon;
            const isActive = call.link !== "#";
            return (
              <motion.div
                key={call.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="glass-card p-6 flex flex-col items-center text-center group relative"
              >
                {isActive && (
                  <div className="absolute top-0 right-0 w-24 h-24 bg-brand-accent/5 rounded-full blur-3xl -mr-8 -mt-8 group-hover:bg-brand-accent/10 transition-colors"></div>
                )}

                <div
                  className={`w-12 h-12 rounded-2xl bg-surface/80 border border-border flex items-center justify-center mb-4 shadow-sm ${isActive ? "group-hover:border-brand-accent/30 group-hover:scale-110 transition-all" : ""}`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? "text-brand-accent" : "text-fg/60"}`} />
                </div>

                <h4 className="text-lg font-bold mb-2 text-fg">{t(`calls.${call.id}.title`)}</h4>
                <p className="text-fg/70 mb-5 font-light flex-grow leading-relaxed text-sm">
                  {t(`calls.${call.id}.description`)}
                </p>

                <div
                  className={`mt-auto inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider font-semibold ${isActive ? "text-brand-accent group-hover:gap-2 transition-all" : "text-fg/40 cursor-not-allowed"}`}
                >
                  {t(`calls.${call.id}.cta`)} {isActive && <ArrowRight className="w-3 h-3" />}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
