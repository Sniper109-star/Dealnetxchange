import Link from "next/link";
import { SITE } from "@/lib/site";
import { Logo } from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-brand-900 text-white">
      <div className="bg-gradient-to-r from-accent-600 to-brand-500">
        <div className="container-x flex flex-col items-start justify-between gap-4 py-10 md:flex-row md:items-center">
          <h2 className="text-2xl font-extrabold md:text-3xl">
            Do you want to learn about us?
          </h2>
          <Link
            href="/signup"
            className="rounded-md bg-white px-8 py-3 font-bold text-brand-900 hover:bg-brand-100"
          >
            Get Started
          </Link>
        </div>
      </div>

      <div className="container-x grid gap-10 py-14 md:grid-cols-3">
        <div>
          <Logo className="mb-5" />
          <p className="text-white/70">
            Our creative approach to investment management balances superior
            long-term returns with minimal risk exposure.
          </p>
          <ul className="mt-5 space-y-3 text-white/70">
            <li className="flex gap-3">
              <span>📍</span>
              <span>{SITE.address}</span>
            </li>
            <li className="flex gap-3">
              <span>✉️</span>
              <a href={`mailto:${SITE.email}`} className="hover:text-white">
                {SITE.email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-5 text-lg font-bold">Useful Links</h4>
          <ul className="space-y-2 text-white/70">
            <li><Link href="/about" className="hover:text-white">About Us</Link></li>
            <li><Link href="/services" className="hover:text-white">What We Offers</Link></li>
            <li><Link href="/" className="hover:text-white">Our Projects</Link></li>
            <li><Link href="/terms" className="hover:text-white">Terms &amp; Conditions</Link></li>
            <li><Link href="/contact" className="hover:text-white">Contact Us</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-5 text-lg font-bold">What We Do</h4>
          <ul className="space-y-2 text-white/70">
            <li><Link href="/services" className="hover:text-white">Financial Analysis</Link></li>
            <li><Link href="/services" className="hover:text-white">Blockchain Solution</Link></li>
            <li><Link href="/services" className="hover:text-white">Investment Strategy</Link></li>
            <li><Link href="/services" className="hover:text-white">Management Services</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x py-5 text-center text-sm text-white/60">
          <p>
            &copy; {new Date().getFullYear()}{" "}
            <Link href="/" className="text-white/80 hover:text-white">
              Dealnetxchange
            </Link>{" "}
            &mdash; All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
