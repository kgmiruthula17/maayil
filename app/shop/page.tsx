import type { Metadata } from "next";
import Link from "next/link";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Container } from "@/components/ui/Container";
import { categories, products } from "@/lib/products";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Shop All Kurtis",
  description: "Browse Maayil kurtis by style: straight cut, A-line, Anarkali, printed, embroidered and everyday.",
};

type Query = { category?: string; filter?: string; sort?: string };

const href = (q: Query) => {
  const params = new URLSearchParams();
  for (const [k, v] of Object.entries(q)) if (v) params.set(k, v);
  const s = params.toString();
  return s ? `/shop?${s}` : "/shop";
};

const SORTS = [
  { value: undefined, label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
] as const;

function Chip({ to, active, children }: { to: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={to}
      aria-current={active ? "true" : undefined}
      className={cn(
        "border px-4 py-2 text-xs uppercase tracking-[0.16em] transition-all duration-300",
        active
          ? "border-gold bg-burgundy text-gold-shimmer shadow-xs"
          : "border-espresso/20 hover:border-gold hover:text-burgundy",
      )}
    >
      {children}
    </Link>
  );
}

export default async function ShopPage({ searchParams }: { searchParams: Promise<Query> }) {
  const { category, filter, sort } = await searchParams;
  const cats = categories();
  const cat = cats.find((c) => c.slug === category);

  let list = products.filter(
    (p) =>
      (!cat || p.category === cat.name) &&
      (filter !== "new" || p.isNew) &&
      (filter !== "bestsellers" || p.isBestseller),
  );
  if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
  if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);

  const title = cat ? `${cat.name} Kurtis` : filter === "new" ? "New Arrivals" : filter === "bestsellers" ? "Bestsellers" : "All Kurtis";
  const keep = { sort };

  return (
    <Container className="pb-20 pt-10 md:pt-16">
      <header className="mb-10 text-center">
        <p className="eyebrow mb-3">The collection</p>
        <h1 className="font-serif text-5xl text-burgundy md:text-6xl">{title}</h1>
        <p className="mt-3 text-sm text-espresso/60">
          {list.length} {list.length === 1 ? "style" : "styles"}
        </p>
      </header>

      <nav aria-label="Filter by style" className="mb-6 flex flex-wrap justify-center gap-2">
        <Chip to={href(keep)} active={!cat && !filter}>All</Chip>
        <Chip to={href({ ...keep, filter: "new" })} active={filter === "new" && !cat}>New</Chip>
        <Chip to={href({ ...keep, filter: "bestsellers" })} active={filter === "bestsellers" && !cat}>Bestsellers</Chip>
        {cats.map((c) => (
          <Chip key={c.slug} to={href({ ...keep, category: c.slug })} active={cat?.slug === c.slug}>
            {c.name}
          </Chip>
        ))}
      </nav>

      <nav aria-label="Sort" className="mb-10 flex flex-wrap justify-center gap-x-6 gap-y-1 text-xs text-espresso/70">
        {SORTS.map((s) => (
          <Link
            key={s.label}
            href={href({ category, filter, sort: s.value })}
            aria-current={sort === s.value ? "true" : undefined}
            className={cn("underline-offset-4 hover:text-crimson hover:underline", sort === s.value && "text-burgundy underline")}
          >
            {s.label}
          </Link>
        ))}
      </nav>

      {list.length ? (
        <ProductGrid products={list} priorityCount={4} />
      ) : (
        <p className="py-16 text-center text-espresso/70">
          Nothing here yet.{" "}
          <Link href="/shop" className="text-burgundy underline underline-offset-4">View all kurtis</Link>
        </p>
      )}
    </Container>
  );
}
