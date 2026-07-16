"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PLANS } from "@/lib/db";

export default function InvestmentForm({ balance }: { balance: number }) {
  const router = useRouter();
  const [planId, setPlanId] = useState(PLANS[0].id);
  const [amount, setAmount] = useState(PLANS[0].min);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const plan = PLANS.find((p) => p.id === planId)!;
  const projected = amount + (amount * plan.percent) / 100;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await fetch("/api/investments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ planId, amount: Number(amount) }),
    });
    setLoading(false);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Failed to invest.");
      return;
    }
    setAmount(plan.min);
    router.refresh();
  };

  return (
    <form onSubmit={submit} className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-bold text-brand-900">Start a New Investment</h2>
      <p className="mt-1 text-sm text-gray-500">Available balance: ${balance.toLocaleString()}</p>

      <label className="mt-4 block text-sm font-semibold text-gray-600">Select Plan</label>
      <select
        value={planId}
        onChange={(e) => {
          const p = PLANS.find((x) => x.id === e.target.value)!;
          setPlanId(p.id);
          setAmount(p.min);
        }}
        className="mt-1 w-full rounded-md border border-gray-200 px-3 py-2 outline-none focus:border-accent-400"
      >
        {PLANS.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name} — {p.percent}% in {p.durationHours}h
          </option>
        ))}
      </select>

      <label className="mt-4 block text-sm font-semibold text-gray-600">Amount (USD)</label>
      <input
        type="number"
        min={plan.min}
        max={plan.max === Infinity ? undefined : plan.max}
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        className="mt-1 w-full rounded-md border border-gray-200 px-3 py-2 outline-none focus:border-accent-400"
      />
      <p className="mt-1 text-xs text-gray-400">
        Min {plan.min.toLocaleString()} · Max {plan.max === Infinity ? "Unlimited" : plan.max.toLocaleString()}
      </p>

      <div className="mt-4 rounded-md bg-brand-100/50 p-3 text-sm text-brand-900">
        Projected return: <b>${projected.toLocaleString()}</b>
      </div>

      {error && <p className="mt-3 rounded-md bg-red-100 p-3 text-sm text-red-700">{error}</p>}

      <button type="submit" className="btn-primary mt-4 w-full" disabled={loading}>
        {loading ? "Processing..." : "Invest Now"}
      </button>
    </form>
  );
}
