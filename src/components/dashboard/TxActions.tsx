"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function TxActions({
  type,
  id,
}: {
  type: "deposit" | "withdrawal";
  id: string;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState<"" | "approved" | "rejected">("");

  const act = async (action: "approved" | "rejected") => {
    setBusy(action);
    await fetch("/api/admin", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, id, action }),
    });
    setBusy("");
    router.refresh();
  };

  return (
    <div className="flex gap-2">
      <button onClick={() => act("approved")} disabled={busy !== ""} className="rounded-md bg-green-600 px-3 py-1 text-xs font-semibold text-white hover:bg-green-500 disabled:opacity-50">Approve</button>
      <button onClick={() => act("rejected")} disabled={busy !== ""} className="rounded-md bg-red-600 px-3 py-1 text-xs font-semibold text-white hover:bg-red-500 disabled:opacity-50">Reject</button>
    </div>
  );
}
