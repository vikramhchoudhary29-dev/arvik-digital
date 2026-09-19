import AdminLayout from "@/components/admin/AdminLayout";
import StatCard from "@/components/admin/StatCard";
import { FolderKanban, BriefcaseBusiness, MessageSquare, Star } from "lucide-react";
import { prisma } from "@/lib/prisma";
export default async function AdminDashboardPage(){const [projects,services,enquiries,testimonials]=await Promise.all([prisma.project.count(),prisma.service.count(),prisma.enquiry.count({where:{status:{not:"Archived"}}}),prisma.testimonial.count()]);return <AdminLayout title="Dashboard" description="Manage projects, services, enquiries and website content."><div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4"><StatCard title="Total Projects" value={String(projects)} icon={FolderKanban}/><StatCard title="Total Services" value={String(services)} icon={BriefcaseBusiness}/><StatCard title="Active Enquiries" value={String(enquiries)} icon={MessageSquare}/><StatCard title="Testimonials" value={String(testimonials)} icon={Star}/></div></AdminLayout>}
