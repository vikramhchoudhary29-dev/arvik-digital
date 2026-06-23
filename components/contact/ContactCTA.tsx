import { ArrowRight } from "lucide-react";
import { createWhatsAppLink } from "@/lib/whatsapp";

export default function ContactCTA() {
  return (
    <section className="py-24">
      <div className="container">
        <div className="rounded-[40px] border border-yellow-400/20 bg-gradient-to-br from-yellow-400/10 via-white/[0.04] to-black p-14 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-yellow-300">
            Quick Enquiry
          </p>

          <h2 className="mt-5 text-5xl font-black">
            Prefer WhatsApp?
            <span className="gold-text"> Chat Directly</span>
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-zinc-400">
            Send us your requirement directly on WhatsApp and our team will
            guide you with the best digital solution.
          </p>

          <a
            href={createWhatsAppLink(
              "Hello Arvik Digital, I would like to discuss my project."
            )}
            target="_blank"
            className="mt-10 inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-yellow-300 to-yellow-600 px-8 py-4 font-bold text-black transition hover:scale-105"
          >
            Chat on WhatsApp
            <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}