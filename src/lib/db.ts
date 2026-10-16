import { Pool } from "pg";

let pool: Pool | null = null;

function isTransientConnectionError(error: unknown) {
  const code = typeof error === "object" && error && "code" in error ? String(error.code) : "";
  return ["ETIMEDOUT", "ECONNRESET", "ECONNREFUSED", "EPIPE", "57P01"].includes(code);
}

export function getDbPool(): Pool {
  if (!pool) {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error("DATABASE_URL is required for database access.");
    }

    pool = new Pool({
      connectionString,
      ssl: process.env.DATABASE_SSL === "true" ? { rejectUnauthorized: false } : false,
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 10000,
      query_timeout: 30000,
      keepAlive: true,
    });

    // pg emits an error for an idle socket outside an individual query promise.
    // Listening here prevents a temporary VPS network issue from crashing Next.js.
    pool.on("error", (error: Error & { code?: string }) => {
      console.error("PostgreSQL idle client error:", error.code || error.message);
    });
  }
  return pool;
}

export async function query<T = unknown>(text: string, params?: unknown[]): Promise<T[]> {
  const p = getDbPool();
  try {
    const res = await p.query(text, params);
    return res.rows as T[];
  } catch (error) {
    if (!isTransientConnectionError(error)) throw error;

    // Recreate the pool once. Do not retry SQL failures or validation errors.
    if (pool === p) {
      pool = null;
      await p.end().catch(() => undefined);
    }
    const retry = await getDbPool().query(text, params);
    return retry.rows as T[];
  }
}
