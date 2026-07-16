import Link from "next/link";
import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth";
import Sidebar from "@/components/dashboard/Sidebar";
import LogoutButton from "@/components/LogoutButton";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getSessionUser();
  if (!user) redirect("/login");

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar isAdmin={user.role === "admin"} />
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
          <div>
            <p className="text-xs text-gray-400">Welcome back,</p>
            <p className="font-bold text-brand-900">{user.name}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-900 capitalize">
              {user.role}
            </span>
            <Link href="/" className="text-sm font-semibold text-accent-600 hover:underline">
              View Site
            </Link>
            <LogoutButton />
          </div>
        </header>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
