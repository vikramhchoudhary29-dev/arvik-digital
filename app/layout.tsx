import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://example.com"),

  title: {
    default: "Arvik Digital",
    template: "%s | Arvik Digital",
  },

  description:
    "Premium Website Development, Web Applications, AI Solutions and Digital Marketing.",

  keywords: [
    "Arvik Digital",
    "Website Development",
    "Web Design",
    "Digital Marketing",
    "SEO",
    "AI Solutions",
  ],

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },

  openGraph: {
    title: "Arvik Digital",
    description:
      "Premium Website Development, Web Applications, AI Solutions and Digital Marketing.",
    images: ["/logo.png"],
  },
};