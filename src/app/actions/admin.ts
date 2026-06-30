"use server";

import { prisma } from "@/lib/prisma";
import { Role, ApplicationStatus, ParticipantStatus } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { revalidatePath } from "next/cache";

// Placeholders for email integration
export async function sendApprovalEmail(email: string, name: string) {
  console.log(`[EMAIL PLACEHOLDER] sendApprovalEmail to ${email} for ${name}`);
}

export async function sendRejectedEmail(email: string, name: string) {
  console.log(`[EMAIL PLACEHOLDER] sendRejectedEmail to ${email} for ${name}`);
}

export async function sendWaitlistEmail(email: string, name: string) {
  console.log(`[EMAIL PLACEHOLDER] sendWaitlistEmail to ${email} for ${name}`);
}

export async function sendInvitationEmail(email: string, teamName: string) {
  console.log(`[EMAIL PLACEHOLDER] sendInvitationEmail to ${email} for team ${teamName}`);
}

export async function sendPasswordResetEmail(email: string) {
  console.log(`[EMAIL PLACEHOLDER] sendPasswordResetEmail to ${email}`);
}

export async function sendWelcomeEmail(email: string, name: string) {
  console.log(`[EMAIL PLACEHOLDER] sendWelcomeEmail to ${email} for ${name}`);
}

async function checkAdmin() {
  const session = await getServerSession(authOptions);
  if (!session?.user || (session.user.role !== "ADMIN" && session.user.role !== "SUPERADMIN")) {
    throw new Error("Unauthorized");
  }
  return session.user;
}

function generateSecurePassword(length = 24): string {
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+~`|}{[]:;?><,./-=";
  const allChars = uppercase + lowercase + numbers + symbols;

  let password = "";
  // Ensure at least one of each set
  password += uppercase[crypto.randomInt(uppercase.length)];
  password += lowercase[crypto.randomInt(lowercase.length)];
  password += numbers[crypto.randomInt(numbers.length)];
  password += symbols[crypto.randomInt(symbols.length)];

  for (let i = 4; i < length; i++) {
    password += allChars[crypto.randomInt(allChars.length)];
  }

  // Shuffle
  return password.split("").sort(() => crypto.randomInt(3) - 1).join("");
}

export async function getApplications(filters?: { status?: string; search?: string }) {
  try {
    await checkAdmin();
    
    let whereClause: any = {};
    
    if (filters?.status) {
      whereClause.status = filters.status as ApplicationStatus;
    }
    
    const applications = await prisma.application.findMany({
      where: whereClause,
      orderBy: {
        createdAt: "desc",
      },
    });

    // Filter in JS for search (since personalInfo is JSON and search is case insensitive)
    let result = applications;
    if (filters?.search) {
      const query = filters.search.toLowerCase();
      result = applications.filter((app: any) => {
        const info = app.personalInfo as any;
        return (
          info?.firstName?.toLowerCase().includes(query) ||
          info?.lastName?.toLowerCase().includes(query) ||
          info?.email?.toLowerCase().includes(query)
        );
      });
    }

    return { success: true, applications: result };
  } catch (error) {
    console.error("Error fetching applications:", error);
    return { success: false, error: "Failed to fetch applications" };
  }
}

export async function updateApplicationStatus(
  applicationId: string,
  status: "APPROVED" | "REJECTED" | "WAITLIST" | "UNDER_REVIEW",
  adminNotes?: string
) {
  try {
    const adminUser = await checkAdmin();

    const application = await prisma.application.findUnique({
      where: { id: applicationId },
    });

    if (!application) {
      return { success: false, error: "Application not found" };
    }

    const personalInfo = application.personalInfo as any;
    const email = personalInfo.email;
    const name = `${personalInfo.firstName} ${personalInfo.lastName}`;

    let userId: string | null = application.userId;

    if (status === "APPROVED" && !userId) {
      // Check if user already exists
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        return { success: false, error: "User already exists with this email" };
      }

      // Generate secure random password
      const plainPassword = generateSecurePassword(24);
      const hashedPassword = await bcrypt.hash(plainPassword, 10);

      const experience = application.experience as any;
      const skills = (application.skills as string[]) || [];

      // Create User
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          role: "PARTICIPANT",
          status: "APPROVED",
          github: experience.github,
          walletAddress: experience.wallet,
          skills,
          profileCompleted: false,
        },
      });

      // Create Profile
      await prisma.profile.create({
        data: {
          userId: user.id,
          avatar: personalInfo.photoUrl || null,
          bio: (application.professionalInfo as any).shortBio || null,
          country: personalInfo.country || null,
          city: personalInfo.city || null,
          github: experience.github || null,
          linkedin: experience.linkedin || null,
          website: experience.website || null,
          wallet: experience.wallet || null,
          skills,
          experience: experience.level || null,
          track: (application.track as any).selectedTrack || null,
        },
      });

      userId = user.id;

      // Log generated password for convenience in development/testing (since email is placeholder)
      console.log(`[ADMIN CREATED USER] Email: ${email} | Temporary Password: ${plainPassword}`);
      // sendApprovalEmail placeholder call
      await sendApprovalEmail(email, name);
    } else if (status === "REJECTED") {
      await sendRejectedEmail(email, name);
    } else if (status === "WAITLIST") {
      await sendWaitlistEmail(email, name);
    }

    const updatedApp = await prisma.application.update({
      where: { id: applicationId },
      data: {
        status: status as ApplicationStatus,
        adminNotes: adminNotes !== undefined ? adminNotes : application.adminNotes,
        reviewedBy: adminUser.id,
        reviewedAt: new Date(),
        userId,
      },
    });

    revalidatePath("/admin/applications");
    return { success: true, application: updatedApp };
  } catch (error) {
    console.error("Error updating application status:", error);
    return { success: false, error: "Failed to update status" };
  }
}

export async function getApplicants() {
  try {
    await checkAdmin();
    const applicants = await prisma.user.findMany({
      where: {
        role: "PARTICIPANT",
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return { success: true, applicants };
  } catch (error) {
    console.error("Error fetching applicants:", error);
    return { success: false, applicants: [] };
  }
}

export async function updateParticipantStatus(id: string, status: "APPROVED" | "REJECTED" | "PENDING") {
  try {
    await checkAdmin();
    await prisma.user.update({
      where: { id },
      data: { status: status as ParticipantStatus },
    });
    return { success: true };
  } catch (error) {
    console.error("Error updating participant status:", error);
    return { success: false };
  }
}

export async function getProjects() {
  try {
    await checkAdmin();
    const projects = await prisma.project.findMany({
      include: {
        team: {
          include: {
            members: {
              select: { name: true, email: true }
            }
          }
        }
      },
      orderBy: {
        createdAt: "desc"
      }
    });
    return { success: true, projects };
  } catch (error) {
    console.error("Error fetching projects:", error);
    return { success: false, projects: [] };
  }
}

export async function getStats() {
  try {
    await checkAdmin();
    const [totalUsers, approvedUsers, totalTeams, totalProjects] = await Promise.all([
      prisma.user.count({ where: { role: "PARTICIPANT" } }),
      prisma.user.count({ where: { status: "APPROVED" } }),
      prisma.team.count(),
      prisma.project.count(),
    ]);

    return {
      success: true,
      stats: {
        totalUsers,
        approvedUsers,
        totalTeams,
        totalProjects,
      }
    };
  } catch (error) {
    return { success: false };
  }
}
