export default function Loading() {
  return (
    <div className="container py-32">
      <div className="h-16 w-96 animate-pulse rounded-2xl bg-white/10" />

      <div className="mt-16 grid gap-7 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="h-[550px] animate-pulse rounded-[34px] border border-white/10 bg-white/[0.04]"
          />
        ))}
      </div>
    </div>
  );
}