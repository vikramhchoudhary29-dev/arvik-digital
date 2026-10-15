import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import Hero from "@/components/sections/Hero";
import TrustBar from "@/components/sections/TrustBar";
import Services from "@/components/sections/Services";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import TechStack from "@/components/sections/TechStack";
import Process from "@/components/sections/Process";
import Testimonials from "@/components/sections/Testimonials";
import CTA from "@/components/sections/CTA";
import TeamSection from "@/components/team/TeamSection";

import { getHomepageServices } from "@/lib/data/services";
import { getHomepageProjects } from "@/lib/data/projects";
import { getHomepageTestimonials } from "@/lib/data/testimonials";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function Home() {
  const services = await getHomepageServices();
  const projects = await getHomepageProjects();
  const testimonials = await getHomepageTestimonials();
  const teamMembers = await prisma.teamMember.findMany({ where: { visible: true }, orderBy: [{ order: "asc" }, { createdAt: "asc" }] });

  return (
    <main>
      <Navbar />
      <Hero />
      <TrustBar />
      <Services services={services} />
      <FeaturedProjects projects={projects} />
      <TeamSection members={teamMembers} />
      <WhyChooseUs />
      <TechStack />
      <Process />
      <Testimonials testimonials={testimonials} />
      <CTA />
      <Footer />
    </main>
  );
}