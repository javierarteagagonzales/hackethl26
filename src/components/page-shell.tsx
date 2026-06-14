/* Shared layout component for all inner pages */
"use client";
import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { HelpCircle, ArrowLeft } from "lucide-react";

export default function PageShell({ children, backHref = "/", backLabel = "← Back to Home" }: { children: React.ReactNode; backHref?: string; backLabel?: string }) {
  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Subtle grid background */}
      <div className="fixed inset-0 z-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #3b82f6 1px, transparent 0)", backgroundSize: "50px 50px" }} />
      <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="fixed bottom-0 left-0 w-[400px] h-[400px] bg-purple-600/10 blur-[100px] rounded-full pointer-events-none z-0" />

      {/* Minimal top nav */}
      <nav className="sticky top-0 z-50 border-b border-white/5 bg-black/80 backdrop-blur-xl">
        <div className="container mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <Logo alt="ETH Lima Logo" width={100} height={32} className="h-7 w-auto object-contain" />
          </Link>
          <a href="https://t.me/javierdgtl" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-gray-500 hover:text-white text-xs transition-colors">
            <HelpCircle className="w-3.5 h-3.5" /> @javierdgtl
          </a>
        </div>
      </nav>

      <main className="relative z-10">
        <div className="container mx-auto px-6 pt-8">
          <Link href={backHref} className="inline-flex items-center gap-1.5 text-gray-500 hover:text-white text-sm transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" /> {backLabel}
          </Link>
        </div>
        {children}
      </main>

      <footer className="relative z-10 border-t border-white/5 mt-20 py-8">
        <div className="container mx-auto px-6 text-center text-gray-600 text-xs font-mono">
          © 2026 Ethereum Lima — All rights reserved.
        </div>
      </footer>
    </div>
  );
}
