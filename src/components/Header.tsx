"use client";

import { useState } from "react";
import Link from "next/link";
import { NAV } from "@/lib/site";
import { Logo } from "./Logo";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <header className="relative z-50 bg-white shadow-sm">
      <div className="border-b border-gray-100">
        <div className="container-x flex flex-col gap-2 py-2">
          <div className="flex items-center justify-between gap-4">
            <Logo />
            <div className="hidden items-center gap-2 md:flex">
              <Link
                href="/login"
                className="rounded-md px-4 py-2 text-sm font-semibold text-brand-900 hover:text-accent-600"
              >
                Login
              </Link>
              <Link href="/signup" className="btn-primary px-5 py-2 text-sm">
                Sign Up
              </Link>
            </div>
            <button
              className="flex flex-col gap-1 md:hidden"
              aria-label="Toggle menu"
              onClick={() => setMobileOpen((v) => !v)}
            >
              <span className="h-0.5 w-6 bg-brand-900" />
              <span className="h-0.5 w-6 bg-brand-900" />
              <span className="h-0.5 w-6 bg-brand-900" />
            </button>
          </div>
        </div>
      </div>

      <div className="hidden bg-brand-900 md:block">
        <div className="container-x">
          <nav className="flex items-center justify-end gap-1">
            {NAV.map((item) => (
              <div
                key={item.label}
                className="group relative"
                onMouseEnter={() => setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={item.children ? "#" : item.href}
                  className="flex items-center gap-1 px-4 py-4 text-sm font-semibold text-white/90 transition hover:text-white"
                >
                  {item.label}
                  {item.children && <span className="text-[10px]">▾</span>}
                </Link>
                {item.children && (
                  <div
                    className={`absolute right-0 top-full min-w-[200px] rounded-b-md bg-white py-2 shadow-xl transition ${
                      openDropdown === item.label ? "block" : "hidden"
                    }`}
                  >
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-2 text-sm text-brand-900 hover:bg-brand-100"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-gray-100 bg-white md:hidden">
          <nav className="container-x flex flex-col py-2">
            {NAV.map((item) => (
              <div key={item.label} className="border-b border-gray-50">
                {item.children ? (
                  <>
                    <p className="px-2 py-3 text-sm font-bold text-brand-900">
                      {item.label}
                    </p>
                    <div className="flex flex-col pb-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="px-4 py-2 text-sm text-gray-600"
                          onClick={() => setMobileOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className="block px-2 py-3 text-sm font-bold text-brand-900"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
