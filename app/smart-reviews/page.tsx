import type { Metadata } from "next";
import { ArrowRight, BarChart3, Check, ClipboardCheck, MessageSquareText, Nfc, QrCode, ShieldCheck, Smartphone, Store } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { createWhatsAppLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "NFC & QR Google Review Stands — Smart Reviews",
  description: "Branded NFC and QR stands, editable review drafts and activity insights. Make it easier for customers to share genuine feedback with Arvik Smart Reviews.",
  alternates: { canonical: "/smart-reviews" },
  openGraph: { title: "Arvik Smart Reviews | Tap. Scan. Share.", description: "A simpler journey from your counter to customer feedback.", url: "/smart-reviews", images: ["/logo.png"] },
};
const enquiry = createWhatsAppLink("Hello Arvik Digital, I am interested in NFC Smart Reviews. Please share a demo and a quote for a branded NFC + QR stand.");
const features = [
  { icon: Nfc, title: "One stand. Two ways to connect.", copy: "A quick NFC tap on a compatible phone, or a QR scan. Give customers a convenient way to reach your review page." },
  { icon: Store, title: "Your business, front and centre.", copy: "A branded feedback page connected to your business and Google review destination. Manage stands across locations." },
  { icon: MessageSquareText, title: "Help finding the right words.", copy: "Optional, editable English review drafts based on the customer’s selected experience and notes. Their feedback stays their own." },
  { icon: BarChart3, title: "See the journey clearly.", copy: "Track page visits, draft generation, copies and Google outbound clicks. Outbound clicks are not confirmed published reviews." },
];
const steps = [
  ["01", "Tap or scan", "The customer opens your business feedback page from the NFC or QR stand."],
  ["02", "Share their experience", "They choose what mattered and can add their own notes or use an editable draft."],
  ["03", "Continue to Google", "They copy their text, choose their Google star rating and decide whether to publish."],
];
const faqs = [
  ["Does it post reviews automatically?", "No. Customers choose, edit and copy their feedback, then decide whether to publish it on Google. We do not post on their behalf or guarantee reviews or ratings."],
  ["Do customers need an app?", "No dedicated app or Arvik account is required. NFC needs a compatible phone; QR scanning provides another way to open the page. Google may require sign-in to post a review."],
  ["Can customers share negative feedback?", "Yes. Positive, neutral and critical experiences can all continue to Google. The flow does not filter customers based on sentiment or offer rewards for reviews."],
  ["Can I use it for more than one location?", "Yes. The platform supports multiple businesses and stands. Tell us your locations and stand requirements so we can recommend the right setup."],
  ["What does the package cost?", "Request a quote for your branded stand and setup. We will confirm quantity, customisation, delivery, platform access and any ongoing charges before you order."],
];
export default function SmartReviewsPage() {
  return <><Navbar /><main id="main-content" className="pt-20">
    <section className="hero-grid relative overflow-hidden border-b border-white/10">
      <div className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-yellow-500/10 blur-3xl" aria-hidden="true" />
      <div className="container grid items-center gap-14 py-20 lg:grid-cols-[1.1fr_1fr] lg:py-28">
        <div><p className="mb-6 inline-flex items-center gap-2 rounded-full border border-yellow-300/25 bg-yellow-300/5 px-4 py-2 text-xs font-bold tracking-widest text-yellow-200"><Nfc size={16} aria-hidden="true" /> ARVIK SMART REVIEWS</p>
          <h1 className="text-4xl font-black leading-[1.12] tracking-tight sm:text-6xl">Great experiences.<br /><span className="gold-text">Make them easier<br />to share.</span></h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-zinc-400">Turn a simple tap or scan into an easier Google review journey. Branded NFC + QR stands help your customers share honest feedback, in their own words.</p>
          <div className="mt-9 flex flex-wrap gap-4"><a href={enquiry} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-yellow-300 px-6 py-4 font-bold text-black transition hover:bg-yellow-200">Request a demo <ArrowRight size={18} aria-hidden="true" /></a><a href="#how-it-works" className="rounded-xl border border-white/20 px-6 py-4 font-semibold transition hover:bg-white/5">See how it works</a></div>
          <p className="mt-6 text-sm text-zinc-500">No customer app. No automatic posting. Just genuine feedback.</p>
        </div>
        <div className="relative mx-auto w-full max-w-md rounded-3xl border border-yellow-300/20 bg-gradient-to-br from-zinc-900 to-black p-7 shadow-2xl shadow-yellow-500/10 sm:p-10">
          <p className="text-xs font-bold tracking-[.25em] text-yellow-200">YOUR BUSINESS. THEIR WORDS.</p>
          <div className="my-8 rounded-2xl border border-white/10 bg-black/60 p-8 text-center"><Nfc size={52} className="mx-auto text-yellow-300" aria-hidden="true" /><p className="mt-5 text-2xl font-black">Tap. Scan. Share.</p><p className="mt-3 text-sm leading-6 text-zinc-400">Tell us about your experience.</p><div className="mt-6 flex items-center justify-center gap-4 text-zinc-400"><Smartphone size={28} aria-hidden="true" /><span className="h-px w-10 bg-yellow-300/30" /><QrCode size={40} aria-hidden="true" /></div></div>
          <div className="flex items-center gap-3 text-sm text-zinc-300"><ShieldCheck size={20} className="shrink-0 text-yellow-300" aria-hidden="true" />Customer choice at every step.</div><p className="mt-6 text-xs text-zinc-500">Illustrative stand concept. Design customised for your brand. QR icon is not scannable.</p>
        </div>
      </div>
    </section>
    <section id="how-it-works" className="container scroll-mt-24 py-20"><p className="text-xs font-bold tracking-widest text-yellow-300">FROM YOUR COUNTER TO THEIR FEEDBACK</p><h2 className="mt-4 text-3xl font-bold sm:text-4xl">Three simple steps. A human touch.</h2><div className="mt-10 grid gap-5 md:grid-cols-3">{steps.map(([number,title,copy])=><article key={number} className="rounded-2xl border border-white/10 bg-white/[.025] p-7"><span className="text-sm font-bold text-yellow-300">{number}</span><h3 className="mt-5 text-xl font-bold">{title}</h3><p className="mt-3 leading-7 text-zinc-400">{copy}</p></article>)}</div></section>
    <section className="border-y border-white/10 bg-white/[.02] py-20"><div className="container"><p className="text-xs font-bold tracking-widest text-yellow-300">MORE THAN A REVIEW LINK</p><h2 className="mt-4 text-3xl font-bold sm:text-4xl">A thoughtful experience.<br />Useful visibility for your team.</h2><div className="mt-12 grid gap-8 sm:grid-cols-2">{features.map(({icon:Icon,title,copy})=><article key={title} className="flex gap-5"><div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-yellow-300/20 bg-yellow-300/5 text-yellow-300"><Icon size={23} aria-hidden="true" /></div><div><h3 className="text-lg font-bold">{title}</h3><p className="mt-3 max-w-lg leading-7 text-zinc-400">{copy}</p></div></article>)}</div></div></section>
    <section className="container grid gap-12 py-20 lg:grid-cols-2"><div><p className="text-xs font-bold tracking-widest text-yellow-300">MADE FOR REAL-WORLD BUSINESSES</p><h2 className="mt-4 text-3xl font-bold sm:text-4xl">Put feedback within reach.</h2><p className="mt-5 leading-8 text-zinc-400">At the reception desk, checkout counter or table — give customers a convenient moment to share their experience.</p><div className="mt-6 flex flex-wrap gap-2">{["Jewellery stores","Restaurants & cafés","Salons","Hotels","Clinics","Retail & local services"].map(label=><span key={label} className="rounded-full border border-white/10 px-4 py-2 text-sm text-zinc-300">{label}</span>)}</div></div><div className="rounded-2xl border border-yellow-300/20 bg-yellow-300/[.04] p-8"><ClipboardCheck size={28} className="text-yellow-300" aria-hidden="true" /><h3 className="mt-5 text-2xl font-bold">Let’s plan your setup.</h3><ul className="my-6 space-y-4 text-zinc-300">{["Branded NFC + QR stand options","Business page and Google destination setup","Stand and location management","Activity reporting and onboarding guidance"].map(text=><li key={text} className="flex gap-3"><Check size={18} className="mt-1 shrink-0 text-yellow-300" aria-hidden="true" />{text}</li>)}</ul><a href={enquiry} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-bold text-yellow-200 underline underline-offset-4">Get a customised quote <ArrowRight size={18} aria-hidden="true" /></a></div></section>
    <section className="container pb-20"><h2 className="text-3xl font-bold sm:text-4xl">A few things to know.</h2><div className="mt-8 max-w-4xl divide-y divide-white/10">{faqs.map(([question,answer])=><details key={question} className="py-5"><summary className="cursor-pointer text-lg font-semibold text-zinc-200 focus-visible:outline-2 focus-visible:outline-yellow-300">{question}</summary><p className="mt-4 max-w-3xl leading-7 text-zinc-400">{answer}</p></details>)}</div></section>
    <section className="border-t border-yellow-300/20 bg-gradient-to-r from-yellow-300/10 to-transparent py-16"><div className="container flex flex-col justify-between gap-8 md:flex-row md:items-center"><div><p className="text-xs font-bold tracking-widest text-yellow-300">START WITH A CONVERSATION</p><h2 className="mt-3 text-3xl font-bold">Give your customers a simpler way to share.</h2></div><a href={enquiry} target="_blank" rel="noopener noreferrer" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-yellow-300 px-6 py-4 font-bold text-black">Talk to Arvik Digital <ArrowRight size={18} aria-hidden="true" /></a></div></section>
  </main><Footer /></>;
}
