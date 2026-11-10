import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
export async function PATCH(req:Request,{params}:{params:Promise<{id:string}>}){
 try {await requireAdmin();const {id}=await params;const b=await req.json();
  if(b.status!==undefined && !["NEW","FOLLOWED_UP","CANCELLED"].includes(b.status))return NextResponse.json({error:"Invalid status"},{status:400});
  if(b.adminNotes!==undefined && (typeof b.adminNotes!=="string" || b.adminNotes.length>3000))return NextResponse.json({error:"Invalid notes"},{status:400});
  const data:{status?:string;adminNotes?:string;followedUpAt?:Date|null;cancelledAt?:Date|null}={};
  if(b.status!==undefined){data.status=b.status;data.followedUpAt=b.status==="FOLLOWED_UP"?new Date():null;data.cancelledAt=b.status==="CANCELLED"?new Date():null;}
  if(b.adminNotes!==undefined)data.adminNotes=b.adminNotes;
  return NextResponse.json(await prisma.jewelleryEnquiry.update({where:{id},data}));
 }catch(e){const msg=e instanceof Error?e.message:"Update failed";return NextResponse.json({error:msg},{status:msg==="UNAUTHORIZED"?401:400});}
}
