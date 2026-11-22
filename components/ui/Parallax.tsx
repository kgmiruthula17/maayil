"use client";

import { m, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

/** Gentle vertical drift on a single image. Transform-only; disabled for reduced motion. */
export function Parallax({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <div ref={ref} className={`overflow-hidden ${className ?? ""}`}>
      <m.div style={reduce ? undefined : { y }} className="absolute inset-x-0 -inset-y-[7%]">
        {children}
      </m.div>
    </div>
  );
}
