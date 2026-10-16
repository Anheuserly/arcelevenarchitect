type WorkRequestRecord = {
  id: string;
  requester_email?: string | null;
  [key: string]: unknown;
};

const dataHubUrl =
  process.env.NEXT_PUBLIC_DATA_HUB_API_URL ?? 'https://storage.amcmep.in/v1';

/** Mirrors a persisted website request into DataHub for owner notifications. */
export function notifyBusinessOwnerOfWorkRequest(
  workRequest: WorkRequestRecord,
): void {
  const apiKey = process.env.DATA_HUB_INTERNAL_API_KEY;
  if (!apiKey || !workRequest.id) return;

  void fetch(`${dataHubUrl}/records/work_requests`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Data-Project': 'amcmep',
      'X-Data-Hub-Key': apiKey,
    },
    body: JSON.stringify({ id: workRequest.id, data: workRequest }),
  }).catch(() => undefined);
}
