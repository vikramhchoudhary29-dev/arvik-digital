"use client";

import { useMemo, useState } from "react";
import SearchBar from "@/components/portfolio/SearchBar";
import CategoryFilter from "@/components/portfolio/CategoryFilter";
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
};

export default function PortfolioGrid({ projects }: { projects: Project[] }) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = useMemo(() => {
    return ["All", ...Array.from(new Set(projects.map((p) => p.category)))];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        project.title.toLowerCase().includes(search.toLowerCase()) ||
        project.category.toLowerCase().includes(search.toLowerCase()) ||
        project.description.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        activeCategory === "All" || project.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory, projects]);

  return (
    <section className="relative py-20">
      <div className="container">
        <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
          <SearchBar value={search} onChange={setSearch} />

          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            onChange={setActiveCategory}
          />
        </div>

        <div className="mt-12 grid gap-7 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="mt-16 rounded-[32px] border border-white/10 bg-white/[0.04] p-10 text-center">
            <h3 className="text-2xl font-black">No Projects Found</h3>
            <p className="mt-3 text-zinc-400">
              Try another keyword or category.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}