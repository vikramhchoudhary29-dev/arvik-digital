import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const testimonials = await prisma.testimonial.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(testimonials);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const testimonial = await prisma.testimonial.create({
      data: {
        name: body.name,
        company: body.company,
        designation: body.designation,
        review: body.review,
        rating: body.rating,
        image: body.image,
        featured: body.featured,
      },
    });

    return NextResponse.json(testimonial);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create testimonial" }, { status: 500 });
  }
}