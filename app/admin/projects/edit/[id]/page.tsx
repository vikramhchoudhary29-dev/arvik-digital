import AdminLayout from "@/components/admin/AdminLayout";
import ProjectForm from "@/components/admin/ProjectForm";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const project = await prisma.project.findUnique({
    where: { id },
  });

  if (!project) {
    notFound();
  }

  return (
    <AdminLayout
      title="Edit Project"
      description="Update project information and portfolio details."
    >
      <ProjectForm
        mode="edit"
        initialData={{
          id: project.id,
          title: project.title,
          slug: project.slug,
          category: project.category,
          description: project.description,
          technologies: project.technologies.join(", "),
          features: project.features.join(", "),
          completedDate: project.completedDate,
          liveUrl: project.liveUrl,
          status: project.status,
          featured: project.featured,
        }}
      />
    </AdminLayout>
  );
}