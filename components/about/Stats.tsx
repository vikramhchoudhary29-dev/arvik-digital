const stats = [
  { value: "25+", label: "Projects Completed" },
  { value: "15+", label: "Happy Clients" },
  { value: "5+", label: "Industries Served" },
  { value: "100%", label: "Custom Built" },
];

export default function Stats() {
  return (
    <section className="py-24">
      <div className="container">
        <div className="grid gap-6 md:grid-cols-4">
          {stats.map((item) => (
            <div
              key={item.label}
              className="rounded-[30px] border border-white/10 bg-white/[0.04] p-8 text-center backdrop-blur-xl transition hover:-translate-y-2 hover:border-yellow-400/30"
            >
              <h3 className="gold-text text-5xl font-black">{item.value}</h3>
              <p className="mt-3 text-zinc-400">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}