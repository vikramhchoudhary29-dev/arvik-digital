import { ArrowRight } from "lucide-react";
import Link from "next/link";
import ProjectCard from "@/components/portfolio/ProjectCard";

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

export default function FeaturedProjects({ projects }: { projects: Project[] }) {
  return (
    <section id="portfolio" className="relative overflow-hidden py-24 md:py-32">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[440px] w-[440px] -translate-x-1/2 rounded-full bg-yellow-500/[0.08] blur-[140px]" />

      <div className="container relative">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-black uppercase tracking-[0.3em] text-yellow-300">
              Selected Work
            </p>
            <h2 className="text-4xl font-black tracking-[-0.04em] md:text-6xl">
              Projects that make the <span className="gold-text">difference.</span>
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-400 md:text-lg">
              Explore a selection of websites and digital experiences created for businesses that want a stronger online presence.
            </p>
          </div>

          <Link
            href="/portfolio"
            className="inline-flex w-fit items-center gap-2 rounded-full border border-yellow-400/25 bg-yellow-400/[0.07] px-5 py-3 text-sm font-bold text-yellow-200 transition hover:bg-yellow-400/[0.12]"
          >
            View All Projects
            <ArrowRight size={17} />
          </Link>
        </div>

        <div className="mt-14 grid gap-7 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {projects.length === 0 && (
          <div className="mt-14 rounded-[30px] border border-white/10 bg-white/[0.04] p-10 text-center text-zinc-400">
            No featured projects added yet.
          </div>
        )}
      </div>
    </section>
  );
}
