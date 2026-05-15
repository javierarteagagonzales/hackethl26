"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, CheckCircle2, Clock, GitBranch, ExternalLink, Calendar as CalendarIcon } from "lucide-react";

export default function ParticipantDashboard() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Welcome back, Javier!</h1>
          <p className="text-muted-foreground">Here's your hackathon progress so far.</p>
        </div>
        <Badge variant="outline" className="px-3 py-1 bg-green-500/10 text-green-400 border-green-500/20 text-sm">
          <CheckCircle2 className="w-4 h-4 mr-2 inline" /> Application Approved
        </Badge>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="bg-black/40 border-white/10 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Time Remaining</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold font-mono">48:12:05</div>
              <Progress value={33} className="mt-3 h-2 bg-white/10" />
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="bg-black/40 border-white/10 backdrop-blur-sm h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Team Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                <span className="font-semibold text-lg">DeFi Ninjas</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">3/4 Members • Looking for Frontend</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="bg-black/40 border-white/10 backdrop-blur-sm h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Next Mentorship</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-3">
                <div className="bg-purple-500/20 p-2 rounded-md">
                  <CalendarIcon className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <p className="font-medium">Smart Contracts Review</p>
                  <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                    <Clock className="w-3 h-3" /> Today, 4:00 PM
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }}>
          <Card className="border-white/10 bg-gradient-to-b from-white/[0.05] to-transparent">
            <CardHeader>
              <CardTitle>Current Project: Arbitrum Yield Aggregator</CardTitle>
              <CardDescription>Building in the DeFi & Infra Track</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border border-white/10 bg-black/50 p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-muted-foreground">Submission Status</span>
                  <Badge className="bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30">Draft</Badge>
                </div>
                <div className="space-y-3 mt-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 text-muted-foreground"><GitBranch className="w-4 h-4" /> Repository</span>
                    <a href="#" className="text-blue-400 hover:underline flex items-center gap-1">github.com/defininjas/agg <ExternalLink className="w-3 h-3" /></a>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 text-muted-foreground"><AlertCircle className="w-4 h-4" /> Missing Pitch Deck</span>
                    <Button variant="link" className="h-auto p-0 text-blue-400">Upload now</Button>
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <Button className="w-full">Edit Submission</Button>
                <Button variant="outline" className="w-full">Preview Demo Day Page</Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }}>
          <Card className="border-white/10 bg-black/40 h-full">
            <CardHeader>
              <CardTitle>Hackathon Announcements</CardTitle>
              <CardDescription>Latest updates from the ETH Lima Team</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[
                  { title: "Arbitrum Workshop starting in 10 mins!", time: "1 hour ago", unread: true },
                  { title: "Midnight pizza is here 🍕", time: "12 hours ago", unread: false },
                  { title: "Welcome to ETH Lima 2026", time: "1 day ago", unread: false },
                ].map((msg, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="mt-1 flex-shrink-0">
                      <div className={`w-2 h-2 rounded-full ${msg.unread ? 'bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)]' : 'bg-white/20'}`}></div>
                    </div>
                    <div>
                      <p className={`text-sm font-medium ${msg.unread ? 'text-white' : 'text-muted-foreground'}`}>{msg.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">{msg.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
