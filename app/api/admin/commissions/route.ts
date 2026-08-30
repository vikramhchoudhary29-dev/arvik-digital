import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
export async function GET() {
  const commissions = await prisma.commission.findMany({ include: { partner: true, enquiry: true }, orderBy: { createdAt: "desc" } });
  return NextResponse.json(commissions);
}
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const enquiry = await prisma.enquiry.findUnique({ where: { id: body.enquiryId }, include: { partner: true } });
    if (!enquiry?.partner) return NextResponse.json({ error: "This enquiry is not linked to a partner." }, { status: 400 });
    const projectAmount = Number(body.projectAmount);
    if (!Number.isFinite(projectAmount) || projectAmount <= 0) return NextResponse.json({ error: "Enter a valid project amount." }, { status: 400 });
    const commissionRate = Number(body.commissionRate ?? enquiry.partner.commissionRate);
    const amount = Number(((projectAmount * commissionRate) / 100).toFixed(2));
    const commission = await prisma.commission.upsert({ where: { enquiryId: enquiry.id }, update: { projectAmount, commissionRate, amount }, create: { partnerId: enquiry.partner.id, enquiryId: enquiry.id, projectAmount, commissionRate, amount } });
    return NextResponse.json(commission);
  } catch (error) { console.error(error); return NextResponse.json({ error: "Failed to create commission." }, { status: 500 }); }
}
