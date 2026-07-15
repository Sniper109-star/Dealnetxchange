"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/");
  };

  return (
    <>
      <Header />
      <section className="bg-brand-100/40 py-20">
        <div className="container-x mx-auto max-w-md rounded-2xl bg-white p-8 shadow-lg">
          <h1 className="text-center text-2xl font-extrabold text-brand-900">
            Welcome Back
          </h1>
          <p className="mt-2 text-center text-sm text-gray-500">
            Login to your Dealnetxchange account.
          </p>
          <form className="mt-6 space-y-4" onSubmit={submit}>
            <input
              required
              type="email"
              placeholder="Email address"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              className="w-full rounded-md border border-gray-200 px-4 py-3 outline-none focus:border-accent-400"
            />
            <input
              required
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
              className="w-full rounded-md border border-gray-200 px-4 py-3 outline-none focus:border-accent-400"
            />
            <button type="submit" className="btn-primary w-full">
              Login
            </button>
          </form>
          <p className="mt-5 text-center text-sm text-gray-500">
            Don&rsquo;t have an account?{" "}
            <Link href="/signup" className="font-semibold text-accent-600">
              Sign Up
            </Link>
          </p>
        </div>
      </section>
      <Footer />
    </>
  );
}
