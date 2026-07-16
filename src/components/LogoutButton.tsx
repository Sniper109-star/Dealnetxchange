"use client";

import { SignOutButton } from "@clerk/nextjs";

export default function LogoutButton() {
  return (
    <SignOutButton redirectUrl="/">
      <button className="rounded-md border border-white/20 px-3 py-1.5 text-sm font-semibold text-white hover:bg-white/10">
        Logout
      </button>
    </SignOutButton>
  );
}
