"use client";

import Link from "next/link";
import { LOGO_SRC } from "@/lib/asset-path";
import { motion } from "framer-motion";
import { ArrowRight, HelpCircle, Trophy, Users, Zap } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ApplyMentorPage() {
  const router = useRouter();
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); router.push("/"); };

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <div className="fixed inset-0 z-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #10b981 1px, transparent 0)", backgroundSize: "48px 48px" }} />
      <div className="fixed top-0 left-0 w-[500px] h-[500px] bg-green-500/10 blur-[120px] rounded-full pointer-events-none z-0" />

      <nav className="sticky top-0 z-50 border-b border-white/5 bg-black/80 backdrop-blur-xl">
        <div className="container mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/"><img src={LOGO_SRC} alt="ETH Lima" className="h-7 w-auto" /></Link>
          <a href="https://t.me/javierdgtl" target="_blank" rel="noreferrer" className="flex items-center gap-1 text-xs text-gray-500 hover:text-white transition-colors"><HelpCircle className="w-3 h-3" />@javierdgtl</a>
        </div>
      </nav>

      <div className="relative z-10 container mx-auto px-6 py-12 max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Link href="/" className="text-xs text-gray-600 hover:text-white transition-colors mb-8 block">← Back to Home</Link>
          <div className="font-mono text-xs text-green-400 mb-3 tracking-[0.3em] uppercase">// Mentor Application</div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">Support the <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">Next Generation</span></h1>
          <p className="text-gray-400 text-lg mb-10 max-w-xl">Share your expertise in Smart Contracts, UX, or Business and help builders turn ideas into protocols.</p>

          <div className="grid grid-cols-3 gap-3 mb-10 text-center">
            {[
              { icon: <Zap className="w-4 h-4 text-green-400" />, val: "July 24-26", label: "Commitment" },
              { icon: <Users className="w-4 h-4 text-emerald-400" />, val: "1-on-1", label: "Format" },
              { icon: <Trophy className="w-4 h-4 text-blue-400" />, val: "Recognition", label: "Reward" },
            ].map(i => (
              <div key={i.label} className="p-4 rounded-xl border border-white/5 bg-white/2">
                <div className="flex justify-center mb-2">{i.icon}</div>
                <div className="text-sm font-bold text-white mb-0.5">{i.val}</div>
                <div className="text-[10px] text-gray-600 uppercase font-mono">{i.label}</div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="rounded-xl border border-white/8 bg-white/2 p-6 space-y-4">
              <h2 className="text-xs font-mono text-gray-500 uppercase tracking-widest">01. Personal Information</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[["Full Name", "Javier Arteaga"], ["Email", "mentor@example.com"], ["LinkedIn", "linkedin.com/in/..."], ["Twitter/X", "@yourhandle"]].map(([l, ph]) => (
                  <div key={l}><label className="text-xs text-gray-500 block mb-1.5">{l}</label><input required placeholder={ph} className="w-full h-10 px-3 rounded-lg bg-white/5 border border-white/10 text-sm placeholder:text-gray-700 focus:outline-none focus:border-green-500/50 transition-all" /></div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-white/8 bg-white/2 p-6 space-y-4">
              <h2 className="text-xs font-mono text-gray-500 uppercase tracking-widest">02. Expertise</h2>
              <div><label className="text-xs text-gray-500 block mb-1.5">Years of experience in Web3</label>
                <select className="w-full h-10 px-3 rounded-lg bg-white/5 border border-white/10 text-sm text-gray-300 focus:outline-none focus:border-green-500/50 transition-all appearance-none">
                  {["< 1 year", "1-2 years", "3-5 years", "5+ years"].map(o => <option key={o} className="bg-black">{o}</option>)}
                </select>
              </div>
              <div><label className="text-xs text-gray-500 block mb-3">Areas of Expertise</label>
                <div className="grid grid-cols-2 gap-2">
                  {["Solidity / Smart Contracts", "Frontend (React/Next)", "ZK Proofs", "L2 Scaling (Arbitrum)", "Tokenomics", "UX / UI Design", "DeFi", "NFTs / Gaming"].map(area => (
                    <label key={area} className="flex items-center gap-2 p-2 rounded-lg border border-white/5 bg-white/2 text-[11px] text-gray-400 cursor-pointer hover:bg-white/5 has-[:checked]:border-green-500/50">
                      <input type="checkbox" className="accent-green-500" /> {area}
                    </label>
                  ))}
                </div>
              </div>
              <div><label className="text-xs text-gray-500 block mb-1.5">Why do you want to mentor at ETH Lima?</label><textarea rows={3} placeholder="Tell us about your previous mentorship experience..." className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm placeholder:text-gray-700 focus:outline-none focus:border-green-500/50 transition-all resize-none" /></div>
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
