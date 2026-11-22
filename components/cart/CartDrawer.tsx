"use client";

import { X } from "lucide-react";
import { useCallback } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { Drawer } from "@/components/ui/Drawer";
import { useCartStore, useCartSummary } from "@/store/cart-store";
import { CartLines, CartTotals } from "./CartLines";

export function CartDrawer() {
  const open = useCartStore((s) => s.open);
  const setOpen = useCartStore((s) => s.setOpen);
  const { count } = useCartSummary();
  const close = useCallback(() => setOpen(false), [setOpen]);

  return (
    <Drawer open={open} onClose={close} label="Shopping bag">
      <header className="flex items-center justify-between border-b border-champagne/60 px-6 py-5">
        <h2 className="font-serif text-2xl text-burgundy">
          Your Bag{count > 0 && <span className="ml-2 text-base text-espresso/60">({count})</span>}
        </h2>
        <button type="button" onClick={close} aria-label="Close bag" className="grid size-9 place-items-center text-burgundy">
          <X className="size-5" />
        </button>
      </header>

      <div className="flex-1 overflow-y-auto px-6">
        <CartLines onNavigate={close} />
      </div>

      {count > 0 && (
        <footer className="border-t border-champagne/60 px-6 py-5">
          <CartTotals />
          <div className="mt-5 grid gap-2">
            <ButtonLink href="/checkout" onClick={close}>
              Proceed to Checkout
            </ButtonLink>
            <button type="button" onClick={close} className="py-2 text-xs uppercase tracking-[0.18em] text-burgundy underline-offset-4 hover:underline">
              Continue Shopping
            </button>
          </div>
        </footer>
      )}
    </Drawer>
  );
}
