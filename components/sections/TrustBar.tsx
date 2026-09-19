const stats = [
  { value: "25+", label: "Projects Completed" },
  { value: "15+", label: "Happy Clients" },
  { value: "5+", label: "Industries Served" },
  { value: "100%", label: "Custom Design" },
];

const brands = [
  "Websites",
  "Web Apps",
  "AI Agents",
  "Branding",
  "SEO",
  "Meta Ads",
];

export default function TrustBar() {
  return (
    <section className="border-y border-white/10 bg-white/[0.025] py-10">
      <div className="container">
        <div className="grid gap-6 md:grid-cols-4">
          {stats.map((item) => (
            <div
              key={item.label}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 text-center backdrop-blur-xl"
            >
              <h3 className="gold-text text-4xl font-black">{item.value}</h3>
              <p className="mt-2 text-sm text-zinc-400">{item.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 overflow-hidden">
          <div className="flex w-max animate-[marquee_18s_linear_infinite] gap-4">
            {[...brands, ...brands].map((brand, index) => (
              <div
                key={`${brand}-${index}`}
                className="rounded-full border border-yellow-400/15 bg-yellow-400/5 px-6 py-3 text-sm font-semibold text-zinc-300"
              >
                {brand}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}