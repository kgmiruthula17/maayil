import type { Product } from "@/lib/products";
import { Reveal } from "@/components/ui/Reveal";
import { ProductCard } from "./ProductCard";

export function ProductGrid({ products, priorityCount = 0 }: { products: Product[]; priorityCount?: number }) {
  return (
    <ul className="grid grid-cols-2 gap-x-3 gap-y-9 md:grid-cols-3 md:gap-x-5 lg:grid-cols-4">
      {products.map((p, i) => (
        <li key={p.slug}>
          <Reveal delay={(i % 4) * 0.07}>
            <ProductCard product={p} priority={i < priorityCount} />
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
