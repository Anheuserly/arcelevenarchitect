import { query } from "@/lib/db";

const textEncoder = new TextEncoder();

function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
}

async function hashHex(algorithm: "sha256" | "sha512", input: string): Promise<string> {
  const digest = await crypto.subtle.digest(
    algorithm === "sha256" ? "SHA-256" : "SHA-512",
    textEncoder.encode(input)
  );
  return bytesToHex(new Uint8Array(digest));
}

async function verifyPassword(password: string, storedHash: string): Promise<boolean> {
  if (storedHash === password) return true;
  if (storedHash === (await hashHex("sha256", password))) return true;
  if (storedHash === (await hashHex("sha512", password))) return true;

  if (storedHash.startsWith("$2a$") || storedHash.startsWith("$2b$") || storedHash.startsWith("$2y$")) {
    try {
      const bcrypt = await import("bcryptjs");
      return bcrypt.compareSync(password, storedHash);
    } catch {
      throw new Error("Password verification failed.");
    }
  }

  return false;
}

export async function authenticateAdmin(email: string, password: string) {
  const cleanEmail = email.toLowerCase().trim();

  // Primary check: PostgreSQL auth_accounts table
  let rows: any[] = [];
  try {
    rows = await query(
      `SELECT id, email, password_hash
       FROM auth_accounts 
       WHERE LOWER(email) = $1 AND status = 'active'
       LIMIT 1`,
      [cleanEmail]
    );
  } catch (err) {
    console.error("Database auth check error:", err);
  }

  if (rows.length > 0) {
    const account = rows[0];
    const valid = await verifyPassword(password, account.password_hash || "");
    if (!valid) {
      throw new Error("Invalid credentials");
    }

    return {
      adminId: account.id,
      email: account.email,
      name: "Studio Admin",
      role: "admin",
    };
  }

  throw new Error("Invalid credentials");
}
