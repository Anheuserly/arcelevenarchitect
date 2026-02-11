import { redirect } from "next/navigation";
import { getPermissions, normalizeRole } from "@/lib/adminRoles";
import { getAdminSession } from "@/lib/adminSession";

export async function requireAdminContext() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/auth");
  }

  const role = normalizeRole(session.role);
  const permissions = getPermissions(role);

  return {
    session,
    role,
    permissions,
  };
}
