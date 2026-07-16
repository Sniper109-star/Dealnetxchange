import Link from "next/link";
import { getSessionUser } from "@/lib/auth";
import { db } from "@/lib/db";

function fmt(n: number) {
  return "$" + n.toLocaleString("en-US", { maximumFractionDigits: 2 });
}

export default async function DashboardOverview() {
  const user = await getSessionUser();
  if (!user) return null;

  const investments = db.investments.filter((i) => i.userId === user.id);
  const deposits = db.deposits.filter((d) => d.userId === user.id);
  const withdrawals = db.withdrawals.filter((w) => w.userId === user.id);

  const activeInvestments = investments.filter((i) => i.status === "active");
  const totalInvested = investments.reduce((s, i) => s + i.amount, 0);
  const totalReturns = investments.reduce((s, i) => s + i.returnAmount, 0);
  const pendingWithdrawals = withdrawals.filter((w) => w.status === "pending").length;

  const stats = [
    { label: "Wallet Balance", value: fmt(user.balance), accent: "from-brand-600 to-brand-500" },
    { label: "Active Investments", value: String(activeInvestments.length), accent: "from-accent-600 to-accent-500" },
    { label: "Total Invested", value: fmt(totalInvested), accent: "from-muted-700 to-brand-600" },
    { label: "Pending Withdrawals", value: String(pendingWithdrawals), accent: "from-teal-500 to-brand-500" },
  ];

  const recent = [
    ...deposits.map((d) => ({ kind: "Deposit", amount: d.amount, status: d.status, date: d.createdAt })),
    ...withdrawals.map((w) => ({ kind: "Withdrawal", amount: -w.amount, status: w.status, date: w.createdAt })),
  ]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-brand-900">Dashboard</h1>
        <p className="text-sm text-gray-500">Your investment summary at a glance.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className={`rounded-xl bg-gradient-to-br ${s.accent} p-5 text-white shadow`}>
            <p className="text-xs uppercase opacity-80">{s.label}</p>
            <p className="mt-2 text-2xl font-extrabold">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold text-brand-900">Recent Activity</h2>
            <Link href="/dashboard/deposits" className="text-sm font-semibold text-accent-600">View all</Link>
          </div>
          {recent.length === 0 ? (
            <p className="text-sm text-gray-500">No activity yet.</p>
          ) : (
            <div className="space-y-3">
              {recent.map((r, i) => (
                <div key={i} className="flex items-center justify-between border-b border-gray-50 pb-3 last:border-0">
                  <div>
                    <p className="font-semibold text-brand-900">{r.kind}</p>
                    <p className="text-xs text-gray-400">{new Date(r.date).toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold ${r.amount >= 0 ? "text-green-600" : "text-red-500"}`}>
                      {r.amount >= 0 ? "+" : "-"}{fmt(Math.abs(r.amount))}
                    </p>
                    <p className="text-xs capitalize text-gray-400">{r.status}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-brand-900">Quick Actions</h2>
          <div className="mt-4 space-y-3">
            <Link href="/dashboard/deposits" className="block rounded-md bg-brand-100 px-4 py-3 text-sm font-semibold text-brand-900 hover:bg-brand-100/70">⬇️ Make a Deposit</Link>
            <Link href="/dashboard/withdrawals" className="block rounded-md bg-brand-100 px-4 py-3 text-sm font-semibold text-brand-900 hover:bg-brand-100/70">⬆️ Request Withdrawal</Link>
            <Link href="/dashboard/investments" className="block rounded-md bg-accent-600 px-4 py-3 text-sm font-semibold text-white hover:bg-accent-500">💼 Start Investing</Link>
          </div>
          <div className="mt-6 rounded-lg bg-brand-100/50 p-4 text-sm text-brand-900">
            <p className="font-semibold">Projected returns</p>
            <p className="mt-1 text-2xl font-extrabold">{fmt(totalReturns)}</p>
            <p className="text-xs text-gray-500">across {investments.length} plans</p>
          </div>
        </div>
      </div>
    </div>
  );
}
