"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/dashboard", label: "Overview", icon: "📊" },
  { href: "/dashboard/investments", label: "Investments", icon: "💼" },
  { href: "/dashboard/deposits", label: "Deposits", icon: "⬇️" },
  { href: "/dashboard/withdrawals", label: "Withdrawals", icon: "⬆️" },
  { href: "/dashboard/profile", label: "Profile", icon: "👤" },
];

export default function Sidebar({ isAdmin = false }: { isAdmin?: boolean }) {
  const pathname = usePathname();
  const allLinks = isAdmin
    ? [...links, { href: "/dashboard/admin", label: "Admin Panel", icon: "🛡️" }]
    : links;

  return (
    <aside className="w-64 shrink-0 bg-muted-900 text-white">
      <div className="px-6 py-5 text-xl font-extrabold">
        Dealnet<span className="text-accent-400">xchange</span>
      </div>
      <nav className="mt-2 flex flex-col">
        {allLinks.map((l) => {
          const active = pathname === l.href;
          return (
            <Link
              key={l.href}
              href={l.href}
              className={`flex items-center gap-3 px-6 py-3 text-sm font-medium transition ${
                active ? "bg-accent-600 text-white" : "text-white/70 hover:bg-white/5 hover:text-white"
              }`}
            >
              <span>{l.icon}</span>
              {l.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
