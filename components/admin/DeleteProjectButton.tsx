"use client";

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteProjectButton({ id }: { id: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function deleteProject() {
    if (!confirm("Are you sure you want to delete this project?")) return;

    setLoading(true);

    const res = await fetch(`/api/admin/projects/${id}`, {
      method: "DELETE",
    });

    setLoading(false);

    if (!res.ok) {
      alert("Failed to delete project");
      return;
    }

    router.refresh();
  }

  return (
    <button
      onClick={deleteProject}
      disabled={loading}
      className="inline-flex items-center gap-2 rounded-xl border border-red-400/20 px-4 py-2 text-sm text-red-300 hover:bg-red-400/10 disabled:opacity-50"
    >
      <Trash2 size={15} />
      {loading ? "Deleting..." : "Delete"}
    </button>
  );
}