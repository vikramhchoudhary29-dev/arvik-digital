export default function ContactHero() {
  return (
    <section className="relative overflow-hidden pt-36 pb-20 hero-grid">
      <div className="absolute left-1/2 top-0 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-yellow-500/15 blur-[160px]" />
      <div className="absolute right-0 top-24 h-[350px] w-[350px] rounded-full bg-yellow-400/10 blur-[120px]" />

      <div className="container relative text-center">
        <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-yellow-300">
          Contact Us
        </p>

        <h1 className="mx-auto max-w-5xl text-5xl font-black leading-tight md:text-7xl">
          Let's Build Something
          <span className="gold-text"> Amazing Together</span>
        </h1>

        <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-zinc-400">
          Have a project in mind? We'd love to hear about your business and help
          you create a premium digital solution.
        </p>
      </div>
    </section>
  );
}