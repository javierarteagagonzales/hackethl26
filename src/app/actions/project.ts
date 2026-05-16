"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function submitProject(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return { success: false, error: "Unauthorized" };

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const githubUrl = formData.get("githubUrl") as string;
  const demoUrl = formData.get("demoUrl") as string;
  const videoUrl = formData.get("videoUrl") as string;
  const trackId = formData.get("trackId") as string;

  try {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { teamId: true }
    });

    if (!user?.teamId) {
      return { success: false, error: "You must be in a team to submit a project." };
    }

    const project = await prisma.project.upsert({
      where: { teamId: user.teamId },
      update: {
        name,
        description,
        githubUrl,
        demoUrl,
        videoUrl,
        trackId: trackId || null,
        status: "SUBMITTED",
      },
      create: {
        name,
        description,
        githubUrl,
        demoUrl,
        videoUrl,
        teamId: user.teamId,
        trackId: trackId || null,
        status: "SUBMITTED",
      },
    });

    revalidatePath("/dashboard");
    return { success: true, project };
  } catch (error) {
    console.error("Project submission error:", error);
    return { success: false, error: "Database error during submission." };
  }
}

export async function getProjectByTeam(teamId: string) {
  try {
    const project = await prisma.project.findUnique({
      where: { teamId }
    });
    return { success: true, project };
  } catch (error) {
    return { success: false };
  }
}
