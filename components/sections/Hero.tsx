"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import { createWhatsAppLink, quoteMessage } from "@/lib/whatsapp";

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden pt-32 hero-grid">
      <div className="absolute left-1/2 top-0 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-yellow-500/20 blur-[150px]" />
      <div className="absolute right-0 top-32 h-[420px] w-[420px] rounded-full bg-yellow-300/10 blur-[120px]" />
      <div className="absolute bottom-0 left-0 h-[420px] w-[420px] rounded-full bg-white/5 blur-[120px]" />

      <div className="container relative grid min-h-[calc(100vh-120px)] items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-yellow-400/25 bg-yellow-400/10 px-4 py-2 text-sm text-yellow-200">
            <Sparkles size={16} />
            Premium Web Development Agency
          </div>

          <h1 className="max-w-4xl text-5xl font-black leading-[1.03] tracking-tight md:text-7xl">
            Building Digital Experiences That{" "}
            <span className="gold-text">Drive Business Growth</span>
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-8 text-zinc-300 md:text-xl">
            Custom Websites • Web Applications • AI Solutions • Branding •
            Digital Marketing
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <a
              href={createWhatsAppLink(quoteMessage)}
              target="_blank"
              className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-yellow-300 to-yellow-600 px-7 py-4 font-bold text-black shadow-2xl shadow-yellow-500/25 transition hover:scale-105"
            >
              Start Your Project
              <ArrowRight
                size={18}
                className="transition group-hover:translate-x-1"
              />
            </a>

            <a
              href="#portfolio"
              className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-7 py-4 font-bold text-white backdrop-blur-xl transition hover:border-yellow-400/40 hover:text-yellow-300"
            >
              View Portfolio
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}