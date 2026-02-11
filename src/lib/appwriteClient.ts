type CreateDocumentParams = {
  collectionId: string;
  data: Record<string, unknown>;
  permissions?: string[];
};

type ListDocumentsParams = {
  collectionId: string;
  limit?: number;
  queries?: string[];
};

export async function createDocument({
  collectionId,
  data,
  permissions,
}: CreateDocumentParams): Promise<{ $id: string }> {
  const res = await fetch("/api/appwrite/documents", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      collectionId,
      data,
      permissions,
    }),
  });

  if (!res.ok) {
    const errorBody = (await res.json().catch(() => ({}))) as { message?: string };
    throw new Error(errorBody.message || "Failed to create document");
  }

  return (await res.json()) as { $id: string };
}

export async function listDocuments<T>({
  collectionId,
  limit = 9,
  queries = [],
}: ListDocumentsParams): Promise<T[]> {
  const params = new URLSearchParams();
  params.set("collectionId", collectionId);
  params.set("limit", String(limit));
  queries.forEach((query) => params.append("queries[]", query));

  const res = await fetch(`/api/appwrite/documents?${params.toString()}`, {
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) {
    const errorBody = (await res.json().catch(() => ({}))) as { message?: string };
    throw new Error(errorBody.message || "Failed to list documents");
  }

  const data = (await res.json()) as { documents: T[] };
  return data.documents || [];
}

type UploadFileParams = {
  bucketId: string;
  file: File;
};

export async function uploadFile({
  bucketId,
  file,
}: UploadFileParams): Promise<{ $id: string }> {
  const formData = new FormData();
  formData.append("bucketId", bucketId);
  formData.append("file", file);

  const res = await fetch("/api/appwrite/files", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const errorBody = (await res.json().catch(() => ({}))) as { message?: string };
    throw new Error(errorBody.message || "Failed to upload file");
  }

  return (await res.json()) as { $id: string };
}
