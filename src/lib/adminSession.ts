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

const textEncoder = new TextEncoder();

function toBase64(bytes: Uint8Array): string {
  let binary = "";
  const chunkSize = 0x8000;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
  }
  return btoa(binary);
}

function fromBase64(value: string): Uint8Array {
  const binary = atob(value);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

function toBase64Url(bytes: Uint8Array): string {
  return toBase64(bytes).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function fromBase64Url(value: string): Uint8Array {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=");
  return fromBase64(padded);
}

function constantTimeEquals(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i += 1) {
    diff |= a[i] ^ b[i];
  }
  return diff === 0;
}

async function sign(data: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    textEncoder.encode(sessionSecret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, textEncoder.encode(data));
  return toBase64Url(new Uint8Array(signature));
}

async function hashUserAgent(userAgent: string): Promise<string> {
  const digest = await crypto.subtle.digest(
    "SHA-256",
    textEncoder.encode(`${sessionSecret}:${userAgent}`)
  );
  return toBase64Url(new Uint8Array(digest));
}

async function encode(payload: AdminSessionPayload): Promise<string> {
  const body = toBase64Url(textEncoder.encode(JSON.stringify(payload)));
  const sig = await sign(body);
  return `${body}.${sig}`;
}

async function decode(token: string): Promise<AdminSessionPayload | null> {
  const [body, sig] = token.split(".");
  if (!body || !sig) return null;
  const expected = await sign(body);

  let sigBytes: Uint8Array;
  let expectedBytes: Uint8Array;
  try {
    sigBytes = fromBase64Url(sig);
    expectedBytes = fromBase64Url(expected);
  } catch {
    return null;
  }
  if (!constantTimeEquals(sigBytes, expectedBytes)) return null;

  try {
    const payloadJson = new TextDecoder().decode(fromBase64Url(body));
    const payload = JSON.parse(payloadJson) as AdminSessionPayload;
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
    ua: await hashUserAgent(userAgent),
    exp: Date.now() + sessionTimeoutMs,
  };
  const token = await encode(payload);
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
  const payload = await decode(token);
  if (!payload) return null;

  const headerStore = await headers();
  const userAgent = headerStore.get("user-agent") || "unknown";
  if (payload.ua !== (await hashUserAgent(userAgent))) {
    return null;
  }

  return payload;
}
