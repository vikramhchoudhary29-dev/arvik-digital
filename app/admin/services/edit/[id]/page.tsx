import AdminLayout from "@/components/admin/AdminLayout";
import ServiceForm from "@/components/admin/ServiceForm";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function EditServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const service = await prisma.service.findUnique({
    where: { id },
  });

  if (!service) notFound();

  return (
    <AdminLayout
      title="Edit Service"
      description="Update service information."
    >
      <ServiceForm
        mode="edit"
        initialData={{
          id: service.id,
          title: service.title,
          slug: service.slug,
          icon: service.icon,
          shortDesc: service.shortDesc,
          description: service.description,
          benefits: service.benefits.join(", "),
          order: service.order,
          featured: service.featured,
        }}
      />
    </AdminLayout>
  );
}