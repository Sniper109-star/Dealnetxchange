import { cookies } from "next/headers";
import { findUserById } from "./db";

export const SESSION_COOKIE = "dealnet_session";

interface SessionPayload {
  userId: string;
  role: "client" | "admin";
}

export function encodeSession(payload: SessionPayload): string {
  const json = JSON.stringify(payload);
  return Buffer.from(json, "utf8").toString("base64url");
}

export function decodeSession(token: string | undefined): SessionPayload | null {
  if (!token) return null;
  try {
    const json = Buffer.from(token, "base64url").toString("utf8");
    const parsed = JSON.parse(json) as SessionPayload;
    if (!parsed.userId || !parsed.role) return null;
    return parsed;
  } catch {
    return null;
  }
}

export type SessionUser = NonNullable<ReturnType<typeof findUserById>>;

export async function getSessionUser(): Promise<SessionUser | null> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  const payload = decodeSession(token);
  if (!payload) return null;
  const user = findUserById(payload.userId);
  if (!user || user.role !== payload.role) return null;
  return user;
}
