import AdminLayout from "@/components/admin/AdminLayout";
import DeleteEnquiryButton from "@/components/admin/DeleteEnquiryButton";
import { prisma } from "@/lib/prisma";

export default async function AdminEnquiriesPage() {
  const enquiries = await prisma.enquiry.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <AdminLayout
      title="Enquiries"
      description="View and manage website enquiries."
    >
      <div className="grid gap-6">
        {enquiries.map((item) => (
          <div
            key={item.id}
            className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6"
          >
            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <div className="mb-3 flex flex-wrap gap-3">
                  <span className="rounded-full bg-yellow-400/10 px-3 py-1 text-xs font-bold text-yellow-200">
                    {item.status}
                  </span>

                  <span className="text-sm text-zinc-500">
                    {new Date(item.createdAt).toLocaleString()}
                  </span>
                </div>

                <h3 className="text-xl font-black">{item.name}</h3>

                <p className="mt-1 text-sm text-zinc-400">
                  {item.company || "No company"} • {item.service || "No service selected"}
                </p>

                <p className="mt-3 text-sm text-zinc-400">
                  Email: {item.email}
                </p>

                <p className="mt-1 text-sm text-zinc-400">
                  Phone: {item.phone || "Not provided"}
                </p>

                <p className="mt-5 max-w-4xl leading-7 text-zinc-300">
                  {item.message}
                </p>
              </div>

              <div className="flex gap-3">
                <DeleteEnquiryButton id={item.id} />
              </div>
            </div>
          </div>
        ))}

        {enquiries.length === 0 && (
          <div className="rounded-[30px] border border-white/10 bg-white/[0.04] p-10 text-center text-zinc-400">
            No enquiries found yet.
          </div>
        )}
      </div>
    </AdminLayout>
  );
}