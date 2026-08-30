import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function makeCode(name: string) {
  const base = name.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 8) || "PARTNER";
  return `${base}${Math.floor(1000 + Math.random() * 9000)}`;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.name || !body.email || !body.phone) {
      return NextResponse.json({ error: "Name, email and phone are required." }, { status: 400 });
    }
    const email = String(body.email).trim().toLowerCase();
    const exists = await prisma.partner.findUnique({ where: { email } });
    if (exists) return NextResponse.json({ error: "A partner application already exists with this email." }, { status: 409 });
    let referralCode = makeCode(body.name);
    while (await prisma.partner.findUnique({ where: { referralCode } })) referralCode = makeCode(body.name);
    const partner = await prisma.partner.create({ data: {
      name: String(body.name).trim(), email, phone: String(body.phone).trim(),
      socialProfile: body.socialProfile?.trim() || null, city: body.city?.trim() || null,
      upiId: body.upiId?.trim() || null, message: body.message?.trim() || null, referralCode,
    }});
    return NextResponse.json({ success: true, partner: { id: partner.id, status: partner.status } }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to submit partner application." }, { status: 500 });
  }
}
