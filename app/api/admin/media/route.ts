import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
export async function GET(){try{await requireAdmin();return NextResponse.json(await prisma.media.findMany({orderBy:{createdAt:"desc"}}));}catch{return NextResponse.json({error:"Unauthorized"},{status:401});}}
