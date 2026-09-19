import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import {
  text,
  stringList,
  boolean,
  integer,
} from "@/lib/validation";

function parseServiceBody(body: any) {
  return {
    title: text(body.title, "Title", 160),
    slug: text(body.slug, "Slug", 160).toLowerCase(),
    icon: text(body.icon, "Icon", 100),
    shortDesc: text(body.shortDesc, "Short description", 500),
    description: text(body.description, "Description", 10000),
    benefits: stringList(body.benefits, "Benefits"),
    order: integer(body.order, "Order", 0, 100000),
    featured: boolean(body.featured, "Featured"),
  };
}

export async function GET() {
  try {
    await requireAdmin();

    const services = await prisma.service.findMany({
      orderBy: [
        {
          order: "asc",
        },
        {
          createdAt: "desc",
        },
      ],
    });

    return NextResponse.json(services);
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return NextResponse.json(
        { error: "Unauthorized." },
        { status: 401 }
      );
    }

    console.error("GET /api/admin/services error:", error);

    return NextResponse.json(
      { error: "Failed to fetch services." },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAdmin();

    const body = await request.json();
    const data = parseServiceBody(body);

    const existing = await prisma.service.findUnique({
      where: {
        slug: data.slug,
      },
    });

    if (existing) {
      return NextResponse.json(
        { error: "A service with this slug already exists." },
        { status: 409 }
      );
    }

    const service = await prisma.service.create({
      data,
    });

    return NextResponse.json(service, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return NextResponse.json(
        { error: "Unauthorized." },
        { status: 401 }
      );
    }

    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: "Invalid JSON body." },
        { status: 400 }
      );
    }

    console.error("POST /api/admin/services error:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to create service.",
      },
      { status: 400 }
    );
  }
}