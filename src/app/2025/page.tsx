"use client";

import { useTranslation } from "@/components/providers/language-provider";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { LOGO_SRC } from "@/lib/asset-path";
import Link from "next/link";
import Image from "next/image";
import { Trophy, ArrowLeft, Calendar, ExternalLink, Medal, Users, Code, MonitorSmartphone } from "lucide-react";
import { motion } from "framer-motion";

export default function Edition2025Page() {
  const { t } = useTranslation();

  const tracks = [
    {
      id: "starknet-1",
      name: t("edition2025.winners_data.starknet.name"),
      winner: t("edition2025.winners_data.starknet.first.name"),
      desc: t("edition2025.winners_data.starknet.first.desc"),
      color: "from-blue-500 to-cyan-400",
      position: "1st",
    },
    {
      id: "starknet-2",
      name: t("edition2025.winners_data.starknet.name"),
      winner: t("edition2025.winners_data.starknet.second.name"),
      desc: t("edition2025.winners_data.starknet.second.desc"),
      color: "from-blue-400 to-cyan-300",
      position: "2nd",
    },
    {
      id: "scroll-1",
      name: t("edition2025.winners_data.scroll.name"),
      winner: t("edition2025.winners_data.scroll.first.name"),
      desc: t("edition2025.winners_data.scroll.first.desc"),
      color: "from-amber-400 to-orange-500",
      position: "1st",
    },
    {
      id: "scroll-2",
      name: t("edition2025.winners_data.scroll.name"),
      winner: t("edition2025.winners_data.scroll.second.name"),
      desc: t("edition2025.winners_data.scroll.second.desc"),
      color: "from-amber-300 to-orange-400",
      position: "2nd",
    },
  ];

  return (
    <div className="min-h-screen bg-bg text-fg selection:bg-coral/30 overflow-x-hidden font-sans transition-colors duration-300">
      {/* Navigation */}
      <nav className="sticky top-0 w-full z-50 border-b border-border bg-surface/75 backdrop-blur-xl transition-all duration-300">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/">
              <img src={LOGO_SRC} alt="ETH Lima Logo" className="h-8 sm:h-10 w-auto object-contain cursor-pointer" />
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-6 py-20">
        <div className="mb-12">
          <Link href="/" className="inline-flex items-center text-fg/60 hover:text-brand-accent transition-colors mb-6 text-sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              {t("edition2025.title")}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-purple-500">
                {t("edition2025.accent")}
              </span>
            </h1>
            <p className="text-xl text-fg/70 mb-12">
              {t("edition2025.description")}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-surface/50 border border-border rounded-2xl p-6 text-center shadow-sm">
                <Code className="w-8 h-8 text-brand-accent mx-auto mb-3" />
                <p className="text-3xl font-black mb-1">{t("edition2025.stats.projects")}</p>
              </div>
              <div className="bg-surface/50 border border-border rounded-2xl p-6 text-center shadow-sm">
                <Users className="w-8 h-8 text-brand-accent mx-auto mb-3" />
                <p className="text-3xl font-black mb-1">{t("edition2025.stats.attendees")}</p>
              </div>
              <div className="bg-surface/50 border border-border rounded-2xl p-6 text-center shadow-sm">
                <MonitorSmartphone className="w-8 h-8 text-brand-accent mx-auto mb-3" />
                <p className="text-3xl font-black mb-1">{t("edition2025.stats.format")}</p>
              </div>
            </div>

            {/* Dates */}
            <div className="bg-surface border border-border rounded-2xl p-6 md:p-8 text-left mb-12 shadow-lg">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Calendar className="w-6 h-6 text-brand-accent" />
                {t("edition2025.dates.title")}
              </h3>
              <ul className="space-y-3 text-fg/80">
                <li className="flex items-start gap-2"><span className="text-brand-accent">•</span> {t("edition2025.dates.reg")}</li>
                <li className="flex items-start gap-2"><span className="text-brand-accent">•</span> {t("edition2025.dates.hack")}</li>
                <li className="flex items-start gap-2"><span className="text-brand-accent">•</span> {t("edition2025.dates.pitch")}</li>
                <li className="flex items-start gap-2"><span className="text-brand-accent">•</span> {t("edition2025.dates.eval")}</li>
                <li className="flex items-start gap-2"><span className="text-brand-accent">•</span> {t("edition2025.dates.winners")}</li>
              </ul>
            </div>

            {/* Sponsors */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold mb-6 text-center text-fg/60 uppercase tracking-widest text-sm">
                {t("edition2025.sponsors_title")}
              </h3>
              <div className="flex flex-wrap justify-center items-center gap-12 opacity-80 hover:opacity-100 transition-opacity">
                <img src="/2025/starknet.svg" alt="Starknet" className="h-12 md:h-16 object-contain" />
                <img src="/2025/Scroll.svg" alt="Scroll" className="h-12 md:h-16 object-contain grayscale invert dark:invert-0" />
              </div>
            </div>

          </motion.div>
        </div>

        {/* Winners Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-20"
        >
          <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-4">
            <h2 className="text-3xl font-bold">
              {t("edition2025.tracks")}
            </h2>
            <a href={t("edition2025.taikai_url")} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-brand-accent text-bg px-5 py-2.5 rounded-full font-semibold hover:bg-brand-accent/90 transition-colors">
              {t("edition2025.view_project")} <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {tracks.map((track, idx) => (
              <motion.div
                key={track.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * idx }}
                className="group relative bg-surface border border-border rounded-2xl p-6 overflow-hidden hover:border-brand-accent/50 transition-colors shadow-sm"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${track.color} opacity-10 blur-3xl rounded-full group-hover:opacity-20 transition-opacity`} />
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg bg-gradient-to-br ${track.color} text-white`}>
                        <Trophy className="w-5 h-5" />
                      </div>
                      <h3 className="text-xl font-bold">{track.name}</h3>
                    </div>
                    <div className="flex items-center gap-1 bg-surface border border-border px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-brand-accent">
                      <Medal className="w-3 h-3" /> {track.position}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-2xl font-black">{track.winner}</p>
                  </div>
                  
                  <p className="text-fg/70 text-sm leading-relaxed mb-6 flex-grow">
                    {track.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Photo Gallery Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-32 border-t border-border pt-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t("edition2025.gallery_title")}</h2>
            <p className="text-fg/60">{t("edition2025.gallery_desc")}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="aspect-[4/3] bg-surface border border-border rounded-xl overflow-hidden flex items-center justify-center group relative cursor-pointer">
                <Image 
                  src={`/2025/fotos/foto${i}.webp`} 
                  alt={`Hackathon ETH Lima 2025 Foto ${i}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            ))}
          </div>
        </motion.div>

      </main>
    </div>
  );
}
