import { NextRequest, NextResponse } from "next/server";
import { authenticateAdmin } from "@/lib/adminAuth";
import { createAdminSessionCookie } from "@/lib/adminSession";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as { email?: string; password?: string };
    const email = (body.email || "").trim();
    const password = body.password || "";

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    const admin = await authenticateAdmin(email, password);
    await createAdminSessionCookie(admin);

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Authentication failed";
    return NextResponse.json({ message }, { status: 401 });
  }
}
