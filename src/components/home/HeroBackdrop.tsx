"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { useEffect, type RefObject } from "react";

type Props = {
  boundsRef: RefObject<HTMLElement | null>;
};

/**
 * Fare pozisyonu (hero alanı içindeyken) — pencere dinleyicisi; tıklamaları engellemez.
 */
export function HeroBackdrop({ boundsRef }: Props) {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const sx = useSpring(mx, { stiffness: 28, damping: 20 });
  const sy = useSpring(my, { stiffness: 28, damping: 20 });

  const g1 = useMotionTemplate`radial-gradient(420px 280px at ${sx}% ${sy}%, rgba(6,182,212,0.22), transparent 62%)`;
  const g2 = useMotionTemplate`radial-gradient(360px 240px at calc(100% - ${sx}%) calc(100% - ${sy}%), rgba(37,99,235,0.14), transparent 58%)`;

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: PointerEvent) => {
      const el = boundsRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      if (
        e.clientX < r.left ||
        e.clientX > r.right ||
        e.clientY < r.top ||
        e.clientY > r.bottom
      ) {
        mx.set(0.5);
        my.set(0.5);
        return;
      }
      mx.set((e.clientX - r.left) / r.width);
      my.set((e.clientY - r.top) / r.height);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [boundsRef, mx, my, reduce]);

  if (reduce) {
    return (
      <div className="pointer-events-none absolute inset-0 opacity-90" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(520px_280px_at_45%_35%,rgba(6,182,212,0.12),transparent_60%)]" />
      </div>
    );
  }

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      <motion.div className="absolute inset-0 opacity-95" style={{ backgroundImage: g1 }} />
      <motion.div
        className="absolute inset-0 opacity-90 mix-blend-multiply"
        style={{ backgroundImage: g2 }}
      />
    </div>
  );
}
