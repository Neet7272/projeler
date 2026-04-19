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
    <nav className="flex flex-col gap-1 text-sm text-slate-600">
      {items.map((i) => {
        const active = pathname === i.href;
        return (
          <Link
            key={i.href}
            href={i.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "rounded-xl px-3 py-2 transition-colors duration-200 hover:text-slate-900",
              active && "bg-slate-100 font-medium text-slate-900"
            )}
          >
            {i.label}
          </Link>
        );
      })}
    </nav>
  );
}

