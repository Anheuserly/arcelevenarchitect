import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

const BUSINESS_ID = process.env.NEXT_PUBLIC_BUSINESS_ID || "6ab5e485-5b76-4ceb-9f3f-bc61f9bd4687";
const BUSINESS_NAME = process.env.NEXT_PUBLIC_BUSINESS_NAME || "ARC 11 ARCHITECT";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const name = String(body.name || body.clientName || "Inquirer").trim();
    const phone = String(body.phone || "").trim();
    const email = body.email ? String(body.email).trim() : null;
    const title = String(body.title || body.service || body.projectType || "Architectural Project Consultation").trim();
    const description = String(body.message || body.details || body.description || "Inquiry from website").trim();
    const address = String(body.location || body.address || "").trim();

    const metadata = {
      service: body.service || null,
      projectType: body.projectType || null,
      budget: body.budget || null,
      timeline: body.timeline || null,
      source: body.source || "arcelevenarchitect.com",
      submittedAt: new Date().toISOString()
    };

    const sourceRecordId = `arc11-inq-${Date.now()}`;
    const requestNumber = `ARC-${Date.now().toString().slice(-6)}`;

    const rows = await query(
      `INSERT INTO work_requests (
        source_record_id, request_number, request_type, title, description,
        requester_name, requester_phone, requester_email, assigned_business_id,
        business_name, status, address, metadata, created_at, updated_at
      ) VALUES ($1, $2, 'architectural_inquiry', $3, $4, $5, $6, $7, $8, $9, 'pending', $10, $11, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
      RETURNING id, request_number, title, requester_name, status, created_at`,
      [sourceRecordId, requestNumber, title, description, name, phone, email, BUSINESS_ID, BUSINESS_NAME, address, JSON.stringify(metadata)]
    );

    return NextResponse.json({
      success: true,
      message: "Architectural consultation request received.",
      request: rows[0],
    });
  } catch (error: any) {
    console.error("Inquiry submission error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to submit project inquiry." },
      { status: 500 }
    );
  }
}
