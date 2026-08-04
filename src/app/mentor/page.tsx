"use client";

import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { motion } from "framer-motion";
import { HelpCircle, Search, MessageSquare, Calendar, Globe } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const MOCK_MENTORS = [
  {
    name: "Satoshi Nakamoto",
    role: "Blockchain Architect",
    expertise: ["Protocol Design", "C++", "ZK"],
    status: "Available",
  },
  {
    name: "Vitalik Buterin",
    role: "Ethereum Founder",
    expertise: ["Smart Contracts", "Research", "PoS"],
    status: "In Session",
  },
  {
    name: "Elena Nadolinski",
    role: "Iron Fish CEO",
    expertise: ["Privacy", "Rust", "L1 Design"],
    status: "Available",
  },
  {
    name: "Austin Griffith",
    role: "Ethereum Educator",
    expertise: ["Frontend", "Scaffold-eth", "Solidity"],
    status: "Available",
  },
  {
    name: "Stani Kulechov",
    role: "Aave Founder",
    expertise: ["DeFi", "Liquidity", "Social Graph"],
    status: "Away",
  },
  {
    name: "Hayden Adams",
    role: "Uniswap Creator",
    expertise: ["AMM", "Smart Contracts", "Math"],
    status: "Available",
  },
];

export default function MentorNetworkPage() {
  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <div
        className="fixed inset-0 z-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, #3b82f6 1px, transparent 0)",
          backgroundSize: "48px 48px",
        }}
      />

      <nav className="sticky top-0 z-50 border-b border-white/5 bg-black/80 backdrop-blur-xl">
        <div className="container mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/">
            <Logo alt="ETH Lima" className="h-7 w-auto" />
          </Link>
          <a
            href="https://t.me/javierdgtl"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 text-xs text-gray-500 hover:text-white transition-colors"
          >
            <HelpCircle className="w-3 h-3" />
            @javierdgtl
          </a>
        </div>
      </nav>

      <div className="relative z-10 container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/"
            className="text-xs text-gray-600 hover:text-white transition-colors mb-8 block"
          >
            ← Back to Home
          </Link>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="font-mono text-xs text-blue-400 mb-3 tracking-[0.3em] uppercase">
                {"// Mentor Network"}
              </div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tighter">
                Connect with{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                  Experts
                </span>
              </h1>
            </div>
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
              <input
                placeholder="Filter by expertise or name..."
                className="w-full h-11 pl-10 pr-4 rounded-xl bg-white/5 border border-white/10 text-sm focus:outline-none focus:border-blue-500/30 transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_MENTORS.map((mentor, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -4 }}
                className="bg-white/2 border border-white/8 rounded-xl p-6 flex flex-col hover:border-blue-500/30 transition-all"
              >
                {" "}
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-gray-800 to-gray-700 border border-white/10" />
                  <Badge
                    className={
                      mentor.status === "Available"
                        ? "bg-green-500/10 text-green-500 border-green-500/20"
                        : mentor.status === "In Session"
                          ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                          : "bg-gray-500/10 text-gray-500 border-gray-500/20"
                    }
                  >
                    {mentor.status}
                  </Badge>
                </div>
                <h3 className="text-lg font-bold mb-0.5">{mentor.name}</h3>
                <p className="text-sm text-gray-500 mb-4">{mentor.role}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {mentor.expertise.map((exp) => (
                    <Badge
                      key={exp}
                      variant="secondary"
                      className="bg-white/5 text-gray-400 border-white/5 text-[10px]"
                    >
                      {exp}
                    </Badge>
                  ))}
                </div>
                <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button className="text-gray-600 hover:text-white transition-colors">
                      <Globe className="w-4 h-4" />
                    </button>
                    <button className="text-gray-600 hover:text-white transition-colors">
                      <Globe className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-white transition-colors">
                      <Calendar className="w-4 h-4" />
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-black text-xs font-bold hover:bg-gray-200 transition-colors">
                      <MessageSquare className="w-3 h-3" /> Contact
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
