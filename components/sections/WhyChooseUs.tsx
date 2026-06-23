"use client";

import {
  Rocket,
  Zap,
  Smartphone,
  Search,
  ShieldCheck,
  Headphones,
} from "lucide-react";

const features = [
  {
    icon: Rocket,
    title: "100% Custom Development",
    desc: "Every website is custom-built according to your business, brand, services, and customer journey.",
  },
  {
    icon: Zap,
    title: "Fast Performance",
    desc: "Optimized structure, clean code, and fast-loading pages designed for better user experience.",
  },
  {
    icon: Smartphone,
    title: "Mobile Responsive",
    desc: "Your website will look premium and work smoothly on mobile, tablet, laptop, and desktop screens.",
  },
  {
    icon: Search,
    title: "SEO Optimized",
    desc: "Basic SEO structure, clean headings, meta setup, fast loading, and search-friendly page layout.",
  },
  {
    icon: ShieldCheck,
    title: "Secure & Scalable",
    desc: "Built with modern technologies so your website stays secure, reliable, and ready to grow.",
  },
  {
    icon: Headphones,
    title: "Dedicated Support",
    desc: "We provide proper guidance, updates, and technical support even after project completion.",
  },
];

export default function WhyChooseUs() {
  return (
    <section id="about" className="relative overflow-hidden py-28">
      <div className="absolute left-0 top-1/3 h-[420px] w-[420px] rounded-full bg-yellow-500/10 blur-[130px]" />
      <div className="absolute right-0 bottom-0 h-[360px] w-[360px] rounded-full bg-white/5 blur-[110px]" />

      <div className="container relative">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-yellow-300">
              Why Choose Us
            </p>

            <h2 className="text-4xl font-black tracking-tight md:text-6xl">
              Why Businesses Choose{" "}
              <span className="gold-text">Arvik Digital</span>
            </h2>

            <p className="mt-6 text-lg leading-8 text-zinc-400">
              We focus on building websites that do more than look good. Every
              project is planned for performance, trust, user experience, and
              business enquiries.
            </p>

            <div className="mt-9 rounded-[32px] border border-yellow-400/20 bg-yellow-400/[0.06] p-6 backdrop-blur-xl">
              <h3 className="text-2xl font-black text-yellow-100">
                Built for real business growth
              </h3>

              <p className="mt-3 leading-7 text-zinc-300">
                From the first section to the final enquiry button, every part of
                your website is designed to convert visitors into customers.
              </p>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {features.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="group relative overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-yellow-400/35 hover:bg-yellow-400/[0.055]"
                >
                  <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-yellow-400/10 blur-3xl transition group-hover:bg-yellow-400/20" />

                  <div className="relative">
                    <div className="mb-5 flex h-13 w-13 items-center justify-center rounded-2xl border border-yellow-400/25 bg-yellow-400/10 text-yellow-300">
                      <Icon size={24} />
                    </div>

                    <h3 className="text-xl font-black">{item.title}</h3>

                    <p className="mt-3 leading-7 text-zinc-400">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}