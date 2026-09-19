import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { boolean, stringList, text, url } from "@/lib/validation";

function optionalImage(value: unknown, field: string) {
  if (value === null || value === undefined || value === "") return null;
  return url(value, field, false) ?? null;
}

function imageList(value: unknown) {
  if (value === undefined || value === null) return [];
  if (!Array.isArray(value)) throw new Error("Gallery must be an array of image URLs.");

  return value.map((item, index) => {
    const image = url(item, `Gallery image ${index + 1}`, false);
    if (!image) throw new Error(`Gallery image ${index + 1} is invalid.`);
    return image;
  });
}

function parse(body: Record<string, unknown>) {
  return {
    title: text(body.title, "Title", 120),
    slug: text(body.slug, "Slug", 120).toLowerCase(),
    category: text(body.category, "Category", 120),
    description: text(body.description, "Description", 10000),
    technologies: stringList(body.technologies, "Technologies"),
    features: stringList(body.features, "Features"),
    completedDate: text(body.completedDate, "Completed date", 40),
    liveUrl: url(body.liveUrl, "Live URL", false) ?? "",
    thumbnail: optionalImage(body.thumbnail, "Thumbnail URL"),
    gallery: imageList(body.gallery),
    status: text(body.status, "Status", 60),
    featured: boolean(body.featured, "Featured"),
  };
}

export async function GET() {
  try {
    await requireAdmin();
    return NextResponse.json(
      await prisma.project.findMany({ orderBy: { createdAt: "desc" } })
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unauthorized";
    return NextResponse.json(
      { error: message },
      { status: message === "UNAUTHORIZED" ? 401 : 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await requireAdmin();
    const body = (await req.json()) as Record<string, unknown>;
    const project = await prisma.project.create({ data: parse(body) });
    revalidatePath("/");
    revalidatePath("/portfolio");
    revalidatePath(`/portfolio/${project.slug}`);
    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to create project";
    return NextResponse.json(
      { error: message },
      { status: message === "UNAUTHORIZED" ? 401 : 400 }
    );
  }
}
