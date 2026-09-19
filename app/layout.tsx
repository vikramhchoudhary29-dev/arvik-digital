import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://arvikdigital.in"),

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="noise" />
        {children}
      </body>
    </html>
  );
}