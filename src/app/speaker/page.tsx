"use client";

import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { motion } from "framer-motion";
import { ArrowRight, HelpCircle, Mic, Monitor, Users } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SpeakerPage() {
  const router = useRouter();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <div
        className="fixed inset-0 z-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, #3b82f6 1px, transparent 0)",
          backgroundSize: "48px 48px",
        }}
      />
      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none z-0" />
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
      <div className="relative z-10 container mx-auto px-6 py-12 max-w-3xl">
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
          <div className="font-mono text-xs text-purple-400 mb-3 tracking-[0.3em] uppercase">
            {"// Speakers & Workshops"}
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">
            Speak at{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              ETH Lima
            </span>
          </h1>
          <p className="text-gray-400 text-lg mb-10 max-w-xl">
            Share your knowledge with hundreds of LATAM builders. Workshops, keynotes, and technical
            sessions in a hybrid format.
          </p>

          <div className="grid grid-cols-3 gap-3 mb-10">
            {[
              {
                icon: <Mic className="w-4 h-4 text-purple-400" />,
                label: "Format",
                val: "Keynote / Workshop",
              },
              {
                icon: <Monitor className="w-4 h-4 text-blue-400" />,
                label: "Modality",
                val: "In-person or online",
              },
              {
                icon: <Users className="w-4 h-4 text-green-400" />,
                label: "Audience",
                val: "200+ developers",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="border border-white/5 rounded-lg p-4 bg-white/2 text-center"
              >
                <div className="flex justify-center mb-2">{item.icon}</div>
                <div className="text-white font-semibold text-sm mb-1">{item.val}</div>
                <div className="text-xs text-gray-600">{item.label}</div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="rounded-xl border border-white/8 bg-white/2 p-6 space-y-4">
              <h2 className="text-xs font-mono text-gray-500 uppercase tracking-widest">
                01. Speaker Info
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  ["Full Name", "Your name"],
                  ["Email", "speaker@example.com"],
                  ["Twitter/X", "@yourhandle"],
                  ["LinkedIn", "linkedin.com/in/..."],
                  ["Company / Protocol", "e.g. Ethereum Foundation"],
                ].map(([l, ph]) => (
                  <div key={l}>
                    <label className="text-xs text-gray-500 block mb-1.5">{l}</label>
                    <input
                      placeholder={ph}
                      className="w-full h-10 px-3 rounded-lg bg-white/5 border border-white/10 text-sm placeholder:text-gray-700 focus:outline-none focus:border-purple-500/50 transition-all"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-white/8 bg-white/2 p-6 space-y-4">
              <h2 className="text-xs font-mono text-gray-500 uppercase tracking-widest">
                02. Proposal
              </h2>
              <div>
                <label className="text-xs text-gray-500 block mb-1.5">Talk / Workshop Title</label>
                <input
                  required
                  placeholder="e.g. Building on Arbitrum Orbit"
                  className="w-full h-10 px-3 rounded-lg bg-white/5 border border-white/10 text-sm placeholder:text-gray-700 focus:outline-none focus:border-purple-500/50 transition-all"
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-500 block mb-1.5">Format</label>
                  <select className="w-full h-10 px-3 rounded-lg bg-white/5 border border-white/10 text-sm text-gray-300 focus:outline-none focus:border-purple-500/50 transition-all appearance-none">
                    {[
                      "Keynote (20-30 min)",
                      "Technical Workshop (60-90 min)",
                      "Panel Discussion",
                      "Lightning talk (10 min)",
                    ].map((o) => (
                      <option key={o} className="bg-black">
                        {o}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-gray-500 block mb-1.5">Preferred Modality</label>
                  <select className="w-full h-10 px-3 rounded-lg bg-white/5 border border-white/10 text-sm text-gray-300 focus:outline-none focus:border-purple-500/50 transition-all appearance-none">
                    {["In-person in Lima", "Online / streaming", "Both"].map((o) => (
                      <option key={o} className="bg-black">
                        {o}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-500 block mb-1.5">Talk Description</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Describe what your talk is about, what attendees will learn and why it's relevant to the ecosystem..."
                  className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm placeholder:text-gray-700 focus:outline-none focus:border-purple-500/50 transition-all resize-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full h-12 rounded-lg bg-white text-black font-bold text-sm flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors"
            >
              Submit Proposal <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
