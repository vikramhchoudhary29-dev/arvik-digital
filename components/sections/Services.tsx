"use client";

import {
  Bot,
  Brush,
  Code2,
  Globe2,
  Megaphone,
  Settings,
  ArrowRight,
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
    <section id="services" className="relative overflow-hidden py-28">
      <div className="absolute left-0 top-20 h-[360px] w-[360px] rounded-full bg-yellow-500/10 blur-[110px]" />
      <div className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-yellow-300/10 blur-[140px]" />

      <div className="container relative">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-yellow-300">
            Our Services
          </p>

          <h2 className="text-4xl font-black tracking-tight md:text-6xl">
            Complete Digital Solutions For{" "}
            <span className="gold-text">Modern Businesses</span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-zinc-400">
            From premium websites to AI automation and branding, Arvik Digital
            helps businesses build a stronger digital presence.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => {
            const Icon =
              iconMap[service.icon as keyof typeof iconMap] || Globe2;

            const message = `Hello Arvik Digital, I am interested in your ${service.title} service. Please share more details.`;

            return (
              <div
                key={service.id}
                className="group relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.045] p-7 backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-yellow-400/35 hover:bg-yellow-400/[0.055]"
              >
                <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-yellow-400/10 blur-3xl transition group-hover:bg-yellow-400/20" />

                <div className="relative">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-yellow-400/25 bg-yellow-400/10 text-yellow-300">
                    <Icon size={26} />
                  </div>

                  <h3 className="text-2xl font-black">{service.title}</h3>

                  <p className="mt-4 min-h-[88px] leading-7 text-zinc-400">
                    {service.shortDesc || service.description}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {service.benefits.map((point) => (
                      <span
                        key={point}
                        className="rounded-full border border-white/10 bg-black/30 px-3 py-2 text-xs text-zinc-300"
                      >
                        {point}
                      </span>
                    ))}
                  </div>

                  <div className="mt-8 grid grid-cols-2 gap-3">
                    <a
                      href={createWhatsAppLink(message)}
                      target="_blank"
                      className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-yellow-300 to-yellow-600 px-4 py-3 text-sm font-bold text-black transition hover:scale-105"
                    >
                      Get Quote
                      <ArrowRight size={15} />
                    </a>

                    <a
                      href={createWhatsAppLink(message)}
                      target="_blank"
                      className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-bold text-white transition hover:border-yellow-400/40 hover:text-yellow-300"
                    >
                      Enquiry
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {services.length === 0 && (
          <div className="mt-16 rounded-[32px] border border-white/10 bg-white/[0.04] p-10 text-center text-zinc-400">
            No services added yet.
          </div>
        )}
      </div>
    </section>
  );
}