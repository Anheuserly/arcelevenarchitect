import crypto from "node:crypto";
import { cookies, headers } from "next/headers";

const SESSION_COOKIE = "admin_session";
const sessionSecret = process.env.SESSION_SECRET || "dev-insecure-secret";
const sessionTimeoutMs = Number(process.env.SESSION_TIMEOUT || "3600000");

type AdminSessionPayload = {
  adminId: string;
  email: string;
  name: string;
  role: string;
  ua: string;
  exp: number;
};

function sign(data: string): string {
  return crypto.createHmac("sha256", sessionSecret).update(data).digest("base64url");
}

function hashUserAgent(userAgent: string): string {
  return crypto.createHash("sha256").update(`${sessionSecret}:${userAgent}`).digest("base64url");
}

function encode(payload: AdminSessionPayload): string {
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const sig = sign(body);
  return `${body}.${sig}`;
}

function decode(token: string): AdminSessionPayload | null {
  const [body, sig] = token.split(".");
  if (!body || !sig) return null;
  const expected = sign(body);

  const sigBuf = Buffer.from(sig);
  const expBuf = Buffer.from(expected);
  if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) {
    return null;
  }

  try {
    const payload = JSON.parse(Buffer.from(body, "base64url").toString("utf8")) as AdminSessionPayload;
    if (!payload.exp || Date.now() > payload.exp) return null;
    return payload;
  } catch {
    return null;
  }
}

export async function createAdminSessionCookie(input: {
  adminId: string;
  email: string;
  name: string;
  role: string;
}) {
  const headerStore = await headers();
  const userAgent = headerStore.get("user-agent") || "unknown";
  const payload: AdminSessionPayload = {
    ...input,
    ua: hashUserAgent(userAgent),
    exp: Date.now() + sessionTimeoutMs,
  };
  const token = encode(payload);
  const store = await cookies();
  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: Math.floor(sessionTimeoutMs / 1000),
  });
}

export async function clearAdminSessionCookie() {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
}

export async function getAdminSession(): Promise<AdminSessionPayload | null> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  const payload = decode(token);
  if (!payload) return null;

  const headerStore = await headers();
  const userAgent = headerStore.get("user-agent") || "unknown";
  if (payload.ua !== hashUserAgent(userAgent)) {
    return null;
  }

  return payload;
}
