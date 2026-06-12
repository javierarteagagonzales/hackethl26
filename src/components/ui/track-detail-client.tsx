"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "@/components/providers/language-provider";
import { TrackSidebar } from "@/components/ui/track-sidebar";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { ExternalLink, ArrowLeft } from "lucide-react";

export function TrackDetailClient({ trackDetails }: { trackDetails: any }) {
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState<"formation" | "information">("information");

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-bg text-fg">
      {/* Sidebar */}
      <TrackSidebar activeSection={activeSection} onSectionChange={setActiveSection} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col w-full overflow-x-hidden relative">
        {/* Top Navbar */}
        <nav className="sticky top-0 w-full z-50 border-b border-border bg-surface/75 backdrop-blur-xl">
          <div className="container mx-auto px-6 h-16 flex items-center justify-between">
            <div className="flex items-center">
              <Link href="/" className="group flex items-center gap-2 text-fg/70 hover:text-fg transition-colors">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span className="font-mono text-sm tracking-wider font-bold">{t("track.back")}</span>
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
          </div>
        </nav>

        <div className="flex-1 overflow-y-auto">
          {/* Hero Banner Area */}
          <div className="w-full relative h-[40vh] min-h-[300px] overflow-hidden">
            <Image
              src={trackDetails.heroImage}
              alt={trackDetails.title}
              fill
              className="object-cover object-center"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/60 to-transparent"></div>
            
            {/* Banner Text overlay */}
            <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 flex flex-col justify-end container mx-auto">
              <h1 className="text-5xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#e5ff00] to-[#ffd700] tracking-tighter uppercase drop-shadow-lg" style={{ WebkitTextStroke: '2px #000' }}>
                BUILD
              </h1>
              <div className="mt-2 inline-flex">
                <span className="bg-[#00f0ff] text-black font-bold uppercase tracking-widest px-4 py-2 text-sm md:text-lg rounded-sm shadow-md">
                  Hackathon
                </span>
              </div>
            </div>
          </div>

          {/* Main Content Details */}
          <main className="container mx-auto px-6 py-12 max-w-5xl">
            <div className="max-w-4xl mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{trackDetails.title}</h2>
              <p className="text-fg/70 text-lg leading-relaxed">{trackDetails.description}</p>
            </div>

            {/* Dynamic Content Based on Sidebar Selection */}
            {activeSection === "formation" && trackDetails.formation ? (
              <div className="mt-12 bg-surface/30 p-8 md:p-12 border border-border/50 rounded-xl">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  {t("track.sidebar.formation")}
                </h3>
                <p className="text-fg/80 text-lg leading-relaxed mb-8">
                  {trackDetails.formation.description}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {trackDetails.formation.links.map((link: any, i: number) => (
                    <a 
                      key={i} 
                      href={link.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between p-4 bg-surface hover:bg-surface/80 border border-border/50 hover:border-border transition-all rounded-lg"
                    >
                      <span className="font-semibold">{link.title}</span>
                      <ExternalLink className="w-4 h-4 text-fg/50 group-hover:text-fg transition-colors" />
                    </a>
                  ))}
                </div>
              </div>
            ) : activeSection === "formation" && !trackDetails.formation ? (
              <div className="mt-12 p-12 border border-dashed border-border/50 rounded-xl flex items-center justify-center text-fg/40 font-mono text-sm">
                [ {t("track.sidebar.formation")} - Content Not Available ]
              </div>
            ) : (
              <div className="mt-12 p-12 border border-dashed border-border/50 rounded-xl flex items-center justify-center text-fg/40 font-mono text-sm">
                [ {t("track.sidebar.information")} - Coming Soon ]
              </div>
            )}

          </main>
        </div>
      </div>
    </div>
  );
}
