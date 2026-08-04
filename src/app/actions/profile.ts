"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function updateProfile(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return { success: false, error: "Unauthorized" };

  const name = formData.get("name") as string;
  const bio = formData.get("bio") as string;
  const github = formData.get("github") as string;
  const linkedin = formData.get("linkedin") as string;
  const walletAddress = formData.get("walletAddress") as string;
  const skills = formData.getAll("skills") as string[];

  try {
    const user = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name,
        bio,
        github,
        linkedin,
        walletAddress,
        skills,
      },
    });

    revalidatePath("/dashboard");
    return { success: true, user };
  } catch (error) {
    console.error("Update profile error:", error);
    return { success: false, error: "Could not update profile." };
  }
}

export async function getProfile() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return { success: false, error: "Unauthorized" };

  try {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });
    return { success: true, user };
  } catch {
    return { success: false, error: "Database error." };
  }
}
