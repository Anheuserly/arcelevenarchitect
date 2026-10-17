import crypto from "node:crypto";
import { query } from "@/lib/db";

export const META_CHANNELS = ["whatsapp", "instagram"] as const;
export type MetaChannel = (typeof META_CHANNELS)[number];

const BUSINESS_ID = process.env.NEXT_PUBLIC_BUSINESS_ID || "6ab5e485-5b76-4ceb-9f3f-bc61f9bd4687";
const GRAPH_API_VERSION = process.env.META_GRAPH_API_VERSION || "v26.0";

export type MetaInboxConversation = {
  id: string;
  channel: MetaChannel;
  status: "open" | "closed" | "archived";
  isHumanActive: boolean;
  unreadCount: number;
  lastMessageAt: string | null;
  contactName: string;
  contactHandle: string;
  contactPhone: string;
  lastMessage: string;
  messages: Array<{
    id: string;
    direction: "inbound" | "outbound";
    senderType: "customer" | "human_agent" | "automation";
    body: string;
    messageType: string;
    deliveryStatus: string;
    createdAt: string;
    mediaUrl: string | null;
    mediaMimeType: string | null;
    mediaName: string | null;
  }>;
};

export type MetaChannelAccount = {
  channel: MetaChannel;
  status: "connected" | "pending" | "disabled" | "error";
  displayName: string;
  configured: boolean;
};

function metaEnv(channel: MetaChannel) {
  if (channel === "whatsapp") {
    const accountId = process.env.WHATSAPP_BUSINESS_ACCOUNT_ID || "";
    const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID || "";
    return {
      accountId,
      phoneNumberId,
      configured: Boolean(accountId && phoneNumberId && process.env.META_ACCESS_TOKEN),
      displayName: "WhatsApp Business",
    };
  }

  // INSTAGRAM_ACCOUNT_ID is accepted for the temporary operator account while
  // INSTAGRAM_BUSINESS_ACCOUNT_ID remains the production Arc 11 convention.
  const accountId = process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID || process.env.INSTAGRAM_ACCOUNT_ID || "";
  return {
    accountId,
    phoneNumberId: "",
    configured: Boolean(accountId && (process.env.INSTAGRAM_GRAPH_ACCESS_TOKEN || process.env.META_INSTAGRAM_ACCESS_TOKEN || process.env.META_ACCESS_TOKEN)),
    displayName: "Instagram Direct",
  };
}

function normalizeMessageBody(value: unknown, fallback = "") {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

type MetaMedia = {
  reference: string;
  mimeType: string | null;
  name: string | null;
  kind: "image" | "video" | "audio" | "document" | "sticker" | "media";
};

function getMessageMedia(channel: MetaChannel, payload: unknown): MetaMedia | null {
  if (!payload || typeof payload !== "object") return null;
  const record = payload as Record<string, unknown>;
  if (channel === "whatsapp") {
    for (const type of ["image", "video", "audio", "document", "sticker"] as const) {
      const media = record[type];
      if (!media || typeof media !== "object") continue;
      const item = media as { id?: unknown; mime_type?: unknown; filename?: unknown };
      if (typeof item.id === "string" && item.id) {
        return {
          reference: item.id,
          mimeType: typeof item.mime_type === "string" ? item.mime_type : null,
          name: typeof item.filename === "string" ? item.filename : null,
          kind: type === "document" ? "document" : type,
        };
      }
    }
    return null;
  }

  const attachments = record.attachments;
  const data = attachments && typeof attachments === "object" && Array.isArray((attachments as { data?: unknown[] }).data)
    ? (attachments as { data: unknown[] }).data
    : Array.isArray(record.attachments) ? record.attachments : [];
  const first = data[0];
  if (!first || typeof first !== "object") return null;
  const item = first as {
    id?: unknown; url?: unknown; mime_type?: unknown; name?: unknown; payload?: { url?: unknown };
    image_data?: { url?: unknown }; video_data?: { url?: unknown }; audio_data?: { url?: unknown };
    file_data?: { url?: unknown };
  };
  const imageUrl = typeof item.image_data?.url === "string" ? item.image_data.url : "";
  const videoUrl = typeof item.video_data?.url === "string" ? item.video_data.url : "";
  const audioUrl = typeof item.audio_data?.url === "string" ? item.audio_data.url : "";
  const fileUrl = typeof item.file_data?.url === "string" ? item.file_data.url : "";
  const reference = imageUrl || videoUrl || audioUrl || fileUrl || (typeof item.url === "string" ? item.url
    : typeof item.payload?.url === "string" ? item.payload.url
    : typeof item.id === "string" ? item.id : "");
  return reference ? {
    reference,
    mimeType: typeof item.mime_type === "string" ? item.mime_type
      : imageUrl ? "image/jpeg" : videoUrl ? "video/mp4" : audioUrl ? "audio/mpeg" : null,
    name: typeof item.name === "string" ? item.name : null,
    kind: imageUrl ? "image" : videoUrl ? "video" : audioUrl ? "audio" : fileUrl ? "document" : "media",
  } : null;
}

function eventKey(channel: MetaChannel, payload: unknown) {
  return crypto.createHash("sha256").update(`${channel}:${JSON.stringify(payload)}`).digest("hex");
}

export function verifyMetaSignature(rawBody: string, signatureHeader: string | null) {
  const secret = process.env.META_APP_SECRET || process.env.META_WEBHOOK_SECRET;
  if (!secret || !signatureHeader?.startsWith("sha256=")) return false;
  const supplied = signatureHeader.slice("sha256=".length);
  const expected = crypto.createHmac("sha256", secret).update(rawBody, "utf8").digest("hex");
  if (supplied.length !== expected.length) return false;
  return crypto.timingSafeEqual(Buffer.from(supplied, "hex"), Buffer.from(expected, "hex"));
}

export function validateWebhookChallenge(channel: MetaChannel, token: string | null) {
  const expected = channel === "instagram"
    ? process.env.INSTAGRAM_VERIFY_TOKEN || process.env.META_WEBHOOK_VERIFY_TOKEN || process.env.WHATSAPP_VERIFY_TOKEN
    : process.env.WHATSAPP_VERIFY_TOKEN || process.env.META_WEBHOOK_VERIFY_TOKEN;
  if (!expected || !token || token.length !== expected.length) return false;
  return crypto.timingSafeEqual(Buffer.from(token), Buffer.from(expected));
}

function normalizeDeliveryStatus(value: unknown) {
  const status = String(value || "pending").toLowerCase();
  return ["pending", "sent", "delivered", "read", "received", "failed"].includes(status) ? status : "pending";
}

export async function ensureMetaChannelAccounts() {
  await Promise.all(META_CHANNELS.map(async (channel) => {
    const config = metaEnv(channel);
    await query(
      `INSERT INTO arc11_meta_channel_accounts (
        business_id, channel, provider_account_id, provider_phone_number_id, display_name, status, configuration
      ) VALUES ($1, $2, $3, $4, $5, $6, $7::jsonb)
      ON CONFLICT (business_id, channel) DO UPDATE SET
        provider_account_id = EXCLUDED.provider_account_id,
        provider_phone_number_id = EXCLUDED.provider_phone_number_id,
        display_name = EXCLUDED.display_name,
        status = EXCLUDED.status,
        configuration = EXCLUDED.configuration,
        updated_at = now()`,
      [
        BUSINESS_ID,
        channel,
        config.accountId || null,
        config.phoneNumberId || null,
        config.displayName,
        config.configured ? "connected" : "pending",
        JSON.stringify({ providerConfigured: config.configured }),
      ]
    );
  }));
}

export async function getMetaInboxData() {
  await ensureMetaChannelAccounts();
  const [accounts, conversations] = await Promise.all([
    query<{
      channel: MetaChannel;
      status: MetaChannelAccount["status"];
      display_name: string | null;
      provider_account_id: string | null;
    }>(
      `SELECT channel, status, display_name, provider_account_id
       FROM arc11_meta_channel_accounts WHERE business_id = $1 ORDER BY channel`,
      [BUSINESS_ID]
    ),
    query<{
      id: string; channel: MetaChannel; status: MetaInboxConversation["status"]; is_human_active: boolean;
      unread_count: number; last_message_at: Date | null; contact_name: string | null; username: string | null;
      phone_number: string | null; last_message: string | null;
    }>(
      `SELECT c.id, c.channel, c.status, c.is_human_active, c.unread_count, c.last_message_at,
              co.display_name AS contact_name, co.username, co.phone_number,
              latest.body AS last_message
       FROM arc11_meta_conversations c
       JOIN arc11_meta_contacts co ON co.id = c.contact_id
       LEFT JOIN LATERAL (
         SELECT body FROM arc11_meta_messages WHERE conversation_id = c.id
         ORDER BY created_at DESC LIMIT 1
       ) latest ON true
       WHERE c.business_id = $1
       ORDER BY c.last_message_at DESC NULLS LAST, c.created_at DESC`,
      [BUSINESS_ID]
    ),
  ]);

  const ids = conversations.map((item) => item.id);
  const messageRows = ids.length
    ? await query<{
        id: string; conversation_id: string; direction: "inbound" | "outbound"; sender_type: "customer" | "human_agent" | "automation";
        body: string | null; message_type: string; delivery_status: string; created_at: Date;
        channel: MetaChannel; media_url: string | null; media_mime_type: string | null; raw_payload: unknown;
      }>(
        `SELECT id, conversation_id, direction, sender_type, body, message_type, delivery_status, created_at,
                channel, media_url, media_mime_type, raw_payload
         FROM arc11_meta_messages WHERE conversation_id = ANY($1::uuid[])
         ORDER BY created_at ASC`,
        [ids]
      )
    : [];

  const messagesByConversation = new Map<string, MetaInboxConversation["messages"]>();
  for (const message of messageRows) {
    const items = messagesByConversation.get(message.conversation_id) || [];
    const detectedMedia = getMessageMedia(message.channel, message.raw_payload);
    const media = message.media_url || detectedMedia ? {
      reference: message.media_url || detectedMedia!.reference,
      mimeType: message.media_mime_type || detectedMedia?.mimeType || null,
      name: detectedMedia?.name || null,
      kind: detectedMedia?.kind || "media",
    } : null;
    items.push({
      id: message.id,
      direction: message.direction,
      senderType: message.sender_type,
      body: normalizeMessageBody(message.body, `[${message.message_type}]`),
      messageType: message.message_type,
      deliveryStatus: message.delivery_status,
      createdAt: message.created_at.toISOString(),
      mediaUrl: media ? `/api/admin/meta-inbox/media/${message.id}` : null,
      mediaMimeType: media?.mimeType || null,
      mediaName: media?.name || null,
    });
    messagesByConversation.set(message.conversation_id, items);
  }

  return {
    accounts: accounts.map((account) => ({
      channel: account.channel,
      status: account.status,
      displayName: account.display_name || (account.channel === "whatsapp" ? "WhatsApp Business" : "Instagram Direct"),
      configured: Boolean(account.provider_account_id && account.status === "connected"),
    })) as MetaChannelAccount[],
    conversations: conversations.map((conversation) => ({
      id: conversation.id,
      channel: conversation.channel,
      status: conversation.status,
      isHumanActive: conversation.is_human_active,
      unreadCount: conversation.unread_count,
      lastMessageAt: conversation.last_message_at?.toISOString() || null,
      contactName: conversation.contact_name || "Unknown contact",
      contactHandle: conversation.username || "",
      contactPhone: conversation.phone_number || "",
      lastMessage: normalizeMessageBody(conversation.last_message, "No messages yet"),
      messages: messagesByConversation.get(conversation.id) || [],
    })) as MetaInboxConversation[],
  };
}

async function recordWebhookEvent(channel: MetaChannel, payload: unknown) {
  const key = eventKey(channel, payload);
  const inserted = await query<{ id: string }>(
    `INSERT INTO arc11_meta_webhook_events (channel, event_key, payload)
     VALUES ($1, $2, $3::jsonb)
     ON CONFLICT (channel, event_key) DO NOTHING
     RETURNING id`,
    [channel, key, JSON.stringify(payload)]
  );
  return { id: inserted[0]?.id || null, duplicate: !inserted[0] };
}

async function markWebhookEvent(id: string | null, status: "processed" | "ignored" | "failed", error?: unknown) {
  if (!id) return;
  await query(
    `UPDATE arc11_meta_webhook_events
     SET processing_status = $2, error_message = $3, processed_at = now()
     WHERE id = $1`,
    [id, status, error instanceof Error ? error.message : error ? String(error) : null]
  );
}

async function getChannelAccountId(channel: MetaChannel) {
  const rows = await query<{ id: string }>(
    `SELECT id FROM arc11_meta_channel_accounts WHERE business_id = $1 AND channel = $2`,
    [BUSINESS_ID, channel]
  );
  return rows[0]?.id || null;
}

async function createInboundMessage(input: {
  channel: MetaChannel;
  providerUserId: string;
  providerMessageId: string | null;
  displayName?: string | null;
  username?: string | null;
  phoneNumber?: string | null;
  body: string;
  messageType: string;
  media?: MetaMedia | null;
  rawPayload: unknown;
}): Promise<{ conversationId: string; inserted: boolean; isHumanActive: boolean }> {
  const contactRows = await query<{ id: string }>(
    `INSERT INTO arc11_meta_contacts (business_id, channel, provider_user_id, display_name, username, phone_number, profile_data)
     VALUES ($1, $2, $3, $4, $5, $6, $7::jsonb)
     ON CONFLICT (business_id, channel, provider_user_id) DO UPDATE SET
       display_name = COALESCE(NULLIF(arc11_meta_contacts.display_name, ''), EXCLUDED.display_name),
       username = COALESCE(EXCLUDED.username, arc11_meta_contacts.username),
       phone_number = COALESCE(EXCLUDED.phone_number, arc11_meta_contacts.phone_number),
       updated_at = now()
     RETURNING id`,
    [BUSINESS_ID, input.channel, input.providerUserId, input.displayName || null, input.username || null, input.phoneNumber || null, JSON.stringify({})]
  );
  const contactId = contactRows[0].id;
  const channelAccountId = await getChannelAccountId(input.channel);
  const conversationRows = await query<{ id: string; is_human_active: boolean }>(
    `INSERT INTO arc11_meta_conversations (business_id, channel, channel_account_id, contact_id, last_message_at)
     VALUES ($1, $2, $3, $4, now())
     ON CONFLICT (business_id, channel, contact_id) DO UPDATE SET
       unread_count = arc11_meta_conversations.unread_count + 1,
       last_message_at = now(), updated_at = now()
     RETURNING id, is_human_active`,
    [BUSINESS_ID, input.channel, channelAccountId, contactId]
  );
  const conversationId = conversationRows[0].id;
  const messageRows = await query<{ id: string }>(
    `INSERT INTO arc11_meta_messages (
       business_id, conversation_id, channel, provider_message_id, direction, sender_type,
       message_type, body, media_url, media_mime_type, delivery_status, raw_payload
     ) VALUES ($1, $2, $3, $4, 'inbound', 'customer', $5, $6, $7, $8, 'received', $9::jsonb)
     ON CONFLICT (channel, provider_message_id) WHERE provider_message_id IS NOT NULL DO NOTHING
     RETURNING id`,
    [BUSINESS_ID, conversationId, input.channel, input.providerMessageId, input.messageType, input.body, input.media?.reference || null, input.media?.mimeType || null, JSON.stringify(input.rawPayload)]
  );
  const inserted = Boolean(messageRows[0]);
  if (!inserted) {
    await query(
      `UPDATE arc11_meta_conversations SET unread_count = GREATEST(unread_count - 1, 0), updated_at = now() WHERE id = $1`,
      [conversationId]
    );
  }
  return { conversationId, inserted, isHumanActive: conversationRows[0].is_human_active };
}

type InstagramGraphParticipant = { id?: string; username?: string };
type InstagramGraphMessage = {
  id?: string;
  from?: InstagramGraphParticipant;
  message?: string;
  created_time?: string;
  attachments?: { data?: unknown[] };
};
type InstagramGraphConversation = {
  id?: string;
  participants?: { data?: InstagramGraphParticipant[] };
  messages?: { data?: InstagramGraphMessage[] };
};

function instagramAccessToken() {
  return process.env.INSTAGRAM_GRAPH_ACCESS_TOKEN || process.env.META_INSTAGRAM_ACCESS_TOKEN || process.env.META_ACCESS_TOKEN || "";
}

async function getInstagramConversations() {
  const accountId = metaEnv("instagram").accountId;
  const accessToken = instagramAccessToken();
  if (!accountId || !accessToken) throw new Error("Instagram Graph credentials are not configured.");

  const cursorRows = await query<{ cursor: string | null }>(
    `SELECT configuration->>'instagram_sync_cursor' AS cursor
     FROM arc11_meta_channel_accounts WHERE business_id = $1 AND channel = 'instagram'`,
    [BUSINESS_ID]
  );
  const cursor = cursorRows[0]?.cursor || "";
  const url = new URL(`https://graph.facebook.com/${GRAPH_API_VERSION}/${encodeURIComponent(accountId)}/conversations`);
  url.searchParams.set("fields", "id,participants{id,username}");
  url.searchParams.set("limit", "5");
  url.searchParams.set("access_token", accessToken);
  if (cursor) url.searchParams.set("after", cursor);
  const response = await fetch(url);
  const payload = await response.json().catch(() => ({})) as {
    data?: InstagramGraphConversation[];
    paging?: { cursors?: { after?: string } };
    error?: { message?: string };
  };
  if (!response.ok) throw new Error(payload.error?.message || "Instagram conversation sync was rejected by Meta.");
  const conversations = Array.isArray(payload.data) ? payload.data : [];

  // Nested conversation fields are rejected by Meta when the requested payload is
  // large. Batch message reads give us the same real data without the oversized call.
  for (let start = 0; start < conversations.length; start += 5) {
    // Five threads per batch is accepted reliably by the current Instagram Graph
    // endpoint; larger batches are rejected as an oversized field expansion.
    const batch = conversations.slice(start, start + 5).filter((item): item is InstagramGraphConversation & { id: string } => Boolean(item.id)).map((item) => ({
      method: "GET",
      relative_url: `${encodeURIComponent(item.id)}/messages?fields=id,from,message,created_time,attachments&limit=100`,
    }));
    if (!batch.length) continue;
    const batchResponse = await fetch(`https://graph.facebook.com/${GRAPH_API_VERSION}`, {
      method: "POST",
      body: new URLSearchParams({ access_token: accessToken, batch: JSON.stringify(batch) }),
    });
    const results = await batchResponse.json().catch(() => []) as Array<{ code?: number; body?: string }>;
    if (!batchResponse.ok || !Array.isArray(results)) throw new Error("Instagram message sync was rejected by Meta.");
    results.forEach((result, offset) => {
      if (result.code !== 200 || !result.body) return;
      const body = JSON.parse(result.body) as { data?: InstagramGraphMessage[] };
      const conversation = conversations[start + offset];
      if (conversation) conversation.messages = { data: Array.isArray(body.data) ? body.data : [] };
    });
  }
  const nextCursor = payload.paging?.cursors?.after || "";
  await query(
    `UPDATE arc11_meta_channel_accounts
     SET configuration = CASE WHEN $2 = '' THEN configuration - 'instagram_sync_cursor'
                              ELSE jsonb_set(configuration, '{instagram_sync_cursor}', to_jsonb($2::text), true) END,
         updated_at = now()
     WHERE business_id = $1 AND channel = 'instagram'`,
    [BUSINESS_ID, nextCursor]
  );
  return { conversations, hasMore: Boolean(nextCursor) };
}

async function importInstagramMessage(input: {
  contact: Required<Pick<InstagramGraphParticipant, "id">> & InstagramGraphParticipant;
  threadId: string;
  message: InstagramGraphMessage;
  connectedAccountId: string;
}) {
  const sender = input.message.from;
  if (!input.message.id || !sender?.id) return false;
  const createdAt = input.message.created_time && !Number.isNaN(new Date(input.message.created_time).getTime())
    ? new Date(input.message.created_time).toISOString()
    : new Date().toISOString();
  const isInbound = sender.id !== input.connectedAccountId;
  const contactRows = await query<{ id: string }>(
    `INSERT INTO arc11_meta_contacts (business_id, channel, provider_user_id, display_name, username, profile_data)
     VALUES ($1, 'instagram', $2, $3, $4, $5::jsonb)
     ON CONFLICT (business_id, channel, provider_user_id) DO UPDATE SET
       display_name = COALESCE(NULLIF(EXCLUDED.display_name, ''), arc11_meta_contacts.display_name),
       username = COALESCE(EXCLUDED.username, arc11_meta_contacts.username), updated_at = now()
     RETURNING id`,
    [BUSINESS_ID, input.contact.id, input.contact.username || "Instagram contact", input.contact.username || null, JSON.stringify({ providerThreadId: input.threadId })]
  );
  const channelAccountId = await getChannelAccountId("instagram");
  const conversationRows = await query<{ id: string }>(
    `INSERT INTO arc11_meta_conversations (business_id, channel, channel_account_id, contact_id, provider_thread_id, last_message_at)
     VALUES ($1, 'instagram', $2, $3, $4, $5::timestamptz)
     ON CONFLICT (business_id, channel, contact_id) DO UPDATE SET
       provider_thread_id = EXCLUDED.provider_thread_id,
       last_message_at = GREATEST(COALESCE(arc11_meta_conversations.last_message_at, '-infinity'::timestamptz), EXCLUDED.last_message_at),
       updated_at = now()
     RETURNING id`,
    [BUSINESS_ID, channelAccountId, contactRows[0].id, input.threadId, createdAt]
  );
  const body = normalizeMessageBody(input.message.message, input.message.attachments?.data?.length ? "[Instagram media]" : "[Instagram message]");
  const media = getMessageMedia("instagram", input.message);
  const messageRows = await query<{ id: string }>(
    `INSERT INTO arc11_meta_messages (
       business_id, conversation_id, channel, provider_message_id, direction, sender_type,
       message_type, body, media_url, media_mime_type, delivery_status, raw_payload, created_at
     ) VALUES ($1, $2, 'instagram', $3, $4, $5, $6, $7, $8, $9, $10, $11::jsonb, $12::timestamptz)
     ON CONFLICT (channel, provider_message_id) WHERE provider_message_id IS NOT NULL DO NOTHING
     RETURNING id`,
    [
      BUSINESS_ID,
      conversationRows[0].id,
      input.message.id,
      isInbound ? "inbound" : "outbound",
      isInbound ? "customer" : "human_agent",
      input.message.attachments?.data?.length ? "media" : "text",
      body,
      media?.reference || null,
      media?.mimeType || null,
      isInbound ? "received" : "sent",
      JSON.stringify(input.message),
      createdAt,
    ]
  );
  return Boolean(messageRows[0]);
}

export async function syncInstagramInbox() {
  await ensureMetaChannelAccounts();
  const connectedAccountId = metaEnv("instagram").accountId;
  if (!connectedAccountId) throw new Error("Instagram account is not configured.");
  const { conversations, hasMore } = await getInstagramConversations();
  let importedMessages = 0;
  let importedConversations = 0;

  for (const conversation of conversations) {
    if (!conversation.id) continue;
    const contact = conversation.participants?.data?.find((participant) => participant.id && participant.id !== connectedAccountId);
    if (!contact?.id) continue;
    importedConversations += 1;
    // Meta returns the newest message first. The database query is ordered by
    // timestamp, so importing in either order preserves the true conversation flow.
    for (const message of conversation.messages?.data || []) {
      if (await importInstagramMessage({ contact: { ...contact, id: contact.id }, threadId: conversation.id, message, connectedAccountId })) {
        importedMessages += 1;
      }
    }
  }

  return { conversations: importedConversations, messages: importedMessages, hasMore };
}

export async function getMetaMediaContent(messageId: string) {
  const rows = await query<{
    channel: MetaChannel; media_url: string | null; media_mime_type: string | null; raw_payload: unknown;
  }>(
    `SELECT m.channel, m.media_url, m.media_mime_type, m.raw_payload
     FROM arc11_meta_messages m
     JOIN arc11_meta_conversations c ON c.id = m.conversation_id
     WHERE m.id = $1 AND m.business_id = $2 AND c.business_id = $2`,
    [messageId, BUSINESS_ID]
  );
  const record = rows[0];
  if (!record) return null;
  const media = record.media_url ? {
    reference: record.media_url,
    mimeType: record.media_mime_type,
    name: getMessageMedia(record.channel, record.raw_payload)?.name || null,
    kind: getMessageMedia(record.channel, record.raw_payload)?.kind || "media" as const,
  } : getMessageMedia(record.channel, record.raw_payload);
  if (!media) return null;

  let sourceUrl = media.reference;
  let mimeType = media.mimeType || "application/octet-stream";
  if (record.channel === "whatsapp" && !/^https?:\/\//i.test(sourceUrl)) {
    const accessToken = process.env.META_ACCESS_TOKEN;
    if (!accessToken) throw new Error("WhatsApp credentials are not configured.");
    const metadataResponse = await fetch(`https://graph.facebook.com/${GRAPH_API_VERSION}/${encodeURIComponent(sourceUrl)}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const metadata = await metadataResponse.json().catch(() => ({})) as { url?: string; mime_type?: string; error?: { message?: string } };
    if (!metadataResponse.ok || !metadata.url) throw new Error(metadata.error?.message || "Meta media could not be located.");
    sourceUrl = metadata.url;
    mimeType = metadata.mime_type || mimeType;
  }
  const accessToken = record.channel === "instagram" ? instagramAccessToken() : process.env.META_ACCESS_TOKEN || "";
  const response = await fetch(sourceUrl, {
    headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : undefined,
  });
  if (!response.ok || !response.body) throw new Error("The provider media file is no longer available.");
  return {
    body: response.body,
    mimeType: response.headers.get("content-type") || mimeType,
    name: media.name,
  };
}

async function claimWhatsAppAutoReply(conversationId: string) {
  const rows = await query<{ id: string }>(
    `UPDATE arc11_meta_conversations
     SET metadata = jsonb_set(metadata, '{last_automated_reply_at}', to_jsonb(now()::text), true),
         updated_at = now()
     WHERE id = $1
       AND is_human_active = false
       AND (
         NOT (metadata ? 'last_automated_reply_at')
         OR (metadata->>'last_automated_reply_at')::timestamptz < now() - interval '24 hours'
       )
     RETURNING id`,
    [conversationId]
  );
  return Boolean(rows[0]);
}

function getWhatsAppAutoReply() {
  return [
    "Welcome to ARC 11 Architect.",
    "We can help with architecture, interiors, 3D visualisation, renovation, and turnkey execution.",
    "Reply with the project type, site location, approximate area, and your intended timeline. Our studio team will guide the next step.",
  ].join("\n\n");
}

function isWhatsAppAutomationGreeting(message: string) {
  return /^(hi|hello|hey|menu|start)[!. ]*$/i.test(message.trim());
}

function isFreshWhatsAppMessage(timestamp: unknown) {
  const seconds = Number(timestamp);
  if (!Number.isFinite(seconds) || seconds <= 0) return false;

  // Meta timestamps are Unix seconds. Stale deliveries are still recorded in the inbox,
  // but must never wake the assistant and send an unexpected reply.
  const ageInSeconds = Math.floor(Date.now() / 1000) - seconds;
  return ageInSeconds >= -60 && ageInSeconds <= 120;
}

async function deliverWhatsAppMessage(input: {
  conversationId: string;
  phoneNumber: string;
  body: string;
  senderType: "human_agent" | "automation";
}) {
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const accessToken = process.env.META_ACCESS_TOKEN;
  if (!phoneNumberId || !accessToken) throw new Error("WhatsApp credentials are not configured.");

  const response = await fetch(`https://graph.facebook.com/${GRAPH_API_VERSION}/${phoneNumberId}/messages`, {
    method: "POST",
    headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      messaging_product: "whatsapp", recipient_type: "individual", to: input.phoneNumber.replace(/\D/g, ""),
      type: "text", text: { preview_url: false, body: input.body },
    }),
  });
  const data = await response.json().catch(() => ({}));
  const providerMessageId = typeof data?.messages?.[0]?.id === "string" ? data.messages[0].id : null;
  const sent = response.ok;
  await query(
    `INSERT INTO arc11_meta_messages (
      business_id, conversation_id, channel, provider_message_id, direction, sender_type,
      message_type, body, delivery_status, raw_payload
    ) VALUES ($1, $2, 'whatsapp', $3, 'outbound', $4, 'text', $5, $6, $7::jsonb)`,
    [BUSINESS_ID, input.conversationId, providerMessageId, input.senderType, input.body, sent ? "sent" : "failed", JSON.stringify(data)]
  );
  await query(
    `UPDATE arc11_meta_conversations SET last_message_at = now(), unread_count = 0, updated_at = now() WHERE id = $1`,
    [input.conversationId]
  );
  if (!sent) throw new Error(typeof data?.error?.message === "string" ? data.error.message : "Meta rejected the message.");
  return { providerMessageId };
}

async function deliverWhatsAppTemplate(input: {
  conversationId: string;
  phoneNumber: string;
  templateName: string;
  language: string;
}) {
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const accessToken = process.env.META_ACCESS_TOKEN;
  if (!phoneNumberId || !accessToken) throw new Error("WhatsApp credentials are not configured.");

  const response = await fetch(`https://graph.facebook.com/${GRAPH_API_VERSION}/${phoneNumberId}/messages`, {
    method: "POST",
    headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      messaging_product: "whatsapp", recipient_type: "individual", to: input.phoneNumber.replace(/\D/g, ""),
      type: "template", template: { name: input.templateName, language: { code: input.language } },
    }),
  });
  const data = await response.json().catch(() => ({}));
  const providerMessageId = typeof data?.messages?.[0]?.id === "string" ? data.messages[0].id : null;
  const sent = response.ok;
  await query(
    `INSERT INTO arc11_meta_messages (
      business_id, conversation_id, channel, provider_message_id, direction, sender_type,
      message_type, body, delivery_status, raw_payload
    ) VALUES ($1, $2, 'whatsapp', $3, 'outbound', 'human_agent', 'template', $4, $5, $6::jsonb)`,
    [BUSINESS_ID, input.conversationId, providerMessageId, `Template: ${input.templateName}`, sent ? "sent" : "failed", JSON.stringify(data)]
  );
  await query(
    `UPDATE arc11_meta_conversations SET last_message_at = now(), unread_count = 0, updated_at = now() WHERE id = $1`,
    [input.conversationId]
  );
  if (!sent) throw new Error(typeof data?.error?.message === "string" ? data.error.message : "Meta rejected the template message.");
  return { providerMessageId };
}

export async function startWhatsAppChat(input: {
  name?: string;
  phoneNumber: string;
  templateName?: string;
  message?: string;
  language?: string;
}) {
  const phoneNumber = input.phoneNumber.replace(/\D/g, "");
  if (phoneNumber.length < 8 || phoneNumber.length > 15) throw new Error("Enter a complete WhatsApp number with country code.");
  const message = input.message?.trim() || "";
  const templateName = input.templateName?.trim() || "";
  if (!message && !/^[a-z0-9_]+$/.test(templateName)) {
    throw new Error("Enter a message for an active 24-hour conversation or an approved Meta template name.");
  }
  await ensureMetaChannelAccounts();
  const contactRows = await query<{ id: string }>(
    `INSERT INTO arc11_meta_contacts (business_id, channel, provider_user_id, display_name, phone_number, profile_data)
     VALUES ($1, 'whatsapp', $2, $3, $2, '{}'::jsonb)
     ON CONFLICT (business_id, channel, provider_user_id) DO UPDATE SET
       display_name = COALESCE(NULLIF(EXCLUDED.display_name, ''), arc11_meta_contacts.display_name), updated_at = now()
     RETURNING id`,
    [BUSINESS_ID, phoneNumber, input.name?.trim() || ""]
  );
  const channelAccountId = await getChannelAccountId("whatsapp");
  const conversationRows = await query<{ id: string }>(
    `INSERT INTO arc11_meta_conversations (business_id, channel, channel_account_id, contact_id, last_message_at)
     VALUES ($1, 'whatsapp', $2, $3, now())
     ON CONFLICT (business_id, channel, contact_id) DO UPDATE SET last_message_at = now(), updated_at = now()
     RETURNING id`,
    [BUSINESS_ID, channelAccountId, contactRows[0].id]
  );
  const conversationId = conversationRows[0].id;
  const result = message
    ? await deliverWhatsAppMessage({ conversationId, phoneNumber, body: message, senderType: "human_agent" })
    : await deliverWhatsAppTemplate({
        conversationId,
        phoneNumber,
        templateName,
        language: input.language?.trim() || "en_US",
      });
  return { conversationId, ...result };
}

async function processWhatsAppPayload(payload: Record<string, unknown>) {
  for (const entry of Array.isArray(payload.entry) ? payload.entry : []) {
    if (!entry || typeof entry !== "object") continue;
    for (const change of Array.isArray((entry as { changes?: unknown[] }).changes) ? (entry as { changes: unknown[] }).changes : []) {
      const value = change && typeof change === "object" ? (change as { value?: Record<string, unknown> }).value : null;
      if (!value) continue;
      for (const status of Array.isArray(value.statuses) ? value.statuses : []) {
        if (!status || typeof status !== "object") continue;
        const item = status as { id?: string; status?: string; errors?: unknown };
        if (!item.id) continue;
        const deliveryStatus = normalizeDeliveryStatus(item.status);
        const messages = await query<{ id: string }>(
          `UPDATE arc11_meta_messages SET delivery_status = $2, updated_at = now()
           WHERE channel = 'whatsapp' AND provider_message_id = $1 RETURNING id`,
          [item.id, deliveryStatus]
        );
        await query(
          `INSERT INTO arc11_meta_message_status_events (message_id, channel, provider_message_id, status, details)
           VALUES ($1, 'whatsapp', $2, $3, $4::jsonb)`,
          [messages[0]?.id || null, item.id, deliveryStatus, JSON.stringify(item.errors || {})]
        );
      }
      const contact = Array.isArray(value.contacts) ? value.contacts[0] as { profile?: { name?: string } } | undefined : undefined;
      for (const message of Array.isArray(value.messages) ? value.messages : []) {
        if (!message || typeof message !== "object") continue;
        const item = message as { id?: string; from?: string; timestamp?: string; type?: string; text?: { body?: string }; interactive?: { button_reply?: { title?: string }; list_reply?: { title?: string } }; button?: { text?: string }; image?: unknown; video?: unknown; audio?: unknown; document?: unknown; sticker?: unknown };
        if (!item.from) continue;
        const type = item.type || "text";
        const body = type === "text" ? normalizeMessageBody(item.text?.body, "[Text message]")
          : normalizeMessageBody(item.interactive?.button_reply?.title || item.interactive?.list_reply?.title || item.button?.text, `[${type} message]`);
        const inbound = await createInboundMessage({
          channel: "whatsapp", providerUserId: item.from, providerMessageId: item.id || null,
          displayName: contact?.profile?.name || null, phoneNumber: item.from, body, messageType: type, media: getMessageMedia("whatsapp", item), rawPayload: item,
        });
        if (
          inbound.inserted
          && !inbound.isHumanActive
          // Automation is deliberately opt-in. It stays silent unless explicitly enabled
          // in the production environment, and only greets a new, current conversation.
          && process.env.WHATSAPP_AUTOMATION_ENABLED === "true"
          && isWhatsAppAutomationGreeting(body)
          && isFreshWhatsAppMessage(item.timestamp)
          && await claimWhatsAppAutoReply(inbound.conversationId)
        ) {
          try {
            await deliverWhatsAppMessage({
              conversationId: inbound.conversationId,
              phoneNumber: item.from,
              body: getWhatsAppAutoReply(),
              senderType: "automation",
            });
          } catch (error) {
            console.error("WhatsApp automatic reply failed", error);
          }
        }
      }
    }
  }
}

async function processInstagramPayload(payload: Record<string, unknown>) {
  for (const entry of Array.isArray(payload.entry) ? payload.entry : []) {
    if (!entry || typeof entry !== "object") continue;
    for (const event of Array.isArray((entry as { messaging?: unknown[] }).messaging) ? (entry as { messaging: unknown[] }).messaging : []) {
      if (!event || typeof event !== "object") continue;
      const item = event as { sender?: { id?: string }; message?: { mid?: string; text?: string; attachments?: unknown[] } };
      if (!item.sender?.id || !item.message) continue;
      const body = normalizeMessageBody(item.message.text, item.message.attachments?.length ? "[Media message]" : "[Instagram message]");
      await createInboundMessage({
        channel: "instagram", providerUserId: item.sender.id, providerMessageId: item.message.mid || null,
        body, messageType: item.message.attachments?.length ? "media" : "text", media: getMessageMedia("instagram", item.message), rawPayload: item.message,
      });
    }
  }
}

export async function processMetaWebhook(channel: MetaChannel, payload: Record<string, unknown>) {
  await ensureMetaChannelAccounts();
  const event = await recordWebhookEvent(channel, payload);
  if (event.duplicate) return { duplicate: true };
  try {
    if (channel === "whatsapp") {
      if (payload.object !== "whatsapp_business_account") {
        await markWebhookEvent(event.id, "ignored");
        return { ignored: true };
      }
      await processWhatsAppPayload(payload);
    } else {
      if (payload.object !== "instagram") {
        await markWebhookEvent(event.id, "ignored");
        return { ignored: true };
      }
      await processInstagramPayload(payload);
    }
    await markWebhookEvent(event.id, "processed");
    return { processed: true };
  } catch (error) {
    await markWebhookEvent(event.id, "failed", error);
    throw error;
  }
}

export async function setHumanTakeover(conversationId: string, isHumanActive: boolean, adminId: string) {
  const rows = await query<{ id: string }>(
    `UPDATE arc11_meta_conversations
     SET is_human_active = $3, assigned_admin_id = CASE WHEN $3 THEN $4::uuid ELSE NULL END,
         unread_count = 0, updated_at = now()
     WHERE id = $1 AND business_id = $2 RETURNING id`,
    [conversationId, BUSINESS_ID, isHumanActive, adminId]
  );
  return Boolean(rows[0]);
}

export async function sendWhatsAppReply(conversationId: string, body: string) {
  const conversationRows = await query<{ id: string; channel: MetaChannel; phone_number: string | null }>(
    `SELECT c.id, c.channel, co.phone_number
     FROM arc11_meta_conversations c JOIN arc11_meta_contacts co ON co.id = c.contact_id
     WHERE c.id = $1 AND c.business_id = $2`,
    [conversationId, BUSINESS_ID]
  );
  const conversation = conversationRows[0];
  if (!conversation) throw new Error("Conversation was not found.");
  if (conversation.channel !== "whatsapp") throw new Error("Instagram reply sending is not configured yet.");
  if (!conversation.phone_number) throw new Error("This WhatsApp contact has no phone number.");

  return deliverWhatsAppMessage({ conversationId: conversation.id, phoneNumber: conversation.phone_number, body, senderType: "human_agent" });
}
