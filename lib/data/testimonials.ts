import { prisma } from "@/lib/prisma";

export async function getHomepageTestimonials() {
  const featured = await prisma.testimonial.findMany({
    where: { featured: true },
    orderBy: { createdAt: "desc" },
    take: 3,
  });

  if (featured.length > 0) return featured;

  return prisma.testimonial.findMany({
    orderBy: { createdAt: "desc" },
    take: 3,
  });
}