import { Target, Eye } from "lucide-react";

export default function MissionVision() {
  return (
    <section className="py-24">

      <div className="container grid gap-8 lg:grid-cols-2">

        <div className="rounded-[36px] border border-white/10 bg-white/[0.04] p-10">

          <Target className="text-yellow-300" size={42} />

          <h3 className="mt-6 text-3xl font-black">
            Our Mission
          </h3>

          <p className="mt-5 leading-8 text-zinc-400">
            To empower businesses with innovative digital solutions that improve
            brand value, customer engagement, and long-term business growth.
          </p>

        </div>

        <div className="rounded-[36px] border border-white/10 bg-white/[0.04] p-10">

          <Eye className="text-yellow-300" size={42} />

          <h3 className="mt-6 text-3xl font-black">
            Our Vision
          </h3>

          <p className="mt-5 leading-8 text-zinc-400">
            To become one of India's most trusted digital agencies by delivering
            premium quality, innovation, and exceptional customer experience.
          </p>

        </div>

      </div>

    </section>
  );
}