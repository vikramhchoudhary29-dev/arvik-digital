import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params; const body = await req.json();
    const status = body.status;
    const commission = await prisma.commission.update({ where: { id }, data: { status, paidAt: status === "PAID" ? new Date() : undefined } });
    return NextResponse.json(commission);
  } catch (error) { console.error(error); return NextResponse.json({ error: "Failed to update commission." }, { status: 500 }); }
}
