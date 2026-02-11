import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const SESSION_COOKIE = "admin_session";
const ADMIN_HOST = "admin.arcelevenarchitect.com";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const host = (request.headers.get("host") || "").split(":")[0].toLowerCase();
  const isAdminHost = host === ADMIN_HOST;
  const hasSessionCookie = Boolean(request.cookies.get(SESSION_COOKIE)?.value);

  const isAdminPage = pathname.startsWith("/admin");
  const isAdminAuthPage = pathname === "/admin/auth";
  const isAdminApi = pathname.startsWith("/api/admin");
  const isAdminAuthApi = pathname === "/api/admin/auth";
  const isAuthPath = pathname === "/auth";

  if (isAdminHost) {
    if (pathname === "/") {
      const authUrl = new URL("/auth", request.url);
      return NextResponse.redirect(authUrl);
    }

    if (isAuthPath) {
      const authPageUrl = new URL("/admin/auth", request.url);
      return NextResponse.rewrite(authPageUrl);
    }

    if (pathname === "/admin/login" || pathname === "/login") {
      const authUrl = new URL("/auth", request.url);
      return NextResponse.redirect(authUrl);
    }

    const isAllowed =
      isAdminPage ||
      isAdminApi ||
      pathname.startsWith("/_next") ||
      pathname === "/favicon.ico";

    if (!isAllowed) {
      const authUrl = new URL("/auth", request.url);
      return NextResponse.redirect(authUrl);
    }
  }

  if (isAdminPage && !isAdminAuthPage && !hasSessionCookie) {
    const authPath = isAdminHost ? "/auth" : "/admin/auth";
    const authUrl = new URL(authPath, request.url);
    return NextResponse.redirect(authUrl);
  }

  if (isAdminApi && !isAdminAuthApi && !hasSessionCookie) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
