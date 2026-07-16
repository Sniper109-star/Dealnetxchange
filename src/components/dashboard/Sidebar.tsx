"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/dashboard", label: "Home", icon: "📊" },
  { href: "/dashboard/investments", label: "Invest", icon: "💼" },
  { href: "/dashboard/deposits", label: "Deposit", icon: "⬇️" },
  { href: "/dashboard/withdrawals", label: "Withdraw", icon: "⬆️" },
  { href: "/dashboard/profile", label: "Profile", icon: "👤" },
];

export default function Sidebar({ isAdmin = false }: { isAdmin?: boolean }) {
  const pathname = usePathname();
  const allLinks = isAdmin
    ? [...links, { href: "/dashboard/admin", label: "Admin", icon: "🛡️" }]
    : links;

  const isActive = (href: string) =>
    href === "/dashboard" ? pathname === href : pathname.startsWith(href);

  return (
    <>
      <aside className="hidden w-64 shrink-0 bg-muted-900 text-white md:block">
        <div className="px-6 py-5 text-xl font-extrabold">
          Dealnet<span className="text-accent-400">xchange</span>
        </div>
        <nav className="mt-2 flex flex-col">
          {allLinks.map((l) => {
            const active = isActive(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`flex items-center gap-3 px-6 py-3 text-sm font-medium transition ${
                  active ? "bg-accent-600 text-white" : "text-white/70 hover:bg-white/5 hover:text-white"
                }`}
              >
                <span>{l.icon}</span>
                {l.label === "Home" ? "Overview" : l.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      <nav
        className="fixed inset-x-0 bottom-0 z-40 flex border-t border-gray-200 bg-white/95 backdrop-blur md:hidden safe-bottom"
        aria-label="Dashboard navigation"
      >
        {allLinks.map((l) => {
          const active = isActive(l.href);
          return (
            <Link
              key={l.href}
              href={l.href}
              className={`flex flex-1 flex-col items-center gap-0.5 py-2 text-[11px] font-medium ${
                active ? "text-accent-600" : "text-gray-500"
              }`}
            >
              <span className="text-xl leading-none">{l.icon}</span>
              {l.label}
            </Link>
          );
        })}
      </nav>
    </>
  );
}
