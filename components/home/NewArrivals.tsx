import Link from "next/link";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { newArrivals } from "@/lib/products";

export function NewArrivals() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHeading eyebrow="New in" title="Freshly Arrived" text="New favourites, waiting to become yours." />
        <ProductGrid products={newArrivals().slice(0, 4)} />
        <div className="mt-12 text-center">
          <Link href="/shop?filter=new" className="text-xs uppercase tracking-[0.18em] text-burgundy underline underline-offset-8 hover:text-crimson">
            View all new arrivals
          </Link>
        </div>
      </Container>
    </section>
  );
}
