import AdminLogoutButton from "@/components/admin/AdminLogoutButton";
import AdminSidebarNav from "@/components/admin/AdminSidebarNav";

type AdminShellProps = {
  children: React.ReactNode;
  heading: string;
  subheading: string;
  role: string;
  name: string;
  email: string;
  immersive?: boolean;
};

const navItems = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/requests", label: "Requests" },
  { href: "/admin/meta-inbox", label: "Meta Inbox" },
  { href: "/admin/feedback", label: "Feedback" },
  { href: "/admin/applications", label: "Applications" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/team", label: "Team" },
  { href: "/admin/estimator", label: "Estimator" },
  { href: "/admin/journal", label: "Journal" },
  { href: "/admin/theme", label: "Website Theme" },
  { href: "/admin/settings", label: "Settings" },
];

export default function AdminShell({
  children,
  heading,
  subheading,
  role,
  name,
  email,
  immersive = false,
}: AdminShellProps) {
  return (
    <main className="admin-app-shell min-h-screen bg-[var(--background)]">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(141,133,115,0.25),transparent_42%),radial-gradient(circle_at_bottom_left,rgba(0,0,0,0.05),transparent_50%)]" />

      <aside className="admin-sidebar hidden border-r border-[var(--line)] bg-[linear-gradient(180deg,#f9f8f3_0%,#f5f5f2_100%)] lg:flex lg:w-[300px] lg:flex-col">
        <div className="border-b border-[var(--line)] px-7 pb-6 pt-7">
          <p className="kicker">Admin</p>
          <h1 className="mt-3 text-2xl">Arc 11 Panel</h1>
          <div className="mt-4 rounded-2xl border border-[var(--line)] bg-white/70 px-4 py-3">
            <p className="text-xs uppercase tracking-[0.25em] text-[var(--muted-2)]">{role}</p>
            <p className="mt-2 text-sm text-[var(--foreground)]">{name}</p>
            <p className="mt-1 truncate text-xs text-[var(--muted)]">{email}</p>
          </div>
        </div>
        <div className="flex flex-1 flex-col px-6 py-6">
          <AdminSidebarNav items={navItems} />
          <div className="mt-auto pt-6">
            <AdminLogoutButton />
          </div>
        </div>
      </aside>

      <section className={`admin-main-scroll relative z-10 px-4 py-6 md:px-6 md:py-8 lg:ml-[300px] lg:px-9 lg:py-10 ${immersive ? "lg:overflow-hidden" : ""}`}>
        <div className={`mx-auto w-full max-w-[1320px] ${immersive ? "lg:h-full" : "space-y-6"}`}>
          {!immersive ? <div className="card p-6 md:p-8">
            <p className="kicker">Control Center</p>
            <h2 className="mt-3 text-3xl md:text-4xl">{heading}</h2>
            <p className="mt-3 max-w-3xl text-sm text-[var(--muted)] md:text-base">{subheading}</p>
            <div className="mt-6 flex flex-wrap items-center gap-2 lg:hidden">
              <AdminSidebarNav items={navItems} />
              <AdminLogoutButton />
            </div>
          </div> : <div className="mb-5 lg:hidden">
            <p className="kicker">Control Center</p>
            <h2 className="mt-3 text-3xl">{heading}</h2>
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <AdminSidebarNav items={navItems} />
              <AdminLogoutButton />
            </div>
          </div>}
          {children}
        </div>
      </section>
    </main>
  );
}
