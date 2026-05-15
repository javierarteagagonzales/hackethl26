"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Code2, GitBranch, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const email = (target.elements.namedItem('email') as HTMLInputElement)?.value;
    
    if (email && (email.includes("admin") || email.includes("super"))) {
      router.push("/admin");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {/* Left side: Branding */}
      <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-between border-r border-white/10 relative overflow-hidden bg-black/50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-blue-900/20 via-background to-background"></div>
        
        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-2 inline-flex">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center">
              <Code2 className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold tracking-tight">ETH Lima 2026</span>
          </Link>
        </div>

        <div className="relative z-10 mt-20 md:mt-0">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
              Welcome back <br /> to the arena.
            </h1>
            <p className="text-lg text-muted-foreground max-w-md">
              Log in to access your dashboard, connect with mentors, and manage your hackathon project.
            </p>
          </motion.div>
        </div>
        
        <div className="relative z-10 hidden md:block text-sm text-muted-foreground">
          © 2026 ETH Lima. All rights reserved.
        </div>
      </div>

      {/* Right side: Form */}
      <div className="w-full md:w-1/2 p-8 md:p-24 flex items-center justify-center bg-background">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold tracking-tight">Sign in to your account</h2>
            <p className="text-sm text-muted-foreground mt-2">Choose your preferred login method</p>
          </div>

          <div className="space-y-4">
            <Button variant="outline" className="w-full h-12 border-white/10 bg-white/5 hover:bg-white/10" onClick={handleLogin}>
              <GitBranch className="w-5 h-5 mr-2" /> Continue with GitHub
            </Button>
            <Button variant="outline" className="w-full h-12 border-white/10 bg-white/5 hover:bg-white/10" onClick={handleLogin}>
              <svg viewBox="0 0 24 24" className="w-5 h-5 mr-2" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </Button>
            <Button variant="outline" className="w-full h-12 border-blue-500/30 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20" onClick={handleLogin}>
              <span className="w-5 h-5 mr-2 rounded-full bg-blue-500 flex items-center justify-center text-white text-[10px]">W</span>
              Connect Wallet
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Test Accounts</span>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4 space-y-2 text-sm text-gray-300 font-mono">
               <div className="flex justify-between border-b border-white/5 pb-2">
                 <span>Superadmin:</span> <span className="text-white">super@ethlima.org</span> <span className="text-gray-500">test1234</span>
               </div>
               <div className="flex justify-between border-b border-white/5 pb-2">
                 <span>Admin:</span> <span className="text-white">admin@ethlima.org</span> <span className="text-gray-500">test1234</span>
               </div>
               <div className="flex justify-between">
                 <span>Participant:</span> <span className="text-white">hacker@ethlima.org</span> <span className="text-gray-500">test1234</span>
               </div>
            </div>

            <div className="space-y-4 mt-6">
            <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" required className="h-12 bg-white/5 border-white/10" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="#" className="text-xs text-blue-400 hover:underline">Forgot password?</Link>
              </div>
              <Input id="password" type="password" required className="h-12 bg-white/5 border-white/10" />
            </div>
            <Button type="submit" className="w-full h-12 bg-white text-black hover:bg-white/90">
              Sign In <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/register" className="text-blue-400 hover:underline font-medium">
              Apply now
            </Link>
          </p>
        </div>
      </div>
    </div>
    </div>
  );
}
