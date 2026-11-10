import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
export async function GET(){try{await requireAdmin();const [slides,videos,designs]=await Promise.all([prisma.jewelleryHeroSlide.findMany({orderBy:[{sortOrder:"asc"},{createdAt:"asc"}]}),prisma.jewelleryVideo.findMany({orderBy:[{sortOrder:"asc"},{createdAt:"asc"}]}),prisma.jewelleryDesign.findMany({orderBy:[{sortOrder:"asc"},{createdAt:"asc"}]})]);return NextResponse.json({slides,videos,designs});}catch{return NextResponse.json({error:"Unauthorized"},{status:401});}}
export async function POST(req:Request){try{await requireAdmin();const b=await req.json();if(b.kind!=="slide"&&b.kind!=="video"&&b.kind!=="design")return NextResponse.json({error:"Invalid type"},{status:400});
 const url=String(b.url||"");if(!/^https:\/\/res\.cloudinary\.com\//.test(url)||url.length>2048)return NextResponse.json({error:"Upload a file first"},{status:400});
 const title=String(b.title||"").slice(0,160);
 const item=b.kind==="slide"?await prisma.jewelleryHeroSlide.create({data:{imageUrl:url,title,subtitle:String(b.subtitle||"").slice(0,500)}}):b.kind==="design"?await prisma.jewelleryDesign.create({data:{imageUrl:url,title}}):await prisma.jewelleryVideo.create({data:{videoUrl:url,title}});
 return NextResponse.json(item,{status:201});}catch(e){const msg=e instanceof Error?e.message:"Save failed";return NextResponse.json({error:msg},{status:msg==="UNAUTHORIZED"?401:400});}}
