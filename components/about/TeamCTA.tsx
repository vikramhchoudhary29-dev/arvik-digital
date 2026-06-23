import { ArrowRight } from "lucide-react";
import { createWhatsAppLink } from "@/lib/whatsapp";

export default function TeamCTA() {
  return (
    <section className="py-24">
      <div className="container">
        <div className="relative overflow-hidden rounded-[40px] border border-yellow-400/20 bg-gradient-to-br from-yellow-400/10 via-white/[0.04] to-black p-14 text-center">
          <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-yellow-500/20 blur-[120px]" />

          <div className="relative">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-yellow-300">
              Work With Us
            </p>

            <h2 className="mt-5 text-5xl font-black">
              Let’s Build Your
              <span className="gold-text"> Digital Future</span>
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-zinc-400">
              Partner with Arvik Digital to create a premium website, custom
              web application, AI solution, or complete digital identity for
              your business.
            </p>

            <a
              href={createWhatsAppLink(
                "Hello Arvik Digital, I would like to discuss a project."
              )}
              target="_blank"
              className="mt-10 inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-yellow-300 to-yellow-600 px-8 py-4 font-bold text-black transition hover:scale-105"
            >
              Start Conversation
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}