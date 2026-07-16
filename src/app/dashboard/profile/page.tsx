import { getSessionUser } from "@/lib/auth";
import ProfileForm from "@/components/dashboard/ProfileForm";

function fmt(n: number) {
  return "$" + n.toLocaleString("en-US", { maximumFractionDigits: 2 });
}

export default async function ProfilePage() {
  const user = await getSessionUser();
  if (!user) return null;

  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="text-2xl font-extrabold text-brand-900">My Profile</h1>

      <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-400">Account Balance</p>
            <p className="text-xl font-extrabold text-brand-900">{fmt(user.balance)}</p>
          </div>
          <div>
            <p className="text-gray-400">Role</p>
            <p className="text-xl font-extrabold capitalize text-brand-900">{user.role}</p>
          </div>
          <div>
            <p className="text-gray-400">Member Since</p>
            <p className="font-semibold text-brand-900">{new Date(user.createdAt).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-gray-400">Country</p>
            <p className="font-semibold text-brand-900">{user.country}</p>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-bold text-brand-900">Edit Details</h2>
        <ProfileForm name={user.name} email={user.email} wallet={user.wallet} country={user.country} />
      </div>
    </div>
  );
}
