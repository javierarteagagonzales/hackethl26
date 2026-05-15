import { ReactNode } from "react";
import Link from "next/link";
import { Code2, LayoutDashboard, Users, FolderKanban, Calendar, Settings, ShieldCheck, LogOut, BarChart3 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      <aside className="w-full md:w-64 border-r border-white/10 bg-black/20 flex flex-col sticky top-0 md:h-screen">
        <div className="p-6 flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center border border-red-500/30">
            <ShieldCheck className="w-5 h-5 text-red-400" />
          </div>
          <span className="font-bold tracking-tight text-red-400">Admin Portal</span>
        </div>
        
        <div className="flex-1 px-4 py-2 space-y-1">
          <Link href="/admin" className="flex items-center gap-3 px-3 py-2 rounded-md bg-white/10 text-white font-medium">
            <BarChart3 className="w-4 h-4" /> Overview
          </Link>
          <Link href="/admin/users" className="flex items-center gap-3 px-3 py-2 rounded-md text-muted-foreground hover:text-white hover:bg-white/5 transition-colors">
            <Users className="w-4 h-4" /> Users & Approvals
          </Link>
          <Link href="/admin/projects" className="flex items-center gap-3 px-3 py-2 rounded-md text-muted-foreground hover:text-white hover:bg-white/5 transition-colors">
            <FolderKanban className="w-4 h-4" /> All Projects
          </Link>
          <Link href="/admin/settings" className="flex items-center gap-3 px-3 py-2 rounded-md text-muted-foreground hover:text-white hover:bg-white/5 transition-colors">
            <Settings className="w-4 h-4" /> Configuration
          </Link>
        </div>
        
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <Avatar className="w-10 h-10 border border-red-500/30">
              <AvatarFallback className="bg-red-500/10 text-red-400">AD</AvatarFallback>
            </Avatar>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-medium text-red-400 truncate">Super Admin</p>
            </div>
          </div>
          <Button variant="outline" className="w-full border-white/10 hover:bg-red-500/10 hover:text-red-400">
            <LogOut className="w-4 h-4 mr-2" /> Exit Admin
          </Button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <div className="container max-w-7xl mx-auto p-6 md:p-10">
          {children}
        </div>
      </main>
    </div>
  );
}
