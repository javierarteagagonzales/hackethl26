"use client";

import { useState, useEffect } from "react";
import { ArrowUp, Zap, ArrowRight, Globe, GitBranch, MessageSquare, HelpCircle, Shield, FileText } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Logo } from "@/components/ui/logo";
import { MOCK_TRACKS } from "@/lib/mock-data";
import { getTracks } from "@/app/actions/tracks";
import { useTranslation } from "@/components/providers/language-provider";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useTheme } from "next-themes";
import { InteractiveBackground } from "@/components/ui/interactive-background";
import { SidebarTimelineNavigator } from "@/components/ui/sidebar-timeline-navigator";

import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { TracksSection } from "@/components/sections/TracksSection";
import { SponsorsSection } from "@/components/sections/SponsorsSection";
import { TimelineSection } from "@/components/sections/TimelineSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { CallsSection } from "@/components/sections/CallsSection";

export default function Home() {
  const { t, tArray } = useTranslation();
  const { resolvedTheme } = useTheme();
  const [terminalText, setTerminalText] = useState("");
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isMounted, setIsMounted] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [tracks, setTracks] = useState<any[]>(MOCK_TRACKS);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mobileCheck = window.innerWidth < 1024;
    setIsMobile(mobileCheck);
  }, []);

  const codeSnippet = "> npm run build --hackathon=EthLima2026\n\n> Initializing Web3 nodes...\n> Deploying smart contracts...\n> Building future...\n\n✔ ETH Lima Hackathon compiled successfully.\n> System Ready.";

  useEffect(() => {
    setIsMounted(true);
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
      setTerminalText(codeSnippet);
    }

    const targetDate = new Date("2026-05-30T00:00:00").getTime();
    const countdownInterval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(countdownInterval);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    const fetchTracks = async () => {
      const result = await getTracks();
      if (result.success && result.tracks && result.tracks.length > 0) {
        const formattedTracks = result.tracks
          .filter((t: any) => !t.title?.toLowerCase().includes("arkiv") && !t.sponsor?.name?.toLowerCase().includes("arkiv"))
          .map((t: any) => {
          const totalAmount = t.prizes?.reduce((acc: number, p: any) => acc + (parseFloat(p.amount.replace(/[^0-9.]/g, '')) || 0), 0) || 0;
          const isUSDC = t.prizes?.some((p: any) => p.amount.includes("USDC"));

          return {
            id: t.id,
            title: t.title,
            sponsor: t.sponsor?.name || "Independent",
            sponsorLogo: t.sponsor?.logoUrl || null,
            description: t.description,
            color: t.color || "from-blue-500 to-cyan-400",
            categories: t.categories?.map((c: any) => c.name) || [],
            prizes: t.prizes?.map((p: any) => ({ name: p.name, amount: p.amount })) || [],
            totalPrizePool: totalAmount > 0 ? (isUSDC ? `${totalAmount} USDC` : `$${totalAmount}`) : "TBA"
          };
        });
        setTracks(formattedTracks);
      }
    };


    fetchTracks();
    window.addEventListener("scroll", handleScroll);

    return () => {
      if (terminalInterval) clearInterval(terminalInterval);
      clearInterval(countdownInterval);
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
            <Link href="#about" className="nav-link-premium text-fg/80 hover:text-fg font-mono uppercase tracking-wider text-xs transition-colors">{t("nav.about")}</Link>
            <Link href="#tracks" className="nav-link-premium text-fg/80 hover:text-fg font-mono uppercase tracking-wider text-xs transition-colors">{t("nav.tracks")}</Link>
            <Link href="#timeline" className="nav-link-premium text-fg/80 hover:text-fg font-mono uppercase tracking-wider text-xs transition-colors">{t("nav.timeline")}</Link>
            <Link href="#sponsors" className="nav-link-premium text-fg/80 hover:text-fg font-mono uppercase tracking-wider text-xs transition-colors">{t("nav.sponsors")}</Link>
            <Link href="/2025" className="nav-link-premium text-brand-accent hover:text-brand-accent/80 font-mono uppercase tracking-wider text-xs transition-colors">{t("nav.edition_2025")}</Link>
          </div>
          <div className="flex items-center gap-3">
            <a href="https://t.me/javierdgtl" target="_blank" rel="noreferrer" className="hidden lg:flex items-center text-fg/60 hover:text-fg text-sm transition-colors mr-2">
              <HelpCircle className="w-4 h-4 mr-1 text-brand-accent" /> {t("nav.support")}: @javierdgtl
            </a>

            {/* Language & Theme Selectors */}
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <HeroSection t={t} terminalText={terminalText} isDark={isDark} />
      <CallsSection t={t} isDark={isDark} />
      <AboutSection t={t} isDark={isDark} />
      <TracksSection t={t} tracks={tracks} isDark={isDark} />
      <SponsorsSection t={t} isDark={isDark} />
      <TimelineSection t={t} tArray={tArray} />
      <GallerySection t={t} isDark={isDark} />

      {/* Footer */}
      <footer className="bg-bg py-12 border-t border-border relative z-10 transition-colors duration-300">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Logo alt="ETH Lima Logo" className="h-8 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300" />
          </div>

          <div className="flex items-center gap-6 flex-wrap justify-center md:justify-end">
            <Link href="/terms" className="text-fg/50 hover:text-fg text-sm transition-colors flex items-center">
              <FileText className="w-4 h-4 mr-1 text-brand-accent" /> {t("terms.title")}
            </Link>
            <Link href="/privacy" className="text-fg/50 hover:text-fg text-sm transition-colors flex items-center">
              <Shield className="w-4 h-4 mr-1 text-brand-accent" /> {t("privacy.title")}
            </Link>
            <a href="https://t.me/javierdgtl" target="_blank" rel="noreferrer" className="text-fg/50 hover:text-fg text-sm transition-colors flex items-center">
              <HelpCircle className="w-4 h-4 mr-1 text-brand-accent" /> {t("nav.support")}: @javierdgtl
            </a>
            <a href="#" className="text-fg/50 hover:text-fg transition-colors"><Globe className="w-5 h-5" /></a>
            <a href="#" className="text-fg/50 hover:text-fg transition-colors"><GitBranch className="w-5 h-5" /></a>
            <a href="#" className="text-fg/50 hover:text-fg transition-colors"><MessageSquare className="w-5 h-5" /></a>
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
      >
        <ArrowUp className="w-6 h-6" />
      </motion.button>
    </div>
  );
}
