import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";

export async function PATCH(request: Request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  const { wallet, country } = body as { wallet?: string; country?: string };
  const record = db.users.find((u) => u.id === user.id);
  if (!record) return NextResponse.json({ error: "Not found." }, { status: 404 });

  if (typeof wallet === "string" && wallet.trim()) record.wallet = wallet.trim();
  if (typeof country === "string" && country.trim()) record.country = country.trim();

  return NextResponse.json({ success: true, wallet: record.wallet, country: record.country });
}
