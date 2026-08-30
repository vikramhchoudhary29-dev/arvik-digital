import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const projects = await prisma.project.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(projects);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const project = await prisma.project.create({
      data: {
        title: body.title,
        slug: body.slug,
        category: body.category,
        description: body.description,
        technologies: body.technologies,
        features: body.features,
        completedDate: body.completedDate,
        liveUrl: body.liveUrl,
        status: body.status,
        featured: body.featured,
      },
    });

    return NextResponse.json(project);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}