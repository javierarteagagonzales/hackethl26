"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function createTeam(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return { success: false, error: "Unauthorized" };

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;

  try {
    const team = await prisma.team.create({
      data: {
        name,
        description,
        members: {
          connect: { id: session.user.id },
        },
      },
    });

    revalidatePath("/dashboard");
    return { success: true, team };
  } catch (error) {
    console.error("Create team error:", error);
    return { success: false, error: "Team name already exists or database error." };
  }
}

export async function joinTeam(teamId: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return { success: false, error: "Unauthorized" };

  try {
    await prisma.user.update({
      where: { id: session.user.id },
      data: { teamId },
    });

    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Join team error:", error);
    return { success: false, error: "Could not join team." };
  }
}

export async function leaveTeam() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return { success: false, error: "Unauthorized" };

  try {
    await prisma.user.update({
      where: { id: session.user.id },
      data: { teamId: null },
    });

    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Leave team error:", error);
    return { success: false, error: "Could not leave team." };
  }
}

export async function getTeams() {
  try {
    const teams = await prisma.team.findMany({
      include: {
        _count: {
          select: { members: true },
        },
      },
    });
    return { success: true, teams };
  } catch {
    return { success: false, teams: [] };
  }
}

export async function getMyTeam() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return { success: false };

  try {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: {
        team: {
          include: {
            members: {
              select: { id: true, name: true, email: true, github: true },
            },
          },
        },
      },
    });
    return { success: true, team: user?.team };
  } catch {
    return { success: false };
  }
}

export async function joinTeamByCode(inviteCode: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return { success: false, error: "Unauthorized" };

  try {
    const team = await prisma.team.findUnique({
      where: { inviteCode },
    });

    if (!team) {
      return { success: false, error: "Invalid invitation code." };
    }

    await prisma.user.update({
      where: { id: session.user.id },
      data: { teamId: team.id },
    });

    revalidatePath("/dashboard");
    return { success: true, team };
  } catch (error) {
    console.error("Join team by code error:", error);
    return { success: false, error: "Could not join team." };
  }
}
