import { NextRequest, NextResponse } from "next/server";
import { createDocumentServer } from "@/lib/appwriteServer";
import { getAdminSession } from "@/lib/adminSession";
import { getPermissions, normalizeRole } from "@/lib/adminRoles";

type ProjectPayload = {
  name?: string;
  slug?: string;
  location?: string;
  category?: string;
  status?: string;
  year?: string;
  summary?: string;
  coverImage?: string;
  gallery?: string[];
  featured?: boolean;
  order?: number;
  areaSqft?: string;
  client?: string;
  services?: string[];
  extra?: Record<string, unknown>;
};

function makeSlug(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function toStringArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value
      .map((item) => String(item || "").trim())
      .filter(Boolean);
  }

  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}

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
    const body = (await request.json()) as ProjectPayload;
    const name = String(body.name || "").trim();
    const summary = String(body.summary || "").trim();

    if (!name || !summary) {
      return NextResponse.json({ message: "Name and summary are required" }, { status: 400 });
    }

    const location = String(body.location || "").trim() || "TBD";
    const category = String(body.category || "").trim() || "Residential";
    const status = String(body.status || "").trim() || "Planning";
    const year = String(body.year || "").trim() || new Date().getFullYear().toString();
    const slug = makeSlug(String(body.slug || name));
    const featured = Boolean(body.featured);
    const order = Number.isFinite(body.order) ? Number(body.order) : 0;
    const coverImage = String(body.coverImage || "").trim();
    const areaSqft = String(body.areaSqft || "").trim();
    const client = String(body.client || "").trim();
    const gallery = toStringArray(body.gallery);
    const services = toStringArray(body.services);
    const extra = body.extra && typeof body.extra === "object" ? body.extra : {};

    const collectionId = process.env.NEXT_PUBLIC_APPWRITE_PROJECTS_COLLECTION_ID || "projects";

    const created = await createDocumentServer({
      collectionId,
      data: {
        name,
        slug,
        location,
        category,
        status,
        year,
        summary,
        coverImage,
        gallery,
        featured,
        order,
        areaSqft,
        client,
        services,
        ...extra,
      },
      permissions: ['read("any")', 'update("any")', 'delete("any")'],
    });

    return NextResponse.json({ ok: true, id: created.$id });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to create project";
    return NextResponse.json({ message }, { status: 500 });
  }
}
