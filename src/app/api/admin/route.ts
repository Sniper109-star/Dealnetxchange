import { NextResponse } from "next/server";
import { db, publicUser } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";

export async function GET() {
  const admin = await getSessionUser();
  if (!admin || admin.role !== "admin") {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }
  return NextResponse.json({
    users: db.users.map(publicUser),
    deposits: db.deposits,
    withdrawals: db.withdrawals,
    investments: db.investments,
  });
}

function requireAdmin() {
  return getSessionUser();
}

export async function PATCH(request: Request) {
  const admin = await requireAdmin();
  if (!admin || admin.role !== "admin") {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }

  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  const { type, id, action } = body as {
    type: "deposit" | "withdrawal";
    id: string;
    action: "approved" | "rejected";
  };

  const list = type === "deposit" ? db.deposits : db.withdrawals;
  const tx = list.find((t) => t.id === id);
  if (!tx) return NextResponse.json({ error: "Not found." }, { status: 404 });

  if (tx.status !== "pending") {
    return NextResponse.json({ error: "Already processed." }, { status: 400 });
  }

  tx.status = action;

  const user = db.users.find((u) => u.id === tx.userId);
  if (user) {
    if (type === "deposit" && action === "approved") {
      user.balance += tx.amount;
    }
    if (type === "withdrawal" && action === "approved") {
      user.balance -= tx.amount;
    }
  }

  return NextResponse.json({ success: true, tx });
}
