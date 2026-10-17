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

  const accountId = process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID || "";
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
    ? process.env.INSTAGRAM_VERIFY_TOKEN || process.env.WHATSAPP_VERIFY_TOKEN
    : process.env.WHATSAPP_VERIFY_TOKEN;
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
      }>(
        `SELECT id, conversation_id, direction, sender_type, body, message_type, delivery_status, created_at
         FROM arc11_meta_messages WHERE conversation_id = ANY($1::uuid[])
         ORDER BY created_at ASC`,
        [ids]
      )
    : [];

  const messagesByConversation = new Map<string, MetaInboxConversation["messages"]>();
  for (const message of messageRows) {
    const items = messagesByConversation.get(message.conversation_id) || [];
    items.push({
      id: message.id,
      direction: message.direction,
      senderType: message.sender_type,
      body: normalizeMessageBody(message.body, `[${message.message_type}]`),
      messageType: message.message_type,
      deliveryStatus: message.delivery_status,
      createdAt: message.created_at.toISOString(),
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
       message_type, body, delivery_status, raw_payload
     ) VALUES ($1, $2, $3, $4, 'inbound', 'customer', $5, $6, 'received', $7::jsonb)
     ON CONFLICT (channel, provider_message_id) WHERE provider_message_id IS NOT NULL DO NOTHING
     RETURNING id`,
    [BUSINESS_ID, conversationId, input.channel, input.providerMessageId, input.messageType, input.body, JSON.stringify(input.rawPayload)]
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
        const item = message as { id?: string; from?: string; timestamp?: string; type?: string; text?: { body?: string }; interactive?: { button_reply?: { title?: string }; list_reply?: { title?: string } }; button?: { text?: string } };
        if (!item.from) continue;
        const type = item.type || "text";
        const body = type === "text" ? normalizeMessageBody(item.text?.body, "[Text message]")
          : normalizeMessageBody(item.interactive?.button_reply?.title || item.interactive?.list_reply?.title || item.button?.text, `[${type} message]`);
        const inbound = await createInboundMessage({
          channel: "whatsapp", providerUserId: item.from, providerMessageId: item.id || null,
          displayName: contact?.profile?.name || null, phoneNumber: item.from, body, messageType: type, rawPayload: item,
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
        body, messageType: item.message.attachments?.length ? "media" : "text", rawPayload: item,
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
