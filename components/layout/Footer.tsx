import { createWhatsAppLink } from "@/lib/whatsapp";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-16">
      <div className="container grid gap-12 md:grid-cols-2 lg:grid-cols-4">

        <div>
          <h2 className="text-3xl font-black gold-text">
            ARVIK DIGITAL
          </h2>

          <p className="mt-5 text-zinc-400 leading-8">
            Premium Web Development, Custom Software, AI Solutions and Digital
            Marketing for modern businesses.
          </p>
        </div>

        <div>
          <h3 className="font-bold text-xl mb-5">
            Quick Links
          </h3>

          <ul className="space-y-3 text-zinc-400">
            <li>Home</li>
            <li>Services</li>
            <li>Portfolio</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-xl mb-5">
            Services
          </h3>

          <ul className="space-y-3 text-zinc-400">
            <li>Website Development</li>
            <li>Custom Web Apps</li>
            <li>AI Solutions</li>
            <li>Graphic Design</li>
            <li>Digital Marketing</li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-xl mb-5">
            Contact
          </h3>

          <ul className="space-y-3 text-zinc-400">
            <li>WhatsApp</li>
            <li>Email</li>
            <li>Maharashtra, India</li>
          </ul>

          <a
            href={createWhatsAppLink(
              "Hello Arvik Digital"
            )}
            target="_blank"
            className="inline-block mt-6 rounded-xl bg-yellow-500 px-5 py-3 font-bold text-black"
          >
            Chat on WhatsApp
          </a>
        </div>

      </div>

      <div className="container mt-14 border-t border-white/10 pt-8 flex flex-col gap-3 text-center md:flex-row md:justify-between text-zinc-500 text-sm">
        <p>© 2026 Arvik Digital. All Rights Reserved.</p>

        <p>Designed & Developed by Arvik Digital</p>
      </div>
    </footer>
  );
}