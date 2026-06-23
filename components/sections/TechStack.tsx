"use client";

import {
  Atom,
  Code2,
  Database,
  Cloud,
  Palette,
  Server,
  Shield,
  Zap,
} from "lucide-react";

const technologies = [
  { name: "React", icon: Atom },
  { name: "Next.js", icon: Code2 },
  { name: "TypeScript", icon: Code2 },
  { name: "Tailwind CSS", icon: Palette },
  { name: "Node.js", icon: Server },
  { name: "PostgreSQL", icon: Database },
  { name: "Prisma", icon: Database },
  { name: "Cloudinary", icon: Cloud },
  { name: "Vercel", icon: Cloud },
  { name: "Framer Motion", icon: Zap },
  { name: "SEO", icon: Shield },
  { name: "Performance", icon: Zap },
];

export default function TechStack() {
  return (
    <section className="relative overflow-hidden py-28">
      <div className="absolute left-1/2 top-0 h-[430px] w-[430px] -translate-x-1/2 rounded-full bg-yellow-500/10 blur-[140px]" />

      <div className="container relative">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-yellow-300">
            Tech Stack
          </p>

          <h2 className="text-4xl font-black tracking-tight md:text-6xl">
            Built With Modern{" "}
            <span className="gold-text">Technologies</span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-zinc-400">
            We use reliable, scalable, and performance-focused technologies to
            build premium websites and custom digital systems.
          </p>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {technologies.map((tech) => {
            const Icon = tech.icon;

            return (
              <div
                key={tech.name}
                className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-yellow-400/35 hover:bg-yellow-400/[0.055]"
              >
                <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-yellow-400/10 blur-3xl transition group-hover:bg-yellow-400/20" />

                <div className="relative flex items-center gap-4">
                  <div className="flex h-13 w-13 items-center justify-center rounded-2xl border border-yellow-400/25 bg-yellow-400/10 text-yellow-300">
                    <Icon size={24} />
                  </div>

                  <h3 className="text-lg font-black">{tech.name}</h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}