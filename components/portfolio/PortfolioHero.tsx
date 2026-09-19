export default function PortfolioHero() {
  return (
    <section className="relative overflow-hidden pt-36 pb-20 hero-grid">
      <div className="absolute left-1/2 top-0 h-[460px] w-[460px] -translate-x-1/2 rounded-full bg-yellow-500/15 blur-[150px]" />
      <div className="absolute right-0 top-32 h-[360px] w-[360px] rounded-full bg-yellow-300/10 blur-[120px]" />

      <div className="container relative text-center">
        <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-yellow-300">
          Our Portfolio
        </p>

        <h1 className="mx-auto max-w-5xl text-5xl font-black leading-tight tracking-tight md:text-7xl">
          Completed Projects Built With{" "}
          <span className="gold-text">Premium Digital Craft</span>
        </h1>

        <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-zinc-400 md:text-xl">
          Explore completed websites and digital systems crafted for businesses
          across different industries.
        </p>

        <div className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-3">
          {[
            ["25+", "Projects Completed"],
            ["15+", "Happy Clients"],
            ["5+", "Industries Served"],
          ].map(([value, label]) => (
            <div key={label} className="glass rounded-3xl p-5">
              <h3 className="gold-text text-3xl font-black">{value}</h3>
              <p className="mt-1 text-sm text-zinc-400">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}