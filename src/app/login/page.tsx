"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, GitBranch, Wallet, HelpCircle } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const email = (target.elements.namedItem("email") as HTMLInputElement)?.value;
    if (email && (email.includes("admin") || email.includes("super"))) {
      router.push("/admin");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col lg:flex-row">
      {/* BG effects */}
      <div className="fixed inset-0 z-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #3b82f6 1px, transparent 0)", backgroundSize: "48px 48px" }} />
      <div className="fixed top-0 left-0 w-[500px] h-[500px] bg-blue-600/15 blur-[120px] rounded-full pointer-events-none z-0" />

      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-12 border-r border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/30 via-black to-black" />
        {/* Decorative hex grid pattern */}
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='49'%3E%3Cpath d='M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15zm0 15l13 7.5v15l-13 7.5L1 46.75v-15z' fill='none' stroke='%233b82f6' stroke-width='1'/%3E%3C/svg%3E\")" }} />
        
        <div className="relative z-10">
          <Link href="/">
            <Image src="/Ethlogo.png" alt="ETH Lima" width={120} height={40} className="h-9 w-auto" unoptimized />
          </Link>
        </div>

        <div className="relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="font-mono text-xs text-blue-400 mb-4 tracking-[0.3em] uppercase">// System access</div>
            <h1 className="text-5xl font-black tracking-tighter mb-6 leading-tight">
              Welcome back<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">to the arena.</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-sm leading-relaxed">
              Access your dashboard, connect with your team, and manage your hackathon project.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.3 }} className="mt-12 grid grid-cols-3 gap-4">
            {[
              { label: "Hackers", value: "500+" },
              { label: "Prize Pool", value: "$10K+" },
              { label: "Tracks", value: "2+" },
            ].map((stat) => (
              <div key={stat.label} className="border border-white/5 rounded-lg p-4 bg-white/2">
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-gray-500 mt-1 font-mono">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="relative z-10 text-xs text-gray-600 font-mono">
          © 2026 Ethereum Lima — All rights reserved
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <div className="lg:hidden mb-10">
            <Link href="/">
              <Image src="/Ethlogo.png" alt="ETH Lima" width={100} height={32} className="h-8 w-auto" unoptimized />
            </Link>
          </div>

          <h2 className="text-2xl font-bold tracking-tight mb-1">Sign in</h2>
          <p className="text-sm text-gray-500 mb-8">Use your credentials or connect via OAuth.</p>

          {/* OAuth buttons */}
          <div className="space-y-3 mb-8">
            <button
              onClick={() => router.push("/dashboard")}
              className="w-full flex items-center justify-center gap-2 h-11 rounded-lg border border-white/10 bg-white/5 text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-all"
            >
              <GitBranch className="w-4 h-4" /> Continue with GitHub
            </button>
            <button
              onClick={() => router.push("/dashboard")}
              className="w-full flex items-center justify-center gap-2 h-11 rounded-lg border border-white/10 bg-white/5 text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-all"
            >
              <span className="font-bold text-base leading-none">G</span> Continue with Google
            </button>
            <button
              onClick={() => router.push("/dashboard")}
              className="w-full flex items-center justify-center gap-2 h-11 rounded-lg border border-blue-500/30 bg-blue-500/10 text-sm text-blue-400 hover:bg-blue-500/20 transition-all"
            >
              <Wallet className="w-4 h-4" /> Connect Wallet
            </button>
          </div>

          <div className="flex items-center gap-3 mb-8">
            <div className="flex-1 h-px bg-white/5" />
            <span className="text-xs text-gray-600 font-mono uppercase tracking-widest">or email</span>
            <div className="flex-1 h-px bg-white/5" />
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs text-gray-400 font-mono uppercase tracking-widest block mb-2">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="hacker@ethlima.org"
                required
                className="w-full h-11 px-4 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-blue-500/50 focus:bg-white/8 transition-all"
              />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-xs text-gray-400 font-mono uppercase tracking-widest">Password</label>
                <Link href="#" className="text-xs text-blue-400 hover:text-blue-300 transition-colors">Forgot?</Link>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                required
                className="w-full h-11 px-4 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-blue-500/50 focus:bg-white/8 transition-all"
              />
            </div>
            <button
              type="submit"
              className="w-full h-11 mt-2 rounded-lg bg-white text-black font-semibold text-sm flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors"
            >
              Sign In <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Test accounts */}
          <div className="mt-8 rounded-xl border border-white/5 bg-white/2 p-4">
            <div className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-3">// Test accounts</div>
            <div className="space-y-2 font-mono text-xs">
              {[
                { role: "superadmin", email: "super@ethlima.org", pass: "test1234" },
                { role: "admin", email: "admin@ethlima.org", pass: "test1234" },
                { role: "hacker", email: "hacker@ethlima.org", pass: "test1234" },
              ].map((acc) => (
                <div key={acc.role} className="flex items-center justify-between py-1 border-b border-white/5 last:border-0">
                  <span className="text-gray-600">{acc.role}</span>
                  <span className="text-gray-400">{acc.email}</span>
                  <span className="text-gray-600">{acc.pass}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-center text-sm text-gray-600 mt-6">
            ¿No tienes cuenta?{" "}
            <Link href="/register" className="text-blue-400 hover:text-blue-300 transition-colors">Apply now →</Link>
          </p>

          <div className="mt-6 text-center">
            <a href="https://t.me/javierdgtl" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs text-gray-600 hover:text-gray-400 transition-colors">
              <HelpCircle className="w-3 h-3" /> ¿Necesitas ayuda? @javierdgtl
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
