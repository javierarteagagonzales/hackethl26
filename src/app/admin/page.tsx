"use client";

import Link from "next/link";
import { LOGO_SRC } from "@/lib/asset-path";
import { motion } from "framer-motion";
import { LayoutDashboard, Trophy, Users, Code2, Settings, LogOut, ArrowUpRight, CheckCircle, AlertCircle, Clock, Shield } from "lucide-react";

const MOCK_APPLICANTS = [
  { name: "Carlos Mendiola", email: "carlos@dev.pe", track: "Arbitrum", status: "approved", skill: "Smart Contract" },
  { name: "Sofia Quispe", email: "sofia@ux.io", track: "Arkiv", status: "pending", skill: "UI/UX Designer" },
  { name: "Diego Flores", email: "diego@backend.co", track: "Arbitrum", status: "pending", skill: "Backend Dev" },
  { name: "Valentina Cruz", email: "val@web3.pe", track: "Arkiv", status: "approved", skill: "Frontend Dev" },
  { name: "Miguel Torres", email: "miguel@solidity.io", track: "Arbitrum", status: "review", skill: "Smart Contract" },
];

const STATUS_STYLES: Record<string, string> = {
  approved: "bg-green-500/15 text-green-400",
  pending: "bg-yellow-500/15 text-yellow-400",
  review: "bg-blue-500/15 text-blue-400",
  rejected: "bg-red-500/15 text-red-400",
};

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-black text-white font-sans flex">
      <div className="fixed inset-0 z-0 opacity-5 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #ef4444 1px, transparent 0)", backgroundSize: "48px 48px" }} />

      {/* Sidebar */}
      <aside className="hidden md:flex w-56 shrink-0 flex-col border-r border-white/5 bg-black/90 sticky top-0 h-screen z-20">
        <div className="p-5 border-b border-white/5 flex items-center gap-2">
          <Link href="/"><img src={LOGO_SRC} alt="ETH Lima" width={90} height={30} className="h-7 w-auto" /></Link>
          <span className="text-[10px] font-mono text-red-400 border border-red-400/30 px-1.5 py-0.5 rounded">ADMIN</span>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {[
            { icon: <LayoutDashboard className="w-4 h-4" />, label: "Overview", active: true },
            { icon: <Users className="w-4 h-4" />, label: "Participantes" },
            { icon: <Trophy className="w-4 h-4" />, label: "Tracks" },
            { icon: <Code2 className="w-4 h-4" />, label: "Proyectos" },
            { icon: <Shield className="w-4 h-4" />, label: "Mentores" },
            { icon: <Settings className="w-4 h-4" />, label: "Configuración" },
          ].map((item) => (
            <button key={item.label} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all ${item.active ? "bg-white/10 text-white" : "text-gray-500 hover:text-white hover:bg-white/5"}`}>
              {item.icon} {item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-white/5">
          <Link href="/" className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-500 hover:text-red-400 transition-colors"><LogOut className="w-4 h-4" /> Cerrar sesión</Link>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-10 border-b border-white/5 bg-black/80 backdrop-blur-xl h-14 flex items-center px-6 justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-white">Admin Panel</span>
            <span className="text-[10px] font-mono text-red-400 border border-red-400/30 px-1.5 py-0.5 rounded">super@ethlima.org</span>
          </div>
        </header>

        <main className="relative z-10 p-6 space-y-6">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-2xl font-bold tracking-tight mb-1">Panel de Administración</h1>
            <p className="text-gray-500 text-sm font-mono">ETH Lima 2026 — <span className="text-red-400">Superadmin</span></p>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Total aplicantes", val: "248", icon: <Users className="w-4 h-4 text-blue-400" />, delta: "+12 hoy" },
              { label: "Aprobados", val: "186", icon: <CheckCircle className="w-4 h-4 text-green-400" />, delta: "75.0%" },
              { label: "En revisión", val: "34", icon: <Clock className="w-4 h-4 text-yellow-400" />, delta: "Pendientes" },
              { label: "Proyectos", val: "89", icon: <Code2 className="w-4 h-4 text-purple-400" />, delta: "Activos" },
            ].map((s) => (
              <div key={s.label} className="rounded-xl border border-white/5 bg-white/2 p-4">
                <div className="flex items-center justify-between mb-2">{s.icon}<span className="text-xs text-gray-600 font-mono">{s.delta}</span></div>
                <div className="text-3xl font-black text-white mb-1">{s.val}</div>
                <div className="text-xs text-gray-600">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Track overview */}
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { name: "Arbitrum", applicants: 142, approved: 108, pool: "$2,100", color: "bg-blue-500" },
              { name: "Arkiv", applicants: 106, approved: 78, pool: "$2,500 USDC", color: "bg-purple-500" },
            ].map(t => (
              <div key={t.name} className="rounded-xl border border-white/8 bg-white/2 p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2"><div className={`w-2.5 h-2.5 rounded-full ${t.color}`} /><h3 className="font-semibold">{t.name} Track</h3></div>
                  <span className="text-xs font-mono text-green-400">{t.pool}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-400 mb-2">
                  <span>Aplicantes: <span className="text-white">{t.applicants}</span></span>
                  <span>Aprobados: <span className="text-green-400">{t.approved}</span></span>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div className={`h-full ${t.color} rounded-full`} style={{ width: `${(t.approved / t.applicants) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>

          {/* Applicants table */}
          <div className="rounded-xl border border-white/8 bg-white/2 p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold">Aplicantes recientes</h2>
              <button className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1">Ver todos <ArrowUpRight className="w-3 h-3" /></button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-gray-600 font-mono uppercase tracking-wider border-b border-white/5">
                    <th className="pb-3 pr-4">Nombre</th>
                    <th className="pb-3 pr-4">Track</th>
                    <th className="pb-3 pr-4">Habilidad</th>
                    <th className="pb-3">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {MOCK_APPLICANTS.map((a) => (
                    <tr key={a.email} className="hover:bg-white/2 transition-colors">
                      <td className="py-3 pr-4">
                        <div className="text-white font-medium">{a.name}</div>
                        <div className="text-xs text-gray-600 font-mono">{a.email}</div>
                      </td>
                      <td className="py-3 pr-4 text-gray-400">{a.track}</td>
                      <td className="py-3 pr-4 text-gray-400">{a.skill}</td>
                      <td className="py-3">
                        <span className={`text-xs px-2 py-1 rounded-full font-mono ${STATUS_STYLES[a.status]}`}>{a.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick actions */}
          <div className="rounded-xl border border-white/8 bg-white/2 p-5">
            <h2 className="text-sm font-semibold mb-4">Acciones rápidas</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: "Agregar Track", icon: <Trophy className="w-4 h-4 text-yellow-400" /> },
                { label: "Invitar Mentor", icon: <Shield className="w-4 h-4 text-green-400" /> },
                { label: "Nuevo Anuncio", icon: <AlertCircle className="w-4 h-4 text-blue-400" /> },
                { label: "Exportar CSV", icon: <ArrowUpRight className="w-4 h-4 text-purple-400" /> },
              ].map(action => (
                <button key={action.label} className="flex flex-col items-center justify-center gap-2 p-4 rounded-lg border border-white/5 bg-white/2 hover:bg-white/5 transition-colors text-sm text-gray-400 hover:text-white">
                  {action.icon} {action.label}
                </button>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
