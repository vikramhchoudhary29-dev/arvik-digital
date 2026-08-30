"use client";

type CategoryFilterProps = {
  categories: string[];
  activeCategory: string;
  onChange: (category: string) => void;
};

export default function CategoryFilter({
  categories,
  activeCategory,
  onChange,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {categories.map((category) => {
        const active = activeCategory === category;

        return (
          <button
            key={category}
            onClick={() => onChange(category)}
            className={`rounded-full border px-5 py-3 text-sm font-bold transition ${
              active
                ? "border-yellow-400 bg-yellow-400 text-black"
                : "border-white/10 bg-white/[0.045] text-zinc-300 hover:border-yellow-400/40 hover:text-yellow-300"
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}