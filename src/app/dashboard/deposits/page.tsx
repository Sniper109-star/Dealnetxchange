import { db } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";
import DepositForm from "@/components/dashboard/DepositForm";

function fmt(n: number) {
  return "$" + n.toLocaleString("en-US", { maximumFractionDigits: 2 });
}

const statusClass: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  approved: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
};

export default async function DepositsPage() {
  const user = await getSessionUser();
  if (!user) return null;

  const deposits = db.deposits
    .filter((d) => d.userId === user.id)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-4">
        <h1 className="text-2xl font-extrabold text-brand-900">Deposits</h1>
        {deposits.length === 0 && (
          <p className="rounded-xl border border-gray-100 bg-white p-6 text-sm text-gray-500 shadow-sm">No deposits yet.</p>
        )}
        {deposits.map((d) => (
          <div key={d.id} className="flex items-center justify-between rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
            <div>
              <p className="font-semibold text-brand-900">{d.method}</p>
              <p className="text-xs text-gray-400">{new Date(d.createdAt).toLocaleString()}</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-green-600">+{fmt(d.amount)}</p>
              <span className={`rounded-full px-2 py-0.5 text-xs font-semibold capitalize ${statusClass[d.status]}`}>{d.status}</span>
            </div>
          </div>
        ))}
      </div>
      <div>
        <DepositForm />
      </div>
    </div>
  );
}
