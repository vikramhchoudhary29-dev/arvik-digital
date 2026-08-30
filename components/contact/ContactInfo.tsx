import {
  Phone,
  Mail,
  MapPin,
  Clock,
} from "lucide-react";

export default function ContactInfo() {
  return (
    <div className="space-y-6">

      <InfoCard
        icon={<Phone size={24} />}
        title="Phone / WhatsApp"
        value="+91 9404830921"
      />

      <InfoCard
        icon={<Mail size={24} />}
        title="Email"
        value="hello@arvikdigital.com"
      />

      <InfoCard
        icon={<MapPin size={24} />}
        title="Location"
        value="Maharashtra, India"
      />

      <InfoCard
        icon={<Clock size={24} />}
        title="Working Hours"
        value="Monday - Saturday | 10:00 AM - 7:00 PM"
      />

    </div>
  );
}

function InfoCard({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
      <div className="mb-5 text-yellow-300">
        {icon}
      </div>

      <h3 className="text-xl font-black">
        {title}
      </h3>

      <p className="mt-3 text-zinc-400 leading-7">
        {value}
      </p>
    </div>
  );
}