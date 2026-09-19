import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { text } from "@/lib/validation";
const STATUSES=["New","Contacted","In Progress","Closed","Archived"] as const;
export async function PATCH(req:Request,{params}:{params:Promise<{id:string}>}){try{await requireAdmin();const {id}=await params;const body=await req.json();const status=text(body.status,"Status",30);if(!status || !STATUSES.some((allowed) => allowed === status))return NextResponse.json({error:"Invalid status."},{status:400});return NextResponse.json(await prisma.enquiry.update({where:{id},data:{status}}));}catch(e){const msg=e instanceof Error?e.message:"Failed to update enquiry";return NextResponse.json({error:msg},{status:msg==="UNAUTHORIZED"?401:400});}}
export async function DELETE(_req:Request,{params}:{params:Promise<{id:string}>}){try{await requireAdmin();const {id}=await params;await prisma.enquiry.delete({where:{id}});return NextResponse.json({success:true});}catch(e){const msg=e instanceof Error?e.message:"Failed to delete enquiry";return NextResponse.json({error:msg},{status:msg==="UNAUTHORIZED"?401:400});}}
