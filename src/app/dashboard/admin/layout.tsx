import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth";
import Sidebar from "@/components/dashboard/Sidebar";
import LogoutButton from "@/components/LogoutButton";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getSessionUser();
  if (!user) redirect("/sign-in");
  if (user.role !== "admin") redirect("/dashboard");

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar isAdmin />
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between gap-3 border-b border-gray-200 bg-muted-900 px-4 py-3 text-white sm:px-6 sm:py-4">
          <div className="min-w-0">
            <p className="text-xs text-white/50">Admin Panel</p>
            <p className="truncate font-bold">{user.name}</p>
          </div>
          <LogoutButton />
        </header>
        <main className="flex-1 p-4 pb-24 sm:p-6 md:pb-6">{children}</main>
      </div>
    </div>
  );
}
