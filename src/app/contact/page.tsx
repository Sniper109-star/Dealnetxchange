"use client";

import { useState } from "react";
import { SITE } from "@/lib/site";
import { PageHero } from "@/components/PageHero";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } catch {
      /* noop */
    }
    setStatus("sent");
  };

  return (
    <>
      <Header />
      <PageHero
        eyebrow="Who We Are"
        title="Contact Us"
        subtitle="Send your queries to our support team. We are here 24/7."
      />
      <section className="py-20">
        <div className="container-x grid gap-10 md:grid-cols-2">
          <div>
            <div className="sec-title left">
              <h5>Get in touch</h5>
              <h2>Let&rsquo;s Talk About Growing Your Finances</h2>
            </div>
            <ul className="mt-6 space-y-4 text-gray-600">
              <li className="flex gap-3"><span>📍</span><span>{SITE.address}</span></li>
              <li className="flex gap-3"><span>✉️</span><a href={`mailto:${SITE.email}`} className="hover:text-accent-600">{SITE.email}</a></li>
              <li className="flex gap-3"><span>🕘</span><span>Monday to Friday: 9am - 6pm</span></li>
            </ul>
          </div>
          <div className="rounded-xl bg-brand-100/40 p-8">
            {status === "sent" ? (
              <p className="rounded-md bg-green-100 p-4 text-green-800">
                Thanks {form.name || "there"}! Your message has been received. Our
                team will respond shortly.
              </p>
            ) : (
              <form className="space-y-4" onSubmit={submit}>
                <input required placeholder="Your Name" value={form.name} onChange={update("name")} className="w-full rounded-md border border-gray-200 px-4 py-3 outline-none focus:border-accent-400" />
                <input required type="email" placeholder="Email address" value={form.email} onChange={update("email")} className="w-full rounded-md border border-gray-200 px-4 py-3 outline-none focus:border-accent-400" />
                <input required placeholder="Phone" value={form.phone} onChange={update("phone")} className="w-full rounded-md border border-gray-200 px-4 py-3 outline-none focus:border-accent-400" />
                <textarea placeholder="Message" rows={4} value={form.message} onChange={update("message")} className="w-full rounded-md border border-gray-200 px-4 py-3 outline-none focus:border-accent-400" />
                <button type="submit" className="btn-primary w-full" disabled={status === "sending"}>
                  {status === "sending" ? "Sending..." : "send message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
