import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PortfolioHero from "@/components/portfolio/PortfolioHero";
import PortfolioGrid from "@/components/portfolio/PortfolioGrid";
import { getProjects } from "@/lib/data/projects";

export const dynamic = "force-dynamic";

export default async function PortfolioPage() {
  const projects = await getProjects();

  return (
    <main>
      <Navbar />
      <PortfolioHero />
      <PortfolioGrid projects={projects} />
      <Footer />
    </main>
  );
}