"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { inr } from "@/lib/utils";
import { useCartSummary } from "@/store/cart-store";
import { CartItem } from "./CartItem";

export function CartLines({ onNavigate }: { onNavigate?: () => void }) {
  const { items } = useCartSummary();

  if (!items.length) {
    const link = "underline-offset-4 hover:text-crimson hover:underline";
    return (
      <div className="flex flex-col items-center px-4 py-16 text-center">
        <span className="grid size-20 place-items-center rounded-full border border-champagne text-burgundy">
          <ShoppingBag className="size-8" strokeWidth={1.2} />
        </span>
        <h3 className="mt-6 font-serif text-3xl text-burgundy">Your bag is empty</h3>
        <p className="mt-2 max-w-xs text-sm text-espresso/70">Find something that feels like you.</p>
        <nav aria-label="Shopping links" className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs uppercase tracking-[0.18em] text-burgundy">
          <Link href="/shop" onClick={onNavigate} className={link}>Shop all</Link>
          <Link href="/shop?filter=new" onClick={onNavigate} className={link}>New arrivals</Link>
          <Link href="/customise" onClick={onNavigate} className={link}>Customise</Link>
        </nav>
      </div>
    );
  }

  return (
    <ul className="divide-y divide-champagne/50">
      {items.map((item) => (
        <CartItem key={`${item.slug}-${item.size}`} item={item} onNavigate={onNavigate} />
      ))}
    </ul>
  );
}

export function CartTotals() {
  const { subtotal, shipping, total, toFree, count } = useCartSummary();
  const row = "flex justify-between text-sm";

  return (
    <dl className="space-y-2">
      <div className={row}>
        <dt>Subtotal</dt>
        <dd>{inr(subtotal)}</dd>
      </div>
      <div className={row}>
        <dt>Estimated shipping</dt>
        <dd>{count === 0 ? "—" : shipping === 0 ? "Free" : inr(shipping)}</dd>
      </div>
      <div className="flex justify-between border-t border-champagne/60 pt-3 font-medium">
        <dt>Total</dt>
        <dd>{inr(total)}</dd>
      </div>
      {count > 0 && toFree > 0 && (
        <p className="pt-1 text-xs text-espresso/60">Add {inr(toFree)} more for free shipping.</p>
      )}
    </dl>
  );
}
