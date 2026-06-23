import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ServicesCTA from "@/components/services/ServicesCTA";
import { getService } from "@/lib/data/services";
import { CheckCircle } from "lucide-react";
import { notFound } from "next/navigation";

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = await getService(slug);

  if (!service) notFound();

  return (
    <main>
      <Navbar />

      <section className="relative overflow-hidden pt-36 pb-20 hero-grid">
        <div className="absolute left-1/2 top-0 h-[460px] w-[460px] -translate-x-1/2 rounded-full bg-yellow-500/15 blur-[150px]" />

        <div className="container relative">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-yellow-300">
            Service
          </p>

          <h1 className="max-w-5xl text-5xl font-black leading-tight md:text-7xl">
            {service.title}
          </h1>

          <p className="mt-7 max-w-3xl text-lg leading-8 text-zinc-400">
            {service.description}
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <div className="rounded-[34px] border border-white/10 bg-white/[0.04] p-8">
            <h2 className="text-3xl font-black">Benefits</h2>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {service.benefits.map((benefit) => (
                <div
                  key={benefit}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/30 p-4"
                >
                  <CheckCircle className="text-yellow-300" size={20} />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ServicesCTA />
      <Footer />
    </main>
  );
}