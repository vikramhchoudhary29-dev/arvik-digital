import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CTA from "@/components/sections/CTA";
import { getProject } from "@/lib/data/projects";
import { CheckCircle, ExternalLink } from "lucide-react";
import { notFound } from "next/navigation";

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) notFound();

  return (
    <main>
      <Navbar />

      <section className="relative overflow-hidden pt-36 pb-20 hero-grid">
        <div className="absolute left-1/2 top-0 h-[460px] w-[460px] -translate-x-1/2 rounded-full bg-yellow-500/15 blur-[150px]" />

        <div className="container relative">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-yellow-300">
            {project.category}
          </p>

          <h1 className="max-w-5xl text-5xl font-black leading-tight md:text-7xl">
            {project.title}
          </h1>

          <p className="mt-7 max-w-3xl text-lg leading-8 text-zinc-400">
            {project.description}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <span className="rounded-full bg-green-400/10 px-4 py-2 text-sm font-bold text-green-300">
              {project.status}
            </span>

            <span className="rounded-full border border-yellow-400/20 bg-yellow-400/10 px-4 py-2 text-sm text-yellow-200">
              {project.completedDate}
            </span>
          </div>

          <a
            href={project.liveUrl || "#"}
            target="_blank"
            className="mt-10 inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-yellow-300 to-yellow-600 px-7 py-4 font-bold text-black"
          >
            Visit Live Website
            <ExternalLink size={18} />
          </a>
        </div>
      </section>

      <section className="py-20">
        <div className="container grid gap-8 lg:grid-cols-2">
          <div className="rounded-[34px] border border-white/10 bg-white/[0.04] p-8">
            <h2 className="text-3xl font-black">Technologies</h2>

            <div className="mt-8 flex flex-wrap gap-3">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-white/10 bg-black/30 px-4 py-2 text-zinc-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-[34px] border border-white/10 bg-white/[0.04] p-8">
            <h2 className="text-3xl font-black">Features</h2>

            <div className="mt-8 grid gap-4">
              {project.features.map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <CheckCircle className="text-yellow-300" size={20} />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTA />
      <Footer />
    </main>
  );
}