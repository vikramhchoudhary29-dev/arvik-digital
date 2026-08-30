import AdminLayout from "@/components/admin/AdminLayout";
import StatCard from "@/components/admin/StatCard";
import {
  FolderKanban,
  BriefcaseBusiness,
  MessageSquare,
  Star,
} from "lucide-react";

export default function AdminDashboardPage() {
  return (
    <AdminLayout
      title="Dashboard"
      description="Manage projects, services, enquiries and website content."
    >
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total Projects" value="3" icon={FolderKanban} />
        <StatCard title="Total Services" value="6" icon={BriefcaseBusiness} />
        <StatCard title="New Enquiries" value="0" icon={MessageSquare} />
        <StatCard title="Testimonials" value="3" icon={Star} />
      </div>
    </AdminLayout>
  );
}