import type { ReactNode } from "react";

export const runtime = "edge";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return children;
}
