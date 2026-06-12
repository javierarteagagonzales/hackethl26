"use client";

import React from "react";
import Link from "next/link";
import { BookOpen, FolderDot, LayoutDashboard, Target, Trophy, Clock } from "lucide-react";
import { useTranslation } from "@/components/providers/language-provider";
import { LOGO_SRC } from "@/lib/asset-path";

// Features configuration array to enable/disable specific parts
export interface SidebarConfig {
  formation?: boolean;
  trackDetails?: boolean;
  prizes?: boolean;
  stages?: boolean;
}

const defaultConfig: SidebarConfig = {
  formation: true,
  trackDetails: true,
  prizes: true,
  stages: true,
};

export function TrackSidebar({ config = defaultConfig }: { config?: SidebarConfig }) {
  const { t } = useTranslation();
  const activeConfig = { ...defaultConfig, ...config };

  const renderLink = (active: boolean, icon: React.ReactNode, label: string, href: string = "#") => {
    if (!active) {
      return (
        <div className="flex items-center gap-3 px-3 py-2 rounded-md text-fg/30 cursor-not-allowed">
          {icon}
          <span className="text-sm font-medium">{label}</span>
        </div>
      );
    }
    
    // Hardcoding specific state to mimic selection
    const isSelected = label === t("track.sidebar.track_details");

    return (
      <Link 
        href={href} 
        className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
          isSelected 
            ? "bg-surface text-fg font-semibold border border-border shadow-sm" 
            : "text-fg/60 hover:text-fg hover:bg-surface/50"
        }`}
      >
        {icon}
        <span className="text-sm">{label}</span>
      </Link>
    );
  };

  return (
    <aside className="w-full md:w-64 flex-shrink-0 flex flex-col border-r border-border/50 bg-bg min-h-screen py-6 px-4">
      {/* Logo */}
      <div className="mb-10 px-2 flex justify-center md:justify-start">
        <Link href="/">
          <img src={LOGO_SRC} alt="Open House" className="h-8 w-auto object-contain" />
        </Link>
      </div>

      <nav className="space-y-8">
        {/* Formation Section */}
        <div>
          <h4 className="text-[10px] font-mono uppercase tracking-widest text-fg/40 mb-3 px-3 flex items-center">
            {t("track.sidebar.formation")}
            <span className="flex-1 border-t border-border/50 ml-3 border-dashed"></span>
          </h4>
          <div className="space-y-1">
            {renderLink(!!activeConfig.formation, <BookOpen className="w-4 h-4" />, t("track.sidebar.formation"))}
          </div>
        </div>

        {/* Information Section */}
        <div>
          <h4 className="text-[10px] font-mono uppercase tracking-widest text-fg/40 mb-3 px-3 flex items-center">
            {t("track.sidebar.information")}
            <span className="flex-1 border-t border-border/50 ml-3 border-dashed"></span>
          </h4>
          <div className="space-y-1">
            {renderLink(!!activeConfig.trackDetails, <LayoutDashboard className="w-4 h-4" />, t("track.sidebar.track_details"))}
            {renderLink(!!activeConfig.prizes, <Trophy className="w-4 h-4" />, t("track.sidebar.prizes"))}
            {renderLink(!!activeConfig.stages, <Clock className="w-4 h-4" />, t("track.sidebar.stages"))}
          </div>
        </div>
      </nav>
    </aside>
  );
}
