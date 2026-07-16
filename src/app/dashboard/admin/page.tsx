import { db, publicUser } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";
import TxActions from "@/components/dashboard/TxActions";

function fmt(n: number) {
  return "$" + n.toLocaleString("en-US", { maximumFractionDigits: 2 });
}

const statusClass: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  approved: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
};

export default async function AdminPage() {
  const admin = await getSessionUser();
  if (!admin || admin.role !== "admin") return null;

  const users = db.users.map(publicUser);
  const deposits = [...db.deposits].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  const withdrawals = [...db.withdrawals].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  const pending = [...deposits, ...withdrawals].filter((t) => t.status === "pending");

  const userName = (id: string) => db.users.find((u) => u.id === id)?.name ?? id;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-brand-900">Admin Overview</h1>
        <p className="text-sm text-gray-500">Manage users and review transactions.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl bg-gradient-to-br from-brand-600 to-brand-500 p-5 text-white shadow">
          <p className="text-xs uppercase opacity-80">Total Users</p>
          <p className="mt-2 text-2xl font-extrabold">{users.length}</p>
        </div>
        <div className="rounded-xl bg-gradient-to-br from-accent-600 to-accent-500 p-5 text-white shadow">
          <p className="text-xs uppercase opacity-80">Pending Review</p>
          <p className="mt-2 text-2xl font-extrabold">{pending.length}</p>
        </div>
        <div className="rounded-xl bg-gradient-to-br from-muted-700 to-brand-600 p-5 text-white shadow">
          <p className="text-xs uppercase opacity-80">Total Volume</p>
          <p className="mt-2 text-2xl font-extrabold">
            {fmt([...deposits, ...withdrawals].reduce((s, t) => s + t.amount, 0))}
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-bold text-brand-900">Pending Transactions</h2>
        {pending.length === 0 ? (
          <p className="text-sm text-gray-500">No pending transactions. 🎉</p>
        ) : (
          <div className="space-y-3">
            {pending.map((t) => {
              const isDep = "method" in t;
              return (
                <div key={t.id} className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-gray-50 bg-gray-50 p-4">
                  <div>
                    <p className="font-semibold text-brand-900">{isDep ? "Deposit" : "Withdrawal"} · {userName(t.userId)}</p>
                    <p className="text-sm text-gray-500">{fmt(t.amount)} {isDep ? `via ${(t as any).method}` : "to wallet"}</p>
                  </div>
                  <TxActions type={isDep ? "deposit" : "withdrawal"} id={t.id} />
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-bold text-brand-900">Users</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left text-gray-400">
                <th className="py-2 pr-4">Name</th>
                <th className="py-2 pr-4">Email</th>
                <th className="py-2 pr-4">Role</th>
                <th className="py-2 pr-4">Balance</th>
                <th className="py-2 pr-4">Country</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-b border-gray-50">
                  <td className="py-2 pr-4 font-medium text-brand-900">{u.name}</td>
                  <td className="py-2 pr-4 text-gray-600">{u.email}</td>
                  <td className="py-2 pr-4 capitalize">{u.role}</td>
                  <td className="py-2 pr-4">{fmt(u.balance)}</td>
                  <td className="py-2 pr-4 text-gray-600">{u.country}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-bold text-brand-900">All Deposits</h2>
          <div className="space-y-2">
            {deposits.map((d) => (
              <div key={d.id} className="flex justify-between text-sm">
                <span className="text-gray-600">{userName(d.userId)} · {d.method}</span>
                <span><b>{fmt(d.amount)}</b> <span className={`ml-2 rounded-full px-2 py-0.5 text-xs ${statusClass[d.status]}`}>{d.status}</span></span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-bold text-brand-900">All Withdrawals</h2>
          <div className="space-y-2">
            {withdrawals.map((w) => (
              <div key={w.id} className="flex justify-between text-sm">
                <span className="text-gray-600">{userName(w.userId)}</span>
                <span><b>{fmt(w.amount)}</b> <span className={`ml-2 rounded-full px-2 py-0.5 text-xs ${statusClass[w.status]}`}>{w.status}</span></span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
