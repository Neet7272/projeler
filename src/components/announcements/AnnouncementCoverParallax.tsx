"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState, useRef } from "react";

type Props = {
  src: string;
  alt: string;
};

export function AnnouncementCoverParallax({ src, alt }: Props) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [broken, setBroken] = useState(false);

  useEffect(() => {
    setBroken(false);
  }, [src]);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? ["0%", "0%"] : ["0%", "22%"]
  );
  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1, 1.06]);

  return (
    <div ref={ref} className="relative -mx-6 h-[min(52vh,520px)] overflow-hidden sm:mx-0 sm:rounded-3xl sm:border sm:border-[var(--hairline)]">
      <motion.div style={{ y, scale }} className="absolute inset-0">
        {broken ? (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200/80" />
        ) : (
          <Image
            src={src}
            alt={alt}
            fill
            priority
            className="object-cover"
            sizes="100vw"
            onError={() => setBroken(true)}
          />
        )}
      </motion.div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--background)] via-transparent to-transparent" />
    </div>
  );
}
