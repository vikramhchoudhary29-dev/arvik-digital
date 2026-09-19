"use client";

import { ImagePlus, Trash2, Upload } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

type ProjectFormData = {
  id?: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  technologies: string;
  features: string;
  completedDate: string;
  liveUrl: string;
  status: string;
  featured: boolean;
  thumbnail: string;
  gallery: string[];
};

type ProjectFormProps = {
  mode: "add" | "edit";
  initialData?: ProjectFormData;
};

const emptyForm: ProjectFormData = {
  title: "",
  slug: "",
  category: "",
  description: "",
  technologies: "",
  features: "",
  completedDate: "",
  liveUrl: "",
  status: "Completed",
  featured: false,
  thumbnail: "",
  gallery: [],
};

export default function ProjectForm({ mode, initialData }: ProjectFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploadingThumbnail, setUploadingThumbnail] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);
  const [form, setForm] = useState<ProjectFormData>(initialData ?? emptyForm);

  function updateField<K extends keyof ProjectFormData>(
    name: K,
    value: ProjectFormData[K]
  ) {
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function generateSlug(value: string) {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  }

  async function uploadFile(file: File) {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/admin/media/upload", {
      method: "POST",
      body: formData,
    });

    const data = (await res.json()) as { secureUrl?: string; url?: string; error?: string };

    if (!res.ok || !(data.secureUrl || data.url)) {
      throw new Error(data.error || "Upload failed");
    }

    return data.secureUrl || data.url!;
  }

  async function handleThumbnailChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    try {
      setUploadingThumbnail(true);
      const url = await uploadFile(file);
      updateField("thumbnail", url);
    } catch (error) {
      alert(error instanceof Error ? error.message : "Thumbnail upload failed");
    } finally {
      setUploadingThumbnail(false);
    }
  }

  async function handleGalleryChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    e.target.value = "";
    if (files.length === 0) return;

    try {
      setUploadingGallery(true);
      const uploaded: string[] = [];

      for (const file of files) {
        uploaded.push(await uploadFile(file));
      }

      setForm((prev) => ({
        ...prev,
        gallery: [...prev.gallery, ...uploaded],
      }));
    } catch (error) {
      alert(error instanceof Error ? error.message : "Gallery upload failed");
    } finally {
      setUploadingGallery(false);
    }
  }

  function removeGalleryImage(index: number) {
    setForm((prev) => ({
      ...prev,
      gallery: prev.gallery.filter((_, imageIndex) => imageIndex !== index),
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        title: form.title,
        slug: form.slug || generateSlug(form.title),
        category: form.category,
        description: form.description,
        technologies: form.technologies
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
        features: form.features
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
        completedDate: form.completedDate,
        liveUrl: form.liveUrl,
        status: form.status,
        featured: form.featured,
        thumbnail: form.thumbnail || null,
        gallery: form.gallery,
      };

      const url =
        mode === "add"
          ? "/api/admin/projects"
          : `/api/admin/projects/${initialData?.id}`;

      const method = mode === "add" ? "POST" : "PATCH";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = (await res.json()) as { error?: string };

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      router.push("/admin/projects");
      router.refresh();
    } catch (error) {
      alert(error instanceof Error ? error.message : "Something went wrong");
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[30px] border border-white/10 bg-white/[0.04] p-7"
    >
      <div className="grid gap-5 md:grid-cols-2">
        <Input
          label="Project Title"
          value={form.title}
          onChange={(value) => {
            updateField("title", value);
            updateField("slug", generateSlug(value));
          }}
        />

        <Input
          label="Slug"
          value={form.slug}
          onChange={(value) => updateField("slug", value)}
        />

        <Input
          label="Category"
          value={form.category}
          onChange={(value) => updateField("category", value)}
        />

        <Input
          label="Completed Date"
          value={form.completedDate}
          onChange={(value) => updateField("completedDate", value)}
        />

        <Input
          label="Live Website URL"
          value={form.liveUrl}
          onChange={(value) => updateField("liveUrl", value)}
        />

        <div>
          <label className="mb-2 block text-sm font-bold text-zinc-300">
            Status
          </label>
          <select
            value={form.status}
            onChange={(e) => updateField("status", e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 outline-none"
          >
            <option>Completed</option>
            <option>In Progress</option>
            <option>Hidden</option>
          </select>
        </div>
      </div>

      <div className="mt-7 grid gap-5 lg:grid-cols-2">
        <ImageUploadCard
          label="Project Thumbnail"
          description="This image appears on portfolio and featured project cards."
          image={form.thumbnail}
          loading={uploadingThumbnail}
          inputId="project-thumbnail"
          onChange={handleThumbnailChange}
          onRemove={() => updateField("thumbnail", "")}
        />

        <div className="rounded-[26px] border border-white/10 bg-black/20 p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-black text-white">Project Gallery</p>
              <p className="mt-1 text-sm leading-6 text-zinc-500">
                Upload multiple screenshots or project photos for the detail page.
              </p>
            </div>
            <ImagesIcon />
          </div>

          <label
            htmlFor="project-gallery"
            className="mt-5 flex cursor-pointer items-center justify-center gap-2 rounded-2xl border border-dashed border-yellow-400/30 bg-yellow-400/[0.06] px-5 py-4 text-sm font-bold text-yellow-200 transition hover:bg-yellow-400/[0.1]"
          >
            <input
              id="project-gallery"
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
              multiple
              className="hidden"
              onChange={handleGalleryChange}
              disabled={uploadingGallery}
            />
            <Upload size={17} />
            {uploadingGallery ? "Uploading gallery..." : "Upload Gallery Images"}
          </label>

          {form.gallery.length > 0 ? (
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {form.gallery.map((image, index) => (
                <div
                  key={`${image}-${index}`}
                  className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-black/40"
                >
                  <img
                    src={image}
                    alt={`Gallery image ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeGalleryImage(index)}
                    className="absolute right-2 top-2 rounded-full bg-black/80 p-2 text-white opacity-100 transition hover:bg-red-500"
                    aria-label={`Remove gallery image ${index + 1}`}
                  >
                    <Trash2 size={14} />
                  </button>
                  <span className="absolute bottom-2 left-2 rounded-full bg-black/75 px-2 py-1 text-[10px] font-bold text-white">
                    {index + 1}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-5 rounded-2xl border border-white/5 bg-white/[0.02] p-6 text-center text-sm text-zinc-600">
              No gallery images added yet.
            </div>
          )}
        </div>
      </div>

      <div className="mt-5">
        <Textarea
          label="Description"
          value={form.description}
          onChange={(value) => updateField("description", value)}
        />
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <Textarea
          label="Technologies"
          helper="Separate with commas: Next.js, React, Tailwind"
          value={form.technologies}
          onChange={(value) => updateField("technologies", value)}
        />

        <Textarea
          label="Features"
          helper="Separate with commas: WhatsApp, SEO, Booking"
          value={form.features}
          onChange={(value) => updateField("features", value)}
        />
      </div>

      <label className="mt-6 flex items-center gap-3 text-zinc-300">
        <input
          type="checkbox"
          checked={form.featured}
          onChange={(e) => updateField("featured", e.target.checked)}
          className="h-5 w-5"
        />
        Mark as Featured Project
      </label>

      <button
        disabled={loading || uploadingThumbnail || uploadingGallery}
        className="mt-8 rounded-2xl bg-gradient-to-r from-yellow-300 to-yellow-600 px-7 py-4 font-bold text-black disabled:opacity-60"
      >
        {loading ? "Saving..." : mode === "add" ? "Add Project" : "Update Project"}
      </button>
    </form>
  );
}

function ImagesIcon() {
  return <ImagePlus className="text-yellow-300" size={22} />;
}

function ImageUploadCard({
  label,
  description,
  image,
  loading,
  inputId,
  onChange,
  onRemove,
}: {
  label: string;
  description: string;
  image: string;
  loading: boolean;
  inputId: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: () => void;
}) {
  return (
    <div className="rounded-[26px] border border-white/10 bg-black/20 p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-black text-white">{label}</p>
          <p className="mt-1 text-sm leading-6 text-zinc-500">{description}</p>
        </div>
        <ImagePlus className="text-yellow-300" size={22} />
      </div>

      {image ? (
        <div className="relative mt-5 aspect-[16/9] overflow-hidden rounded-2xl border border-white/10 bg-black/50">
          <img src={image} alt="Project thumbnail" className="h-full w-full object-cover" />
          <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-gradient-to-t from-black/90 to-transparent p-4 pt-10">
            <span className="text-xs font-bold text-white">Thumbnail selected</span>
            <button
              type="button"
              onClick={onRemove}
              className="inline-flex items-center gap-2 rounded-xl bg-red-500/90 px-3 py-2 text-xs font-bold text-white"
            >
              <Trash2 size={14} />
              Remove
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-5 flex aspect-[16/9] items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/[0.02] text-sm text-zinc-600">
          No thumbnail selected
        </div>
      )}

      <label
        htmlFor={inputId}
        className="mt-4 flex cursor-pointer items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-sm font-bold text-zinc-200 transition hover:border-yellow-400/30 hover:text-yellow-200"
      >
        <input
          id={inputId}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
          className="hidden"
          onChange={onChange}
          disabled={loading}
        />
        <Upload size={17} />
        {loading ? "Uploading..." : image ? "Replace Thumbnail" : "Upload Thumbnail"}
      </label>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold text-zinc-300">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 outline-none transition focus:border-yellow-400/40"
      />
    </div>
  );
}

function Textarea({
  label,
  value,
  helper,
  onChange,
}: {
  label: string;
  value: string;
  helper?: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold text-zinc-300">{label}</label>
      <textarea
        rows={5}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border border-white/10 bg-black/40 p-5 outline-none transition focus:border-yellow-400/40"
      />
      {helper && <p className="mt-2 text-sm text-zinc-500">{helper}</p>}
    </div>
  );
}
