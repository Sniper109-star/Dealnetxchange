import { getPlan, db } from "@/lib/db";
import { getSessionUser as getSession } from "@/lib/auth";
import InvestmentForm from "@/components/dashboard/InvestmentForm";
import ProgressMeter from "@/components/dashboard/ProgressMeter";

function fmt(n: number) {
  return "$" + n.toLocaleString("en-US", { maximumFractionDigits: 2 });
}

export default async function InvestmentsPage() {
  const user = await getSession();
  if (!user) return null;

  const investments = db.investments
    .filter((i) => i.userId === user.id)
    .sort((a, b) => b.startedAt.localeCompare(a.startedAt));

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-4">
        <h1 className="text-2xl font-extrabold text-brand-900">My Investments</h1>
        {investments.length === 0 && (
          <p className="rounded-xl border border-gray-100 bg-white p-6 text-sm text-gray-500 shadow-sm">
            You have no investments yet. Start one using the form.
          </p>
        )}
        {investments.map((inv) => {
          const plan = getPlan(inv.planId);
          return (
            <div key={inv.id} className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-bold text-brand-900">{plan.name}</h3>
                  <p className="text-sm text-gray-500">Invested {fmt(inv.amount)}</p>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${inv.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                  {inv.status}
                </span>
              </div>
              <div className="mt-4">
                <ProgressMeter startedAt={inv.startedAt} endsAt={inv.endsAt} completed={inv.status === "completed"} />
              </div>
              <div className="mt-3 flex justify-between text-sm">
                <span className="text-gray-500">Return: <b className="text-green-600">{fmt(inv.returnAmount)}</b></span>
                <span className="text-gray-400">{inv.status === "active" ? `Ends ${new Date(inv.endsAt).toLocaleDateString()}` : "Completed"}</span>
              </div>
            </div>
          );
        })}
      </div>
      <div>
        <InvestmentForm balance={user.balance} />
      </div>
    </div>
  );
}
