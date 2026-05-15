"use client";

import Link from "next/link";
import { LOGO_SRC } from "@/lib/asset-path";
import { motion } from "framer-motion";
import { ArrowRight, HelpCircle, Star, Clock, Users } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ApplyMentorPage() {
  const router = useRouter();
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); router.push("/"); };

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <div className="fixed inset-0 z-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #3b82f6 1px, transparent 0)", backgroundSize: "48px 48px" }} />
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-green-600/8 blur-[120px] rounded-full pointer-events-none z-0" />
      <nav className="sticky top-0 z-50 border-b border-white/5 bg-black/80 backdrop-blur-xl">
        <div className="container mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/"><img src={LOGO_SRC} alt="ETH Lima" width={100} height={32} className="h-7 w-auto" /></Link>
          <a href="https://t.me/javierdgtl" target="_blank" rel="noreferrer" className="flex items-center gap-1 text-xs text-gray-500 hover:text-white transition-colors"><HelpCircle className="w-3 h-3" />@javierdgtl</a>
        </div>
      </nav>
      <div className="relative z-10 container mx-auto px-6 py-12 max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Link href="/" className="text-xs text-gray-600 hover:text-white transition-colors mb-8 block">← Volver al inicio</Link>
          <div className="font-mono text-xs text-green-400 mb-3 tracking-[0.3em] uppercase">// Mentors program</div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">Sé un <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-400">Mentor</span></h1>
          <p className="text-gray-400 text-lg mb-10 max-w-xl">Guía a la próxima generación de builders Web3 de LATAM. Comparte tu experiencia en 48 horas que marcan la diferencia.</p>

          <div className="grid grid-cols-3 gap-3 mb-10">
            {[
              { icon: <Clock className="w-4 h-4 text-green-400" />, label: "Compromiso", val: "~6h online/presencial" },
              { icon: <Users className="w-4 h-4 text-blue-400" />, label: "Equipos a guiar", val: "2-4 equipos" },
              { icon: <Star className="w-4 h-4 text-yellow-400" />, label: "Reconocimiento", val: "Certificado + NFT" },
            ].map((item) => (
              <div key={item.label} className="border border-white/5 rounded-lg p-4 bg-white/2 text-center">
                <div className="flex justify-center mb-2">{item.icon}</div>
                <div className="text-white font-semibold text-sm mb-1">{item.val}</div>
                <div className="text-xs text-gray-600">{item.label}</div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="rounded-xl border border-white/8 bg-white/2 p-6 space-y-4">
              <h2 className="text-xs font-mono text-gray-500 uppercase tracking-widest">01. Información personal</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[["Nombre completo", "Javier Arteaga"], ["Email", "mentor@example.com"], ["LinkedIn", "linkedin.com/in/..."], ["Twitter/X", "@tuhandle"]].map(([l, ph]) => (
                  <div key={l}><label className="text-xs text-gray-500 block mb-1.5">{l}</label><input placeholder={ph} className="w-full h-10 px-3 rounded-lg bg-white/5 border border-white/10 text-sm placeholder:text-gray-700 focus:outline-none focus:border-green-500/50 transition-all" /></div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-white/8 bg-white/2 p-6 space-y-4">
              <h2 className="text-xs font-mono text-gray-500 uppercase tracking-widest">02. Experiencia técnica</h2>
              <div><label className="text-xs text-gray-500 block mb-1.5">Áreas de expertise</label>
                <div className="grid grid-cols-2 gap-2">
                  {["Smart Contracts", "DeFi", "Layer 2 / Rollups", "Frontend Web3", "Backend / Infra", "Seguridad / Auditoría", "Product/UX", "Tokenomics"].map(area => (
                    <label key={area} className="flex items-center gap-2 text-sm text-gray-300 p-2 rounded-lg border border-white/5 hover:bg-white/5 cursor-pointer">
                      <input type="checkbox" className="accent-green-500" /> {area}
                    </label>
                  ))}
                </div>
              </div>
              <div><label className="text-xs text-gray-500 block mb-1.5">Años de experiencia en Web3</label>
                <select className="w-full h-10 px-3 rounded-lg bg-white/5 border border-white/10 text-sm text-gray-300 focus:outline-none focus:border-green-500/50 transition-all appearance-none">
                  {["< 1 año", "1-2 años", "3-5 años", "5+ años"].map(o => <option key={o} className="bg-black">{o}</option>)}
                </select>
              </div>
              <div><label className="text-xs text-gray-500 block mb-1.5">¿Por qué quieres mentorear?</label><textarea rows={3} placeholder="Cuéntanos tu motivación..." className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm placeholder:text-gray-700 focus:outline-none focus:border-green-500/50 transition-all resize-none" /></div>
            </div>

            <button type="submit" className="w-full h-12 rounded-lg bg-white text-black font-bold text-sm flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors">
              Postular como Mentor <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
