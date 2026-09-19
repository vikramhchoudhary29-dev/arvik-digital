"use client";

import { useState } from "react";

export default function MediaUpload({ onUploaded }: { onUploaded: () => void }) {
  const [loading, setLoading] = useState(false);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/admin/media/upload", {
      method: "POST",
      body: formData,
    });

    setLoading(false);

    if (!res.ok) {
      alert("Upload failed");
      return;
    }

    onUploaded();
  }

  return (
    <label className="block cursor-pointer rounded-[30px] border border-dashed border-yellow-400/30 bg-yellow-400/[0.06] p-8 text-center transition hover:bg-yellow-400/[0.1]">
      <input type="file" className="hidden" onChange={handleUpload} />

      <p className="text-lg font-black text-yellow-200">
        {loading ? "Uploading..." : "Upload Media"}
      </p>

      <p className="mt-2 text-sm text-zinc-400">
        Click to upload image, PDF, SVG, or other media.
      </p>
    </label>
  );
}