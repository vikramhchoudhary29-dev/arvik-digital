import { notFound } from "next/navigation";
import AdminLayout from "@/components/admin/AdminLayout";
import TeamMemberForm from "@/components/admin/TeamMemberForm";
import { prisma } from "@/lib/prisma";
export const dynamic="force-dynamic";
export default async function EditTeamMemberPage({params}:{params:Promise<{id:string}>}){const {id}=await params;const member=await prisma.teamMember.findUnique({where:{id}});if(!member)notFound();return <AdminLayout title="Edit Team Member" description="Update this person's details, photo, and visibility."><TeamMemberForm mode="edit" initialData={{...member,bio:member.bio??"",photo:member.photo??""}}/></AdminLayout>}
