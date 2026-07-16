"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  };
  return (
    <button
      onClick={logout}
      className="rounded-md border border-white/20 px-3 py-1.5 text-sm font-semibold text-white hover:bg-white/10"
    >
      Logout
    </button>
  );
}
