"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import * as z from "zod";

const urlRegex = /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;
const walletRegex = /^0x[a-fA-F0-9]{40}$/;

const applicationSchema = z.object({
  personalInfo: z.object({
    firstName: z.string().min(1, "register.errors.first_name_required").transform(s => s.trim()),
    lastName: z.string().min(1, "register.errors.last_name_required").transform(s => s.trim()),
    email: z.string().email("register.errors.email_invalid").transform(s => s.trim().toLowerCase()),
    confirmEmail: z.string().email("register.errors.email_invalid").transform(s => s.trim().toLowerCase()),
    birthDate: z.string().min(1, "register.errors.birth_date_required"),
    country: z.string().min(1, "register.errors.country_required").transform(s => s.trim()),
    city: z.string().min(1, "register.errors.city_required").transform(s => s.trim()),
    identityDocument: z.string().optional().transform(s => s?.trim() || undefined),
    phone: z.string().min(5, "register.errors.phone_required").transform(s => s.trim()),
    pronouns: z.string().optional().transform(s => s?.trim() || undefined),
    photoUrl: z.string().optional().transform(s => s?.trim() || undefined),
  }).refine((data) => data.email === data.confirmEmail, {
    message: "register.errors.emails_must_match",
    path: ["confirmEmail"],
  }),
  professionalInfo: z.object({
    university: z.string().min(1, "register.errors.university_required").transform(s => s.trim()),
    major: z.string().min(1, "register.errors.major_required").transform(s => s.trim()),
    company: z.string().min(1, "register.errors.company_required").transform(s => s.trim()),
    position: z.string().min(1, "register.errors.position_required").transform(s => s.trim()),
    academicLevel: z.string().min(1, "register.errors.academic_level_required").transform(s => s.trim()),
    studyYear: z.string().min(1, "register.errors.study_year_required").transform(s => s.trim()),
    shortBio: z.string().min(1, "register.errors.bio_required").transform(s => s.trim()),
  }),
  experience: z.object({
    level: z.enum(["Sin experiencia", "Principiante", "Intermedio", "Avanzado", "Experto"]),
    yearsOfExperience: z.string().min(1, "register.errors.years_required").transform(s => s.trim()),
    previousHackathons: z.string().min(1, "register.errors.hackathons_required").transform(s => s.trim()),
    highlightedProjects: z.string().min(1, "register.errors.projects_required").transform(s => s.trim()),
    github: z.string().min(1, "register.errors.github_required").transform(s => s.trim()),
    portfolio: z.string().optional().refine(val => !val || urlRegex.test(val), { message: "register.errors.invalid_url" }).transform(s => s?.trim() || undefined),
    linkedin: z.string().optional().refine(val => !val || urlRegex.test(val), { message: "register.errors.invalid_url" }).transform(s => s?.trim() || undefined),
    twitter: z.string().optional().refine(val => !val || urlRegex.test(val), { message: "register.errors.invalid_url" }).transform(s => s?.trim() || undefined),
    website: z.string().optional().refine(val => !val || urlRegex.test(val), { message: "register.errors.invalid_url" }).transform(s => s?.trim() || undefined),
    wallet: z.string().regex(walletRegex, "register.errors.invalid_wallet").transform(s => s.trim().toLowerCase()),
    ens: z.string().optional().transform(s => s?.trim() || undefined),
  }),
  skills: z.array(z.string()).min(1, "register.errors.skills_required"),
  track: z.object({
    selectedTrack: z.enum(["DeFi", "AI", "Consumer"]),
    whatToBuild: z.string().min(10, "register.errors.what_to_build_short").transform(s => s.trim()),
  }),
  motivation: z.object({
    whyParticipate: z.string().min(10, "register.errors.why_participate_short").max(1000, "register.errors.why_participate_long").transform(s => s.trim()),
    whatToExpect: z.string().min(10, "register.errors.what_to_expect_short").transform(s => s.trim()),
  }),
  availability: z.object({
    attendingInPerson: z.boolean(),
    participatingThreeDays: z.boolean(),
  }),
  team: z.object({
    hasTeam: z.boolean(),
    teamName: z.string().optional().transform(s => s?.trim() || undefined),
    knownMembers: z.string().optional().transform(s => s?.trim() || undefined),
  }),
  termsAccepted: z.boolean().refine(val => val === true, {
    message: "app_register.errors.terms_required",
  }),
  communicationsAccepted: z.boolean(),
});

export type ApplicationInput = z.infer<typeof applicationSchema>;

export async function submitApplication(data: unknown) {
  try {
    const validated = applicationSchema.safeParse(data);
    if (!validated.success) {
      const errorMsg = validated.error.issues[0]?.message || "register.errors.validation_failed";
      return { success: false, error: errorMsg };
    }

    const { personalInfo, experience, termsAccepted } = validated.data;
    const email = personalInfo.email;
    const wallet = experience.wallet;

    // Check minimum age (configurable, default 18)
    const minAge = parseInt(process.env.MIN_AGE || "18", 10);
    const birthDate = new Date(personalInfo.birthDate);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    if (age < minAge) {
      return { success: false, error: "register.errors.underage" };
    }

    // Check duplicate by email in User
    const existingUserEmail = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUserEmail) {
      return { success: false, error: "register.errors.email_exists" };
    }

    // Check duplicate by wallet in User
    const existingUserWallet = await prisma.user.findFirst({
      where: { walletAddress: wallet },
    });
    if (existingUserWallet) {
      return { success: false, error: "register.errors.wallet_exists" };
    }

    // Check duplicate by email in non-rejected Applications using raw query for JSON speed/safety
    const existingAppEmail: any[] = await prisma.$queryRaw`
      SELECT id FROM "Application" 
      WHERE LOWER("personalInfo"->>'email') = ${email} 
      AND "status" != 'REJECTED'
      LIMIT 1
    `;
    if (existingAppEmail.length > 0) {
      return { success: false, error: "register.errors.application_email_exists" };
    }

    // Check duplicate by wallet in non-rejected Applications
    const existingAppWallet: any[] = await prisma.$queryRaw`
      SELECT id FROM "Application" 
      WHERE LOWER("experience"->>'wallet') = ${wallet} 
      AND "status" != 'REJECTED'
      LIMIT 1
    `;
    if (existingAppWallet.length > 0) {
      return { success: false, error: "register.errors.application_wallet_exists" };
    }

    // Create the Application record
    const application = await prisma.application.create({
      data: {
        personalInfo: validated.data.personalInfo as any,
        professionalInfo: validated.data.professionalInfo as any,
        experience: validated.data.experience as any,
        skills: validated.data.skills as any,
        track: validated.data.track as any,
        motivation: validated.data.motivation as any,
        availability: validated.data.availability as any,
        team: validated.data.team as any,
        termsAccepted,
      },
    });

    revalidatePath("/admin/applications");
    return { success: true, applicationId: application.id };
  } catch (error) {
    console.error("Error submitting application:", error);
    return { success: false, error: "register.errors.database_error" };
  }
}
