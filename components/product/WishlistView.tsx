"use client";

import { ButtonLink } from "@/components/ui/Button";
import { ProductGridSkeleton } from "@/components/ui/LoadingSkeleton";
import { getProduct, type Product } from "@/lib/products";
import { useWishlistStore } from "@/store/wishlist-store";
import { ProductGrid } from "./ProductGrid";

export function WishlistView() {
  const ready = useWishlistStore((s) => s.ready);
  const slugs = useWishlistStore((s) => s.slugs);

  if (!ready) return <ProductGridSkeleton count={4} />;

  const saved = slugs.flatMap((s) => getProduct(s) ?? []) as Product[];
  if (!saved.length) {
    return (
      <div className="py-16 text-center">
        <p className="font-serif text-3xl text-burgundy">Nothing saved yet</p>
        <p className="mt-2 text-sm text-espresso/70">Tap the heart on any kurti to keep it here.</p>
        <ButtonLink href="/shop" className="mt-6">Explore Collection</ButtonLink>
      </div>
    );
  }
  return <ProductGrid products={saved} />;
}
