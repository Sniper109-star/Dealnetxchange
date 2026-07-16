"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function SignUp() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setLoading(false);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Sign up failed.");
      return;
    }
    router.push("/dashboard");
    router.refresh();
  };

  return (
    <>
      <Header />
      <section className="bg-brand-100/40 py-20">
        <div className="container-x mx-auto max-w-md rounded-2xl bg-white p-8 shadow-lg">
          <h1 className="text-center text-2xl font-extrabold text-brand-900">Create Account</h1>
          <p className="mt-2 text-center text-sm text-gray-500">Join Dealnetxchange and start growing today.</p>
          <form className="mt-6 space-y-4" onSubmit={submit}>
            {error && <p className="rounded-md bg-red-100 p-3 text-sm text-red-700">{error}</p>}
            <input required placeholder="Full Name" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} className="w-full rounded-md border border-gray-200 px-4 py-3 outline-none focus:border-accent-400" />
            <input required type="email" placeholder="Email address" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} className="w-full rounded-md border border-gray-200 px-4 py-3 outline-none focus:border-accent-400" />
            <input required placeholder="Phone" value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} className="w-full rounded-md border border-gray-200 px-4 py-3 outline-none focus:border-accent-400" />
            <input required type="password" placeholder="Password" value={form.password} onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))} className="w-full rounded-md border border-gray-200 px-4 py-3 outline-none focus:border-accent-400" />
            <button type="submit" className="btn-primary w-full" disabled={loading}>{loading ? "Creating..." : "Sign Up"}</button>
          </form>
          <p className="mt-5 text-center text-sm text-gray-500">Already have an account? <Link href="/login" className="font-semibold text-accent-600">Login</Link></p>
        </div>
      </section>
      <Footer />
    </>
  );
}
