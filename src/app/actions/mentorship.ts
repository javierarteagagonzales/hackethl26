"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function requestMentorship(data: { scheduledAt: Date; topic?: string }) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return { success: false, error: "Unauthorized" };

  try {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { teamId: true },
    });

    if (!user?.teamId) {
      return { success: false, error: "You must be in a team to request mentorship." };
    }

    // Find an available mentor (randomly for now or by load)
    const mentors = await prisma.user.findMany({
      where: { role: "MENTOR" },
      select: { id: true },
    });

    if (mentors.length === 0) {
      return { success: false, error: "No mentors available at the moment." };
    }

    const randomMentor = mentors[Math.floor(Math.random() * mentors.length)];

    const mentorship = await prisma.mentorship.create({
      data: {
        scheduledAt: data.scheduledAt,
        topic: data.topic,
        teamId: user.teamId,
        mentorId: randomMentor.id,
        status: "PENDING",
      },
    });

    revalidatePath("/dashboard");
    return { success: true, mentorship };
  } catch (error) {
    console.error("Mentorship request error:", error);
    return { success: false, error: "Database error." };
  }
}

export async function getTeamMentorships() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return { success: false };

  try {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { teamId: true },
    });

    if (!user?.teamId) return { success: true, mentorships: [] };

    const mentorships = await prisma.mentorship.findMany({
      where: { teamId: user.teamId },
      include: {
        mentor: {
          select: { name: true, github: true },
        },
      },
      orderBy: { scheduledAt: "asc" },
    });
    return { success: true, mentorships };
  } catch {
    return { success: false, mentorships: [] };
  }
}

export async function getMentorships() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return { success: false, error: "Unauthorized", mentorships: [] };

  try {
    const mentorships = await prisma.mentorship.findMany({
      where: { mentorId: session.user.id },
      include: {
        team: {
          include: {
            members: { select: { id: true, name: true } },
            project: { select: { id: true } },
          },
        },
      },
      orderBy: { scheduledAt: "asc" },
    });
    return { success: true, mentorships };
  } catch {
    return { success: false, error: "Database error", mentorships: [] };
  }
}

export async function updateMentorshipStatus(id: string, status: string) {
  try {
    await prisma.mentorship.update({
      where: { id },
      data: { status },
    });
    revalidatePath("/mentor");
    revalidatePath("/dashboard");
    return { success: true, error: null };
  } catch {
    return { success: false, error: "Failed to update status" };
  }
}
