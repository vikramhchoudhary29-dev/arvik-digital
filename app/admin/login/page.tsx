"use client";

import { useState } from "react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("admin@arvikdigital.com");
  const [password, setPassword] = useState("Admin@123");
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      setError("Invalid email or password");
      return;
    }

    window.location.href = "/admin/dashboard";
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#090909] px-5 hero-grid">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md rounded-[34px] border border-white/10 bg-white/[0.05] p-8 backdrop-blur-xl"
      >
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-yellow-400/30 bg-yellow-400/10 text-2xl font-black text-yellow-300">
            A
          </div>

          <h1 className="text-3xl font-black">Admin Login</h1>

          <p className="mt-2 text-zinc-400">
            Login to manage Arvik Digital website.
          </p>
        </div>

        {error && (
          <div className="mb-5 rounded-2xl border border-red-400/20 bg-red-400/10 p-4 text-sm text-red-300">
            {error}
          </div>
        )}

        <div className="space-y-5">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 outline-none transition focus:border-yellow-400/40"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 outline-none transition focus:border-yellow-400/40"
          />

          <button className="w-full rounded-2xl bg-gradient-to-r from-yellow-300 to-yellow-600 px-6 py-4 font-bold text-black transition hover:scale-[1.02]">
            Login
          </button>
        </div>
      </form>
    </main>
  );
}