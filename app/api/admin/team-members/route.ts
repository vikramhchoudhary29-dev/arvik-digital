import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

function parse(body: any) {
  const name = String(body.name ?? "").trim();
  const department = String(body.department ?? "").trim();
  const role = String(body.role ?? "").trim();
  const photo = String(body.photo ?? "").trim();
  const bio = String(body.bio ?? "").trim();
  const order = Number(body.order ?? 0);
  if (!name || !department || !role) throw new Error("Name, department and job role are required.");
  if (name.length > 160 || department.length > 120 || role.length > 160 || bio.length > 1000) throw new Error("One or more fields are too long.");
  if (!Number.isInteger(order) || order < 0) throw new Error("Display order must be a non-negative whole number.");
  return { name, department, role, photo: photo || null, bio: bio || null, order, visible: body.visible !== false };
}
export async function GET() {
  try { await requireAdmin(); const members = await prisma.teamMember.findMany({ orderBy: [{ order: "asc" }, { createdAt: "asc" }] }); return NextResponse.json(members); }
  catch (e) { const msg = e instanceof Error ? e.message : "Request failed"; return NextResponse.json({ error: msg === "UNAUTHORIZED" ? "Unauthorized." : msg }, { status: msg === "UNAUTHORIZED" ? 401 : 500 }); }
}
export async function POST(req: NextRequest) {
  try { await requireAdmin(); const member = await prisma.teamMember.create({ data: parse(await req.json()) }); return NextResponse.json(member, { status: 201 }); }
  catch (e) { const msg = e instanceof Error ? e.message : "Request failed"; return NextResponse.json({ error: msg === "UNAUTHORIZED" ? "Unauthorized." : msg }, { status: msg === "UNAUTHORIZED" ? 401 : 400 }); }
}
