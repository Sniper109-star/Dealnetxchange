"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setLoading(false);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Login failed.");
      return;
    }
    const data = await res.json();
    router.push(data.user.role === "admin" ? "/dashboard/admin" : params.get("next") || "/dashboard");
    router.refresh();
  };

  return (
    <form className="mt-6 space-y-4" onSubmit={submit}>
      {error && <p className="rounded-md bg-red-100 p-3 text-sm text-red-700">{error}</p>}
      <input required type="email" placeholder="Email address" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} className="w-full rounded-md border border-gray-200 px-4 py-3 outline-none focus:border-accent-400" />
      <input required type="password" placeholder="Password" value={form.password} onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))} className="w-full rounded-md border border-gray-200 px-4 py-3 outline-none focus:border-accent-400" />
      <button type="submit" className="btn-primary w-full" disabled={loading}>{loading ? "Logging in..." : "Login"}</button>
    </form>
  );
}

export default function Login() {
  return (
    <>
      <Header />
      <section className="bg-brand-100/40 py-20">
        <div className="container-x mx-auto max-w-md rounded-2xl bg-white p-8 shadow-lg">
          <h1 className="text-center text-2xl font-extrabold text-brand-900">Welcome Back</h1>
          <p className="mt-2 text-center text-sm text-gray-500">Login to your Dealnetxchange dashboard.</p>
          <div className="mt-3 rounded-md bg-brand-100 p-3 text-xs text-brand-900">
            Demo client: <b>client@dealnetxchange.com</b> / <b>client123</b> · Admin: <b>admin@dealnetxchange.com</b> / <b>admin123</b>
          </div>
          <Suspense fallback={null}>
            <LoginForm />
          </Suspense>
          <p className="mt-5 text-center text-sm text-gray-500">Don&rsquo;t have an account? <Link href="/signup" className="font-semibold text-accent-600">Sign Up</Link></p>
        </div>
      </section>
      <Footer />
    </>
  );
}
