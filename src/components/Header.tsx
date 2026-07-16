"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { NAV } from "@/lib/site";
import { Logo } from "./Logo";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="border-b border-gray-100">
        <div className="container-x flex items-center justify-between py-3">
          <Logo />
          <div className="hidden items-center gap-2 md:flex">
            <Show when="signed-out">
              <SignInButton mode="redirect">
                <button className="rounded-md px-4 py-2 text-sm font-semibold text-brand-900 hover:text-accent-600">
                  Login
                </button>
              </SignInButton>
              <SignUpButton mode="redirect">
                <button className="btn-primary px-5 py-2 text-sm">Sign Up</button>
              </SignUpButton>
            </Show>
            <Show when="signed-in">
              <Link href="/dashboard" className="rounded-md px-4 py-2 text-sm font-semibold text-brand-900 hover:text-accent-600">
                Dashboard
              </Link>
              <UserButton />
            </Show>
          </div>
          <button
            className="flex flex-col gap-1.5 p-2 md:hidden"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            <span className="h-0.5 w-6 bg-brand-900" />
            <span className="h-0.5 w-6 bg-brand-900" />
            <span className="h-0.5 w-6 bg-brand-900" />
          </button>
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
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
            aria-hidden
          />
          <div className="absolute right-0 top-0 flex h-full w-[82%] max-w-xs flex-col bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
              <span className="text-lg font-extrabold text-brand-900">Menu</span>
              <button
                className="rounded-md p-2 text-2xl leading-none text-brand-900"
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
              >
                &times;
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto px-2 py-3">
              {NAV.map((item) => (
                <div key={item.label} className="border-b border-gray-50">
                  {item.children ? (
                    <>
                      <p className="px-3 py-3 text-sm font-bold text-brand-900">
                        {item.label}
                      </p>
                      <div className="pb-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block rounded-md px-4 py-3 text-sm text-gray-600 active:bg-brand-100"
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
                      className="block rounded-md px-3 py-3 text-sm font-bold text-brand-900 active:bg-brand-100"
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </nav>
            <div className="grid grid-cols-2 gap-2 border-t border-gray-100 p-4">
              <Show when="signed-out">
                <SignInButton mode="redirect">
                  <button className="rounded-md border border-brand-900 py-3 text-center text-sm font-semibold text-brand-900">
                    Login
                  </button>
                </SignInButton>
                <SignUpButton mode="redirect">
                  <button className="btn-primary py-3 text-center text-sm">Sign Up</button>
                </SignUpButton>
              </Show>
              <Show when="signed-in">
                <Link href="/dashboard" className="btn-primary col-span-2 py-3 text-center text-sm" onClick={() => setMobileOpen(false)}>
                  Go to Dashboard
                </Link>
              </Show>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
