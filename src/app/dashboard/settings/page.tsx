"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { updateProfile, getProfile } from "@/app/actions/profile";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { User, Github, Linkedin, Wallet, Save, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function SettingsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated") {
      fetchProfile();
    }
  }, [status, router]);

  const fetchProfile = async () => {
    setLoading(true);
    const result = await getProfile();
    if (result.success) {
      setProfile(result.user);
    } else {
      toast.error(result.error || "Failed to load profile");
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    const formData = new FormData(e.currentTarget);
    const result = await updateProfile(formData);
    if (result.success) {
      toast.success("Profile updated successfully!");
      setProfile(result.user);
    } else {
      toast.error(result.error || "Update failed");
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="h-screen bg-black flex flex-col items-center justify-center text-white space-y-4">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
        <span className="font-mono text-xs uppercase tracking-widest text-gray-500">Retrieving Hacker Profile...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans p-6 md:p-12">
      <div className="max-w-2xl mx-auto space-y-8">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-sm mb-4 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Dashboard
        </Link>

        <div>
          <h1 className="text-3xl font-bold tracking-tight">Hacker Profile</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your public information and skills.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* General Information */}
          <section className="bg-white/2 border border-white/8 rounded-xl p-6 space-y-4">
            <h2 className="text-xs font-mono text-gray-500 uppercase tracking-widest flex items-center gap-2">
              <User className="w-3 h-3" /> 01. General Info
            </h2>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-gray-500 block mb-1.5 ml-1">Full Name</label>
                <input name="name" defaultValue={profile?.name || ""} required className="w-full h-11 px-4 rounded-lg bg-black border border-white/10 text-sm focus:outline-none focus:border-blue-500/50 transition-all" />
              </div>
              <div>
                <label className="text-xs text-gray-500 block mb-1.5 ml-1">Bio</label>
                <textarea name="bio" defaultValue={profile?.bio || ""} rows={3} placeholder="Developer passionate about L2s..." className="w-full px-4 py-3 rounded-lg bg-black border border-white/10 text-sm focus:outline-none focus:border-blue-500/50 transition-all resize-none" />
              </div>
            </div>
          </section>

          {/* Social & Web3 */}
          <section className="bg-white/2 border border-white/8 rounded-xl p-6 space-y-4">
            <h2 className="text-xs font-mono text-gray-500 uppercase tracking-widest flex items-center gap-2">
              <Github className="w-3 h-3" /> 02. Web3 & Links
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs text-gray-500 block ml-1">GitHub User</label>
                <div className="flex items-center">
                  <div className="h-11 px-3 flex items-center bg-white/3 border border-r-0 border-white/10 rounded-l-lg text-gray-600 text-xs">@</div>
                  <input name="github" defaultValue={profile?.github || ""} placeholder="octocat" className="flex-1 h-11 px-4 rounded-r-lg bg-black border border-white/10 text-sm focus:outline-none focus:border-blue-500/50 transition-all" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs text-gray-500 block ml-1">LinkedIn URL</label>
                <div className="flex items-center">
                  <div className="h-11 px-3 flex items-center bg-white/3 border border-r-0 border-white/10 rounded-l-lg text-gray-600 text-xs">in/</div>
                  <input name="linkedin" defaultValue={profile?.linkedin || ""} placeholder="username" className="flex-1 h-11 px-4 rounded-r-lg bg-black border border-white/10 text-sm focus:outline-none focus:border-blue-500/50 transition-all" />
                </div>
              </div>
            </div>
            <div>
              <label className="text-xs text-gray-500 block mb-1.5 ml-1 flex items-center gap-1.5"><Wallet className="w-3 h-3" /> Wallet Address</label>
              <input name="walletAddress" defaultValue={profile?.walletAddress || ""} placeholder="0x..." className="w-full h-11 px-4 rounded-lg bg-black border border-white/10 text-sm font-mono focus:outline-none focus:border-blue-500/50 transition-all" />
            </div>
          </section>

          <button type="submit" disabled={saving} className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all flex items-center justify-center gap-2 disabled:opacity-50">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {saving ? "Saving Changes..." : "Save Profile"}
          </button>
        </form>
      </div>
    </div>
  );
}
