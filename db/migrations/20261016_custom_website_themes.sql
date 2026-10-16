CREATE TABLE IF NOT EXISTS website_custom_themes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id uuid NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  name varchar(80) NOT NULL,
  base_theme text NOT NULL,
  settings jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_by_auth_account_id uuid REFERENCES auth_accounts(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT website_custom_themes_base_theme_check CHECK (
    base_theme IN ('atelier', 'monolith', 'gallery', 'blueprint', 'brutalist', 'garden')
  ),
  CONSTRAINT website_custom_themes_business_name_key UNIQUE (business_id, name)
);

ALTER TABLE website_theme_settings
  ADD COLUMN IF NOT EXISTS active_custom_theme_id uuid REFERENCES website_custom_themes(id) ON DELETE SET NULL;
