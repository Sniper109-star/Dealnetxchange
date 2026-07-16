import Link from "next/link";
import { redirect } from "next/navigation";
import { getOrCreateUserWithWelcome } from "@/lib/auth";
import Sidebar from "@/components/dashboard/Sidebar";
import LogoutButton from "@/components/LogoutButton";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getOrCreateUserWithWelcome();
  if (!user) redirect("/sign-in");

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar isAdmin={user.role === "admin"} />
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between gap-3 border-b border-gray-200 bg-white px-4 py-3 sm:px-6 sm:py-4">
          <div className="min-w-0">
            <p className="text-xs text-gray-400">Welcome back,</p>
            <p className="truncate font-bold text-brand-900">{user.name}</p>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="rounded-full bg-brand-100 px-2.5 py-1 text-xs font-semibold text-brand-900 capitalize">
              {user.role}
            </span>
            <Link href="/" className="hidden text-sm font-semibold text-accent-600 hover:underline sm:inline">
              View Site
            </Link>
            <LogoutButton />
          </div>
        </header>
        <main className="flex-1 p-4 pb-24 sm:p-6 md:pb-6">{children}</main>
      </div>
    </div>
  );
}
