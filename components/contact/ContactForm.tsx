"use client";

import { useState } from "react";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    service: "Website Development",
    message: "",
  });

  function updateField(name: string, value: string) {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/enquiry", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    setLoading(false);

    if (!res.ok) {
      alert("Something went wrong. Please try again.");
      return;
    }

    alert("Thank you! Your enquiry has been submitted.");

    setForm({
      name: "",
      company: "",
      email: "",
      phone: "",
      service: "Website Development",
      message: "",
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[34px] border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl"
    >
      <h2 className="text-3xl font-black">Send Enquiry</h2>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <Input
          placeholder="Full Name"
          value={form.name}
          onChange={(value) => updateField("name", value)}
        />

        <Input
          placeholder="Business Name"
          value={form.company}
          onChange={(value) => updateField("company", value)}
        />

        <Input
          placeholder="Email Address"
          value={form.email}
          onChange={(value) => updateField("email", value)}
        />

        <Input
          placeholder="Phone Number"
          value={form.phone}
          onChange={(value) => updateField("phone", value)}
        />
      </div>

      <div className="mt-5">
        <select
          value={form.service}
          onChange={(e) => updateField("service", e.target.value)}
          className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none"
        >
          <option>Website Development</option>
          <option>Custom Web Application</option>
          <option>AI Solution</option>
          <option>Digital Marketing</option>
          <option>Graphic Design</option>
          <option>Website Management</option>
        </select>
      </div>

      <textarea
        rows={6}
        placeholder="Tell us about your project..."
        value={form.message}
        onChange={(e) => updateField("message", e.target.value)}
        className="mt-5 w-full rounded-2xl border border-white/10 bg-black/40 p-5 text-white outline-none"
      />

      <button
        disabled={loading}
        className="mt-8 rounded-2xl bg-gradient-to-r from-yellow-300 to-yellow-600 px-8 py-4 font-bold text-black transition hover:scale-105 disabled:opacity-60"
      >
        {loading ? "Submitting..." : "Send Enquiry"}
      </button>
    </form>
  );
}

function Input({
  placeholder,
  value,
  onChange,
}: {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <input
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none"
    />
  );
}