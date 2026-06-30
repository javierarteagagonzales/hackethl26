"use client";

import { useEffect, useState } from "react";
import { getProfile, updateProfile } from "@/app/actions/profile";
import { useTranslation } from "@/components/providers/language-provider";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { ArrowLeft, User, Code2, Globe, MapPin, Mail, ShieldAlert, Award, Save } from "lucide-react";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const INITIAL_SKILLS = [
  "Solidity", "Rust", "Stylus", "Frontend", "Backend", "Typescript", "Javascript",
  "React", "NextJS", "Astro", "Node", "Python", "Go", "AI", "LLMs",
  "Prompt Engineering", "Design", "UI", "UX", "DevOps", "Product",
  "Marketing", "Business", "DAO", "DeFi", "ZK", "Security", "Gaming", "Mobile"
];

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { t } = useTranslation();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profileData, setProfileData] = useState<any>(null);

  // Form states
  const [avatar, setAvatar] = useState("");
  const [bio, setBio] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [website, setWebsite] = useState("");
  const [wallet, setWallet] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [experience, setExperience] = useState("");
  const [track, setTrack] = useState("");

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
    if (result.success && result.profile) {
      const prof = result.profile;
      setProfileData(prof);
      setAvatar(prof.avatar || "");
      setBio(prof.bio || "");
      setCountry(prof.country || "");
      setCity(prof.city || "");
      setGithub(prof.github || "");
      setLinkedin(prof.linkedin || "");
      setWebsite(prof.website || "");
      setWallet(prof.wallet || "");
      setSelectedSkills(prof.skills || []);
      setExperience(prof.experience || "");
      setTrack(prof.track || "");
    } else {
      toast.error("Failed to load profile");
    }
    setLoading(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const result = await updateProfile({
      avatar,
      bio,
      country,
      city,
      github,
      linkedin,
      website,
      wallet,
      skills: selectedSkills,
      experience,
      track,
    });

    if (result.success) {
      toast.success(t("app_profile.profile_saved"));
      fetchProfile();
    } else {
      toast.error(result.error || "Failed to update profile");
    }
    setSaving(false);
  };

  const handleToggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(prev => prev.filter(s => s !== skill));
    } else {
      setSelectedSkills(prev => [...prev, skill]);
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="h-screen bg-black flex flex-col items-center justify-center text-white space-y-4">
        <div className="w-12 h-12 border-4 border-red-500/20 border-t-red-500 rounded-full animate-spin" />
        <span className="font-mono text-xs uppercase tracking-widest text-gray-500">Accessing Profile Core...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg text-fg font-sans transition-colors duration-300 relative pb-16">
      <div className="fixed inset-0 z-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, var(--color-brand-accent) 1px, transparent 0)", backgroundSize: "48px 48px" }} />
      <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-brand-accent/5 blur-[130px] rounded-full pointer-events-none z-0" />

      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-border bg-surface/85 backdrop-blur-xl transition-all duration-300">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="p-2 rounded-lg border border-border bg-surface hover:bg-fg/5 text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <Logo alt="ETH Lima" className="h-7 w-auto" />
          </div>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <div className="relative z-10 container mx-auto px-6 py-12 max-w-2xl">
        <h1 className="text-4xl font-black tracking-tighter mb-8 flex items-center gap-2">
          <User className="w-9 h-9 text-brand-accent" /> {t("app_profile.title")}
        </h1>

        <form onSubmit={handleSave} className="space-y-6">
          
          {/* Readonly Info notice */}
          <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/10 text-xs text-gray-400 leading-relaxed font-mono flex items-start gap-2.5">
            <ShieldAlert className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
            <span>{t("app_profile.readonly_notice")}</span>
          </div>

          {/* Account Overview (Readonly) */}
          <div className="rounded-xl border border-border bg-surface/40 p-6 space-y-4 shadow-sm backdrop-blur-md">
            <h2 className="text-xs font-mono text-gray-500 uppercase tracking-widest">Account Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
              <div className="bg-black/20 p-3 rounded-lg border border-white/5">
                <span className="text-[10px] text-gray-600 block mb-1">Email</span>
                <span className="text-blue-400">{profileData?.user?.email}</span>
              </div>
              <div className="bg-black/20 p-3 rounded-lg border border-white/5">
                <span className="text-[10px] text-gray-600 block mb-1">Status</span>
                <span className="text-emerald-400 font-bold">{profileData?.user?.status}</span>
              </div>
              <div className="bg-black/20 p-3 rounded-lg border border-white/5">
                <span className="text-[10px] text-gray-600 block mb-1">Role</span>
                <span className="text-red-400 font-bold">{profileData?.user?.role}</span>
              </div>
            </div>
          </div>

          {/* Edit Profile Fields */}
          <div className="rounded-xl border border-border bg-surface/50 p-6 space-y-4 shadow-sm backdrop-blur-md">
            <h2 className="text-xs font-mono text-brand-accent uppercase tracking-widest">{t("app_profile.edit_profile")}</h2>

            <div>
              <label className="text-xs text-fg/60 block mb-1.5 font-medium">{t("app_profile.avatar")}</label>
              <input value={avatar} onChange={(e) => setAvatar(e.target.value)} placeholder="https://..." className="w-full h-10 px-3 rounded-lg bg-surface border border-border text-sm focus:outline-none focus:border-brand-accent/50 transition-all text-white" />
            </div>

            <div>
              <label className="text-xs text-fg/60 block mb-1.5 font-medium">{t("app_profile.bio")}</label>
              <textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={3} placeholder="Tell us about yourself..." className="w-full px-3 py-2 rounded-lg bg-surface border border-border text-sm focus:outline-none focus:border-brand-accent/50 transition-all resize-none text-white" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-fg/60 block mb-1.5 font-medium">{t("app_profile.city")}</label>
                <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="Lima" className="w-full h-10 px-3 rounded-lg bg-surface border border-border text-sm focus:outline-none focus:border-brand-accent/50 transition-all text-white" />
              </div>
              <div>
                <label className="text-xs text-fg/60 block mb-1.5 font-medium">{t("app_profile.country")}</label>
                <input value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Perú" className="w-full h-10 px-3 rounded-lg bg-surface border border-border text-sm focus:outline-none focus:border-brand-accent/50 transition-all text-white" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-fg/60 block mb-1.5 font-medium">{t("app_profile.github")}</label>
                <input value={github} onChange={(e) => setGithub(e.target.value)} placeholder="your-username" className="w-full h-10 px-3 rounded-lg bg-surface border border-border text-sm focus:outline-none focus:border-brand-accent/50 transition-all text-white" />
              </div>
              <div>
                <label className="text-xs text-fg/60 block mb-1.5 font-medium">{t("app_profile.linkedin")}</label>
                <input value={linkedin} onChange={(e) => setLinkedin(e.target.value)} placeholder="https://..." className="w-full h-10 px-3 rounded-lg bg-surface border border-border text-sm focus:outline-none focus:border-brand-accent/50 transition-all text-white" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-fg/60 block mb-1.5 font-medium">{t("app_profile.website")}</label>
                <input value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="https://..." className="w-full h-10 px-3 rounded-lg bg-surface border border-border text-sm focus:outline-none focus:border-brand-accent/50 transition-all text-white" />
              </div>
              <div>
                <label className="text-xs text-fg/60 block mb-1.5 font-medium">{t("app_profile.wallet")}</label>
                <input value={wallet} onChange={(e) => setWallet(e.target.value)} placeholder="0x..." className="w-full h-10 px-3 rounded-lg bg-surface border border-border text-sm font-mono focus:outline-none focus:border-brand-accent/50 transition-all text-white" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-fg/60 block mb-1.5 font-medium">Experience Level</label>
                <select value={experience} onChange={(e) => setExperience(e.target.value)} className="w-full h-10 px-3 rounded-lg bg-surface border border-border text-sm focus:outline-none focus:border-brand-accent/50 cursor-pointer appearance-none text-white">
                  <option value="Sin experiencia">Sin experiencia</option>
                  <option value="Principiante">Principiante</option>
                  <option value="Intermedio">Intermedio</option>
                  <option value="Avanzado">Avanzado</option>
                  <option value="Experto">Experto</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-fg/60 block mb-1.5 font-medium">Track Preference</label>
                <select value={track} onChange={(e) => setTrack(e.target.value)} className="w-full h-10 px-3 rounded-lg bg-surface border border-border text-sm focus:outline-none focus:border-brand-accent/50 cursor-pointer appearance-none text-white">
                  <option value="DeFi">DeFi</option>
                  <option value="AI">AI</option>
                  <option value="Consumer">Consumer</option>
                </select>
              </div>
            </div>

            {/* Profile Visibility */}
            <div>
              <label className="text-xs text-fg/60 block mb-1.5 font-medium">{t("app_profile.visibility")}</label>
              <div className="flex gap-4">
                {["public", "private"].map((vis) => (
                  <label key={vis} className="flex items-center gap-2 text-sm text-fg/80 cursor-pointer">
                    <input 
                      type="radio" 
                      name="visibility" 
                      value={vis} 
                      checked={profileData?.visibility === vis || (vis === "public" && !profileData?.visibility)}
                      onChange={() => setProfileData((prev: any) => ({ ...prev, visibility: vis }))}
                      className="accent-brand-accent"
                    />
                    {t(`app_profile.${vis}`)}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Skills Grid */}
          <div className="rounded-xl border border-border bg-surface/50 p-6 space-y-4 shadow-sm backdrop-blur-md">
            <h2 className="text-xs font-mono text-brand-accent uppercase tracking-widest">{t("app_profile.skills")}</h2>
            <div className="flex flex-wrap gap-2">
              {INITIAL_SKILLS.map((skill) => {
                const isSelected = selectedSkills.includes(skill);
                return (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => handleToggleSkill(skill)}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all cursor-pointer ${
                      isSelected 
                        ? "border-brand-accent bg-brand-accent/10 text-brand-accent" 
                        : "border-border bg-surface hover:bg-fg/5 text-fg/80"
                    }`}
                  >
                    {skill}
                  </button>
                );
              })}
            </div>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full h-12 rounded-lg bg-fg text-bg font-bold text-sm flex items-center justify-center gap-2 hover:opacity-95 transition-opacity disabled:opacity-50 cursor-pointer shadow-md"
          >
            {saving ? "Saving..." : t("app_profile.save_profile")} <Save className="w-4 h-4" />
          </button>

        </form>
      </div>
    </div>
  );
}
