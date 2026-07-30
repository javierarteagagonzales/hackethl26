/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "@/components/providers/language-provider";
import { TrackSidebar } from "@/components/ui/track-sidebar";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { MarkdownRenderer } from "@/components/ui/markdown-renderer";
import { ExternalLink, ArrowLeft, Globe } from "lucide-react";

// Simple SVG icon for X (Twitter)
function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

// Simple SVG icon for Discord
function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.03.056a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}

// Simple SVG icon for GitHub
function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

export function TrackDetailClient({ trackDetails }: { trackDetails: any }) {
  const { t, tArray } = useTranslation();
  const [activeSection, setActiveSection] = useState<
    "formation" | "information" | "bootcamp" | "prizes" | "stages" | "rules"
  >("information");

  const translatedDesc = t(`track_content.${trackDetails.id}.description`);
  const displayDesc =
    translatedDesc !== `track_content.${trackDetails.id}.description`
      ? translatedDesc
      : trackDetails.description;

  const translatedFormDesc = t(`track_content.${trackDetails.id}.formation.description`);
  const displayFormDesc =
    translatedFormDesc !== `track_content.${trackDetails.id}.formation.description`
      ? translatedFormDesc
      : trackDetails.formation?.description;

  const translatedLevels = tArray(`track_content.${trackDetails.id}.formation.levels`);
  const displayLevels =
    translatedLevels.length > 0 ? translatedLevels : trackDetails.formation?.levels;

  const translatedBootcampDesc = t(`track_content.${trackDetails.id}.bootcamp.description`);
  const displayBootcampDesc =
    translatedBootcampDesc !== `track_content.${trackDetails.id}.bootcamp.description`
      ? translatedBootcampDesc
      : "";

  const translatedBootcampModules = tArray(`track_content.${trackDetails.id}.bootcamp.modules`);

  const infoPath = `track_content.${trackDetails.id}.information`;
  const infoIntro = t(`${infoPath}.intro`);
  const infoCategoriesTitle = t(`${infoPath}.categories_title`);
  const infoCategories = tArray(`${infoPath}.categories`);
  const infoRequirementsTitle = t(`${infoPath}.requirements_title`);
  const infoRequirements = tArray(`${infoPath}.requirements`);
  const infoCriteriaTitle = t(`${infoPath}.criteria_title`);
  const infoCriteria = tArray(`${infoPath}.criteria`);
  const infoRulesTitle = t(`${infoPath}.rules_title`);
  const infoRules = t(`${infoPath}.rules`);

  const timelineItems = tArray("timeline.items");

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
              <Link
                href="/"
                className="group flex items-center gap-2 text-fg/70 hover:text-fg transition-colors"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span className="font-mono text-sm tracking-wider font-bold">
                  {t("track.back")}
                </span>
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
              <h1
                className="text-5xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#e5ff00] to-[#ffd700] tracking-tighter uppercase drop-shadow-lg"
                style={{ WebkitTextStroke: "2px #000" }}
              >
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
              <p className="text-fg/70 text-lg leading-relaxed mb-8">{displayDesc}</p>

              {/* Social links & website */}
              <div className="flex flex-wrap items-center gap-3">
                {trackDetails.website && (
                  <a
                    href={trackDetails.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-surface hover:bg-surface/60 hover:border-[#00f0ff]/60 transition-all text-sm font-medium"
                  >
                    <Globe className="w-4 h-4 text-[#00f0ff] shrink-0" />
                    <span className="text-fg/80 group-hover:text-fg transition-colors">
                      {trackDetails.website.replace(/https?:\/\//, "")}
                    </span>
                    <ExternalLink className="w-3 h-3 text-fg/30 group-hover:text-fg/60 transition-colors" />
                  </a>
                )}
                {trackDetails.socials?.x && (
                  <a
                    href={trackDetails.socials.x.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-surface hover:bg-surface/60 hover:border-white/40 transition-all text-sm font-medium"
                  >
                    <XIcon className="w-4 h-4 text-fg shrink-0" />
                    <span className="text-fg/70 group-hover:text-fg transition-colors font-mono">
                      {trackDetails.socials.x.handle}
                    </span>
                  </a>
                )}
                {trackDetails.socials?.discord && (
                  <a
                    href={trackDetails.socials.discord.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-surface hover:bg-surface/60 hover:border-[#5865F2]/60 transition-all text-sm font-medium"
                  >
                    <DiscordIcon className="w-4 h-4 text-[#5865F2] shrink-0" />
                    <span className="text-fg/70 group-hover:text-fg transition-colors">
                      {trackDetails.socials.discord.handle}
                    </span>
                  </a>
                )}
                {trackDetails.socials?.github && (
                  <a
                    href={trackDetails.socials.github.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-surface hover:bg-surface/60 hover:border-fg/40 transition-all text-sm font-medium"
                  >
                    <GithubIcon className="w-4 h-4 text-fg/80 shrink-0" />
                    <span className="text-fg/70 group-hover:text-fg transition-colors font-mono">
                      {trackDetails.socials.github.handle}
                    </span>
                  </a>
                )}
              </div>
            </div>

            {/* Dynamic Content Based on Sidebar Selection */}
            {activeSection === "formation" && trackDetails.formation ? (
              <div className="mt-12 bg-surface/30 p-8 md:p-12 border border-border/50 rounded-xl">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                  {t("track.sidebar.formation")}
                </h3>
                <p className="text-fg/70 text-base leading-relaxed mb-10">{displayFormDesc}</p>

                {displayLevels ? (
                  <div className="space-y-10">
                    {displayLevels.map((lvl: any, li: number) => (
                      <div key={li} className="relative pl-6 border-l-2 border-border/40">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-mono text-xs font-bold text-[#00f0ff] bg-[#00f0ff]/10 border border-[#00f0ff]/20 px-2 py-0.5 rounded-sm tracking-widest">
                            {lvl.badge}
                          </span>
                          <h4 className="text-lg font-bold text-fg">{lvl.level}</h4>
                        </div>
                        <p className="text-fg/60 text-sm mb-5 leading-relaxed">{lvl.goal}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                          {lvl.resources.map((res: any, ri: number) => (
                            <a
                              key={ri}
                              href={res.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group flex flex-col gap-2 p-4 bg-surface hover:bg-surface/70 border border-border/40 hover:border-[#00f0ff]/40 transition-all rounded-lg"
                            >
                              <div className="flex items-start justify-between gap-2">
                                <span className="font-semibold text-sm text-fg leading-snug">
                                  {res.title}
                                </span>
                                <ExternalLink className="w-3.5 h-3.5 text-fg/30 group-hover:text-[#00f0ff] transition-colors shrink-0 mt-0.5" />
                              </div>
                              <p className="text-fg/55 text-xs leading-relaxed">
                                {res.description}
                              </p>
                            </a>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
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
                )}
              </div>
            ) : activeSection === "bootcamp" ? (
              <div className="mt-12 bg-surface/30 p-8 md:p-12 border border-border/50 rounded-xl">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                  {t("track.sidebar.bootcamp")}
                </h3>
                {displayBootcampDesc && (
                  <p className="text-fg/70 text-base leading-relaxed mb-10">
                    {displayBootcampDesc}
                  </p>
                )}

                {translatedBootcampModules && translatedBootcampModules.length > 0 ? (
                  <div className="space-y-12">
                    {translatedBootcampModules.map((module: any, mi: number) => (
                      <div key={mi} className="relative">
                        <h4 className="text-xl font-bold text-fg mb-6 border-b border-border/40 pb-2">
                          {module.title}
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {module.videos.map((video: any, vi: number) => (
                            <a
                              key={vi}
                              href={`https://www.youtube.com/watch?v=${video.videoId}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group flex flex-col overflow-hidden bg-surface hover:bg-surface/80 border border-border/40 hover:border-[#00f0ff]/50 transition-all rounded-xl shadow-sm hover:shadow-md"
                            >
                              <div className="relative aspect-video w-full overflow-hidden bg-black">
                                <Image
                                  src={`https://img.youtube.com/vi/${video.videoId}/mqdefault.jpg`}
                                  alt={video.title}
                                  width={320}
                                  height={180}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                                />
                                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-transparent transition-colors">
                                  <div className="w-12 h-12 bg-black/70 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/10 group-hover:bg-[#00f0ff]/90 group-hover:border-[#00f0ff] transition-all">
                                    <svg
                                      className="w-5 h-5 text-white group-hover:text-black ml-1"
                                      fill="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path d="M8 5v14l11-7z" />
                                    </svg>
                                  </div>
                                </div>
                              </div>
                              <div className="p-4 flex items-start justify-between gap-3">
                                <h5 className="font-semibold text-sm text-fg leading-snug line-clamp-2">
                                  {video.title}
                                </h5>
                                <ExternalLink className="w-4 h-4 text-fg/30 group-hover:text-[#00f0ff] transition-colors shrink-0 mt-0.5" />
                              </div>
                            </a>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-12 border border-dashed border-border/50 rounded-xl flex items-center justify-center text-fg/40 font-mono text-sm">
                    [ Bootcamp Content Not Found ]
                  </div>
                )}
              </div>
            ) : activeSection === "information" && trackDetails.information ? (
              <div className="mt-12 bg-surface/30 p-8 md:p-12 border border-border/50 rounded-xl">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                  {t("track.sidebar.information")}
                </h3>
                {infoIntro && infoIntro !== `${infoPath}.intro` && (
                  <p className="text-fg/70 text-base leading-relaxed mb-10">{infoIntro}</p>
                )}

                <div className="space-y-12">
                  {/* Categories */}
                  {infoCategories && infoCategories.length > 0 && (
                    <div>
                      <h4 className="text-xl font-bold text-fg mb-6 border-b border-border/40 pb-2">
                        {infoCategoriesTitle}
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {infoCategories.map((cat: any, i: number) => (
                          <div
                            key={i}
                            className="p-4 bg-surface border border-border/40 rounded-lg"
                          >
                            <h5 className="font-bold text-sm text-[#00f0ff] mb-2">{cat.name}</h5>
                            <p className="text-fg/60 text-xs leading-relaxed">{cat.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Requirements */}
                  {infoRequirements && infoRequirements.length > 0 && (
                    <div>
                      <h4 className="text-xl font-bold text-fg mb-6 border-b border-border/40 pb-2">
                        {infoRequirementsTitle}
                      </h4>
                      <ul className="space-y-3">
                        {infoRequirements.map((req: string, i: number) => (
                          <li key={i} className="flex items-start gap-3 text-sm text-fg/70">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#00f0ff] flex-shrink-0" />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="grid grid-cols-1 gap-8">
                    {/* Criteria */}
                    {infoCriteria && infoCriteria.length > 0 && (
                      <div>
                        <h4 className="text-xl font-bold text-fg mb-6 border-b border-border/40 pb-2">
                          {infoCriteriaTitle}
                        </h4>
                        <ul className="space-y-3">
                          {infoCriteria.map((crit: string, i: number) => (
                            <li key={i} className="flex items-start gap-3 text-sm text-fg/70">
                              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#e5ff00] flex-shrink-0" />
                              {crit}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : activeSection === "prizes" ? (
              <div className="mt-12 bg-surface/30 p-8 md:p-12 border border-border/50 rounded-xl">
                <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                  {t("track.sidebar.prizes")}
                </h3>

                <div className="flex flex-col gap-6">
                  <div className="bg-gradient-to-r from-surface to-surface/40 p-8 rounded-xl border border-border/50 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                      <h4 className="text-sm font-mono text-fg/50 uppercase tracking-widest mb-1">
                        {t("tracks.prize_pool")}
                      </h4>
                      <div className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#e5ff00] to-[#ffd700]">
                        {trackDetails.totalPrizePool || t("tracks.tba")}
                      </div>
                    </div>
                  </div>

                  {trackDetails.prizes && trackDetails.prizes.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {trackDetails.prizes.map((prize: any, idx: number) => (
                        <div
                          key={idx}
                          className="group relative overflow-hidden bg-surface/50 hover:bg-surface border border-border/40 hover:border-[#00f0ff]/50 transition-all rounded-xl p-6 shadow-sm"
                        >
                          <div className="absolute top-0 left-0 w-1 h-full bg-[#00f0ff] opacity-50 group-hover:opacity-100 transition-opacity"></div>
                          <h5 className="font-bold text-lg text-fg mb-1">{prize.name}</h5>
                          <span className="text-2xl font-black text-brand-accent">
                            {prize.amount}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-12 border border-dashed border-border/50 rounded-xl flex items-center justify-center text-fg/40 font-mono text-sm">
                      [ {t("tracks.soon")} ]
                    </div>
                  )}
                </div>
              </div>
            ) : activeSection === "stages" ? (
              <div className="mt-12 bg-surface/30 p-8 md:p-12 border border-border/50 rounded-xl">
                <h3 className="text-2xl font-bold mb-10 flex items-center gap-3">
                  {t("track.sidebar.stages")}
                </h3>

                {timelineItems && timelineItems.length > 0 ? (
                  <div className="relative border-l-2 border-border/50 ml-4 md:ml-6 space-y-10">
                    {timelineItems.map((item: any, idx: number) => (
                      <div key={idx} className="relative pl-8 md:pl-12 group">
                        <div className="absolute w-4 h-4 rounded-full bg-brand-accent/20 border-2 border-brand-accent -left-[9px] top-1.5 group-hover:bg-brand-accent group-hover:shadow-[0_0_10px_rgba(var(--brand-accent),0.5)] transition-all"></div>

                        <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 mb-2">
                          <span className="text-brand-accent font-bold text-lg">{item.day}</span>
                          <span className="text-fg/50 font-mono text-sm">{item.time}</span>
                        </div>

                        <h4 className="text-xl font-bold text-fg mb-2">{item.title}</h4>
                        <p className="text-fg/70 leading-relaxed text-sm">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-12 border border-dashed border-border/50 rounded-xl flex items-center justify-center text-fg/40 font-mono text-sm">
                    [ Timeline Data Not Found ]
                  </div>
                )}
              </div>
            ) : activeSection === "rules" ? (
              <div className="mt-12 bg-surface/30 p-8 md:p-12 border border-border/50 rounded-xl">
                <h3 className="text-2xl font-bold mb-10 flex items-center gap-3">
                  {t("track.sidebar.rules")}
                </h3>

                {infoRules && infoRules.length > 0 ? (
                  <MarkdownRenderer content={infoRules} />
                ) : (
                  <div className="p-12 border border-dashed border-border/50 rounded-xl flex items-center justify-center text-fg/40 font-mono text-sm">
                    [ Rules Data Not Found ]
                  </div>
                )}
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
