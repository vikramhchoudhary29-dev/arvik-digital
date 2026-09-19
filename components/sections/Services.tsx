"use client";

import {
  ArrowUpRight,
  Bot,
  Brush,
  Code2,
  Globe2,
  Megaphone,
  Settings,
} from "lucide-react";
import { createWhatsAppLink } from "@/lib/whatsapp";

type Service = {
  id: string;
  title: string;
  slug: string;
  icon: string;
  shortDesc: string;
  description: string;
  benefits: string[];
  featured: boolean;
  order: number;
};

const iconMap = {
  Globe: Globe2,
  Code: Code2,
  Bot,
  Megaphone,
  Brush,
  Settings,
  Website: Globe2,
  AI: Bot,
  Marketing: Megaphone,
  Design: Brush,
};

export default function Services({ services }: { services: Service[] }) {
  return (
    <section id="services" className="relative overflow-hidden py-24 md:py-32">
      <div className="pointer-events-none absolute -left-40 top-20 h-[420px] w-[420px] rounded-full bg-yellow-400/[0.08] blur-[140px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-[460px] w-[460px] rounded-full bg-yellow-500/[0.06] blur-[150px]" />

      <div className="container relative">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-yellow-400/20 bg-yellow-400/[0.06] px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-yellow-200">
              <span className="h-1.5 w-1.5 rounded-full bg-yellow-300 shadow-[0_0_12px_rgba(253,224,71,0.8)]" />
              What we do
            </div>
            <h2 className="max-w-2xl text-4xl font-black tracking-[-0.04em] md:text-6xl">
              Digital services built around your <span className="gold-text">business goals.</span>
            </h2>
          </div>

          <div className="lg:pb-2">
            <p className="max-w-2xl text-base leading-8 text-zinc-400 md:text-lg">
              We combine strategy, design and technology to create digital experiences that look premium, work fast and turn visitors into real enquiries.
            </p>
          </div>
        </div>

        <div className="mt-14 divide-y divide-white/10 border-y border-white/10">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon as keyof typeof iconMap] || Globe2;
            const message = `Hello Arvik Digital, I am interested in your ${service.title} service. Please share more details.`;

            return (
              <article
                key={service.id}
                className="group relative grid gap-7 py-8 transition md:grid-cols-[88px_1fr_auto] md:items-center md:gap-8 md:py-10"
              >
                <div className="flex items-center gap-4 md:block">
                  <span className="text-sm font-black tabular-nums text-zinc-600 transition group-hover:text-yellow-300">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.035] text-zinc-400 transition duration-300 group-hover:border-yellow-400/30 group-hover:bg-yellow-400/[0.08] group-hover:text-yellow-200 md:mt-4">
                    <Icon size={22} />
                  </div>
                </div>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-2xl font-black tracking-tight md:text-3xl">
                      {service.title}
                    </h3>
                    {service.featured && (
                      <span className="rounded-full border border-yellow-400/20 bg-yellow-400/[0.06] px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-yellow-200">
                        Featured
                      </span>
                    )}
                  </div>

                  <p className="mt-3 max-w-3xl text-sm leading-7 text-zinc-400 md:text-base">
                    {service.shortDesc || service.description}
                  </p>

                  {service.benefits.length > 0 && (
                    <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
                      {service.benefits.slice(0, 4).map((benefit) => (
                        <span key={benefit} className="text-xs font-semibold text-zinc-500">
                          <span className="mr-2 text-yellow-300">•</span>
                          {benefit}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <a
                  href={createWhatsAppLink(message)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-bold text-white transition duration-300 hover:border-yellow-400/40 hover:bg-yellow-400/[0.08] hover:text-yellow-200"
                >
                  Get Quote
                  <ArrowUpRight size={16} />
                </a>

                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-yellow-300 via-yellow-500 to-transparent transition duration-500 group-hover:scale-x-100" />
              </article>
            );
          })}
        </div>

        {services.length === 0 && (
          <div className="mt-14 rounded-[28px] border border-white/10 bg-white/[0.03] p-10 text-center text-zinc-400">
            No services added yet.
          </div>
        )}
      </div>
    </section>
  );
}
