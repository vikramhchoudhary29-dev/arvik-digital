export default function CompanyStory() {
  return (
    <section className="py-24">
      <div className="container grid items-center gap-16 lg:grid-cols-2">

        <div className="rounded-[36px] border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl">

          <div className="mb-5 flex gap-2">
            <span className="h-3 w-3 rounded-full bg-red-400" />
            <span className="h-3 w-3 rounded-full bg-yellow-400" />
            <span className="h-3 w-3 rounded-full bg-green-400" />
          </div>

          <div className="rounded-[28px] bg-gradient-to-br from-yellow-400/20 via-white/5 to-black p-10">

            <div className="h-5 w-40 rounded-full bg-yellow-400/30" />

            <div className="mt-8 space-y-4">
              <div className="h-4 rounded-full bg-white/10" />
              <div className="h-4 w-5/6 rounded-full bg-white/10" />
              <div className="h-4 w-3/4 rounded-full bg-white/10" />
            </div>

            <div className="mt-10 grid grid-cols-2 gap-4">
              <div className="h-28 rounded-2xl bg-black/40" />
              <div className="h-28 rounded-2xl bg-yellow-400/10" />
            </div>

          </div>

        </div>

        <div>

          <p className="text-sm font-bold uppercase tracking-[0.3em] text-yellow-300">
            Our Story
          </p>

          <h2 className="mt-4 text-5xl font-black">
            More Than A Web
            <span className="gold-text"> Development Agency</span>
          </h2>

          <p className="mt-8 text-lg leading-8 text-zinc-400">
            Arvik Digital was founded with a simple mission — to help businesses
            grow through premium digital experiences. We believe every business,
            whether small or large, deserves a professional online presence.
          </p>

          <p className="mt-6 text-lg leading-8 text-zinc-400">
            From custom websites and business software to AI-powered solutions
            and branding, we focus on creating solutions that deliver real
            results instead of just beautiful designs.
          </p>

        </div>

      </div>
    </section>
  );
}