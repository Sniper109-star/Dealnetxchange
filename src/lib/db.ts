export type Role = "client" | "admin";

export type PlanId = "starter" | "silver" | "gold" | "diamond";

export interface Plan {
  id: PlanId;
  name: string;
  percent: number;
  durationHours: number;
  min: number;
  max: number;
}

export interface User {
  id: string;
  clerkId: string;
  name: string;
  email: string;
  password: string;
  role: Role;
  balance: number;
  wallet: string;
  country: string;
  createdAt: string;
  welcomedAt?: string;
}

export type TxStatus = "pending" | "approved" | "rejected";

export interface Investment {
  id: string;
  userId: string;
  planId: PlanId;
  amount: number;
  returnAmount: number;
  status: "active" | "completed";
  startedAt: string;
  endsAt: string;
}

export interface Deposit {
  id: string;
  userId: string;
  amount: number;
  method: string;
  status: TxStatus;
  createdAt: string;
}

export interface Withdrawal {
  id: string;
  userId: string;
  amount: number;
  wallet: string;
  status: TxStatus;
  createdAt: string;
}

export const PLANS: Plan[] = [
  { id: "starter", name: "Starter Plan", percent: 15, durationHours: 24, min: 1000, max: 5000 },
  { id: "silver", name: "Silver Plan", percent: 30, durationHours: 24, min: 5000, max: 10000 },
  { id: "gold", name: "Gold Plan", percent: 60, durationHours: 48, min: 10000, max: 50000 },
  { id: "diamond", name: "Diamond Plan", percent: 100, durationHours: 42, min: 50000, max: Infinity },
];

export function getPlan(id: PlanId): Plan {
  return PLANS.find((p) => p.id === id) ?? PLANS[0];
}

interface DB {
  users: User[];
  investments: Investment[];
  deposits: Deposit[];
  withdrawals: Withdrawal[];
}

const now = () => new Date().toISOString();
const iso = (hours: number) =>
  new Date(Date.now() + hours * 3600 * 1000).toISOString();

function seed(): DB {
  const admin: User = {
    id: "u_admin",
    clerkId: "user_admin",
    name: "Admin Dealnet",
    email: "admin@dealnetxchange.com",
    password: "admin123",
    role: "admin",
    balance: 0,
    wallet: "0xADMIN0000000000000000000000000000000000",
    country: "United Kingdom",
    createdAt: now(),
  };
  const client: User = {
    id: "u_demo",
    clerkId: "user_demo",
    name: "Demo Client",
    email: "client@dealnetxchange.com",
    password: "client123",
    role: "client",
    balance: 12500,
    wallet: "0xCLIENT0000000000000000000000000000000001",
    country: "United States",
    createdAt: now(),
  };

  return {
    users: [admin, client],
    investments: [
      {
        id: "inv_1",
        userId: client.id,
        planId: "gold",
        amount: 10000,
        returnAmount: 16000,
        status: "active",
        startedAt: iso(-12),
        endsAt: iso(36),
      },
      {
        id: "inv_2",
        userId: client.id,
        planId: "silver",
        amount: 5000,
        returnAmount: 6500,
        status: "completed",
        startedAt: iso(-48),
        endsAt: iso(-24),
      },
    ],
    deposits: [
      { id: "dep_1", userId: client.id, amount: 10000, method: "Bitcoin", status: "approved", createdAt: iso(-48) },
      { id: "dep_2", userId: client.id, amount: 5000, method: "Ethereum", status: "approved", createdAt: iso(-20) },
    ],
    withdrawals: [
      { id: "wd_1", userId: client.id, amount: 2000, wallet: client.wallet, status: "pending", createdAt: iso(-2) },
    ],
  };
}

const globalForDb = globalThis as unknown as { __dealnetDb?: DB };

export const db: DB = globalForDb.__dealnetDb ?? (globalForDb.__dealnetDb = seed());

export function findUserByEmail(email: string): User | undefined {
  return db.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
}

export function findUserById(id: string): User | undefined {
  return db.users.find((u) => u.id === id);
}

export function publicUser(u: User) {
  const { password, ...rest } = u;
  return rest;
}

export function upsertUserFromClerk(input: {
  clerkId: string;
  email: string;
  name: string;
  role?: Role;
}): { user: User; isNew: boolean } {
  const existing = db.users.find((u) => u.clerkId === input.clerkId);
  if (existing) {
    existing.email = input.email;
    existing.name = input.name;
    if (input.role) existing.role = input.role;
    return { user: existing, isNew: false };
  }
  const user: User = {
    id: `u_${input.clerkId.replace(/[^a-zA-Z0-9]/g, "").slice(0, 12)}_${Date.now().toString(36)}`,
    clerkId: input.clerkId,
    name: input.name,
    email: input.email,
    password: "",
    role: input.role ?? "client",
    balance: 0,
    wallet: "0x" + input.clerkId.toUpperCase().replace(/[^A-Z0-9]/g, "").padEnd(40, "0").slice(0, 40),
    country: "Unknown",
    createdAt: now(),
  };
  db.users.push(user);
  return { user, isNew: true };
}

export function findUserByClerkId(clerkId: string): User | undefined {
  return db.users.find((u) => u.clerkId === clerkId);
}

export function fmt(n: number): string {
  return "$" + n.toLocaleString("en-US", { maximumFractionDigits: 2 });
}
