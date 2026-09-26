import { NextRequest, NextResponse } from "next/server";
import { createDocumentServer, listDocumentsServer } from "@/lib/appwriteServer";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      collectionId?: string;
      data?: Record<string, any>;
      permissions?: string[];
    };

    if (!body.collectionId || !body.data) {
      return NextResponse.json(
        { message: "collectionId and data are required" },
        { status: 400 }
      );
    }

    const doc = await createDocumentServer({
      collectionId: body.collectionId,
      data: body.data,
      permissions: body.permissions,
    });

    return NextResponse.json(doc);
  } catch (error: any) {
    return NextResponse.json(
      { message: error?.message || "Failed to process document" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const collectionId = searchParams.get("collectionId") || "";
    const limit = Number(searchParams.get("limit")) || 25;

    const documents = await listDocumentsServer({ collectionId, limit });
    return NextResponse.json({ documents });
  } catch (error: any) {
    return NextResponse.json(
      { message: error?.message || "Failed to list documents", documents: [] },
      { status: 500 }
    );
  }
}
