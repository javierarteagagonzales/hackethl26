"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Code2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      <div className="w-full md:w-1/3 p-8 md:p-12 flex flex-col border-r border-white/10 relative overflow-hidden bg-black/50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-blue-900/20 via-background to-background"></div>
        <div className="relative z-10 mb-12">
          <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-white transition-colors text-sm mb-12">
            <ArrowLeft className="w-4 h-4" /> Back to home
          </Link>
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center">
              <Code2 className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold tracking-tight">ETH Lima 2026</span>
          </div>
          <h1 className="text-3xl font-bold mb-4">Apply as Hacker</h1>
          <p className="text-muted-foreground">
            Join the biggest Ethereum hybrid hackathon. Build innovative projects on Arbitrum, Arkiv, and more.
          </p>
        </div>
      </div>

      <div className="w-full md:w-2/3 p-8 md:p-24 overflow-y-auto bg-background">
        <div className="max-w-xl mx-auto space-y-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tight mb-2">Personal Information</h2>
            <p className="text-sm text-muted-foreground">Tell us a bit about yourself.</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" placeholder="Javier" required className="bg-white/5 border-white/10" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" placeholder="Doe" required className="bg-white/5 border-white/10" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" required className="bg-white/5 border-white/10" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="github">GitHub Username</Label>
              <Input id="github" placeholder="javier-dev" required className="bg-white/5 border-white/10" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Primary Skill</Label>
              <select id="role" className="w-full h-10 px-3 py-2 rounded-md bg-white/5 border border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                <option value="frontend">Frontend Developer</option>
                <option value="backend">Backend Developer</option>
                <option value="smartcontract">Smart Contract Engineer</option>
                <option value="design">UI/UX Designer</option>
                <option value="product">Product Manager</option>
              </select>
            </div>

            <div className="pt-4">
              <Button type="submit" className="w-full h-12 bg-white text-black hover:bg-white/90 text-base">
                Submit Application
              </Button>
            </div>
          </form>
          
          <p className="text-center text-sm text-muted-foreground">
            Already have an account? <Link href="/login" className="text-blue-400 hover:underline">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
