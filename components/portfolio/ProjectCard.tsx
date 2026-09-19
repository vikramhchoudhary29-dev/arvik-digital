"use client";

import { ArrowRight, ExternalLink, Images } from "lucide-react";
import Link from "next/link";
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
  thumbnail?: string | null;
  gallery: string[];
};

export default function ProjectCard({ project }: { project: Project }) {
  const message = `Hello Arvik Digital, I would like to build a website similar to your ${project.title} project. Please contact me.`;
  const imageCount = new Set([project.thumbnail, ...(project.gallery ?? [])].filter(Boolean)).size;

  return (
    <article className="group relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl transition duration-500 hover:-translate-y-2 hover:border-yellow-400/30 hover:bg-white/[0.055]">
      <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-yellow-400/[0.08] blur-3xl transition duration-500 group-hover:bg-yellow-400/[0.16]" />

      <div className="relative overflow-hidden rounded-[25px] border border-white/10 bg-black">
        <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.025] px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
          </div>
          {imageCount > 0 && (
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-zinc-400">
              <Images size={13} />
              {imageCount}
            </span>
          )}
        </div>

        <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-yellow-400/15 via-white/[0.04] to-black">
          {project.thumbnail ? (
            <img
              src={project.thumbnail}
              alt={`${project.title} project thumbnail`}
              className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
              loading="lazy"
              onError={(event) => {
                event.currentTarget.style.display = "none";
              }}
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.12),transparent_55%)] text-center">
              <Images className="text-yellow-300/70" size={30} />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">Project Preview</span>
            </div>
          )}

          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-4 pt-14">
            <span className="rounded-full border border-yellow-400/20 bg-black/65 px-3 py-1.5 text-xs font-bold text-yellow-100 backdrop-blur-md">
              {project.category}
            </span>
            <span className="text-xs font-medium text-zinc-300">{project.completedDate}</span>
          </div>
        </div>
      </div>

      <div className="relative pt-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-2xl font-black leading-tight tracking-tight">{project.title}</h3>
          <span className="shrink-0 rounded-full border border-green-400/15 bg-green-400/[0.07] px-3 py-1 text-[10px] font-black uppercase tracking-wider text-green-300">
            {project.status}
          </span>
        </div>

        <p className="mt-3 min-h-[78px] text-sm leading-7 text-zinc-400">{project.description}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.technologies.slice(0, 4).map((tech) => (
            <span key={tech} className="rounded-full border border-white/10 bg-black/25 px-3 py-1.5 text-[11px] font-semibold text-zinc-400">
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-7 grid gap-3 sm:grid-cols-2">
          <Link
            href={`/portfolio/${project.slug}`}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-yellow-300 to-yellow-600 px-4 py-3 text-sm font-black text-black transition hover:scale-[1.02]"
          >
            View Details
            <ArrowRight size={15} />
          </Link>

          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/[0.035] px-4 py-3 text-sm font-bold text-white transition hover:border-yellow-400/35 hover:text-yellow-200"
            >
              Visit Site
              <ExternalLink size={15} />
            </a>
          ) : (
            <a
              href={createWhatsAppLink(message)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/[0.035] px-4 py-3 text-sm font-bold text-white transition hover:border-yellow-400/35 hover:text-yellow-200"
            >
              Build Similar
              <ArrowRight size={15} />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
