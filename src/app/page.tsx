"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin, Users, ArrowRight, ArrowUp, GitBranch, Globe, MessageSquare, Mic, Briefcase, Trophy, Terminal, Code2, Zap, Server, HelpCircle } from "lucide-react";
import Link from "next/link";
import { LOGO_SRC } from "@/lib/asset-path";
import { MOCK_TRACKS } from "@/lib/mock-data";

export default function Home() {
  const [terminalText, setTerminalText] = useState("");
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isMounted, setIsMounted] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  
  const codeSnippet = "> npm run build --hackathon=EthLima2026\n\n> Initializing Web3 nodes...\n> Deploying smart contracts...\n> Building future...\n\n✔ ETH Lima Hackathon compiled successfully.\n> System Ready.";

  useEffect(() => {
    setIsMounted(true);
    let i = 0;
    const terminalInterval = setInterval(() => {
      setTerminalText(codeSnippet.slice(0, i));
      i++;
      if (i > codeSnippet.length) clearInterval(terminalInterval);
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

    window.addEventListener("scroll", handleScroll);
    return () => {
      clearInterval(terminalInterval);
      clearInterval(countdownInterval);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [codeSnippet]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-brand-blue/30 overflow-x-hidden font-sans">
      
      {/* Background Grid & Glow Effect */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)", backgroundSize: "40px 40px" }}></div>
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-brand-blue/20 blur-[150px] rounded-full pointer-events-none z-0"></div>

      {/* Top Banner Bootcamp */}
      <div className="w-full bg-gradient-to-r from-brand-blue via-indigo-600 to-purple-600 text-white py-2 px-4 text-center text-sm font-semibold z-50 relative shadow-[0_0_15px_rgba(59,130,246,0.5)]">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6">
          <span className="flex items-center gap-2"><Zap className="w-4 h-4 text-yellow-300" /> Ethereum Lima Bootcamp, Learn about Arbitrum</span>
          <span className="font-mono bg-black/40 px-3 py-1 rounded-full text-xs border border-white/20 tracking-widest min-w-[200px]">
            {isMounted ? `Apply until: ${timeLeft.days}d ${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s` : "Loading..."}
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 w-full z-50 border-b border-white/5 bg-black/60 backdrop-blur-xl">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={LOGO_SRC} alt="ETH Lima Logo" className="h-8 sm:h-10 w-auto object-contain" />
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
            <Link href="#about" className="hover:text-white transition-colors">About</Link>
            <Link href="#tracks" className="hover:text-white transition-colors">Tracks</Link>
            <Link href="#timeline" className="hover:text-white transition-colors">Timeline</Link>
            <Link href="#sponsors" className="hover:text-white transition-colors">Sponsors</Link>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://t.me/javierdgtl" target="_blank" rel="noreferrer" className="hidden lg:flex items-center text-gray-400 hover:text-white text-sm transition-colors mr-2">
              <HelpCircle className="w-4 h-4 mr-1" /> Support: @javierdgtl
            </a>
            <Link href="/login" className="hidden sm:inline-flex h-9 items-center justify-center px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-md transition-colors">
              Log in
            </Link>
            <Link href="/register" className="inline-flex h-9 items-center justify-center px-4 py-2 text-sm font-medium bg-brand-blue hover:bg-brand-blue/80 text-white border border-brand-blue/50 shadow-[0_0_15px_rgba(59,130,246,0.5)] rounded-md transition-colors">
              Apply Now
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 md:pt-32 md:pb-32 z-10">
        <div className="container relative mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Badge variant="outline" className="mb-6 border-brand-blue/30 bg-brand-blue/10 text-brand-blue font-mono py-1 px-4 text-xs uppercase tracking-wider backdrop-blur-sm">
              <Zap className="w-3 h-3 mr-2" /> Hackathon Registrations Open
            </Badge>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6 leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-purple-500 to-brand-red">ETH Lima</span>{" "}
              Hackathon <span className="block text-white">2026</span>
            </h1>

            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 font-light">
              The premier Web3 hybrid hackathon in Latin America. Join top developers to build on Arbitrum, Arkiv, and scale the decentralized web.
            </p>

            {/* Terminal Window Effect */}
            <div className="max-w-3xl mx-auto my-12 text-left bg-[#0a0a0a]/80 rounded-lg border border-white/10 shadow-[0_0_40px_rgba(59,130,246,0.15)] overflow-hidden backdrop-blur-md">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/5">
                <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_5px_rgba(239,68,68,0.8)]"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-[0_0_5px_rgba(234,179,8,0.8)]"></div>
                <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.8)]"></div>
                <div className="ml-2 flex items-center text-gray-500 text-xs font-mono"><Terminal className="w-3 h-3 mr-1" /> eth-lima-terminal</div>
              </div>
              <div className="p-6 font-mono text-sm md:text-base text-brand-blue whitespace-pre-wrap min-h-[160px]">
                {terminalText}
                <span className="animate-pulse text-white">_</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 mt-10">
              <Link href="/register" className="inline-flex items-center justify-center h-14 px-8 text-lg bg-white text-black hover:bg-gray-200 rounded-md font-semibold w-full sm:w-auto transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                Apply as Hacker <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link href="/sponsor" className="inline-flex items-center justify-center h-14 px-6 text-base w-full sm:w-auto border border-white/20 text-white hover:bg-white/5 hover:border-white/40 rounded-md font-medium transition-all">
                <Briefcase className="mr-2 w-4 h-4" /> Sponsor Track
              </Link>
              <Link href="/apply-mentor" className="inline-flex items-center justify-center h-14 px-6 text-base w-full sm:w-auto border border-white/20 text-white hover:bg-white/5 hover:border-white/40 rounded-md font-medium transition-all">
                <Users className="mr-2 w-4 h-4" /> Become Mentor
              </Link>
            </div>

            <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-gray-500 font-mono text-sm uppercase tracking-widest">
              <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-brand-blue" /> Oct 24–26, 2026</div>
              <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-brand-red" /> Lima & Virtual</div>
              <div className="flex items-center gap-2"><Server className="w-4 h-4 text-green-500" /> $10k+ Prizes</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 border-t border-white/5 relative z-10 bg-black/40">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">Elevating the LATAM <span className="text-brand-blue drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]">Web3 Ecosystem</span></h2>
              <p className="text-gray-400 text-lg mb-6 leading-relaxed">
                Ethereum Lima 2026 is more than a hackathon; it is a convergence of brilliant minds, protocols, and ideas aimed at solving real-world problems using decentralized technologies.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-gray-300"><Code2 className="text-brand-blue w-5 h-5" /> Intensive 48-hour building</li>
                <li className="flex items-center gap-3 text-gray-300"><Mic className="text-brand-red w-5 h-5" /> Workshops by industry leaders</li>
                <li className="flex items-center gap-3 text-gray-300"><Users className="text-green-500 w-5 h-5" /> Mentorship from core protocol engineers</li>
              </ul>
            </div>
            <div className="relative h-full min-h-[300px] rounded-xl border border-white/10 bg-gradient-to-tr from-brand-blue/10 to-transparent p-8 flex items-center justify-center overflow-hidden shadow-[0_0_30px_rgba(59,130,246,0.1)]">
              <div className="absolute inset-0 opacity-20"></div>
              <img src={LOGO_SRC} alt="ETH Lima Logo" width={200} height={200} className="object-contain drop-shadow-[0_0_30px_rgba(59,130,246,0.6)] animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* Tracks Section */}
      <section id="tracks" className="py-24 border-t border-white/5 relative z-10">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Official <span className="text-brand-blue drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]">Tracks</span></h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">Build innovative solutions for these bounties. Choose your path and start hacking.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_TRACKS.map((track, i) => (
              <motion.div key={i} whileHover={{ y: -5 }} className="group">
                <Card className="h-full bg-black/80 backdrop-blur-sm border-white/10 overflow-hidden hover:border-brand-blue/50 transition-all flex flex-col shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:shadow-[0_0_25px_rgba(59,130,246,0.2)]">
                  <div className={`h-1 w-full bg-gradient-to-r ${track.color}`}></div>
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <CardTitle className="text-2xl font-bold">{track.title}</CardTitle>
                      <Badge variant="outline" className="bg-white/5 border-white/10 text-gray-300 font-mono text-xs">{track.sponsor}</Badge>
                    </div>
                    <CardDescription className="text-gray-400">{track.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col justify-between">
                    <div className="space-y-6 mb-6">
                      <div>
                        <h4 className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-3">Categories</h4>
                        <div className="flex flex-wrap gap-2">
                          {track.categories.map((cat, j) => (
                            <Badge key={j} variant="secondary" className="bg-brand-blue/10 text-brand-blue border border-brand-blue/20 hover:bg-brand-blue/20">{cat}</Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2"><Trophy className="w-3 h-3" /> Prizes</h4>
                        <ul className="space-y-2">
                          {track.prizes.map((prize, j) => (
                            <li key={j} className="text-sm flex justify-between items-center bg-white/5 p-2 rounded border border-white/5">
                              <span className="text-gray-300">{prize.name}</span>
                              <span className="font-mono text-green-400 font-semibold">{prize.amount}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-white/10 flex items-center justify-between mt-auto">
                      <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">Prize Pool</span>
                      <span className="text-xl font-bold text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">{track.totalPrizePool}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}

            <motion.div whileHover={{ y: -5 }} className="group">
              <Card className="h-full bg-black/40 border-dashed border-2 border-white/10 hover:border-brand-blue/50 transition-all flex flex-col items-center justify-center p-8 text-center min-h-[400px] hover:bg-brand-blue/5">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6 group-hover:bg-brand-blue/20 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.05)] group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                  <Briefcase className="w-8 h-8 text-gray-500 group-hover:text-brand-blue transition-colors" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">Your Track Here</h3>
                <p className="text-gray-400 mb-8 text-sm">Want to see your technology used by the best builders in Web3? Sponsor a track.</p>
                <Link href="/sponsor" className="inline-flex h-10 px-6 items-center justify-center rounded-md bg-white text-black font-semibold hover:bg-gray-200 transition-colors">
                  Become a Sponsor
                </Link>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Horizontal Timeline Section */}
      <section id="timeline" className="py-24 border-t border-white/5 relative z-10 bg-black">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Event <span className="text-brand-blue">Timeline</span></h2>
            <p className="text-gray-400 text-lg">The 48 hours that will change your Web3 journey.</p>
          </div>

          <div className="relative mt-10">
            {/* Horizontal Line connecting nodes (Desktop only) */}
            <div className="hidden md:block absolute top-[14px] left-[12.5%] w-[75%] h-[2px] bg-white/10"></div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
              {[
                { day: "Jul 18 - Jul 24", time: "Preparation", title: "Pre-Event Workshops", desc: "Introductory talks, team formation, and virtual support sessions.", color: "bg-blue-600" },
                { day: "Jul 25 - Jul 26", time: "Build", title: "Hackathon & Demo Day", desc: "48 hours of intensive coding, submissions and live demos.", color: "bg-purple-600" },
                { day: "Jul 31 - Aug 10", time: "Evaluation", title: "Live Results", desc: "Winners announced for Arbitrum, Arkiv, and all other tracks.", color: "bg-yellow-500" },
                { day: "Aug 13 - Sep 6", time: "Follow-up", title: "Post-Hackathon Talks", desc: "Talk series at UNI and official close of the event season.", color: "bg-orange-500" }
              ].map((item, idx) => (
                <div key={idx} className="relative flex flex-col items-center text-center group">

                  {/* Node */}
                  <div className={`flex items-center justify-center w-7 h-7 rounded-full border-[4px] border-black ${item.color} z-10 mb-6 transition-transform duration-300 group-hover:scale-110`}></div>

                  {/* Content Card */}
                  <div className="w-full bg-white/5 border border-white/10 p-6 rounded-xl transition-colors duration-300 group-hover:bg-white/10 relative">
                    <h3 className="font-bold text-white text-lg mb-2">{item.title}</h3>
                    <div className="font-mono text-xs md:text-sm mb-3 text-gray-400 font-semibold">
                      {item.day} <span className="mx-1 text-gray-600">•</span> {item.time}
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>

                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-12 border-t border-white/10 relative z-10">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src={LOGO_SRC} alt="ETH Lima Logo" className="h-8 w-auto object-contain grayscale hover:grayscale-0 transition-all" />
          </div>

          <div className="flex items-center gap-6">
            <a href="https://t.me/javierdgtl" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-white text-sm transition-colors flex items-center">
              <HelpCircle className="w-4 h-4 mr-1" /> Contact: @javierdgtl
            </a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors"><Globe className="w-5 h-5" /></a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors"><GitBranch className="w-5 h-5" /></a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors"><MessageSquare className="w-5 h-5" /></a>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: showBackToTop ? 1 : 0, scale: showBackToTop ? 1 : 0.5 }}
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 z-50 p-3 rounded-full bg-brand-blue text-white shadow-[0_0_20px_rgba(59,130,246,0.5)] hover:bg-brand-blue/80 transition-all cursor-pointer pointer-events-auto"
        style={{ pointerEvents: showBackToTop ? "auto" : "none" }}
      >
        <ArrowUp className="w-6 h-6" />
      </motion.button>
    </div>
  );
}
