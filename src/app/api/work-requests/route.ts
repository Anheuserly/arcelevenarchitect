import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

const BUSINESS_ID = process.env.NEXT_PUBLIC_BUSINESS_ID || "6ab5e485-5b76-4ceb-9f3f-bc61f9bd4687";
const BUSINESS_NAME = process.env.NEXT_PUBLIC_BUSINESS_NAME || "ARC 11 ARCHITECT";

export async function GET() {
  try {
    const rows = await query(
      `SELECT * FROM work_requests 
       WHERE assigned_business_id = $1 OR business_name = $2
       ORDER BY created_at DESC 
       LIMIT 50`,
      [BUSINESS_ID, BUSINESS_NAME]
    );

    return NextResponse.json({
      success: true,
      count: rows.length,
      rows,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to fetch work requests" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const name = String(body.name || body.clientName || body.requesterName || "Client").trim();
    const phone = String(body.phone || body.requesterPhone || "").trim();
    const email = body.email || body.requesterEmail ? String(body.email || body.requesterEmail).trim() : null;
    const requestType = String(body.requestType || "architectural_commission").trim();
    const title = String(body.title || body.serviceTitle || body.service || "Architectural Work Request").trim();
    const description = String(body.message || body.details || body.description || "Work request submitted").trim();
    const address = String(body.location || body.address || "").trim();
    const amount = body.amount && !isNaN(Number(body.amount)) ? Number(body.amount) : null;

    const metadata = {
      listingId: body.listingId || null,
      serviceTitle: body.serviceTitle || body.service || null,
      sku: body.sku || null,
      projectType: body.projectType || null,
      builtUpArea: body.builtUpArea || null,
      budget: body.budget || null,
      timeline: body.timeline || null,
      source: body.source || "arcelevenarchitect.com/services",
      channel: body.channel || "web_commission_request",
      submittedAt: new Date().toISOString(),
      ...(body.metadata || {}),
    };

    const sourceRecordId = `arc11-wr-${Date.now()}`;
    const requestNumber = `ARC-${Math.floor(100000 + Math.random() * 900000)}`;

    const rows = await query(
      `INSERT INTO work_requests (
        source_record_id, request_number, request_type, title, description,
        requester_name, requester_phone, requester_email, assigned_business_id,
        business_name, status, address, amount, metadata, created_at, updated_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 'pending', $11, $12, $13, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
      RETURNING id, request_number, request_type, title, description, requester_name, requester_phone, requester_email, assigned_business_id, business_name, status, address, amount, metadata, created_at`,
      [sourceRecordId, requestNumber, requestType, title, description, name, phone, email, BUSINESS_ID, BUSINESS_NAME, address, amount, JSON.stringify(metadata)]
    );

    return NextResponse.json({
      success: true,
      message: "Work request successfully registered in Arc 11 Atelier register.",
      request: rows[0],
    });
  } catch (error: any) {
    console.error("Work request error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to create work request" },
      { status: 500 }
    );
  }
}
