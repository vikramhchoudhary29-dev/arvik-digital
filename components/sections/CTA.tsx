import { ArrowRight } from "lucide-react";
import { createWhatsAppLink } from "@/lib/whatsapp";

export default function CTA() {
  return (
    <section className="py-28">
      <div className="container">
        <div className="relative overflow-hidden rounded-[40px] border border-yellow-400/20 bg-gradient-to-br from-yellow-400/10 via-white/[0.04] to-black p-14 text-center">

          <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-yellow-500/20 blur-[120px]" />

          <div className="relative">

            <p className="uppercase tracking-[0.3em] text-yellow-300 text-sm font-bold">
              Let's Work Together
            </p>

            <h2 className="mt-5 text-5xl font-black">
              Ready To Build Something
              <span className="gold-text"> Amazing?</span>
            </h2>

            <p className="mt-6 text-zinc-300 max-w-3xl mx-auto leading-8 text-lg">
              Whether you need a premium website, custom software, AI solution,
              or complete digital branding, we're ready to help your business
              grow.
            </p>

            <a
              href={createWhatsAppLink(
                "Hello Arvik Digital, I would like to discuss my project."
              )}
              target="_blank"
              className="inline-flex mt-10 items-center gap-3 rounded-2xl bg-gradient-to-r from-yellow-300 to-yellow-600 px-8 py-4 font-bold text-black transition hover:scale-105"
            >
              Get Free Quote
              <ArrowRight size={18} />
            </a>

          </div>
        </div>
      </div>
    </section>
  );
}