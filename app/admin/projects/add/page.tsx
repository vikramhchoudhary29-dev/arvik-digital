import AdminLayout from "@/components/admin/AdminLayout";
import ProjectForm from "@/components/admin/ProjectForm";

export default function AddProjectPage() {
  return (
    <AdminLayout
      title="Add Project"
      description="Add a new completed project to your portfolio."
    >
      <ProjectForm mode="add" />
    </AdminLayout>
  );
}