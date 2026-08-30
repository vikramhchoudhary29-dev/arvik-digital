export default function Loading() {
  return (
    <div className="container py-32">
      <div className="h-16 w-96 animate-pulse rounded-2xl bg-white/10" />

      <div className="mt-8 h-6 w-full animate-pulse rounded-xl bg-white/5" />
      <div className="mt-3 h-6 w-4/5 animate-pulse rounded-xl bg-white/5" />

      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="h-80 animate-pulse rounded-[30px] border border-white/10 bg-white/[0.04]"
          />
        ))}
      </div>
    </div>
  );
}