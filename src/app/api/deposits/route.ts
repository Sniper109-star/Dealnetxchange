import { NextResponse } from "next/server";
import { db, fmt } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";
import { sendDepositEmail } from "@/lib/email";

export async function GET() {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  const deposits = db.deposits
    .filter((d) => d.userId === user.id)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  return NextResponse.json({ deposits });
}

export async function POST(request: Request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  const amount = Number(body.amount);
  const method = String(body.method || "Bitcoin");
  if (!amount || amount <= 0) {
    return NextResponse.json({ error: "Enter a valid amount." }, { status: 400 });
  }

  const deposit = {
    id: `dep_${Date.now().toString(36)}`,
    userId: user.id,
    amount,
    method,
    status: "pending" as const,
    createdAt: new Date().toISOString(),
  };
  db.deposits.push(deposit);

  try {
    await sendDepositEmail(user.email, user.name, fmt(amount), method);
  } catch {
    /* email failures must not break the request */
  }

  return NextResponse.json({ success: true, deposit });
}
