"use client";

import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import MediaUpload from "@/components/admin/MediaUpload";
import MediaGrid from "@/components/admin/MediaGrid";

type Media = {
  id: string;
  url: string;
  name: string;
  type: string;
  size: number;
};

export default function AdminMediaPage() {
  const [media, setMedia] = useState<Media[]>([]);

  async function loadMedia() {
    const res = await fetch("/api/admin/media");
    const data = await res.json();
    setMedia(data);
  }

  useEffect(() => {
    loadMedia();
  }, []);

  return (
    <AdminLayout
      title="Media Library"
      description="Upload and manage all website media files."
    >
      <MediaUpload onUploaded={loadMedia} />

      <div className="mt-10">
        <MediaGrid media={media} />
      </div>
    </AdminLayout>
  );
}