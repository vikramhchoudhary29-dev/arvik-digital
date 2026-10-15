import Image from "next/image";
type Member = { id: string; name: string; department: string; role: string; bio: string | null; photo: string | null };
export default function TeamSection({ members }: { members: Member[] }) {
  if (!members.length) return null;
  return <section id="our-team" className="relative overflow-hidden bg-[#080711] py-20 text-white md:py-28">
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(124,58,237,0.18),transparent_55%)]" />
    <div className="relative mx-auto max-w-7xl px-5 md:px-8">
      <div className="mb-10 flex flex-col justify-between gap-5 md:mb-14 md:flex-row md:items-end">
        <div><p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-[#D6B56D]">The team</p><h2 className="max-w-2xl text-4xl font-medium leading-tight tracking-tight md:text-6xl">The minds behind <span className="text-[#D6B56D]">Arvik Digital.</span></h2></div>
        <p className="max-w-sm text-sm leading-6 text-zinc-400">A team of builders, marketers, and client partners turning ideas into digital experiences.</p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{members.map((member,index)=><article key={member.id} className="group overflow-hidden rounded-2xl border border-white/10 bg-[#100d1c] transition duration-300 hover:-translate-y-1 hover:border-[#D6B56D]/50">
        <div className="flex min-h-[78px] items-start justify-between gap-3 p-4"><div><h3 className="font-semibold leading-snug">{member.name}</h3><p className="mt-1 text-xs text-zinc-400">{member.role}</p></div><span className="text-xs tracking-widest text-[#D6B56D]">{String(index+1).padStart(2,"0")}</span></div>
        <div className="relative aspect-[4/4.5] overflow-hidden bg-gradient-to-b from-[#201637] to-[#100d1c]">{member.photo ? <Image src={member.photo} alt={member.name} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="object-cover object-top transition duration-500 group-hover:scale-[1.03]" unoptimized /> : <div className="flex h-full items-center justify-center text-5xl font-light text-[#D6B56D]/70">{member.name.split(/\s+/).slice(0,2).map(n=>n[0]).join("").toUpperCase()}</div>}</div>
        <div className="border-t border-white/10 p-4"><p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#D6B56D]">{member.department}</p>{member.bio && <p className="mt-2 text-sm leading-5 text-zinc-400">{member.bio}</p>}</div>
      </article>)}</div>
    </div>
  </section>;
}
