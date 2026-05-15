"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Video, Clock, MessageSquare, ExternalLink } from "lucide-react";

export default function MentorDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-1">Mentor Schedule</h1>
        <p className="text-muted-foreground">Manage your upcoming sessions and team feedback.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}>
          <Card className="bg-black/40 border-green-500/30 shadow-[0_0_15px_rgba(34,197,94,0.1)] h-full">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-sm font-medium text-green-400 uppercase tracking-wider">Next Session</CardTitle>
                <Badge className="bg-green-500/20 text-green-400">In 15 mins</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <h3 className="text-xl font-bold mb-1">DeFi Ninjas</h3>
              <p className="text-sm text-muted-foreground mb-4">Topic: Smart Contracts Security Review</p>
              
              <div className="flex flex-col gap-2">
                <Button className="w-full bg-green-500 hover:bg-green-600 text-black">
                  <Video className="w-4 h-4 mr-2" /> Join Call
                </Button>
                <Button variant="outline" className="w-full border-white/10">
                  <ExternalLink className="w-4 h-4 mr-2" /> View Project
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}>
          <Card className="bg-black/40 border-white/10 h-full opacity-70">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Upcoming</CardTitle>
                <Badge variant="outline" className="border-white/10">2:00 PM</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <h3 className="text-xl font-bold mb-1">ZK Builders</h3>
              <p className="text-sm text-muted-foreground mb-4">Topic: Architecture & Scalability</p>
              
              <div className="flex gap-2 text-sm text-muted-foreground items-center">
                <Clock className="w-4 h-4" /> 45 mins scheduled
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
          <Card className="bg-black/40 border-white/10 h-full flex flex-col items-center justify-center text-center p-6 border-dashed">
            <Calendar className="w-8 h-8 text-muted-foreground mb-2" />
            <p className="font-medium">No more sessions today</p>
            <p className="text-sm text-muted-foreground mt-1 mb-4">You have 3 open slots for tomorrow</p>
            <Button variant="outline" size="sm" className="border-white/10">Manage Availability</Button>
          </Card>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <h2 className="text-xl font-bold mb-4 mt-8">Recent Feedback Requests</h2>
        <div className="space-y-4">
          {[
            { team: "Arbitrum Alchemists", track: "DeFi", req: "Could you review our pitch deck structure?", time: "1 hr ago" },
            { team: "NFT Navigators", track: "Consumer", req: "We're stuck on wallet integration UX, need advice.", time: "3 hrs ago" }
          ].map((item, i) => (
            <Card key={i} className="bg-black/40 border-white/10 p-4 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-bold">{item.team}</h4>
                  <Badge variant="outline" className="bg-white/5">{item.track}</Badge>
                  <span className="text-xs text-muted-foreground ml-2">{item.time}</span>
                </div>
                <p className="text-sm text-muted-foreground">{item.req}</p>
              </div>
              <Button variant="secondary" className="bg-white/10 hover:bg-white/20 whitespace-nowrap">
                <MessageSquare className="w-4 h-4 mr-2" /> Reply
              </Button>
            </Card>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
