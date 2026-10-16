"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  BODY_FONT_OPTIONS,
  DEFAULT_CUSTOMIZATION,
  DISPLAY_FONT_OPTIONS,
  type SavedCustomTheme,
  type SiteAppearance,
  type SiteThemeId,
  type ThemeCustomization,
} from "@/lib/siteThemeConfig";

type Theme = { id: SiteThemeId; name: string; description: string };
const inputClass = "mt-2 w-full rounded-lg border border-[var(--line)] bg-white/80 px-3 py-2 text-sm text-[var(--foreground)] outline-none focus:border-[var(--accent)]";
const studioControls = [
  { key: "navigationStyle", label: "Navigation", options: [["floating", "Floating studio bar"], ["editorial", "Editorial masthead"], ["technical", "Technical index"]] },
  { key: "heroStyle", label: "Homepage hero", options: [["cinematic", "Cinematic sequence"], ["editorial", "Editorial framing"], ["gallery", "Gallery composition"]] },
  { key: "cardStyle", label: "Card language", options: [["soft", "Soft studio"], ["paper", "Paper sheet"], ["line", "Hairline frame"], ["concrete", "Concrete panel"]] },
  { key: "buttonStyle", label: "Button language", options: [["pill", "Pill command"], ["square", "Square command"], ["line", "Line command"]] },
  { key: "imageTreatment", label: "Image treatment", options: [["natural", "Natural"], ["warm", "Warm film"], ["monochrome", "Monochrome"], ["blueprint", "Blueprint tint"]] },
  { key: "motionStyle", label: "Motion", options: [["restrained", "Restrained"], ["still", "Still"], ["gallery", "Gallery glide"]] },
  { key: "contentWidth", label: "Page canvas", options: [["contained", "Contained studio"], ["wide", "Wide gallery"], ["immersive", "Immersive edge-to-edge"]] },
  { key: "backgroundTexture", label: "Background material", options: [["grid", "Drawing grid"], ["paper", "Paper grain"], ["quiet", "Quiet surface"]] },
  { key: "projectPresentation", label: "Project cards", options: [["image-led", "Image-led"], ["editorial", "Editorial captions"], ["dossier", "Technical dossier"]] },
] as const;

const impactMap = [
  ["Navigation", "Header shell, menu rhythm, active state, mobile menu"],
  ["Hero", "Homepage project sequence, panels, project hierarchy"],
  ["Cards + buttons", "Portfolio, service, journal, forms, calls to action"],
  ["Images", "Portfolio imagery and homepage project frames"],
  ["Canvas", "Site width, background material, section rhythm"],
  ["Motion", "Project sequence, hover movement, transitions"],
] as const;

export default function AdminThemeSelector({ appearance, themes, customThemes }: { appearance: SiteAppearance; themes: readonly Theme[]; customThemes: SavedCustomTheme[] }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [baseTheme, setBaseTheme] = useState<SiteThemeId>(appearance.theme);
  const [settings, setSettings] = useState<ThemeCustomization>(appearance.customization || DEFAULT_CUSTOMIZATION);
  const previewFrame = useRef<HTMLIFrameElement | null>(null);
  const [previewView, setPreviewView] = useState<"board" | "site">("board");

  async function submit(payload: Record<string, unknown>, successMessage: string) {
    setSaving(true);
    setMessage("");
    try {
      const response = await fetch("/api/admin/theme", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const body = (await response.json().catch(() => ({}))) as { message?: string };
      if (!response.ok) throw new Error(body.message || "Theme update failed.");
      setMessage(successMessage);
      router.refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Theme update failed.");
    } finally {
      setSaving(false);
    }
  }

  function updateSetting<K extends keyof ThemeCustomization>(key: K, value: ThemeCustomization[K]) {
    setSettings((current) => ({ ...current, [key]: value }));
  }

  const displayFont = DISPLAY_FONT_OPTIONS.find((font) => font.id === settings.displayFont)?.value;
  const bodyFont = BODY_FONT_OPTIONS.find((font) => font.id === settings.bodyFont)?.value;

  const applyDraftToFrame = useCallback(() => {
    const root = previewFrame.current?.contentDocument?.documentElement;
    if (!root) return;
    root.dataset.navigation = settings.navigationStyle;
    root.dataset.heroStyle = settings.heroStyle;
    root.dataset.cardStyle = settings.cardStyle;
    root.dataset.buttonStyle = settings.buttonStyle;
    root.dataset.imageTreatment = settings.imageTreatment;
    root.dataset.motionStyle = settings.motionStyle;
    root.dataset.contentWidth = settings.contentWidth;
    root.dataset.backgroundTexture = settings.backgroundTexture;
    root.dataset.projectPresentation = settings.projectPresentation;
    root.style.setProperty("--background", settings.backgroundColor);
    root.style.setProperty("--foreground", settings.foregroundColor);
    root.style.setProperty("--accent", settings.accentColor);
    root.style.setProperty("--surface", settings.surfaceColor);
    root.style.setProperty("--surface-3", settings.surfaceColor);
    root.style.setProperty("--font-display-custom", displayFont || "var(--font-display)");
    root.style.setProperty("--font-body-custom", bodyFont || "var(--font-body)");
    root.style.setProperty("--section-space", settings.density === "airy" ? "120px" : settings.density === "compact" ? "72px" : "104px");
    root.style.setProperty("--card-radius", settings.cornerStyle === "precise" ? "8px" : "30px");
    root.style.setProperty("--subtle-card-radius", settings.cornerStyle === "precise" ? "6px" : "26px");
    root.style.setProperty("--site-grid-opacity", settings.showGrid ? "1" : "0");
  }, [settings, displayFont, bodyFont]);

  useEffect(() => {
    applyDraftToFrame();
  }, [applyDraftToFrame]);

  return (
    <div className="space-y-10">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {themes.map((theme) => {
          const active = !appearance.customThemeId && appearance.theme === theme.id;
          return (
            <button key={theme.id} type="button" disabled={saving} onClick={() => submit({ action: "preset", theme: theme.id }, `${theme.name} applied to the public website.`)} className={`theme-picker theme-picker--${theme.id} text-left ${active ? "theme-picker--active" : ""}`}>
              <span className="theme-picker__swatches" aria-hidden="true"><i /><i /><i /></span>
              <span className="theme-picker__label">{active ? "Active preset" : "Apply preset"}</span>
              <strong>{theme.name}</strong><span>{theme.description}</span>
            </button>
          );
        })}
      </section>

      <section className={`theme-studio-preview theme-studio-preview--${settings.cardStyle}`} style={{ backgroundColor: settings.backgroundColor, color: settings.foregroundColor, fontFamily: bodyFont }}>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.22em]">Theme Studio</p>
            <p className="mt-1 text-sm opacity-70">Unsaved controls update this preview immediately.</p>
          </div>
          <div className="theme-studio-preview__tabs" role="tablist" aria-label="Preview type">
            <button type="button" role="tab" aria-selected={previewView === "board"} onClick={() => setPreviewView("board")}>Design board</button>
            <button type="button" role="tab" aria-selected={previewView === "site"} onClick={() => setPreviewView("site")}>Live homepage</button>
          </div>
        </div>
        {previewView === "site" ? (
          <div className="theme-studio-browser">
            <div className="theme-studio-browser__bar"><span /><span /><span /><em>arc11architect.com preview</em></div>
            <iframe ref={previewFrame} title="Arc 11 live theme draft preview" src="/?theme-preview=1" onLoad={applyDraftToFrame} className="theme-studio-browser__frame" />
          </div>
        ) : <>
        <div className={`theme-studio-preview__header theme-studio-preview__header--${settings.navigationStyle}`}>
          <span>ARC 11</span>
          <span>STUDIO &nbsp; WORK &nbsp; CONTACT</span>
          <span>START</span>
        </div>
        <div className={`theme-studio-preview__hero theme-studio-preview__hero--${settings.heroStyle} theme-studio-preview__image--${settings.imageTreatment}`}>
          <div className="theme-studio-preview__hero-copy">
            <p>LIVE DRAFT PREVIEW</p>
            <h5 style={{ fontFamily: displayFont }}>Spaces with a distinct point of view.</h5>
            <span style={{ backgroundColor: settings.accentColor }}>VIEW CASE STUDY</span>
          </div>
        </div>
        <div className="theme-studio-preview__cards">
          <div style={{ backgroundColor: settings.surfaceColor }}><b>PROJECT INDEX</b><small>Material, space, light</small></div>
          <div style={{ backgroundColor: settings.surfaceColor }}><b>DETAIL SYSTEM</b><small>Quiet but precise</small></div>
          <div style={{ backgroundColor: settings.surfaceColor }}><b>WORKFLOW</b><small>Clear delivery</small></div>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-3 text-xs">
          <span className="uppercase tracking-[0.2em]">Live composition preview</span>
          <a href="/" target="_blank" rel="noreferrer" className="underline underline-offset-4">Open published site</a>
        </div>
        </>}
      </section>

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {impactMap.map(([title, detail]) => (
          <div key={title} className="subtle-card p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--accent)]">{title}</p>
            <p className="mt-2 text-sm text-[var(--muted)]">{detail}</p>
          </div>
        ))}
      </section>

      <section className="border-t border-[var(--line)] pt-8">
        <p className="kicker">Custom Profile</p><h4 className="mt-3 text-2xl">Create a reusable studio theme</h4>
        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          <label className="text-sm text-[var(--foreground)]">Theme name<input className={inputClass} value={name} onChange={(event) => setName(event.target.value)} placeholder="e.g. Noida Residence 2027" /></label>
          <label className="text-sm text-[var(--foreground)]">Base direction<select className={inputClass} value={baseTheme} onChange={(event) => setBaseTheme(event.target.value as SiteThemeId)}>{themes.map((theme) => <option key={theme.id} value={theme.id}>{theme.name}</option>)}</select></label>
          <label className="text-sm text-[var(--foreground)]">Display font<select className={inputClass} value={settings.displayFont} onChange={(event) => updateSetting("displayFont", event.target.value as ThemeCustomization["displayFont"])}>{DISPLAY_FONT_OPTIONS.map((font) => <option key={font.id} value={font.id}>{font.name}</option>)}</select></label>
          <label className="text-sm text-[var(--foreground)]">Body font<select className={inputClass} value={settings.bodyFont} onChange={(event) => updateSetting("bodyFont", event.target.value as ThemeCustomization["bodyFont"])}>{BODY_FONT_OPTIONS.map((font) => <option key={font.id} value={font.id}>{font.name}</option>)}</select></label>
          <label className="text-sm text-[var(--foreground)]">Page density<select className={inputClass} value={settings.density} onChange={(event) => updateSetting("density", event.target.value as ThemeCustomization["density"])}><option value="airy">Airy</option><option value="balanced">Balanced</option><option value="compact">Compact</option></select></label>
          <label className="text-sm text-[var(--foreground)]">Interface geometry<select className={inputClass} value={settings.cornerStyle} onChange={(event) => updateSetting("cornerStyle", event.target.value as ThemeCustomization["cornerStyle"])}><option value="soft">Soft radius</option><option value="precise">Precise radius</option></select></label>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {([ ["backgroundColor", "Page background"], ["foregroundColor", "Primary ink"], ["accentColor", "Accent"], ["surfaceColor", "Surface"] ] as const).map(([key, label]) => <label key={key} className="text-sm text-[var(--foreground)]">{label}<input className="mt-2 h-11 w-full rounded-lg border border-[var(--line)] bg-white p-1" type="color" value={settings[key]} onChange={(event) => updateSetting(key, event.target.value)} /></label>)}
        </div>
        <div className="mt-5 border-t border-[var(--line)] pt-5">
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--muted-2)]">Composition and Interaction</p>
          <div className="mt-4 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {studioControls.map((control) => (
              <label key={control.key} className="text-sm text-[var(--foreground)]">
                {control.label}
                <select className={inputClass} value={settings[control.key]} onChange={(event) => updateSetting(control.key, event.target.value as never)}>
                  {control.options.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                </select>
              </label>
            ))}
          </div>
        </div>
        <label className="mt-5 flex items-center gap-3 text-sm text-[var(--foreground)]"><input type="checkbox" checked={settings.showGrid} onChange={(event) => updateSetting("showGrid", event.target.checked)} />Show architectural grid overlay</label>
        <p className="mt-4 text-sm text-[var(--muted)]">This preview updates immediately. Save the named profile to apply the same direction across the public website.</p>
        <button type="button" disabled={saving} onClick={() => submit({ action: "save-custom", name, baseTheme, settings }, "Custom theme saved and activated.")} className="button-primary mt-6 disabled:opacity-60">{saving ? "Saving..." : "Save custom theme"}</button>
      </section>

      {customThemes.length ? <section className="border-t border-[var(--line)] pt-8"><p className="kicker">Saved Profiles</p><div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">{customThemes.map((theme) => <button key={theme.id} type="button" disabled={saving} onClick={() => submit({ action: "activate-custom", customThemeId: theme.id }, `${theme.name} activated.`)} className={`subtle-card p-4 text-left ${appearance.customThemeId === theme.id ? "outline outline-2 outline-[var(--accent)]" : ""}`}><p className="text-xs uppercase tracking-[0.2em] text-[var(--muted-2)]">{theme.baseTheme}</p><strong className="mt-2 block text-lg text-[var(--foreground)]">{theme.name}</strong><p className="mt-2 text-sm">{theme.settings.displayFont} display / {theme.settings.bodyFont} body</p></button>)}</div></section> : null}
      <p className="text-sm text-[var(--muted)]" aria-live="polite">{message || "Theme changes affect the public site only. Project content, listings, and inquiries remain unchanged."}</p>
    </div>
  );
}
