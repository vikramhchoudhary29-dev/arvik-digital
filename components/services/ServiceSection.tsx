"use client";

import { ArrowRight, CheckCircle } from "lucide-react";
import { createWhatsAppLink } from "@/lib/whatsapp";

type Service = {
  id: number;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  features: string[];
  technologies: string[];
};

type Props = {
  service: Service;
  reverse?: boolean;
};

export default function ServiceSection({
  service,
  reverse = false,
}: Props) {
  const message = `Hello Arvik Digital, I am interested in your ${service.title} service. Please share more details.`;

  return (
    <section className="py-20">
      <div
        className={`container grid items-center gap-14 lg:grid-cols-2 ${
          reverse ? "lg:[&>*:first-child]:order-2" : ""
        }`}
      >
        {/* Illustration */}
        <div className="relative">
          <div className="absolute -left-10 -top-10 h-48 w-48 rounded-full bg-yellow-500/10 blur-[100px]" />

          <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
            <div className="mb-4 flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-red-400" />
              <span className="h-3 w-3 rounded-full bg-yellow-400" />
              <span className="h-3 w-3 rounded-full bg-green-400" />
            </div>

            <div className="rounded-[28px] bg-gradient-to-br from-yellow-400/20 via-white/5 to-black p-8">
              <div className="mb-8 h-12 w-40 rounded-full bg-yellow-400/20" />

              <div className="space-y-4">
                <div className="h-4 w-full rounded-full bg-white/10" />
                <div className="h-4 w-5/6 rounded-full bg-white/10" />
                <div className="h-4 w-3/4 rounded-full bg-white/10" />
              </div>

              <div className="mt-10 grid grid-cols-2 gap-4">
                <div className="h-28 rounded-2xl bg-black/40" />
                <div className="h-28 rounded-2xl bg-yellow-400/10" />
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div>
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-yellow-300">
            {service.title}
          </p>

          <h2 className="text-4xl font-black md:text-5xl">
            {service.shortDescription}
          </h2>

          <p className="mt-6 text-lg leading-8 text-zinc-400">
            {service.fullDescription}
          </p>

          {/* Features */}
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {service.features.map((feature) => (
              <div
                key={feature}
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4"
              >
                <CheckCircle
                  size={20}
                  className="text-yellow-300 flex-shrink-0"
                />

                <span>{feature}</span>
              </div>
            ))}
          </div>

          {/* Technologies */}
          <div className="mt-10">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.25em] text-zinc-500">
              Technologies
            </p>

            <div className="flex flex-wrap gap-3">
              {service.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-yellow-400/20 bg-yellow-400/5 px-4 py-2 text-sm text-yellow-100"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <a
            href={createWhatsAppLink(message)}
            target="_blank"
            className="mt-10 inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-yellow-300 to-yellow-600 px-7 py-4 font-bold text-black transition hover:scale-105"
          >
            Get Quote
            <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}