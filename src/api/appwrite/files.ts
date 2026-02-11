import { NextRequest, NextResponse } from "next/server";
import { uploadFileServer } from "@/lib/appwriteServer";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const bucketId = String(formData.get("bucketId") || "");
    const file = formData.get("file");

    if (!bucketId || !(file instanceof File)) {
      return NextResponse.json(
        { message: "bucketId and file are required" },
        { status: 400 }
      );
    }

    const uploaded = await uploadFileServer({ bucketId, file });
    return NextResponse.json(uploaded);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to upload file";
    return NextResponse.json({ message }, { status: 500 });
  }
}
