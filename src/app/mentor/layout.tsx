"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { Code2, Calendar, MessageSquare, CheckSquare, Settings, LogOut, Video } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useSession, signOut } from "next-auth/react";
import { Logo } from "@/components/ui/logo";

export default function MentorLayout({ children }: { children: ReactNode }) {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col md:flex-row overflow-hidden h-screen">
      <aside className="w-full md:w-64 border-r border-white/5 flex flex-col sticky top-0 md:h-screen shrink-0 bg-[#080808]">
        <div className="p-6 border-b border-white/5 flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
            <Video className="w-5 h-5 text-emerald-400" />
          </div>
          <span className="font-bold tracking-tight text-emerald-400">Mentor Portal</span>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2">
          <Link href="/mentor/dashboard" className="flex items-center gap-3 px-3 py-2 rounded-xl bg-white/5 text-white font-medium border border-white/10">
            <Calendar className="w-4 h-4" /> Requests
          </Link>
          <Link href="/mentor/settings" className="flex items-center gap-3 px-3 py-2 rounded-xl text-gray-500 hover:text-white hover:bg-white/5 transition-colors">
            <Settings className="w-4 h-4" /> Availability
          </Link>
          <a href="https://t.me/javierdgtl" target="_blank" rel="noreferrer" className="flex items-center gap-3 px-3 py-2 rounded-xl text-gray-500 hover:text-white hover:bg-white/5 transition-colors">
            <MessageSquare className="w-4 h-4" /> Support
          </a>
        </nav>
        
        <div className="p-6 border-t border-white/5 space-y-4">
          <div className="flex items-center gap-3">
            <Avatar className="w-9 h-9 border border-emerald-500/30">
              <AvatarFallback className="bg-emerald-500/10 text-emerald-400">{session?.user?.name?.[0] || "M"}</AvatarFallback>
            </Avatar>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-bold text-emerald-400 truncate">{session?.user?.name || "Mentor"}</p>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest">{session?.user?.role || "MENTOR"}</p>
            </div>
          </div>
          <Button variant="ghost" onClick={() => signOut({ callbackUrl: "/" })} className="w-full justify-start text-xs text-gray-500 hover:text-red-400 hover:bg-red-400/5">
            <LogOut className="w-4 h-4 mr-3" /> Logout
          </Button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto bg-[#020202]">
        <div className="container max-w-6xl mx-auto p-6 md:p-10">
          {children}
        </div>
      </main>
    </div>
  );
}
