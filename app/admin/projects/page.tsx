import AdminLayout from "@/components/admin/AdminLayout";
import DeleteProjectButton from "@/components/admin/DeleteProjectButton";
import { prisma } from "@/lib/prisma";
import { Plus } from "lucide-react";

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <AdminLayout
      title="Projects"
      description="Add, edit and manage completed projects."
    >
      <div className="mb-8 flex justify-end">
        <a
          href="/admin/projects/add"
          className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-yellow-300 to-yellow-600 px-5 py-3 font-bold text-black"
        >
          <Plus size={18} />
          Add Project
        </a>
      </div>

      <div className="overflow-x-auto rounded-[30px] border border-white/10 bg-white/[0.04]">
        <table className="w-full min-w-[900px] text-left">
          <thead className="border-b border-white/10 bg-white/[0.04]">
            <tr>
              <th className="p-5">Project</th>
              <th className="p-5">Category</th>
              <th className="p-5">Status</th>
              <th className="p-5">Featured</th>
              <th className="p-5">Year</th>
              <th className="p-5 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
{projects.map((project: any) => (              <tr key={project.id} className="border-b border-white/10">
                <td className="p-5 font-bold">{project.title}</td>
                <td className="p-5 text-zinc-400">{project.category}</td>

                <td className="p-5">
                  <span className="rounded-full bg-green-400/10 px-3 py-1 text-xs font-bold text-green-300">
                    {project.status}
                  </span>
                </td>

                <td className="p-5 text-zinc-400">
                  {project.featured ? "Yes" : "No"}
                </td>

                <td className="p-5 text-zinc-400">
                  {project.completedDate}
                </td>

                <td className="p-5">
                  <div className="flex justify-end gap-3">
                    <a
                      href={`/admin/projects/edit/${project.id}`}
                      className="rounded-xl border border-white/10 px-4 py-2 text-sm text-zinc-300 hover:border-yellow-400/30 hover:text-yellow-300"
                    >
                      Edit
                    </a>

                    <DeleteProjectButton id={project.id} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {projects.length === 0 && (
          <div className="p-10 text-center text-zinc-400">
            No projects found. Add your first project.
          </div>
        )}
      </div>
    </AdminLayout>
  );
}