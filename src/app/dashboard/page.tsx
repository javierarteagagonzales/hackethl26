"use client";

import Link from "next/link";
import { Logo } from "@/components/ui/logo";
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
  Copy,
  UserPlus,
  Info,
  HelpCircle,
  Clock,
  CheckCircle2,
  Globe,
  Video,
  Zap
} from "lucide-react";
import { TeamSkeleton, ProjectSkeleton } from "@/components/dashboard-skeletons";
import { Badge } from "@/components/ui/badge";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getMyTeam, createTeam, leaveTeam, joinTeamByCode } from "@/app/actions/team";
import { submitProject, getProjectByTeam } from "@/app/actions/project";
import { getTracks } from "@/app/actions/tracks";
import { requestMentorship, getTeamMentorships } from "@/app/actions/mentorship";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const teamSchema = z.object({
  name: z.string().min(3, "Team name must be at least 3 characters"),
});

const joinTeamSchema = z.object({
  inviteCode: z.string().min(5, "Invalid invite code"),
});

const projectSchema = z.object({
  name: z.string().min(3, "Project name is too short"),
  trackId: z.string().min(1, "Please select a track"),
  description: z.string().min(10, "Description should be longer"),
  githubUrl: z.string().url("Invalid GitHub URL"),
  demoUrl: z.string().url("Invalid Demo URL").optional().or(z.literal("")),
});

const mentorshipSchema = z.object({
  topic: z.string().min(5, "Please describe the topic"),
  scheduledAt: z.string().min(1, "Please select a time"),
});

type ProjectValues = z.infer<typeof projectSchema>;
type MentorshipValues = z.infer<typeof mentorshipSchema>;

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [team, setTeam] = useState<any>(null);
  const [project, setProject] = useState<any>(null);
  const [tracks, setTracks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [joining, setJoining] = useState(false);
  const [requestingMentorship, setRequestingMentorship] = useState(false);
  const [mentorships, setMentorships] = useState<any[]>([]);

  // Forms
  const teamForm = useForm<{ name: string }>({ resolver: zodResolver(teamSchema) });
  const joinForm = useForm<{ inviteCode: string }>({ resolver: zodResolver(joinTeamSchema) });
  const projectForm = useForm<ProjectValues>({ resolver: zodResolver(projectSchema) });
  const mentorshipForm = useForm<MentorshipValues>({ resolver: zodResolver(mentorshipSchema) });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated") {
      if (session?.user?.role === "ADMIN" || session?.user?.role === "SUPERADMIN") {
        router.push("/admin");
      } else if (session?.user?.role === "MENTOR") {
        router.push("/mentor/dashboard");
      } else if (session?.user?.role === "JUDGE") {
        router.push("/judge");
      } else {
        fetchInitialData();
      }
    }
  }, [status, session, router]);

  const fetchInitialData = async () => {
    setLoading(true);
    const [teamResult, tracksResult, mentorshipsResult] = await Promise.all([
      getMyTeam(),
      getTracks(),
      getTeamMentorships()
    ]);

    if (tracksResult.success) {
      setTracks(tracksResult.tracks || []);
    }

    if (mentorshipsResult.success) {
      setMentorships(mentorshipsResult.mentorships || []);
    }

    if (teamResult.success && teamResult.team) {
      setTeam(teamResult.team);
      const projectResult = await getProjectByTeam(teamResult.team.id);
      if (projectResult.success) {
        setProject(projectResult.project || null);
      }
    }
    setLoading(false);
  };

  const handleCreateTeam = async (values: { name: string }) => {
    const formData = new FormData();
    formData.append("name", values.name);
    const result = await createTeam(formData);
    if (result.success) {
      toast.success("Team created!");
      fetchInitialData();
      teamForm.reset();
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

  const handleJoinTeam = async (values: { inviteCode: string }) => {
    setJoining(true);
    const result = await joinTeamByCode(values.inviteCode);
    if (result.success) {
      toast.success("Joined team!");
      fetchInitialData();
      joinForm.reset();
    } else {
      toast.error(result.error);
    }
    setJoining(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Code copied to clipboard!");
  };

  const handleRequestMentorship = async (values: MentorshipValues) => {
    setRequestingMentorship(true);
    const result = await requestMentorship({
      scheduledAt: new Date(values.scheduledAt),
      topic: values.topic
    });

    if (result.success) {
      toast.success("Mentorship requested! A mentor will be assigned.");
      fetchInitialData();
      mentorshipForm.reset();
    } else {
      toast.error(result.error || "Failed to request mentorship");
    }
    setRequestingMentorship(false);
  };

  const handleSubmitProject = async (values: ProjectValues) => {
    setSubmitting(true);
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });
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
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/5">
        <div>
          <h1 className="text-3xl font-black tracking-tighter">Welcome, <span className="text-brand-blue">{session.user?.name || "Hacker"}</span> 👾</h1>
          <p className="text-gray-500 text-sm mt-1">Application Status: <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 ml-2">Approved ✅</Badge></p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <div className="text-xs font-mono text-gray-500 uppercase tracking-widest">Network</div>
            <div className="text-[10px] font-bold text-emerald-500">Arbitrum One</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
            <Zap className="w-5 h-5 text-yellow-500" />
          </div>
        </div>
      </header>
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
                  <TeamSkeleton />
                ) : team ? (
                  <div className="p-6 space-y-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-bold">{team.name}</h3>
                        <p className="text-sm text-gray-500 mt-1">{team.description || "Building something amazing at ETH Lima."}</p>
                      </div>
                      <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20">{team.members.length} Members</Badge>
                    </div>

                    <div className="p-4 rounded-lg bg-blue-500/5 border border-blue-500/10 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <UserPlus className="w-4 h-4 text-blue-400" />
                        <div>
                          <div className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">Invite Code</div>
                          <div className="text-sm font-mono font-bold text-white tracking-widest uppercase">{team.inviteCode}</div>
                        </div>
                      </div>
                      <button 
                        onClick={() => copyToClipboard(team.inviteCode)}
                        className="p-2 rounded-lg hover:bg-blue-500/10 text-blue-400 transition-all flex items-center gap-2 text-xs"
                      >
                        <Copy className="w-3.5 h-3.5" /> Copy Code
                      </button>
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
                                <Code2 className="w-3.5 h-3.5" />
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
                    
                    <div className="flex flex-col gap-6 w-full max-w-md mx-auto">
                      <form onSubmit={teamForm.handleSubmit(handleCreateTeam)} className="flex gap-2">
                        <div className="flex-1">
                          <input {...teamForm.register("name")} placeholder="New Team Name" className="w-full h-10 px-3 rounded-lg bg-white/5 border border-white/10 text-sm focus:outline-none focus:border-blue-500/30" />
                          {teamForm.formState.errors.name && <p className="text-[10px] text-red-500 mt-1">{teamForm.formState.errors.name.message}</p>}
                        </div>
                        <button type="submit" className="h-10 px-6 rounded-lg bg-white text-black font-bold text-sm hover:bg-gray-200 transition-colors whitespace-nowrap">Create Team</button>
                      </form>

                      <div className="relative py-2">
                        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
                        <div className="relative flex justify-center text-[10px] uppercase font-mono text-gray-700 bg-transparent"><span className="px-2 bg-black">OR JOIN WITH CODE</span></div>
                      </div>

                      <form onSubmit={joinForm.handleSubmit(handleJoinTeam)} className="flex gap-2">
                        <div className="flex-1">
                          <input {...joinForm.register("inviteCode")} placeholder="TEAM-XXXX" className="w-full h-10 px-3 rounded-lg bg-white/5 border border-white/10 text-sm focus:outline-none focus:border-blue-500/30 uppercase" />
                          {joinForm.formState.errors.inviteCode && <p className="text-[10px] text-red-500 mt-1">{joinForm.formState.errors.inviteCode.message}</p>}
                        </div>
                        <button type="submit" disabled={joining} className="h-10 px-6 rounded-lg border border-white/10 text-white font-bold text-sm hover:bg-white/5 transition-colors disabled:opacity-50">
                          {joining ? "Joining..." : "Join"}
                        </button>
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
                  <ProjectSkeleton />
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
                        { label: "GitHub Repository", val: project.githubUrl, icon: <Code2 className="w-4 h-4" /> },
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
                    <form onSubmit={projectForm.handleSubmit(handleSubmitProject)} className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-1.5">
                          <label className="text-xs text-gray-500 font-mono uppercase ml-1">Project Name</label>
                          <input {...projectForm.register("name")} placeholder="My Awesome DApp" className="w-full h-11 px-4 rounded-lg bg-black border border-white/10 text-sm focus:outline-none focus:border-blue-500/50 transition-all" />
                          {projectForm.formState.errors.name && <p className="text-[10px] text-red-500 mt-1">{projectForm.formState.errors.name.message}</p>}
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs text-gray-500 font-mono uppercase ml-1">Track</label>
                          <select {...projectForm.register("trackId")} className="w-full h-11 px-4 rounded-lg bg-black border border-white/10 text-sm text-gray-400 focus:outline-none focus:border-blue-500/50 transition-all appearance-none">
                            <option value="">Select a track...</option>
                            {tracks.map(t => <option key={t.id} value={t.id}>{t.title}</option>)}
                          </select>
                          {projectForm.formState.errors.trackId && <p className="text-[10px] text-red-500 mt-1">{projectForm.formState.errors.trackId.message}</p>}
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs text-gray-500 font-mono uppercase ml-1">Description</label>
                        <textarea {...projectForm.register("description")} rows={4} placeholder="What does your project do? How was it built?" className="w-full px-4 py-3 rounded-lg bg-black border border-white/10 text-sm focus:outline-none focus:border-blue-500/50 transition-all resize-none" />
                        {projectForm.formState.errors.description && <p className="text-[10px] text-red-500 mt-1">{projectForm.formState.errors.description.message}</p>}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-1.5">
                          <label className="text-xs text-gray-500 font-mono uppercase ml-1">GitHub Repository</label>
                          <input {...projectForm.register("githubUrl")} placeholder="https://github.com/..." className="w-full h-11 px-4 rounded-lg bg-black border border-white/10 text-sm focus:outline-none focus:border-blue-500/50 transition-all" />
                          {projectForm.formState.errors.githubUrl && <p className="text-[10px] text-red-500 mt-1">{projectForm.formState.errors.githubUrl.message}</p>}
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs text-gray-500 font-mono uppercase ml-1">Live Demo / Video (optional)</label>
                          <input {...projectForm.register("demoUrl")} placeholder="https://..." className="w-full h-11 px-4 rounded-lg bg-black border border-white/10 text-sm focus:outline-none focus:border-blue-500/50 transition-all" />
                          {projectForm.formState.errors.demoUrl && <p className="text-[10px] text-red-500 mt-1">{projectForm.formState.errors.demoUrl.message}</p>}
                        </div>
                      </div>
                      <button type="submit" disabled={submitting} className="w-full h-11 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50">
                        {submitting ? "Submitting..." : "Submit Project"} <Code2 className="w-4 h-4" />
                      </button>
                    </form>
                )}
              </section>

              {/* Mentorship Section */}
              <section className="bg-white/2 border border-white/8 rounded-xl overflow-hidden">
                <div className="p-6 border-b border-white/5 flex items-center justify-between">
                  <h2 className="text-sm font-mono text-gray-500 uppercase tracking-widest">Mentorships & Help</h2>
                  <Badge className="bg-purple-500/10 text-purple-500 border-purple-500/20 text-[10px]">On-demand</Badge>
                </div>

                <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold flex items-center gap-2"><HelpCircle className="w-4 h-4 text-purple-400" /> Request a Mentor</h3>
                    <p className="text-xs text-gray-500 leading-relaxed">Stuck on a bug or need architecture advice? Our mentors are here to help you cross the finish line.</p>
                    
                    <form onSubmit={mentorshipForm.handleSubmit(handleRequestMentorship)} className="space-y-3 pt-2">
                      <div className="space-y-1.5">
                        <label className="text-[10px] text-gray-600 font-mono uppercase">Topic / Issue</label>
                        <input {...mentorshipForm.register("topic")} placeholder="Smart contract debug, UX feedback..." className="w-full h-9 px-3 rounded-lg bg-black border border-white/10 text-xs focus:outline-none focus:border-purple-500/30" />
                        {mentorshipForm.formState.errors.topic && <p className="text-[9px] text-red-500 mt-0.5">{mentorshipForm.formState.errors.topic.message}</p>}
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] text-gray-600 font-mono uppercase">Preferred Time</label>
                        <input {...mentorshipForm.register("scheduledAt")} type="datetime-local" className="w-full h-9 px-3 rounded-lg bg-black border border-white/10 text-xs text-gray-400 focus:outline-none focus:border-purple-500/30" />
                        {mentorshipForm.formState.errors.scheduledAt && <p className="text-[9px] text-red-500 mt-0.5">{mentorshipForm.formState.errors.scheduledAt.message}</p>}
                      </div>
                      <button type="submit" disabled={requestingMentorship || !team} className="w-full h-9 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition-all disabled:opacity-50">
                        {requestingMentorship ? "Sending Request..." : "Request Mentorship"}
                      </button>
                    </form>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-sm font-bold">Your Sessions</h3>
                    <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                      {mentorships.length === 0 ? (
                        <div className="text-center py-10 border border-dashed border-white/5 rounded-xl">
                          <p className="text-[10px] text-gray-600 font-mono uppercase">No active requests</p>
                        </div>
                      ) : mentorships.map((m) => (
                        <div key={m.id} className="p-3 rounded-lg border border-white/5 bg-white/2 flex items-center justify-between group">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${m.status === "PENDING" ? "bg-yellow-500/10 text-yellow-500" : "bg-green-500/10 text-green-500"}`}>
                              {m.status === "PENDING" ? <Clock className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
                            </div>
                            <div>
                              <div className="text-xs font-medium">{new Date(m.scheduledAt).toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</div>
                              <div className="text-[10px] text-gray-500">Mentor: {m.mentor?.name || "Assigning..."}</div>
                            </div>
                          </div>
                          <Badge className={`text-[8px] uppercase tracking-tighter ${m.status === "PENDING" ? "bg-yellow-500/10 text-yellow-500" : "bg-green-500/10 text-green-500"}`}>
                            {m.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
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
  );
}
