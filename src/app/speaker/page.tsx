"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mic, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SpeakerPage() {
  const router = useRouter();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/"); 
  };

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      <div className="w-full md:w-1/3 p-8 md:p-12 flex flex-col border-r border-white/10 relative overflow-hidden bg-black/50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-orange-900/20 via-background to-background"></div>
        <div className="relative z-10 mb-12">
          <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-white transition-colors text-sm mb-12">
            <ArrowLeft className="w-4 h-4" /> Back to home
          </Link>
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center border border-orange-500/30">
              <Mic className="w-5 h-5 text-orange-400" />
            </div>
            <span className="font-bold tracking-tight text-orange-400">Speaker Portal</span>
          </div>
          <h1 className="text-3xl font-bold mb-4">Host a Workshop</h1>
          <p className="text-muted-foreground">
            Share your expertise. Propose a technical workshop or talk for ETH Lima 2026 participants.
          </p>
        </div>
      </div>

      <div className="w-full md:w-2/3 p-8 md:p-24 overflow-y-auto bg-background">
        <div className="max-w-xl mx-auto space-y-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tight mb-2">Workshop Proposal</h2>
            <p className="text-sm text-muted-foreground">Tell us what you want to teach.</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" required className="bg-white/5 border-white/10" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" required className="bg-white/5 border-white/10" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" required className="bg-white/5 border-white/10" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Workshop Title</Label>
              <Input id="title" placeholder="e.g. Intro to Zero Knowledge Proofs" required className="bg-white/5 border-white/10" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Brief Description</Label>
              <textarea id="description" required className="w-full h-24 px-3 py-2 rounded-md bg-white/5 border border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"></textarea>
            </div>

            <div className="pt-4">
              <Button type="submit" className="w-full h-12 bg-orange-600 hover:bg-orange-700 text-white text-base">
                Submit Application
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
