import { NextRequest, NextResponse } from "next/server";
import { createDocumentServer } from "@/lib/appwriteServer";
import { getAdminSession } from "@/lib/adminSession";
import { getPermissions, normalizeRole } from "@/lib/adminRoles";

type TeamPayload = {
  name?: string;
  role?: string;
  group?: string;
  photo?: string;
  bio?: string;
  email?: string;
  phone?: string;
  linkedin?: string;
  order?: number;
  active?: boolean;
  extra?: Record<string, unknown>;
};

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
    const body = (await request.json()) as TeamPayload;
    const name = String(body.name || "").trim();
    const memberRole = String(body.role || "").trim();

    if (!name || !memberRole) {
      return NextResponse.json({ message: "Name and role are required" }, { status: 400 });
    }

    const group = String(body.group || "").trim() || "Team";
    const photo = String(body.photo || "").trim();
    const bio = String(body.bio || "").trim();
    const email = String(body.email || "").trim();
    const phone = String(body.phone || "").trim();
    const linkedin = String(body.linkedin || "").trim();
    const order = Number.isFinite(body.order) ? Number(body.order) : 0;
    const active = typeof body.active === "boolean" ? body.active : true;
    const extra = body.extra && typeof body.extra === "object" ? body.extra : {};

    const collectionId = process.env.NEXT_PUBLIC_APPWRITE_TEAM_COLLECTION_ID || "team";

    const created = await createDocumentServer({
      collectionId,
      data: {
        name,
        role: memberRole,
        group,
        photo,
        bio,
        email,
        phone,
        linkedin,
        order,
        active,
        ...extra,
      },
      permissions: ['read("any")', 'update("any")', 'delete("any")'],
    });

    return NextResponse.json({ ok: true, id: created.$id });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to create team member";
    return NextResponse.json({ message }, { status: 500 });
  }
}
