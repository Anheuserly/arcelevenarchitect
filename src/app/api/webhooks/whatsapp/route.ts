import { NextRequest, NextResponse } from "next/server";
import { processMetaWebhook, validateWebhookChallenge, verifyMetaSignature } from "@/lib/metaInbox";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  if (searchParams.get("hub.mode") === "subscribe" && validateWebhookChallenge("whatsapp", searchParams.get("hub.verify_token"))) {
    return new NextResponse(searchParams.get("hub.challenge") || "", { status: 200, headers: { "Content-Type": "text/plain" } });
  }
  return NextResponse.json({ message: "Webhook verification failed." }, { status: 403 });
}

export async function POST(request: NextRequest) {
  const rawBody = await request.text();
  if (!verifyMetaSignature(rawBody, request.headers.get("x-hub-signature-256"))) {
    return NextResponse.json({ message: "Invalid webhook signature." }, { status: 401 });
  }
  try {
    await processMetaWebhook("whatsapp", JSON.parse(rawBody) as Record<string, unknown>);
  } catch (error) {
    console.error("WhatsApp webhook processing failed", error);
  }
  return NextResponse.json({ status: "EVENT_RECEIVED" });
}
