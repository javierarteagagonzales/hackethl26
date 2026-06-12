"use client";

import React from "react";
import Image from "next/image";
import { useTranslation } from "@/components/providers/language-provider";
import { TrackSidebar } from "@/components/ui/track-sidebar";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { LanguageSwitcher } from "@/components/ui/language-switcher";

export function TrackDetailClient({ trackDetails }: { trackDetails: any }) {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-bg text-fg">
      {/* Sidebar */}
      <TrackSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col w-full overflow-x-hidden relative">
        {/* Top Navbar */}
        <nav className="sticky top-0 w-full z-50 border-b border-border bg-surface/75 backdrop-blur-xl">
          <div className="container mx-auto px-6 h-16 flex items-center justify-between">
            <div className="flex items-center text-fg/70 transition-colors">
              <span className="font-mono text-sm tracking-wider font-bold">ETH Lima</span>
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

            {/* Body content cleared per user request. New info will be added later */}
            <div className="mt-12 p-12 border border-dashed border-border/50 rounded-xl flex items-center justify-center text-fg/40 font-mono text-sm">
              [ {t("track.sidebar.information")} - Coming Soon ]
            </div>

          </main>
        </div>
      </div>
    </div>
  );
}
