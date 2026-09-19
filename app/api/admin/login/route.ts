import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { adminCookieOptions, createAdminToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const password = typeof body.password === "string" ? body.password : "";
    if (!email || !password || password.length > 200) return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });

    const admin = await prisma.admin.findUnique({ where: { email } });
    const valid = admin ? await bcrypt.compare(password, admin.password) : false;
    if (!admin || !valid) return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });

    const token = await createAdminToken(admin.id, admin.email);
    const response = NextResponse.json({ success: true });
    response.cookies.set("admin_token", token, adminCookieOptions);
    return response;
  } catch (error) {
    console.error("Admin login failed:", error);
    return NextResponse.json({ error: "Unable to log in." }, { status: 500 });
  }
}
