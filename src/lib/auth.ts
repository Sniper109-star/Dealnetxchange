import { currentUser, auth } from "@clerk/nextjs/server";
import { upsertUserFromClerk, findUserByClerkId, type User, type Role } from "./db";

export type SessionUser = User;

/**
 * Resolves the currently authenticated user from Clerk and syncs them into the
 * local data store (creating a record on first sign-in). Returns null when the
 * request is unauthenticated.
 */
export async function getSessionUser(): Promise<SessionUser | null> {
  const cu = await currentUser();
  if (!cu) return null;

  const primaryEmail = cu.emailAddresses.find((e) => e.id === cu.primaryEmailAddressId)?.emailAddress
    ?? cu.emailAddresses[0]?.emailAddress
    ?? "";
  const name = [cu.firstName, cu.lastName].filter(Boolean).join(" ") || cu.username || "New Investor";

  // Honor an admin designation stored in Clerk public metadata.
  const metaRole = (cu.publicMetadata?.role as Role | undefined) ?? undefined;

  const { user } = upsertUserFromClerk({
    clerkId: cu.id,
    email: primaryEmail,
    name,
    role: metaRole,
  });
  return user;
}

/**
 * Same as getSessionUser, but also triggers a welcome email the first time a
 * user is created (used by the dashboard layout).
 */
export async function getOrCreateUserWithWelcome(): Promise<SessionUser | null> {
  const cu = await currentUser();
  if (!cu) return null;

  const primaryEmail = cu.emailAddresses.find((e) => e.id === cu.primaryEmailAddressId)?.emailAddress
    ?? cu.emailAddresses[0]?.emailAddress
    ?? "";
  const name = [cu.firstName, cu.lastName].filter(Boolean).join(" ") || cu.username || "New Investor";
  const metaRole = (cu.publicMetadata?.role as Role | undefined) ?? undefined;

  const { user, isNew } = upsertUserFromClerk({
    clerkId: cu.id,
    email: primaryEmail,
    name,
    role: metaRole,
  });

  if (isNew && !user.welcomedAt) {
    user.welcomedAt = new Date().toISOString();
    try {
      const { sendWelcomeEmail } = await import("@/lib/email");
      await sendWelcomeEmail(user.email, user.name);
    } catch {
      /* email failures must not break auth */
    }
  }
  return user;
}

/**
 * Used by the Clerk proxy to determine whether the authenticated user is an
 * application admin (based on Clerk public metadata `role === "admin"`).
 */
export async function isAppAdmin(
  authObj: Awaited<ReturnType<typeof auth>>,
): Promise<SessionUser | null> {
  const { userId } = authObj;
  if (!userId) return null;
  const cu = await currentUser();
  if (!cu) return null;
  if (cu.publicMetadata?.role !== "admin") return null;
  return findUserByClerkId(cu.id) ?? null;
}
