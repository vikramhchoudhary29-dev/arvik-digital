import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import bcrypt from "bcryptjs";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  const password = await bcrypt.hash("Arvik@2931", 10);

  await prisma.admin.upsert({
    where: { email: "patelvikram717@gmail.com" },
    update: { password },
    create: {
      email: "patelvikram717@gmail.com",
      password,
    },
  });

  console.log("Admin created successfully");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });