"use client";

import { AnimatePresence, m } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { MAX_QTY } from "@/lib/cart";
import type { Product, Size } from "@/lib/products";
import { inr } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import { SizeSelector } from "./SizeSelector";
import { WishlistButton } from "./WishlistButton";

function AddLabel({ added }: { added: boolean }) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      <m.span
        key={added ? "added" : "add"}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.2 }}
        className="inline-flex items-center gap-2"
      >
        {added && (
          <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <m.path d="M5 12.5l4.5 4.5L19 7.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.35, delay: 0.1 }} />
          </svg>
        )}
        {added ? "Added to Bag" : "Add to Bag"}
      </m.span>
    </AnimatePresence>
  );
}

export function ProductActions({ product: p, sizeGuide }: { product: Product; sizeGuide: ReactNode }) {
  const router = useRouter();
  const add = useCartStore((s) => s.add);
  const openCart = useCartStore((s) => s.setOpen);

  const [size, setSize] = useState<Size | null>(null);
  const [qty, setQty] = useState(1);
  const [missingSize, setMissingSize] = useState(false);
  const [added, setAdded] = useState(false);
  const [pin, setPin] = useState("");
  const [pinResult, setPinResult] = useState<{ ok: boolean; text: string } | null>(null);

  const sizeRef = useRef<HTMLDivElement>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  const later = (fn: () => void, ms: number) => timers.current.push(setTimeout(fn, ms));

  const requireSize = () => {
    if (size) return size;
    setMissingSize(true);
    sizeRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    return null;
  };

  const addToBag = () => {
    const s = requireSize();
    if (!s) return;
    add(p.slug, s, qty);
    setAdded(true);
    later(() => openCart(true), 650); // let the confirmation play before the drawer slides in
    later(() => setAdded(false), 1800);
  };

  const buyNow = () => {
    const s = requireSize();
    if (!s) return;
    add(p.slug, s, qty);
    router.push("/checkout");
  };

  const checkPin = () =>
    setPinResult(
      /^[1-9]\d{5}$/.test(pin)
        ? { ok: true, text: "Delivery in 3–7 business days (estimate)." }
        : { ok: false, text: "Enter a valid 6-digit pincode." },
    );

  if (!p.inStock) {
    return <Button disabled className="mt-8 w-full">Sold Out</Button>;
  }

  const step = "grid size-11 place-items-center text-burgundy transition-colors hover:bg-champagne/30 disabled:opacity-30";

  return (
    <div className="mt-8 space-y-7">
      <div ref={sizeRef}>
        <div className="mb-3 flex items-baseline justify-between">
          <p className="text-xs uppercase tracking-[0.18em]">Size{size && `: ${size}`}</p>
          {missingSize && !size && (
            <p role="alert" className="text-xs text-crimson">Please select a size</p>
          )}
        </div>
        <SizeSelector
          sizes={p.sizes}
          value={size}
          onChange={(s) => {
            setSize(s);
            setMissingSize(false);
          }}
        />
        {sizeGuide}
      </div>

      <div>
        <p className="mb-3 text-xs uppercase tracking-[0.18em]">Quantity</p>
        <div className="inline-flex items-center border border-espresso/25">
          <button type="button" aria-label="Decrease quantity" className={step} disabled={qty <= 1} onClick={() => setQty((q) => q - 1)}>
            <Minus className="size-4" />
          </button>
          <span className="w-10 text-center" aria-live="polite">{qty}</span>
          <button type="button" aria-label="Increase quantity" className={step} disabled={qty >= MAX_QTY} onClick={() => setQty((q) => q + 1)}>
            <Plus className="size-4" />
          </button>
        </div>
      </div>

      <div className="grid gap-3">
        <div className="flex gap-3">
          <Button onClick={addToBag} className="flex-1">
            <AddLabel added={added} />
          </Button>
          <WishlistButton slug={p.slug} className="size-[3.1rem] border border-burgundy/30 bg-transparent" />
        </div>
        <Button variant="outline" onClick={buyNow}>Buy Now</Button>
      </div>

      <div>
        <label htmlFor="pincode" className="mb-2 block text-xs uppercase tracking-[0.18em]">Check delivery</label>
        <div className="flex gap-2">
          <input
            id="pincode"
            inputMode="numeric"
            maxLength={6}
            autoComplete="postal-code"
            placeholder="6-digit pincode"
            value={pin}
            onChange={(e) => {
              setPin(e.target.value.replace(/\D/g, ""));
              setPinResult(null);
            }}
            onKeyDown={(e) => e.key === "Enter" && checkPin()}
            className="min-w-0 flex-1 border border-espresso/25 bg-white px-4 py-3 text-sm outline-none focus:border-burgundy"
          />
          <button type="button" onClick={checkPin} className="border border-burgundy px-5 text-xs uppercase tracking-[0.16em] text-burgundy hover:bg-burgundy hover:text-ivory">
            Check
          </button>
        </div>
        <p role="status" className={`mt-2 min-h-5 text-xs ${pinResult?.ok ? "text-espresso/70" : "text-crimson"}`}>
          {pinResult?.text}
        </p>
      </div>

      {/* Mobile sticky bar */}
      <div className="fixed inset-x-0 bottom-0 z-30 flex items-center gap-3 border-t border-champagne/60 bg-ivory/95 px-5 py-3 backdrop-blur lg:hidden">
        <div className="min-w-0 leading-tight">
          <p className="truncate text-xs text-espresso/60">{p.name}</p>
          <p className="font-medium">{inr(p.price)}</p>
        </div>
        <Button onClick={addToBag} className="ml-auto w-44 shrink-0">
          <AddLabel added={added} />
        </Button>
      </div>
    </div>
  );
}
