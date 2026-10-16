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

  // Admin access is an explicit platform role, not merely an active user account.
  let rows: any[] = [];
  try {
    rows = await query(
      `SELECT auth.id, auth.email, auth.password_hash, roles.code AS role
       FROM auth_accounts auth
       INNER JOIN platform_admin_memberships membership
         ON membership.auth_account_id = auth.id::text
         AND membership.user_id = auth.user_id
         AND membership.status = 'active'
         AND (membership.expires_at IS NULL OR membership.expires_at > now())
       INNER JOIN platform_roles roles ON roles.id = membership.role_id
       WHERE auth.email = $1 AND auth.status = 'active'
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
      role: account.role,
    };
  }

  throw new Error("Invalid credentials");
}
