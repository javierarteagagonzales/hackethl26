"use client";

import { useEffect, useState } from "react";
import { getApplications, updateApplicationStatus } from "@/app/actions/admin";
import { useTranslation } from "@/components/providers/language-provider";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { 
  Search, Filter, Clock, CheckCircle, XCircle, AlertCircle, 
  ChevronRight, Calendar, User, Code2, Globe, MapPin, 
  Briefcase, Mail, Phone, Award, ShieldAlert 
} from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function ApplicationsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { t } = useTranslation();
  
  const [applications, setApplications] = useState<any[]>([]);
  const [selectedApp, setSelectedApp] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  
  const [filterStatus, setFilterStatus] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated") {
      if (session?.user?.role !== "ADMIN" && session?.user?.role !== "SUPERADMIN") {
        router.push("/dashboard");
      } else {
        fetchApps();
      }
    }
  }, [status, session, router]);

  const fetchApps = async () => {
    setLoading(true);
    const result = await getApplications({
      status: filterStatus === "ALL" ? undefined : filterStatus,
      search: searchQuery || undefined
    });
    if (result.success) {
      setApplications(result.applications || []);
    } else {
      toast.error("Failed to load applications");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (status === "authenticated") {
      fetchApps();
    }
  }, [filterStatus, searchQuery]);

  const handleSelectApp = (app: any) => {
    setSelectedApp(app);
    setNotes(app.adminNotes || "");
  };

  const handleUpdateStatus = async (appId: string, newStatus: "APPROVED" | "REJECTED" | "WAITLIST" | "UNDER_REVIEW") => {
    setUpdating(true);
    const result = await updateApplicationStatus(appId, newStatus, notes);
    if (result.success) {
      toast.success(t("app_admin.status_updated"));
      // Refresh current selection
      setSelectedApp(result.application);
      fetchApps();
    } else {
      toast.error(result.error || "Failed to update status");
    }
    setUpdating(false);
  };

  const handleSaveNotes = async () => {
    if (!selectedApp) return;
    setUpdating(true);
    const result = await updateApplicationStatus(selectedApp.id, selectedApp.status, notes);
    if (result.success) {
      toast.success(t("app_admin.notes_saved"));
      setSelectedApp(result.application);
      fetchApps();
    } else {
      toast.error(result.error || "Failed to save notes");
    }
    setUpdating(false);
  };

  const getStatusBadge = (statusStr: string) => {
    switch (statusStr) {
      case "PENDING":
        return <Badge className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">PENDING</Badge>;
      case "UNDER_REVIEW":
        return <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20">UNDER REVIEW</Badge>;
      case "APPROVED":
        return <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">APPROVED</Badge>;
      case "WAITLIST":
        return <Badge className="bg-purple-500/10 text-purple-500 border-purple-500/20">WAITLIST</Badge>;
      case "REJECTED":
        return <Badge className="bg-red-500/10 text-red-500 border-red-500/20">REJECTED</Badge>;
      default:
        return <Badge>{statusStr}</Badge>;
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="h-screen bg-black flex flex-col items-center justify-center text-white space-y-4">
        <div className="w-12 h-12 border-4 border-red-500/20 border-t-red-500 rounded-full animate-spin" />
        <span className="font-mono text-xs uppercase tracking-widest text-gray-500">Accessing Application Core...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-w-0 h-full">
      <header className="h-16 border-b border-white/5 flex items-center justify-between px-8 bg-black/40 backdrop-blur-xl sticky top-0 z-20">
        <h2 className="text-xs font-bold tracking-tight uppercase font-mono text-gray-500 flex items-center gap-2">
          <ShieldAlert className="w-3.5 h-3.5 text-red-500" /> Admin Controller <span className="text-white/20">/</span> <span className="text-white">Applications</span>
        </h2>
      </header>

      <div className="p-8 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left column: List */}
        <div className={`space-y-6 ${selectedApp ? "lg:col-span-6" : "lg:col-span-12"} transition-all duration-300`}>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div>
              <h1 className="text-2xl font-black tracking-tight">{t("app_admin.title")}</h1>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                <input 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t("app_admin.search_placeholder")} 
                  className="w-full h-10 pl-10 pr-4 rounded-xl bg-black border border-white/10 text-sm focus:outline-none focus:border-red-500/30 transition-all text-white" 
                />
              </div>
            </div>
          </div>

          {/* Status Filters */}
          <div className="flex flex-wrap gap-2 border-b border-white/5 pb-4">
            {["ALL", "PENDING", "UNDER_REVIEW", "APPROVED", "WAITLIST", "REJECTED"].map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                  filterStatus === st 
                    ? "bg-red-500/10 text-red-500 border-red-500/30" 
                    : "bg-white/2 border-white/5 text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {t(`app_admin.${st.toLowerCase()}`)}
              </button>
            ))}
          </div>

          <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
            {applications.length === 0 ? (
              <div className="text-center py-12 border border-dashed border-white/5 rounded-2xl">
                <p className="text-sm text-gray-500 font-mono">{t("app_admin.no_applications")}</p>
              </div>
            ) : (
              applications.map((app) => {
                const info = app.personalInfo as any;
                const trackInfo = app.track as any;
                const isSelected = selectedApp?.id === app.id;
                
                return (
                  <div 
                    key={app.id} 
                    onClick={() => handleSelectApp(app)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between group ${
                      isSelected 
                        ? "border-red-500/50 bg-red-500/5" 
                        : "border-white/5 bg-white/2 hover:border-white/10"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-xs font-bold text-red-400">
                        {info?.firstName?.[0]}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold group-hover:text-red-400 transition-colors">
                          {info?.firstName} {info?.lastName}
                        </span>
                        <span className="text-[10px] text-gray-500 font-mono">
                          {info?.email} • {trackInfo?.selectedTrack}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {getStatusBadge(app.status)}
                      <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors" />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right column: Details panel */}
        {selectedApp && (
          <div className="lg:col-span-6 rounded-2xl border border-white/8 bg-white/2 p-6 space-y-6 shadow-2xl backdrop-blur-md overflow-y-auto max-h-[80vh] custom-scrollbar">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <User className="w-5 h-5 text-red-500" /> {t("app_admin.applicant_details")}
              </h2>
              <button 
                onClick={() => setSelectedApp(null)} 
                className="text-xs text-gray-500 hover:text-white transition-colors"
              >
                Close
              </button>
            </div>

            {/* Application Details Content */}
            <div className="space-y-6 text-sm">
              
              {/* Status Section */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-black/40 border border-white/5">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="font-mono text-xs uppercase tracking-widest text-gray-500">Status</span>
                </div>
                {getStatusBadge(selectedApp.status)}
              </div>

              {/* Personal Info */}
              <div className="space-y-3">
                <h3 className="text-xs font-mono text-gray-500 uppercase tracking-widest flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" /> 01. Personal Info
                </h3>
                <div className="grid grid-cols-2 gap-4 bg-black/20 p-4 rounded-xl border border-white/5">
                  <div>
                    <span className="text-[10px] text-gray-600 block">Name</span>
                    <span className="font-bold">{(selectedApp.personalInfo as any).firstName} {(selectedApp.personalInfo as any).lastName}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-600 block">Email</span>
                    <span className="font-mono text-xs text-blue-400">{(selectedApp.personalInfo as any).email}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-600 block">Phone</span>
                    <span>{(selectedApp.personalInfo as any).phone}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-600 block">Birth Date</span>
                    <span>{new Date((selectedApp.personalInfo as any).birthDate).toLocaleDateString()}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-600 block">Location</span>
                    <span>{(selectedApp.personalInfo as any).city}, {(selectedApp.personalInfo as any).country}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-600 block">Identity Document</span>
                    <span>{(selectedApp.personalInfo as any).identityDocument || "N/A"}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-600 block">Pronouns</span>
                    <span>{(selectedApp.personalInfo as any).pronouns || "N/A"}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-600 block">Photo URL</span>
                    <span className="text-xs truncate block max-w-[150px]">{(selectedApp.personalInfo as any).photoUrl || "N/A"}</span>
                  </div>
                </div>
              </div>

              {/* Professional Profile */}
              <div className="space-y-3">
                <h3 className="text-xs font-mono text-gray-500 uppercase tracking-widest flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5" /> 02. Professional Profile
                </h3>
                <div className="bg-black/20 p-4 rounded-xl border border-white/5 space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-[10px] text-gray-600 block">University</span>
                      <span>{(selectedApp.professionalInfo as any).university}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-600 block">Major</span>
                      <span>{(selectedApp.professionalInfo as any).major}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-600 block">Company</span>
                      <span>{(selectedApp.professionalInfo as any).company}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-600 block">Position</span>
                      <span>{(selectedApp.professionalInfo as any).position}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-600 block">Academic Level</span>
                      <span>{(selectedApp.professionalInfo as any).academicLevel}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-600 block">Study Year</span>
                      <span>{(selectedApp.professionalInfo as any).studyYear}</span>
                    </div>
                  </div>
                  <div className="border-t border-white/5 pt-2">
                    <span className="text-[10px] text-gray-600 block">Bio</span>
                    <p className="text-xs text-gray-400 italic">{(selectedApp.professionalInfo as any).shortBio}</p>
                  </div>
                </div>
              </div>

              {/* Experience & Wallet */}
              <div className="space-y-3">
                <h3 className="text-xs font-mono text-gray-500 uppercase tracking-widest flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5" /> 03. Experience & Web3
                </h3>
                <div className="bg-black/20 p-4 rounded-xl border border-white/5 space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-[10px] text-gray-600 block">Level</span>
                      <span>{(selectedApp.experience as any).level}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-600 block">Years Exp.</span>
                      <span>{(selectedApp.experience as any).yearsOfExperience}</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-600 block">Previous Hackathons</span>
                    <p className="text-xs text-gray-400">{(selectedApp.experience as any).previousHackathons}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-600 block">Highlighted Projects</span>
                    <p className="text-xs text-gray-400">{(selectedApp.experience as any).highlightedProjects}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-2 font-mono text-xs">
                    <div>
                      <span className="text-[10px] text-gray-600 block font-sans">GitHub</span>
                      <a href={(selectedApp.experience as any).github} target="_blank" className="text-blue-400 hover:underline flex items-center gap-1">
                        <Code2 className="w-3 h-3" /> Link
                      </a>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-600 block font-sans">Portfolio</span>
                      {(selectedApp.experience as any).portfolio ? (
                        <a href={(selectedApp.experience as any).portfolio} target="_blank" className="text-blue-400 hover:underline flex items-center gap-1">
                          <Globe className="w-3 h-3" /> Link
                        </a>
                      ) : "N/A"}
                    </div>
                  </div>
                  <div className="border-t border-white/5 pt-2">
                    <span className="text-[10px] text-gray-600 block">Ethereum Wallet</span>
                    <span className="font-mono text-xs text-emerald-400">{(selectedApp.experience as any).wallet}</span>
                    {(selectedApp.experience as any).ens && (
                      <span className="text-[10px] text-gray-500 font-mono ml-2">({(selectedApp.experience as any).ens})</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div className="space-y-3">
                <h3 className="text-xs font-mono text-gray-500 uppercase tracking-widest">04. Skills</h3>
                <div className="flex flex-wrap gap-1.5 p-3 bg-black/20 rounded-xl border border-white/5">
                  {(selectedApp.skills as string[]).map((skill, idx) => (
                    <Badge key={idx} variant="secondary" className="bg-white/5 text-[10px]">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Track */}
              <div className="space-y-3">
                <h3 className="text-xs font-mono text-gray-500 uppercase tracking-widest">05. Track Preference</h3>
                <div className="bg-black/20 p-4 rounded-xl border border-white/5 space-y-2">
                  <div>
                    <span className="text-[10px] text-gray-600 block">Track</span>
                    <span className="font-bold text-red-400">{(selectedApp.track as any).selectedTrack}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-600 block">Project Idea</span>
                    <p className="text-xs text-gray-400">{(selectedApp.track as any).whatToBuild}</p>
                  </div>
                </div>
              </div>

              {/* Motivation */}
              <div className="space-y-3">
                <h3 className="text-xs font-mono text-gray-500 uppercase tracking-widest">06. Motivation</h3>
                <div className="bg-black/20 p-4 rounded-xl border border-white/5 space-y-3">
                  <div>
                    <span className="text-[10px] text-gray-600 block">Why Participate</span>
                    <p className="text-xs text-gray-400">{(selectedApp.motivation as any).whyParticipate}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-600 block">Expected Outcomes</span>
                    <p className="text-xs text-gray-400">{(selectedApp.motivation as any).whatToExpect}</p>
                  </div>
                </div>
              </div>

              {/* Admin Notes */}
              <div className="space-y-2 border-t border-white/10 pt-4">
                <label className="text-xs font-mono text-gray-500 uppercase tracking-widest block">
                  {t("app_admin.admin_notes")}
                </label>
                <textarea 
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3} 
                  placeholder="Escribe comentarios internos sobre el candidato..." 
                  className="w-full px-3 py-2 rounded-xl bg-black border border-white/10 text-xs focus:outline-none focus:border-red-500/50 transition-all resize-none text-white" 
                />
                <button 
                  onClick={handleSaveNotes}
                  disabled={updating}
                  className="h-9 px-4 rounded-lg bg-white/5 border border-white/10 text-white font-medium text-xs hover:bg-white/10 transition-all cursor-pointer"
                >
                  {t("app_admin.save_notes")}
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-4 border-t border-white/10">
                <button
                  onClick={() => handleUpdateStatus(selectedApp.id, "APPROVED")}
                  disabled={updating || selectedApp.status === "APPROVED"}
                  className="flex-1 h-10 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all disabled:opacity-50 cursor-pointer shadow-md"
                >
                  <CheckCircle className="w-4 h-4" /> {t("app_admin.approve")}
                </button>
                <button
                  onClick={() => handleUpdateStatus(selectedApp.id, "WAITLIST")}
                  disabled={updating || selectedApp.status === "WAITLIST"}
                  className="flex-1 h-10 px-4 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all disabled:opacity-50 cursor-pointer shadow-md"
                >
                  <Clock className="w-4 h-4" /> {t("app_admin.waitlist_btn")}
                </button>
                <button
                  onClick={() => handleUpdateStatus(selectedApp.id, "REJECTED")}
                  disabled={updating || selectedApp.status === "REJECTED"}
                  className="flex-1 h-10 px-4 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all disabled:opacity-50 cursor-pointer shadow-md"
                >
                  <XCircle className="w-4 h-4" /> {t("app_admin.reject")}
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
