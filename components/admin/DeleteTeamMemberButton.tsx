"use client";
import { useRouter } from "next/navigation";
export default function DeleteTeamMemberButton({id}:{id:string}){const router=useRouter();async function remove(){if(!confirm("Delete this team member?"))return;const res=await fetch(`/api/admin/team-members/${id}`,{method:"DELETE"});if(!res.ok){alert("Could not delete team member.");return;}router.refresh();}return <button onClick={remove} className="rounded-lg border border-red-400/20 px-3 py-2 text-sm text-red-300 hover:bg-red-400/10">Delete</button>}
