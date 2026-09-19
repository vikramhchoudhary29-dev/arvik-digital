import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import {
  text,
  integer,
  boolean,
  url,
} from "@/lib/validation";

function parseTestimonialBody(body: any) {
  return {
    name: text(body.name, "Name", 120),
    company: text(body.company, "Company", 160, false),
    designation: text(body.designation, "Designation", 160, false),
    review: text(body.review, "Review", 3000),
    rating: integer(body.rating, "Rating", 1, 5),
    image: url(body.image, "Image URL", false),
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

    const testimonial = await prisma.testimonial.findUnique({
      where: { id },
    });

    if (!testimonial) {
      return NextResponse.json(
        { error: "Testimonial not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(testimonial);
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return NextResponse.json(
        { error: "Unauthorized." },
        { status: 401 }
      );
    }

    console.error(
      "GET /api/admin/testimonials/[id] error:",
      error
    );

    return NextResponse.json(
      { error: "Failed to fetch testimonial." },
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

    const existing = await prisma.testimonial.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Testimonial not found." },
        { status: 404 }
      );
    }

    const data = parseTestimonialBody(body);

    const testimonial = await prisma.testimonial.update({
      where: { id },
      data,
    });

    return NextResponse.json(testimonial);
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

    console.error(
      "PUT /api/admin/testimonials/[id] error:",
      error
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to update testimonial.",
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

    const existing = await prisma.testimonial.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Testimonial not found." },
        { status: 404 }
      );
    }

    await prisma.testimonial.delete({
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

    console.error(
      "DELETE /api/admin/testimonials/[id] error:",
      error
    );

    return NextResponse.json(
      { error: "Failed to delete testimonial." },
      { status: 500 }
    );
  }
}