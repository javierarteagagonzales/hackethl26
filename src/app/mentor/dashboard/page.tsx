"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { getMentorships, updateMentorshipStatus } from "@/app/actions/mentorship";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { 
  CheckCircle2, 
  Clock, 
  XCircle, 
  MessageSquare, 
  User, 
  ExternalLink,
  Calendar,
  LayoutDashboard,
  LogOut,
  HelpCircle
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { LOGO_SRC } from "@/lib/asset-path";
import Link from "next/link";
import { signOut } from "next-auth/react";

export default function MentorDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [mentorships, setMentorships] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated") {
      if (session.user?.role !== "MENTOR" && session.user?.role !== "ADMIN") {
        router.push("/dashboard");
      } else {
        loadData();
      }
    }
  }, [status, router]);

  const loadData = async () => {
    setLoading(true);
    const result = await getMentorships();
    if (result.success) {
      setMentorships(result.mentorships || []);
    } else {
      toast.error(result.error || "Failed to load mentorships");
    }
    setLoading(false);
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    const result = await updateMentorshipStatus(id, newStatus);
    if (result.success) {
      toast.success(`Status updated to ${newStatus}`);
      loadData();
    } else {
      toast.error(result.error || "Update failed");
    }
  };

  if (loading) {
    return (
      <div className="h-screen bg-black flex flex-col items-center justify-center text-white space-y-4">
        <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
        <span className="font-mono text-xs uppercase tracking-widest text-gray-500">Initializing Mentor Terminal...</span>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-black text-white font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 flex flex-col shrink-0 bg-[#080808]">
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <Link href="/"><img src={LOGO_SRC} alt="ETH Lima" className="h-7 w-auto" /></Link>
          <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 text-[10px]">MENTOR</Badge>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm bg-blue-600/10 text-blue-400 border border-blue-500/20"><LayoutDashboard className="w-4 h-4" /> Requests</button>
          <Link href="/mentor" className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-500 hover:text-white transition-colors"><User className="w-4 h-4" /> Public Profile</Link>
          <a href="https://t.me/javierdgtl" target="_blank" rel="noreferrer" className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-500 hover:text-white transition-colors"><HelpCircle className="w-4 h-4" /> Support</a>
        </nav>

        <div className="p-4 border-t border-white/5 space-y-2">
          <button onClick={() => signOut({ callbackUrl: "/" })} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-500 hover:text-red-400 transition-colors"><LogOut className="w-4 h-4" /> Logout</button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <header className="h-16 border-b border-white/5 flex items-center justify-between px-8 bg-black/40 backdrop-blur-md sticky top-0 z-10">
          <h1 className="text-sm font-mono text-gray-500 uppercase tracking-widest">Mentor Dashboard // Session Management</h1>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-xs font-bold">{session?.user?.name}</div>
              <div className="text-[10px] text-gray-500">{session?.user?.email}</div>
            </div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-emerald-600 border border-white/10" />
          </div>
        </header>

        <div className="p-8 max-w-6xl mx-auto w-full">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <h2 className="text-3xl font-black tracking-tighter">Mentorship <span className="text-blue-500">Requests</span></h2>
              <p className="text-gray-500 text-sm mt-1">Manage and assist teams in real-time.</p>
            </div>
            <div className="flex gap-2">
              <Badge variant="outline" className="bg-white/5 border-white/10 px-3 py-1 text-[10px]">{mentorships.filter(m => m.status === "PENDING").length} Pending</Badge>
              <Badge variant="outline" className="bg-white/5 border-white/10 px-3 py-1 text-[10px]">{mentorships.filter(m => m.status === "IN_PROGRESS").length} In Progress</Badge>
            </div>
          </div>

          {mentorships.length === 0 ? (
            <div className="h-[400px] flex flex-col items-center justify-center border border-dashed border-white/5 rounded-2xl bg-white/1">
              <MessageSquare className="w-12 h-12 text-gray-800 mb-4" />
              <p className="text-gray-600 font-mono text-xs uppercase tracking-widest">Quiet terminal... no requests yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {mentorships.map((m) => (
                <motion.div 
                  key={m.id} 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-[#0A0A0A] border border-white/5 rounded-xl overflow-hidden group hover:border-white/10 transition-all"
                >
                  <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-xl ${
                        m.status === "PENDING" ? "bg-yellow-500/10 text-yellow-500" : 
                        m.status === "IN_PROGRESS" ? "bg-blue-500/10 text-blue-500" : 
                        "bg-emerald-500/10 text-emerald-500"
                      }`}>
                        {m.status === "PENDING" ? <Clock className="w-6 h-6" /> : <CheckCircle2 className="w-6 h-6" />}
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-lg">{m.topic}</h3>
                          <Badge variant="secondary" className="bg-white/5 text-[10px] uppercase font-mono">{m.status}</Badge>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span className="flex items-center gap-1.5"><Users className="w-3 h-3" /> Team: {m.team?.name}</span>
                          <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3" /> {new Date(m.scheduledAt).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      {m.status === "PENDING" && (
                        <button 
                          onClick={() => handleStatusChange(m.id, "IN_PROGRESS")}
                          className="px-4 h-10 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-all"
                        >
                          Accept Request
                        </button>
                      )}
                      {m.status === "IN_PROGRESS" && (
                        <button 
                          onClick={() => handleStatusChange(m.id, "COMPLETED")}
                          className="px-4 h-10 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all"
                        >
                          Mark Completed
                        </button>
                      )}
                      {m.status !== "COMPLETED" && (
                        <button 
                          onClick={() => handleStatusChange(m.id, "CANCELLED")}
                          className="p-2.5 rounded-lg border border-white/5 text-gray-500 hover:text-red-400 hover:bg-red-400/5 transition-all"
                        >
                          <XCircle className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  </div>
                  
                  {/* Team Members info */}
                  <div className="px-6 py-4 bg-white/2 border-t border-white/5 flex flex-wrap gap-4 items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-gray-600 uppercase">Members:</span>
                      {m.team?.members.map((member: any) => (
                        <div key={member.id} className="flex items-center gap-1.5 bg-black/40 border border-white/5 px-2 py-1 rounded text-[10px] text-gray-400">
                          <User className="w-2.5 h-2.5" /> {member.name}
                        </div>
                      ))}
                    </div>
                    {m.team?.project && (
                      <Link href={`/projects/${m.team.project.id}`} className="text-[10px] text-blue-500 hover:underline flex items-center gap-1">
                        View Project <ExternalLink className="w-2.5 h-2.5" />
                      </Link>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
