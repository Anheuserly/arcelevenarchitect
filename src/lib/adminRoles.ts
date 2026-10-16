export type AdminRole = "super_admin" | "admin" | "editor";

export type AdminPermissions = {
  canViewDashboard: boolean;
  canManageSettings: boolean;
  canManageAdmins: boolean;
};

export function normalizeRole(raw: string | undefined): AdminRole {
  const value = (raw || "").trim().toLowerCase();
  if (value === "super_admin") return "super_admin";
  if (value === "admin" || value === "platform_admin" || value === "operations_admin") return "admin";
  if (value === "editor" || value === "support_admin" || value === "analyst") return "editor";
  return "editor";
}

export function getPermissions(role: AdminRole): AdminPermissions {
  if (role === "editor") {
    return {
      canViewDashboard: true,
      canManageSettings: false,
      canManageAdmins: false,
    };
  }

  if (role === "admin") {
    return {
      canViewDashboard: true,
      canManageSettings: true,
      canManageAdmins: false,
    };
  }

  return {
    canViewDashboard: true,
    canManageSettings: true,
    canManageAdmins: true,
  };
}
