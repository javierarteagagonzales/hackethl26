"use client";

import Link from "next/link";
import { LOGO_SRC } from "@/lib/asset-path";
import { motion } from "framer-motion";
import { 
  Users, 
  Settings, 
  LogOut, 
  Trophy, 
  Search,
  Filter,
  CheckCircle,
  XCircle,
  MoreVertical,
  Download,
  LayoutDashboard,
  ShieldCheck,
  Zap
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { getApplicants, updateParticipantStatus } from "@/app/actions/admin";

export default function AdminPage() {
  const [applicants, setApplicants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplicants();
  }, []);

  const fetchApplicants = async () => {
    setLoading(true);
    const result = await getApplicants();
    if (result.success) {
      setApplicants(result.applicants);
    }
    setLoading(false);
  };

  const handleUpdateStatus = async (id: string, status: "APPROVED" | "REJECTED") => {
    const result = await updateParticipantStatus(id, status);
    if (result.success) {
      fetchApplicants();
    }
  };

  return (
    <div className="flex h-screen bg-black text-white font-sans overflow-hidden">
      {/* Sidebar Admin */}
      <aside className="w-64 border-r border-white/5 flex flex-col shrink-0 bg-[#080808]">
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <Link href="/"><img src={LOGO_SRC} alt="ETH Lima" className="h-7 w-auto" /></Link>
          <Badge className="bg-red-500/10 text-red-500 border-red-500/20 text-[10px]">ADMIN</Badge>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {[
            { icon: <LayoutDashboard className="w-4 h-4" />, label: "Overview", active: true },
            { icon: <Users className="w-4 h-4" />, label: "Applicants", active: false },
            { icon: <Trophy className="w-4 h-4" />, label: "Track Management", active: false },
            { icon: <ShieldCheck className="w-4 h-4" />, label: "Role Requests", active: false },
            { icon: <Zap className="w-4 h-4" />, label: "Broadcast", active: false },
          ].map((item) => (
            <button key={item.label} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${item.active ? "bg-red-500/5 text-red-400" : "text-gray-500 hover:text-white hover:bg-white/2"}`}>
              {item.icon} {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5 space-y-2">
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-500 hover:text-white transition-colors"><Settings className="w-4 h-4" /> System Settings</button>
          <Link href="/" className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-500 hover:text-red-400 transition-colors"><LogOut className="w-4 h-4" /> Logout</Link>
        </div>
      </aside>

      {/* Admin Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto bg-black">
        <header className="h-16 border-b border-white/5 flex items-center justify-between px-8 bg-black/40 backdrop-blur-md sticky top-0 z-10">
          <h2 className="text-sm font-bold tracking-tight">Admin Control Panel</h2>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 text-xs text-gray-400 hover:text-white transition-colors"><Download className="w-3 h-3" /> Export CSV</button>
            <div className="w-8 h-8 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center text-red-500 text-xs font-bold">A</div>
          </div>
        </header>

        <div className="p-8 space-y-8">
          {/* KPIs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: "Total Applicants", val: applicants.length.toString(), trend: "+0%" },
              { label: "Approved Hackers", val: applicants.filter(a => a.status === "APPROVED").length.toString(), trend: "+0%" },
              { label: "Mentors", val: "0", trend: "0%" },
              { label: "Track Sponsors", val: "0", trend: "+0" },
            ].map((stat, i) => (
              <div key={i} className="bg-white/2 border border-white/8 p-6 rounded-xl space-y-2">
                <div className="text-xs text-gray-600 font-mono uppercase tracking-widest">{stat.label}</div>
                <div className="flex items-end justify-between">
                  <div className="text-2xl font-bold">{stat.val}</div>
                  <div className="text-[10px] text-green-500 bg-green-500/10 px-1.5 py-0.5 rounded">{stat.trend}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Table */}
          <section className="bg-white/2 border border-white/8 rounded-xl overflow-hidden">
            <div className="p-6 border-b border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest">Recent Applications</h3>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                  <input placeholder="Search applicants..." className="w-full h-9 pl-10 pr-4 rounded-lg bg-black border border-white/10 text-xs focus:outline-none focus:border-red-500/30" />
                </div>
                <button className="p-2 border border-white/10 rounded-lg text-gray-500 hover:text-white"><Filter className="w-4 h-4" /></button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/5 bg-white/2 font-mono text-[10px] text-gray-600 uppercase tracking-widest">
                    <th className="py-4 pl-8 pr-4">Name</th>
                    <th className="py-4 px-4">Github</th>
                    <th className="py-4 px-4">Wallet</th>
                    <th className="py-4 px-4">Date</th>
                    <th className="py-4 px-4 text-center">Status</th>
                    <th className="py-4 pl-4 pr-8 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {loading ? (
                    <tr><td colSpan={6} className="py-20 text-center text-gray-500">Loading applicants...</td></tr>
                  ) : applicants.length === 0 ? (
                    <tr><td colSpan={6} className="py-20 text-center text-gray-500">No applicants found.</td></tr>
                  ) : applicants.map((app) => (
                    <tr key={app.id} className="hover:bg-white/2 transition-colors">
                      <td className="py-4 pl-8 pr-4 font-medium">{app.name}</td>
                      <td className="py-4 px-4 text-gray-400 font-mono text-xs">{app.github || "-"}</td>
                      <td className="py-4 px-4 text-gray-400 font-mono text-xs">{app.walletAddress ? `${app.walletAddress.slice(0, 6)}...${app.walletAddress.slice(-4)}` : "-"}</td>
                      <td className="py-4 px-4 font-mono text-xs text-gray-600">{new Date(app.createdAt).toLocaleDateString()}</td>
                      <td className="py-4 px-4">
                        <div className="flex justify-center">
                          <Badge className={
                            app.status === "APPROVED" ? "bg-green-500/10 text-green-500 border-green-500/20" : 
                            app.status === "PENDING" ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/20" : 
                            "bg-red-500/10 text-red-500 border-red-500/20"
                          }>
                            {app.status}
                          </Badge>
                        </div>
                      </td>
                      <td className="py-4 pl-4 pr-8 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={() => handleUpdateStatus(app.id, "APPROVED")} className="p-1.5 rounded bg-green-500/10 text-green-500 hover:bg-green-500/20 transition-colors"><CheckCircle className="w-4 h-4" /></button>
                          <button onClick={() => handleUpdateStatus(app.id, "REJECTED")} className="p-1.5 rounded bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors"><XCircle className="w-4 h-4" /></button>
                          <button className="p-1.5 rounded text-gray-600 hover:text-white transition-colors"><MoreVertical className="w-4 h-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
