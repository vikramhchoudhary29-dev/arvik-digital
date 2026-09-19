"use client";

import { Search } from "lucide-react";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative">
      <Search
        size={20}
        className="absolute left-5 top-1/2 -translate-y-1/2 text-yellow-300"
      />

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search projects by name or industry..."
        className="w-full rounded-3xl border border-white/10 bg-white/[0.045] py-5 pl-14 pr-5 text-white outline-none backdrop-blur-xl transition placeholder:text-zinc-500 focus:border-yellow-400/40"
      />
    </div>
  );
}