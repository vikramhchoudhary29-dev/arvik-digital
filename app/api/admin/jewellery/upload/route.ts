import { NextResponse } from "next/server";
import cloudinary from "cloudinary";
import { requireAdmin } from "@/lib/auth";
cloudinary.v2.config({cloud_name:process.env.CLOUDINARY_CLOUD_NAME,api_key:process.env.CLOUDINARY_API_KEY,api_secret:process.env.CLOUDINARY_API_SECRET});
export async function POST(req:Request){try{await requireAdmin();const form=await req.formData();const file=form.get("file");const kind=form.get("kind");if(!(file instanceof File)||!["slide","video","design"].includes(String(kind)))return NextResponse.json({error:"Select an image or video"},{status:400});
 const isVideo=kind==="video";const allowed=isVideo?["video/mp4","video/webm","video/quicktime"]:["image/jpeg","image/png","image/webp"];
 if(!allowed.includes(file.type)||file.size<=0||file.size>(isVideo?100:10)*1024*1024)return NextResponse.json({error:isVideo?"Use MP4/WEBM/MOV under 100 MB":"Use JPG/PNG/WEBP under 10 MB"},{status:400});
 const buffer=Buffer.from(await file.arrayBuffer());const result=await new Promise<cloudinary.UploadApiResponse>((resolve,reject)=>cloudinary.v2.uploader.upload_stream({folder:"arvik-digital/jewellery",resource_type:isVideo?"video":"image"},(err,result)=>err?reject(err):resolve(result as cloudinary.UploadApiResponse)).end(buffer));return NextResponse.json({url:result.secure_url});
 }catch(e){const msg=e instanceof Error?e.message:"Upload failed";return NextResponse.json({error:msg},{status:msg==="UNAUTHORIZED"?401:400});}}
