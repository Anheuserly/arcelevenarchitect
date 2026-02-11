import { NextRequest, NextResponse } from "next/server";
import { createDocumentServer, listDocumentsServer } from "@/lib/appwriteServer";

export async function POST(request: NextRequest) {
  try {
      const body = (await request.json()) as {
        collectionId?: string;
        data?: Record<string, unknown>;
        permissions?: string[];
      };

    if (!body.collectionId || !body.data) {
      return NextResponse.json(
        { message: "collectionId and data are required" },
        { status: 400 }
      );
    }

      const created = await createDocumentServer({
        collectionId: body.collectionId,
        data: body.data,
        permissions: body.permissions,
      });

    return NextResponse.json(created);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to create document";
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const collectionId = request.nextUrl.searchParams.get("collectionId");
    const limitRaw = request.nextUrl.searchParams.get("limit");
    const queries = request.nextUrl.searchParams.getAll("queries[]");

    if (!collectionId) {
      return NextResponse.json({ message: "collectionId is required" }, { status: 400 });
    }

    const limit = Number(limitRaw || "9");

    const documents = await listDocumentsServer({
      collectionId,
      limit: Number.isNaN(limit) ? 9 : limit,
      queries,
    });

    return NextResponse.json({ documents });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to list documents";
    return NextResponse.json({ message }, { status: 500 });
  }
}
