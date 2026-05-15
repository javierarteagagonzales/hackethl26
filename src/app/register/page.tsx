"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { LOGO_SRC } from "@/lib/asset-path";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";

const SKILLS = ["Smart Contract Engineer", "Frontend Developer", "Backend Developer", "UI/UX Designer", "Product Manager", "Data Scientist", "Full Stack Dev", "Blockchain Researcher"];
const TRACKS = ["Arbitrum", "Arkiv — Job Platform", "Arkiv — Wikis", "Arkiv — Events", "To be defined"];

export default function RegisterPage() {
  const router = useRouter();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <div className="fixed inset-0 z-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #3b82f6 1px, transparent 0)", backgroundSize: "48px 48px" }} />
      <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-purple-600/10 blur-[130px] rounded-full pointer-events-none z-0" />

      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-white/5 bg-black/80 backdrop-blur-xl">
        <div className="container mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/">
            <img src={LOGO_SRC} alt="ETH Lima" className="h-7 w-auto" />
          </Link>
          <Link href="/login" className="text-xs text-gray-500 hover:text-white transition-colors">Already have an account? →</Link>
        </div>
      </nav>

      <div className="relative z-10 container mx-auto px-6 py-12 max-w-2xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          {/* Header */}
          <div className="mb-12">
            <div className="font-mono text-xs text-blue-400 mb-3 tracking-[0.3em] uppercase">// Application form</div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">Apply as <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Hacker</span></h1>
            <p className="text-gray-400 text-lg">Join the premier Web3 hackathon in Latin America. 48h to build the future.</p>
          </div>

          {/* Perks row */}
          <div className="grid grid-cols-3 gap-3 mb-10">
            {["Free to join", "$10K+ prizes", "Mentors available"].map(p => (
              <div key={p} className="flex items-center gap-2 text-sm text-gray-400 border border-white/5 rounded-lg p-3 bg-white/2">
                <CheckCircle className="w-4 h-4 text-green-500 shrink-0" /> {p}
              </div>
            ))}
          </div>

          <form onSubmit={handleRegister} className="space-y-6">
            {/* Personal info */}
            <div className="rounded-xl border border-white/8 bg-white/2 p-6 space-y-4">
              <h2 className="text-xs font-mono text-gray-500 uppercase tracking-widest">01. Personal Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-500 block mb-1.5">First Name</label>
                  <input placeholder="Javier" required className="w-full h-10 px-3 rounded-lg bg-white/5 border border-white/10 text-sm placeholder:text-gray-700 focus:outline-none focus:border-blue-500/50 transition-all" />
                </div>
                <div>
                  <label className="text-xs text-gray-500 block mb-1.5">Last Name</label>
                  <input placeholder="Doe" required className="w-full h-10 px-3 rounded-lg bg-white/5 border border-white/10 text-sm placeholder:text-gray-700 focus:outline-none focus:border-blue-500/50 transition-all" />
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-500 block mb-1.5">Email</label>
                <input type="email" placeholder="hacker@ethlima.org" required className="w-full h-10 px-3 rounded-lg bg-white/5 border border-white/10 text-sm placeholder:text-gray-700 focus:outline-none focus:border-blue-500/50 transition-all" />
              </div>
              <div>
                <label className="text-xs text-gray-500 block mb-1.5">Password</label>
                <input type="password" placeholder="••••••••" required className="w-full h-10 px-3 rounded-lg bg-white/5 border border-white/10 text-sm placeholder:text-gray-700 focus:outline-none focus:border-blue-500/50 transition-all" />
              </div>
            </div>

            {/* Web3 profile */}
            <div className="rounded-xl border border-white/8 bg-white/2 p-6 space-y-4">
              <h2 className="text-xs font-mono text-gray-500 uppercase tracking-widest">02. Web3 Profile</h2>
              <div>
                <label className="text-xs text-gray-500 block mb-1.5">GitHub Username</label>
                <div className="flex items-center">
                  <span className="h-10 px-3 flex items-center bg-white/3 border border-r-0 border-white/10 rounded-l-lg text-gray-600 text-sm">github.com/</span>
                  <input placeholder="your-user" className="flex-1 h-10 px-3 rounded-r-lg bg-white/5 border border-white/10 text-sm placeholder:text-gray-700 focus:outline-none focus:border-blue-500/50 transition-all" />
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-500 block mb-1.5">Wallet Address (optional)</label>
                <input placeholder="0x..." className="w-full h-10 px-3 rounded-lg bg-white/5 border border-white/10 text-sm font-mono placeholder:text-gray-700 focus:outline-none focus:border-blue-500/50 transition-all" />
              </div>
              <div>
                <label className="text-xs text-gray-500 block mb-1.5">Primary Skill</label>
                <select className="w-full h-10 px-3 rounded-lg bg-white/5 border border-white/10 text-sm text-gray-300 focus:outline-none focus:border-blue-500/50 transition-all appearance-none">
                  {SKILLS.map(s => <option key={s} value={s} className="bg-black">{s}</option>)}
                </select>
              </div>
            </div>

            {/* Track preference */}
            <div className="rounded-xl border border-white/8 bg-white/2 p-6 space-y-4">
              <h2 className="text-xs font-mono text-gray-500 uppercase tracking-widest">03. Track Preference</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {TRACKS.map(t => (
                  <label key={t} className="flex items-center gap-3 p-3 rounded-lg border border-white/5 bg-white/2 hover:bg-white/5 cursor-pointer transition-all text-sm text-gray-300 has-[:checked]:border-blue-500/50 has-[:checked]:bg-blue-500/5">
                    <input type="radio" name="track" value={t} className="accent-blue-500" />
                    {t}
                  </label>
                ))}
              </div>
              <div>
                <label className="text-xs text-gray-500 block mb-1.5">Why do you want to participate? (optional)</label>
                <textarea rows={3} placeholder="Tell us what motivates you to join ETH Lima 2026..." className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm placeholder:text-gray-700 focus:outline-none focus:border-blue-500/50 transition-all resize-none" />
              </div>
            </div>

            <button type="submit" className="w-full h-12 rounded-lg bg-white text-black font-bold text-sm flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors">
              Submit Application <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
