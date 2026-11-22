import { useMemo } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { MAX_QTY, summarize, type CartLine } from "@/lib/cart";
import type { Size } from "@/lib/products";

interface CartState {
  lines: CartLine[];
  open: boolean;
  /** True once localStorage has been read, so the UI never flashes an empty cart. */
  ready: boolean;
  add: (slug: string, size: Size, qty?: number) => void;
  setQty: (slug: string, size: Size, qty: number) => void;
  remove: (slug: string, size: Size) => void;
  clear: () => void;
  setOpen: (open: boolean) => void;
}

const same = (slug: string, size: Size) => (l: CartLine) => l.slug === slug && l.size === size;

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      lines: [],
      open: false,
      ready: false,
      add: (slug, size, qty = 1) =>
        set((s) => {
          const hit = s.lines.find(same(slug, size));
          return {
            lines: hit
              ? s.lines.map((l) => (l === hit ? { ...l, qty: Math.min(MAX_QTY, l.qty + qty) } : l))
              : [...s.lines, { slug, size, qty: Math.min(MAX_QTY, qty) }],
          };
        }),
      setQty: (slug, size, qty) =>
        set((s) => ({
          lines:
            qty < 1
              ? s.lines.filter((l) => !same(slug, size)(l))
              : s.lines.map((l) => (same(slug, size)(l) ? { ...l, qty: Math.min(MAX_QTY, qty) } : l)),
        })),
      remove: (slug, size) => set((s) => ({ lines: s.lines.filter((l) => !same(slug, size)(l)) })),
      clear: () => set({ lines: [] }),
      setOpen: (open) => set({ open }),
    }),
    {
      name: "maayil-cart",
      partialize: (s) => ({ lines: s.lines }),
      skipHydration: true, // rehydrated in <Providers> to avoid SSR mismatches
    },
  ),
);

export function useCartSummary() {
  const lines = useCartStore((s) => s.lines);
  return useMemo(() => summarize(lines), [lines]);
}
