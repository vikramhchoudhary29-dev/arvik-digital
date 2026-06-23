import AdminLayout from "@/components/admin/AdminLayout";
import DeleteServiceButton from "@/components/admin/DeleteServiceButton";
import { prisma } from "@/lib/prisma";
import { Plus } from "lucide-react";

export default async function AdminServicesPage() {
  const services = await prisma.service.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <AdminLayout
      title="Services"
      description="Add, edit and manage website services."
    >
      <div className="mb-8 flex justify-end">
        <a
          href="/admin/services/add"
          className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-yellow-300 to-yellow-600 px-5 py-3 font-bold text-black"
        >
          <Plus size={18} />
          Add Service
        </a>
      </div>

      <div className="overflow-x-auto rounded-[30px] border border-white/10 bg-white/[0.04]">
        <table className="w-full min-w-[900px] text-left">
          <thead className="border-b border-white/10 bg-white/[0.04]">
            <tr>
              <th className="p-5">Service</th>
              <th className="p-5">Icon</th>
              <th className="p-5">Featured</th>
              <th className="p-5">Order</th>
              <th className="p-5 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {services.map((service: any) => (
              <tr key={service.id} className="border-b border-white/10">
                <td className="p-5">
                  <p className="font-bold">{service.title}</p>
                  <p className="mt-1 max-w-xl text-sm text-zinc-500">
                    {service.shortDesc}
                  </p>
                </td>

                <td className="p-5 text-zinc-400">{service.icon}</td>

                <td className="p-5 text-zinc-400">
                  {service.featured ? "Yes" : "No"}
                </td>

                <td className="p-5 text-zinc-400">{service.order}</td>

                <td className="p-5">
                  <div className="flex justify-end gap-3">
                    <a
                      href={`/admin/services/edit/${service.id}`}
                      className="rounded-xl border border-white/10 px-4 py-2 text-sm text-zinc-300 hover:border-yellow-400/30 hover:text-yellow-300"
                    >
                      Edit
                    </a>

                    <DeleteServiceButton id={service.id} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {services.length === 0 && (
          <div className="p-10 text-center text-zinc-400">
            No services found. Add your first service.
          </div>
        )}
      </div>
    </AdminLayout>
  );
}