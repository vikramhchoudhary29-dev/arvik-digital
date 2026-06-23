import { ArrowRight } from "lucide-react";
import { createWhatsAppLink } from "@/lib/whatsapp";

export default function ServicesCTA() {
  return (
    <section className="py-24">
      <div className="container">
        <div className="rounded-[40px] border border-yellow-400/20 bg-gradient-to-br from-yellow-400/10 via-white/[0.04] to-black p-14 text-center">

          <p className="text-sm font-bold uppercase tracking-[0.3em] text-yellow-300">
            Let's Build Together
          </p>

          <h2 className="mt-5 text-5xl font-black">
            Ready To Grow Your
            <span className="gold-text"> Business?</span>
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-zinc-400">
            Let's discuss your project and create a premium digital solution
            tailored specifically for your business.
          </p>

          <a
            href={createWhatsAppLink(
              "Hello Arvik Digital, I would like a quotation for my project."
            )}
            target="_blank"
            className="mt-10 inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-yellow-300 to-yellow-600 px-8 py-4 font-bold text-black transition hover:scale-105"
          >
            Get Free Quote
            <ArrowRight size={18} />
          </a>

        </div>
      </div>
    </section>
  );
}