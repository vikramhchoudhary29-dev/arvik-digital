import AdminLayout from "@/components/admin/AdminLayout";
import TestimonialForm from "@/components/admin/TestimonialForm";

export default function AddTestimonialPage() {
  return (
    <AdminLayout
      title="Add Testimonial"
      description="Add a client review to your website."
    >
      <TestimonialForm mode="add" />
    </AdminLayout>
  );
}