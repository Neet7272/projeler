"use client";

import { motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Template(props: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      key={pathname}
      initial={
        reduceMotion ? { opacity: 1 } : { opacity: 0, y: 8, filter: "blur(6px)" }
      }
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 6, filter: "blur(6px)" }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      {props.children}
    </motion.div>
  );
}

