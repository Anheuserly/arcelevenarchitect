"use server";

const endpoint =
  process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || process.env.APPWRITE_ENDPOINT;
const projectId =
  process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || process.env.APPWRITE_PROJECT_ID;
const databaseId =
  process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || process.env.APPWRITE_DATABASE_ID;
const apiKey = process.env.APPWRITE_API_KEY;

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

type UploadFileParams = {
  bucketId: string;
  file: File;
};

function assertConfig() {
  const missing: string[] = [];
  if (!endpoint) missing.push("NEXT_PUBLIC_APPWRITE_ENDPOINT or APPWRITE_ENDPOINT");
  if (!projectId) missing.push("NEXT_PUBLIC_APPWRITE_PROJECT_ID or APPWRITE_PROJECT_ID");
  if (!databaseId) missing.push("NEXT_PUBLIC_APPWRITE_DATABASE_ID or APPWRITE_DATABASE_ID");
  if (missing.length > 0) {
    throw new Error(`Appwrite config missing: ${missing.join(", ")}`);
  }
}

function appwriteHeaders(contentType?: string): HeadersInit {
  const headers: HeadersInit = {
    "X-Appwrite-Project": projectId || "",
  };

  if (apiKey) {
    headers["X-Appwrite-Key"] = apiKey;
  }

  if (contentType) {
    headers["Content-Type"] = contentType;
  }

  return headers;
}

function parseErrorMessage(raw: string): string {
  try {
    const parsed = JSON.parse(raw) as { message?: string; type?: string };
    return parsed.message || raw;
  } catch {
    return raw;
  }
}

function buildQueryString(limit: number, queries: string[]): string {
  const params = new URLSearchParams();
  [`limit(${limit})`, ...queries].forEach((query) => params.append("queries[]", query));
  return params.toString();
}

async function parseResponseJson<T>(res: Response): Promise<T> {
  return (await res.json()) as T;
}

function extractUnknownAttribute(message: string): string | null {
  const patterns = [
    /Unknown attribute[:\s]+"([^"]+)"/i,
    /Unknown attribute[:\s]+'([^']+)'/i,
    /Unknown attribute[:\s]+([a-zA-Z0-9_.$-]+)/i,
    /Invalid document structure:\s*Unknown attribute:\s*([a-zA-Z0-9_.$-]+)/i,
  ];

  for (const pattern of patterns) {
    const match = message.match(pattern);
    if (match?.[1]) return match[1];
  }

  return null;
}

async function getCollectionAttributeKeys(collectionId: string): Promise<Set<string>> {
  assertConfig();

  const collectionRes = await fetch(
    `${endpoint}/databases/${databaseId}/collections/${collectionId}/attributes`,
    {
      method: "GET",
      headers: appwriteHeaders(),
      cache: "no-store",
    }
  );

  if (collectionRes.ok) {
    const payload = (await collectionRes.json()) as {
      attributes?: Array<{ key?: string }>;
    };

    const keys = new Set<string>();
    (payload.attributes || []).forEach((item) => {
      if (item.key) keys.add(item.key);
    });

    if (keys.size > 0) {
      return keys;
    }
  }

  const tableRes = await fetch(
    `${endpoint}/databases/${databaseId}/tables/${collectionId}/columns`,
    {
      method: "GET",
      headers: appwriteHeaders(),
      cache: "no-store",
    }
  );

  if (!tableRes.ok) {
    return new Set<string>();
  }

  const tablePayload = (await tableRes.json()) as {
    columns?: Array<{ key?: string; name?: string }>;
  };

  const keys = new Set<string>();
  (tablePayload.columns || []).forEach((item) => {
    if (item.key) keys.add(item.key);
    if (item.name) keys.add(item.name);
  });

  return keys;
}

export async function createDocumentServer({
  collectionId,
  data,
  permissions,
}: CreateDocumentParams): Promise<{ $id: string }> {
  assertConfig();
  const attributeKeys = await getCollectionAttributeKeys(collectionId);
  const workingData =
    attributeKeys.size > 0
      ? Object.fromEntries(Object.entries(data).filter(([key]) => attributeKeys.has(key)))
      : { ...data };

  // Retry by dropping unknown keys if Appwrite rejects payload attributes.
  for (let attempt = 0; attempt < 20; attempt += 1) {
    const documentPayload = {
      documentId: "unique()",
      data: workingData,
      ...(permissions ? { permissions } : {}),
    };

    let res = await fetch(
      `${endpoint}/databases/${databaseId}/collections/${collectionId}/documents`,
      {
        method: "POST",
        headers: appwriteHeaders("application/json"),
        body: JSON.stringify(documentPayload),
        cache: "no-store",
      }
    );

    // Fallback for database-table projects where rows endpoint is used.
    if (!res.ok) {
      res = await fetch(
        `${endpoint}/databases/${databaseId}/tables/${collectionId}/rows`,
        {
          method: "POST",
          headers: appwriteHeaders("application/json"),
          body: JSON.stringify({
            rowId: "unique()",
            data: workingData,
          }),
          cache: "no-store",
        }
      );
    }

    if (res.ok) {
      return (await res.json()) as { $id: string };
    }

    const message = parseErrorMessage(await res.text()) || "Failed to create document";
    const unknownKey = extractUnknownAttribute(message);

    if (unknownKey && unknownKey in workingData) {
      delete workingData[unknownKey];
      continue;
    }

    throw new Error(message);
  }

  throw new Error("Failed to create document after sanitizing unknown attributes.");
}

export async function listDocumentsServer<T>({
  collectionId,
  limit = 9,
  queries = [],
}: ListDocumentsParams): Promise<T[]> {
  assertConfig();

  const queryString = buildQueryString(limit, queries);
  const collectionUrl = `${endpoint}/databases/${databaseId}/collections/${collectionId}/documents`;
  const tableUrl = `${endpoint}/databases/${databaseId}/tables/${collectionId}/rows`;

  // Attempt 1: collection documents with query syntax.
  let res = await fetch(`${collectionUrl}?${queryString}`, {
    method: "GET",
    headers: appwriteHeaders(),
    cache: "no-store",
  });

  if (res.ok) {
    const data = await parseResponseJson<{ documents?: T[] }>(res);
    return data.documents || [];
  }

  const firstError = parseErrorMessage(await res.text());
  const queryError = /invalid query|syntax error/i.test(firstError);

  // Attempt 2: collection documents without queries (syntax fallback).
  if (queryError) {
    res = await fetch(collectionUrl, {
      method: "GET",
      headers: appwriteHeaders(),
      cache: "no-store",
    });
    if (res.ok) {
      const data = await parseResponseJson<{ documents?: T[] }>(res);
      return (data.documents || []).slice(0, limit);
    }
  }

  // Attempt 3: tables rows with query syntax.
  res = await fetch(`${tableUrl}?${queryString}`, {
    method: "GET",
    headers: appwriteHeaders(),
    cache: "no-store",
  });
  if (res.ok) {
    const data = await parseResponseJson<{ rows?: T[] }>(res);
    return data.rows || [];
  }

  // Attempt 4: tables rows without queries.
  if (queryError) {
    res = await fetch(tableUrl, {
      method: "GET",
      headers: appwriteHeaders(),
      cache: "no-store",
    });
    if (res.ok) {
      const data = await parseResponseJson<{ rows?: T[] }>(res);
      return (data.rows || []).slice(0, limit);
    }
  }

  throw new Error(firstError || "Failed to list documents");
}

export async function uploadFileServer({
  bucketId,
  file,
}: UploadFileParams): Promise<{ $id: string }> {
  if (!endpoint || !projectId) {
    const missing: string[] = [];
    if (!endpoint) missing.push("NEXT_PUBLIC_APPWRITE_ENDPOINT or APPWRITE_ENDPOINT");
    if (!projectId) missing.push("NEXT_PUBLIC_APPWRITE_PROJECT_ID or APPWRITE_PROJECT_ID");
    throw new Error(`Appwrite config missing: ${missing.join(", ")}`);
  }

  const formData = new FormData();
  formData.append("fileId", "unique()");
  formData.append("file", file);

  const res = await fetch(`${endpoint}/storage/buckets/${bucketId}/files`, {
    method: "POST",
    headers: appwriteHeaders(),
    body: formData,
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(parseErrorMessage(await res.text()) || "Failed to upload file");
  }

  return (await res.json()) as { $id: string };
}
