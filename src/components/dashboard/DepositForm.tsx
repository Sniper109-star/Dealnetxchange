"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const methods = ["Bitcoin", "Ethereum", "USDT", "Coinbase"];

export default function DepositForm() {
  const router = useRouter();
  const [amount, setAmount] = useState(100);
  const [method, setMethod] = useState(methods[0]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await fetch("/api/deposits", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: Number(amount), method }),
    });
    setLoading(false);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Failed to submit deposit.");
      return;
    }
    setAmount(100);
    router.refresh();
  };

  return (
    <form onSubmit={submit} className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-bold text-brand-900">New Deposit</h2>
      <label className="mt-4 block text-sm font-semibold text-gray-600">Method</label>
      <select value={method} onChange={(e) => setMethod(e.target.value)} className="mt-1 w-full rounded-md border border-gray-200 px-3 py-2 outline-none focus:border-accent-400">
        {methods.map((m) => <option key={m} value={m}>{m}</option>)}
      </select>
      <label className="mt-4 block text-sm font-semibold text-gray-600">Amount (USD)</label>
      <input type="number" min={1} value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="mt-1 w-full rounded-md border border-gray-200 px-3 py-2 outline-none focus:border-accent-400" />
      {error && <p className="mt-3 rounded-md bg-red-100 p-3 text-sm text-red-700">{error}</p>}
      <button type="submit" className="btn-primary mt-4 w-full" disabled={loading}>{loading ? "Submitting..." : "Submit Deposit"}</button>
      <p className="mt-3 text-xs text-gray-400">Deposits are reviewed by our team and credited to your balance once approved.</p>
    </form>
  );
}
