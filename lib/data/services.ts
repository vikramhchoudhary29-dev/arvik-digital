import { prisma } from "@/lib/prisma";

export async function getServices() {
  return prisma.service.findMany({
    orderBy: { order: "asc" },
  });
}

export async function getHomepageServices() {
  const featured = await prisma.service.findMany({
    where: { featured: true },
    orderBy: { order: "asc" },
    take: 6,
  });

  if (featured.length > 0) return featured;

  return prisma.service.findMany({
    orderBy: { order: "asc" },
    take: 6,
  });
}

export async function getService(slug: string) {
  return prisma.service.findUnique({
    where: { slug },
  });
}