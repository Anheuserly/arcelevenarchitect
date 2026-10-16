-- One active public-site theme per business. This remains separate from shared
-- platform configuration so Arc 11 can be styled independently.
CREATE TABLE IF NOT EXISTS website_theme_settings (
  business_id uuid PRIMARY KEY REFERENCES businesses(id) ON DELETE CASCADE,
  active_theme text NOT NULL DEFAULT 'atelier',
  updated_by_auth_account_id uuid REFERENCES auth_accounts(id) ON DELETE SET NULL,
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT website_theme_settings_active_theme_check CHECK (
    active_theme IN ('atelier', 'monolith', 'gallery', 'blueprint', 'brutalist', 'garden')
  )
);
