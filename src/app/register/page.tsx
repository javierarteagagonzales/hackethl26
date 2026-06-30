"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, CheckCircle, Search, Plus, Check } from "lucide-react";
import { submitApplication } from "@/app/actions/register";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useTranslation } from "@/components/providers/language-provider";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useSession } from "next-auth/react";

const INITIAL_SKILLS = [
  "Solidity", "Rust", "Stylus", "Frontend", "Backend", "Typescript", "Javascript",
  "React", "NextJS", "Astro", "Node", "Python", "Go", "AI", "LLMs",
  "Prompt Engineering", "Design", "UI", "UX", "DevOps", "Product",
  "Marketing", "Business", "DAO", "DeFi", "ZK", "Security", "Gaming", "Mobile"
];

const registerSchema = z.object({
  personalInfo: z.object({
    firstName: z.string().min(1, "app_register.errors.first_name_required"),
    lastName: z.string().min(1, "app_register.errors.last_name_required"),
    email: z.string().email("app_register.errors.email_invalid"),
    confirmEmail: z.string().email("app_register.errors.email_invalid"),
    birthDate: z.string().min(1, "app_register.errors.birth_date_required"),
    country: z.string().min(1, "app_register.errors.country_required"),
    city: z.string().min(1, "app_register.errors.city_required"),
    identityDocument: z.string().optional(),
    phone: z.string().min(5, "app_register.errors.phone_required"),
    pronouns: z.string().optional(),
    photoUrl: z.string().optional(),
  }),
  professionalInfo: z.object({
    university: z.string().min(1, "app_register.errors.university_required"),
    major: z.string().min(1, "app_register.errors.major_required"),
    company: z.string().min(1, "app_register.errors.company_required"),
    position: z.string().min(1, "app_register.errors.position_required"),
    academicLevel: z.string().min(1, "app_register.errors.academic_level_required"),
    studyYear: z.string().min(1, "app_register.errors.study_year_required"),
    shortBio: z.string().min(1, "app_register.errors.bio_required"),
  }),
  experience: z.object({
    level: z.enum(["Sin experiencia", "Principiante", "Intermedio", "Avanzado", "Experto"]),
    yearsOfExperience: z.string().min(1, "app_register.errors.years_required"),
    previousHackathons: z.string().min(1, "app_register.errors.hackathons_required"),
    highlightedProjects: z.string().min(1, "app_register.errors.projects_required"),
    github: z.string().min(1, "app_register.errors.github_required"),
    portfolio: z.string().optional(),
    linkedin: z.string().optional(),
    twitter: z.string().optional(),
    website: z.string().optional(),
    wallet: z.string().min(1, "app_register.errors.wallet_required"),
    ens: z.string().optional(),
  }),
  skills: z.array(z.string()).min(1, "app_register.errors.skills_required"),
  track: z.object({
    selectedTrack: z.enum(["DeFi", "AI", "Consumer"]),
    whatToBuild: z.string().min(10, "app_register.errors.what_to_build_short"),
  }),
  motivation: z.object({
    whyParticipate: z.string().min(10, "app_register.errors.why_participate_short").max(1000, "app_register.errors.why_participate_long"),
    whatToExpect: z.string().min(10, "app_register.errors.what_to_expect_short"),
  }),
  availability: z.object({
    attendingInPerson: z.boolean(),
    participatingThreeDays: z.boolean(),
  }),
  team: z.object({
    hasTeam: z.boolean(),
    teamName: z.string().optional(),
    knownMembers: z.string().optional(),
  }),
  termsAccepted: z.boolean().refine(val => val === true, {
    message: "app_register.errors.terms_required",
  }),
  communicationsAccepted: z.boolean(),
});

type RegisterValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Skills states
  const [availableSkills, setAvailableSkills] = useState(INITIAL_SKILLS);
  const [skillSearch, setSkillSearch] = useState("");
  const [customSkill, setCustomSkill] = useState("");

  const { register, handleSubmit, setValue, watch, trigger, formState: { errors } } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      personalInfo: {
        firstName: "",
        lastName: "",
        email: "",
        confirmEmail: "",
        birthDate: "",
        country: "Perú",
        city: "",
        identityDocument: "",
        phone: "",
        pronouns: "He/Him",
        photoUrl: "",
      },
      professionalInfo: {
        university: "",
        major: "",
        company: "",
        position: "",
        academicLevel: "Pregrado",
        studyYear: "3",
        shortBio: "",
      },
      experience: {
        level: "Intermedio",
        yearsOfExperience: "2",
        previousHackathons: "",
        highlightedProjects: "",
        github: "",
        portfolio: "",
        linkedin: "",
        twitter: "",
        website: "",
        wallet: "",
        ens: "",
      },
      skills: [],
      track: {
        selectedTrack: "DeFi",
        whatToBuild: "",
      },
      motivation: {
        whyParticipate: "",
        whatToExpect: "",
      },
      availability: {
        attendingInPerson: true,
        participatingThreeDays: true,
      },
      team: {
        hasTeam: false,
        teamName: "",
        knownMembers: "",
      },
      termsAccepted: true,
      communicationsAccepted: false,
    }
  });

  const selectedSkills = watch("skills") || [];
  const hasTeam = watch("team.hasTeam");

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  const handleNextStep = async () => {
    let fieldsToValidate: any[] = [];
    if (step === 1) {
      fieldsToValidate = [
        "personalInfo.firstName", "personalInfo.lastName",
        "personalInfo.email", "personalInfo.confirmEmail",
        "personalInfo.birthDate", "personalInfo.country",
        "personalInfo.city", "personalInfo.phone"
      ];
    } else if (step === 2) {
      fieldsToValidate = [
        "professionalInfo.university", "professionalInfo.major",
        "professionalInfo.company", "professionalInfo.position",
        "professionalInfo.academicLevel", "professionalInfo.studyYear",
        "professionalInfo.shortBio"
      ];
    } else if (step === 3) {
      fieldsToValidate = [
        "experience.level", "experience.yearsOfExperience",
        "experience.previousHackathons", "experience.highlightedProjects",
        "experience.github", "experience.wallet"
      ];
    } else if (step === 4) {
      fieldsToValidate = ["skills"];
    } else if (step === 5) {
      fieldsToValidate = ["track.selectedTrack", "track.whatToBuild"];
    } else if (step === 6) {
      fieldsToValidate = ["motivation.whyParticipate", "motivation.whatToExpect"];
    } else if (step === 7) {
      fieldsToValidate = ["availability.attendingInPerson", "availability.participatingThreeDays"];
    } else if (step === 8) {
      fieldsToValidate = ["team.hasTeam", "team.teamName", "team.knownMembers"];
    }

    const isValid = await trigger(fieldsToValidate as any);
    if (isValid) {
      setStep(prev => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevStep = () => {
    setStep(prev => Math.max(1, prev - 1));
    window.scrollTo(0, 0);
  };

  const onSubmit = async (values: RegisterValues) => {
    setLoading(true);
    setError("");
    
    const result = await submitApplication(values);
    
    if (result.success) {
      setSuccess(true);
    } else {
      setError(t(result.error || "app_register.errors.database_error"));
      setLoading(false);
    }
  };

  const handleToggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setValue("skills", selectedSkills.filter(s => s !== skill), { shouldValidate: true });
    } else {
      setValue("skills", [...selectedSkills, skill], { shouldValidate: true });
    }
  };

  const handleAddCustomSkill = () => {
    const trimmed = customSkill.trim();
    if (trimmed && !availableSkills.includes(trimmed)) {
      setAvailableSkills(prev => [...prev, trimmed]);
      setValue("skills", [...selectedSkills, trimmed], { shouldValidate: true });
      setCustomSkill("");
    }
  };

  const filteredSkills = availableSkills.filter(skill =>
    skill.toLowerCase().includes(skillSearch.toLowerCase())
  );

  if (success) {
    return (
      <div className="min-h-screen bg-bg text-fg font-sans transition-colors duration-300 relative flex items-center justify-center">
        <div className="fixed inset-0 z-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, var(--color-brand-accent) 1px, transparent 0)", backgroundSize: "48px 48px" }} />
        <div className="relative z-10 p-8 max-w-lg w-full rounded-2xl border border-border bg-surface shadow-2xl backdrop-blur-md text-center space-y-6">
          <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto animate-bounce">
            <CheckCircle className="w-10 h-10" />
          </div>
          <h1 className="text-3xl font-black tracking-tight">{t("app_register.success_title")}</h1>
          <p className="text-fg/60 text-sm leading-relaxed">{t("app_register.success_desc")}</p>
          <Link href="/" className="inline-flex h-11 px-6 rounded-lg bg-fg text-bg font-bold text-sm items-center justify-center gap-2 hover:opacity-95 transition-opacity cursor-pointer">
            {t("app_register.back_to_home")}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg text-fg font-sans transition-colors duration-300 relative">
      <div className="fixed inset-0 z-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, var(--color-brand-accent) 1px, transparent 0)", backgroundSize: "48px 48px" }} />
      <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-brand-accent/5 blur-[130px] rounded-full pointer-events-none z-0" />

      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-border bg-surface/80 backdrop-blur-xl transition-all duration-300">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/">
            <Logo alt="ETH Lima" className="h-7 w-auto" />
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
          <div className="mb-8">
            <div className="font-mono text-xs text-brand-accent mb-3 tracking-[0.3em] uppercase">{t("register.form_subtitle")}</div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">{t("register.title")} <span className="text-gradient-sunset">{t("register.hacker")}</span></h1>
            <div className="flex items-center gap-2 text-xs font-mono text-fg/40 uppercase tracking-wider">
              <span>Step {step} of 9</span>
              <div className="flex gap-1 h-1.5 w-32 bg-border rounded-full overflow-hidden">
                <div className="bg-brand-accent transition-all duration-300" style={{ width: `${(step / 9) * 100}%` }} />
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {error && <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-medium">{error}</div>}

            <AnimatePresence mode="wait">
              {/* STEP 1: Personal Info */}
              {step === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="rounded-xl border border-border bg-surface/50 p-6 space-y-4 shadow-sm backdrop-blur-md">
                  <h2 className="text-sm font-mono text-brand-accent uppercase tracking-widest">{t("app_register.sections.personal")}</h2>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-fg/60 block mb-1.5 font-medium">{t("app_register.fields.first_name")}</label>
                      <input {...register("personalInfo.firstName")} placeholder="Javier" className="w-full h-10 px-3 rounded-lg bg-surface border border-border text-sm focus:outline-none focus:border-brand-accent/50 transition-all" />
                      {errors.personalInfo?.firstName && <p className="text-[10px] text-red-500 mt-1">{t(errors.personalInfo.firstName.message!)}</p>}
                    </div>
                    <div>
                      <label className="text-xs text-fg/60 block mb-1.5 font-medium">{t("app_register.fields.last_name")}</label>
                      <input {...register("personalInfo.lastName")} placeholder="Arteaga" className="w-full h-10 px-3 rounded-lg bg-surface border border-border text-sm focus:outline-none focus:border-brand-accent/50 transition-all" />
                      {errors.personalInfo?.lastName && <p className="text-[10px] text-red-500 mt-1">{t(errors.personalInfo.lastName.message!)}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-fg/60 block mb-1.5 font-medium">{t("app_register.fields.email")}</label>
                      <input {...register("personalInfo.email")} type="email" placeholder="hacker@ethlima.org" className="w-full h-10 px-3 rounded-lg bg-surface border border-border text-sm focus:outline-none focus:border-brand-accent/50 transition-all" />
                      {errors.personalInfo?.email && <p className="text-[10px] text-red-500 mt-1">{t(errors.personalInfo.email.message!)}</p>}
                    </div>
                    <div>
                      <label className="text-xs text-fg/60 block mb-1.5 font-medium">{t("app_register.fields.confirm_email")}</label>
                      <input {...register("personalInfo.confirmEmail")} type="email" placeholder="hacker@ethlima.org" className="w-full h-10 px-3 rounded-lg bg-surface border border-border text-sm focus:outline-none focus:border-brand-accent/50 transition-all" />
                      {errors.personalInfo?.confirmEmail && <p className="text-[10px] text-red-500 mt-1">{t(errors.personalInfo.confirmEmail.message!)}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-fg/60 block mb-1.5 font-medium">{t("app_register.fields.birth_date")}</label>
                      <input {...register("personalInfo.birthDate")} type="date" className="w-full h-10 px-3 rounded-lg bg-surface border border-border text-sm focus:outline-none focus:border-brand-accent/50 transition-all" />
                      {errors.personalInfo?.birthDate && <p className="text-[10px] text-red-500 mt-1">{t(errors.personalInfo.birthDate.message!)}</p>}
                    </div>
                    <div>
                      <label className="text-xs text-fg/60 block mb-1.5 font-medium">{t("app_register.fields.phone")}</label>
                      <input {...register("personalInfo.phone")} placeholder="+51 987654321" className="w-full h-10 px-3 rounded-lg bg-surface border border-border text-sm focus:outline-none focus:border-brand-accent/50 transition-all" />
                      {errors.personalInfo?.phone && <p className="text-[10px] text-red-500 mt-1">{t(errors.personalInfo.phone.message!)}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-fg/60 block mb-1.5 font-medium">{t("app_register.fields.country")}</label>
                      <input {...register("personalInfo.country")} placeholder="Perú" className="w-full h-10 px-3 rounded-lg bg-surface border border-border text-sm focus:outline-none focus:border-brand-accent/50 transition-all" />
                      {errors.personalInfo?.country && <p className="text-[10px] text-red-500 mt-1">{t(errors.personalInfo.country.message!)}</p>}
                    </div>
                    <div>
                      <label className="text-xs text-fg/60 block mb-1.5 font-medium">{t("app_register.fields.city")}</label>
                      <input {...register("personalInfo.city")} placeholder="Lima" className="w-full h-10 px-3 rounded-lg bg-surface border border-border text-sm focus:outline-none focus:border-brand-accent/50 transition-all" />
                      {errors.personalInfo?.city && <p className="text-[10px] text-red-500 mt-1">{t(errors.personalInfo.city.message!)}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-fg/60 block mb-1.5 font-medium">{t("app_register.fields.identity_document")}</label>
                      <input {...register("personalInfo.identityDocument")} placeholder="DNI, Passport..." className="w-full h-10 px-3 rounded-lg bg-surface border border-border text-sm focus:outline-none focus:border-brand-accent/50 transition-all" />
                    </div>
                    <div>
                      <label className="text-xs text-fg/60 block mb-1.5 font-medium">{t("app_register.fields.pronouns")}</label>
                      <input {...register("personalInfo.pronouns")} placeholder="He/Him, She/Her, They/Them..." className="w-full h-10 px-3 rounded-lg bg-surface border border-border text-sm focus:outline-none focus:border-brand-accent/50 transition-all" />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-fg/60 block mb-1.5 font-medium">{t("app_register.fields.photo_url")}</label>
                    <input {...register("personalInfo.photoUrl")} placeholder="https://..." className="w-full h-10 px-3 rounded-lg bg-surface border border-border text-sm focus:outline-none focus:border-brand-accent/50 transition-all" />
                  </div>
                </motion.div>
              )}

              {/* STEP 2: Professional Info */}
              {step === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="rounded-xl border border-border bg-surface/50 p-6 space-y-4 shadow-sm backdrop-blur-md">
                  <h2 className="text-sm font-mono text-brand-accent uppercase tracking-widest">{t("app_register.sections.professional")}</h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-fg/60 block mb-1.5 font-medium">{t("app_register.fields.university")}</label>
                      <input {...register("professionalInfo.university")} placeholder="Universidad Nacional de Ingeniería" className="w-full h-10 px-3 rounded-lg bg-surface border border-border text-sm focus:outline-none focus:border-brand-accent/50 transition-all" />
                      {errors.professionalInfo?.university && <p className="text-[10px] text-red-500 mt-1">{t(errors.professionalInfo.university.message!)}</p>}
                    </div>
                    <div>
                      <label className="text-xs text-fg/60 block mb-1.5 font-medium">{t("app_register.fields.major")}</label>
                      <input {...register("professionalInfo.major")} placeholder="Ciencia de la Computación" className="w-full h-10 px-3 rounded-lg bg-surface border border-border text-sm focus:outline-none focus:border-brand-accent/50 transition-all" />
                      {errors.professionalInfo?.major && <p className="text-[10px] text-red-500 mt-1">{t(errors.professionalInfo.major.message!)}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-fg/60 block mb-1.5 font-medium">{t("app_register.fields.company")}</label>
                      <input {...register("professionalInfo.company")} placeholder="ETH Devs" className="w-full h-10 px-3 rounded-lg bg-surface border border-border text-sm focus:outline-none focus:border-brand-accent/50 transition-all" />
                      {errors.professionalInfo?.company && <p className="text-[10px] text-red-500 mt-1">{t(errors.professionalInfo.company.message!)}</p>}
                    </div>
                    <div>
                      <label className="text-xs text-fg/60 block mb-1.5 font-medium">{t("app_register.fields.position")}</label>
                      <input {...register("professionalInfo.position")} placeholder="Software Engineer" className="w-full h-10 px-3 rounded-lg bg-surface border border-border text-sm focus:outline-none focus:border-brand-accent/50 transition-all" />
                      {errors.professionalInfo?.position && <p className="text-[10px] text-red-500 mt-1">{t(errors.professionalInfo.position.message!)}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-fg/60 block mb-1.5 font-medium">{t("app_register.fields.academic_level")}</label>
                      <select {...register("professionalInfo.academicLevel")} className="w-full h-10 px-3 rounded-lg bg-surface border border-border text-sm focus:outline-none focus:border-brand-accent/50 cursor-pointer appearance-none">
                        <option value="Pregrado">Pregrado / Estudiante Universitario</option>
                        <option value="Postgrado">Postgrado (Master, Phd)</option>
                        <option value="Graduado">Egresado / Profesional</option>
                        <option value="Autodidacta">Autodidacta</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-fg/60 block mb-1.5 font-medium">{t("app_register.fields.study_year")}</label>
                      <input {...register("professionalInfo.studyYear")} placeholder="3" className="w-full h-10 px-3 rounded-lg bg-surface border border-border text-sm focus:outline-none focus:border-brand-accent/50 transition-all" />
                      {errors.professionalInfo?.studyYear && <p className="text-[10px] text-red-500 mt-1">{t(errors.professionalInfo.studyYear.message!)}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-fg/60 block mb-1.5 font-medium">{t("app_register.fields.short_bio")}</label>
                    <textarea {...register("professionalInfo.shortBio")} rows={3} placeholder="Full Stack Web3 Builder con interés en smart contracts..." className="w-full px-3 py-2 rounded-lg bg-surface border border-border text-sm focus:outline-none focus:border-brand-accent/50 transition-all resize-none" />
                    {errors.professionalInfo?.shortBio && <p className="text-[10px] text-red-500 mt-1">{t(errors.professionalInfo.shortBio.message!)}</p>}
                  </div>
                </motion.div>
              )}

              {/* STEP 3: Experience */}
              {step === 3 && (
                <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="rounded-xl border border-border bg-surface/50 p-6 space-y-4 shadow-sm backdrop-blur-md">
                  <h2 className="text-sm font-mono text-brand-accent uppercase tracking-widest">{t("app_register.sections.experience")}</h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-fg/60 block mb-1.5 font-medium">{t("app_register.fields.exp_level")}</label>
                      <select {...register("experience.level")} className="w-full h-10 px-3 rounded-lg bg-surface border border-border text-sm focus:outline-none focus:border-brand-accent/50 cursor-pointer appearance-none">
                        <option value="Sin experiencia">Sin experiencia</option>
                        <option value="Principiante">Principiante</option>
                        <option value="Intermedio">Intermedio</option>
                        <option value="Avanzado">Avanzado</option>
                        <option value="Experto">Experto</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-fg/60 block mb-1.5 font-medium">{t("app_register.fields.years_exp")}</label>
                      <input {...register("experience.yearsOfExperience")} placeholder="2" className="w-full h-10 px-3 rounded-lg bg-surface border border-border text-sm focus:outline-none focus:border-brand-accent/50 transition-all" />
                      {errors.experience?.yearsOfExperience && <p className="text-[10px] text-red-500 mt-1">{t(errors.experience.yearsOfExperience.message!)}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-fg/60 block mb-1.5 font-medium">{t("app_register.fields.prev_hackathons")}</label>
                    <input {...register("experience.previousHackathons")} placeholder="Ethereum Lima 2025, ETH Global..." className="w-full h-10 px-3 rounded-lg bg-surface border border-border text-sm focus:outline-none focus:border-brand-accent/50 transition-all" />
                    {errors.experience?.previousHackathons && <p className="text-[10px] text-red-500 mt-1">{t(errors.experience.previousHackathons.message!)}</p>}
                  </div>

                  <div>
                    <label className="text-xs text-fg/60 block mb-1.5 font-medium">{t("app_register.fields.highlighted_projects")}</label>
                    <input {...register("experience.highlightedProjects")} placeholder="DeFi Lending Protocol, NFT Marketplace..." className="w-full h-10 px-3 rounded-lg bg-surface border border-border text-sm focus:outline-none focus:border-brand-accent/50 transition-all" />
                    {errors.experience?.highlightedProjects && <p className="text-[10px] text-red-500 mt-1">{t(errors.experience.highlightedProjects.message!)}</p>}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-fg/60 block mb-1.5 font-medium">{t("app_register.fields.github")}</label>
                      <input {...register("experience.github")} placeholder="https://github.com/your-username" className="w-full h-10 px-3 rounded-lg bg-surface border border-border text-sm focus:outline-none focus:border-brand-accent/50 transition-all" />
                      {errors.experience?.github && <p className="text-[10px] text-red-500 mt-1">{t(errors.experience.github.message!)}</p>}
                    </div>
                    <div>
                      <label className="text-xs text-fg/60 block mb-1.5 font-medium">{t("app_register.fields.portfolio")}</label>
                      <input {...register("experience.portfolio")} placeholder="https://..." className="w-full h-10 px-3 rounded-lg bg-surface border border-border text-sm focus:outline-none focus:border-brand-accent/50 transition-all" />
                      {errors.experience?.portfolio && <p className="text-[10px] text-red-500 mt-1">{t(errors.experience.portfolio.message!)}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-fg/60 block mb-1.5 font-medium">{t("app_register.fields.linkedin")}</label>
                      <input {...register("experience.linkedin")} placeholder="https://linkedin.com/in/..." className="w-full h-10 px-3 rounded-lg bg-surface border border-border text-sm focus:outline-none focus:border-brand-accent/50 transition-all" />
                      {errors.experience?.linkedin && <p className="text-[10px] text-red-500 mt-1">{t(errors.experience.linkedin.message!)}</p>}
                    </div>
                    <div>
                      <label className="text-xs text-fg/60 block mb-1.5 font-medium">{t("app_register.fields.twitter")}</label>
                      <input {...register("experience.twitter")} placeholder="https://x.com/..." className="w-full h-10 px-3 rounded-lg bg-surface border border-border text-sm focus:outline-none focus:border-brand-accent/50 transition-all" />
                      {errors.experience?.twitter && <p className="text-[10px] text-red-500 mt-1">{t(errors.experience.twitter.message!)}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-fg/60 block mb-1.5 font-medium">{t("app_register.fields.wallet")}</label>
                      <input {...register("experience.wallet")} placeholder="0x..." className="w-full h-10 px-3 rounded-lg bg-surface border border-border text-sm font-mono focus:outline-none focus:border-brand-accent/50 transition-all" />
                      {errors.experience?.wallet && <p className="text-[10px] text-red-500 mt-1">{t(errors.experience.wallet.message!)}</p>}
                    </div>
                    <div>
                      <label className="text-xs text-fg/60 block mb-1.5 font-medium">{t("app_register.fields.ens")}</label>
                      <input {...register("experience.ens")} placeholder="yourname.eth" className="w-full h-10 px-3 rounded-lg bg-surface border border-border text-sm font-mono focus:outline-none focus:border-brand-accent/50 transition-all" />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-fg/60 block mb-1.5 font-medium">{t("app_register.fields.website")}</label>
                    <input {...register("experience.website")} placeholder="https://..." className="w-full h-10 px-3 rounded-lg bg-surface border border-border text-sm focus:outline-none focus:border-brand-accent/50 transition-all" />
                    {errors.experience?.website && <p className="text-[10px] text-red-500 mt-1">{t(errors.experience.website.message!)}</p>}
                  </div>
                </motion.div>
              )}

              {/* STEP 4: Skills */}
              {step === 4 && (
                <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="rounded-xl border border-border bg-surface/50 p-6 space-y-4 shadow-sm backdrop-blur-md">
                  <h2 className="text-sm font-mono text-brand-accent uppercase tracking-widest">{t("app_register.sections.skills")}</h2>
                  
                  {/* Search and add custom skill */}
                  <div className="space-y-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-fg/40" />
                      <input value={skillSearch} onChange={(e) => setSkillSearch(e.target.value)} placeholder={t("app_register.fields.skills_placeholder")} className="w-full h-10 pl-10 pr-3 rounded-lg bg-surface border border-border text-sm focus:outline-none focus:border-brand-accent/50 transition-all" />
                    </div>
                    
                    <div className="flex gap-2">
                      <input value={customSkill} onChange={(e) => setCustomSkill(e.target.value)} placeholder="Add custom skill..." className="flex-1 h-9 px-3 rounded-lg bg-surface border border-border text-xs focus:outline-none focus:border-brand-accent/50 transition-all" />
                      <button type="button" onClick={handleAddCustomSkill} className="h-9 px-4 rounded-lg bg-fg text-bg font-bold text-xs flex items-center gap-1 hover:opacity-90 transition-opacity cursor-pointer">
                        <Plus className="w-3.5 h-3.5" /> Add
                      </button>
                    </div>
                  </div>

                  {errors.skills && <p className="text-[10px] text-red-500 mt-1">{t(errors.skills.message!)}</p>}

                  {/* Skills Grid */}
                  <div className="max-h-60 overflow-y-auto p-1 custom-scrollbar border border-border bg-black/10 rounded-lg">
                    <div className="flex flex-wrap gap-2">
                      {filteredSkills.map(skill => {
                        const isSelected = selectedSkills.includes(skill);
                        return (
                          <button key={skill} type="button" onClick={() => handleToggleSkill(skill)} className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${isSelected ? "border-brand-accent bg-brand-accent/10 text-brand-accent" : "border-border bg-surface hover:bg-fg/5 text-fg/80"}`}>
                            {isSelected && <Check className="w-3.5 h-3.5" />}
                            {skill}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 5: Track Preference */}
              {step === 5 && (
                <motion.div key="step5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="rounded-xl border border-border bg-surface/50 p-6 space-y-4 shadow-sm backdrop-blur-md">
                  <h2 className="text-sm font-mono text-brand-accent uppercase tracking-widest">{t("app_register.sections.track")}</h2>

                  <div className="space-y-2">
                    <label className="text-xs text-fg/60 block mb-1.5 font-medium">{t("app_register.fields.selected_track")}</label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {["DeFi", "AI", "Consumer"].map(trOption => (
                        <label key={trOption} className="flex items-center gap-3 p-3 rounded-lg border border-border bg-surface hover:bg-fg/5 cursor-pointer transition-all text-sm text-fg/80 has-[:checked]:border-brand-accent/50 has-[:checked]:bg-brand-accent/5">
                          <input type="radio" value={trOption} {...register("track.selectedTrack")} className="accent-brand-accent" />
                          {trOption}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-fg/60 block mb-1.5 font-medium">{t("app_register.fields.what_to_build")}</label>
                    <textarea {...register("track.whatToBuild")} rows={4} placeholder="Describe brevemente tu idea de proyecto..." className="w-full px-3 py-2 rounded-lg bg-surface border border-border text-sm focus:outline-none focus:border-brand-accent/50 transition-all resize-none" />
                    {errors.track?.whatToBuild && <p className="text-[10px] text-red-500 mt-1">{t(errors.track.whatToBuild.message!)}</p>}
                  </div>
                </motion.div>
              )}

              {/* STEP 6: Motivation */}
              {step === 6 && (
                <motion.div key="step6" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="rounded-xl border border-border bg-surface/50 p-6 space-y-4 shadow-sm backdrop-blur-md">
                  <h2 className="text-sm font-mono text-brand-accent uppercase tracking-widest">{t("app_register.sections.motivation")}</h2>

                  <div>
                    <label className="text-xs text-fg/60 block mb-1.5 font-medium">{t("app_register.fields.why_participate")}</label>
                    <textarea {...register("motivation.whyParticipate")} rows={4} placeholder="Cuéntanos por qué quieres ser parte de ETH Lima..." className="w-full px-3 py-2 rounded-lg bg-surface border border-border text-sm focus:outline-none focus:border-brand-accent/50 transition-all resize-none" />
                    {errors.motivation?.whyParticipate && <p className="text-[10px] text-red-500 mt-1">{t(errors.motivation.whyParticipate.message!)}</p>}
                  </div>

                  <div>
                    <label className="text-xs text-fg/60 block mb-1.5 font-medium">{t("app_register.fields.what_to_expect")}</label>
                    <textarea {...register("motivation.whatToExpect")} rows={4} placeholder="Aprender sobre L2, conocer otros desarrolladores, encontrar sponsors..." className="w-full px-3 py-2 rounded-lg bg-surface border border-border text-sm focus:outline-none focus:border-brand-accent/50 transition-all resize-none" />
                    {errors.motivation?.whatToExpect && <p className="text-[10px] text-red-500 mt-1">{t(errors.motivation.whatToExpect.message!)}</p>}
                  </div>
                </motion.div>
              )}

              {/* STEP 7: Availability */}
              {step === 7 && (
                <motion.div key="step7" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="rounded-xl border border-border bg-surface/50 p-6 space-y-4 shadow-sm backdrop-blur-md">
                  <h2 className="text-sm font-mono text-brand-accent uppercase tracking-widest">{t("app_register.sections.availability")}</h2>

                  <div className="space-y-4">
                    <label className="flex items-center gap-3 p-4 rounded-lg border border-border bg-surface hover:bg-fg/5 cursor-pointer transition-all">
                      <input type="checkbox" {...register("availability.attendingInPerson")} className="accent-brand-accent w-4 h-4" />
                      <div>
                        <span className="text-sm font-medium block">{t("app_register.fields.attending_person")}</span>
                        <span className="text-xs text-fg/50">El evento se llevará a cabo de forma presencial y virtual (híbrido).</span>
                      </div>
                    </label>

                    <label className="flex items-center gap-3 p-4 rounded-lg border border-border bg-surface hover:bg-fg/5 cursor-pointer transition-all">
                      <input type="checkbox" {...register("availability.participatingThreeDays")} className="accent-brand-accent w-4 h-4" />
                      <div>
                        <span className="text-sm font-medium block">{t("app_register.fields.participating_days")}</span>
                        <span className="text-xs text-fg/50">Compromiso para participar activamente durante las fechas oficiales.</span>
                      </div>
                    </label>
                  </div>
                </motion.div>
              )}

              {/* STEP 8: Team */}
              {step === 8 && (
                <motion.div key="step8" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="rounded-xl border border-border bg-surface/50 p-6 space-y-4 shadow-sm backdrop-blur-md">
                  <h2 className="text-sm font-mono text-brand-accent uppercase tracking-widest">{t("app_register.sections.team")}</h2>

                  <div className="space-y-4">
                    <label className="flex items-center gap-3 p-4 rounded-lg border border-border bg-surface hover:bg-fg/5 cursor-pointer transition-all">
                      <input type="checkbox" {...register("team.hasTeam")} className="accent-brand-accent w-4 h-4" />
                      <div>
                        <span className="text-sm font-medium block">{t("app_register.fields.has_team")}</span>
                        <span className="text-xs text-fg/50">Selecciona si ya vienes con un equipo pre-formado.</span>
                      </div>
                    </label>

                    {hasTeam && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="space-y-4 pt-2">
                        <div>
                          <label className="text-xs text-fg/60 block mb-1.5 font-medium">{t("app_register.fields.team_name")}</label>
                          <input {...register("team.teamName")} placeholder="Nombre de tu equipo" className="w-full h-10 px-3 rounded-lg bg-surface border border-border text-sm focus:outline-none focus:border-brand-accent/50 transition-all" />
                        </div>
                        <div>
                          <label className="text-xs text-fg/60 block mb-1.5 font-medium">{t("app_register.fields.known_members")}</label>
                          <textarea {...register("team.knownMembers")} rows={2} placeholder="Nombres o correos de tus compañeros (opcional)..." className="w-full px-3 py-2 rounded-lg bg-surface border border-border text-sm focus:outline-none focus:border-brand-accent/50 transition-all resize-none" />
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* STEP 9: Terms */}
              {step === 9 && (
                <motion.div key="step9" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="rounded-xl border border-border bg-surface/50 p-6 space-y-4 shadow-sm backdrop-blur-md">
                  <h2 className="text-sm font-mono text-brand-accent uppercase tracking-widest">{t("app_register.sections.terms")}</h2>

                  <div className="space-y-4">
                    <label className="flex items-start gap-3 p-4 rounded-lg border border-border bg-surface hover:bg-fg/5 cursor-pointer transition-all">
                      <input type="checkbox" {...register("termsAccepted")} className="accent-brand-accent w-4 h-4 mt-0.5" />
                      <div>
                        <span className="text-sm font-medium block">{t("app_register.fields.accept_terms")}</span>
                        <span className="text-xs text-fg/50">Es obligatorio aceptar los términos para postular.</span>
                      </div>
                    </label>
                    {errors.termsAccepted && <p className="text-[10px] text-red-500">{t(errors.termsAccepted.message!)}</p>}

                    <label className="flex items-start gap-3 p-4 rounded-lg border border-border bg-surface hover:bg-fg/5 cursor-pointer transition-all">
                      <input type="checkbox" {...register("communicationsAccepted")} className="accent-brand-accent w-4 h-4 mt-0.5" />
                      <div>
                        <span className="text-sm font-medium block">{t("app_register.fields.accept_comm")}</span>
                        <span className="text-xs text-fg/50">Recibe actualizaciones, invitaciones de patrocinadores e información importante.</span>
                      </div>
                    </label>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Step Controls */}
            <div className="flex gap-4">
              {step > 1 && (
                <button type="button" onClick={handlePrevStep} className="flex-1 h-12 rounded-lg border border-border text-fg font-bold text-sm flex items-center justify-center gap-2 hover:bg-fg/5 transition-all cursor-pointer">
                  <ArrowLeft className="w-4 h-4" /> Anterior
                </button>
              )}
              
              {step < 9 ? (
                <button type="button" onClick={handleNextStep} className="flex-1 h-12 rounded-lg bg-fg text-bg font-bold text-sm flex items-center justify-center gap-2 hover:opacity-95 transition-opacity cursor-pointer shadow-md">
                  Siguiente <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button type="submit" disabled={loading} className="flex-1 h-12 rounded-lg bg-fg text-bg font-bold text-sm flex items-center justify-center gap-2 hover:opacity-95 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-md">
                  {loading ? t("register.processing") : t("register.submit")} <CheckCircle className="w-4 h-4" />
                </button>
              )}
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
