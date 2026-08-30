import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const code = String(body.referralCode || "").trim().toUpperCase();
    const partner = code ? await prisma.partner.findUnique({ where: { referralCode: code } }) : null;
    const enquiry = await prisma.enquiry.create({ data: { name: body.name, company: body.company, email: body.email, phone: body.phone, service: body.service, message: body.message, partnerId: partner?.status === "APPROVED" ? partner.id : null } });
    return NextResponse.json(enquiry);
  } catch (error) { console.error(error); return NextResponse.json({ error: "Failed to submit enquiry" }, { status: 500 }); }
}
