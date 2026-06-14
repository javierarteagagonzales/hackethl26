"use client";

import React from "react";
import Link from "next/link";
import { BookOpen, FolderDot, LayoutDashboard, Target, Trophy, Clock } from "lucide-react";
import { useTranslation } from "@/components/providers/language-provider";
import { Logo } from "@/components/ui/logo";

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

export function TrackSidebar({ 
  config = defaultConfig,
  activeSection = "information",
  onSectionChange
}: { 
  config?: SidebarConfig,
  activeSection?: "formation" | "information",
  onSectionChange?: (section: "formation" | "information") => void
}) {
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
    
    // Determine if this section is selected based on state
    // We group track_details, prizes, and stages under "information"
    const isFormationItem = label === t("track.sidebar.formation");
    const isInformationItem = !isFormationItem;
    
    const isSelected = isFormationItem ? activeSection === "formation" : activeSection === "information";
    
    // Default active item for styling within the information section
    const isSubItemSelected = isInformationItem && label === t("track.sidebar.track_details") && isSelected;

    const btnClass = `flex items-center w-full gap-2 md:gap-3 px-3 py-2 text-left rounded-md transition-colors ${
      isFormationItem && isSelected || isSubItemSelected
        ? "bg-surface text-fg font-semibold border border-border shadow-sm" 
        : "text-fg/60 hover:text-fg hover:bg-surface/50"
    }`;

    if (onSectionChange) {
      return (
        <button 
          onClick={() => onSectionChange(isFormationItem ? "formation" : "information")}
          className={btnClass}
        >
          {icon}
          <span className="text-xs md:text-sm">{label}</span>
        </button>
      );
    }

    return (
      <Link href={href} className={btnClass}>
        {icon}
        <span className="text-xs md:text-sm">{label}</span>
      </Link>
    );
  };

  return (
    <aside className="w-full md:w-64 flex-shrink-0 flex flex-col border-b md:border-b-0 md:border-r border-border/50 bg-bg h-auto md:h-screen md:sticky md:top-0 md:overflow-y-auto py-4 md:py-6 px-4">
      {/* Logo */}
      <div className="mb-6 md:mb-10 px-2 flex justify-center md:justify-start">
        <Link href="/">
          <Logo alt="Open House" className="h-8 w-auto object-contain" />
        </Link>
      </div>

      <nav className="space-y-8">
        {/* Formation Section */}
        <div>
          <h4 className="text-[8px] md:text-[10px] font-mono uppercase tracking-widest text-fg/40 mb-3 px-3 flex items-center">
            {t("track.sidebar.formation")}
            <span className="flex-1 border-t border-border/50 ml-3 border-dashed"></span>
          </h4>
          <div className="space-y-1">
            {renderLink(!!activeConfig.formation, <BookOpen className="w-4 h-4" />, t("track.sidebar.formation"))}
          </div>
        </div>

        {/* Information Section */}
        <div>
          <h4 className="text-[8px] md:text-[10px] font-mono uppercase tracking-widest text-fg/40 mb-3 px-3 flex items-center">
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
