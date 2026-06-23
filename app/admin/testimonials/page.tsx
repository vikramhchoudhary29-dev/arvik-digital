import AdminLayout from "@/components/admin/AdminLayout";
import DeleteTestimonialButton from "@/components/admin/DeleteTestimonialButton";
import { prisma } from "@/lib/prisma";
import { Plus, Star } from "lucide-react";

export default async function AdminTestimonialsPage() {
  const testimonials = await prisma.testimonial.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <AdminLayout
      title="Testimonials"
      description="Add, edit and manage client reviews."
    >
      <div className="mb-8 flex justify-end">
        <a
          href="/admin/testimonials/add"
          className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-yellow-300 to-yellow-600 px-5 py-3 font-bold text-black"
        >
          <Plus size={18} />
          Add Testimonial
        </a>
      </div>

      <div className="grid gap-6">
        {testimonials.map((item) => (
          <div
            key={item.id}
            className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6"
          >
            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <div className="mb-3 flex gap-1 text-yellow-300">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>

                <h3 className="text-xl font-black">{item.name}</h3>
                <p className="mt-1 text-sm text-zinc-500">
                  {item.company} {item.designation ? `• ${item.designation}` : ""}
                </p>

                <p className="mt-4 max-w-4xl leading-7 text-zinc-300">
                  {item.review}
                </p>

                <p className="mt-3 text-sm text-zinc-500">
                    
                  Featured: {item.featured ? "Yes" : "No"}
                </p>
              </div>

              <div className="flex gap-3">
                <a
                  href={`/admin/testimonials/edit/${item.id}`}
                  className="rounded-xl border border-white/10 px-4 py-2 text-sm text-zinc-300 hover:border-yellow-400/30 hover:text-yellow-300"
                >
                  Edit
                </a>

                <DeleteTestimonialButton id={item.id} />
              </div>
            </div>
          </div>
        ))}

        {testimonials.length === 0 && (
          <div className="rounded-[30px] border border-white/10 bg-white/[0.04] p-10 text-center text-zinc-400">
            No testimonials found. Add your first testimonial.
          </div>
        )}
      </div>
    </AdminLayout>
  );
}