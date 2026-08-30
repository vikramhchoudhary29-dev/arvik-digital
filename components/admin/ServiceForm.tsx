"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type ServiceFormProps = {
  mode: "add" | "edit";
  initialData?: {
    id?: string;
    title: string;
    slug: string;
    icon: string;
    shortDesc: string;
    description: string;
    benefits: string;
    order: number;
    featured: boolean;
  };
};

export default function ServiceForm({ mode, initialData }: ServiceFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState(
    initialData ?? {
      title: "",
      slug: "",
      icon: "Globe",
      shortDesc: "",
      description: "",
      benefits: "",
      order: 0,
      featured: false,
    }
  );

  function generateSlug(value: string) {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  }

  function updateField(name: string, value: string | boolean | number) {
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...form,
      slug: form.slug || generateSlug(form.title),
      benefits: form.benefits
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      order: Number(form.order),
    };

    const url =
      mode === "add"
        ? "/api/admin/services"
        : `/api/admin/services/${initialData?.id}`;

    const method = mode === "add" ? "POST" : "PATCH";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setLoading(false);

    if (!res.ok) {
      alert("Something went wrong");
      return;
    }

    router.push("/admin/services");
    router.refresh();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[30px] border border-white/10 bg-white/[0.04] p-7"
    >
      <div className="grid gap-5 md:grid-cols-2">
        <Input
          label="Service Title"
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
          label="Lucide Icon Name"
          value={form.icon}
          onChange={(value) => updateField("icon", value)}
        />

        <Input
          label="Display Order"
          type="number"
          value={String(form.order)}
          onChange={(value) => updateField("order", Number(value))}
        />
      </div>

      <div className="mt-5">
        <Textarea
          label="Short Description"
          value={form.shortDesc}
          onChange={(value) => updateField("shortDesc", value)}
        />
      </div>

      <div className="mt-5">
        <Textarea
          label="Full Description"
          value={form.description}
          onChange={(value) => updateField("description", value)}
        />
      </div>

      <div className="mt-5">
        <Textarea
          label="Benefits"
          helper="Separate with commas: Responsive, SEO Friendly, Fast Loading"
          value={form.benefits}
          onChange={(value) => updateField("benefits", value)}
        />
      </div>

      <label className="mt-6 flex items-center gap-3 text-zinc-300">
        <input
          type="checkbox"
          checked={form.featured}
          onChange={(e) => updateField("featured", e.target.checked)}
          className="h-5 w-5"
        />
        Mark as Featured Service
      </label>

      <button
        disabled={loading}
        className="mt-8 rounded-2xl bg-gradient-to-r from-yellow-300 to-yellow-600 px-7 py-4 font-bold text-black disabled:opacity-60"
      >
        {loading ? "Saving..." : mode === "add" ? "Add Service" : "Update Service"}
      </button>
    </form>
  );
}

function Input({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  type?: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold text-zinc-300">
        {label}
      </label>
      <input
        type={type}
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