"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getTracks() {
  try {
    const tracks = await prisma.track.findMany({
      include: {
        sponsor: true,
        categories: true,
        prizes: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return { success: true, tracks };
  } catch (error) {
    console.error("Error fetching tracks:", error);
    return { success: false, tracks: [] };
  }
}

export async function createTrack(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const color = formData.get("color") as string;
  const sponsorId = formData.get("sponsorId") as string;

  try {
    const track = await prisma.track.create({
      data: {
        title,
        description,
        color,
        sponsorId: sponsorId || null,
      },
    });

    revalidatePath("/");
    revalidatePath("/admin");
    return { success: true, track };
  } catch (error) {
    console.error("Error creating track:", error);
    return { success: false, error: "Database error." };
  }
}

export async function getSponsors() {
  try {
    const sponsors = await prisma.sponsor.findMany({
      orderBy: {
        name: "asc",
      },
    });
    return { success: true, sponsors };
  } catch (error) {
    console.error("Error fetching sponsors:", error);
    return { success: false, sponsors: [] };
  }
}

export async function createSponsor(formData: FormData) {
  const name = formData.get("name") as string;
  const logoUrl = formData.get("logoUrl") as string;
  const website = formData.get("website") as string;

  try {
    const sponsor = await prisma.sponsor.create({
      data: {
        name,
        logoUrl,
        website,
      },
    });

    revalidatePath("/");
    revalidatePath("/admin");
    return { success: true, sponsor };
  } catch (error) {
    console.error("Error creating sponsor:", error);
    return { success: false, error: "Sponsor already exists or database error." };
  }
}
