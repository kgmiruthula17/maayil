"use client";

import Link from "next/link";
import { Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { ProductImage } from "@/components/product/ProductImage";
import { useDebounced } from "@/lib/hooks";
import { categories, products } from "@/lib/products";
import { inr } from "@/lib/utils";

export function SearchPanel({ onClose }: { onClose: () => void }) {
  const [q, setQ] = useState("");
  const term = useDebounced(q, 200).trim().toLowerCase();

  const results = useMemo(
    () =>
      term
        ? products
            .filter((p) => [p.name, p.category, p.fabric, p.colour].join(" ").toLowerCase().includes(term))
            .slice(0, 6)
        : [],
    [term],
  );

  return (
    <div className="mx-auto w-full max-w-2xl overflow-y-auto p-5 md:py-8">
      <div className="flex items-center gap-3 border-b border-burgundy/40 pb-3">
        <Search className="size-5 text-burgundy" aria-hidden />
        <label htmlFor="site-search" className="sr-only">
          Search kurtis
        </label>
        <input
          id="site-search"
          type="search"
          autoFocus
          autoComplete="off"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search kurtis, fabrics, colours"
          className="min-w-0 flex-1 bg-transparent font-serif text-2xl outline-none placeholder:text-espresso/40"
        />
        <button type="button" onClick={onClose} aria-label="Close search" className="text-burgundy">
          <X className="size-5" />
        </button>
      </div>

      <div className="mt-5 min-h-24" aria-live="polite">
        {!term && (
          <div className="flex flex-wrap gap-2">
            {categories().map((c) => (
              <Link
                key={c.slug}
                href={`/shop?category=${c.slug}`}
                onClick={onClose}
                className="border border-espresso/20 px-4 py-2 text-xs uppercase tracking-[0.14em] text-burgundy hover:border-burgundy"
              >
                {c.name}
              </Link>
            ))}
          </div>
        )}
        {term && !results.length && <p className="text-sm text-espresso/70">No kurtis found for “{q.trim()}”.</p>}
        <ul className="divide-y divide-champagne/50">
          {results.map((p) => (
            <li key={p.slug}>
              <Link href={`/product/${p.slug}`} onClick={onClose} className="flex items-center gap-4 py-3 hover:text-crimson">
                <span className="relative aspect-[4/5] w-12 shrink-0 overflow-hidden bg-champagne/20">
                  <ProductImage product={p} sizes="48px" />
                </span>
                <span className="flex-1 font-serif text-lg text-burgundy">{p.name}</span>
                <span className="text-sm">{inr(p.price)}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
