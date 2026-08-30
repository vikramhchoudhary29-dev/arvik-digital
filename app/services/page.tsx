import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import ServicesHero from "@/components/services/ServicesHero";
import ServiceSection from "@/components/services/ServiceSection";
import WhyChooseServices from "@/components/services/WhyChooseServices";
import ServicesFAQ from "@/components/services/ServicesFAQ";
import ServicesCTA from "@/components/services/ServicesCTA";

import { getServices } from "@/lib/data/services";

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <main>
      <Navbar />

      <ServicesHero />

{services.map((service: any, index: number) => (        <ServiceSection
          key={service.id}
          service={{
            id: Number(index + 1),
            title: service.title,
            slug: service.slug,
            shortDescription: service.shortDesc,
            fullDescription: service.description,
            features: service.benefits,
            technologies: [],
          }}
          reverse={index % 2 === 1}
        />
      ))}

      <WhyChooseServices />
      <ServicesFAQ />
      <ServicesCTA />

      <Footer />
    </main>
  );
}