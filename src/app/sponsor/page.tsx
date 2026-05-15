"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Briefcase, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SponsorPage() {
  const router = useRouter();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/admin"); // Redirect to admin to show how it connects
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
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
              <Briefcase className="w-5 h-5 text-blue-400" />
            </div>
            <span className="font-bold tracking-tight text-blue-400">Sponsor Portal</span>
          </div>
          <h1 className="text-3xl font-bold mb-4">Propose a Track</h1>
          <p className="text-muted-foreground">
            Bring your technology to hundreds of talented builders. Sponsor a track, set the categories, and define the bounties.
          </p>
        </div>
      </div>

      <div className="w-full md:w-2/3 p-8 md:p-24 overflow-y-auto bg-background">
        <div className="max-w-xl mx-auto space-y-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tight mb-2">Track Details</h2>
            <p className="text-sm text-muted-foreground">Submit your track proposal for ETH Lima 2026.</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="company">Company / Protocol Name</Label>
              <Input id="company" placeholder="e.g. Optimism" required className="bg-white/5 border-white/10" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="trackTitle">Track Title</Label>
              <Input id="trackTitle" placeholder="e.g. Consumer Superchain" required className="bg-white/5 border-white/10" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Track Description</Label>
              <textarea id="description" placeholder="What should hackers build?" required className="w-full h-32 px-3 py-2 rounded-md bg-white/5 border border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"></textarea>
            </div>

            <div className="space-y-2">
              <Label htmlFor="prize">Total Prize Pool ($ USD)</Label>
              <Input id="prize" type="number" placeholder="5000" required className="bg-white/5 border-white/10" />
            </div>

            <div className="pt-4">
              <Button type="submit" className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white text-base">
                Submit Proposal
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
