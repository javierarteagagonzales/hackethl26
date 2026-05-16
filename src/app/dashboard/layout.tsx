"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { Code2, LayoutDashboard, Users, FolderKanban, Calendar, Bell, Settings, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useSession, signOut } from "next-auth/react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 border-r border-white/10 bg-black/20 flex flex-col sticky top-0 md:h-screen shrink-0">
        <div className="p-6 flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center">
            <Code2 className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold tracking-tight">ETH Lima 2026</span>
        </div>
        
        <div className="flex-1 px-4 py-2 space-y-1">
          <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2 rounded-md bg-white/10 text-white font-medium">
            <LayoutDashboard className="w-4 h-4" /> Dashboard
          </Link>
          <Link href="/dashboard/team" className="flex items-center gap-3 px-3 py-2 rounded-md text-muted-foreground hover:text-white hover:bg-white/5 transition-colors">
            <Users className="w-4 h-4" /> My Team
          </Link>
          <Link href="/dashboard/project" className="flex items-center gap-3 px-3 py-2 rounded-md text-muted-foreground hover:text-white hover:bg-white/5 transition-colors">
            <FolderKanban className="w-4 h-4" /> Project
          </Link>
          <Link href="/dashboard/mentorship" className="flex items-center gap-3 px-3 py-2 rounded-md text-muted-foreground hover:text-white hover:bg-white/5 transition-colors">
            <Calendar className="w-4 h-4" /> Mentorships
          </Link>
        </div>
        
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <Avatar className="w-10 h-10 border border-white/10">
              <AvatarFallback className="bg-blue-500/10 text-blue-500">{session?.user?.name?.[0] || "U"}</AvatarFallback>
            </Avatar>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-medium truncate">{session?.user?.name || "Hacker"}</p>
              <p className="text-[10px] text-muted-foreground truncate uppercase tracking-widest">{session?.user?.role || "PARTICIPANT"}</p>
            </div>
          </div>
          <div className="flex items-center justify-between text-muted-foreground">
            <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-white"><Settings className="w-4 h-4" /></Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-white"><Bell className="w-4 h-4" /></Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-red-400" onClick={() => signOut({ callbackUrl: "/" })}><LogOut className="w-4 h-4" /></Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-[#020202]">
        <div className="container max-w-6xl mx-auto p-6 md:p-10">
          {children}
        </div>
      </main>
    </div>
  );
}
