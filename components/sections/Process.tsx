"use client";

import {
  Search,
  ClipboardList,
  PenTool,
  Code2,
  Bug,
  Rocket,
  Headphones,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Discovery",
    desc: "We understand your business, goals, services, target customers, and exact website requirements.",
    icon: Search,
  },
  {
    number: "02",
    title: "Planning",
    desc: "We plan the page structure, content flow, features, CTA strategy, and conversion journey.",
    icon: ClipboardList,
  },
  {
    number: "03",
    title: "UI Design",
    desc: "We create a premium layout with modern visuals, clean spacing, and strong brand presentation.",
    icon: PenTool,
  },
  {
    number: "04",
    title: "Development",
    desc: "We build the website using modern, scalable, fast, and responsive technologies.",
    icon: Code2,
  },
  {
    number: "05",
    title: "Testing",
    desc: "We test mobile responsiveness, speed, forms, links, WhatsApp buttons, and browser compatibility.",
    icon: Bug,
  },
  {
    number: "06",
    title: "Launch",
    desc: "We deploy the website, connect domain, configure SEO basics, and make it live.",
    icon: Rocket,
  },
  {
    number: "07",
    title: "Support",
    desc: "We provide after-launch support, updates, guidance, and technical assistance.",
    icon: Headphones,
  },
];

export default function Process() {
  return (
    <section className="relative overflow-hidden py-28">
      <div className="absolute bottom-0 left-0 h-[420px] w-[420px] rounded-full bg-yellow-500/10 blur-[130px]" />

      <div className="container relative">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-yellow-300">
            Our Process
          </p>

          <h2 className="text-4xl font-black tracking-tight md:text-6xl">
            From Idea To{" "}
            <span className="gold-text">Live Website</span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-zinc-400">
            A clear and professional development process helps us deliver better
            websites with less confusion and faster execution.
          </p>
        </div>

        <div className="relative mt-18">
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-yellow-400/40 to-transparent lg:block" />

          <div className="space-y-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isLeft = index % 2 === 0;

              return (
                <div
                  key={step.title}
                  className={`relative grid gap-6 lg:grid-cols-2 ${
                    isLeft ? "" : "lg:[&>div:first-child]:col-start-2"
                  }`}
                >
                  <div
                    className={`group relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.045] p-7 backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-yellow-400/35 ${
                      isLeft ? "lg:mr-10" : "lg:ml-10"
                    }`}
                  >
                    <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-yellow-400/10 blur-3xl transition group-hover:bg-yellow-400/20" />

                    <div className="relative">
                      <div className="mb-6 flex items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-yellow-400/25 bg-yellow-400/10 text-yellow-300">
                          <Icon size={25} />
                        </div>

                        <span className="gold-text text-4xl font-black">
                          {step.number}
                        </span>
                      </div>

                      <h3 className="text-2xl font-black">{step.title}</h3>

                      <p className="mt-4 leading-7 text-zinc-400">
                        {step.desc}
                      </p>
                    </div>
                  </div>

                  <div className="absolute left-1/2 top-10 hidden h-5 w-5 -translate-x-1/2 rounded-full border border-yellow-400 bg-black shadow-[0_0_30px_rgba(212,175,55,0.55)] lg:block" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}