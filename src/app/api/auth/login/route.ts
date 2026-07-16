import { NextResponse } from "next/server";
import { findUserByEmail } from "@/lib/db";
import { SESSION_COOKIE, encodeSession } from "@/lib/auth";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  const { email, password } = body as Record<string, string>;
  if (!email || !password) {
    return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
  }

  const user = findUserByEmail(email);
  if (!user || user.password !== password) {
    return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
  }

  const res = NextResponse.json({
    success: true,
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
  });
  res.cookies.set(SESSION_COOKIE, encodeSession({ userId: user.id, role: user.role }), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}
