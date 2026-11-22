"use client";

import { Heart } from "lucide-react";
import { m } from "framer-motion";
import { cn } from "@/lib/utils";
import { useWishlistStore } from "@/store/wishlist-store";

export function WishlistButton({ slug, className }: { slug: string; className?: string }) {
  const on = useWishlistStore((s) => s.slugs.includes(slug));
  const toggle = useWishlistStore((s) => s.toggle);

  return (
    <button
      type="button"
      aria-pressed={on}
      aria-label={on ? "Remove from wishlist" : "Add to wishlist"}
      onClick={() => toggle(slug)}
      className={cn(
        "grid size-9 place-items-center rounded-full border border-gold/35 bg-white/90 text-burgundy shadow-xs backdrop-blur-xs transition-all duration-300 hover:border-gold hover:bg-white hover:scale-105 active:scale-95",
        on && "border-gold text-crimson",
        className,
      )}
    >
      <m.span
        key={String(on)}
        initial={on ? { scale: 0.5 } : false}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 500, damping: 14 }}
        className="grid place-items-center"
      >
        <Heart className="size-[18px]" strokeWidth={1.5} fill={on ? "currentColor" : "none"} />
      </m.span>
    </button>
  );
}
