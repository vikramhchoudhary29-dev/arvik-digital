"use client";

import { Star } from "lucide-react";

type Testimonial = {
  id: string;
  name: string;
  company: string | null;
  designation: string | null;
  review: string;
  rating: number;
  image: string | null;
};

export default function Testimonials({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  return (
    <section className="relative overflow-hidden py-28">
      <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-yellow-500/10 blur-[140px]" />

      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-yellow-300">
            Testimonials
          </p>

          <h2 className="mt-4 text-5xl font-black">
            What Our <span className="gold-text">Clients Say</span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-zinc-400">
            We build long-term relationships by delivering premium quality,
            reliable support, and business-focused digital solutions.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="group rounded-[30px] border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl transition hover:-translate-y-2 hover:border-yellow-400/30"
            >
              <div className="flex gap-1 text-yellow-400">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <Star key={i} size={18} fill="currentColor" />
                ))}
              </div>

              <p className="mt-6 leading-8 text-zinc-300">
                "{item.review}"
              </p>

              <div className="mt-8">
                <h3 className="text-xl font-black">{item.name}</h3>

                <p className="text-zinc-400">
                  {item.designation
                    ? `${item.designation} • ${item.company ?? ""}`
                    : item.company}
                </p>
              </div>
            </div>
          ))}
        </div>

        {testimonials.length === 0 && (
          <div className="mt-16 rounded-[30px] border border-white/10 bg-white/[0.04] p-10 text-center text-zinc-400">
            No testimonials added yet.
          </div>
        )}
      </div>
    </section>
  );
}