import { NextResponse } from "next/server";
import cloudinary from "cloudinary";
import { prisma } from "@/lib/prisma";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploaded = await new Promise<cloudinary.UploadApiResponse>(
      (resolve, reject) => {
        cloudinary.v2.uploader
          .upload_stream(
            {
              folder: "arvik-digital",
              resource_type: "auto",
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result as cloudinary.UploadApiResponse);
            }
          )
          .end(buffer);
      }
    );

   const media = await prisma.media.create({
  data: {
    publicId: uploaded.public_id,
    url: uploaded.url,
    secureUrl: uploaded.secure_url,
    width: uploaded.width,
    height: uploaded.height,
    format: uploaded.format,
    bytes: uploaded.bytes,
    folder: uploaded.folder,
    name: file.name,
    type: file.type || uploaded.resource_type,
  },
});
    return NextResponse.json(media);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}