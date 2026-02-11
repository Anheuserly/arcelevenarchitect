import { NextRequest, NextResponse } from "next/server";
import { createDocumentServer } from "@/lib/appwriteServer";
import { getAdminSession } from "@/lib/adminSession";
import { getPermissions, normalizeRole } from "@/lib/adminRoles";

export async function POST(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const role = normalizeRole(session.role);
  const permissions = getPermissions(role);
  if (!permissions.canManageSettings) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  try {
    const body = (await request.json()) as {
      title?: string;
      tag?: string;
      date?: string;
      excerpt?: string;
    };

    const title = (body.title || "").trim();
    const excerpt = (body.excerpt || "").trim();

    if (!title || !excerpt) {
      return NextResponse.json(
        { message: "Title and excerpt are required" },
        { status: 400 }
      );
    }

    const collectionId = process.env.NEXT_PUBLIC_APPWRITE_JOURNAL_COLLECTION_ID || "journal";

    const created = await createDocumentServer({
      collectionId,
      data: {
        title,
        tag: (body.tag || "General").trim() || "General",
        date: (body.date || new Date().toISOString().slice(0, 10)).trim(),
        excerpt,
      },
      permissions: ['read("any")', 'update("any")', 'delete("any")'],
    });

    return NextResponse.json({ ok: true, id: created.$id });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to create journal post";
    return NextResponse.json({ message }, { status: 500 });
  }
}
