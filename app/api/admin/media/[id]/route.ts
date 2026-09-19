import { NextResponse } from "next/server";
import cloudinary from "cloudinary";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
cloudinary.v2.config({cloud_name:process.env.CLOUDINARY_CLOUD_NAME,api_key:process.env.CLOUDINARY_API_KEY,api_secret:process.env.CLOUDINARY_API_SECRET});
export async function DELETE(_req:Request,{params}:{params:Promise<{id:string}>}){try{await requireAdmin();const {id}=await params;const media=await prisma.media.findUnique({where:{id}});if(!media)return NextResponse.json({error:"Media not found"},{status:404});await cloudinary.v2.uploader.destroy(media.publicId,{resource_type:media.type==="application/pdf"?"raw":"image"});await prisma.media.delete({where:{id}});return NextResponse.json({success:true});}catch(e){const msg=e instanceof Error?e.message:"Delete failed";return NextResponse.json({error:msg},{status:msg==="UNAUTHORIZED"?401:400});}}
