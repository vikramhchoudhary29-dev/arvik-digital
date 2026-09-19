import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({
  children,
  title,
  description,
}: {
  children: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <main className="min-h-screen bg-[#090909]">
      <AdminSidebar />

      <section className="lg:pl-72">
        <div className="border-b border-white/10 bg-black/30 px-6 py-6 backdrop-blur-xl lg:px-10">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-yellow-300">
            Admin Panel
          </p>

          <h1 className="mt-2 text-3xl font-black md:text-4xl">{title}</h1>

          <p className="mt-2 text-zinc-400">{description}</p>
        </div>

        <div className="p-6 lg:p-10">{children}</div>
      </section>
    </main>
  );
}