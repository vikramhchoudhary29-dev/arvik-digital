"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type TestimonialFormProps = {
  mode: "add" | "edit";
  initialData?: {
    id?: string;
    name: string;
    company: string;
    designation: string;
    review: string;
    rating: number;
    image: string;
    featured: boolean;
  };
};

export default function TestimonialForm({
  mode,
  initialData,
}: TestimonialFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState(
    initialData ?? {
      name: "",
      company: "",
      designation: "",
      review: "",
      rating: 5,
      image: "",
      featured: false,
    }
  );

  function updateField(name: string, value: string | boolean | number) {
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const url =
      mode === "add"
        ? "/api/admin/testimonials"
        : `/api/admin/testimonials/${initialData?.id}`;

    const method = mode === "add" ? "POST" : "PATCH";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        rating: Number(form.rating),
      }),
    });

    setLoading(false);

    if (!res.ok) {
      alert("Something went wrong");
      return;
    }

    router.push("/admin/testimonials");
    router.refresh();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[30px] border border-white/10 bg-white/[0.04] p-7"
    >
      <div className="grid gap-5 md:grid-cols-2">
        <Input label="Client Name" value={form.name} onChange={(v) => updateField("name", v)} />
        <Input label="Company" value={form.company} onChange={(v) => updateField("company", v)} />
        <Input label="Designation" value={form.designation} onChange={(v) => updateField("designation", v)} />
        <Input label="Image URL" value={form.image} onChange={(v) => updateField("image", v)} />
        <Input
          label="Rating"
          type="number"
          value={String(form.rating)}
          onChange={(v) => updateField("rating", Number(v))}
        />
      </div>

      <div className="mt-5">
        <Textarea label="Review" value={form.review} onChange={(v) => updateField("review", v)} />
      </div>

      <label className="mt-6 flex items-center gap-3 text-zinc-300">
        <input
          type="checkbox"
          checked={form.featured}
          onChange={(e) => updateField("featured", e.target.checked)}
          className="h-5 w-5"
        />
        Featured Testimonial
      </label>

      <button
        disabled={loading}
        className="mt-8 rounded-2xl bg-gradient-to-r from-yellow-300 to-yellow-600 px-7 py-4 font-bold text-black disabled:opacity-60"
      >
        {loading ? "Saving..." : mode === "add" ? "Add Testimonial" : "Update Testimonial"}
      </button>
    </form>
  );
}

function Input({ label, value, onChange, type = "text" }: {
  label: string;
  value: string;
  type?: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold text-zinc-300">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 outline-none transition focus:border-yellow-400/40"
      />
    </div>
  );
}

function Textarea({ label, value, onChange }: {
  label: string;
  value: string;
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
    </div>
  );
}