import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

const BUSINESS_ID = process.env.NEXT_PUBLIC_BUSINESS_ID || "6ab5e485-5b76-4ceb-9f3f-bc61f9bd4687";
const BUSINESS_NAME = process.env.NEXT_PUBLIC_BUSINESS_NAME || "ARC 11 ARCHITECT";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const name = String(body.name || body.customerName || "Anonymous").trim();
    const email = body.email || body.customerEmail || null;
    const phone = body.phone || body.customerPhone || null;
    const rating = Math.min(Math.max(Number(body.rating) || 5, 1), 5);
    const message = String(body.message || "").trim();
    const source = String(body.source || "arcelevenarchitect.com").trim();
    const pageUrl = String(body.page || body.pageUrl || "/").trim();

    if (!message) {
      return NextResponse.json({ message: "Feedback message is required." }, { status: 400 });
    }

    const rows = await query(
      `INSERT INTO feedback (
        business_id, business_name, customer_name, customer_email, customer_phone,
        rating, message, source, page_url, status, created_at, updated_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, 'new', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
      RETURNING id, business_id, business_name, customer_name, rating, message, page_url, created_at`,
      [BUSINESS_ID, BUSINESS_NAME, name, email, phone, rating, message, source, pageUrl]
    );

    return NextResponse.json({
      success: true,
      message: "Feedback submitted successfully.",
      feedback: rows[0],
    });
  } catch (error: any) {
    console.error("Feedback submission error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to submit feedback." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const rows = await query(
      `SELECT id, business_id, business_name, customer_name, customer_email, customer_phone,
              rating, message, source, page_url, status, response, created_at
       FROM feedback 
       WHERE business_id = $1
       ORDER BY created_at DESC
       LIMIT 50`,
      [BUSINESS_ID]
    );

    return NextResponse.json({ feedback: rows });
  } catch (error: any) {
    console.error("Feedback list error:", error);
    return NextResponse.json({ feedback: [] });
  }
}
