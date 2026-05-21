"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, ArrowRight, ArrowUp, GitBranch, Globe, MessageSquare, Mic, Briefcase, Trophy, Terminal, Code2, Zap, Server, HelpCircle, Sun, Moon } from "lucide-react";
import Link from "next/link";
import { LOGO_SRC } from "@/lib/asset-path";
import { MOCK_TRACKS } from "@/lib/mock-data";
import { getTracks } from "@/app/actions/tracks";

export default function Home() {
  const [terminalText, setTerminalText] = useState("");
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isMounted, setIsMounted] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [tracks, setTracks] = useState<any[]>(MOCK_TRACKS);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  const codeSnippet = "> npm run build --hackathon=EthLima2026\n\n> Initializing Web3 nodes...\n> Deploying smart contracts...\n> Building future...\n\n✔ ETH Lima Hackathon compiled successfully.\n> System Ready.";

  useEffect(() => {
    setIsMounted(true);
    let i = 0;
    let erasing = false;
    let pauseTimeout: ReturnType<typeof setTimeout> | null = null;

    const terminalInterval = setInterval(() => {
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
        const formattedTracks = result.tracks.map((t: any) => {
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

    // Read initial theme preference
    const root = window.document.documentElement;
    if (root.classList.contains("dark")) {
      setTheme("dark");
    } else {
      setTheme("light");
    }

    return () => {
      clearInterval(terminalInterval);
      clearInterval(countdownInterval);
      if (pauseTimeout) clearTimeout(pauseTimeout);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [codeSnippet]);

  useEffect(() => {
    if (!isMounted) return;
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      root.setAttribute("data-theme", "dark");
    } else {
      root.classList.remove("dark");
      root.setAttribute("data-theme", "light");
    }
  }, [theme, isMounted]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleTheme = () => {
    setTheme(prev => prev === "dark" ? "light" : "dark");
  };

  return (
    <div className="min-h-screen bg-bg text-fg selection:bg-coral/30 overflow-x-hidden font-sans transition-colors duration-300">

      {/* Premium Visual Overlays */}
      <div className="fixed inset-0 z-0 pointer-events-none glow-hero opacity-30"></div>
      <div className="fixed inset-0 z-0 pointer-events-none pattern-dots opacity-40"></div>
      <div className="fixed inset-0 z-0 pointer-events-none pattern-grid opacity-30"></div>

      {/* Top Banner Bootcamp */}
      <div className="w-full bg-gradient-to-r from-teal via-cyan to-coral text-white py-1.5 sm:py-2 px-3 sm:px-4 text-center z-50 relative shadow-md">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-6">
          <span className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold">
            <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-300 flex-shrink-0" />
            <span className="hidden sm:inline">Ethereum Lima Bootcamp, Learn about Arbitrum</span>
            <span className="sm:hidden">ETH Lima Bootcamp · Arbitrum</span>
          </span>
          <div className="flex items-center gap-2">
            <span className="font-mono bg-black/40 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs border border-white/20 tracking-widest hidden sm:inline-block min-w-[200px]">
              {isMounted ? `Apply until: ${timeLeft.days}d ${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s` : "Loading..."}
            </span>
            <a
              href="https://bootcamp.ethlima.org/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 bg-white text-indigo-700 hover:bg-yellow-300 hover:text-indigo-900 transition-colors font-bold rounded-full px-3 py-0.5 sm:px-4 sm:py-1 text-[10px] sm:text-xs shadow-md whitespace-nowrap"
            >
              Register <ArrowRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 w-full z-50 border-b border-border bg-surface/75 backdrop-blur-xl transition-all duration-300">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={LOGO_SRC} alt="ETH Lima Logo" className="h-8 sm:h-10 w-auto object-contain" />
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-fg/80">
            <Link href="#about" className="nav-link-premium text-fg/80 hover:text-fg font-mono uppercase tracking-wider text-xs transition-colors">About</Link>
            <Link href="#tracks" className="nav-link-premium text-fg/80 hover:text-fg font-mono uppercase tracking-wider text-xs transition-colors">Tracks</Link>
            <Link href="#timeline" className="nav-link-premium text-fg/80 hover:text-fg font-mono uppercase tracking-wider text-xs transition-colors">Timeline</Link>
            <Link href="#sponsors" className="nav-link-premium text-fg/80 hover:text-fg font-mono uppercase tracking-wider text-xs transition-colors">Sponsors</Link>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://t.me/javierdgtl" target="_blank" rel="noreferrer" className="hidden lg:flex items-center text-fg/60 hover:text-fg text-sm transition-colors mr-2">
              <HelpCircle className="w-4 h-4 mr-1 text-brand-accent" /> Support: @javierdgtl
            </a>

            {/* Dynamic Adaptable Theme Switcher */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full border border-border bg-surface/80 text-fg hover:border-brand-accent/50 transition-colors flex items-center justify-center cursor-pointer shadow-sm hover:scale-105 active:scale-95 duration-200"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4 text-brand-accent" />
              ) : (
                <Moon className="w-4 h-4 text-brand-accent" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 md:pt-32 md:pb-32 z-10">
        <div className="container relative mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >

            {/* Coming Soon Badge with Live Dot */}
            <div className="flex flex-col items-center gap-3 mb-8">
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-brand-accent/30 bg-brand-accent/5 text-fg font-semibold text-sm shadow-md font-mono">
                <div className="live-dot" />
                Applications opening soon — stay tuned!
              </div>
              <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-fg/60 font-mono text-xs sm:text-sm uppercase tracking-widest">
                <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-brand-accent" /> Jul 18 - Aug 11, 2026</div>
                <div className="flex items-center gap-2">🌍 Híbrido</div>
                <div className="flex items-center gap-2"><Server className="w-4 h-4 text-brand-accent" /> $4k+ Prizes</div>
              </div>
            </div>

            {/* Plus Jakarta Sans Heading with letter-spacing & accent gradient */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-6 leading-none" style={{ letterSpacing: "-0.02em" }}>
              <span className="text-gradient-sunset">ETH Lima</span>{" "}
              Hackathon <span className="block text-fg">2026</span>
            </h1>

            <p className="text-xl text-fg/70 max-w-2xl mx-auto mb-8 font-light leading-relaxed">
              The premier Web3 hybrid hackathon in Latin America. Join top developers to build on Arbitrum, Arkiv, and scale the decentralized web.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-12 flex justify-center"
            >
              <a
                href="https://tally.so/r/aQa4GX"
                target="_blank"
                rel="noreferrer"
                className="group relative inline-flex items-center justify-center gap-3 bg-fg text-bg px-8 py-4 rounded-full font-bold text-lg overflow-hidden transition-all hover:scale-105 shadow-xl hover:shadow-brand-accent/20"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-coral via-orange to-teal opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
                  Join Waitlist <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </a>
            </motion.div>

            {/* Premium Glassmorphic Terminal Window */}
            <div className="max-w-3xl mx-auto my-12 text-left glass-card overflow-hidden shadow-xl border-brand-accent/10">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-surface/40">
                <div className="w-3 h-3 rounded-full bg-coral opacity-80"></div>
                <div className="w-3 h-3 rounded-full bg-orange opacity-80"></div>
                <div className="w-3 h-3 rounded-full bg-teal opacity-80"></div>
                <div className="ml-2 flex items-center text-fg/50 text-xs font-mono"><Terminal className="w-3 h-3 mr-1" /> eth-lima-terminal</div>
              </div>
              <div className="p-6 font-mono text-sm md:text-base text-brand-accent whitespace-pre-wrap min-h-[160px]">
                {terminalText}
                <span className="animate-pulse text-fg">_</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 border-t border-border relative z-10 bg-surface/20">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6" style={{ letterSpacing: "-0.02em" }}>
                Elevating the LATAM <span className="text-gradient-sunset font-extrabold">Web3 Ecosystem</span>
              </h2>
              <p className="text-fg/70 text-lg mb-6 leading-relaxed">
                Ethereum Lima 2026 is more than a hackathon; it is a convergence of brilliant minds, protocols, and ideas aimed at solving real-world problems using decentralized technologies.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-fg/80"><Code2 className="text-coral w-5 h-5" /> Intensive 48-hour building</li>
                <li className="flex items-center gap-3 text-fg/80"><Mic className="text-orange w-5 h-5" /> Workshops by industry leaders</li>
                <li className="flex items-center gap-3 text-fg/80"><Users className="text-teal w-5 h-5" /> Mentorship from core protocol engineers</li>
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative h-full min-h-[300px] glass-card p-8 flex items-center justify-center overflow-hidden shadow-lg border-brand-accent/15"
            >
              <div className="absolute inset-0 pattern-dots opacity-10"></div>
              <img
                src={LOGO_SRC}
                alt="ETH Lima Logo"
                width={200}
                height={200}
                className="object-contain drop-shadow-[0_0_30px_rgba(230,74,48,0.3)] animate-pulse"
                style={{ filter: theme === "light" ? "none" : "drop-shadow(0 0 30px rgba(199, 247, 58, 0.4))" }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tracks Section */}
      <section id="tracks" className="py-24 border-t border-border relative z-10">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4" style={{ letterSpacing: "-0.02em" }}>Official <span className="text-gradient-sunset font-extrabold">Tracks</span></h2>
            <p className="text-fg/70 text-lg max-w-2xl mx-auto font-light">Build innovative solutions for these bounties. Choose your path and start hacking.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tracks.map((track, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="group"
              >
                <div className="glass-card h-full overflow-hidden flex flex-col hover:border-brand-accent/30 shadow-md">
                  <div className={`h-1.5 w-full bg-gradient-to-r ${track.color}`}></div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex justify-between items-start gap-4 mb-4">
                      <h3 className="text-2xl font-bold tracking-tight text-fg">{track.title}</h3>
                      {track.sponsorLogo ? (
                        <img
                          src={track.sponsorLogo}
                          alt={track.sponsor}
                          className={`h-6 w-auto object-contain transition-all duration-300 ${theme === 'dark' ? 'brightness-0 invert opacity-60 group-hover:opacity-100' : 'opacity-80 group-hover:opacity-100'}`}
                        />
                      ) : (
                        <span className="bg-fg/5 text-fg/80 border border-border px-2 py-0.5 rounded font-mono text-xs">{track.sponsor}</span>
                      )}
                    </div>
                    <p className="text-fg/70 text-sm mb-6 line-clamp-3 leading-relaxed font-light">{track.description}</p>

                    <div className="space-y-6 mt-auto">
                      <div>
                        <h4 className="text-xs font-mono text-fg/40 uppercase tracking-widest mb-3">Categories</h4>
                        <div className="flex flex-wrap gap-2">
                          {track.categories.map((cat: string, j: number) => (
                            <Badge key={j} className="bg-brand-accent/10 text-fg hover:bg-brand-accent/25 border border-brand-accent/20 transition-all font-mono text-xs py-0.5">{cat}</Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-xs font-mono text-fg/40 uppercase tracking-widest mb-3 flex items-center gap-2"><Trophy className="w-3 h-3 text-brand-accent" /> Prizes</h4>
                        <div className="flex justify-center items-center bg-surface/50 px-3 py-6 rounded-lg border border-border border-dashed">
                          <span className="text-fg/60 font-mono font-medium tracking-wider text-sm animate-pulse">SOON</span>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-border flex items-center justify-between mt-auto">
                        <span className="text-xs font-mono text-fg/40 uppercase tracking-widest">Prize Pool</span>
                        <span className="text-xl font-extrabold text-fg">Soon</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: tracks.length * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group"
            >
              <div className="glass-card h-full border-dashed border-2 border-border flex flex-col items-center justify-center p-8 text-center min-h-[400px] hover:bg-brand-accent/5 hover:border-brand-accent/40">
                <div className="w-16 h-16 rounded-full bg-surface/50 flex items-center justify-center mb-6 group-hover:bg-brand-accent/20 transition-colors shadow-sm border border-border group-hover:border-brand-accent/30">
                  <Briefcase className="w-8 h-8 text-fg/60 group-hover:text-brand-accent transition-colors" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-fg">Your Track Here</h3>
                <p className="text-fg/60 mb-8 text-sm font-light">Want to see your technology used by the best builders in Web3? Sponsor a track.</p>
                <Link href="/sponsor" className="inline-flex h-10 px-6 items-center justify-center rounded-full bg-fg text-bg font-bold hover:opacity-90 transition-all font-mono text-sm shadow-md">
                  Become a Sponsor
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* World Class Sponsors with Ticker Marquee Component */}
      <section id="sponsors" className="py-24 border-t border-border relative z-10 bg-surface/10">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4" style={{ letterSpacing: "-0.02em" }}>World Class <span className="text-gradient-sunset font-extrabold">Sponsors</span></h2>
          <p className="text-fg/60 text-lg mb-16 max-w-2xl mx-auto font-light">Supported by the most innovative protocols and companies in the Web3 space.</p>

          <div className="marquee-container py-6 flex">
            {[1, 2].map((idx) => (
              <div key={idx} className="marquee-content items-center">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex gap-20 items-center justify-around">
                    <div className="h-14 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300">
                      <img
                        src="/assets/sponsors/arbitrum-logo.svg"
                        alt="Arbitrum"
                        className={`h-12 md:h-16 w-auto object-contain filter transition-all ${theme === 'dark' ? 'brightness-100' : 'brightness-75'}`}
                      />
                    </div>
                    <div className="h-14 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300">
                      <img
                        src="/assets/sponsors/logo-arkiv.png"
                        alt="Arkiv"
                        className={`h-8 md:h-10 w-auto object-contain filter transition-all ${theme === 'dark' ? 'brightness-100' : 'brightness-75'}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Horizontal Timeline Section */}
      <section id="timeline" className="py-24 border-t border-border relative z-10 bg-bg transition-colors duration-300">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4" style={{ letterSpacing: "-0.02em" }}>Event <span className="text-gradient-sunset font-extrabold">Timeline</span></h2>
            <p className="text-fg/60 text-lg font-light">The 48 hours that will change your Web3 journey.</p>
          </div>

          <div className="relative mt-10">
            {/* Horizontal Line connecting nodes (Desktop only) */}
            <div className="hidden md:block absolute top-[14px] left-[12.5%] w-[75%] h-[2px] bg-border transition-colors"></div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
              {[
                { day: "Jul 18 - Jul 24", time: "Preparation", title: "Pre-Event Workshops", desc: "Introductory talks, team formation, and virtual support sessions.", color: "bg-coral" },
                { day: "Jul 25 - Jul 26", time: "Build", title: "Hackathon & Demo Day", desc: "48 hours of intensive coding, submissions and live demos.", color: "bg-teal" },
                { day: "Jul 31 - Aug 10", time: "Evaluation", title: "Results", desc: "Winners announced for Arbitrum, Arkiv, and all other tracks.", color: "bg-orange" },
                { day: "Aug 13 - Sep 6", time: "Follow-up", title: "Post-Hackathon", desc: "Talk series, Mentoring sessions and official close of the event season.", color: "bg-cyan" }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="relative flex flex-col items-center text-center group"
                >

                  {/* Node */}
                  <div className={`flex items-center justify-center w-7 h-7 rounded-full border-[4px] border-bg ${item.color} z-10 mb-6 transition-transform duration-300 group-hover:scale-110 shadow-sm`}></div>

                  {/* Content Card */}
                  <div className="glass-card w-full p-6 transition-all duration-300 hover:border-brand-accent/30 relative">
                    <h3 className="font-bold text-fg text-lg mb-2">{item.title}</h3>
                    <div className="font-mono text-xs md:text-sm mb-3 text-fg/50 font-semibold">
                      {item.day} <span className="mx-1 text-fg/30">•</span> {item.time}
                    </div>
                    <p className="text-fg/60 text-sm leading-relaxed font-light">{item.desc}</p>
                  </div>

                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-bg py-12 border-t border-border relative z-10 transition-colors duration-300">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src={LOGO_SRC} alt="ETH Lima Logo" className="h-8 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300" />
          </div>

          <div className="flex items-center gap-6">
            <a href="https://t.me/javierdgtl" target="_blank" rel="noreferrer" className="text-fg/50 hover:text-fg text-sm transition-colors flex items-center">
              <HelpCircle className="w-4 h-4 mr-1 text-brand-accent" /> Contact: @javierdgtl
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
