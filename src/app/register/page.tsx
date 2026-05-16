"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { LOGO_SRC } from "@/lib/asset-path";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";
import { registerHacker } from "@/app/actions/register";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const SKILLS = ["Smart Contract Engineer", "Frontend Developer", "Backend Developer", "UI/UX Designer", "Product Manager", "Data Scientist", "Full Stack Dev", "Blockchain Researcher"];
const TRACKS = ["Arbitrum", "Arkiv — Job Platform", "Arkiv — Wikis", "Arkiv — Events", "To be defined"];

const registerSchema = z.object({
  firstName: z.string().min(2, "First name is too short"),
  lastName: z.string().min(2, "Last name is too short"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  github: z.string().min(1, "GitHub username is required"),
  walletAddress: z.string().optional(),
  skills: z.string().min(1, "Please select a skill"),
  track: z.string().min(1, "Please select a track"),
  bio: z.string().optional(),
});

type RegisterValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      skills: SKILLS[0],
      track: TRACKS[0],
    }
  });

  const onSubmit = async (values: RegisterValues) => {
    setLoading(true);
    setError("");
    
    // Transform to FormData for the existing server action
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (value) formData.append(key, value as string);
    });

    const result = await registerHacker(formData);
    
    if (result.success) {
      router.push("/dashboard");
    } else {
      setError(result.error || "An error occurred");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <div className="fixed inset-0 z-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #3b82f6 1px, transparent 0)", backgroundSize: "48px 48px" }} />
      <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-purple-600/10 blur-[130px] rounded-full pointer-events-none z-0" />

      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-white/5 bg-black/80 backdrop-blur-xl">
        <div className="container mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/">
            <img src={LOGO_SRC} alt="ETH Lima" className="h-7 w-auto" />
          </Link>
          <Link href="/login" className="text-xs text-gray-500 hover:text-white transition-colors">Already have an account? →</Link>
        </div>
      </nav>

      <div className="relative z-10 container mx-auto px-6 py-12 max-w-2xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          {/* Header */}
          <div className="mb-12">
            <div className="font-mono text-xs text-blue-400 mb-3 tracking-[0.3em] uppercase">// Application form</div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">Apply as <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Hacker</span></h1>
            <p className="text-gray-400 text-lg">Join the premier Web3 hackathon in Latin America. 48h to build the future.</p>
          </div>

          {/* Perks row */}
          <div className="grid grid-cols-3 gap-3 mb-10">
            {["Free to join", "$10K+ prizes", "Mentors available"].map(p => (
              <div key={p} className="flex items-center gap-2 text-sm text-gray-400 border border-white/5 rounded-lg p-3 bg-white/2">
                <CheckCircle className="w-4 h-4 text-green-500 shrink-0" /> {p}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {error && <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm">{error}</div>}
            
            {/* Personal info */}
            <div className="rounded-xl border border-white/8 bg-white/2 p-6 space-y-4">
              <h2 className="text-xs font-mono text-gray-500 uppercase tracking-widest">01. Personal Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-500 block mb-1.5">First Name</label>
                  <input {...register("firstName")} placeholder="Javier" className="w-full h-10 px-3 rounded-lg bg-white/5 border border-white/10 text-sm placeholder:text-gray-700 focus:outline-none focus:border-blue-500/50 transition-all" />
                  {errors.firstName && <p className="text-[10px] text-red-500 mt-1">{errors.firstName.message}</p>}
                </div>
                <div>
                  <label className="text-xs text-gray-500 block mb-1.5">Last Name</label>
                  <input {...register("lastName")} placeholder="Doe" className="w-full h-10 px-3 rounded-lg bg-white/5 border border-white/10 text-sm placeholder:text-gray-700 focus:outline-none focus:border-blue-500/50 transition-all" />
                  {errors.lastName && <p className="text-[10px] text-red-500 mt-1">{errors.lastName.message}</p>}
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-500 block mb-1.5">Email</label>
                <input {...register("email")} type="email" placeholder="hacker@ethlima.org" className="w-full h-10 px-3 rounded-lg bg-white/5 border border-white/10 text-sm placeholder:text-gray-700 focus:outline-none focus:border-blue-500/50 transition-all" />
                {errors.email && <p className="text-[10px] text-red-500 mt-1">{errors.email.message}</p>}
              </div>
              <div>
                <label className="text-xs text-gray-500 block mb-1.5">Password</label>
                <input {...register("password")} type="password" placeholder="••••••••" className="w-full h-10 px-3 rounded-lg bg-white/5 border border-white/10 text-sm placeholder:text-gray-700 focus:outline-none focus:border-blue-500/50 transition-all" />
                {errors.password && <p className="text-[10px] text-red-500 mt-1">{errors.password.message}</p>}
              </div>
            </div>

            {/* Web3 profile */}
            <div className="rounded-xl border border-white/8 bg-white/2 p-6 space-y-4">
              <h2 className="text-xs font-mono text-gray-500 uppercase tracking-widest">02. Web3 Profile</h2>
              <div>
                <label className="text-xs text-gray-500 block mb-1.5">GitHub Username</label>
                <div className="flex items-center">
                  <span className="h-10 px-3 flex items-center bg-white/3 border border-r-0 border-white/10 rounded-l-lg text-gray-600 text-sm">github.com/</span>
                  <input {...register("github")} placeholder="your-user" className="flex-1 h-10 px-3 rounded-r-lg bg-white/5 border border-white/10 text-sm placeholder:text-gray-700 focus:outline-none focus:border-blue-500/50 transition-all" />
                </div>
                {errors.github && <p className="text-[10px] text-red-500 mt-1">{errors.github.message}</p>}
              </div>
              <div>
                <label className="text-xs text-gray-500 block mb-1.5">Wallet Address (optional)</label>
                <input {...register("walletAddress")} placeholder="0x..." className="w-full h-10 px-3 rounded-lg bg-white/5 border border-white/10 text-sm font-mono placeholder:text-gray-700 focus:outline-none focus:border-blue-500/50 transition-all" />
              </div>
              <div>
                <label className="text-xs text-gray-500 block mb-1.5">Primary Skill</label>
                <select {...register("skills")} className="w-full h-10 px-3 rounded-lg bg-white/5 border border-white/10 text-sm text-gray-300 focus:outline-none focus:border-blue-500/50 transition-all appearance-none">
                  {SKILLS.map(s => <option key={s} value={s} className="bg-black">{s}</option>)}
                </select>
                {errors.skills && <p className="text-[10px] text-red-500 mt-1">{errors.skills.message}</p>}
              </div>
            </div>

            {/* Track preference */}
            <div className="rounded-xl border border-white/8 bg-white/2 p-6 space-y-4">
              <h2 className="text-xs font-mono text-gray-500 uppercase tracking-widest">03. Track Preference</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {TRACKS.map(t => (
                  <label key={t} className="flex items-center gap-3 p-3 rounded-lg border border-white/5 bg-white/2 hover:bg-white/5 cursor-pointer transition-all text-sm text-gray-300 has-[:checked]:border-blue-500/50 has-[:checked]:bg-blue-500/5">
                    <input type="radio" value={t} {...register("track")} className="accent-blue-500" />
                    {t}
                  </label>
                ))}
              </div>
              {errors.track && <p className="text-[10px] text-red-500 mt-1">{errors.track.message}</p>}
              <div>
                <label className="text-xs text-gray-500 block mb-1.5">Why do you want to participate? (optional)</label>
                <textarea {...register("bio")} rows={3} placeholder="Tell us what motivates you to join ETH Lima 2026..." className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm placeholder:text-gray-700 focus:outline-none focus:border-blue-500/50 transition-all resize-none" />
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full h-12 rounded-lg bg-white text-black font-bold text-sm flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? "Processing..." : "Submit Application"} <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
