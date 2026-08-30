import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params; const body = await req.json();
    const data: Record<string, unknown> = {};
    if (body.status) data.status = body.status;
    if (body.commissionRate !== undefined) data.commissionRate = Number(body.commissionRate);
    if (body.referralCode) data.referralCode = String(body.referralCode).toUpperCase().replace(/[^A-Z0-9]/g, "");
    const partner = await prisma.partner.update({ where: { id }, data });
    return NextResponse.json(partner);
  } catch (error) { console.error(error); return NextResponse.json({ error: "Failed to update partner." }, { status: 500 }); }
}
