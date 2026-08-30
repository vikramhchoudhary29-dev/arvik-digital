"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateCommissionButton({ enquiryId, rate }: { enquiryId: string; rate: number }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function createCommission() {
    const value = prompt(`Enter the actual amount received from the client. Commission rate: ${rate}%`);
    if (value === null) return;
    const projectAmount = Number(value.replace(/,/g, ""));
    if (!Number.isFinite(projectAmount) || projectAmount <= 0) {
      alert("Please enter a valid project amount.");
      return;
    }

    setLoading(true);
    const res = await fetch("/api/admin/commissions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ enquiryId, projectAmount, commissionRate: rate }),
    });
    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      alert(data.error || "Could not create commission.");
      return;
    }

    alert(`Commission created: ₹${data.amount.toLocaleString("en-IN")}`);
    router.refresh();
  }

  return (
    <button
      onClick={createCommission}
      disabled={loading}
      className="rounded-xl bg-yellow-400 px-4 py-2 text-sm font-black text-black transition hover:bg-yellow-300 disabled:opacity-60"
    >
      {loading ? "Creating..." : "Create Commission"}
    </button>
  );
}
