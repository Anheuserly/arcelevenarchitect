import type { CSSProperties } from "react";
import { query } from "@/lib/db";
import {
  BODY_FONT_OPTIONS,
  DEFAULT_CUSTOMIZATION,
  DISPLAY_FONT_OPTIONS,
  SITE_THEMES,
  type BodyFontId,
  type BackgroundTexture,
  type ButtonStyle,
  type CardStyle,
  type ContentWidth,
  type DisplayFontId,
  type HeroStyle,
  type ImageTreatment,
  type MotionStyle,
  type NavigationStyle,
  type ProjectPresentation,
  type SavedCustomTheme,
  type SiteAppearance,
  type SiteThemeId,
  type ThemeCustomization,
} from "@/lib/siteThemeConfig";

export {
  BODY_FONT_OPTIONS,
  DEFAULT_CUSTOMIZATION,
  DISPLAY_FONT_OPTIONS,
  SITE_THEMES,
};
export type {
  BodyFontId,
  BackgroundTexture,
  ButtonStyle,
  CardStyle,
  ContentWidth,
  DisplayFontId,
  HeroStyle,
  ImageTreatment,
  MotionStyle,
  NavigationStyle,
  ProjectPresentation,
  SavedCustomTheme,
  SiteAppearance,
  SiteThemeId,
  ThemeCustomization,
};

const BUSINESS_ID = process.env.NEXT_PUBLIC_BUSINESS_ID || "6ab5e485-5b76-4ceb-9f3f-bc61f9bd4687";
const DEFAULT_THEME: SiteThemeId = "atelier";
const colorPattern = /^#[0-9a-fA-F]{6}$/;

export function isSiteTheme(value: string): value is SiteThemeId { return SITE_THEMES.some((theme) => theme.id === value); }
function isDisplayFont(value: unknown): value is DisplayFontId { return typeof value === "string" && DISPLAY_FONT_OPTIONS.some((font) => font.id === value); }
function isBodyFont(value: unknown): value is BodyFontId { return typeof value === "string" && BODY_FONT_OPTIONS.some((font) => font.id === value); }
function option<T extends string>(value: unknown, allowed: readonly T[], fallback: T): T { return typeof value === "string" && allowed.includes(value as T) ? value as T : fallback; }

export function normalizeCustomization(value: unknown): ThemeCustomization {
  const raw = value && typeof value === "object" ? (value as Partial<ThemeCustomization>) : {};
  const color = (candidate: unknown, fallback: string) => typeof candidate === "string" && colorPattern.test(candidate) ? candidate : fallback;
  return {
    backgroundColor: color(raw.backgroundColor, DEFAULT_CUSTOMIZATION.backgroundColor),
    foregroundColor: color(raw.foregroundColor, DEFAULT_CUSTOMIZATION.foregroundColor),
    accentColor: color(raw.accentColor, DEFAULT_CUSTOMIZATION.accentColor),
    surfaceColor: color(raw.surfaceColor, DEFAULT_CUSTOMIZATION.surfaceColor),
    displayFont: isDisplayFont(raw.displayFont) ? raw.displayFont : DEFAULT_CUSTOMIZATION.displayFont,
    bodyFont: isBodyFont(raw.bodyFont) ? raw.bodyFont : DEFAULT_CUSTOMIZATION.bodyFont,
    density: raw.density === "airy" || raw.density === "compact" ? raw.density : "balanced",
    cornerStyle: raw.cornerStyle === "precise" ? "precise" : "soft",
    showGrid: Boolean(raw.showGrid),
    navigationStyle: option(raw.navigationStyle, ["floating", "editorial", "technical"] as const, DEFAULT_CUSTOMIZATION.navigationStyle),
    heroStyle: option(raw.heroStyle, ["cinematic", "editorial", "gallery"] as const, DEFAULT_CUSTOMIZATION.heroStyle),
    cardStyle: option(raw.cardStyle, ["soft", "paper", "line", "concrete"] as const, DEFAULT_CUSTOMIZATION.cardStyle),
    buttonStyle: option(raw.buttonStyle, ["pill", "square", "line"] as const, DEFAULT_CUSTOMIZATION.buttonStyle),
    imageTreatment: option(raw.imageTreatment, ["natural", "warm", "monochrome", "blueprint"] as const, DEFAULT_CUSTOMIZATION.imageTreatment),
    motionStyle: option(raw.motionStyle, ["restrained", "still", "gallery"] as const, DEFAULT_CUSTOMIZATION.motionStyle),
    contentWidth: option(raw.contentWidth, ["contained", "wide", "immersive"] as const, DEFAULT_CUSTOMIZATION.contentWidth),
    backgroundTexture: option(raw.backgroundTexture, ["grid", "paper", "quiet"] as const, DEFAULT_CUSTOMIZATION.backgroundTexture),
    projectPresentation: option(raw.projectPresentation, ["image-led", "editorial", "dossier"] as const, DEFAULT_CUSTOMIZATION.projectPresentation),
  };
}

export function toThemeDataAttributes(customization: ThemeCustomization | null) {
  const settings = customization || DEFAULT_CUSTOMIZATION;
  return {
    "data-navigation": settings.navigationStyle,
    "data-hero-style": settings.heroStyle,
    "data-card-style": settings.cardStyle,
    "data-button-style": settings.buttonStyle,
    "data-image-treatment": settings.imageTreatment,
    "data-motion-style": settings.motionStyle,
    "data-content-width": settings.contentWidth,
    "data-background-texture": settings.backgroundTexture,
    "data-project-presentation": settings.projectPresentation,
  };
}

function parseSettings(value: unknown): ThemeCustomization {
  if (typeof value === "string") {
    try { return normalizeCustomization(JSON.parse(value)); } catch { return DEFAULT_CUSTOMIZATION; }
  }
  return normalizeCustomization(value);
}

export async function getSiteAppearance(): Promise<SiteAppearance> {
  try {
    const rows = await query<{ active_theme: string; active_custom_theme_id: string | null; settings: unknown }>(
      `SELECT settings.active_theme, settings.active_custom_theme_id, custom.settings
       FROM website_theme_settings settings
       LEFT JOIN website_custom_themes custom ON custom.id = settings.active_custom_theme_id
       WHERE settings.business_id = $1 LIMIT 1`, [BUSINESS_ID]
    );
    const selected = rows[0];
    const theme = selected && isSiteTheme(selected.active_theme) ? selected.active_theme : DEFAULT_THEME;
    return { theme, customThemeId: selected?.active_custom_theme_id || null, customization: selected?.active_custom_theme_id ? parseSettings(selected.settings) : null };
  } catch (error) {
    console.error("Unable to load Arc 11 site theme:", error);
    return { theme: DEFAULT_THEME, customThemeId: null, customization: null };
  }
}

export async function getThemeControlData() {
  const appearance = await getSiteAppearance();
  try {
    const rows = await query<{ id: string; name: string; base_theme: string; settings: unknown }>(
      "SELECT id, name, base_theme, settings FROM website_custom_themes WHERE business_id = $1 ORDER BY updated_at DESC, name ASC", [BUSINESS_ID]
    );
    const customThemes = rows.filter((row) => isSiteTheme(row.base_theme)).map((row) => ({ id: row.id, name: row.name, baseTheme: row.base_theme as SiteThemeId, settings: parseSettings(row.settings) }));
    return { appearance, customThemes };
  } catch (error) {
    console.error("Unable to load saved Arc 11 custom themes:", error);
    return { appearance, customThemes: [] as SavedCustomTheme[] };
  }
}

export function toCssVariables(customization: ThemeCustomization | null): CSSProperties {
  if (!customization) return {};
  const displayFont = DISPLAY_FONT_OPTIONS.find((font) => font.id === customization.displayFont)?.value;
  const bodyFont = BODY_FONT_OPTIONS.find((font) => font.id === customization.bodyFont)?.value;
  return {
    "--background": customization.backgroundColor, "--foreground": customization.foregroundColor, "--accent": customization.accentColor,
    "--surface": customization.surfaceColor, "--surface-3": customization.surfaceColor, "--font-display-custom": displayFont,
    "--font-body-custom": bodyFont, "--section-space": customization.density === "airy" ? "120px" : customization.density === "compact" ? "72px" : "104px",
    "--card-radius": customization.cornerStyle === "precise" ? "8px" : "30px", "--subtle-card-radius": customization.cornerStyle === "precise" ? "6px" : "26px",
    "--site-grid-opacity": customization.showGrid ? "1" : "0",
  } as CSSProperties;
}

export async function setSiteTheme(theme: SiteThemeId, authAccountId: string) {
  await query(
    `INSERT INTO website_theme_settings (business_id, active_theme, active_custom_theme_id, updated_by_auth_account_id)
     VALUES ($1, $2, NULL, $3::uuid)
     ON CONFLICT (business_id) DO UPDATE SET active_theme = EXCLUDED.active_theme, active_custom_theme_id = NULL, updated_by_auth_account_id = EXCLUDED.updated_by_auth_account_id, updated_at = now()`,
    [BUSINESS_ID, theme, authAccountId]
  );
}

export async function createCustomTheme(input: { name: string; baseTheme: SiteThemeId; settings: ThemeCustomization; authAccountId: string }) {
  const rows = await query<{ id: string }>(
    `INSERT INTO website_custom_themes (business_id, name, base_theme, settings, created_by_auth_account_id)
     VALUES ($1, $2, $3, $4::jsonb, $5::uuid)
     ON CONFLICT (business_id, name) DO UPDATE SET base_theme = EXCLUDED.base_theme, settings = EXCLUDED.settings, created_by_auth_account_id = EXCLUDED.created_by_auth_account_id, updated_at = now()
     RETURNING id`, [BUSINESS_ID, input.name, input.baseTheme, JSON.stringify(input.settings), input.authAccountId]
  );
  const customThemeId = rows[0]?.id;
  if (!customThemeId) throw new Error("Theme profile could not be saved.");
  await query(
    `INSERT INTO website_theme_settings (business_id, active_theme, active_custom_theme_id, updated_by_auth_account_id)
     VALUES ($1, $2, $3::uuid, $4::uuid)
     ON CONFLICT (business_id) DO UPDATE SET active_theme = EXCLUDED.active_theme, active_custom_theme_id = EXCLUDED.active_custom_theme_id, updated_by_auth_account_id = EXCLUDED.updated_by_auth_account_id, updated_at = now()`,
    [BUSINESS_ID, input.baseTheme, customThemeId, input.authAccountId]
  );
  return customThemeId;
}

export async function activateCustomTheme(customThemeId: string, authAccountId: string) {
  const rows = await query<{ id: string; base_theme: string }>(
    "SELECT id, base_theme FROM website_custom_themes WHERE id = $1::uuid AND business_id = $2 LIMIT 1", [customThemeId, BUSINESS_ID]
  );
  const customTheme = rows[0];
  if (!customTheme || !isSiteTheme(customTheme.base_theme)) throw new Error("Saved theme not found.");
  await query(
    "UPDATE website_theme_settings SET active_theme = $2, active_custom_theme_id = $3::uuid, updated_by_auth_account_id = $4::uuid, updated_at = now() WHERE business_id = $1",
    [BUSINESS_ID, customTheme.base_theme, customTheme.id, authAccountId]
  );
}
