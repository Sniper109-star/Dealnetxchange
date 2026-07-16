"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfileForm({
  name,
  email,
  wallet,
  country,
}: {
  name: string;
  email: string;
  wallet: string;
  country: string;
}) {
  const router = useRouter();
  const [w, setW] = useState(wallet);
  const [c, setC] = useState(country);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    const res = await fetch("/api/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ wallet: w, country: c }),
    });
    setLoading(false);
    if (res.ok) {
      setMsg("Profile updated.");
      router.refresh();
    } else {
      setMsg("Update failed.");
    }
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-gray-600">Full Name</label>
        <input disabled value={name} className="mt-1 w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-500" />
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-600">Email</label>
        <input disabled value={email} className="mt-1 w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-500" />
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-600">Wallet Address</label>
        <input value={w} onChange={(e) => setW(e.target.value)} className="mt-1 w-full rounded-md border border-gray-200 px-3 py-2 outline-none focus:border-accent-400" />
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-600">Country</label>
        <input value={c} onChange={(e) => setC(e.target.value)} className="mt-1 w-full rounded-md border border-gray-200 px-3 py-2 outline-none focus:border-accent-400" />
      </div>
      {msg && <p className="rounded-md bg-green-100 p-2 text-sm text-green-700">{msg}</p>}
      <button type="submit" className="btn-primary" disabled={loading}>{loading ? "Saving..." : "Save Changes"}</button>
    </form>
  );
}
