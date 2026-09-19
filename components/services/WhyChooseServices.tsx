"use client";

import {
  ShieldCheck,
  Zap,
  Smartphone,
  Search,
  Headphones,
  Rocket,
} from "lucide-react";

const features = [
  {
    title: "100% Custom Design",
    desc: "Every website is designed specifically for your business.",
    icon: ShieldCheck,
  },
  {
    title: "Lightning Fast",
    desc: "Optimized for speed and excellent performance.",
    icon: Zap,
  },
  {
    title: "SEO Optimized",
    desc: "Built to rank better on Google.",
    icon: Search,
  },
  {
    title: "Fully Responsive",
    desc: "Perfect experience on every device.",
    icon: Smartphone,
  },
  {
    title: "Lifetime Guidance",
    desc: "We're always here whenever you need help.",
    icon: Headphones,
  },
  {
    title: "Future Ready",
    desc: "Scalable architecture for business growth.",
    icon: Rocket,
  },
];

export default function WhyChooseServices() {
  return (
    <section className="py-24">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-yellow-300">
            Why Choose Arvik Digital
          </p>

          <h2 className="mt-4 text-5xl font-black">
            Built For
            <span className="gold-text"> Business Growth</span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-zinc-400">
            We don't just design websites—we build digital experiences that help
            businesses attract more customers and grow faster.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {features.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="group rounded-[30px] border border-white/10 bg-white/[0.04] p-7 backdrop-blur-xl transition hover:-translate-y-2 hover:border-yellow-400/30"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-400/10 text-yellow-300">
                  <Icon size={26} />
                </div>

                <h3 className="text-2xl font-black">{item.title}</h3>

                <p className="mt-4 leading-7 text-zinc-400">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}