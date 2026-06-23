export default function ServicesHero() {
  return (
    <section className="relative overflow-hidden pt-36 pb-20 hero-grid">
      <div className="absolute left-1/2 top-0 h-[460px] w-[460px] -translate-x-1/2 rounded-full bg-yellow-500/15 blur-[150px]" />
      <div className="absolute right-0 top-32 h-[360px] w-[360px] rounded-full bg-yellow-300/10 blur-[120px]" />

      <div className="container relative text-center">
        <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-yellow-300">
          Our Services
        </p>

        <h1 className="mx-auto max-w-5xl text-5xl font-black leading-tight tracking-tight md:text-7xl">
          Premium Digital Services For{" "}
          <span className="gold-text">Modern Businesses</span>
        </h1>

        <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-zinc-400 md:text-xl">
          From websites and custom web applications to AI solutions, branding,
          marketing, and website management — Arvik Digital helps businesses
          build a powerful online presence.
        </p>
      </div>
    </section>
  );
}