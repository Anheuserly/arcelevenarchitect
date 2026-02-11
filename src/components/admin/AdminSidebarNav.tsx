"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Item = { href: string; label: string };

export default function AdminSidebarNav({ items }: { items: Item[] }) {
  const pathname = usePathname();

  return (
    <nav className="flex w-full flex-wrap gap-2 text-sm text-[var(--muted)] lg:flex-col">
      {items.map((item) => {
        const active =
          item.href === "/admin"
            ? pathname === "/admin"
            : pathname === item.href || pathname.startsWith(`${item.href}/`);

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={`rounded-full px-4 py-2 transition lg:rounded-xl ${
              active
                ? "border border-[var(--foreground)] bg-[var(--foreground)] text-white lg:bg-white lg:text-[var(--foreground)]"
                : "border border-[var(--line)] bg-white/75 hover:border-[var(--foreground)] hover:bg-white"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
