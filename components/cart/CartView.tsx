"use client";

import { ButtonLink } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/LoadingSkeleton";
import { useCartStore, useCartSummary } from "@/store/cart-store";
import { CartLines, CartTotals } from "./CartLines";

export function CartView() {
  const ready = useCartStore((s) => s.ready);
  const { count } = useCartSummary();

  if (!ready) {
    return (
      <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr]" role="status" aria-label="Loading your bag">
        <Skeleton className="h-72" />
        <Skeleton className="h-72" />
      </div>
    );
  }

  if (count === 0) return <CartLines />;

  return (
    <div className="grid items-start gap-12 lg:grid-cols-[1.6fr_1fr]">
      <CartLines />
      <aside className="border border-champagne/60 bg-white p-6 lg:sticky lg:top-28">
        <h2 className="mb-5 font-serif text-2xl text-burgundy">Order summary</h2>
        <CartTotals />
        <ButtonLink href="/checkout" className="mt-6 w-full">
          Proceed to Checkout
        </ButtonLink>
        <ButtonLink href="/shop" variant="outline" className="mt-3 w-full">
          Continue Shopping
        </ButtonLink>
      </aside>
    </div>
  );
}
