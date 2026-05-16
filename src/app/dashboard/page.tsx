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
  ExternalLink,
  UserPlus,
  Github,
  Globe,
  Video
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getMyTeam, createTeam, leaveTeam } from "@/app/actions/team";
import { submitProject, getProjectByTeam } from "@/app/actions/project";
import { toast } from "sonner";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [team, setTeam] = useState<any>(null);
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated") {
      fetchInitialData();
    }
  }, [status, router]);

  const fetchInitialData = async () => {
    setLoading(true);
    const teamResult = await getMyTeam();
    if (teamResult.success && teamResult.team) {
      setTeam(teamResult.team);
      const projectResult = await getProjectByTeam(teamResult.team.id);
      if (projectResult.success) {
        setProject(projectResult.project);
      }
    }
    setLoading(false);
  };

  const handleCreateTeam = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const result = await createTeam(formData);
    if (result.success) {
      toast.success("Team created!");
      fetchInitialData();
    } else {
      toast.error(result.error);
    }
  };

  const handleLeaveTeam = async () => {
    const result = await leaveTeam();
    if (result.success) {
      toast.info("You left the team");
      setTeam(null);
      setProject(null);
    }
  };

  const handleSubmitProject = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const result = await submitProject(formData);
    if (result.success) {
      toast.success("Project submitted successfully!");
      setProject(result.project);
    } else {
      toast.error(result.error || "Submission failed");
    }
    setSubmitting(false);
  };

  if (status === "loading") {
    return <div className="h-screen bg-black flex items-center justify-center text-white font-mono tracking-widest uppercase text-xs">Loading Secure Environment...</div>;
  }

  if (!session) return null;

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
            { icon: <Trophy className="w-4 h-4" />, label: "Prizes & Bounties", active: false },
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
          <button onClick={() => signOut({ callbackUrl: "/" })} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-500 hover:text-red-400 transition-colors"><LogOut className="w-4 h-4" /> Logout</button>
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
            <div className="flex items-center gap-3 border border-white/10 bg-white/5 py-1 px-3 rounded-full">
              <span className="text-[10px] font-mono text-gray-500 hidden sm:block truncate max-w-[100px]">{session.user?.email}</span>
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 border border-white/20" />
            </div>
          </div>
        </header>

        <div className="p-8 space-y-8">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-2xl font-bold tracking-tight mb-1">Welcome, {session.user?.name || "Hacker"} 👾</h1>
            <p className="text-gray-500 text-sm">Application Status: <span className="text-green-500 font-medium">Approved ✅</span></p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              {/* Team Section */}
              <section className="bg-white/2 border border-white/8 rounded-xl overflow-hidden">
                <div className="p-6 border-b border-white/5 flex items-center justify-between">
                  <h2 className="text-sm font-mono text-gray-500 uppercase tracking-widest">Team Management</h2>
                  {team && <button onClick={handleLeaveTeam} className="text-xs text-red-500 hover:underline">Leave Team</button>}
                </div>
                
                {loading ? (
                  <div className="p-12 text-center text-gray-500 font-mono text-xs uppercase animate-pulse">Scanning database...</div>
                ) : team ? (
                  <div className="p-6 space-y-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-bold">{team.name}</h3>
                        <p className="text-sm text-gray-500 mt-1">{team.description || "Building something amazing at ETH Lima."}</p>
                      </div>
                      <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20">{team.members.length} Members</Badge>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="text-[10px] font-mono text-gray-600 uppercase tracking-widest">Members</div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {team.members.map((member: any) => (
                          <div key={member.id} className="p-3 rounded-lg border border-white/5 bg-white/2 flex items-center justify-between group">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-gray-400">
                                {member.name?.[0] || "?"}
                              </div>
                              <div className="flex flex-col">
                                <span className="text-sm font-medium">{member.name} {member.id === session.user?.id && <span className="text-[10px] text-gray-600 ml-1">(You)</span>}</span>
                                <span className="text-[10px] text-gray-600">{member.email}</span>
                              </div>
                            </div>
                            {member.github && (
                              <a href={`https://github.com/${member.github}`} target="_blank" rel="noreferrer" className="text-gray-600 hover:text-white transition-colors">
                                <Github className="w-3.5 h-3.5" />
                              </a>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-12 text-center">
                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4 border border-dashed border-white/20">
                      <Users className="w-8 h-8 text-gray-600" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">No team yet</h3>
                    <p className="text-gray-500 text-sm mb-8 max-w-sm mx-auto">Hackathons are better with a squad. Create a new team to start submitting a project.</p>
                    
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
                      <form onSubmit={handleCreateTeam} className="flex flex-col sm:flex-row gap-2 w-full max-w-md">
                        <input name="name" placeholder="Team Name" required className="flex-1 h-10 px-3 rounded-lg bg-white/5 border border-white/10 text-sm focus:outline-none focus:border-blue-500/30" />
                        <button type="submit" className="h-10 px-6 rounded-lg bg-white text-black font-bold text-sm hover:bg-gray-200 transition-colors whitespace-nowrap">Create Team</button>
                      </form>
                    </div>
                  </div>
                )}
              </section>

              {/* Project Section */}
              <section className="bg-white/2 border border-white/8 rounded-xl overflow-hidden">
                <div className="p-6 border-b border-white/5 flex items-center justify-between">
                  <h2 className="text-sm font-mono text-gray-500 uppercase tracking-widest">Project Submission</h2>
                  {project && <Badge className="bg-green-500/10 text-green-500 border-green-500/20 uppercase text-[10px]">Submitted</Badge>}
                </div>

                {loading ? (
                  <div className="p-12 text-center text-gray-500 font-mono text-xs uppercase animate-pulse">Checking submissions...</div>
                ) : !team ? (
                  <div className="p-12 text-center">
                    <p className="text-gray-600 text-sm">Join or create a team to start building your project.</p>
                  </div>
                ) : project ? (
                  <div className="p-6 space-y-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-bold">{project.name}</h3>
                        <p className="text-sm text-gray-500 mt-1">{project.description}</p>
                      </div>
                      <button onClick={() => setProject(null)} className="text-xs text-blue-400 hover:underline">Edit Details</button>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        { label: "GitHub Repository", val: project.githubUrl, icon: <Github className="w-4 h-4" /> },
                        { label: "Live Demo", val: project.demoUrl, icon: <Globe className="w-4 h-4" /> },
                        { label: "Video Pitch", val: project.videoUrl, icon: <Video className="w-4 h-4" /> },
                      ].map((link, i) => (
                        link.val && (
                          <a key={i} href={link.val} target="_blank" rel="noreferrer" className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all group">
                            <div className="text-gray-500 group-hover:text-blue-400 transition-colors">{link.icon}</div>
                            <div className="flex flex-col">
                              <span className="text-[10px] text-gray-600 font-mono uppercase tracking-widest">{link.label}</span>
                              <span className="text-xs text-gray-400 truncate max-w-[150px]">{link.val}</span>
                            </div>
                            <ExternalLink className="w-3 h-3 text-gray-700 ml-auto" />
                          </a>
                        )
                      ))}
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmitProject} className="p-6 space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label className="text-xs text-gray-500 block mb-1.5">Project Name</label>
                        <input name="name" required placeholder="My Awesome DApp" className="w-full h-10 px-3 rounded-lg bg-white/5 border border-white/10 text-sm focus:outline-none focus:border-blue-500/30" />
                      </div>
                      <div>
                        <label className="text-xs text-gray-500 block mb-1.5">Short Description</label>
                        <textarea name="description" required rows={3} placeholder="What are you building?" className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm focus:outline-none focus:border-blue-500/30 resize-none" />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs text-gray-500 block mb-1.5">GitHub Repository</label>
                          <input name="githubUrl" required placeholder="https://github.com/..." className="w-full h-10 px-3 rounded-lg bg-white/5 border border-white/10 text-sm focus:outline-none focus:border-blue-500/30" />
                        </div>
                        <div>
                          <label className="text-xs text-gray-500 block mb-1.5">Demo URL (optional)</label>
                          <input name="demoUrl" placeholder="https://..." className="w-full h-10 px-3 rounded-lg bg-white/5 border border-white/10 text-sm focus:outline-none focus:border-blue-500/30" />
                        </div>
                      </div>
                    </div>
                    <button type="submit" disabled={submitting} className="w-full h-11 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50">
                      {submitting ? "Submitting..." : "Submit Project"} <Code2 className="w-4 h-4" />
                    </button>
                  </form>
                )}
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
              </section>

              {/* Quick Links */}
              <section className="bg-white/2 border border-white/8 rounded-xl p-6 space-y-4">
                <h2 className="text-sm font-mono text-gray-500 uppercase tracking-widest">Quick Links</h2>
                <div className="space-y-2">
                  {["Official Rulebook", "Arbitrum Docs", "Technical Support"].map(link => (
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
