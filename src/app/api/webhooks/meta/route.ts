import { NextRequest, NextResponse } from "next/server";
import { processMetaWebhook, validateWebhookChallenge, verifyMetaSignature } from "@/lib/metaInbox";

export const runtime = "nodejs";

function channelFromObject(value: unknown) {
  if (value === "whatsapp_business_account") return "whatsapp" as const;
  if (value === "instagram") return "instagram" as const;
  return null;
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const verifyToken = searchParams.get("hub.verify_token");
  let channel: "whatsapp" | "instagram" | null = null;
  if (validateWebhookChallenge("whatsapp", verifyToken)) {
    channel = "whatsapp";
  } else if (validateWebhookChallenge("instagram", verifyToken)) {
    channel = "instagram";
  }

  if (searchParams.get("hub.mode") === "subscribe" && channel) {
    return new NextResponse(searchParams.get("hub.challenge") || "", {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    });
  }

  return NextResponse.json({ message: "Webhook verification failed." }, { status: 403 });
}

export async function POST(request: NextRequest) {
  const rawBody = await request.text();
  if (!verifyMetaSignature(rawBody, request.headers.get("x-hub-signature-256"))) {
    return NextResponse.json({ message: "Invalid webhook signature." }, { status: 401 });
  }

  try {
    const payload = JSON.parse(rawBody) as Record<string, unknown>;
    const channel = channelFromObject(payload.object);
    if (!channel) return NextResponse.json({ status: "EVENT_IGNORED" });
    await processMetaWebhook(channel, payload);
  } catch (error) {
    console.error("Meta webhook processing failed", error);
  }

  return NextResponse.json({ status: "EVENT_RECEIVED" });
}
