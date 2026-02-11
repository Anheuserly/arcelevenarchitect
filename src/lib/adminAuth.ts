import crypto from "node:crypto";
import { listDocumentsServer } from "@/lib/appwriteServer";
import { normalizeRole } from "@/lib/adminRoles";

type AdminRecord = {
  $id: string;
  name?: string;
  role?: string;
  email?: string;
  phone_number?: string;
  password_hash?: string;
};

function hashHex(algorithm: "sha256" | "sha512", input: string): string {
  return crypto.createHash(algorithm).update(input).digest("hex");
}

async function verifyPassword(password: string, storedHash: string): Promise<boolean> {
  // Compatibility fallback for setups where plain text or SHA hashes are stored.
  if (storedHash === password) return true;
  if (storedHash === hashHex("sha256", password)) return true;
  if (storedHash === hashHex("sha512", password)) return true;

  // bcrypt hashes require bcryptjs dependency in this runtime.
  if (storedHash.startsWith("$2a$") || storedHash.startsWith("$2b$") || storedHash.startsWith("$2y$")) {
    try {
      const bcrypt = await import("bcryptjs");
      return bcrypt.compareSync(password, storedHash);
    } catch {
      throw new Error(
        "Password is bcrypt-hashed. Install bcryptjs (`npm i bcryptjs`) or store SHA/plain password in admin table."
      );
    }
  }

  return false;
}

export async function authenticateAdmin(email: string, password: string) {
  const configuredCollectionId = process.env.NEXT_PUBLIC_APPWRITE_ADMIN_COLLECTION_ID;
  let admins: AdminRecord[] = [];

  try {
    admins = await listDocumentsServer<AdminRecord>({
      collectionId: configuredCollectionId || "admin",
      limit: 500,
    });
  } catch {
    admins = await listDocumentsServer<AdminRecord>({
      collectionId: "admin",
      limit: 500,
    });
  }

  const admin = admins.find(
    (item) => item.email?.toLowerCase().trim() === email.toLowerCase().trim()
  );

  if (!admin) {
    throw new Error("Invalid credentials");
  }

  const normalizedRole = normalizeRole(admin.role);

  if (!["admin", "editor"].includes(normalizedRole)) {
    throw new Error("Access denied");
  }

  const storedHash = admin.password_hash || "";
  if (!storedHash) {
    throw new Error("Admin password is not configured");
  }

  const valid = await verifyPassword(password, storedHash);
  if (!valid) {
    throw new Error("Invalid credentials");
  }

  return {
    adminId: admin.$id,
    email: admin.email || email,
    name: admin.name || "Admin",
    role: normalizedRole,
  };
}
