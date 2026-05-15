"use client";

import Link from "next/link";
import { LOGO_SRC } from "@/lib/asset-path";
import { motion } from "framer-motion";
import { Star, Clock, Users, MessageSquare, HelpCircle } from "lucide-react";

const MENTORS = [
  { name: "Valentina Torres", role: "Smart Contract Auditor @ Certik", expertise: ["Smart Contracts", "Seguridad", "DeFi"], available: true },
  { name: "Rodrigo Sánchez", role: "Protocol Engineer @ Arbitrum", expertise: ["Layer 2", "Rollups", "Solidity"], available: true },
  { name: "Camila Pérez", role: "DeFi Lead @ Aave LATAM", expertise: ["DeFi", "Tokenomics", "Frontend Web3"], available: false },
  { name: "Diego Alvarado", role: "Founder @ Web3PE", expertise: ["Product", "UX Web3", "Go-to-Market"], available: true },
];

export default function MentorPage() {
  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <div className="fixed inset-0 z-0 opacity-8 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #3b82f6 1px, transparent 0)", backgroundSize: "48px 48px" }} />
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-teal-600/8 blur-[130px] rounded-full pointer-events-none z-0" />

      <nav className="sticky top-0 z-50 border-b border-white/5 bg-black/80 backdrop-blur-xl">
        <div className="container mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/"><img src={LOGO_SRC} alt="ETH Lima" width={100} height={32} className="h-7 w-auto" /></Link>
          <a href="https://t.me/javierdgtl" target="_blank" rel="noreferrer" className="flex items-center gap-1 text-xs text-gray-500 hover:text-white transition-colors"><HelpCircle className="w-3 h-3" />@javierdgtl</a>
        </div>
      </nav>

      <div className="relative z-10 container mx-auto px-6 py-12 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Link href="/" className="text-xs text-gray-600 hover:text-white transition-colors mb-8 block">← Volver al inicio</Link>

          <div className="font-mono text-xs text-teal-400 mb-3 tracking-[0.3em] uppercase">// Mentors network</div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">Nuestros <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-green-400">Mentores</span></h1>
          <p className="text-gray-400 text-lg mb-12 max-w-2xl">Expertos del ecosistema Web3 listos para guiarte durante el hackathon. Cada equipo tendrá acceso a sesiones 1:1 con mentores especializados.</p>

          <div className="grid md:grid-cols-2 gap-4 mb-12">
            {MENTORS.map((mentor) => (
              <motion.div key={mentor.name} whileHover={{ y: -3 }} className="rounded-xl border border-white/8 bg-white/2 p-6 hover:border-white/15 transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="font-bold text-white">{mentor.name}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{mentor.role}</div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full font-mono ${mentor.available ? "bg-green-500/15 text-green-400" : "bg-white/5 text-gray-600"}`}>
                    {mentor.available ? "Disponible" : "No disponible"}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {mentor.expertise.map(e => (
                    <span key={e} className="text-xs px-2 py-1 rounded-md bg-white/5 border border-white/5 text-gray-400">{e}</span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <button className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 transition-colors"><MessageSquare className="w-3 h-3" /> Contactar</button>
                  <button className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 transition-colors"><Clock className="w-3 h-3" /> Agendar</button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-4 mb-12">
            {[
              { icon: <Users className="w-5 h-5 text-blue-400" />, val: "12+", label: "Mentores activos" },
              { icon: <Star className="w-5 h-5 text-yellow-400" />, val: "4.9", label: "Rating promedio" },
              { icon: <Clock className="w-5 h-5 text-green-400" />, val: "48h", label: "Disponibilidad" },
            ].map(s => (
              <div key={s.label} className="rounded-xl border border-white/5 bg-white/2 p-5 text-center">
                <div className="flex justify-center mb-2">{s.icon}</div>
                <div className="text-2xl font-black text-white mb-1">{s.val}</div>
                <div className="text-xs text-gray-600">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-teal-500/20 bg-teal-500/5 p-6 text-center">
            <h2 className="text-xl font-bold mb-2">¿Eres experto en Web3?</h2>
            <p className="text-gray-400 text-sm mb-4">Únete a nuestra red de mentores y ayuda a los builders del futuro.</p>
            <Link href="/apply-mentor" className="inline-flex items-center gap-2 h-10 px-6 rounded-lg bg-white text-black font-semibold text-sm hover:bg-gray-100 transition-colors">
              Postular como mentor →
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
