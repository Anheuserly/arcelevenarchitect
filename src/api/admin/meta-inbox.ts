import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/adminSession";
import { getPermissions, normalizeRole } from "@/lib/adminRoles";
import { getMetaInboxData, sendWhatsAppReply, setHumanTakeover, startWhatsAppChat, syncInstagramInbox } from "@/lib/metaInbox";

async function requireInboxAccess() {
  const session = await getAdminSession();
  if (!session) return null;
  const permissions = getPermissions(normalizeRole(session.role));
  return permissions.canViewDashboard ? session : null;
}

export async function GET() {
  if (!(await requireInboxAccess())) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  try {
    return NextResponse.json(await getMetaInboxData());
  } catch (error) {
    console.error("Unable to load Meta inbox", error);
    return NextResponse.json({ message: "Unable to load the Meta inbox." }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const session = await requireInboxAccess();
  if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  try {
    const body = await request.json() as {
      action?: string; conversationId?: string; message?: string; name?: string;
      phoneNumber?: string; templateName?: string; templateLanguage?: string; initialMessage?: string;
    };
    if (body.action === "start_whatsapp") {
      const result = await startWhatsAppChat({
        name: String(body.name || ""),
        phoneNumber: String(body.phoneNumber || ""),
        templateName: String(body.templateName || ""),
        message: String(body.initialMessage || ""),
        language: String(body.templateLanguage || "en_US"),
      });
      return NextResponse.json({ ok: true, ...result });
    }
    if (body.action === "sync_instagram") {
      const result = await syncInstagramInbox();
      return NextResponse.json({ ok: true, ...result });
    }
    const conversationId = String(body.conversationId || "").trim();
    if (!conversationId) return NextResponse.json({ message: "Conversation is required." }, { status: 400 });

    if (body.action === "takeover" || body.action === "resume") {
      const updated = await setHumanTakeover(conversationId, body.action === "takeover", session.adminId);
      if (!updated) return NextResponse.json({ message: "Conversation was not found." }, { status: 404 });
      return NextResponse.json({ ok: true });
    }
    if (body.action === "send_whatsapp") {
      const message = String(body.message || "").trim();
      if (!message || message.length > 4096) return NextResponse.json({ message: "Enter a message up to 4,096 characters." }, { status: 400 });
      const result = await sendWhatsAppReply(conversationId, message);
      return NextResponse.json({ ok: true, ...result });
    }
    return NextResponse.json({ message: "Unsupported inbox action." }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ message: error instanceof Error ? error.message : "Inbox action failed." }, { status: 500 });
  }
}
