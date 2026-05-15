"use client";

import Link from "next/link";
import { LOGO_SRC } from "@/lib/asset-path";
import { motion } from "framer-motion";
import { LayoutDashboard, Trophy, Users, Code2, Bell, Settings, LogOut, ArrowUpRight, Zap } from "lucide-react";

const NOTIFICATIONS = [
  { msg: "Tu aplicación fue aprobada", time: "hace 2h", type: "success" },
  { msg: "Nuevo mentor disponible: Valentina Torres", time: "hace 5h", type: "info" },
  { msg: "Hackathon comienza en 10 días", time: "ayer", type: "warning" },
];

const PROJECTS = [
  { name: "ArbiSwap — DEX en Arbitrum", track: "Arbitrum", status: "En progreso", team: 3 },
  { name: "WikiChain — Knowledge Graph", track: "Arkiv", status: "Ideación", team: 2 },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-black text-white font-sans flex">
      <div className="fixed inset-0 z-0 opacity-5 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #3b82f6 1px, transparent 0)", backgroundSize: "48px 48px" }} />

      {/* Sidebar */}
      <aside className="hidden md:flex w-56 shrink-0 flex-col border-r border-white/5 bg-black/90 sticky top-0 h-screen z-20">
        <div className="p-5 border-b border-white/5">
          <Link href="/"><img src={LOGO_SRC} alt="ETH Lima" width={90} height={30} className="h-7 w-auto" /></Link>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {[
            { icon: <LayoutDashboard className="w-4 h-4" />, label: "Dashboard", active: true },
            { icon: <Code2 className="w-4 h-4" />, label: "Mi Proyecto" },
            { icon: <Users className="w-4 h-4" />, label: "Equipo" },
            { icon: <Trophy className="w-4 h-4" />, label: "Tracks" },
            { icon: <Bell className="w-4 h-4" />, label: "Notificaciones" },
            { icon: <Settings className="w-4 h-4" />, label: "Configuración" },
          ].map((item) => (
            <button key={item.label} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all ${item.active ? "bg-white/10 text-white" : "text-gray-500 hover:text-white hover:bg-white/5"}`}>
              {item.icon} {item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-white/5">
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-500 hover:text-red-400 transition-colors"><LogOut className="w-4 h-4" /> Salir</button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-10 border-b border-white/5 bg-black/80 backdrop-blur-xl h-14 flex items-center px-6 justify-between">
          <div>
            <span className="text-sm font-semibold text-white">Dashboard</span>
            <span className="ml-2 text-xs text-gray-600 font-mono">// hacker@ethlima.org</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs text-gray-500">Online</span>
          </div>
        </header>

        <main className="relative z-10 p-6 space-y-6">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-2xl font-bold tracking-tight mb-1">Bienvenido, Hacker 👾</h1>
            <p className="text-gray-500 text-sm">ETH Lima 2026 — Estado: <span className="text-green-400">Aplicación aprobada</span></p>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Días restantes", val: "71", color: "text-blue-400" },
              { label: "Tracks abiertos", val: "2", color: "text-purple-400" },
              { label: "Proyectos activos", val: "1", color: "text-green-400" },
              { label: "Mentores disponibles", val: "12", color: "text-yellow-400" },
            ].map((s) => (
              <div key={s.label} className="rounded-xl border border-white/5 bg-white/2 p-4">
                <div className={`text-3xl font-black mb-1 ${s.color}`}>{s.val}</div>
                <div className="text-xs text-gray-600 font-mono">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {/* Projects */}
            <div className="rounded-xl border border-white/8 bg-white/2 p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold">Mis Proyectos</h2>
                <button className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1">Nuevo <ArrowUpRight className="w-3 h-3" /></button>
              </div>
              <div className="space-y-3">
                {PROJECTS.map(p => (
                  <div key={p.name} className="flex items-center justify-between p-3 rounded-lg bg-white/3 border border-white/5 hover:bg-white/5 transition-colors cursor-pointer">
                    <div>
                      <div className="text-sm text-white font-medium">{p.name}</div>
                      <div className="text-xs text-gray-600 mt-0.5">{p.track} · {p.team} miembros</div>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full font-mono ${p.status === "En progreso" ? "bg-blue-500/15 text-blue-400" : "bg-white/5 text-gray-500"}`}>{p.status}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Notifications */}
            <div className="rounded-xl border border-white/8 bg-white/2 p-5">
              <h2 className="text-sm font-semibold mb-4">Notificaciones</h2>
              <div className="space-y-3">
                {NOTIFICATIONS.map((n, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-white/3 border border-white/5">
                    <Zap className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${n.type === "success" ? "text-green-400" : n.type === "warning" ? "text-yellow-400" : "text-blue-400"}`} />
                    <div>
                      <div className="text-sm text-gray-300">{n.msg}</div>
                      <div className="text-xs text-gray-600 mt-0.5 font-mono">{n.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tracks info */}
          <div className="rounded-xl border border-white/8 bg-white/2 p-5">
            <h2 className="text-sm font-semibold mb-4">Tracks del Hackathon</h2>
            <div className="grid md:grid-cols-2 gap-3">
              {[
                { name: "Arbitrum", desc: "Construye en Ethereum L2", pool: "$2,100", color: "from-blue-500 to-cyan-400" },
                { name: "Arkiv", desc: "Jobs, Wikis & Events platform", pool: "$2,500 USDC", color: "from-purple-500 to-pink-400" },
              ].map(t => (
                <div key={t.name} className="flex items-center justify-between p-4 rounded-lg border border-white/5 bg-white/3">
                  <div>
                    <div className={`text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r ${t.color}`}>{t.name}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{t.desc}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-mono text-green-400 font-bold">{t.pool}</div>
                    <div className="text-xs text-gray-600">prize pool</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
