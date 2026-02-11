export type AdminRole = "admin" | "editor";

export type AdminPermissions = {
  canViewDashboard: boolean;
  canManageSettings: boolean;
  canManageAdmins: boolean;
};

export function normalizeRole(raw: string | undefined): AdminRole {
  const value = (raw || "admin").trim().toLowerCase();
  if (value === "editor") return "editor";
  return "admin";
}

export function getPermissions(role: AdminRole): AdminPermissions {
  if (role === "editor") {
    return {
      canViewDashboard: true,
      canManageSettings: false,
      canManageAdmins: false,
    };
  }

  return {
    canViewDashboard: true,
    canManageSettings: true,
    canManageAdmins: true,
  };
}
