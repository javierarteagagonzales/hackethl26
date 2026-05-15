"use client";

import Link from "next/link";
import { LOGO_SRC } from "@/lib/asset-path";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  Code2, 
  Users, 
  MessageSquare, 
  Settings, 
  LogOut, 
  Trophy, 
  Calendar,
  ChevronRight,
  Bell,
  Search,
  ExternalLink
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function DashboardPage() {
  return (
    <div className="flex h-screen bg-black text-white font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 flex flex-col shrink-0 bg-[#050505]">
        <div className="p-6 border-b border-white/5">
          <Link href="/"><img src={LOGO_SRC} alt="ETH Lima" className="h-7 w-auto" /></Link>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {[
            { icon: <LayoutDashboard className="w-4 h-4" />, label: "Overview", active: true },
            { icon: <Code2 className="w-4 h-4" />, label: "My Projects", active: false },
            { icon: <Users className="w-4 h-4" />, label: "Team Finder", active: false },
            { icon: <Trophy className="w-4 h-4" />, label: "Prizes \u0026 Bounties", active: false },
            { icon: <Calendar className="w-4 h-4" />, label: "Schedule", active: false },
            { icon: <MessageSquare className="w-4 h-4" />, label: "Discord/Telegram", active: false },
          ].map((item) => (
            <button key={item.label} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${item.active ? "bg-white/5 text-white" : "text-gray-500 hover:text-white hover:bg-white/2"}`}>
              {item.icon} {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5 space-y-2">
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-500 hover:text-white transition-colors"><Settings className="w-4 h-4" /> Settings</button>
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-500 hover:text-red-400 transition-colors"><LogOut className="w-4 h-4" /> Logout</button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <header className="h-16 border-b border-white/5 flex items-center justify-between px-8 bg-black/40 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-full max-w-md hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
              <input placeholder="Search resources, projects..." className="w-full h-9 pl-10 pr-4 rounded-lg bg-white/5 border border-white/10 text-xs focus:outline-none focus:border-blue-500/30" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-gray-500 hover:text-white transition-colors"><Bell className="w-5 h-5" /><span className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full border-2 border-black" /></button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 border border-white/20" />
          </div>
        </header>

        <div className="p-8 space-y-8">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-2xl font-bold tracking-tight mb-1">Welcome, Hacker 👾</h1>
            <p className="text-gray-500 text-sm">Application Status: <span className="text-green-500 font-medium">Approved ✅</span></p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              {/* Active Project */}
              <section className="bg-white/2 border border-white/8 rounded-xl overflow-hidden">
                <div className="p-6 border-b border-white/5 flex items-center justify-between">
                  <h2 className="text-sm font-mono text-gray-500 uppercase tracking-widest">Active Project</h2>
                  <button className="text-xs text-blue-400 hover:underline">Edit Project</button>
                </div>
                <div className="p-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4 border border-dashed border-white/20">
                    <Code2 className="w-8 h-8 text-gray-600" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">No projects submitted yet</h3>
                  <p className="text-gray-500 text-sm mb-6 max-w-sm mx-auto">Start building your project for ETH Lima 2026. You can submit or edit your project until the deadline.</p>
                  <button className="h-10 px-6 rounded-lg bg-white text-black font-bold text-sm hover:bg-gray-200 transition-colors">Start Building</button>
                </div>
              </section>

              {/* Announcements */}
              <section className="space-y-4">
                <h2 className="text-sm font-mono text-gray-500 uppercase tracking-widest">Announcements</h2>
                <div className="space-y-3">
                  {[
                    { title: "Arbitrum Workshop tomorrow at 10 AM", time: "2h ago", type: "Event" },
                    { title: "Team formation session starting now on Discord", time: "5h ago", type: "Community" },
                  ].map((ann, i) => (
                    <div key={i} className="p-4 rounded-xl border border-white/5 bg-white/2 flex items-center justify-between hover:bg-white/4 transition-colors group cursor-pointer">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-[10px] uppercase font-mono py-0 px-2">{ann.type}</Badge>
                          <span className="text-sm font-medium">{ann.title}</span>
                        </div>
                        <span className="text-xs text-gray-600">{ann.time}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-700 group-hover:text-white transition-colors" />
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <div className="space-y-6">
              {/* Event Stats */}
              <section className="bg-white/2 border border-white/8 rounded-xl p-6 space-y-6">
                <h2 className="text-sm font-mono text-gray-500 uppercase tracking-widest">Event Stats</h2>
                <div className="space-y-4">
                  {[
                    { label: "Participants", val: "1,240" },
                    { label: "Teams", val: "312" },
                    { label: "Total Prize Pool", val: "$15,000" },
                  ].map(stat => (
                    <div key={stat.label} className="flex justify-between items-center border-b border-white/5 pb-2">
                      <span className="text-sm text-gray-500">{stat.label}</span>
                      <span className="text-sm font-mono text-blue-400 font-bold">{stat.val}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-4">
                  <div className="text-xs text-gray-600 mb-2">Hackathon Progress</div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden"><div className="h-full bg-blue-500 w-1/3" /></div>
                  <div className="flex justify-between mt-2 text-[10px] font-mono text-gray-700 uppercase"><span>Registration</span><span>Build</span><span>Demo Day</span></div>
                </div>
              </section>

              {/* Useful Links */}
              <section className="bg-white/2 border border-white/8 rounded-xl p-6 space-y-4">
                <h2 className="text-sm font-mono text-gray-500 uppercase tracking-widest">Quick Links</h2>
                <div className="space-y-2">
                  {["Official Rulebook", "Arbitrum Docs", "Technical Support", "Code of Conduct"].map(link => (
                    <a key={link} href="#" className="flex items-center justify-between text-sm text-gray-400 hover:text-white transition-all py-2 group">
                      {link} <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
