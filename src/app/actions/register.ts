"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";

export async function registerHacker(formData: FormData) {
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const github = formData.get("github") as string;
  const walletAddress = formData.get("walletAddress") as string;
  const skills = formData.getAll("skills") as string[];
  const bio = formData.get("bio") as string;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name: `${firstName} ${lastName}`,
        email,
        password: hashedPassword,
        github,
        walletAddress,
        skills,
        bio,
      },
    });

    revalidatePath("/admin");
    return { success: true, user };
  } catch (error) {
    console.error("Registration error:", error);
    return { success: false, error: "Email already exists or database error." };
  }
}
