export default function Loading() {
  return (
    <div className="p-8">
      <div className="h-12 w-72 animate-pulse rounded-xl bg-white/10" />

      <div className="mt-10 grid gap-6 md:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-36 animate-pulse rounded-[24px] border border-white/10 bg-white/[0.04]"
          />
        ))}
      </div>
    </div>
  );
}