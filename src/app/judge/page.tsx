"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { getProjectsForJudging, submitOrUpdateEvaluation } from "@/app/actions/judge";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { LOGO_SRC } from "@/lib/asset-path";
import { 
  Trophy, 
  ExternalLink, 
  Code2, 
  Globe, 
  Video, 
  Star, 
  MessageSquare, 
  ChevronRight,
  ShieldCheck,
  LayoutDashboard,
  LogOut,
  X
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { signOut } from "next-auth/react";

export default function JudgePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Evaluation state
  const [evaluation, setEvaluation] = useState({
    innovation: 5,
    uxUi: 5,
    feasibility: 5,
    useOfArbitrum: 5,
    impact: 5,
    comments: ""
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated") {
      const role = (session.user as any).role;
      if (role !== "JUDGE" && role !== "ADMIN") {
        router.push("/dashboard");
        toast.error("Access denied. Judges only.");
      } else {
        loadProjects();
      }
    }
  }, [status, router]);

  const loadProjects = async () => {
    setLoading(true);
    const result = await getProjectsForJudging();
    if (result.success) {
      setProjects(result.projects || []);
    }
    setLoading(false);
  };

  const openEvaluation = (project: any) => {
    setSelectedProject(project);
    const existingEval = project.evaluations?.[0];
    if (existingEval) {
      setEvaluation({
        innovation: existingEval.innovation,
        uxUi: existingEval.uxUi,
        feasibility: existingEval.feasibility,
        useOfArbitrum: existingEval.useOfArbitrum,
        impact: existingEval.impact,
        comments: existingEval.comments || ""
      });
    } else {
      setEvaluation({
        innovation: 5,
        uxUi: 5,
        feasibility: 5,
        useOfArbitrum: 5,
        impact: 5,
        comments: ""
      });
    }
    setIsModalOpen(true);
  };

  const handleScoreChange = (field: string, val: number) => {
    setEvaluation(prev => ({ ...prev, [field]: val }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const result = await submitOrUpdateEvaluation({
      projectId: selectedProject.id,
      ...evaluation
    });

    if (result.success) {
      toast.success("Evaluation saved!");
      setIsModalOpen(false);
      loadProjects();
    } else {
      toast.error(result.error || "Failed to save evaluation");
    }
    setSubmitting(false);
  };

  if (loading) {
    return <div className="h-screen bg-black flex items-center justify-center text-white font-mono tracking-widest uppercase text-xs">Accessing Judging Terminal...</div>;
  }

  return (
    <div className="flex h-screen bg-black text-white font-sans overflow-hidden">
      {/* Sidebar Judge */}
      <aside className="w-64 border-r border-white/5 flex flex-col shrink-0 bg-[#080808]">
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <Link href="/"><img src={LOGO_SRC} alt="ETH Lima" className="h-7 w-auto" /></Link>
          <Badge className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20 text-[10px]">JUDGE</Badge>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm bg-yellow-500/5 text-yellow-400">
            <Trophy className="w-4 h-4" /> Evaluations
          </button>
          <Link href="/dashboard" className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-500 hover:text-white hover:bg-white/2">
            <LayoutDashboard className="w-4 h-4" /> Main Dashboard
          </Link>
        </nav>

        <div className="p-4 border-t border-white/5">
          <button onClick={() => signOut({ callbackUrl: "/" })} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-500 hover:text-red-400 transition-colors">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </aside>

      {/* Judge Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <header className="h-16 border-b border-white/5 flex items-center justify-between px-8 bg-black/40 backdrop-blur-md sticky top-0 z-10">
          <h2 className="text-sm font-bold tracking-tight uppercase font-mono text-gray-400">
            // Judging Terminal <span className="text-white mx-2">/</span> Projects List
          </h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] text-gray-400 font-mono">
              <ShieldCheck className="w-3 h-3 text-green-500" /> Secure Node Active
            </div>
          </div>
        </header>

        <div className="p-8">
          <div className="mb-10">
            <h1 className="text-3xl font-bold tracking-tight">Evaluate Submissions</h1>
            <p className="text-gray-500 text-sm mt-1">Review and score projects based on innovation, design, and impact.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {projects.map((proj) => (
              <motion.div 
                layout
                key={proj.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white/2 border border-white/8 rounded-xl overflow-hidden flex flex-col group hover:border-yellow-500/30 transition-all"
              >
                <div className="p-6 border-b border-white/5 bg-white/2 flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold group-hover:text-yellow-400 transition-colors">{proj.name}</h3>
                    <p className="text-xs text-blue-400 font-mono uppercase mt-1">Track: {proj.track?.title || "General"}</p>
                  </div>
                  {proj.evaluations?.length > 0 ? (
                    <Badge className="bg-green-500/10 text-green-500 border-green-500/20 text-[10px]">Scored</Badge>
                  ) : (
                    <Badge className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20 text-[10px]">Pending</Badge>
                  )}
                </div>
                
                <div className="p-6 flex-1 flex flex-col space-y-4">
                  <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">{proj.description}</p>
                  
                  <div className="flex flex-wrap gap-2 pt-2">
                    {proj.githubUrl && <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="p-1.5 rounded bg-white/5 border border-white/10 text-gray-500 hover:text-white transition-colors"><Code2 className="w-3.5 h-3.5" /></a>}
                    {proj.demoUrl && <a href={proj.demoUrl} target="_blank" rel="noreferrer" className="p-1.5 rounded bg-white/5 border border-white/10 text-gray-500 hover:text-white transition-colors"><Globe className="w-3.5 h-3.5" /></a>}
                    {proj.videoUrl && <a href={proj.videoUrl} target="_blank" rel="noreferrer" className="p-1.5 rounded bg-white/5 border border-white/10 text-gray-500 hover:text-white transition-colors"><Video className="w-3.5 h-3.5" /></a>}
                  </div>

                  <div className="pt-4 border-t border-white/5 mt-auto">
                    <button 
                      onClick={() => openEvaluation(proj)}
                      className="w-full h-9 rounded-lg bg-white text-black font-bold text-xs hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                    >
                      {proj.evaluations?.length > 0 ? "Edit Evaluation" : "Start Evaluation"} <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      {/* Evaluation Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="bg-[#0c0c0c] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-white/5 flex items-center justify-between sticky top-0 bg-[#0c0c0c] z-10">
                <div>
                  <h2 className="text-xl font-bold">{selectedProject?.name}</h2>
                  <p className="text-xs text-gray-500 font-mono">Evaluate technical and impact criteria</p>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="p-2 text-gray-500 hover:text-white"><X className="w-5 h-5" /></button>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {[
                    { id: "innovation", label: "Innovation", desc: "Originality and creativity" },
                    { id: "uxUi", label: "UX/UI Design", desc: "User experience and interface" },
                    { id: "feasibility", label: "Feasibility", desc: "Technical implementation" },
                    { id: "useOfArbitrum", label: "Web3 Integration", desc: "Use of Arbitrum/Blockchain" },
                    { id: "impact", label: "Impact", desc: "Potential for real-world use" }
                  ].map((item) => (
                    <div key={item.id} className="space-y-3">
                      <div className="flex justify-between items-center">
                        <div>
                          <label className="text-sm font-bold text-white">{item.label}</label>
                          <p className="text-[10px] text-gray-500">{item.desc}</p>
                        </div>
                        <span className="text-xl font-black text-yellow-500 font-mono">{(evaluation as any)[item.id]}</span>
                      </div>
                      <input 
                        type="range" min="1" max="10" step="1"
                        value={(evaluation as any)[item.id]}
                        onChange={(e) => handleScoreChange(item.id, parseInt(e.target.value))}
                        className="w-full accent-yellow-500 bg-white/5 h-1.5 rounded-full appearance-none cursor-pointer"
                      />
                      <div className="flex justify-between text-[8px] text-gray-600 font-mono uppercase tracking-widest">
                        <span>Low</span>
                        <span>Mid</span>
                        <span>High</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 pt-4 border-t border-white/5">
                  <label className="text-sm font-bold text-white flex items-center gap-2"><MessageSquare className="w-3 h-3 text-gray-500" /> Judge Comments</label>
                  <textarea 
                    value={evaluation.comments}
                    onChange={(e) => setEvaluation(prev => ({ ...prev, comments: e.target.value }))}
                    placeholder="Provide constructive feedback for the team..."
                    rows={4}
                    className="w-full p-4 rounded-xl bg-black border border-white/10 text-sm focus:outline-none focus:border-yellow-500/50 transition-all resize-none"
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button 
                    type="button" 
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 h-12 rounded-xl border border-white/10 text-sm font-bold hover:bg-white/5 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    disabled={submitting}
                    className="flex-1 h-12 rounded-xl bg-yellow-500 text-black font-bold text-sm hover:bg-yellow-400 transition-colors shadow-[0_0_20px_rgba(234,179,8,0.3)] flex items-center justify-center gap-2"
                  >
                    {submitting ? "Saving..." : "Submit Evaluation"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
