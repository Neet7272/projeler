"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

const items = [
  { href: "/dashboard", label: "Genel Bakış" },
  { href: "/takim-kur", label: "Takım Kur" },
  { href: "/ayarlar/profil", label: "Profil" },
] as const;

export function DashboardNav(props: { variant?: "top" | "sidebar" } = {}) {
  const pathname = usePathname();
  const variant = props.variant ?? "top";

  return (
    <nav
      className={cn(
        "text-sm text-[var(--muted)]",
        variant === "top" && "flex items-center gap-1",
        variant === "sidebar" && "flex flex-col gap-1"
      )}
    >
      {items.map((i) => {
        const active = pathname === i.href;
        return (
          <Link
            key={i.href}
            href={i.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "transition-colors hover:text-[var(--foreground)]",
              variant === "top" && "rounded-full px-3 py-2",
              variant === "sidebar" && "rounded-xl px-3 py-2",
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

