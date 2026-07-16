import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";

export async function GET() {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  const withdrawals = db.withdrawals
    .filter((w) => w.userId === user.id)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  return NextResponse.json({ withdrawals });
}

export async function POST(request: Request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  const amount = Number(body.amount);
  const wallet = String(body.wallet || user.wallet);
  if (!amount || amount <= 0) {
    return NextResponse.json({ error: "Enter a valid amount." }, { status: 400 });
  }
  if (amount > user.balance) {
    return NextResponse.json({ error: "Insufficient balance." }, { status: 400 });
  }

  const withdrawal = {
    id: `wd_${Date.now().toString(36)}`,
    userId: user.id,
    amount,
    wallet,
    status: "pending" as const,
    createdAt: new Date().toISOString(),
  };
  db.withdrawals.push(withdrawal);
  return NextResponse.json({ success: true, withdrawal });
}
