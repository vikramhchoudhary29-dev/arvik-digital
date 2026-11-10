import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
const valid=(v:unknown)=>typeof v==="string"&&v.length<=160;
export async function PATCH(req:Request,{params}:{params:Promise<{id:string}>}){try{await requireAdmin();const {id}=await params;const b=await req.json();if(!["slide","video","design"].includes(b.kind))return NextResponse.json({error:"Invalid type"},{status:400});
 if(b.title!==undefined&&!valid(b.title))return NextResponse.json({error:"Invalid title"},{status:400});
 if(b.subtitle!==undefined&&(typeof b.subtitle!=="string"||b.subtitle.length>500))return NextResponse.json({error:"Invalid subtitle"},{status:400});
 if(b.visible!==undefined&&typeof b.visible!=="boolean")return NextResponse.json({error:"Invalid visibility"},{status:400});
 if(b.sortOrder!==undefined&&(!Number.isInteger(b.sortOrder)||Math.abs(b.sortOrder)>100000))return NextResponse.json({error:"Invalid order"},{status:400});
 const data={...(b.title!==undefined?{title:b.title}:{}),...(b.visible!==undefined?{visible:b.visible}:{}),...(b.sortOrder!==undefined?{sortOrder:b.sortOrder}:{})};
 const item=b.kind==="slide"?await prisma.jewelleryHeroSlide.update({where:{id},data:{...data,...(b.subtitle!==undefined?{subtitle:b.subtitle}:{})}}):b.kind==="design"?await prisma.jewelleryDesign.update({where:{id},data}):await prisma.jewelleryVideo.update({where:{id},data});return NextResponse.json(item);
 }catch(e){const msg=e instanceof Error?e.message:"Update failed";return NextResponse.json({error:msg},{status:msg==="UNAUTHORIZED"?401:400});}}
export async function DELETE(req:Request,{params}:{params:Promise<{id:string}>}){try{await requireAdmin();const {id}=await params;const kind=new URL(req.url).searchParams.get("kind");if(kind==="slide")await prisma.jewelleryHeroSlide.delete({where:{id}});else if(kind==="video")await prisma.jewelleryVideo.delete({where:{id}});else if(kind==="design")await prisma.jewelleryDesign.delete({where:{id}});else return NextResponse.json({error:"Invalid type"},{status:400});return NextResponse.json({success:true});}catch(e){const msg=e instanceof Error?e.message:"Delete failed";return NextResponse.json({error:msg},{status:msg==="UNAUTHORIZED"?401:400});}}
