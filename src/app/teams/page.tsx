"use client";

import { useEffect, useState } from "react";
import { 
  getMyTeam, createTeam, updateTeam, leaveTeam, 
  joinTeamByCode, transferLeadership, searchParticipants, 
  sendTeamInvitation, getTeamInvitations, respondToInvitation 
} from "@/app/actions/team";
import { useTranslation } from "@/components/providers/language-provider";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, Users, UserPlus, LogOut, Check, X, 
  Copy, Edit2, Search, ShieldCheck
} from "lucide-react";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function TeamsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { t } = useTranslation();

  const [loading, setLoading] = useState(true);
  const [team, setTeam] = useState<any>(null);
  const [invitations, setInvitations] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  
  // Create / Edit team states
  const [teamName, setTeamName] = useState("");
  const [teamDesc, setTeamDesc] = useState("");
  const [inviteCodeInput, setInviteCodeInput] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated") {
      fetchTeamData();
    }
  }, [status, router]);

  const fetchTeamData = async () => {
    setLoading(true);
    const [teamRes, invitesRes] = await Promise.all([
      getMyTeam(),
      getTeamInvitations(),
    ]);

    if (teamRes.success) {
      setTeam(teamRes.team);
      if (teamRes.team) {
        setTeamName(teamRes.team.name);
        setTeamDesc(teamRes.team.description || "");
      }
    }
    
    if (invitesRes.success) {
      setInvitations(invitesRes.invitations || []);
    }
    
    setLoading(false);
  };

  const handleCreateTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!teamName.trim()) return;
    setSubmitting(true);
    const result = await createTeam(teamName, teamDesc);
    if (result.success) {
      toast.success(t("app_teams.team_created"));
      fetchTeamData();
    } else {
      toast.error(t(result.error || "app_teams.errors.create_failed"));
    }
    setSubmitting(false);
  };

  const handleUpdateTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!teamName.trim() || !team) return;
    setSubmitting(true);
    const result = await updateTeam(team.id, teamName, teamDesc);
    if (result.success) {
      toast.success(t("app_teams.team_updated"));
      setIsEditing(false);
      fetchTeamData();
    } else {
      toast.error(t(result.error || "app_teams.errors.update_failed"));
    }
    setSubmitting(false);
  };

  const handleJoinByCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteCodeInput.trim()) return;
    setSubmitting(true);
    const result = await joinTeamByCode(inviteCodeInput.trim());
    if (result.success) {
      toast.success("Joined team successfully!");
      setInviteCodeInput("");
      fetchTeamData();
    } else {
      toast.error(t(result.error || "app_teams.errors.join_failed"));
    }
    setSubmitting(false);
  };

  const handleLeaveTeam = async () => {
    if (!confirm("Are you sure you want to leave the team?")) return;
    const result = await leaveTeam();
    if (result.success) {
      toast.info(t("app_teams.left_team"));
      setTeam(null);
      fetchTeamData();
    } else {
      toast.error(t(result.error || "app_teams.errors.leave_failed"));
    }
  };

  const handleTransferLeadership = async (newLeaderId: string) => {
    if (!confirm("Are you sure you want to transfer team leadership?")) return;
    const result = await transferLeadership(newLeaderId);
    if (result.success) {
      toast.success(t("app_teams.leadership_transferred"));
      fetchTeamData();
    } else {
      toast.error(t(result.error || "app_teams.errors.transfer_failed"));
    }
  };

  const handleSearchParticipants = async () => {
    const result = await searchParticipants({ search: searchQuery });
    if (result.success) {
      setSearchResults(result.users || []);
    } else {
      toast.error(t(result.error || "app_teams.errors.search_failed"));
    }
  };

  useEffect(() => {
    if (team && team.leaderId === session?.user?.id) {
      handleSearchParticipants();
    }
  }, [searchQuery, team]);

  const handleInviteUser = async (userId: string) => {
    const result = await sendTeamInvitation(userId);
    if (result.success) {
      toast.success(t("app_teams.invitation_sent"));
    } else {
      toast.error(t(result.error || "app_teams.errors.send_invitation_failed"));
    }
  };

  const handleRespondInvitation = async (inviteId: string, status: "ACCEPTED" | "REJECTED") => {
    const result = await respondToInvitation(inviteId, status);
    if (result.success) {
      toast.success(`Invitation ${status.toLowerCase()}!`);
      fetchTeamData();
    } else {
      toast.error(t(result.error || "app_teams.errors.response_failed"));
    }
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success("Code copied to clipboard!");
  };

  if (status === "loading" || loading) {
    return (
      <div className="h-screen bg-black flex flex-col items-center justify-center text-white space-y-4">
        <div className="w-12 h-12 border-4 border-red-500/20 border-t-red-500 rounded-full animate-spin" />
        <span className="font-mono text-xs uppercase tracking-widest text-gray-500">Accessing Team Core...</span>
      </div>
    );
  }

  const isLeader = team && team.leaderId === session?.user?.id;

  return (
    <div className="min-h-screen bg-bg text-fg font-sans transition-colors duration-300 relative pb-16">
      <div className="fixed inset-0 z-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, var(--color-brand-accent) 1px, transparent 0)", backgroundSize: "48px 48px" }} />
      <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-brand-accent/5 blur-[130px] rounded-full pointer-events-none z-0" />

      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-border bg-surface/85 backdrop-blur-xl transition-all duration-300">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="p-2 rounded-lg border border-border bg-surface hover:bg-fg/5 text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <Logo alt="ETH Lima" className="h-7 w-auto" />
          </div>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <div className="relative z-10 container mx-auto px-6 py-12 max-w-4xl grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* If NO Team */}
        {!team ? (
          <>
            {/* Create / Join panels */}
            <div className="md:col-span-8 space-y-6">
              {/* Create Team */}
              <div className="rounded-xl border border-border bg-surface/50 p-6 space-y-4 shadow-sm backdrop-blur-md">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Users className="w-5 h-5 text-brand-accent" /> {t("app_teams.create_team")}
                </h2>
                <form onSubmit={handleCreateTeam} className="space-y-4">
                  <div>
                    <label className="text-xs text-fg/60 block mb-1.5 font-medium">{t("app_teams.team_name")}</label>
                    <input 
                      value={teamName} 
                      onChange={(e) => setTeamName(e.target.value)} 
                      placeholder="My Epic Team" 
                      className="w-full h-10 px-3 rounded-lg bg-surface border border-border text-sm focus:outline-none focus:border-brand-accent/50 transition-all text-white" 
                    />
                  </div>
                  <div>
                    <label className="text-xs text-fg/60 block mb-1.5 font-medium">{t("app_teams.description")}</label>
                    <textarea 
                      value={teamDesc} 
                      onChange={(e) => setTeamDesc(e.target.value)} 
                      rows={3}
                      placeholder="We are building a smart contract auditing tool..." 
                      className="w-full px-3 py-2 rounded-lg bg-surface border border-border text-sm focus:outline-none focus:border-brand-accent/50 transition-all resize-none text-white" 
                    />
                  </div>
                  <button 
                    type="submit" 
                    disabled={submitting || !teamName.trim()}
                    className="h-10 px-6 rounded-lg bg-fg text-bg font-bold text-sm hover:opacity-90 transition-opacity disabled:opacity-50 cursor-pointer shadow-md"
                  >
                    {submitting ? "Creating..." : t("app_teams.create_team")}
                  </button>
                </form>
              </div>

              {/* Join Team */}
              <div className="rounded-xl border border-border bg-surface/50 p-6 space-y-4 shadow-sm backdrop-blur-md">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <UserPlus className="w-5 h-5 text-brand-accent" /> Join Team
                </h2>
                <form onSubmit={handleJoinByCode} className="flex gap-2">
                  <input 
                    value={inviteCodeInput} 
                    onChange={(e) => setInviteCodeInput(e.target.value)} 
                    placeholder="Enter team invite code (e.g. cldhfh...)" 
                    className="flex-1 h-10 px-3 rounded-lg bg-surface border border-border text-sm focus:outline-none focus:border-brand-accent/50 transition-all text-white font-mono uppercase" 
                  />
                  <button 
                    type="submit" 
                    disabled={submitting || !inviteCodeInput.trim()}
                    className="h-10 px-6 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors font-bold text-sm cursor-pointer text-white"
                  >
                    Join
                  </button>
                </form>
              </div>
            </div>

            {/* Invitations Received */}
            <div className="md:col-span-4 space-y-6">
              <div className="rounded-xl border border-border bg-surface/50 p-6 space-y-4 shadow-sm backdrop-blur-md">
                <h2 className="text-sm font-mono text-gray-500 uppercase tracking-widest">
                  {t("app_teams.invitations_received")}
                </h2>
                <div className="space-y-3">
                  {invitations.length === 0 ? (
                    <p className="text-xs text-gray-500 font-mono italic">No invitations received.</p>
                  ) : (
                    invitations.map((inv) => (
                      <div key={inv.id} className="p-3 bg-black/20 rounded-lg border border-white/5 space-y-2">
                        <div>
                          <span className="text-xs font-bold text-white block">{inv.team.name}</span>
                          <span className="text-[10px] text-gray-500 block truncate">{inv.team.description || "Building at ETH Lima"}</span>
                        </div>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => handleRespondInvitation(inv.id, "ACCEPTED")}
                            className="flex-1 h-8 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] flex items-center justify-center gap-1 cursor-pointer"
                          >
                            <Check className="w-3.5 h-3.5" /> {t("app_teams.accept")}
                          </button>
                          <button 
                            onClick={() => handleRespondInvitation(inv.id, "REJECTED")}
                            className="h-8 w-8 rounded bg-red-600 hover:bg-red-500 text-white flex items-center justify-center cursor-pointer"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </>
        ) : (
          /* If User IS in a Team */
          <>
            {/* Team details and members */}
            <div className="md:col-span-8 space-y-6">
              <div className="rounded-xl border border-border bg-surface/50 p-6 space-y-6 shadow-sm backdrop-blur-md">
                <div className="flex justify-between items-start border-b border-white/5 pb-4">
                  {isEditing ? (
                    <form onSubmit={handleUpdateTeam} className="space-y-4 w-full">
                      <input 
                        value={teamName} 
                        onChange={(e) => setTeamName(e.target.value)} 
                        className="w-full h-10 px-3 rounded-lg bg-surface border border-border text-lg font-bold text-white focus:outline-none focus:border-brand-accent/50" 
                      />
                      <textarea 
                        value={teamDesc} 
                        onChange={(e) => setTeamDesc(e.target.value)} 
                        rows={2}
                        className="w-full px-3 py-2 rounded-lg bg-surface border border-border text-sm text-white focus:outline-none focus:border-brand-accent/50 resize-none" 
                      />
                      <div className="flex gap-2">
                        <button type="submit" className="h-8 px-4 rounded bg-fg text-bg font-bold text-xs hover:opacity-95 cursor-pointer">Save</button>
                        <button type="button" onClick={() => setIsEditing(false)} className="h-8 px-4 rounded bg-white/5 border border-white/10 text-white text-xs hover:bg-white/10 cursor-pointer">Cancel</button>
                      </div>
                    </form>
                  ) : (
                    <>
                      <div>
                        <h2 className="text-2xl font-black text-white">{team.name}</h2>
                        <p className="text-sm text-gray-500 mt-1">{team.description || "Building something amazing at ETH Lima 2026."}</p>
                      </div>
                      <div className="flex gap-2">
                        {isLeader && (
                          <button 
                            onClick={() => setIsEditing(true)} 
                            className="p-2 rounded-lg border border-border bg-surface hover:bg-fg/5 text-gray-400 hover:text-white transition-colors cursor-pointer"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                        )}
                        <button 
                          onClick={handleLeaveTeam}
                          className="px-3 h-9 rounded-lg border border-red-500/20 bg-red-500/5 hover:bg-red-500/10 text-red-400 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <LogOut className="w-3.5 h-3.5" /> Leave Team
                        </button>
                      </div>
                    </>
                  )}
                </div>

                {/* Invite Code row */}
                <div className="p-4 rounded-xl bg-brand-accent/5 border border-brand-accent/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-brand-accent animate-pulse" />
                    <div>
                      <span className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">{t("app_teams.invite_code")}</span>
                      <span className="text-sm font-mono font-bold text-white block uppercase tracking-wider">{team.inviteCode}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => copyCode(team.inviteCode)}
                    className="p-2 rounded-lg bg-surface border border-border hover:bg-fg/5 text-brand-accent flex items-center gap-1 text-xs cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" /> Copy Code
                  </button>
                </div>

                {/* Members List */}
                <div className="space-y-4">
                  <h3 className="text-xs font-mono text-gray-500 uppercase tracking-widest">{t("app_teams.team_members")}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {team.members.map((member: any) => {
                      const isMemberLeader = team.leaderId === member.id;
                      return (
                        <div key={member.id} className="p-4 rounded-xl bg-black/20 border border-white/5 flex flex-col justify-between space-y-3 relative group">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-xs font-bold text-brand-accent">
                              {member.name?.[0]}
                            </div>
                            <div className="flex flex-col min-w-0">
                              <span className="text-sm font-bold text-white flex items-center gap-1">
                                {member.name}
                                {member.id === session?.user?.id && <span className="text-[9px] text-gray-600 font-sans font-normal">(You)</span>}
                              </span>
                              <span className="text-[10px] text-gray-500 font-mono truncate">{member.email}</span>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-1 border-t border-white/5 pt-2">
                            {member.skills?.slice(0, 3).map((sk: string) => (
                              <Badge key={sk} variant="secondary" className="bg-white/5 text-[9px] px-1.5 py-0.5">
                                {sk}
                              </Badge>
                            ))}
                          </div>

                          <div className="flex items-center justify-between border-t border-white/5 pt-2 text-[10px] font-mono">
                            <div className="flex items-center gap-1.5">
                              {isMemberLeader ? (
                                <span className="text-red-400 font-bold flex items-center gap-1">
                                  <ShieldCheck className="w-3.5 h-3.5" /> Leader
                                </span>
                              ) : (
                                <span className="text-gray-500">Member</span>
                              )}
                            </div>
                            
                            {/* Leadership transfer button if current user is leader and member is not leader */}
                            {isLeader && !isMemberLeader && (
                              <button 
                                onClick={() => handleTransferLeadership(member.id)}
                                className="text-brand-accent hover:underline cursor-pointer"
                              >
                                {t("app_teams.transfer_leadership")}
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Invite members panel */}
            <div className="md:col-span-4 space-y-6">
              {isLeader && team.members.length < 4 ? (
                <div className="rounded-xl border border-border bg-surface/50 p-6 space-y-4 shadow-sm backdrop-blur-md">
                  <h2 className="text-sm font-mono text-gray-500 uppercase tracking-widest flex items-center gap-1.5">
                    <UserPlus className="w-4 h-4 text-brand-accent" /> {t("app_teams.invite_members")}
                  </h2>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                    <input 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search users..." 
                      className="w-full h-10 pl-10 pr-3 rounded-lg bg-surface border border-border text-xs focus:outline-none focus:border-brand-accent/50 text-white" 
                    />
                  </div>

                  <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1 custom-scrollbar">
                    {searchResults.length === 0 ? (
                      <p className="text-xs text-gray-500 font-mono italic">No builders found.</p>
                    ) : (
                      searchResults.map((usr) => (
                        <div key={usr.id} className="p-3 bg-black/20 rounded-lg border border-white/5 flex items-center justify-between gap-2">
                          <div className="min-w-0">
                            <span className="text-xs font-bold block text-white truncate">{usr.name}</span>
                            <span className="text-[9px] text-gray-500 font-mono block truncate">{usr.country} • {usr.skills?.[0] || "No skill"}</span>
                          </div>
                          <button 
                            onClick={() => handleInviteUser(usr.id)}
                            className="h-7 px-3 rounded bg-brand-accent text-white font-bold text-[10px] hover:opacity-90 shrink-0 cursor-pointer"
                          >
                            {t("app_teams.invite_btn")}
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              ) : isLeader ? (
                <div className="p-4 rounded-xl bg-white/2 border border-white/5 text-center text-xs text-gray-500 font-mono">
                  Your team is full (4 members).
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-white/2 border border-white/5 text-center text-xs text-gray-500 font-mono">
                  Only the team leader can invite members.
                </div>
              )}
            </div>
          </>
        )}

      </div>
    </div>
  );
}
