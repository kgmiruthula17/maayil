"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import type { Product, Size } from "@/lib/products";
import { useCartStore } from "@/store/cart-store";
import { SizeSelector } from "./SizeSelector";

/** Hover/focus panel on desktop, tap-to-toggle on touch. Must sit inside a `relative group` parent. */
export function QuickAdd({ product }: { product: Product }) {
  const [open, setOpen] = useState(false);
  const add = useCartStore((s) => s.add);
  const openCart = useCartStore((s) => s.setOpen);

  const pick = (size: Size) => {
    add(product.slug, size);
    setOpen(false);
    openCart(true);
  };

  return (
    <>
      <button
        type="button"
        aria-label={`Quick add ${product.name}`}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="absolute bottom-2.5 right-2.5 grid size-9 place-items-center rounded-full bg-ivory/90 text-burgundy md:hidden"
      >
        <Plus className={`size-5 transition-transform duration-300 ${open ? "rotate-45" : ""}`} />
      </button>
      <div
        data-open={open}
        className="absolute inset-x-0 bottom-0 translate-y-full bg-ivory/95 p-3 pr-14 transition-transform duration-300 data-[open=true]:translate-y-0 md:pr-3 md:group-focus-within:translate-y-0 md:group-hover:translate-y-0"
      >
        <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-espresso/60">Quick add · select size</p>
        <SizeSelector compact sizes={product.sizes} onChange={pick} />
      </div>
    </>
  );
}
