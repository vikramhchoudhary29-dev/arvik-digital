import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
export async function GET() {
  const partners = await prisma.partner.findMany({ include: { enquiries: true, commissions: true }, orderBy: { createdAt: "desc" } });
  return NextResponse.json(partners);
}
