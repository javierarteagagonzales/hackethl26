"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { LOGO_SRC } from "@/lib/asset-path";
import { motion } from "framer-motion";
import { Code2, Mail, ArrowRight, ShieldCheck, Zap, Globe } from "lucide-react";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";
import { useTranslation } from "@/components/providers/language-provider";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function LoginPage() {
  const router = useRouter();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      toast.error(result.error);
      setLoading(false);
    } else {
      router.push("/dashboard");
    }
  };

  const handleGitHubLogin = () => {
    signIn("github", { callbackUrl: "/dashboard" });
  };

  return (
    <div className="min-h-screen bg-bg text-fg flex flex-col md:flex-row font-sans overflow-hidden transition-colors duration-300 relative">
      
      {/* Dynamic theme control toolbar in the top right */}
      <div className="absolute top-4 right-4 z-50 flex items-center gap-3">
        <LanguageSwitcher />
        <ThemeToggle />
      </div>

      {/* Decorative background for mobile */}
      <div className="fixed inset-0 z-0 opacity-10 pointer-events-none md:hidden" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, var(--color-brand-accent) 1px, transparent 0)", backgroundSize: "40px 40px" }} />

      {/* Left panel: Branding & Stats (Desktop) */}
      <div className="hidden md:flex md:w-1/2 bg-surface/50 border-r border-border relative flex-col justify-between p-12 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-accent/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        
        <div className="relative z-10">
          <Link href="/">
            <img src={LOGO_SRC} alt="ETH Lima" className="h-9 w-auto" />
          </Link>
        </div>

        <div className="relative z-10 space-y-8">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-5xl lg:text-6xl font-black tracking-tighter leading-tight">
              {t("login.title_build")} <br />
              <span className="text-gradient-sunset">{t("login.title_decentralized")}</span> <br />
              {t("login.title_future")}
            </h1>
          </motion.div>

          <div className="grid grid-cols-2 gap-6 pt-8">
            {[
              { label: t("login.stats.participants"), val: "1,200+", icon: <Globe className="w-4 h-4 text-brand-accent" /> },
              { label: t("login.stats.bounties"), val: "$10,000", icon: <Zap className="w-4 h-4 text-brand-accent" /> },
              { label: t("login.stats.sponsors"), val: "15+", icon: <ShieldCheck className="w-4 h-4 text-brand-accent" /> },
            ].map((stat, i) => (
              <div key={i} className="space-y-1">
                <div className="flex items-center gap-2 text-fg/60 text-xs font-mono uppercase tracking-widest">
                  {stat.icon} {stat.label}
                </div>
                <div className="text-2xl font-bold">{stat.val}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 text-xs text-fg/40 font-mono">
          {t("login.all_rights")}
        </div>
      </div>

      {/* Right panel: Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 relative z-10 bg-bg">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center md:text-left">
            <div className="md:hidden mb-8 flex justify-center">
              <img src={LOGO_SRC} alt="ETH Lima" className="h-8 w-auto" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight">{t("login.welcome")}</h2>
            <p className="text-fg/60 mt-2 text-sm">{t("login.subtitle")}</p>
          </div>

          <div className="space-y-4">
            <button onClick={handleGitHubLogin} className="w-full h-11 rounded-lg bg-surface border border-border flex items-center justify-center gap-3 hover:bg-fg/5 transition-all group cursor-pointer">
              <Code2 className="w-5 h-5" />
              <span className="text-sm font-medium">{t("login.github_btn")}</span>
            </button>
            <button className="w-full h-11 rounded-lg bg-surface border border-border flex items-center justify-center gap-3 hover:bg-fg/5 transition-all cursor-pointer">
              <Mail className="w-5 h-5 text-fg/55" />
              <span className="text-sm font-medium">{t("login.google_btn")}</span>
            </button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border"></div></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-bg px-4 text-fg/40 font-mono">{t("login.or_email")}</span></div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs text-fg/60 font-medium ml-1">{t("login.email_label")}</label>
              <input name="email" type="email" placeholder="hacker@ethlima.org" required className="w-full h-11 px-4 rounded-lg bg-surface border border-border text-sm focus:outline-none focus:border-brand-accent/50 transition-all placeholder:text-fg/30" />
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between ml-1">
                <label className="text-xs text-fg/60 font-medium">{t("login.password_label")}</label>
                <Link href="#" className="text-[10px] text-brand-accent hover:underline">{t("login.forgot_password")}</Link>
              </div>
              <input name="password" type="password" placeholder="••••••••" required className="w-full h-11 px-4 rounded-lg bg-surface border border-border text-sm focus:outline-none focus:border-brand-accent/50 transition-all placeholder:text-fg/30" />
            </div>
            
            <button type="submit" disabled={loading} className="w-full h-11 rounded-lg bg-fg hover:opacity-90 text-bg font-bold text-sm transition-all flex items-center justify-center gap-2 group disabled:opacity-50 cursor-pointer shadow-md">
              {loading ? t("login.signing_in") : t("login.signin_btn")} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="text-center">
            <p className="text-xs text-fg/60">
              {t("login.no_account")}{" "}
              <Link href="/register" className="text-brand-accent hover:underline font-medium">{t("login.register_link")}</Link>
            </p>
          </div>

          {/* Test accounts notice */}
          <div className="p-4 rounded-lg bg-brand-accent/5 border border-brand-accent/10 text-[10px] text-fg/55 space-y-1 leading-relaxed font-mono">
            <p className="font-bold text-brand-accent uppercase tracking-widest mb-1">// {t("login.sandbox_mode")} (Password: password123)</p>
            <p>Admin: admin@ethlima.org</p>
            <p>Hacker: hacker@ethlima.org</p>
            <p>Judge: judge@ethlima.org</p>
            <p>Mentor: mentor@ethlima.org</p>
          </div>
        </div>
      </div>
    </div>
  );
}
