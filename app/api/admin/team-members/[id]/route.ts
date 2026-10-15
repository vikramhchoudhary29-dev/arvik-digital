import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
function parse(body: any) {
  const name=String(body.name??"").trim(), department=String(body.department??"").trim(), role=String(body.role??"").trim(), photo=String(body.photo??"").trim(), bio=String(body.bio??"").trim(), order=Number(body.order??0);
  if(!name||!department||!role) throw new Error("Name, department and job role are required.");
  if(name.length>160||department.length>120||role.length>160||bio.length>1000) throw new Error("One or more fields are too long.");
  if(!Number.isInteger(order)||order<0) throw new Error("Display order must be a non-negative whole number.");
  return {name,department,role,photo:photo||null,bio:bio||null,order,visible:body.visible!==false};
}
export async function PATCH(req:NextRequest,{params}:{params:Promise<{id:string}>}) { try { await requireAdmin(); const {id}=await params; const member=await prisma.teamMember.update({where:{id},data:parse(await req.json())}); return NextResponse.json(member); } catch(e) { const msg=e instanceof Error?e.message:"Request failed"; return NextResponse.json({error:msg==="UNAUTHORIZED"?"Unauthorized.":msg},{status:msg==="UNAUTHORIZED"?401:400}); } }
export async function DELETE(_req:NextRequest,{params}:{params:Promise<{id:string}>}) { try { await requireAdmin(); const {id}=await params; await prisma.teamMember.delete({where:{id}}); return NextResponse.json({success:true}); } catch(e) { const msg=e instanceof Error?e.message:"Request failed"; return NextResponse.json({error:msg==="UNAUTHORIZED"?"Unauthorized.":msg},{status:msg==="UNAUTHORIZED"?401:400}); } }
