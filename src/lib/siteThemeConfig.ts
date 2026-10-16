export const SITE_THEMES = [
  { id: "atelier", name: "Atelier Warmth", description: "Soft mineral surfaces and a restrained studio palette." },
  { id: "monolith", name: "Monolith", description: "Charcoal structure with cool stone contrast." },
  { id: "gallery", name: "Gallery Light", description: "Bright architectural whites with a disciplined red accent." },
  { id: "blueprint", name: "Blueprint", description: "Technical blue, drawing-grid contrast, and clear hierarchy." },
  { id: "brutalist", name: "Concrete Frame", description: "Direct monochrome geometry with construction-site clarity." },
  { id: "garden", name: "Courtyard", description: "Quiet botanical stone tones for landscape-led projects." },
] as const;

export const DISPLAY_FONT_OPTIONS = [
  { id: "playfair", name: "Playfair Display", value: 'var(--font-display), Georgia, serif' },
  { id: "editorial", name: "Editorial Serif", value: 'Georgia, "Times New Roman", serif' },
  { id: "modern", name: "Modern Grotesk", value: 'Arial, Helvetica, sans-serif' },
  { id: "drawing", name: "Drawing Sans", value: '"Trebuchet MS", Arial, sans-serif' },
  { id: "technical", name: "Technical Mono", value: '"Courier New", monospace' },
  { id: "humanist", name: "Humanist Sans", value: 'Verdana, Geneva, sans-serif' },
] as const;

export const BODY_FONT_OPTIONS = [
  { id: "roboto", name: "Roboto", value: 'var(--font-body), Arial, sans-serif' },
  { id: "neutral", name: "Neutral Sans", value: 'Arial, Helvetica, sans-serif' },
  { id: "humanist", name: "Humanist Sans", value: '"Trebuchet MS", Arial, sans-serif' },
  { id: "technical", name: "Technical Mono", value: '"Courier New", monospace' },
  { id: "system", name: "System UI", value: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif' },
  { id: "serif", name: "Readable Serif", value: 'Georgia, "Times New Roman", serif' },
] as const;

export type SiteThemeId = (typeof SITE_THEMES)[number]["id"];
export type DisplayFontId = (typeof DISPLAY_FONT_OPTIONS)[number]["id"];
export type BodyFontId = (typeof BODY_FONT_OPTIONS)[number]["id"];
export type ThemeDensity = "airy" | "balanced" | "compact";
export type CornerStyle = "soft" | "precise";
export type NavigationStyle = "floating" | "editorial" | "technical";
export type HeroStyle = "cinematic" | "editorial" | "gallery";
export type CardStyle = "soft" | "paper" | "line" | "concrete";
export type ButtonStyle = "pill" | "square" | "line";
export type ImageTreatment = "natural" | "warm" | "monochrome" | "blueprint";
export type MotionStyle = "restrained" | "still" | "gallery";
export type ContentWidth = "contained" | "wide" | "immersive";
export type BackgroundTexture = "grid" | "paper" | "quiet";
export type ProjectPresentation = "image-led" | "editorial" | "dossier";
export type ThemeCustomization = {
  backgroundColor: string;
  foregroundColor: string;
  accentColor: string;
  surfaceColor: string;
  displayFont: DisplayFontId;
  bodyFont: BodyFontId;
  density: ThemeDensity;
  cornerStyle: CornerStyle;
  showGrid: boolean;
  navigationStyle: NavigationStyle;
  heroStyle: HeroStyle;
  cardStyle: CardStyle;
  buttonStyle: ButtonStyle;
  imageTreatment: ImageTreatment;
  motionStyle: MotionStyle;
  contentWidth: ContentWidth;
  backgroundTexture: BackgroundTexture;
  projectPresentation: ProjectPresentation;
};
export type SavedCustomTheme = { id: string; name: string; baseTheme: SiteThemeId; settings: ThemeCustomization };
export type SiteAppearance = { theme: SiteThemeId; customThemeId: string | null; customization: ThemeCustomization | null };

export const DEFAULT_CUSTOMIZATION: ThemeCustomization = {
  backgroundColor: "#f5f0e7", foregroundColor: "#171614", accentColor: "#9b6843", surfaceColor: "#eee6dc",
  displayFont: "playfair", bodyFont: "roboto", density: "balanced", cornerStyle: "soft", showGrid: true,
  navigationStyle: "floating", heroStyle: "cinematic", cardStyle: "soft", buttonStyle: "pill",
  imageTreatment: "natural", motionStyle: "restrained",
  contentWidth: "contained", backgroundTexture: "grid", projectPresentation: "image-led",
};
