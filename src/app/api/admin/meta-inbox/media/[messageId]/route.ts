import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/adminSession";
import { getPermissions, normalizeRole } from "@/lib/adminRoles";
import { getMetaMediaContent } from "@/lib/metaInbox";

export const runtime = "nodejs";

export async function GET(_request: NextRequest, context: { params: Promise<{ messageId: string }> }) {
  const session = await getAdminSession();
  if (!session || !getPermissions(normalizeRole(session.role)).canViewDashboard) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { messageId } = await context.params;
  try {
    const media = await getMetaMediaContent(messageId);
    if (!media) return NextResponse.json({ message: "Media not found." }, { status: 404 });
    return new NextResponse(media.body, {
      headers: {
        "Content-Type": media.mimeType,
        "Content-Disposition": `inline; filename="${(media.name || "attachment").replace(/[\r\n\"]/g, "")}"`,
        "Cache-Control": "private, max-age=300",
      },
    });
  } catch (error) {
    return NextResponse.json({ message: error instanceof Error ? error.message : "Media could not be loaded." }, { status: 502 });
  }
}
