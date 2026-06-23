"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";
import { createWhatsAppLink, quoteMessage } from "@/lib/whatsapp";

const navLinks = [
  { name: "Home", href: "#" },
  { name: "Services", href: "#services" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed left-0 top-0 z-40 w-full border-b border-white/10 bg-black/35 backdrop-blur-xl">
      <div className="container flex h-20 items-center justify-between">
        {/* Logo */}
       <a href="/" className="flex items-center gap-3">
  <img
    src="/logo.png"
    alt="Arvik Digital"
    className="h-15 w-15 rounded-xl object-contain"
  />

  <div className="leading-none">
    <h2 className="text-lg font-black tracking-[0.18em] text-white">
      ARVIK
    </h2>
    <p className="mt-1 text-xs font-bold tracking-[0.3em] text-yellow-300">
      DIGITAL
    </p>
  </div>
</a>

        {/* Desktop Menu */}
        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-zinc-300 transition hover:text-yellow-300"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Desktop Button */}
        <a
          href={createWhatsAppLink(quoteMessage)}
          target="_blank"
          className="hidden rounded-2xl bg-gradient-to-r from-yellow-300 to-yellow-600 px-5 py-3 text-sm font-bold text-black shadow-lg shadow-yellow-500/20 transition hover:scale-105 lg:inline-flex"
        >
          Get Quote
        </a>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 lg:hidden"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="border-t border-white/10 bg-black/95 px-5 py-6 lg:hidden">
          <div className="flex flex-col gap-5">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-zinc-300 transition hover:text-yellow-300"
              >
                {link.name}
              </a>
            ))}

            <a
              href={createWhatsAppLink(quoteMessage)}
              target="_blank"
              className="rounded-2xl bg-gradient-to-r from-yellow-300 to-yellow-600 px-5 py-3 text-center font-bold text-black"
            >
              Get Quote
            </a>
          </div>
        </div>
      )}
    </header>
  );
}