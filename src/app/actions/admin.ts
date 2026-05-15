"use server";

import { prisma } from "@/lib/prisma";

export async function getApplicants() {
  try {
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
    await prisma.user.update({
      where: { id },
      data: { status },
    });
    return { success: true };
  } catch (error) {
    console.error("Error updating status:", error);
    return { success: false };
  }
}
