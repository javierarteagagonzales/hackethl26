"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function getProjectsForJudging() {
  const session = await getServerSession(authOptions);
  if (!session?.user || (session.user as any).role !== "JUDGE" && (session.user as any).role !== "ADMIN") {
    return { success: false, error: "Unauthorized" };
  }

  try {
    const projects = await prisma.project.findMany({
      include: {
        team: {
          include: {
            members: {
              select: { name: true }
            }
          }
        },
        track: true,
        evaluations: {
          where: { judgeId: session.user.id }
        }
      },
      orderBy: {
        createdAt: "desc"
      }
    });
    return { success: true, projects };
  } catch (error) {
    console.error("Error fetching projects for judging:", error);
    return { success: false, error: "Database error." };
  }
}

export async function submitEvaluation(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session?.user || (session.user as any).role !== "JUDGE" && (session.user as any).role !== "ADMIN") {
    return { success: false, error: "Unauthorized" };
  }

  const projectId = formData.get("projectId") as string;
  const innovation = parseInt(formData.get("innovation") as string);
  const uxUi = parseInt(formData.get("uxUi") as string);
  const feasibility = parseInt(formData.get("feasibility") as string);
  const useOfArbitrum = parseInt(formData.get("useOfArbitrum") as string);
  const impact = parseInt(formData.get("impact") as string);
  const comments = formData.get("comments") as string;

  try {
    const evaluation = await prisma.evaluation.upsert({
      where: {
        id: formData.get("evaluationId") as string || "new-eval", // This might need a composite unique key in schema to be cleaner, but using upsert with id for now
      },
      // Actually, looking at schema, Evaluation doesn't have a composite unique key for [judgeId, projectId]. 
      // I should probably add one or handle it manually.
      // Let's check schema again.
      update: {
        innovation,
        uxUi,
        feasibility,
        useOfArbitrum,
        impact,
        comments,
      },
      create: {
        innovation,
        uxUi,
        feasibility,
        useOfArbitrum,
        impact,
        comments,
        judgeId: session.user.id,
        projectId,
      },
    });

    revalidatePath("/judge");
    return { success: true, evaluation };
  } catch (error) {
    console.error("Error submitting evaluation:", error);
    return { success: false, error: "Database error." };
  }
}

// Improved submit that checks if judge already evaluated this project
export async function submitOrUpdateEvaluation(data: {
  projectId: string;
  innovation: number;
  uxUi: number;
  feasibility: number;
  useOfArbitrum: number;
  impact: number;
  comments: string;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return { success: false, error: "Unauthorized" };

  try {
    const existingEval = await prisma.evaluation.findFirst({
      where: {
        judgeId: session.user.id,
        projectId: data.projectId
      }
    });

    if (existingEval) {
      await prisma.evaluation.update({
        where: { id: existingEval.id },
        data: {
          innovation: data.innovation,
          uxUi: data.uxUi,
          feasibility: data.feasibility,
          useOfArbitrum: data.useOfArbitrum,
          impact: data.impact,
          comments: data.comments,
        }
      });
    } else {
      await prisma.evaluation.create({
        data: {
          ...data,
          judgeId: session.user.id,
        }
      });
    }

    revalidatePath("/judge");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Error saving evaluation." };
  }
}
