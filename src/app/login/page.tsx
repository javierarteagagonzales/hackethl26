"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { LOGO_SRC } from "@/lib/asset-path";
import { motion } from "framer-motion";
import { Code2, Mail, ArrowRight, ShieldCheck, Zap, Globe } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col md:flex-row font-sans overflow-hidden">
      
      {/* Decorative background for mobile */}
      <div className="fixed inset-0 z-0 opacity-10 pointer-events-none md:hidden" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #3b82f6 1px, transparent 0)", backgroundSize: "40px 40px" }} />

      {/* Left panel: Branding \u0026 Stats (Desktop) */}
      <div className="hidden md:flex md:w-1/2 bg-[#050505] border-r border-white/5 relative flex-col justify-between p-12 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-blue/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        
        <div className="relative z-10">
          <Link href="/">
            <img src={LOGO_SRC} alt="ETH Lima" className="h-9 w-auto" />
          </Link>
        </div>

        <div className="relative z-10 space-y-8">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-5xl lg:text-6xl font-black tracking-tighter leading-tight">
              Build the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-purple-500 to-brand-red">Decentralized</span> <br />
              Future.
            </h1>
          </motion.div>

          <div className="grid grid-cols-2 gap-6 pt-8">
            {[
              { label: "Participants", val: "1,200+", icon: <Globe className="w-4 h-4" /> },
              { label: "Bounties", val: "$10,000", icon: <Zap className="w-4 h-4" /> },
              { label: "Sponsors", val: "15+", icon: <ShieldCheck className="w-4 h-4" /> },
            ].map((stat, i) => (
              <div key={i} className="space-y-1">
                <div className="flex items-center gap-2 text-gray-500 text-xs font-mono uppercase tracking-widest">
                  {stat.icon} {stat.label}
                </div>
                <div className="text-2xl font-bold">{stat.val}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 text-xs text-gray-600 font-mono">
          © 2026 Ethereum Lima. All rights reserved.
        </div>
      </div>

      {/* Right panel: Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 relative z-10">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center md:text-left">
            <div className="md:hidden mb-8 flex justify-center">
              <img src={LOGO_SRC} alt="ETH Lima" className="h-8 w-auto" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight">Welcome back</h2>
            <p className="text-gray-500 mt-2 text-sm">Enter your credentials to access your hacker dashboard.</p>
          </div>

          <div className="space-y-4">
            <button className="w-full h-11 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center gap-3 hover:bg-white/10 transition-all group">
              <Code2 className="w-5 h-5" />
              <span className="text-sm font-medium">Continue with GitHub</span>
            </button>
            <button className="w-full h-11 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center gap-3 hover:bg-white/10 transition-all">
              <Mail className="w-5 h-5 text-gray-400" />
              <span className="text-sm font-medium">Continue with Google</span>
            </button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-black px-4 text-gray-600 font-mono">Or with email</span></div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs text-gray-500 font-medium ml-1">Email</label>
              <input type="email" placeholder="hacker@ethlima.org" required className="w-full h-11 px-4 rounded-lg bg-white/5 border border-white/10 text-sm focus:outline-none focus:border-brand-blue/50 transition-all placeholder:text-gray-700" />
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between ml-1">
                <label className="text-xs text-gray-500 font-medium">Password</label>
                <Link href="#" className="text-[10px] text-brand-blue hover:underline">Forgot password?</Link>
              </div>
              <input type="password" placeholder="••••••••" required className="w-full h-11 px-4 rounded-lg bg-white/5 border border-white/10 text-sm focus:outline-none focus:border-brand-blue/50 transition-all placeholder:text-gray-700" />
            </div>
            
            <button type="submit" className="w-full h-11 rounded-lg bg-brand-blue hover:bg-brand-blue/90 text-white font-bold text-sm shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all flex items-center justify-center gap-2 group">
              Sign In <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="text-center">
            <p className="text-xs text-gray-600">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-brand-blue hover:underline font-medium">Register as Hacker</Link>
            </p>
          </div>

          {/* Test accounts notice */}
          <div className="p-4 rounded-lg bg-blue-500/5 border border-blue-500/10 text-[10px] text-gray-500 space-y-1 leading-relaxed">
            <p className="font-bold text-blue-400 uppercase tracking-widest mb-1 font-mono">// Sandbox mode</p>
            <p>Admin: admin@ethlima.org / admin123</p>
            <p>Hacker: hacker@ethlima.org / hacker123</p>
          </div>
        </div>
      </div>
    </div>
  );
}
