import { prisma } from "@/lib/prisma";

export async function getProjects() {
  return prisma.project.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function getHomepageProjects() {
  const featured = await prisma.project.findMany({
    where: { featured: true },
    orderBy: { createdAt: "desc" },
    take: 3,
  });

  if (featured.length > 0) return featured;

  return prisma.project.findMany({
    orderBy: { createdAt: "desc" },
    take: 3,
  });
}

export async function getProject(slug: string) {
  return prisma.project.findUnique({
    where: { slug },
  });
}