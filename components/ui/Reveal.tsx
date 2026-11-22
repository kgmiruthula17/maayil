"use client";

import { m } from "framer-motion";
import type { ReactNode } from "react";
import { EASE } from "@/lib/utils";

/** Scroll-triggered reveal. Transform + opacity only; runs once. */
export function Reveal({
  children,
  className,
  delay = 0,
  image = false,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  image?: boolean;
}) {
  return (
    <m.div
      className={className}
      initial={image ? { opacity: 0, scale: 1.05 } : { opacity: 0, y: 24 }}
      whileInView={image ? { opacity: 1, scale: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </m.div>
  );
}
