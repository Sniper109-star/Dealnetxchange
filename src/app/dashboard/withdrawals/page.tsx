import { db } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";
import WithdrawalForm from "@/components/dashboard/WithdrawalForm";

function fmt(n: number) {
  return "$" + n.toLocaleString("en-US", { maximumFractionDigits: 2 });
}

const statusClass: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  approved: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
};

export default async function WithdrawalsPage() {
  const user = await getSessionUser();
  if (!user) return null;

  const withdrawals = db.withdrawals
    .filter((w) => w.userId === user.id)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-4">
        <h1 className="text-2xl font-extrabold text-brand-900">Withdrawals</h1>
        {withdrawals.length === 0 && (
          <p className="rounded-xl border border-gray-100 bg-white p-6 text-sm text-gray-500 shadow-sm">No withdrawals yet.</p>
        )}
        {withdrawals.map((w) => (
          <div key={w.id} className="flex items-center justify-between rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="min-w-0">
              <p className="font-semibold text-brand-900">-{fmt(w.amount)}</p>
              <p className="truncate text-xs text-gray-400">{w.wallet}</p>
              <p className="text-xs text-gray-400">{new Date(w.createdAt).toLocaleString()}</p>
            </div>
            <span className={`rounded-full px-2 py-0.5 text-xs font-semibold capitalize ${statusClass[w.status]}`}>{w.status}</span>
          </div>
        ))}
      </div>
      <div>
        <WithdrawalForm balance={user.balance} wallet={user.wallet} />
      </div>
    </div>
  );
}
