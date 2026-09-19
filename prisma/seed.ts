import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import bcrypt from "bcryptjs";

async function main() {
  const databaseUrl = process.env.DATABASE_URL;
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!databaseUrl) {
    throw new Error("DATABASE_URL is required.");
  }

  if (!adminEmail) {
    throw new Error("ADMIN_EMAIL is required.");
  }

  if (!adminPassword) {
    throw new Error("ADMIN_PASSWORD is required.");
  }

  if (adminPassword.length < 12) {
    throw new Error(
      "ADMIN_PASSWORD must contain at least 12 characters."
    );
  }

  const pool = new Pool({
    connectionString: databaseUrl,
  });

  const prisma = new PrismaClient({
    adapter: new PrismaPg(pool),
  });

  try {
    const password = await bcrypt.hash(adminPassword, 12);

    await prisma.admin.upsert({
      where: {
        email: adminEmail,
      },
      update: {
        password,
      },
      create: {
        email: adminEmail,
        password,
      },
    });

    console.log(`Admin account ready: ${adminEmail}`);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});