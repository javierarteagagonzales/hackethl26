"use server";

import { prisma } from "@/lib/prisma";
import { Role } from "@prisma/client";

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

export async function getProjects() {
  try {
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
