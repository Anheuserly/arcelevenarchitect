import { readFile } from "node:fs/promises";
import path from "node:path";
import type { PossessionRecord } from "@/components/PossessionTable";

type IntakeSummary = {
  total_files: number;
  by_status: Record<string, number>;
  exact_duplicate_groups: number;
  possession_keyword_files: string[];
};

const privateDataRoot = process.env.ARC11_PRIVATE_DATA_ROOT;

export async function getPossessionIntelligence(): Promise<IntakeSummary | null> {
  if (!privateDataRoot) return null;

  try {
    const file = path.join(privateDataRoot, "reports", "intake-summary.json");
    return JSON.parse(await readFile(file, "utf8")) as IntakeSummary;
  } catch {
    return null;
  }
}

export async function getPossessionRecords(): Promise<PossessionRecord[]> {
  if (!privateDataRoot) return [];
  try {
    const file = path.join(privateDataRoot, "reports", "possession-records.json");
    return JSON.parse(await readFile(file, "utf8")) as PossessionRecord[];
  } catch {
    return [];
  }
}
