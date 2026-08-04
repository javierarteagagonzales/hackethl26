"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { Users, LogOut, Trophy, BarChart3, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSession, signOut } from "next-auth/react";
import { Logo } from "@/components/ui/logo";
import { Badge } from "@/components/ui/badge";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-[#020202] text-white flex flex-col md:flex-row overflow-hidden h-screen">
      <aside className="w-full md:w-64 border-r border-white/5 flex flex-col sticky top-0 md:h-screen shrink-0 bg-[#080808]">
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <Link href="/">
            <Logo alt="ETH Lima" className="h-7 w-auto" />
          </Link>
          <Badge className="bg-red-500/10 text-red-500 border-red-500/20 text-[10px]">ADMIN</Badge>
        </div>

        <nav className="flex-1 p-4 space-y-2 mt-4">
          <Link
            href="/admin"
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-300 bg-red-500/10 text-red-500 border border-red-500/20"
          >
            <BarChart3 className="w-4 h-4" /> Overview
          </Link>
          <Link
            href="/admin/applicants"
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-300 text-gray-500 hover:text-white hover:bg-white/5"
          >
            <Users className="w-4 h-4" /> Applicants
          </Link>
          <Link
            href="/admin/projects"
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-300 text-gray-500 hover:text-white hover:bg-white/5"
          >
            <Package className="w-4 h-4" /> Projects
          </Link>
          <Link
            href="/admin/tracks"
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-300 text-gray-500 hover:text-white hover:bg-white/5"
          >
            <Trophy className="w-4 h-4" /> Tracks & Sponsors
          </Link>
        </nav>

        <div className="p-6 border-t border-white/5 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-red-600 to-orange-600 flex items-center justify-center text-xs font-bold ring-2 ring-red-500/20">
              {session?.user?.name?.[0] || "A"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold truncate">{session?.user?.name || "Admin"}</p>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest">Main Controller</p>
            </div>
          </div>
          <Button
            variant="ghost"
            onClick={() => signOut({ callbackUrl: "/" })}
            className="w-full justify-start text-xs text-gray-500 hover:text-red-400 hover:bg-red-400/5 transition-all"
          >
            <LogOut className="w-3.5 h-3.5 mr-3" /> Terminate Session
          </Button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
