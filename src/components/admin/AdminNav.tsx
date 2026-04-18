"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

const items = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/moderasyon", label: "Moderasyon" },
  { href: "/admin/duyurular", label: "Duyurular" },
] as const;

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1 text-sm text-[var(--muted)]">
      {items.map((i) => {
        const active = pathname === i.href;
        return (
          <Link
            key={i.href}
            href={i.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "rounded-xl px-3 py-2 transition-colors hover:text-[var(--foreground)]",
              active && "bg-[var(--surface)] text-[var(--foreground)]"
            )}
          >
            {i.label}
          </Link>
        );
      })}
    </nav>
  );
}

