"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function updateProfile(data: {
  avatar?: string;
  bio?: string;
  country?: string;
  city?: string;
  github?: string;
  linkedin?: string;
  website?: string;
  wallet?: string;
  skills?: string[];
  experience?: string;
  track?: string;
  visibility?: string;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return { success: false, error: "Unauthorized" };

  try {
    // 1. Update the Profile model
    const profile = await prisma.profile.upsert({
      where: { userId: session.user.id },
      update: {
        avatar: data.avatar,
        bio: data.bio,
        country: data.country,
        city: data.city,
        github: data.github,
        linkedin: data.linkedin,
        website: data.website,
        wallet: data.wallet,
        skills: data.skills,
        experience: data.experience,
        track: data.track,
        visibility: data.visibility || "public",
      },
      create: {
        userId: session.user.id,
        avatar: data.avatar,
        bio: data.bio,
        country: data.country,
        city: data.city,
        github: data.github,
        linkedin: data.linkedin,
        website: data.website,
        wallet: data.wallet,
        skills: data.skills || [],
        experience: data.experience,
        track: data.track,
        visibility: data.visibility || "public",
      },
    });

    // 2. Synchronize inline cache fields on User to avoid breaking existing pages
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        bio: data.bio,
        country: data.country,
        github: data.github,
        linkedin: data.linkedin,
        walletAddress: data.wallet,
        skills: data.skills || [],
      },
    });

    revalidatePath("/dashboard");
    revalidatePath("/profile");
    return { success: true, profile };
  } catch (error) {
    console.error("Update profile error:", error);
    return { success: false, error: "Could not update profile." };
  }
}

export async function getProfile() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return { success: false, error: "Unauthorized" };

  try {
    const profile = await prisma.profile.findUnique({
      where: { userId: session.user.id },
      include: {
        user: {
          select: {
            name: true,
            email: true,
            role: true,
            status: true,
          },
        },
      },
    });

    return { success: true, profile };
  } catch (error) {
    console.error("Get profile error:", error);
    return { success: false, error: "Database error." };
  }
}
