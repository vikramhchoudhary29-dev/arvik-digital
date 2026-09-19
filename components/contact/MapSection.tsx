export default function MapSection() {
  return (
    <section className="py-24">
      <div className="container">
        <div className="overflow-hidden rounded-[36px] border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl">
          <div className="flex h-[380px] items-center justify-center rounded-[28px] bg-gradient-to-br from-yellow-400/15 via-white/5 to-black text-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-yellow-300">
                Location
              </p>

              <h2 className="mt-4 text-4xl font-black">
                Maharashtra, India
              </h2>

              <p className="mt-4 text-zinc-400">
                Google Map embed will be added here later.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}