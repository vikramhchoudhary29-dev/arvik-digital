import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import ContactHero from "@/components/contact/ContactHero";
import ContactInfo from "@/components/contact/ContactInfo";
import ContactForm from "@/components/contact/ContactForm";
import MapSection from "@/components/contact/MapSection";
import ContactCTA from "@/components/contact/ContactCTA";

export default function ContactPage() {
  return (
    <main>
      <Navbar />
      <ContactHero />

      <section className="py-24">
        <div className="container grid gap-10 lg:grid-cols-[0.45fr_0.55fr]">
          <ContactInfo />
          <ContactForm />
        </div>
      </section>

      <MapSection />
      <ContactCTA />
      <Footer />
    </main>
  );
}