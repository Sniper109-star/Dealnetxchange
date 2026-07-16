import { NextResponse } from "next/server";
import { db, findUserByEmail } from "@/lib/db";
import { SESSION_COOKIE, encodeSession } from "@/lib/auth";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  const { name, email, phone, password } = body as Record<string, string>;
  if (!name || !email || !password) {
    return NextResponse.json({ error: "Name, email and password are required." }, { status: 400 });
  }

  if (findUserByEmail(email)) {
    return NextResponse.json({ error: "An account with this email already exists." }, { status: 409 });
  }

  const id = `u_${Date.now().toString(36)}`;
  const user = {
    id,
    name,
    email,
    password,
    role: "client" as const,
    balance: 0,
    wallet: "0x" + id.toUpperCase().replace(/[^A-Z0-9]/g, "").padEnd(40, "0").slice(0, 40),
    country: phone ? "Unknown" : "Unknown",
    createdAt: new Date().toISOString(),
  };
  db.users.push(user);

  const res = NextResponse.json({ success: true, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  res.cookies.set(SESSION_COOKIE, encodeSession({ userId: user.id, role: user.role }), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}
