import { listDocumentsServer } from "@/lib/appwriteServer";

export type AdminRecord = Record<string, unknown> & {
  $id?: string;
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

function byNewest(a: AdminRecord, b: AdminRecord): number {
  const aDate = String(a.createdAt || a.$createdAt || "");
  const bDate = String(b.createdAt || b.$createdAt || "");
  return bDate.localeCompare(aDate);
}

async function safeList(collectionId: string | undefined, limit: number) {
  if (!collectionId) return [] as AdminRecord[];
  try {
    const items = await listDocumentsServer<AdminRecord>({ collectionId, limit });
    return items.sort(byNewest);
  } catch {
    return [] as AdminRecord[];
  }
}

export async function getDashboardData(): Promise<DashboardData> {
  const requestCollectionId =
    process.env.NEXT_PUBLIC_APPWRITE_SERVICE_REQUESTS_COLLECTION_ID || "requests";
  const feedbackCollectionId =
    process.env.NEXT_PUBLIC_APPWRITE_FEEDBACK_COLLECTION_ID || "feedback";
  const applicationsCollectionId =
    process.env.NEXT_PUBLIC_APPWRITE_CAREER_APPLICATIONS_COLLECTION_ID ||
    "career_applications";
  const projectsCollectionId =
    process.env.NEXT_PUBLIC_APPWRITE_PROJECTS_COLLECTION_ID || "projects";
  const teamCollectionId = process.env.NEXT_PUBLIC_APPWRITE_TEAM_COLLECTION_ID || "team";

  const [requests, feedback, applications, projects, team] = await Promise.all([
    safeList(requestCollectionId, 25),
    safeList(feedbackCollectionId, 25),
    safeList(applicationsCollectionId, 25),
    safeList(projectsCollectionId, 25),
    safeList(teamCollectionId, 25),
  ]);

  return { requests, feedback, applications, projects, team };
}

export function pickValue(record: AdminRecord, keys: string[]): string {
  for (const key of keys) {
    const value = record[key];
    if (typeof value === "string" && value.trim()) return value;
    if (typeof value === "number") return String(value);
  }
  return "-";
}

export function buildFileViewUrl(fileId: string): string | null {
  const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
  const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
  const bucketId =
    process.env.NEXT_PUBLIC_APPWRITE_CAREER_UPLOADS_BUCKET_ID ||
    process.env.NEXT_PUBLIC_APPWRITE_ESTIMATOR_ATTACHMENTS_BUCKET_ID;

  if (!endpoint || !projectId || !bucketId || !fileId) return null;
  return `${endpoint}/storage/buckets/${bucketId}/files/${fileId}/view?project=${projectId}`;
}
