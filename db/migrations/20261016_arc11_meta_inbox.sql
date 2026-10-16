-- Dedicated communication storage for Arc 11. Existing platform conversations remain untouched.
CREATE TABLE IF NOT EXISTS arc11_meta_channel_accounts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id uuid NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  channel text NOT NULL CHECK (channel IN ('whatsapp', 'instagram')),
  provider_account_id text,
  provider_phone_number_id text,
  display_name text,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('connected', 'pending', 'disabled', 'error')),
  configuration jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (business_id, channel)
);

CREATE TABLE IF NOT EXISTS arc11_meta_contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id uuid NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  channel text NOT NULL CHECK (channel IN ('whatsapp', 'instagram')),
  provider_user_id text NOT NULL,
  display_name text,
  username text,
  phone_number text,
  profile_data jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (business_id, channel, provider_user_id)
);

CREATE INDEX IF NOT EXISTS arc11_meta_contacts_business_updated_idx
  ON arc11_meta_contacts (business_id, updated_at DESC);

CREATE TABLE IF NOT EXISTS arc11_meta_conversations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id uuid NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  channel text NOT NULL CHECK (channel IN ('whatsapp', 'instagram')),
  channel_account_id uuid REFERENCES arc11_meta_channel_accounts(id) ON DELETE SET NULL,
  contact_id uuid NOT NULL REFERENCES arc11_meta_contacts(id) ON DELETE CASCADE,
  provider_thread_id text,
  status text NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'closed', 'archived')),
  is_human_active boolean NOT NULL DEFAULT false,
  assigned_admin_id uuid REFERENCES auth_accounts(id) ON DELETE SET NULL,
  unread_count integer NOT NULL DEFAULT 0 CHECK (unread_count >= 0),
  last_message_at timestamptz,
  last_intent text,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (business_id, channel, contact_id)
);

CREATE INDEX IF NOT EXISTS arc11_meta_conversations_business_activity_idx
  ON arc11_meta_conversations (business_id, channel, status, last_message_at DESC NULLS LAST);

CREATE TABLE IF NOT EXISTS arc11_meta_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id uuid NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  conversation_id uuid NOT NULL REFERENCES arc11_meta_conversations(id) ON DELETE CASCADE,
  channel text NOT NULL CHECK (channel IN ('whatsapp', 'instagram')),
  provider_message_id text,
  direction text NOT NULL CHECK (direction IN ('inbound', 'outbound')),
  sender_type text NOT NULL DEFAULT 'customer' CHECK (sender_type IN ('customer', 'human_agent', 'automation')),
  message_type text NOT NULL DEFAULT 'text',
  body text,
  media_url text,
  media_mime_type text,
  delivery_status text NOT NULL DEFAULT 'received' CHECK (delivery_status IN ('pending', 'sent', 'delivered', 'read', 'received', 'failed')),
  raw_payload jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS arc11_meta_messages_provider_message_uniq
  ON arc11_meta_messages (channel, provider_message_id)
  WHERE provider_message_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS arc11_meta_messages_conversation_created_idx
  ON arc11_meta_messages (conversation_id, created_at ASC);

CREATE TABLE IF NOT EXISTS arc11_meta_message_status_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  message_id uuid REFERENCES arc11_meta_messages(id) ON DELETE CASCADE,
  channel text NOT NULL CHECK (channel IN ('whatsapp', 'instagram')),
  provider_message_id text NOT NULL,
  status text NOT NULL,
  details jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS arc11_meta_message_status_events_message_idx
  ON arc11_meta_message_status_events (message_id, created_at DESC);

CREATE TABLE IF NOT EXISTS arc11_meta_webhook_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  channel text NOT NULL CHECK (channel IN ('whatsapp', 'instagram')),
  event_key text NOT NULL,
  payload jsonb NOT NULL,
  processing_status text NOT NULL DEFAULT 'received' CHECK (processing_status IN ('received', 'processed', 'ignored', 'failed')),
  error_message text,
  received_at timestamptz NOT NULL DEFAULT now(),
  processed_at timestamptz,
  UNIQUE (channel, event_key)
);
