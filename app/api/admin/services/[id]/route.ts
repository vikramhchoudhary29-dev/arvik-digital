import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    const service = await prisma.service.update({
      where: { id },
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
      { error: "Failed to update service" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.service.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete service" },
      { status: 500 }
    );
  }
}