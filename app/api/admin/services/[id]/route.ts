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

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();

    const { id } = await params;

    const service = await prisma.service.findUnique({
      where: { id },
    });

    if (!service) {
      return NextResponse.json(
        { error: "Service not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(service);
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return NextResponse.json(
        { error: "Unauthorized." },
        { status: 401 }
      );
    }

    console.error("GET /api/admin/services/[id] error:", error);

    return NextResponse.json(
      { error: "Failed to fetch service." },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();

    const { id } = await params;
    const body = await request.json();

    const existing = await prisma.service.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Service not found." },
        { status: 404 }
      );
    }

    const data = parseServiceBody(body);

    const duplicate = await prisma.service.findFirst({
      where: {
        slug: data.slug,
        NOT: {
          id,
        },
      },
    });

    if (duplicate) {
      return NextResponse.json(
        { error: "A service with this slug already exists." },
        { status: 409 }
      );
    }

    const service = await prisma.service.update({
      where: { id },
      data,
    });

    return NextResponse.json(service);
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

    console.error("PUT /api/admin/services/[id] error:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to update service.",
      },
      { status: 400 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();

    const { id } = await params;

    const existing = await prisma.service.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Service not found." },
        { status: 404 }
      );
    }

    await prisma.service.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return NextResponse.json(
        { error: "Unauthorized." },
        { status: 401 }
      );
    }

    console.error("DELETE /api/admin/services/[id] error:", error);

    return NextResponse.json(
      { error: "Failed to delete service." },
      { status: 500 }
    );
  }
}