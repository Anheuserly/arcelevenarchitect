import { query } from "@/lib/db";

export type AdminRecord = Record<string, unknown> & {
  $id?: string;
  id?: string;
  $createdAt?: string;
  createdAt?: string;
  status?: string;
};

type DashboardData = {
  requests: AdminRecord[];
  feedback: AdminRecord[];
  applications: AdminRecord[];
  projects: AdminRecord[];
  team: AdminRecord[];
};

const BUSINESS_ID = process.env.NEXT_PUBLIC_BUSINESS_ID || "6ab5e485-5b76-4ceb-9f3f-bc61f9bd4687";

export async function getDashboardData(): Promise<DashboardData> {
  try {
    const [requestsRows, feedbackRows, appRows, listingRows] = await Promise.all([
      query(
        `SELECT id as "$id", id, title, description, requester_name as name,
                requester_email as email, requester_phone as phone, status,
                created_at as "createdAt"
         FROM work_requests 
         WHERE assigned_business_id = $1 
         ORDER BY created_at DESC LIMIT 50`,
        [BUSINESS_ID]
      ).catch(() => []),

      query(
        `SELECT id as "$id", id, customer_name as name, customer_email as email,
                customer_phone as phone, rating, message, page_url, status,
                created_at as "createdAt"
         FROM feedback 
         WHERE business_id = $1 
         ORDER BY created_at DESC LIMIT 50`,
        [BUSINESS_ID]
      ).catch(() => []),

      query(
        `SELECT id as "$id", id, applicant_name as name, email, phone, position,
                experience, location, status, created_at as "createdAt"
         FROM career_applications 
         WHERE business_id = $1 
         ORDER BY created_at DESC LIMIT 50`,
        [BUSINESS_ID]
      ).catch(() => []),

      query(
        `SELECT id as "$id", id, title, category, price, currency,
                availability as status, created_at as "createdAt"
         FROM listings 
         WHERE business_id = $1 
         ORDER BY created_at DESC LIMIT 50`,
        [BUSINESS_ID]
      ).catch(() => []),
    ]);

    return {
      requests: requestsRows as AdminRecord[],
      feedback: feedbackRows as AdminRecord[],
      applications: appRows as AdminRecord[],
      projects: listingRows as AdminRecord[],
      team: [] as AdminRecord[],
    };
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return {
      requests: [],
      feedback: [],
      applications: [],
      projects: [],
      team: [],
    };
  }
}

export function pickValue(record: AdminRecord, keys: string[]): string {
  for (const key of keys) {
    const value = record[key];
    if (typeof value === "string" && value.trim()) return value;
    if (typeof value === "number") return String(value);
  }
  return "";
}

export function formatDateTime(value: unknown): string {
  if (!value) return "";
  const date = new Date(String(value));
  if (Number.isNaN(date.getTime())) return String(value);
  return date.toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}
