import { NextResponse } from "next/server";
import { db, getPlan, type PlanId } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";

export async function GET() {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  const investments = db.investments
    .filter((i) => i.userId === user.id)
    .sort((a, b) => b.startedAt.localeCompare(a.startedAt));
  return NextResponse.json({ investments });
}

export async function POST(request: Request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  const planId = body.planId as PlanId;
  const amount = Number(body.amount);
  const plan = getPlan(planId);
  if (!amount || amount < plan.min || amount > plan.max) {
    return NextResponse.json(
      { error: `Amount must be between ${plan.min} and ${plan.max === Infinity ? "unlimited" : plan.max} USD.` },
      { status: 400 }
    );
  }
  if (amount > user.balance) {
    return NextResponse.json({ error: "Insufficient balance. Please deposit first." }, { status: 400 });
  }

  user.balance -= amount;
  const returnAmount = amount + (amount * plan.percent) / 100;
  const investment = {
    id: `inv_${Date.now().toString(36)}`,
    userId: user.id,
    planId,
    amount,
    returnAmount,
    status: "active" as const,
    startedAt: new Date().toISOString(),
    endsAt: new Date(Date.now() + plan.durationHours * 3600 * 1000).toISOString(),
  };
  db.investments.push(investment);

  return NextResponse.json({ success: true, investment, balance: user.balance });
}
