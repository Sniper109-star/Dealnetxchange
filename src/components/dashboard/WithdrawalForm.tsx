"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function WithdrawalForm({ balance, wallet }: { balance: number; wallet: string }) {
  const router = useRouter();
  const [amount, setAmount] = useState(50);
  const [address, setAddress] = useState(wallet);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await fetch("/api/withdrawals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: Number(amount), wallet: address }),
    });
    setLoading(false);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Failed to request withdrawal.");
      return;
    }
    setAmount(50);
    router.refresh();
  };

  return (
    <form onSubmit={submit} className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-bold text-brand-900">Request Withdrawal</h2>
      <p className="mt-1 text-sm text-gray-500">Available balance: ${balance.toLocaleString()}</p>
      <label className="mt-4 block text-sm font-semibold text-gray-600">Amount (USD)</label>
      <input type="number" min={1} max={balance} value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="mt-1 w-full rounded-md border border-gray-200 px-3 py-2 outline-none focus:border-accent-400" />
      <label className="mt-4 block text-sm font-semibold text-gray-600">Wallet Address</label>
      <input value={address} onChange={(e) => setAddress(e.target.value)} className="mt-1 w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:border-accent-400" />
      {error && <p className="mt-3 rounded-md bg-red-100 p-3 text-sm text-red-700">{error}</p>}
      <button type="submit" className="btn-primary mt-4 w-full" disabled={loading}>{loading ? "Submitting..." : "Request Withdrawal"}</button>
      <p className="mt-3 text-xs text-gray-400">Withdrawals are processed in cryptocurrency and reviewed by our team.</p>
    </form>
  );
}
