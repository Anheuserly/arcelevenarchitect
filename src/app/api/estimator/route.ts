import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

const BUSINESS_ID = process.env.NEXT_PUBLIC_BUSINESS_ID || "6ab5e485-5b76-4ceb-9f3f-bc61f9bd4687";
const BUSINESS_NAME = process.env.NEXT_PUBLIC_BUSINESS_NAME || "ARC 11 ARCHITECT";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const clientName = String(body.clientName || body.name || "Client").trim();
    const phone = String(body.phone || "").trim();
    const email = body.email ? String(body.email).trim() : null;
    const projectType = String(body.projectType || "Residential").trim();
    const totalArea = String(body.totalArea || "0").trim();
    const estimatedBudget = Number(body.estimatedBudget) || 0;
    const currency = String(body.currency || "INR").trim();
    const configuration = body.configuration || {};

    const rows = await query(
      `INSERT INTO estimator_submissions (
        business_id, business_name, client_name, phone, email, project_type,
        total_area, estimated_budget, currency, configuration, source, status,
        created_at, updated_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 'arcelevenarchitect.com', 'new', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
      RETURNING id, client_name, project_type, estimated_budget, created_at`,
      [BUSINESS_ID, BUSINESS_NAME, clientName, phone, email, projectType, totalArea, estimatedBudget, currency, JSON.stringify(configuration)]
    );

    return NextResponse.json({
      success: true,
      message: "Estimator submission saved.",
      submission: rows[0],
    });
  } catch (error: any) {
    console.error("Estimator submission error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to save estimate." },
      { status: 500 }
    );
  }
}
