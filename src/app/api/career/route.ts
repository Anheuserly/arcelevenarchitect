import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

const BUSINESS_ID = process.env.NEXT_PUBLIC_BUSINESS_ID || "6ab5e485-5b76-4ceb-9f3f-bc61f9bd4687";
const BUSINESS_NAME = process.env.NEXT_PUBLIC_BUSINESS_NAME || "ARC 11 ARCHITECT";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const applicantName = String(body.applicantName || body.name || "Applicant").trim();
    const phone = String(body.phone || "").trim();
    const email = body.email ? String(body.email).trim() : null;
    const position = String(body.position || "Architect").trim();
    const experience = String(body.experience || "").trim();
    const location = String(body.location || "").trim();
    const workDescription = String(body.workDescription || body.message || "").trim();
    const portfolioLink = String(body.portfolioLink || body.resumeUrl || "").trim();

    const rows = await query(
      `INSERT INTO career_applications (
        business_id, business_name, applicant_name, phone, email, position,
        experience, location, work_description, portfolio_link, source, status,
        created_at, updated_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 'arcelevenarchitect.com', 'new', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
      RETURNING id, applicant_name, position, created_at`,
      [BUSINESS_ID, BUSINESS_NAME, applicantName, phone, email, position, experience, location, workDescription, portfolioLink]
    );

    return NextResponse.json({
      success: true,
      message: "Application submitted successfully.",
      application: rows[0],
    });
  } catch (error: any) {
    console.error("Career application error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to submit application." },
      { status: 500 }
    );
  }
}
