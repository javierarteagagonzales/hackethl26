import { ReactNode } from "react";
import Link from "next/link";
import { Code2, Calendar, MessageSquare, CheckSquare, Settings, LogOut, Video } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default function MentorLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      <aside className="w-full md:w-64 border-r border-white/10 bg-black/20 flex flex-col sticky top-0 md:h-screen">
        <div className="p-6 flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center border border-green-500/30">
            <Video className="w-5 h-5 text-green-400" />
          </div>
          <span className="font-bold tracking-tight text-green-400">Mentor Portal</span>
        </div>
        
        <div className="flex-1 px-4 py-2 space-y-1">
          <Link href="/mentor" className="flex items-center gap-3 px-3 py-2 rounded-md bg-white/10 text-white font-medium">
            <Calendar className="w-4 h-4" /> My Schedule
          </Link>
          <Link href="/mentor/teams" className="flex items-center gap-3 px-3 py-2 rounded-md text-muted-foreground hover:text-white hover:bg-white/5 transition-colors">
            <MessageSquare className="w-4 h-4" /> Assigned Teams
          </Link>
          <Link href="/mentor/feedback" className="flex items-center gap-3 px-3 py-2 rounded-md text-muted-foreground hover:text-white hover:bg-white/5 transition-colors">
            <CheckSquare className="w-4 h-4" /> Feedback
          </Link>
          <Link href="/mentor/settings" className="flex items-center gap-3 px-3 py-2 rounded-md text-muted-foreground hover:text-white hover:bg-white/5 transition-colors">
            <Settings className="w-4 h-4" /> Availability
          </Link>
        </div>
        
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <Avatar className="w-10 h-10 border border-green-500/30">
              <AvatarFallback className="bg-green-500/10 text-green-400">MV</AvatarFallback>
            </Avatar>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-medium text-green-400 truncate">Mentor Vitalik</p>
            </div>
          </div>
          <Button variant="outline" className="w-full border-white/10 hover:bg-green-500/10 hover:text-green-400">
            <LogOut className="w-4 h-4 mr-2" /> Logout
          </Button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <div className="container max-w-6xl mx-auto p-6 md:p-10">
          {children}
        </div>
      </main>
    </div>
  );
}
