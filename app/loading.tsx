export default function Loading() {
  return (
    <main className="min-h-screen hero-grid">
      <div className="container py-32">
        <div className="h-14 w-80 animate-pulse rounded-2xl bg-white/10" />

        <div className="mt-6 h-6 w-full max-w-3xl animate-pulse rounded-xl bg-white/5" />
        <div className="mt-3 h-6 w-2/3 animate-pulse rounded-xl bg-white/5" />

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-72 animate-pulse rounded-[30px] border border-white/10 bg-white/[0.04]"
            />
          ))}
        </div>
      </div>
    </main>
  );
}