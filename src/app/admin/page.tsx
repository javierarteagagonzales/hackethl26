"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, FolderKanban, CheckCircle, XCircle, Plus, Edit2, Trash2 } from "lucide-react";
import { MOCK_TRACKS } from "@/lib/mock-data";

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-1">Hackathon Overview</h1>
        <p className="text-muted-foreground">Global statistics and pending approvals.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: "Total Users", value: "1,248", icon: Users, color: "text-blue-400" },
          { title: "Active Teams", value: "312", icon: Users, color: "text-purple-400" },
          { title: "Projects Submitted", value: "145", icon: FolderKanban, color: "text-green-400" },
          { title: "Pending Approvals", value: "89", icon: Users, color: "text-yellow-400" },
        ].map((stat, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <Card className="bg-black/40 border-white/10">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <Card className="border-white/10 bg-black/40">
          <CardHeader>
            <CardTitle>Recent Applications (Needs Approval)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border border-white/10">
              <Table>
                <TableHeader>
                  <TableRow className="border-white/10 hover:bg-white/5">
                    <TableHead>Applicant</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Github</TableHead>
                    <TableHead>Date Applied</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { name: "Alice Nakamoto", role: "Hacker", github: "alice-nak", date: "2 mins ago" },
                    { name: "Bob Builder", role: "Hacker", github: "bob-b", date: "15 mins ago" },
                    { name: "Charlie Dao", role: "Mentor", github: "c-dao", date: "1 hour ago" },
                    { name: "Diana Eth", role: "Hacker", github: "diana", date: "2 hours ago" },
                  ].map((user, i) => (
                    <TableRow key={i} className="border-white/10 hover:bg-white/5">
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell><Badge variant="outline" className="bg-white/5">{user.role}</Badge></TableCell>
                      <TableCell className="text-muted-foreground">@{user.github}</TableCell>
                      <TableCell className="text-muted-foreground">{user.date}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button size="icon" variant="ghost" className="h-8 w-8 text-green-400 hover:text-green-300 hover:bg-green-400/10">
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                          <Button size="icon" variant="ghost" className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-red-400/10">
                            <XCircle className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold tracking-tight">Active Tracks & Prizes</h2>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white"><Plus className="w-4 h-4 mr-2" /> Add New Track</Button>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {MOCK_TRACKS.map((track, i) => (
            <Card key={i} className="border-white/10 bg-black/40">
              <CardHeader className="flex flex-row items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{track.title}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">Sponsor: {track.sponsor}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="icon" variant="ghost" className="h-8 w-8 hover:bg-white/10"><Edit2 className="w-4 h-4 text-muted-foreground" /></Button>
                  <Button size="icon" variant="ghost" className="h-8 w-8 hover:bg-red-500/10"><Trash2 className="w-4 h-4 text-red-400" /></Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-2">Categories</h4>
                    <div className="flex gap-2">
                      {track.categories.map((cat, j) => <Badge key={j} variant="secondary" className="bg-white/5">{cat}</Badge>)}
                      <Badge variant="outline" className="border-dashed cursor-pointer hover:bg-white/5"><Plus className="w-3 h-3 mr-1"/> Add</Badge>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-2">Prizes</h4>
                    <ul className="space-y-2">
                      {track.prizes.map((prize, j) => (
                        <li key={j} className="text-sm flex justify-between border-b border-white/5 pb-2">
                          <span>{prize.name}</span>
                          <span className="font-mono text-green-400">{prize.amount}</span>
                        </li>
                      ))}
                      <li className="pt-1">
                         <Button variant="link" className="h-auto p-0 text-xs text-blue-400"><Plus className="w-3 h-3 mr-1"/> Add Prize</Button>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
