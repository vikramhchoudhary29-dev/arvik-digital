import AdminLayout from "@/components/admin/AdminLayout";
import ServiceForm from "@/components/admin/ServiceForm";

export default function AddServicePage() {
  return (
    <AdminLayout
      title="Add Service"
      description="Add a new service to your website."
    >
      <ServiceForm mode="add" />
    </AdminLayout>
  );
}