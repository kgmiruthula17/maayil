"use client";

import Link from "next/link";
import { Minus, Plus } from "lucide-react";
import type { CartEntry } from "@/lib/cart";
import { MAX_QTY } from "@/lib/cart";
import { inr } from "@/lib/utils";
import { ProductImage } from "@/components/product/ProductImage";
import { useCartStore } from "@/store/cart-store";

export function CartItem({ item, onNavigate }: { item: CartEntry; onNavigate?: () => void }) {
  const { product: p, size, qty } = item;
  const setQty = useCartStore((s) => s.setQty);
  const remove = useCartStore((s) => s.remove);
  const step = "grid size-8 place-items-center text-burgundy transition-colors hover:bg-champagne/30 disabled:opacity-30";

  return (
    <li className="flex gap-4 py-5">
      <Link
        href={`/product/${p.slug}`}
        onClick={onNavigate}
        className="relative aspect-[4/5] w-20 shrink-0 overflow-hidden bg-champagne/20"
        tabIndex={-1}
        aria-hidden
      >
        <ProductImage product={p} sizes="80px" />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex justify-between gap-3">
          <div className="min-w-0">
            <Link href={`/product/${p.slug}`} onClick={onNavigate} className="font-serif text-lg leading-tight text-burgundy hover:text-crimson">
              {p.name}
            </Link>
            <p className="mt-1 text-xs text-espresso/60">
              Size {size} · {p.colour}
            </p>
          </div>
          <p className="text-sm font-medium">{inr(p.price * qty)}</p>
        </div>

        <div className="mt-auto flex items-center justify-between pt-3">
          <div className="flex items-center border border-espresso/20">
            <button type="button" className={step} aria-label={`Decrease quantity of ${p.name}`} onClick={() => setQty(p.slug, size, qty - 1)}>
              <Minus className="size-3.5" />
            </button>
            <span className="w-7 text-center text-sm" aria-live="polite">
              {qty}
            </span>
            <button type="button" className={step} aria-label={`Increase quantity of ${p.name}`} disabled={qty >= MAX_QTY} onClick={() => setQty(p.slug, size, qty + 1)}>
              <Plus className="size-3.5" />
            </button>
          </div>
          <div className="flex items-center gap-4 text-xs text-espresso/60">
            {qty > 1 && <span>{inr(p.price)} each</span>}
            <button type="button" onClick={() => remove(p.slug, size)} className="underline-offset-4 hover:text-crimson hover:underline">
              Remove
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}
