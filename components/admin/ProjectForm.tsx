"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type ProjectFormProps = {
  mode: "add" | "edit";
  initialData?: {
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
  };
};

export default function ProjectForm({ mode, initialData }: ProjectFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState(
    initialData ?? {
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
    }
  );

  function updateField(name: string, value: string | boolean) {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function generateSlug(value: string) {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

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

    setLoading(false);

    if (!res.ok) {
      alert("Something went wrong");
      return;
    }

    router.push("/admin/projects");
    router.refresh();
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
        disabled={loading}
        className="mt-8 rounded-2xl bg-gradient-to-r from-yellow-300 to-yellow-600 px-7 py-4 font-bold text-black disabled:opacity-60"
      >
        {loading ? "Saving..." : mode === "add" ? "Add Project" : "Update Project"}
      </button>
    </form>
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
      <label className="mb-2 block text-sm font-bold text-zinc-300">
        {label}
      </label>
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
      <label className="mb-2 block text-sm font-bold text-zinc-300">
        {label}
      </label>
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