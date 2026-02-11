import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/adminSession";

export const runtime = "edge";

const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
const apiKey = process.env.APPWRITE_API_KEY;

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ fileId: string }> }
) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { fileId } = await context.params;
  const bucketId =
    process.env.NEXT_PUBLIC_APPWRITE_CAREER_UPLOADS_BUCKET_ID ||
    process.env.NEXT_PUBLIC_APPWRITE_ESTIMATOR_ATTACHMENTS_BUCKET_ID;

  if (!endpoint || !projectId || !bucketId || !fileId) {
    return NextResponse.json({ message: "File config missing" }, { status: 500 });
  }

  const appwriteResponse = await fetch(
    `${endpoint}/storage/buckets/${bucketId}/files/${fileId}/download`,
    {
      method: "GET",
      headers: {
        "X-Appwrite-Project": projectId,
        ...(apiKey ? { "X-Appwrite-Key": apiKey } : {}),
      },
      cache: "no-store",
    }
  );

  if (!appwriteResponse.ok) {
    const text = await appwriteResponse.text();
    return NextResponse.json(
      { message: text || "Failed to load file" },
      { status: appwriteResponse.status }
    );
  }

  const headers = new Headers();
  const contentType =
    appwriteResponse.headers.get("content-type") || "application/octet-stream";
  const contentDisposition =
    appwriteResponse.headers.get("content-disposition") || `inline; filename=\"${fileId}\"`;

  headers.set("content-type", contentType);
  headers.set("content-disposition", contentDisposition);

  return new NextResponse(appwriteResponse.body, {
    status: 200,
    headers,
  });
}
