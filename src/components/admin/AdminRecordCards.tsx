import { isValidElement, type ReactNode } from "react";

type AdminRecordCardsProps = {
  items: Array<{
    id: string;
    title: string;
    subtitle?: string;
    createdAt?: unknown;
    status?: string;
    fields: Array<{ label: string; value: unknown }>;
  }>;
  emptyText: string;
};

function formatDate(value: Date) {
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
  }).format(value);
}

function renderValue(value: unknown): ReactNode {
  if (value instanceof Date) {
    return formatDate(value);
  }
  if (typeof value === "string") {
    return value === "-" ? <span className="text-[var(--muted-2)]">Not provided</span> : value;
  }
  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }
  if (isValidElement(value)) {
    return value;
  }
  if (Array.isArray(value)) {
    return value.map((entry) => renderValue(entry)).reduce<ReactNode[]>((entries, entry, index) => (
      index === 0 ? [entry] : [...entries, ", ", entry]
    ), []);
  }
  return <span className="text-[var(--muted-2)]">Not provided</span>;
}

export default function AdminRecordCards({ items, emptyText }: AdminRecordCardsProps) {
  if (!items.length) {
    return (
      <div className="card p-6">
        <p className="text-sm text-[var(--muted)]">{emptyText}</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 xl:grid-cols-2">
      {items.map((item) => (
        <article key={item.id} className="card overflow-hidden">
          <div className="border-b border-[var(--line)] bg-[linear-gradient(180deg,rgba(255,255,255,0.95)_0%,rgba(243,243,241,0.6)_100%)] px-5 py-4">
            <p className="text-xs uppercase tracking-[0.25em] text-[var(--muted-2)]">{item.subtitle || "Record"}</p>
            <h3 className="mt-2 text-2xl leading-tight">{item.title}</h3>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              {item.status ? (
                <span className="rounded-full border border-[var(--line)] bg-white px-3 py-1 text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
                  {item.status}
                </span>
              ) : null}
              {item.createdAt ? (
                <span className="rounded-full border border-[var(--line)] bg-white px-3 py-1 text-xs text-[var(--muted)]">
                  {renderValue(item.createdAt)}
                </span>
              ) : null}
            </div>
          </div>
          <div className="grid gap-3 px-5 py-5 md:grid-cols-2">
            {item.fields.map((field) => (
              <div key={`${item.id}-${field.label}`} className="subtle-card p-3">
                <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--muted-2)]">{field.label}</p>
                <div className="mt-2 break-words text-sm text-[var(--foreground)]">
                  {renderValue(field.value)}
                </div>
              </div>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}
