import Link from "next/link";
import { ProductImage } from "@/components/product/ProductImage";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { categories } from "@/lib/products";

export function CategoryShowcase() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <SectionHeading eyebrow="Shop by style" title="Find Your Signature Style" text="Six silhouettes, one idea: a kurti that feels like it was made for you." />
        <ul className="grid grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-3 md:gap-x-6 md:pb-10">
          {categories().map((c, i) => (
            <li key={c.slug} className="md:[&:nth-child(3n+2)]:translate-y-10">
              <Reveal delay={(i % 3) * 0.08}>
                <Link href={`/shop?category=${c.slug}`} className="group block">
                  <div className="relative aspect-[3/4] overflow-hidden bg-champagne/20 border border-champagne/40 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:border-gold/50 group-hover:shadow-[0_10px_30px_-6px_rgba(197,160,89,0.22)]">
                    <div className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105">
                      <ProductImage product={c.cover} sizes="(min-width:768px) 30vw, 50vw" />
                    </div>
                  </div>
                  <div className="mt-3.5 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                    <h3 className="font-serif text-2xl leading-tight text-burgundy transition-colors duration-300 group-hover:text-gold-dark">{c.name} Kurtis</h3>
                    <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-crimson transition-all duration-300 group-hover:text-gold-dark group-hover:translate-x-1">
                      Discover →
                    </span>
                  </div>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
