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

export async function GET() {
  try {
    await requireAdmin();

    const testimonials = await prisma.testimonial.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(testimonials);
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return NextResponse.json(
        { error: "Unauthorized." },
        { status: 401 }
      );
    }

    console.error("GET /api/admin/testimonials error:", error);

    return NextResponse.json(
      { error: "Failed to fetch testimonials." },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAdmin();

    const body = await request.json();
    const data = parseTestimonialBody(body);

    const testimonial = await prisma.testimonial.create({
      data,
    });

    return NextResponse.json(testimonial, {
      status: 201,
    });
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

    const message =
      error instanceof Error
        ? error.message
        : "Failed to create testimonial.";

    console.error("POST /api/admin/testimonials error:", error);

    return NextResponse.json(
      { error: message },
      {
        status:
          message.includes("required") ||
          message.includes("invalid") ||
          message.includes("too")
            ? 400
            : 500,
      }
    );
  }
}