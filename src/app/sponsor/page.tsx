"use client";

import Link from "next/link";
import { LOGO_SRC } from "@/lib/asset-path";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, HelpCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SponsorPage() {
  const router = useRouter();
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); router.push("/"); };

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <div className="fixed inset-0 z-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #3b82f6 1px, transparent 0)", backgroundSize: "48px 48px" }} />
      <nav className="sticky top-0 z-50 border-b border-white/5 bg-black/80 backdrop-blur-xl">
        <div className="container mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/"><img src={LOGO_SRC} alt="ETH Lima" width={100} height={32} className="h-7 w-auto" /></Link>
          <a href="https://t.me/javierdgtl" target="_blank" rel="noreferrer" className="flex items-center gap-1 text-xs text-gray-500 hover:text-white transition-colors"><HelpCircle className="w-3 h-3" />@javierdgtl</a>
        </div>
      </nav>
      <div className="relative z-10 container mx-auto px-6 py-12 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Link href="/" className="text-xs text-gray-600 hover:text-white transition-colors mb-8 block">← Volver al inicio</Link>
          <div className="font-mono text-xs text-yellow-400 mb-3 tracking-[0.3em] uppercase">// Sponsor a Track</div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">Sponsor <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">Ethereum Lima</span></h1>
          <p className="text-gray-400 text-lg mb-12 max-w-2xl">Coloca tu protocolo frente a los mejores builders de LATAM. Define un challenge, ofrece premios y conecta con talento Web3.</p>
          <div className="grid md:grid-cols-3 gap-4 mb-14">
            {[
              { tier: "Track Sponsor", price: "Desde $1,000", perks: ["Tu propio track", "Logo en web", "Jurado en demos", "Acceso a proyectos"], color: "border-blue-500/30 bg-blue-500/5" },
              { tier: "Gold Sponsor", price: "Desde $3,000", perks: ["Track + Keynote slot", "Logo destacado", "Acceso a CVs", "Espacio físico"], color: "border-yellow-500/40 bg-yellow-500/5", featured: true },
              { tier: "Bounty Sponsor", price: "Desde $500", perks: ["Bounty challenge", "Mención en web", "Acceso a demos", "Networking"], color: "border-white/10 bg-white/2" },
            ].map((tier) => (
              <div key={tier.tier} className={`rounded-xl border p-6 ${tier.color} relative`}>
                {tier.featured && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-full">Más popular</div>}
                <div className="text-sm font-mono text-gray-400 mb-1">{tier.tier}</div>
                <div className="text-2xl font-bold mb-4">{tier.price}</div>
                <ul className="space-y-2">{tier.perks.map(p => (<li key={p} className="flex items-center gap-2 text-sm text-gray-300"><CheckCircle className="w-3.5 h-3.5 text-green-500 shrink-0" />{p}</li>))}</ul>
              </div>
            ))}
          </div>
          <div className="rounded-xl border border-white/8 bg-white/2 p-8">
            <h2 className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-6">Formulario de contacto</h2>
            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
              {[["Nombre", "Tu nombre"], ["Empresa / Protocolo", "ej. Arbitrum Foundation"]].map(([label, ph]) => (
                <div key={label}><label className="text-xs text-gray-500 block mb-1.5">{label}</label><input placeholder={ph} className="w-full h-10 px-3 rounded-lg bg-white/5 border border-white/10 text-sm placeholder:text-gray-700 focus:outline-none focus:border-yellow-500/50 transition-all" /></div>
              ))}
              <div><label className="text-xs text-gray-500 block mb-1.5">Email</label><input type="email" required placeholder="contact@protocol.io" className="w-full h-10 px-3 rounded-lg bg-white/5 border border-white/10 text-sm placeholder:text-gray-700 focus:outline-none focus:border-yellow-500/50 transition-all" /></div>
              <div><label className="text-xs text-gray-500 block mb-1.5">Tipo</label>
                <select className="w-full h-10 px-3 rounded-lg bg-white/5 border border-white/10 text-sm text-gray-300 focus:outline-none focus:border-yellow-500/50 transition-all appearance-none">
                  {["Track Sponsor", "Gold Sponsor", "Bounty Sponsor", "Otro"].map(o => <option key={o} className="bg-black">{o}</option>)}
                </select>
              </div>
              <div className="md:col-span-2"><label className="text-xs text-gray-500 block mb-1.5">Mensaje</label><textarea rows={3} placeholder="Cuéntanos qué quieres lograr..." className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm placeholder:text-gray-700 focus:outline-none focus:border-yellow-500/50 transition-all resize-none" /></div>
              <div className="md:col-span-2"><button type="submit" className="w-full h-11 rounded-lg bg-white text-black font-bold text-sm flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors">Enviar propuesta <ArrowRight className="w-4 h-4" /></button></div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
