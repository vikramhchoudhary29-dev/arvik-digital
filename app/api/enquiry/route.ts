import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { email, text } from "@/lib/validation";

const services=["Website Development","Custom Web Application","AI Solution","Digital Marketing","Graphic Design","Website Management"] as const;
export async function POST(req:Request){try{const body=await req.json();const name=text(body.name,"Name",120);const emailValue=email(body.email);const company=text(body.company,"Business name",160,false);const phone=text(body.phone,"Phone",40,false);const service=text(body.service,"Service",120);const message=text(body.message,"Message",5000);if(!service || !services.some((allowed) => allowed === service))return NextResponse.json({error:"Please select a valid service."},{status:400});const enquiry=await prisma.enquiry.create({data:{name:name!,email:emailValue,company,phone,service,message:message!}});return NextResponse.json({success:true,id:enquiry.id});}catch(e){const msg=e instanceof Error?e.message:"Failed to submit enquiry";return NextResponse.json({error:msg},{status:400});}}
