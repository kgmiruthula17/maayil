"use client";

import { AnimatePresence, m } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { cn, EASE } from "@/lib/utils";

const hidden = { right: { x: "100%" }, left: { x: "-100%" }, top: { y: "-100%" } } as const;
const position = {
  right: "right-0 top-0 h-full w-full max-w-md border-l",
  left: "left-0 top-0 h-full w-[88%] max-w-sm border-r",
  top: "left-0 top-0 max-h-[85svh] w-full border-b",
} as const;

/**
 * Shared overlay for the cart, mobile menu and search. Portalled outside #app,
 * which is made `inert` while open: that gives focus containment for free.
 */
export function Drawer({
  open,
  onClose,
  label,
  side = "right",
  children,
}: {
  open: boolean;
  onClose: () => void;
  label: string;
  side?: keyof typeof hidden;
  children: ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  const close = useRef(onClose);
  close.current = onClose;

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const app = document.getElementById("app");
    const opener = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    app?.setAttribute("inert", "");
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close.current();
    document.addEventListener("keydown", onKey);
    const raf = requestAnimationFrame(() => {
      if (panel.current && !panel.current.contains(document.activeElement)) panel.current.focus();
    });
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      app?.removeAttribute("inert");
      opener?.focus?.();
    };
  }, [open]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <div key="drawer" className="fixed inset-0 z-50">
          <m.div
            aria-hidden
            className="absolute inset-0 bg-espresso/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => close.current()}
          />
          <m.div
            ref={panel}
            role="dialog"
            aria-modal="true"
            aria-label={label}
            tabIndex={-1}
            className={cn("absolute flex flex-col border-champagne/60 bg-ivory outline-none", position[side])}
            initial={hidden[side]}
            animate={{ x: 0, y: 0 }}
            exit={hidden[side]}
            transition={{ duration: 0.4, ease: EASE }}
          >
            {children}
          </m.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
