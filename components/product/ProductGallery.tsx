"use client";

import { useRef, useState, type MouseEvent } from "react";
import { imageCount, type Product } from "@/lib/products";
import { cn } from "@/lib/utils";
import { ProductImage } from "./ProductImage";

const SIZES_ATTR = "(min-width:1024px) 50vw, 100vw";

/**
 * One native scroll-snap rail: swipe on touch, thumbnails/dots scroll to a slide,
 * hover-zoom on desktop. No gallery library needed.
 */
export function ProductGallery({ product }: { product: Product }) {
  const n = imageCount(product);
  const rail = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const onScroll = () => {
    const el = rail.current;
    if (el) setActive(Math.round(el.scrollLeft / el.clientWidth));
  };
  const go = (i: number) => {
    const el = rail.current;
    el?.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
  };
  const zoomOrigin = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--ox", `${((e.clientX - r.left) / r.width) * 100}%`);
    e.currentTarget.style.setProperty("--oy", `${((e.clientY - r.top) / r.height) * 100}%`);
  };

  return (
    <div className={cn("grid gap-3", n > 1 && "lg:grid-cols-[84px_1fr]")}>
      {n > 1 && (
        <div className="order-2 hidden gap-2 lg:order-1 lg:flex lg:flex-col" role="group" aria-label="Product images">
          {Array.from({ length: n }, (_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => go(i)}
              aria-label={`Show image ${i + 1} of ${n}`}
              aria-current={active === i}
              className={cn(
                "relative aspect-[4/5] w-full overflow-hidden bg-champagne/20 ring-offset-2 transition-all duration-300",
                active === i ? "ring-2 ring-gold shadow-xs" : "opacity-70 hover:opacity-100",
              )}
            >
              <ProductImage product={product} index={i} sizes="84px" />
            </button>
          ))}
        </div>
      )}

      <div className="relative order-1 lg:order-2">
        <div
          ref={rail}
          onScroll={onScroll}
          className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto"
        >
          {Array.from({ length: n }, (_, i) => (
            <div
              key={i}
              onMouseMove={zoomOrigin}
              className="group/zoom relative aspect-[4/5] w-full shrink-0 snap-center overflow-hidden bg-champagne/20 lg:cursor-zoom-in"
            >
              <div
                style={{ transformOrigin: "var(--ox, 50%) var(--oy, 50%)" }}
                className="absolute inset-0 transition-transform duration-300 ease-out lg:group-hover/zoom:scale-[1.8]"
              >
                <ProductImage product={product} index={i} sizes={SIZES_ATTR} priority={i === 0} />
              </div>
            </div>
          ))}
        </div>

        {n > 1 && (
          <div className="mt-3 flex justify-center gap-2 lg:hidden">
            {Array.from({ length: n }, (_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => go(i)}
                aria-label={`Show image ${i + 1} of ${n}`}
                aria-current={active === i}
                className={cn("h-1.5 rounded-full transition-all duration-300", active === i ? "w-6 bg-gold" : "w-1.5 bg-espresso/25")}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
