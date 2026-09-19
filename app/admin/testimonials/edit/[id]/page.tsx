import AdminLayout from "@/components/admin/AdminLayout";
import TestimonialForm from "@/components/admin/TestimonialForm";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function EditTestimonialPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const testimonial = await prisma.testimonial.findUnique({
    where: { id },
  });

  if (!testimonial) notFound();

  return (
    <AdminLayout
      title="Edit Testimonial"
      description="Update client review information."
    >
      <TestimonialForm
        mode="edit"
        initialData={{
          id: testimonial.id,
          name: testimonial.name,
          company: testimonial.company ?? "",
          designation: testimonial.designation ?? "",
          review: testimonial.review,
          rating: testimonial.rating,
          image: testimonial.image ?? "",
          featured: testimonial.featured,
        }}
      />
    </AdminLayout>
  );
}