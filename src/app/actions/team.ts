"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { sendInvitationEmail } from "./admin";

export async function getMyTeam() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return { success: false, error: "Unauthorized" };

  try {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: {
        team: {
          include: {
            members: {
              select: {
                id: true,
                name: true,
                email: true,
                github: true,
                walletAddress: true,
                skills: true,
              },
            },
          },
        },
      },
    });
    return { success: true, team: user?.team || null };
  } catch (error) {
    console.error("Get my team error:", error);
    return { success: false, error: "Database error" };
  }
}

export async function createTeam(name: string, description?: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return { success: false, error: "Unauthorized" };

  try {
    // Check if user already has a team
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (user?.teamId) {
      return { success: false, error: "teams.errors.already_in_team" };
    }

    const team = await prisma.team.create({
      data: {
        name,
        description,
        leaderId: session.user.id,
        members: {
          connect: { id: session.user.id },
        },
      },
    });

    revalidatePath("/dashboard");
    revalidatePath("/teams");
    return { success: true, team };
  } catch (error) {
    console.error("Create team error:", error);
    return { success: false, error: "teams.errors.create_failed" };
  }
}

export async function updateTeam(teamId: string, name: string, description?: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return { success: false, error: "Unauthorized" };

  try {
    const team = await prisma.team.findUnique({
      where: { id: teamId },
    });

    if (!team) {
      return { success: false, error: "teams.errors.not_found" };
    }

    if (team.leaderId !== session.user.id) {
      return { success: false, error: "teams.errors.not_leader" };
    }

    const updatedTeam = await prisma.team.update({
      where: { id: teamId },
      data: {
        name,
        description,
      },
    });

    revalidatePath("/dashboard");
    revalidatePath("/teams");
    return { success: true, team: updatedTeam };
  } catch (error) {
    console.error("Update team error:", error);
    return { success: false, error: "teams.errors.update_failed" };
  }
}

export async function joinTeamByCode(inviteCode: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return { success: false, error: "Unauthorized" };

  try {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (user?.teamId) {
      return { success: false, error: "teams.errors.already_in_team" };
    }

    const team = await prisma.team.findUnique({
      where: { inviteCode },
      include: {
        _count: {
          select: { members: true },
        },
      },
    });

    if (!team) {
      return { success: false, error: "teams.errors.invalid_code" };
    }

    if (team._count.members >= 4) {
      return { success: false, error: "teams.errors.team_full" };
    }

    await prisma.user.update({
      where: { id: session.user.id },
      data: { teamId: team.id },
    });

    // Delete any pending invitations for this user since they just joined a team
    await prisma.teamInvitation.deleteMany({
      where: { toUser: session.user.id },
    });

    revalidatePath("/dashboard");
    revalidatePath("/teams");
    return { success: true, team };
  } catch (error) {
    console.error("Join team by code error:", error);
    return { success: false, error: "teams.errors.join_failed" };
  }
}

export async function leaveTeam() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return { success: false, error: "Unauthorized" };

  try {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: {
        team: {
          include: {
            members: {
              select: { id: true },
            },
          },
        },
      },
    });

    if (!user?.teamId || !user.team) {
      return { success: false, error: "teams.errors.not_in_team" };
    }

    const team = user.team;
    const membersCount = team.members.length;

    if (membersCount === 1) {
      // User is the only member, dissolve the team
      await prisma.user.update({
        where: { id: session.user.id },
        data: { teamId: null },
      });
      await prisma.team.delete({
        where: { id: team.id },
      });
    } else {
      // Remove user from team
      await prisma.user.update({
        where: { id: session.user.id },
        data: { teamId: null },
      });

      // If user was the leader, assign leadership to another member
      if (team.leaderId === session.user.id) {
        const nextLeader = team.members.find((m) => m.id !== session.user.id);
        if (nextLeader) {
          await prisma.team.update({
            where: { id: team.id },
            data: { leaderId: nextLeader.id },
          });
        }
      }
    }

    revalidatePath("/dashboard");
    revalidatePath("/teams");
    return { success: true };
  } catch (error) {
    console.error("Leave team error:", error);
    return { success: false, error: "teams.errors.leave_failed" };
  }
}

export async function transferLeadership(newLeaderId: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return { success: false, error: "Unauthorized" };

  try {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (!user?.teamId) {
      return { success: false, error: "teams.errors.not_in_team" };
    }

    const team = await prisma.team.findUnique({
      where: { id: user.teamId },
      include: {
        members: { select: { id: true } },
      },
    });

    if (!team) {
      return { success: false, error: "teams.errors.not_found" };
    }

    if (team.leaderId !== session.user.id) {
      return { success: false, error: "teams.errors.not_leader" };
    }

    const isMember = team.members.some((m) => m.id === newLeaderId);
    if (!isMember) {
      return { success: false, error: "teams.errors.new_leader_not_member" };
    }

    await prisma.team.update({
      where: { id: team.id },
      data: { leaderId: newLeaderId },
    });

    revalidatePath("/dashboard");
    revalidatePath("/teams");
    return { success: true };
  } catch (error) {
    console.error("Transfer leadership error:", error);
    return { success: false, error: "teams.errors.transfer_failed" };
  }
}

export async function searchParticipants(filters?: {
  search?: string;
  skills?: string[];
  country?: string;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return { success: false, error: "Unauthorized" };

  try {
    // Find all users with no team who are approved participants and not the current user
    let whereClause: any = {
      role: "PARTICIPANT",
      status: "APPROVED",
      teamId: null,
      id: { not: session.user.id },
    };

    if (filters?.country) {
      whereClause.country = filters.country;
    }

    if (filters?.skills && filters.skills.length > 0) {
      whereClause.skills = {
        hasSome: filters.skills,
      };
    }

    if (filters?.search) {
      whereClause.OR = [
        { name: { contains: filters.search, mode: "insensitive" } },
        { email: { contains: filters.search, mode: "insensitive" } },
      ];
    }

    const users = await prisma.user.findMany({
      where: whereClause,
      select: {
        id: true,
        name: true,
        email: true,
        github: true,
        skills: true,
        bio: true,
        country: true,
      },
      take: 20,
    });

    return { success: true, users };
  } catch (error) {
    console.error("Search participants error:", error);
    return { success: false, error: "teams.errors.search_failed" };
  }
}

export async function sendTeamInvitation(toUserId: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return { success: false, error: "Unauthorized" };

  try {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: {
        team: {
          include: {
            _count: {
              select: { members: true },
            },
          },
        },
      },
    });

    if (!user?.teamId || !user.team) {
      return { success: false, error: "teams.errors.not_in_team" };
    }

    if (user.team.leaderId !== session.user.id) {
      return { success: false, error: "teams.errors.not_leader" };
    }

    if (user.team._count.members >= 4) {
      return { success: false, error: "teams.errors.team_full" };
    }

    const invitedUser = await prisma.user.findUnique({
      where: { id: toUserId },
    });

    if (!invitedUser) {
      return { success: false, error: "teams.errors.invited_user_not_found" };
    }

    if (invitedUser.teamId) {
      return { success: false, error: "teams.errors.user_already_in_team" };
    }

    // Check if invitation already exists
    const existingInvite = await prisma.teamInvitation.findFirst({
      where: {
        teamId: user.teamId,
        toUser: toUserId,
        status: "PENDING",
      },
    });

    if (existingInvite) {
      return { success: false, error: "teams.errors.invitation_already_sent" };
    }

    await prisma.teamInvitation.create({
      data: {
        teamId: user.teamId,
        fromUser: session.user.id,
        toUser: toUserId,
      },
    });

    // Send placeholder email
    await sendInvitationEmail(invitedUser.email || "", user.team.name);

    return { success: true };
  } catch (error) {
    console.error("Send invitation error:", error);
    return { success: false, error: "teams.errors.send_invitation_failed" };
  }
}

export async function getTeamInvitations() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return { success: false, error: "Unauthorized" };

  try {
    const invitations = await prisma.teamInvitation.findMany({
      where: {
        toUser: session.user.id,
        status: "PENDING",
      },
      include: {
        team: {
          select: {
            id: true,
            name: true,
            description: true,
            leaderId: true,
          },
        },
      },
    });

    return { success: true, invitations };
  } catch (error) {
    console.error("Get invitations error:", error);
    return { success: false, error: "Database error" };
  }
}

export async function respondToInvitation(invitationId: string, status: "ACCEPTED" | "REJECTED") {
  const session = await getServerSession(authOptions);
  if (!session?.user) return { success: false, error: "Unauthorized" };

  try {
    const invitation = await prisma.teamInvitation.findUnique({
      where: { id: invitationId },
      include: {
        team: {
          include: {
            _count: {
              select: { members: true },
            },
          },
        },
      },
    });

    if (!invitation || invitation.toUser !== session.user.id || invitation.status !== "PENDING") {
      return { success: false, error: "teams.errors.invitation_invalid" };
    }

    if (status === "ACCEPTED") {
      // Verify user has no team
      const user = await prisma.user.findUnique({
        where: { id: session.user.id },
      });

      if (user?.teamId) {
        return { success: false, error: "teams.errors.already_in_team" };
      }

      if (invitation.team._count.members >= 4) {
        return { success: false, error: "teams.errors.team_full" };
      }

      // Add member to team
      await prisma.user.update({
        where: { id: session.user.id },
        data: { teamId: invitation.teamId },
      });

      // Update invitation
      await prisma.teamInvitation.update({
        where: { id: invitationId },
        data: { status: "ACCEPTED" },
      });

      // Reject all other pending invitations for this user
      await prisma.teamInvitation.updateMany({
        where: {
          toUser: session.user.id,
          status: "PENDING",
        },
        data: { status: "REJECTED" },
      });
    } else {
      // Update invitation to rejected
      await prisma.teamInvitation.update({
        where: { id: invitationId },
        data: { status: "REJECTED" },
      });
    }

    revalidatePath("/dashboard");
    revalidatePath("/teams");
    return { success: true };
  } catch (error) {
    console.error("Respond to invitation error:", error);
    return { success: false, error: "teams.errors.response_failed" };
  }
}

export async function getTeams() {
  try {
    const teams = await prisma.team.findMany({
      include: {
        _count: {
          select: { members: true },
        },
        members: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    return { success: true, teams };
  } catch (error) {
    console.error("Get teams error:", error);
    return { success: false, teams: [] };
  }
}
