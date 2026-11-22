import Link from "next/link";
import { discountPct, type Product } from "@/lib/products";
import { inr } from "@/lib/utils";
import { ProductImage } from "./ProductImage";
import { QuickAdd } from "./QuickAdd";
import { WishlistButton } from "./WishlistButton";

const SIZES_ATTR = "(min-width:1024px) 25vw, (min-width:768px) 33vw, 50vw";

// Server component: only the wishlist heart and quick-add ship JavaScript.
export function ProductCard({ product: p, priority }: { product: Product; priority?: boolean }) {
  const off = discountPct(p);

  return (
    <article className="group">
      <div className="relative aspect-[4/5] overflow-hidden bg-champagne/20 border border-transparent transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:border-gold/45 group-hover:shadow-[0_12px_32px_-8px_rgba(197,160,89,0.22)]">
        <Link href={`/product/${p.slug}`} tabIndex={-1} aria-hidden className="absolute inset-0 block">
          <div className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105">
            <ProductImage product={p} sizes={SIZES_ATTR} priority={priority} />
            <div className="absolute inset-0 opacity-0 transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100">
              <ProductImage product={p} index={1} sizes={SIZES_ATTR} />
            </div>
          </div>
        </Link>

        {p.isNew && (
          <span className="pointer-events-none absolute left-3 top-3 border border-gold/50 bg-ivory/95 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.22em] text-burgundy shadow-xs backdrop-blur-xs">
            New
          </span>
        )}
        <WishlistButton slug={p.slug} className="absolute right-3 top-3" />
        {p.inStock ? (
          <QuickAdd product={p} />
        ) : (
          <span className="absolute inset-x-0 bottom-0 border-t border-espresso/20 bg-ivory/95 p-3 text-center text-[10px] uppercase tracking-[0.2em] text-espresso/60">
            Sold out
          </span>
        )}
      </div>

      <div className="mt-3.5 space-y-1.5">
        <h3 className="font-serif text-xl leading-snug text-burgundy transition-colors duration-300 group-hover:text-gold-dark">
          <Link href={`/product/${p.slug}`}>
            {p.name}
          </Link>
        </h3>
        <p className="flex flex-wrap items-center gap-x-2.5 text-sm">
          <span className="font-semibold text-espresso">{inr(p.price)}</span>
          {p.originalPrice && (
            <>
              <s className="text-espresso/45">{inr(p.originalPrice)}</s>
              <span className="rounded-xs border border-gold/30 bg-gold/15 px-1.5 py-0.5 text-[11px] font-semibold text-gold-dark">
                {off}% off
              </span>
            </>
          )}
        </p>
        <p className="text-xs tracking-wide text-espresso/60">{p.sizes.join(" · ")}</p>
      </div>
    </article>
  );
}
