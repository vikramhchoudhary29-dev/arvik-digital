import { LucideIcon } from "lucide-react";

type StatCardProps = {
  title: string;
  value: string;
  icon: LucideIcon;
};

export default function StatCard({ title, value, icon: Icon }: StatCardProps) {
  return (
    <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl transition hover:-translate-y-1 hover:border-yellow-400/30">
      <div className="mb-6 flex h-13 w-13 items-center justify-center rounded-2xl bg-yellow-400/10 text-yellow-300">
        <Icon size={24} />
      </div>

      <h3 className="text-4xl font-black gold-text">{value}</h3>
      <p className="mt-2 text-zinc-400">{title}</p>
    </div>
  );
}