"use server";

import { query } from "@/lib/db";

const BUSINESS_ID = process.env.NEXT_PUBLIC_BUSINESS_ID || "6ab5e485-5b76-4ceb-9f3f-bc61f9bd4687";
const BUSINESS_NAME = process.env.NEXT_PUBLIC_BUSINESS_NAME || "ARC 11 ARCHITECT";

type CreateDocumentParams = {
  collectionId: string;
  data: Record<string, any>;
  permissions?: string[];
};

type ListDocumentsParams = {
  collectionId: string;
  limit?: number;
  queries?: string[];
};

type UploadFileParams = {
  bucketId: string;
  file: File;
};

export async function createDocumentServer({
  collectionId,
  data,
}: CreateDocumentParams): Promise<{ $id: string }> {
  try {
    const col = (collectionId || "").toLowerCase();

    if (col.includes("feedback")) {
      const rows = await query(
        `INSERT INTO feedback (
          business_id, business_name, customer_name, customer_email, customer_phone,
          rating, message, source, page_url, status, created_at, updated_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, 'new', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
        RETURNING id`,
        [
          BUSINESS_ID,
          BUSINESS_NAME,
          data.name || data.customerName || "Anonymous",
          data.email || data.customerEmail || null,
          data.phone || data.customerPhone || null,
          Number(data.rating) || 5,
          data.message || "",
          data.source || "arcelevenarchitect.com",
          data.page || data.pageUrl || "/",
        ]
      );
      return { $id: rows[0]?.id || `fb-${Date.now()}` };
    }

    if (col.includes("request") || col.includes("contact")) {
      const sourceRecordId = `arc11-inq-${Date.now()}`;
      const requestNumber = `ARC-${Date.now().toString().slice(-6)}`;
      const rows = await query(
        `INSERT INTO work_requests (
          source_record_id, request_number, request_type, title, description,
          requester_name, requester_phone, requester_email, assigned_business_id,
          business_name, status, address, metadata, created_at, updated_at
        ) VALUES ($1, $2, 'architectural_inquiry', $3, $4, $5, $6, $7, $8, $9, 'pending', $10, $11, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
        RETURNING id`,
        [
          sourceRecordId,
          requestNumber,
          data.title || data.service || data.projectType || "Architectural Project Consultation",
          data.message || data.details || "Inquiry from website",
          data.name || data.clientName || "Inquirer",
          data.phone || "",
          data.email || null,
          BUSINESS_ID,
          BUSINESS_NAME,
          data.location || data.address || "",
          JSON.stringify(data),
        ]
      );
      return { $id: rows[0]?.id || `req-${Date.now()}` };
    }

    if (col.includes("career") || col.includes("application")) {
      const rows = await query(
        `INSERT INTO career_applications (
          business_id, business_name, applicant_name, phone, email, position,
          experience, location, work_description, portfolio_link, source, status,
          created_at, updated_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 'arcelevenarchitect.com', 'new', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
        RETURNING id`,
        [
          BUSINESS_ID,
          BUSINESS_NAME,
          data.applicantName || data.name || "Applicant",
          data.phone || "",
          data.email || null,
          data.position || data.jobTitle || "Architect",
          data.experience || "",
          data.location || "",
          data.workDescription || data.message || "",
          data.portfolioLink || data.resumeLink || "",
        ]
      );
      return { $id: rows[0]?.id || `car-${Date.now()}` };
    }

    if (col.includes("estimator")) {
      const rows = await query(
        `INSERT INTO estimator_submissions (
          business_id, business_name, client_name, phone, email, project_type,
          total_area, estimated_budget, currency, configuration, source, status,
          created_at, updated_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 'arcelevenarchitect.com', 'new', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
        RETURNING id`,
        [
          BUSINESS_ID,
          BUSINESS_NAME,
          data.clientName || data.name || "Client",
          data.phone || "",
          data.email || null,
          data.project_type || "Residential",
          `${data.project_size || 0} ${data.project_size_unit || "sq ft"}`,
          Number(data.estimated_cost_inr) || 0,
          data.selected_currency || "INR",
          JSON.stringify(data),
        ]
      );
      return { $id: rows[0]?.id || `est-${Date.now()}` };
    }

    // Default fallback
    return { $id: `doc-${Date.now()}` };
  } catch (error: any) {
    console.error("Direct PostgreSQL create error in appwriteServer adapter:", error);
    return { $id: `fallback-${Date.now()}` };
  }
}

export async function listDocumentsServer<T = any>({
  collectionId,
  limit = 25,
}: ListDocumentsParams): Promise<T[]> {
  try {
    const col = (collectionId || "").toLowerCase();

    if (col.includes("feedback")) {
      const rows = await query(
        `SELECT id as "$id", id, customer_name as name, customer_email as email,
                customer_phone as phone, rating, message, page_url, status,
                created_at as "createdAt", created_at as "$createdAt"
         FROM feedback 
         WHERE business_id = $1 
         ORDER BY created_at DESC 
         LIMIT $2`,
        [BUSINESS_ID, limit]
      );
      return rows as T[];
    }

    if (col.includes("request") || col.includes("contact")) {
      const rows = await query(
        `SELECT id as "$id", id, title, description, requester_name as name,
                requester_email as email, requester_phone as phone, status,
                created_at as "createdAt", created_at as "$createdAt"
         FROM work_requests 
         WHERE assigned_business_id = $1 
         ORDER BY created_at DESC 
         LIMIT $2`,
        [BUSINESS_ID, limit]
      );
      return rows as T[];
    }

    if (col.includes("career") || col.includes("application")) {
      const rows = await query(
        `SELECT id as "$id", id, applicant_name as name, email, phone, position,
                experience, location, work_description as message, status,
                created_at as "createdAt", created_at as "$createdAt"
         FROM career_applications 
         WHERE business_id = $1 
         ORDER BY created_at DESC 
         LIMIT $2`,
        [BUSINESS_ID, limit]
      );
      return rows as T[];
    }

    if (col.includes("project")) {
      const rows = await query(
        `SELECT id as "$id", id, title, category, price, currency,
                availability as status, media_url as "heroImage",
                created_at as "createdAt", created_at as "$createdAt"
         FROM listings 
         WHERE business_id = $1 
         ORDER BY created_at DESC 
         LIMIT $2`,
        [BUSINESS_ID, limit]
      );
      return rows as T[];
    }

    if (col.includes("journal")) {
      const rows = await query(
        `SELECT id as "$id", id, title, slug, category, excerpt, content,
                cover_image_key as "heroImage", is_published,
                created_at as "createdAt", created_at as "$createdAt"
         FROM journals 
         WHERE business_id = $1 
         ORDER BY created_at DESC 
         LIMIT $2`,
        [BUSINESS_ID, limit]
      );
      return rows as T[];
    }

    if (col.includes("estimator")) {
      const rows = await query(
        `SELECT id as "$id", id, client_name, phone, email, project_type,
                total_area, estimated_budget, currency, status,
                created_at as "createdAt", created_at as "$createdAt"
         FROM estimator_submissions 
         WHERE business_id = $1 
         ORDER BY created_at DESC 
         LIMIT $2`,
        [BUSINESS_ID, limit]
      );
      return rows as T[];
    }

    return [] as T[];
  } catch (error) {
    console.error("Direct PostgreSQL list error in appwriteServer adapter:", error);
    return [] as T[];
  }
}

export async function uploadFileServer({
  file,
}: UploadFileParams): Promise<{ $id: string }> {
  return { $id: `file-${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}` };
}
