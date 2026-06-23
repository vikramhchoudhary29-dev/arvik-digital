import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const enquiry = await prisma.enquiry.create({
      data: {
        name: body.name,
        company: body.company,
        email: body.email,
        phone: body.phone,
        service: body.service,
        message: body.message,
      },
    });

    return NextResponse.json(enquiry);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to submit enquiry" },
      { status: 500 }
    );
  }
}