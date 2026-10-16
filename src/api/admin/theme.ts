import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getAdminSession } from "@/lib/adminSession";
import { getPermissions, normalizeRole } from "@/lib/adminRoles";
import { activateCustomTheme, createCustomTheme, isSiteTheme, normalizeCustomization, setSiteTheme } from "@/lib/siteTheme";

export async function POST(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  if (!getPermissions(normalizeRole(session.role)).canManageSettings) return NextResponse.json({ message: "Forbidden" }, { status: 403 });

  try {
    const body = (await request.json()) as { action?: string; theme?: string; customThemeId?: string; name?: string; baseTheme?: string; settings?: unknown };
    if (body.action === "preset" && body.theme && isSiteTheme(body.theme)) {
      await setSiteTheme(body.theme, session.adminId);
    } else if (body.action === "activate-custom" && body.customThemeId) {
      await activateCustomTheme(body.customThemeId, session.adminId);
    } else if (body.action === "save-custom") {
      const name = String(body.name || "").trim().replace(/\s+/g, " ");
      if (!name || name.length > 80) return NextResponse.json({ message: "Enter a theme name using 1 to 80 characters." }, { status: 400 });
      if (!body.baseTheme || !isSiteTheme(body.baseTheme)) return NextResponse.json({ message: "Choose a valid base theme." }, { status: 400 });
      await createCustomTheme({ name, baseTheme: body.baseTheme, settings: normalizeCustomization(body.settings), authAccountId: session.adminId });
    } else {
      return NextResponse.json({ message: "Invalid theme update." }, { status: 400 });
    }
    revalidatePath("/", "layout");
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Unable to update site theme:", error);
    return NextResponse.json({ message: "Unable to update the website theme." }, { status: 500 });
  }
}
