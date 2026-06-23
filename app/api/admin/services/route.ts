import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const services = await prisma.service.findMany({
    orderBy: { order: "asc" },
  });

  return NextResponse.json(services);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const service = await prisma.service.create({
      data: {
        title: body.title,
        slug: body.slug,
        icon: body.icon,
        shortDesc: body.shortDesc,
        description: body.description,
        benefits: body.benefits,
        order: body.order,
        featured: body.featured,
      },
    });

    return NextResponse.json(service);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create service" },
      { status: 500 }
    );
  }
}