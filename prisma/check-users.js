/* eslint-disable @typescript-eslint/no-require-imports */
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  try {
    const userCount = await prisma.user.count();
    console.log(`Total users in DB: ${userCount}`);

    if (userCount > 0) {
      const users = await prisma.user.findMany({
        select: { email: true, role: true },
      });
      console.log("Users found:");
      console.table(users);
    } else {
      console.log("No users found. Please run: node prisma/seed.js");
    }
  } catch (error) {
    console.error("Error connecting to database:", error.message);
  } finally {
    await prisma.$disconnect();
  }
}

main();
