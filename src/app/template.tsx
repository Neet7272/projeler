"use client";

import { PageWipe } from "@/components/transitions/PageWipe";

/**
 * App Router: kök `template` her istemci navigasyonunda yeniden mount olur.
 * Sayfa geçişi yalnızca `PageWipe` üzerinden (tek kaynak).
 */
export default function Template(props: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-0 flex-1 overflow-x-hidden">
      <PageWipe />
      {props.children}
    </div>
  );
}
