"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { LOGO_SRC } from "@/lib/asset-path";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";
import { registerHacker } from "@/app/actions/register";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useTranslation } from "@/components/providers/language-provider";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const SKILLS = ["Smart Contract Engineer", "Frontend Developer", "Backend Developer", "UI/UX Designer", "Product Manager", "Data Scientist", "Full Stack Dev", "Blockchain Researcher"];
const TRACKS = ["Arbitrum", "Arkiv — Job Platform", "Arkiv — Wikis", "Arkiv — Events", "To be defined"];

const registerSchema = z.object({
  firstName: z.string().min(2, "register.errors.first_name_short"),
  lastName: z.string().min(2, "register.errors.last_name_short"),
  email: z.string().email("register.errors.email_invalid"),
  password: z.string().min(8, "register.errors.password_short"),
  github: z.string().min(1, "register.errors.github_required"),
  walletAddress: z.string().optional(),
  skills: z.string().min(1, "register.errors.skill_required"),
  track: z.string().min(1, "register.errors.track_required"),
  bio: z.string().optional(),
});

type RegisterValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      skills: SKILLS[0],
      track: TRACKS[0],
    }
  });

  const onSubmit = async (values: RegisterValues) => {
    setLoading(true);
    setError("");
    
    // Transform to FormData for the existing server action
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (value) formData.append(key, value as string);
    });

    const result = await registerHacker(formData);
    
    if (result.success) {
      router.push("/dashboard");
    } else {
      setError(result.error || "An error occurred");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg text-fg font-sans transition-colors duration-300 relative">
      <div className="fixed inset-0 z-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, var(--color-brand-accent) 1px, transparent 0)", backgroundSize: "48px 48px" }} />
      <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-brand-accent/5 blur-[130px] rounded-full pointer-events-none z-0" />

      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-border bg-surface/80 backdrop-blur-xl transition-all duration-300">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/">
            <img src={LOGO_SRC} alt="ETH Lima" className="h-7 w-auto" />
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-xs text-fg/60 hover:text-brand-accent transition-colors font-medium">
              {t("register.nav_back")}
            </Link>
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <div className="relative z-10 container mx-auto px-6 py-12 max-w-2xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          {/* Header */}
          <div className="mb-12">
            <div className="font-mono text-xs text-brand-accent mb-3 tracking-[0.3em] uppercase">{t("register.form_subtitle")}</div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">{t("register.title")} <span className="text-gradient-sunset">{t("register.hacker")}</span></h1>
            <p className="text-fg/60 text-lg leading-relaxed">{t("register.subtitle")}</p>
          </div>

          {/* Perks row */}
          <div className="grid grid-cols-3 gap-3 mb-10">
            {[
              { key: "free", text: t("register.perks.free") },
              { key: "prizes", text: t("register.perks.prizes") },
              { key: "mentors", text: t("register.perks.mentors") }
            ].map(p => (
              <div key={p.key} className="flex items-center gap-2 text-xs sm:text-sm text-fg/70 border border-border rounded-lg p-3 bg-surface shadow-sm">
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 animate-pulse" /> <span>{p.text}</span>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {error && <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm">{error}</div>}
            
            {/* Personal info */}
            <div className="rounded-xl border border-border bg-surface/50 p-6 space-y-4 shadow-sm backdrop-blur-md">
              <h2 className="text-xs font-mono text-fg/50 uppercase tracking-widest">{t("register.sections.personal")}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-fg/60 block mb-1.5 font-medium">{t("register.fields.first_name")}</label>
                  <input {...register("firstName")} placeholder="Javier" className="w-full h-10 px-3 rounded-lg bg-surface border border-border text-sm placeholder:text-fg/30 focus:outline-none focus:border-brand-accent/50 transition-all" />
                  {errors.firstName && <p className="text-[10px] text-red-500 mt-1">{t(errors.firstName.message!)}</p>}
                </div>
                <div>
                  <label className="text-xs text-fg/60 block mb-1.5 font-medium">{t("register.fields.last_name")}</label>
                  <input {...register("lastName")} placeholder="Doe" className="w-full h-10 px-3 rounded-lg bg-surface border border-border text-sm placeholder:text-fg/30 focus:outline-none focus:border-brand-accent/50 transition-all" />
                  {errors.lastName && <p className="text-[10px] text-red-500 mt-1">{t(errors.lastName.message!)}</p>}
                </div>
              </div>
              <div>
                <label className="text-xs text-fg/60 block mb-1.5 font-medium">{t("register.fields.email")}</label>
                <input {...register("email")} type="email" placeholder="hacker@ethlima.org" className="w-full h-10 px-3 rounded-lg bg-surface border border-border text-sm placeholder:text-fg/30 focus:outline-none focus:border-brand-accent/50 transition-all" />
                {errors.email && <p className="text-[10px] text-red-500 mt-1">{t(errors.email.message!)}</p>}
              </div>
              <div>
                <label className="text-xs text-fg/60 block mb-1.5 font-medium">{t("register.fields.password")}</label>
                <input {...register("password")} type="password" placeholder="••••••••" className="w-full h-10 px-3 rounded-lg bg-surface border border-border text-sm placeholder:text-fg/30 focus:outline-none focus:border-brand-accent/50 transition-all" />
                {errors.password && <p className="text-[10px] text-red-500 mt-1">{t(errors.password.message!)}</p>}
              </div>
            </div>

            {/* Web3 profile */}
            <div className="rounded-xl border border-border bg-surface/50 p-6 space-y-4 shadow-sm backdrop-blur-md">
              <h2 className="text-xs font-mono text-fg/50 uppercase tracking-widest">{t("register.sections.web3")}</h2>
              <div>
                <label className="text-xs text-fg/60 block mb-1.5 font-medium">{t("register.fields.github")}</label>
                <div className="flex items-center">
                  <span className="h-10 px-3 flex items-center bg-fg/5 border border-r-0 border-border rounded-l-lg text-fg/50 text-sm">github.com/</span>
                  <input {...register("github")} placeholder="your-user" className="flex-1 h-10 px-3 rounded-r-lg bg-surface border border-border text-sm placeholder:text-fg/30 focus:outline-none focus:border-brand-accent/50 transition-all" />
                </div>
                {errors.github && <p className="text-[10px] text-red-500 mt-1">{t(errors.github.message!)}</p>}
              </div>
              <div>
                <label className="text-xs text-fg/60 block mb-1.5 font-medium">{t("register.fields.wallet")}</label>
                <input {...register("walletAddress")} placeholder="0x..." className="w-full h-10 px-3 rounded-lg bg-surface border border-border text-sm font-mono placeholder:text-fg/30 focus:outline-none focus:border-brand-accent/50 transition-all" />
              </div>
              <div>
                <label className="text-xs text-fg/60 block mb-1.5 font-medium">{t("register.fields.skill")}</label>
                <select {...register("skills")} className="w-full h-10 px-3 rounded-lg bg-surface border border-border text-sm text-fg/80 focus:outline-none focus:border-brand-accent/50 transition-all appearance-none cursor-pointer">
                  {SKILLS.map(s => <option key={s} value={s} className="bg-bg text-fg">{t(`register.skills.${s}`)}</option>)}
                </select>
                {errors.skills && <p className="text-[10px] text-red-500 mt-1">{t(errors.skills.message!)}</p>}
              </div>
            </div>

            {/* Track preference */}
            <div className="rounded-xl border border-border bg-surface/50 p-6 space-y-4 shadow-sm backdrop-blur-md">
              <h2 className="text-xs font-mono text-fg/50 uppercase tracking-widest">{t("register.sections.track")}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {TRACKS.map(tOption => (
                  <label key={tOption} className="flex items-center gap-3 p-3 rounded-lg border border-border bg-surface hover:bg-fg/5 cursor-pointer transition-all text-sm text-fg/80 has-[:checked]:border-brand-accent/50 has-[:checked]:bg-brand-accent/5">
                    <input type="radio" value={tOption} {...register("track")} className="accent-brand-accent" />
                    {t(`register.tracks.${tOption}`)}
                  </label>
                ))}
              </div>
              {errors.track && <p className="text-[10px] text-red-500 mt-1">{t(errors.track.message!)}</p>}
              <div>
                <label className="text-xs text-fg/60 block mb-1.5 font-medium">{t("register.fields.why")}</label>
                <textarea {...register("bio")} rows={3} placeholder={t("register.fields.why_placeholder")} className="w-full px-3 py-2 rounded-lg bg-surface border border-border text-sm placeholder:text-fg/30 focus:outline-none focus:border-brand-accent/50 transition-all resize-none" />
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full h-12 rounded-lg bg-fg text-bg font-bold text-sm flex items-center justify-center gap-2 hover:opacity-95 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-md">
              {loading ? t("register.processing") : t("register.submit")} <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
