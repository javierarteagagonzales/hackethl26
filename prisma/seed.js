const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash("password123", 10);

  // 1. Admin
  await prisma.user.upsert({
    where: { email: "admin@ethlima.org" },
    update: {},
    create: {
      email: "admin@ethlima.org",
      name: "Admin User",
      password: password,
      role: "ADMIN",
    },
  });

  // 2. Judge
  await prisma.user.upsert({
    where: { email: "judge@ethlima.org" },
    update: {},
    create: {
      email: "judge@ethlima.org",
      name: "Judge User",
      password: password,
      role: "JUDGE",
    },
  });

  // 3. Mentor
  await prisma.user.upsert({
    where: { email: "mentor@ethlima.org" },
    update: {},
    create: {
      email: "mentor@ethlima.org",
      name: "Mentor User",
      password: password,
      role: "MENTOR",
    },
  });

  // 4. Hacker (Participant)
  await prisma.user.upsert({
    where: { email: "hacker@ethlima.org" },
    update: {},
    create: {
      email: "hacker@ethlima.org",
      name: "Hacker User",
      password: password,
      role: "PARTICIPANT",
    },
  });

  // 5. Sponsors & Tracks
  const arbitrum = await prisma.sponsor.upsert({
    where: { name: "Arbitrum" },
    update: { logoUrl: "/assets/sponsors/arbitrum-logo.svg" },
    create: {
      name: "Arbitrum",
      logoUrl: "/assets/sponsors/arbitrum-logo.svg",
      website: "https://arbitrum.io",
    },
  });

  const arkiv = await prisma.sponsor.upsert({
    where: { name: "Arkiv" },
    update: { logoUrl: "/assets/sponsors/logo-arkiv.png" },
    create: {
      name: "Arkiv",
      logoUrl: "/assets/sponsors/logo-arkiv.png",
      website: "https://arkiv.network",
    },
  });

  // Create tracks
  await prisma.track.create({
    data: {
      title: "Arbitrum Ecosystem",
      description: "Build on the most adopted L2 for Ethereum. Focus on DeFi, Gaming or Social.",
      color: "from-blue-600 to-cyan-400",
      sponsorId: arbitrum.id,
      categories: {
        create: [{ name: "DeFi" }, { name: "Gaming" }, { name: "Social" }]
      },
      prizes: {
        create: [{ name: "1st Place", amount: "$3,000" }, { name: "2nd Place", amount: "$1,500" }]
      }
    }
  });

  await prisma.track.create({
    data: {
      title: "Arkiv Infrastructure",
      description: "Revolutionize data availability and decentralized storage with Arkiv.",
      color: "from-purple-600 to-pink-400",
      sponsorId: arkiv.id,
      categories: {
        create: [{ name: "Infrastructure" }, { name: "Storage" }]
      },
      prizes: {
        create: [{ name: "Best Use of Arkiv", amount: "$2,000" }]
      }
    }
  });

  console.log("Seed data created successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
