"use client";

import { useState, useEffect } from "react";
import {
  ArrowUp,
  Zap,
  Globe,
  GitBranch,
  MessageSquare,
  HelpCircle,
  Shield,
  FileText,
  Users,
  Calendar,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Logo } from "@/components/ui/logo";
import { MOCK_TRACKS } from "@/lib/mock-data";
import { getTracks } from "@/app/actions/tracks";
import type { Track } from "@/components/sections/TracksSection";
import { useTranslation } from "@/components/providers/language-provider";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { useTheme } from "next-themes";
import { InteractiveBackground } from "@/components/ui/interactive-background";
import { SidebarTimelineNavigator } from "@/components/ui/sidebar-timeline-navigator";

import { HeroSection } from "@/components/sections/HeroSection";
import { TracksSection } from "@/components/sections/TracksSection";
import { WorkshopsSection } from "@/components/sections/WorkshopsSection";
import { SponsorsSection } from "@/components/sections/SponsorsSection";
import { PartnersSection } from "@/components/sections/PartnersSection";
import { TimelineSection } from "@/components/sections/TimelineSection";
import { FAQSection } from "@/components/sections/FAQSection";

export default function Home() {
  const { t, tArray } = useTranslation();
  const { resolvedTheme } = useTheme();
  const [terminalText, setTerminalText] = useState("");
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [tracks, setTracks] = useState<Track[]>(MOCK_TRACKS);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- client-only init, runs once
    setIsMobile(window.innerWidth < 1024);
  }, []);

  const codeSnippet =
    "> npm run build --hackathon=EthLima2026\n\n> Initializing Web3 nodes...\n> Deploying smart contracts...\n> Building future...\n\n✔ ETH Lima Hackathon compiled successfully.\n> System Ready.";

  useEffect(() => {
    let i = 0;
    let erasing = false;
    let pauseTimeout: ReturnType<typeof setTimeout> | null = null;
    let terminalInterval: NodeJS.Timeout | null = null;

    const isDesktop = window.innerWidth >= 1024;

    if (isDesktop) {
      terminalInterval = setInterval(() => {
        if (!erasing) {
          setTerminalText(codeSnippet.slice(0, i));
          i++;
          if (i > codeSnippet.length) {
            erasing = true;
            pauseTimeout = setTimeout(() => {
              erasing = false;
              i = 0;
            }, 2000);
          }
        }
      }, 40);
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- client-only init, runs once
      setTerminalText(codeSnippet);
    }

    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    const fetchTracks = async () => {
      const result = await getTracks();
      if (result.success && result.tracks && result.tracks.length > 0) {
        interface RawPrize {
          name: string;
          amount: string;
        }
        interface RawCategory {
          name: string;
        }
        interface RawTrack {
          id: string;
          title: string;
          description: string;
          color: string | null;
          sponsor?: { name: string; logoUrl: string | null } | null;
          categories?: RawCategory[];
          prizes?: RawPrize[];
        }
        const formattedTracks = (result.tracks as RawTrack[])
          .filter(
            (tr) =>
              !tr.title?.toLowerCase().includes("arkiv") &&
              !tr.sponsor?.name?.toLowerCase().includes("arkiv")
          )
          .map((tr) => {
            const totalAmount =
              tr.prizes?.reduce(
                (acc: number, p: RawPrize) =>
                  acc + (parseFloat(p.amount.replace(/[^0-9.]/g, "")) || 0),
                0
              ) || 0;
            const isUSDC = tr.prizes?.some((p: RawPrize) => p.amount.includes("USDC"));

            return {
              id: tr.id,
              title: tr.title,
              sponsor: tr.sponsor?.name || "Independent",
              sponsorLogo: tr.sponsor?.logoUrl || null,
              description: tr.description,
              color: tr.color || "from-blue-500 to-cyan-400",
              categories: tr.categories?.map((c: RawCategory) => c.name) || [],
              prizes: tr.prizes?.map((p: RawPrize) => ({ name: p.name, amount: p.amount })) || [],
              totalPrizePool:
                totalAmount > 0 ? (isUSDC ? `${totalAmount} USDC` : `$${totalAmount}`) : "TBA",
            };
          });
        setTracks(formattedTracks);
      }
    };

    fetchTracks();
    window.addEventListener("scroll", handleScroll);

    return () => {
      if (terminalInterval) clearInterval(terminalInterval);
      if (pauseTimeout) clearTimeout(pauseTimeout);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [codeSnippet]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isDark = resolvedTheme === "dark";

  return (
    <div className="min-h-screen bg-bg text-fg selection:bg-coral/30 overflow-x-hidden font-sans transition-colors duration-300">
      {/* Premium Visual Overlays */}
      <div className="hidden lg:block fixed inset-0 z-0 pointer-events-none glow-hero opacity-30"></div>
      {!isMobile && <InteractiveBackground />}
      <SidebarTimelineNavigator />

      {/* Top Banner Bootcamp
      <div className="w-full bg-gradient-to-r from-teal via-cyan to-coral text-white py-1.5 sm:py-2 px-3 sm:px-4 text-center z-50 relative shadow-md">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-6">
          <span className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold">
            <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-300 flex-shrink-0" />
            <span>{t("banner.title")}</span>
          </span>
          <div className="flex items-center gap-2">
            <span className="font-mono bg-black/40 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs border border-white/20 tracking-widest hidden sm:inline-block min-w-[200px]">
              {isMounted ? `${t("banner.apply_until")}: ${timeLeft.days}d ${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s` : t("banner.loading")}
            </span>
            <a
              href="https://bootcamp.ethlima.org/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 bg-white text-indigo-700 hover:bg-yellow-300 hover:text-indigo-900 transition-colors font-bold rounded-full px-3 py-0.5 sm:px-4 sm:py-1 text-[10px] sm:text-xs shadow-md whitespace-nowrap"
            >
              {t("banner.register")} <ArrowRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
      */}

      {/* Navigation */}
      <nav className="sticky top-0 w-full z-50 border-b border-border bg-surface/75 backdrop-blur-xl transition-all duration-300">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo alt="ETH Lima Logo" className="h-8 sm:h-10 w-auto object-contain" />
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-fg/80">
            <Link
              href="#workshops"
              className="nav-link-premium text-fg/80 hover:text-fg font-mono uppercase tracking-wider text-xs transition-colors"
            >
              {t("nav.workshops")}
            </Link>
            <Link
              href="#tracks"
              className="nav-link-premium text-fg/80 hover:text-fg font-mono uppercase tracking-wider text-xs transition-colors"
            >
              {t("nav.tracks")}
            </Link>
            <Link
              href="#timeline"
              className="nav-link-premium text-fg/80 hover:text-fg font-mono uppercase tracking-wider text-xs transition-colors"
            >
              {t("nav.timeline")}
            </Link>
            <Link
              href="#sponsors"
              className="nav-link-premium text-fg/80 hover:text-fg font-mono uppercase tracking-wider text-xs transition-colors"
            >
              {t("nav.sponsors")}
            </Link>
            <a
              href="https://luma.com/modcxwyr"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link-premium text-brand-accent hover:text-brand-accent/80 font-mono uppercase tracking-wider text-xs transition-colors"
            >
              {t("demoday.nav_link")}
            </a>
            <Link
              href="/2025"
              className="nav-link-premium text-fg/80 hover:text-fg font-mono uppercase tracking-wider text-xs transition-colors"
            >
              {t("nav.edition_2025")}
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://t.me/javierdgtl"
              target="_blank"
              rel="noreferrer"
              className="hidden lg:flex items-center text-fg/60 hover:text-fg text-sm transition-colors mr-2"
            >
              <HelpCircle className="w-4 h-4 mr-1 text-brand-accent" /> {t("nav.support")}:
              @javierdgtl
            </a>

            {/* Luma Calendar pill */}
            <a
              href="https://luma.com/hackEthLima26"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-bold transition-all hover:scale-105 border border-brand-accent/40 bg-brand-accent/8 text-brand-accent hover:bg-brand-accent/15"
            >
              <Calendar className="w-3 h-3" />
              {t("nav.luma")}
            </a>

            {/* Language & Theme Selectors */}
            <LanguageSwitcher />
          </div>
        </div>
      </nav>

      <HeroSection t={t} terminalText={terminalText} />
      <TracksSection t={t} tracks={tracks} isDark={isDark} />
      <TimelineSection t={t} tArray={tArray} />
      <WorkshopsSection t={t} tArray={tArray} />
      <SponsorsSection t={t} isDark={isDark} />
      <PartnersSection t={t} />
      <FAQSection t={t} tArray={tArray} />

      {/* Footer */}
      <footer className="bg-bg py-12 border-t border-border relative z-10 transition-colors duration-300">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Logo
              alt="ETH Lima Logo"
              className="h-8 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
            />
          </div>

          <div className="flex items-center gap-6 flex-wrap justify-center md:justify-end">
            <a
              href="https://luma.com/modcxwyr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-fg/50 hover:text-brand-accent text-sm transition-colors flex items-center font-semibold"
            >
              <Zap className="w-4 h-4 mr-1 text-brand-accent" /> {t("demoday.nav_link")}
            </a>
            <Link
              href="/terms"
              className="text-fg/50 hover:text-fg text-sm transition-colors flex items-center"
            >
              <FileText className="w-4 h-4 mr-1 text-brand-accent" /> {t("terms.title")}
            </Link>
            <Link
              href="/conduct"
              className="text-fg/50 hover:text-fg text-sm transition-colors flex items-center"
            >
              <Users className="w-4 h-4 mr-1 text-brand-accent" /> {t("conduct.title")}
            </Link>
            <Link
              href="/privacy"
              className="text-fg/50 hover:text-fg text-sm transition-colors flex items-center"
            >
              <Shield className="w-4 h-4 mr-1 text-brand-accent" /> {t("privacy.title")}
            </Link>
            <Link
              href="/cookies"
              className="text-fg/50 hover:text-fg text-sm transition-colors flex items-center"
            >
              <Globe className="w-4 h-4 mr-1 text-brand-accent" /> {t("cookies.title")}
            </Link>
            <Link
              href="/faq"
              className="text-fg/50 hover:text-fg text-sm transition-colors flex items-center"
            >
              <HelpCircle className="w-4 h-4 mr-1 text-brand-accent" /> FAQ
            </Link>
            <a
              href="https://t.me/javierdgtl"
              target="_blank"
              rel="noreferrer"
              className="text-fg/50 hover:text-fg text-sm transition-colors flex items-center"
            >
              <HelpCircle className="w-4 h-4 mr-1 text-brand-accent" /> {t("nav.support")}:
              @javierdgtl
            </a>
            <a
              href="https://x.com/eth_lima"
              target="_blank"
              rel="noreferrer"
              className="text-fg/50 hover:text-fg transition-colors"
              aria-label="X (Twitter)"
            >
              <Globe className="w-5 h-5" />
            </a>
            <a
              href="https://github.com/ethlima"
              target="_blank"
              rel="noreferrer"
              className="text-fg/50 hover:text-fg transition-colors"
              aria-label="GitHub"
            >
              <GitBranch className="w-5 h-5" />
            </a>
            <a
              href="https://discord.gg/vBBebr5vE"
              target="_blank"
              rel="noreferrer"
              className="text-fg/50 hover:text-fg transition-colors"
              aria-label="Discord"
            >
              <MessageSquare className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: showBackToTop ? 1 : 0, scale: showBackToTop ? 1 : 0.5 }}
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 z-50 p-3 rounded-full bg-brand-accent text-bg shadow-lg hover:opacity-95 transition-all cursor-pointer pointer-events-auto border border-brand-accent/20"
        style={{ pointerEvents: showBackToTop ? "auto" : "none" }}
        aria-label="Volver arriba"
      >
        <ArrowUp className="w-6 h-6" />
      </motion.button>
    </div>
  );
}
