"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "How long does website development take?",
    a: "Most websites are completed within 7–20 days depending on project scope.",
  },
  {
    q: "Do you provide domain and hosting?",
    a: "Yes. We can provide domain registration, hosting, SSL, and complete deployment.",
  },
  {
    q: "Can you redesign my existing website?",
    a: "Absolutely. We can modernize your current website while keeping your existing content.",
  },
  {
    q: "Do you provide maintenance after launch?",
    a: "Yes. We provide website management, updates, backups, and ongoing support.",
  },
  {
    q: "Will my website work on mobile devices?",
    a: "Every website we build is fully responsive and optimized for mobile, tablet, and desktop.",
  },
];

export default function ServicesFAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-24">
      <div className="container max-w-4xl">
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-yellow-300">
            FAQ
          </p>

          <h2 className="mt-4 text-5xl font-black">
            Frequently Asked
            <span className="gold-text"> Questions</span>
          </h2>
        </div>

        <div className="mt-14 space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={faq.q}
              className="rounded-3xl border border-white/10 bg-white/[0.04]"
            >
              <button
                onClick={() =>
                  setOpen(open === index ? null : index)
                }
                className="flex w-full items-center justify-between p-6 text-left"
              >
                <span className="font-bold">{faq.q}</span>

                <ChevronDown
                  className={`transition ${
                    open === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              {open === index && (
                <div className="px-6 pb-6 text-zinc-400 leading-7">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}