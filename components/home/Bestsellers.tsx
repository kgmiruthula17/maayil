import { ProductCard } from "@/components/product/ProductCard";
import { Carousel } from "@/components/ui/Carousel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { bestsellers } from "@/lib/products";

export function Bestsellers() {
  return (
    <section className="overflow-hidden py-20 md:py-28">
      <Carousel
        label="Bestselling kurtis"
        heading={<SectionHeading align="left" flush eyebrow="Most wished for" title="Loved by You" text="The kurtis our customers reach for again and again." />}
      >
        {bestsellers().map((p) => (
          <div key={p.slug} className="w-[62%] shrink-0 snap-start sm:w-[38%] lg:w-[26%]">
            <ProductCard product={p} />
          </div>
        ))}
      </Carousel>
    </section>
  );
}
