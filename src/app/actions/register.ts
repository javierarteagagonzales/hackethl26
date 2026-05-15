"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function registerHacker(formData: FormData) {
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const email = formData.get("email") as string;
  const github = formData.get("github") as string;
  const walletAddress = formData.get("walletAddress") as string;
  const skills = formData.getAll("skills") as string[];
  const trackPreference = formData.get("track") as string;

  try {
    const user = await prisma.user.create({
      data: {
        name: `${firstName} ${lastName}`,
        email,
        github,
        walletAddress,
        skills,
        // We can map trackPreference to a specific track in the future
      },
    });

    revalidatePath("/admin");
    return { success: true, user };
  } catch (error) {
    console.error("Registration error:", error);
    return { success: false, error: "Email already exists or database error." };
  }
}
