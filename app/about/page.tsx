import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import AboutHero from "@/components/about/AboutHero";
import CompanyStory from "@/components/about/CompanyStory";
import MissionVision from "@/components/about/MissionVision";
import Stats from "@/components/about/Stats";
import TeamCTA from "@/components/about/TeamCTA";

export default function AboutPage() {
  return (
    <main>
      <Navbar />
      <AboutHero />
      <CompanyStory />
      <MissionVision />
      <Stats />
      <TeamCTA />
      <Footer />
    </main>
  );
}