"use client";

import React, { useState } from "react";

import { useTranslation } from "@/components/providers/language-provider";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Logo } from "@/components/ui/logo";
import Link from "next/link";
import Image from "next/image";
import { Trophy, ArrowLeft, Calendar, ExternalLink, Medal, Users, Code, MonitorSmartphone, X, Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Edition2025Page() {
  const { t } = useTranslation();
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const tracks = [
    {
      id: "starknet-1",
      name: t("edition2025.winners_data.starknet.name"),
      winner: t("edition2025.winners_data.starknet.first.name"),
      desc: t("edition2025.winners_data.starknet.first.desc"),
      color: "from-blue-500 to-cyan-400",
      position: "1st",
      link: "https://taikai.network/en/ethereum-lima/hackathons/hackathon-eth-lima-2025",
    },
    {
      id: "starknet-2",
      name: t("edition2025.winners_data.starknet.name"),
      winner: t("edition2025.winners_data.starknet.second.name"),
      desc: t("edition2025.winners_data.starknet.second.desc"),
      color: "from-blue-400 to-cyan-300",
      position: "2nd",
      link: "https://taikai.network/en/ethereum-lima/hackathons/hackathon-eth-lima-2025",
    },
    {
      id: "scroll-1",
      name: t("edition2025.winners_data.scroll.name"),
      winner: t("edition2025.winners_data.scroll.first.name"),
      desc: t("edition2025.winners_data.scroll.first.desc"),
      color: "from-amber-400 to-orange-500",
      position: "1st",
      link: "https://taikai.network/en/ethereum-lima/hackathons/hackathon-eth-lima-2025",
    },
    {
      id: "scroll-2",
      name: t("edition2025.winners_data.scroll.name"),
      winner: t("edition2025.winners_data.scroll.second.name"),
      desc: t("edition2025.winners_data.scroll.second.desc"),
      color: "from-amber-300 to-orange-400",
      position: "2nd",
      link: "https://taikai.network/en/ethereum-lima/hackathons/hackathon-eth-lima-2025",
    },
  ];

  const judges = [
    { name: "Toño Romero", role: t("edition2025.roles.jurado"), img: "/2025/judge/toño.webp" },
    { name: "Alan Espinoza", role: t("edition2025.roles.jurado"), img: "/2025/judge/alan-espinoza.webp" },
    { name: "Angel Espinoza", role: t("edition2025.roles.jurado"), img: "/2025/judge/angel-espinoza.webp" },
    { name: "Solene", role: t("edition2025.roles.jurado_virtual"), img: "/2025/judge/solene.webp" },
    { name: "Stella Achenbach", role: t("edition2025.roles.jurado_virtual"), img: "/2025/judge/stella.webp" },
    { name: "Arturo Mena", role: t("edition2025.roles.jurado_tecnico"), img: "/2025/judge/arturo.webp" },
    { name: "Javier Arteaga", role: t("edition2025.roles.jurado_tecnico"), img: "/2025/judge/javier.webp" },
  ];

  return (
    <div className="min-h-screen bg-bg text-fg selection:bg-coral/30 overflow-x-hidden font-sans transition-colors duration-300">
      <nav className="sticky top-0 w-full z-50 border-b border-border bg-surface/75 backdrop-blur-xl transition-all duration-300">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Logo alt="ETH Lima Logo" className="h-8 sm:h-10 w-auto object-contain cursor-pointer" />
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>

        {/* Secondary Navigation (TOC) */}
        <div className="w-full border-t border-border/50 bg-surface/90 backdrop-blur-md hidden md:block">
          <div className="container mx-auto px-6 h-12 flex items-center justify-center gap-8 text-sm font-medium">
            <a href="#recap" className="text-fg/60 hover:text-brand-accent transition-colors">{t("edition2025.nav.recap")}</a>
            <a href="#winners" className="text-fg/60 hover:text-brand-accent transition-colors">{t("edition2025.nav.winners")}</a>
            <a href="#judges" className="text-fg/60 hover:text-brand-accent transition-colors">{t("edition2025.nav.judges")}</a>
            <a href="#organizers" className="text-fg/60 hover:text-brand-accent transition-colors">{t("edition2025.nav.organizers")}</a>
            <a href="#gallery" className="text-fg/60 hover:text-brand-accent transition-colors">{t("edition2025.nav.gallery")}</a>
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

        {/* Recap Video Section */}
        <motion.div
          id="recap"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.15 }}
          className="mt-20 max-w-4xl mx-auto scroll-mt-24"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Recap Oficial</h2>
            <p className="text-fg/60">Revive la experiencia de la Hackathon ETH Lima 2025</p>
          </div>

          <div className="relative aspect-video rounded-2xl overflow-hidden border border-border shadow-2xl bg-surface/50 group">
            {!isVideoPlaying ? (
              <div
                className="absolute inset-0 cursor-pointer"
                onClick={() => setIsVideoPlaying(true)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://img.youtube.com/vi/f28SB4dbVq0/maxresdefault.jpg"
                  alt="ETH Lima 2025 Recap Video Thumbnail"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-colors duration-500">
                  <motion.div 
                    animate={{ boxShadow: ["0px 0px 0px 0px rgba(0,240,255,0.7)", "0px 0px 0px 20px rgba(0,240,255,0)"] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-20 h-20 bg-brand-accent rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-[0_0_30px_rgba(0,240,255,0.4)]"
                  >
                    <Play className="w-8 h-8 text-black ml-1 fill-black" />
                  </motion.div>
                </div>
              </div>
            ) : (
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/f28SB4dbVq0?autoplay=1"
                title="ETH Lima 2025 Recap"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0"
              ></iframe>
            )}
          </div>
        </motion.div>

        {/* Winners Section */}
        <motion.div
          id="winners"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.2 }}
          className="mt-20 scroll-mt-24"
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
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: 0.1 * idx }}
                className="group relative bg-surface border border-border rounded-2xl p-6 overflow-hidden hover:border-brand-accent/50 transition-colors shadow-sm flex flex-col"
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

                  <a href={track.link} target="_blank" rel="noreferrer" className="mt-auto inline-flex items-center justify-center gap-2 w-full py-3 bg-surface border border-border rounded-xl font-medium text-sm hover:bg-brand-accent hover:text-bg hover:border-brand-accent transition-all z-20 relative">
                    Ver Proyecto <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Judges Section */}
        <motion.div
          id="judges"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.25 }}
          className="mt-32 border-t border-border pt-20 scroll-mt-24"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t("edition2025.judges_title") || "Jurados"}</h2>
            <p className="text-fg/60">{t("edition2025.judges_desc") || "Conoce a los expertos que evaluaron los proyectos."}</p>
          </div>

          <div className="flex flex-col items-center gap-10 w-full max-w-5xl mx-auto">
            {/* First row: 4 judges */}
            <div className="flex flex-wrap justify-center gap-10">
              {judges.slice(0, 4).map((judge, idx) => (
                <motion.div
                  key={judge.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: 0.1 * idx }}
                  className="flex flex-col items-center gap-4 group w-36"
                >
                  <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-border group-hover:border-brand-accent/60 transition-colors shadow-lg">
                    <Image
                      src={judge.img}
                      alt={judge.name}
                      fill
                      sizes="128px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-lg leading-tight">{judge.name}</p>
                    <p className="text-sm text-brand-accent font-medium mt-1">{judge.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Second row: 3 judges */}
            <div className="flex flex-wrap justify-center gap-10">
              {judges.slice(4).map((judge, idx) => (
                <motion.div
                  key={judge.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: 0.1 * (idx + 4) }}
                  className="flex flex-col items-center gap-4 group w-36"
                >
                  <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-border group-hover:border-brand-accent/60 transition-colors shadow-lg">
                    <Image
                      src={judge.img}
                      alt={judge.name}
                      fill
                      sizes="128px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-lg leading-tight">{judge.name}</p>
                    <p className="text-sm text-brand-accent font-medium mt-1">{judge.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Organizers Section */}
        <motion.div
          id="organizers"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.3 }}
          className="mt-32 border-t border-border pt-20 scroll-mt-24"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t("edition2025.organizers_title")}</h2>
            <p className="text-fg/60">{t("edition2025.organizers_desc")}</p>
          </div>

          <div className="flex flex-wrap justify-center gap-10">
            {[
              { name: "Javier Arteaga", role: t("edition2025.organizers_lead"), img: "/2025/organizer/javier.webp" },
              { name: "Criss Valladares", role: t("edition2025.organizers_member"), img: "/2025/organizer/criss-valladares.webp" },
              { name: "Yamille Celis", role: t("edition2025.organizers_member"), img: "/2025/organizer/yami.webp" },
            ].map((org, idx) => (
              <motion.div
                key={org.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: 0.1 * idx }}
                className="flex flex-col items-center gap-4 group"
              >
                <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-border group-hover:border-brand-accent/60 transition-colors shadow-lg">
                  <Image
                    src={org.img}
                    alt={org.name}
                    fill
                    sizes="128px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="text-center">
                  <p className="font-bold text-lg">{org.name}</p>
                  <p className="text-sm text-brand-accent font-medium">{org.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Photo Gallery Section */}
        <motion.div
          id="gallery"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.4 }}
          className="mt-32 border-t border-border pt-20 scroll-mt-24"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t("edition2025.gallery_title")}</h2>
            <p className="text-fg/60">{t("edition2025.gallery_desc")}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
              <div 
                key={i} 
                className="aspect-[4/3] bg-surface border border-border rounded-xl overflow-hidden flex items-center justify-center group relative cursor-pointer"
                onClick={() => setSelectedImage(i)}
              >
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

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedImage !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-xl p-4 sm:p-6 cursor-pointer"
            >
              <button
                onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10"
              >
                <X className="w-6 h-6" />
              </button>
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative w-full max-w-5xl aspect-[4/3] md:aspect-video rounded-2xl overflow-hidden shadow-2xl cursor-default"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={`/2025/fotos/foto${selectedImage}.webp`}
                  alt={`Hackathon ETH Lima 2025 Foto ${selectedImage}`}
                  fill
                  className="object-contain"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </main>
    </div>
  );
}
