"use client";

import { ArrowRight, ExternalLink } from "lucide-react";
import { createWhatsAppLink } from "@/lib/whatsapp";

type Project = {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  technologies: string[];
  features: string[];
  completedDate: string;
  liveUrl: string;
  status: string;
  featured: boolean;
};

export default function FeaturedProjects({ projects }: { projects: Project[] }) {
  return (
    <section id="portfolio" className="relative overflow-hidden py-28">
      <div className="absolute left-1/2 top-10 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-yellow-500/10 blur-[130px]" />

      <div className="container relative">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-yellow-300">
              Featured Projects
            </p>

            <h2 className="text-4xl font-black tracking-tight md:text-6xl">
              Completed Work That Builds{" "}
              <span className="gold-text">Client Trust</span>
            </h2>

            <p className="mt-6 text-lg leading-8 text-zinc-400">
              A curated selection of completed digital projects crafted for
              businesses that need premium design, strong performance, and real
              enquiries.
            </p>
          </div>

          <a
            href="/portfolio"
            className="inline-flex w-fit items-center gap-2 rounded-2xl border border-yellow-400/25 bg-yellow-400/10 px-5 py-3 font-bold text-yellow-200 transition hover:bg-yellow-400/20"
          >
            View All Projects
            <ArrowRight size={17} />
          </a>
        </div>

        <div className="mt-16 grid gap-7 lg:grid-cols-3">
          {projects.map((project) => {
            const message = `Hello Arvik Digital, I would like to build a website similar to your ${project.title} project. Please contact me.`;

            return (
              <article
                key={project.id}
                className="group relative overflow-hidden rounded-[34px] border border-white/10 bg-white/[0.045] p-5 backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-yellow-400/35"
              >
                <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-yellow-400/10 blur-3xl transition group-hover:bg-yellow-400/20" />

                <div className="relative overflow-hidden rounded-[26px] border border-white/10 bg-black/40 p-4">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-red-400" />
                    <span className="h-3 w-3 rounded-full bg-yellow-400" />
                    <span className="h-3 w-3 rounded-full bg-green-400" />
                  </div>

                  <div className="mt-5 rounded-3xl bg-gradient-to-br from-yellow-400/20 via-white/5 to-black p-5">
                    <div className="mb-8 flex items-center justify-between">
                      <span className="rounded-full border border-yellow-400/20 bg-yellow-400/10 px-3 py-1 text-xs font-semibold text-yellow-200">
                        {project.category}
                      </span>
                      <span className="text-xs text-zinc-400">
                        {project.completedDate}
                      </span>
                    </div>

                    <div className="space-y-3">
                      <div className="h-3 w-2/3 rounded-full bg-white/20" />
                      <div className="h-3 w-full rounded-full bg-white/10" />
                      <div className="h-3 w-5/6 rounded-full bg-white/10" />
                    </div>

                    <div className="mt-8 grid grid-cols-2 gap-3">
                      <div className="h-20 rounded-2xl bg-black/40" />
                      <div className="h-20 rounded-2xl bg-yellow-400/10" />
                    </div>
                  </div>
                </div>

                <div className="relative pt-7">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <h3 className="text-2xl font-black">{project.title}</h3>
                    <span className="rounded-full bg-green-400/10 px-3 py-1 text-xs font-bold text-green-300">
                      {project.status}
                    </span>
                  </div>

                  <p className="min-h-[84px] leading-7 text-zinc-400">
                    {project.description}
                  </p>

                  <div className="mt-6">
                    <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
                      Technologies
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-white/10 bg-black/30 px-3 py-2 text-xs text-zinc-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6">
                    <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
                      Features
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {project.features.map((feature) => (
                        <span
                          key={feature}
                          className="rounded-full border border-yellow-400/15 bg-yellow-400/5 px-3 py-2 text-xs text-yellow-100"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <a
                      href={project.liveUrl || "#"}
                      target="_blank"
                      className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-bold text-white transition hover:border-yellow-400/40 hover:text-yellow-300"
                    >
                      Visit Site
                      <ExternalLink size={15} />
                    </a>

                    <a
                      href={createWhatsAppLink(message)}
                      target="_blank"
                      className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-yellow-300 to-yellow-600 px-4 py-3 text-sm font-bold text-black transition hover:scale-105"
                    >
                      Build Similar
                      <ArrowRight size={15} />
                    </a>
                  </div>
                </div>

                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-yellow-400/60 to-transparent opacity-0 transition group-hover:opacity-100" />
              </article>
            );
          })}
        </div>

        {projects.length === 0 && (
          <div className="mt-16 rounded-[32px] border border-white/10 bg-white/[0.04] p-10 text-center text-zinc-400">
            No featured projects added yet.
          </div>
        )}
      </div>
    </section>
  );
}