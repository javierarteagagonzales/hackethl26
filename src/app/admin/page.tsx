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
  Video,
  BarChart3,
  Mail,
  UserCheck,
  Package,
  Clock
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { getApplicants, updateParticipantStatus, getProjects, getStats } from "@/app/actions/admin";
import { getTracks, createTrack, getSponsors, createSponsor } from "@/app/actions/tracks";
import { toast } from "sonner";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

type Tab = "overview" | "applicants" | "projects" | "tracks";

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [applicants, setApplicants] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [tracks, setTracks] = useState<any[]>([]);
  const [sponsors, setSponsors] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated") {
      if (session.user?.role !== "ADMIN" && session.user?.role !== "SUPERADMIN") {
        router.push("/dashboard");
      } else {
        loadData();
      }
    }
  }, [status, session, router]);

  const loadData = async () => {
    setLoading(true);
    try {
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
    } catch (err) {
      toast.error("Failed to sync with terminal");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id: string, status: "APPROVED" | "REJECTED") => {
    const result = await updateParticipantStatus(id, status);
    if (result.success) {
      toast.success(`Applicant ${status.toLowerCase()}`);
      loadData();
    } else {
      toast.error("Status update failed");
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
      toast.error(result.error || "Error creating sponsor");
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
      toast.error(result.error || "Error creating track");
    }
    setCreating(false);
  };

  if (status === "loading" || loading) {
    return (
      <div className="h-screen bg-black flex flex-col items-center justify-center text-white space-y-4">
        <div className="w-12 h-12 border-4 border-red-500/20 border-t-red-500 rounded-full animate-spin" />
        <span className="font-mono text-xs uppercase tracking-widest text-gray-500">Accessing Admin Core...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-w-0 h-full">
      <header className="h-16 border-b border-white/5 flex items-center justify-between px-8 bg-black/40 backdrop-blur-xl sticky top-0 z-20">
          <h2 className="text-xs font-bold tracking-tight uppercase font-mono text-gray-500 flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-red-500" /> System Control <span className="text-white/20">/</span> <span className="text-white">{activeTab}</span>
          </h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/5 border border-emerald-500/20">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-mono text-emerald-500 uppercase tracking-widest">Live Sync</span>
            </div>
            <button onClick={loadData} className="p-2 rounded-lg border border-white/5 text-gray-500 hover:text-white hover:bg-white/5 transition-all">
              <Zap className="w-4 h-4" />
            </button>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto w-full space-y-8">
          <AnimatePresence mode="wait">
            {activeTab === "overview" && (
              <motion.div 
                key="overview"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-8"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { label: "Total Applicants", val: stats?.totalUsers || "0", color: "from-blue-600/20 to-blue-600/5", icon: <Users className="w-4 h-4 text-blue-500" /> },
                    { label: "Approved Hackers", val: stats?.approvedUsers || "0", color: "from-emerald-600/20 to-emerald-600/5", icon: <UserCheck className="w-4 h-4 text-emerald-500" /> },
                    { label: "Active Teams", val: stats?.totalTeams || "0", color: "from-purple-600/20 to-purple-600/5", icon: <ShieldCheck className="w-4 h-4 text-purple-500" /> },
                    { label: "Projects Ready", val: stats?.totalProjects || "0", color: "from-yellow-600/20 to-yellow-600/5", icon: <Package className="w-4 h-4 text-yellow-500" /> },
                  ].map((stat, i) => (
                    <div key={i} className={`relative overflow-hidden bg-white/2 border border-white/8 p-6 rounded-2xl group hover:border-white/20 transition-all`}>
                      <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${stat.color} blur-2xl opacity-50`} />
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-2 rounded-lg bg-black/40 border border-white/5">{stat.icon}</div>
                        <Badge variant="secondary" className="bg-white/5 text-[10px]">+12%</Badge>
                      </div>
                      <div className="text-xs text-gray-500 font-mono uppercase tracking-widest mb-1">{stat.label}</div>
                      <div className="text-4xl font-black tracking-tighter">{stat.val}</div>
                    </div>
                  ))}
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <section className="bg-white/2 border border-white/8 rounded-2xl overflow-hidden">
                    <div className="p-6 border-b border-white/5 flex items-center justify-between">
                      <h3 className="text-sm font-bold tracking-tight flex items-center gap-2"><Clock className="w-4 h-4 text-red-500" /> Recent Applicants</h3>
                      <button onClick={() => setActiveTab("applicants")} className="text-[10px] uppercase font-bold text-gray-500 hover:text-white transition-colors">View All</button>
                    </div>
                    <div className="p-6 space-y-4">
                      {applicants.slice(0, 5).map((app) => (
                        <div key={app.id} className="flex items-center justify-between py-3 group">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-[10px] font-bold">
                              {app.name?.[0]}
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm font-bold group-hover:text-red-400 transition-colors">{app.name}</span>
                              <span className="text-[10px] text-gray-600 font-mono">{app.email}</span>
                            </div>
                          </div>
                          <Badge className={app.status === "APPROVED" ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"}>
                            {app.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </section>
                  
                  <section className="bg-white/2 border border-white/8 rounded-2xl overflow-hidden">
                    <div className="p-6 border-b border-white/5 flex items-center justify-between">
                      <h3 className="text-sm font-bold tracking-tight flex items-center gap-2"><Package className="w-4 h-4 text-blue-500" /> Recent Projects</h3>
                      <button onClick={() => setActiveTab("projects")} className="text-[10px] uppercase font-bold text-gray-500 hover:text-white transition-colors">View All</button>
                    </div>
                    <div className="p-6 space-y-4">
                      {projects.slice(0, 5).map((proj) => (
                        <div key={proj.id} className="flex items-center justify-between py-3 group">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded bg-white/5 border border-white/5 flex items-center justify-center text-[10px] font-bold">
                              <Code2 className="w-4 h-4" />
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm font-bold group-hover:text-blue-400 transition-colors">{proj.name}</span>
                              <span className="text-[10px] text-gray-600 font-mono">By {proj.team?.name}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Link href={proj.githubUrl} target="_blank" className="p-1.5 rounded hover:bg-white/5 text-gray-500 hover:text-white"><Globe className="w-3.5 h-3.5" /></Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              </motion.div>
            )}

            {activeTab === "applicants" && (
              <motion.section 
                key="applicants"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/2 border border-white/8 rounded-2xl overflow-hidden shadow-2xl shadow-black"
              >
                <div className="p-8 border-b border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div>
                    <h3 className="text-xl font-black tracking-tight">Hacker <span className="text-red-500">Registry</span></h3>
                    <p className="text-xs text-gray-500 mt-1 uppercase font-mono tracking-widest">Review and manage registrations</p>
                  </div>
                  <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:w-80">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                      <input placeholder="Search hackers by name or email..." className="w-full h-11 pl-10 pr-4 rounded-xl bg-black border border-white/10 text-sm focus:outline-none focus:border-red-500/30 transition-all" />
                    </div>
                    <button className="h-11 w-11 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                      <Filter className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-white/5 bg-white/1 font-mono text-[10px] text-gray-500 uppercase tracking-widest">
                        <th className="py-5 pl-8 pr-4">Hacker Identity</th>
                        <th className="py-5 px-4">Social / GitHub</th>
                        <th className="py-5 px-4">Wallet</th>
                        <th className="py-5 px-4">Joined</th>
                        <th className="py-5 px-4 text-center">Status</th>
                        <th className="py-5 pl-4 pr-8 text-right">Access Control</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {applicants.map((app) => (
                        <tr key={app.id} className="group hover:bg-white/2 transition-colors">
                          <td className="py-5 pl-8 pr-4">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-xs font-bold text-red-500">
                                {app.name?.[0]}
                              </div>
                              <div className="flex flex-col">
                                <span className="text-sm font-bold group-hover:text-red-400 transition-colors">{app.name}</span>
                                <span className="text-[10px] text-gray-500 font-mono uppercase">{app.email}</span>
                              </div>
                            </div>
                          </td>
                          <td className="py-5 px-4">
                            {app.github ? (
                              <a href={`https://github.com/${app.github}`} target="_blank" className="flex items-center gap-2 text-xs font-mono text-blue-400 hover:underline">
                                <Code2 className="w-3 h-3" /> {app.github}
                              </a>
                            ) : <span className="text-gray-700 font-mono text-xs">NONE</span>}
                          </td>
                          <td className="py-5 px-4">
                            <span className="text-[10px] font-mono text-gray-500 bg-white/5 px-2 py-1 rounded">
                              {app.walletAddress ? `${app.walletAddress.slice(0, 6)}...${app.walletAddress.slice(-4)}` : "NOT CONNECTED"}
                            </span>
                          </td>
                          <td className="py-5 px-4 text-[10px] font-mono text-gray-600">{new Date(app.createdAt).toLocaleDateString()}</td>
                          <td className="py-5 px-4 text-center">
                            <Badge className={
                              app.status === "APPROVED" ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : 
                              app.status === "PENDING" ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/20" : 
                              "bg-red-500/10 text-red-500 border-red-500/20"
                            }>
                              {app.status}
                            </Badge>
                          </td>
                          <td className="py-5 pl-4 pr-8 text-right">
                            <div className="flex items-center justify-end gap-2">
                              {app.status !== "APPROVED" && (
                                <button 
                                  onClick={() => handleUpdateStatus(app.id, "APPROVED")} 
                                  className="h-8 px-3 rounded-lg bg-emerald-600/10 text-emerald-500 hover:bg-emerald-600 text-white transition-all text-[10px] font-bold"
                                >
                                  APPROVE
                                </button>
                              )}
                              {app.status !== "REJECTED" && (
                                <button 
                                  onClick={() => handleUpdateStatus(app.id, "REJECTED")} 
                                  className="h-8 px-3 rounded-lg bg-red-600/10 text-red-500 hover:bg-red-600 text-white transition-all text-[10px] font-bold"
                                >
                                  REJECT
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.section>
            )}

            {activeTab === "tracks" && (
              <motion.div 
                key="tracks"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-8"
              >
                <div className="lg:col-span-2 space-y-8">
                  <section className="bg-white/2 border border-white/8 rounded-2xl overflow-hidden">
                    <div className="p-6 border-b border-white/5">
                      <h3 className="text-sm font-bold tracking-tight uppercase font-mono text-gray-500">Live Tracks</h3>
                    </div>
                    <div className="p-8 grid grid-cols-1 gap-4">
                      {tracks.map((track) => (
                        <div key={track.id} className="p-6 rounded-2xl border border-white/5 bg-black hover:border-red-500/30 transition-all flex items-center justify-between group">
                          <div className="flex items-center gap-6">
                            <div className={`w-1 h-12 rounded-full bg-gradient-to-b ${track.color || "from-red-500 to-orange-500"}`} />
                            <div className="space-y-1">
                              <h4 className="font-black text-lg tracking-tight group-hover:text-red-400 transition-colors">{track.title}</h4>
                              <div className="flex items-center gap-3">
                                {track.sponsor?.logoUrl && <img src={track.sponsor.logoUrl} className="h-3 w-auto object-contain brightness-0 invert opacity-40" alt="" />}
                                <span className="text-[10px] text-gray-600 uppercase font-mono tracking-widest">{track.sponsor?.name || "Independent"}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                             <button className="p-2 rounded-lg bg-white/5 border border-white/5 text-gray-500 hover:text-white transition-all"><Settings className="w-4 h-4" /></button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section className="bg-white/2 border border-white/8 rounded-2xl overflow-hidden">
                    <div className="p-6 border-b border-white/5">
                      <h3 className="text-sm font-bold tracking-tight uppercase font-mono text-gray-500">Active Sponsors</h3>
                    </div>
                    <div className="p-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                      {sponsors.map((sponsor) => (
                        <div key={sponsor.id} className="aspect-square rounded-2xl border border-white/5 bg-black flex flex-col items-center justify-center p-6 text-center group relative overflow-hidden">
                          <div className="absolute inset-0 bg-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                          {sponsor.logoUrl ? (
                            <img src={sponsor.logoUrl} alt={sponsor.name} className="h-10 w-auto object-contain mb-4 grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500" />
                          ) : (
                            <ShieldCheck className="w-10 h-10 text-gray-800 mb-4" />
                          )}
                          <span className="text-[10px] font-black text-gray-500 uppercase tracking-tighter group-hover:text-red-500 transition-colors">{sponsor.name}</span>
                        </div>
                      ))}
                      <div className="aspect-square rounded-2xl border-2 border-dashed border-white/5 flex flex-col items-center justify-center p-6 text-center text-gray-700 hover:border-white/20 transition-all cursor-pointer">
                        <Zap className="w-6 h-6 mb-2" />
                        <span className="text-[10px] uppercase font-mono">New Sponsor</span>
                      </div>
                    </div>
                  </section>
                </div>

                <div className="space-y-8">
                  <section className="bg-white/2 border border-white/8 rounded-2xl p-8 shadow-2xl shadow-black relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <h3 className="text-lg font-black tracking-tight mb-6">Add <span className="text-red-500">Sponsor</span></h3>
                    <form onSubmit={handleCreateSponsor} className="space-y-5 relative z-10">
                      <div className="space-y-2">
                        <label className="text-[10px] text-gray-500 font-mono uppercase tracking-widest ml-1">Official Name</label>
                        <input name="name" required placeholder="Arbitrum Foundation" className="w-full h-12 px-4 rounded-xl bg-black border border-white/10 text-sm focus:outline-none focus:border-red-500/50 transition-all" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] text-gray-500 font-mono uppercase tracking-widest ml-1">Logo Asset URL</label>
                        <input name="logoUrl" placeholder="/assets/sponsors/logo.png" className="w-full h-12 px-4 rounded-xl bg-black border border-white/10 text-sm focus:outline-none focus:border-red-500/50 transition-all" />
                      </div>
                      <button type="submit" disabled={creating} className="w-full h-12 rounded-xl bg-white text-black font-black text-xs hover:bg-gray-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] disabled:opacity-50">
                        {creating ? "SYNCING..." : "REGISTER SPONSOR"}
                      </button>
                    </form>
                  </section>

                  <section className="bg-white/2 border border-white/8 rounded-2xl p-8 shadow-2xl shadow-black">
                    <h3 className="text-lg font-black tracking-tight mb-6">New <span className="text-red-500">Track</span></h3>
                    <form onSubmit={handleCreateTrack} className="space-y-5">
                      <div className="space-y-2">
                        <label className="text-[10px] text-gray-500 font-mono uppercase tracking-widest ml-1">Track Title</label>
                        <input name="title" required placeholder="Scaling Future" className="w-full h-12 px-4 rounded-xl bg-black border border-white/10 text-sm focus:outline-none focus:border-red-500/50 transition-all" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] text-gray-500 font-mono uppercase tracking-widest ml-1">Sponsor Owner</label>
                        <select name="sponsorId" className="w-full h-12 px-4 rounded-xl bg-black border border-white/10 text-sm text-gray-400 focus:outline-none focus:border-red-500/50 appearance-none transition-all">
                          <option value="">Independent Track</option>
                          {sponsors.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] text-gray-500 font-mono uppercase tracking-widest ml-1">Brand Gradient</label>
                        <input name="color" placeholder="from-red-500 to-orange-500" className="w-full h-12 px-4 rounded-xl bg-black border border-white/10 text-sm focus:outline-none focus:border-red-500/50 transition-all" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] text-gray-500 font-mono uppercase tracking-widest ml-1">Objective</label>
                        <textarea name="description" rows={3} placeholder="Describe the bounty goals..." className="w-full p-4 rounded-xl bg-black border border-white/10 text-sm focus:outline-none focus:border-red-500/50 transition-all resize-none" />
                      </div>
                      <button type="submit" disabled={creating} className="w-full h-12 rounded-xl bg-red-600 text-white font-black text-xs hover:bg-red-500 transition-all shadow-[0_0_20px_rgba(239,68,68,0.3)] disabled:opacity-50">
                        {creating ? "SYNCING..." : "DEPLOY TRACK"}
                      </button>
                    </form>
                  </section>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
    </div>
  );
}
