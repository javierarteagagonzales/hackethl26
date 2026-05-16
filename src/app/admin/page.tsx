"use client";

import Link from "next/link";
import { LOGO_SRC } from "@/lib/asset-path";
import { motion, AnimatePresence } from "framer-motion";
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
  Zap,
  Code2,
  ExternalLink,
  Globe,
  Video
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { getApplicants, updateParticipantStatus, getProjects, getStats } from "@/app/actions/admin";
import { getTracks, createTrack, getSponsors, createSponsor } from "@/app/actions/tracks";
import { toast } from "sonner";

type Tab = "overview" | "applicants" | "projects" | "tracks";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [applicants, setApplicants] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [tracks, setTracks] = useState<any[]>([]);
  const [sponsors, setSponsors] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const [appRes, projRes, statsRes, tracksRes, sponsorsRes] = await Promise.all([
      getApplicants(),
      getProjects(),
      getStats(),
      getTracks(),
      getSponsors()
    ]);

    if (appRes.success) setApplicants(appRes.applicants || []);
    if (projRes.success) setProjects(projRes.projects || []);
    if (statsRes.success) setStats(statsRes.stats || { users: 0, teams: 0, projects: 0 });
    if (tracksRes.success) setTracks(tracksRes.tracks || []);
    if (sponsorsRes.success) setSponsors(sponsorsRes.sponsors || []);
    setLoading(false);
  };

  const handleUpdateStatus = async (id: string, status: "APPROVED" | "REJECTED") => {
    const result = await updateParticipantStatus(id, status);
    if (result.success) {
      toast.success(`Applicant ${status.toLowerCase()}`);
      loadData();
    }
  };

  const handleCreateSponsor = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCreating(true);
    const formData = new FormData(e.currentTarget);
    const result = await createSponsor(formData);
    if (result.success) {
      toast.success("Sponsor created");
      loadData();
      (e.target as HTMLFormElement).reset();
    } else {
      toast.error(result.error || "Error");
    }
    setCreating(false);
  };

  const handleCreateTrack = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCreating(true);
    const formData = new FormData(e.currentTarget);
    const result = await createTrack(formData);
    if (result.success) {
      toast.success("Track created");
      loadData();
      (e.target as HTMLFormElement).reset();
    } else {
      toast.error(result.error || "Error");
    }
    setCreating(false);
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
            { id: "overview", icon: <LayoutDashboard className="w-4 h-4" />, label: "Overview" },
            { id: "applicants", icon: <Users className="w-4 h-4" />, label: "Applicants" },
            { id: "projects", icon: <Code2 className="w-4 h-4" />, label: "Projects" },
            { id: "tracks", icon: <Trophy className="w-4 h-4" />, label: "Track Management" },
          ].map((item) => (
            <button 
              key={item.id} 
              onClick={() => (item.id as any) && setActiveTab(item.id as Tab)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${activeTab === item.id ? "bg-red-500/5 text-red-400" : "text-gray-500 hover:text-white hover:bg-white/2"}`}
            >
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
          <h2 className="text-sm font-bold tracking-tight uppercase font-mono text-gray-400">
            // Admin Control Panel <span className="text-white mx-2">/</span> {activeTab}
          </h2>
          <div className="flex items-center gap-4">
            <button onClick={loadData} className="p-2 rounded-lg border border-white/10 text-xs text-gray-400 hover:text-white transition-colors">Refresh Data</button>
            <div className="w-8 h-8 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center text-red-500 text-xs font-bold">A</div>
          </div>
        </header>

        <div className="p-8 space-y-8">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { label: "Total Applicants", val: stats?.totalUsers || "0", color: "text-blue-400" },
                  { label: "Approved Hackers", val: stats?.approvedUsers || "0", color: "text-green-400" },
                  { label: "Active Teams", val: stats?.totalTeams || "0", color: "text-purple-400" },
                  { label: "Projects Submitted", val: stats?.totalProjects || "0", color: "text-yellow-400" },
                ].map((stat, i) => (
                  <div key={i} className="bg-white/2 border border-white/8 p-6 rounded-xl space-y-2">
                    <div className="text-xs text-gray-600 font-mono uppercase tracking-widest">{stat.label}</div>
                    <div className={`text-3xl font-bold ${stat.color}`}>{stat.val}</div>
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <section className="bg-white/2 border border-white/8 rounded-xl p-6">
                  <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-6">Recent Activity</h3>
                  <div className="space-y-4">
                    {applicants.slice(0, 5).map((app) => (
                      <div key={app.id} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">{app.name}</span>
                          <span className="text-[10px] text-gray-600 font-mono uppercase">Applied as Hacker</span>
                        </div>
                        <Badge className="text-[9px]">{new Date(app.createdAt).toLocaleDateString()}</Badge>
                      </div>
                    ))}
                  </div>
                </section>
                
                <section className="bg-white/2 border border-white/8 rounded-xl p-6">
                  <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-6">Project Submissions</h3>
                  <div className="space-y-4">
                    {projects.slice(0, 5).map((proj) => (
                      <div key={proj.id} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">{proj.name}</span>
                          <span className="text-[10px] text-gray-600 font-mono uppercase">By {proj.team?.name}</span>
                        </div>
                        <CheckCircle className="w-4 h-4 text-green-500/50" />
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          )}

          {/* Applicants Tab */}
          {activeTab === "applicants" && (
            <section className="bg-white/2 border border-white/8 rounded-xl overflow-hidden">
              <div className="p-6 border-b border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest">Hacker Management</h3>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <div className="relative flex-1 sm:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                    <input placeholder="Search applicants..." className="w-full h-9 pl-10 pr-4 rounded-lg bg-black border border-white/10 text-xs focus:outline-none focus:border-red-500/30" />
                  </div>
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
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* Tracks Tab */}
          {activeTab === "tracks" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <section className="bg-white/2 border border-white/8 rounded-xl overflow-hidden">
                  <div className="p-6 border-b border-white/5">
                    <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest">Existing Tracks</h3>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-1 gap-4">
                      {tracks.map((track) => (
                        <div key={track.id} className="p-4 rounded-lg border border-white/5 bg-white/2 flex items-center justify-between group">
                          <div className="flex items-center gap-4">
                            <div className={`w-2 h-12 rounded-full bg-gradient-to-b ${track.color || "from-gray-500 to-gray-700"}`} />
                            <div>
                              <h4 className="font-bold">{track.title}</h4>
                              <p className="text-xs text-gray-500">{track.sponsor?.name || "No Sponsor"}</p>
                            </div>
                          </div>
                          <button className="text-xs text-gray-600 hover:text-white transition-colors">Edit</button>
                        </div>
                      ))}
                      {tracks.length === 0 && <div className="text-center py-8 text-gray-600 text-sm">No tracks found. Create one.</div>}
                    </div>
                  </div>
                </section>

                <section className="bg-white/2 border border-white/8 rounded-xl overflow-hidden">
                  <div className="p-6 border-b border-white/5">
                    <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest">Sponsors</h3>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {sponsors.map((sponsor) => (
                        <div key={sponsor.id} className="p-4 rounded-lg border border-white/5 bg-white/2 flex flex-col items-center justify-center text-center group relative">
                          {sponsor.logoUrl ? (
                            <img src={sponsor.logoUrl} alt={sponsor.name} className="h-8 w-auto object-contain mb-2 grayscale group-hover:grayscale-0 transition-all" />
                          ) : (
                            <ShieldCheck className="w-8 h-8 text-gray-700 mb-2" />
                          )}
                          <span className="text-xs font-medium text-gray-400">{sponsor.name}</span>
                        </div>
                      ))}
                      {sponsors.length === 0 && <div className="col-span-full text-center py-8 text-gray-600 text-sm">No sponsors found.</div>}
                    </div>
                  </div>
                </section>
              </div>

              <div className="space-y-8">
                {/* Create Sponsor Form */}
                <section className="bg-white/2 border border-white/8 rounded-xl p-6">
                  <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-6">Add Sponsor</h3>
                  <form onSubmit={handleCreateSponsor} className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] text-gray-500 font-mono uppercase">Name</label>
                      <input name="name" required placeholder="Arbitrum Foundation" className="w-full h-9 px-3 rounded-lg bg-black border border-white/10 text-xs focus:outline-none focus:border-red-500/30" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] text-gray-500 font-mono uppercase">Logo URL</label>
                      <input name="logoUrl" placeholder="https://..." className="w-full h-9 px-3 rounded-lg bg-black border border-white/10 text-xs focus:outline-none focus:border-red-500/30" />
                    </div>
                    <button type="submit" disabled={creating} className="w-full h-9 rounded-lg bg-white text-black font-bold text-xs hover:bg-gray-200 transition-colors disabled:opacity-50">
                      {creating ? "Creating..." : "Add Sponsor"}
                    </button>
                  </form>
                </section>

                {/* Create Track Form */}
                <section className="bg-white/2 border border-white/8 rounded-xl p-6">
                  <h3 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-6">Add Track</h3>
                  <form onSubmit={handleCreateTrack} className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] text-gray-500 font-mono uppercase">Title</label>
                      <input name="title" required placeholder="Scaling Future" className="w-full h-9 px-3 rounded-lg bg-black border border-white/10 text-xs focus:outline-none focus:border-red-500/30" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] text-gray-500 font-mono uppercase">Sponsor</label>
                      <select name="sponsorId" className="w-full h-9 px-3 rounded-lg bg-black border border-white/10 text-xs text-gray-400 focus:outline-none focus:border-red-500/30">
                        <option value="">None</option>
                        {sponsors.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] text-gray-500 font-mono uppercase">Color (Tailwind classes)</label>
                      <input name="color" placeholder="from-blue-500 to-cyan-500" className="w-full h-9 px-3 rounded-lg bg-black border border-white/10 text-xs focus:outline-none focus:border-red-500/30" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] text-gray-500 font-mono uppercase">Description</label>
                      <textarea name="description" rows={3} placeholder="Track description..." className="w-full p-3 rounded-lg bg-black border border-white/10 text-xs focus:outline-none focus:border-red-500/30 resize-none" />
                    </div>
                    <button type="submit" disabled={creating} className="w-full h-9 rounded-lg bg-red-600 text-white font-bold text-xs hover:bg-red-500 transition-colors disabled:opacity-50">
                      {creating ? "Creating..." : "Add Track"}
                    </button>
                  </form>
                </section>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
