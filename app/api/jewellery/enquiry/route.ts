import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { text } from "@/lib/validation";
export async function POST(req: Request) {
 try {
  const b=await req.json();
  if(b.website) return NextResponse.json({success:true});
  const customerName=text(b.customerName,"Name",120)!;
  const whatsappNumber=text(b.whatsappNumber,"WhatsApp number",20)!;
  if(!/^\+?[0-9\s-]{10,20}$/.test(whatsappNumber)) return NextResponse.json({error:"Enter a valid WhatsApp number"},{status:400});
  const shopName=text(b.shopName,"Shop name",160)!;
  const city=text(b.city,"City",120)!;
  const interestedService=text(b.interestedService,"Service",120)!;
  const requirements=text(b.requirements,"Requirements",2000,false) || "";
  const item=await prisma.jewelleryEnquiry.create({data:{customerName,whatsappNumber,shopName,city,interestedService,requirements}});
  return NextResponse.json({success:true,id:item.id},{status:201});
 } catch(e) { return NextResponse.json({error:e instanceof Error?e.message:"Unable to submit enquiry"},{status:400}); }
}
