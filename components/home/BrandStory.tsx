import { ProductImage } from "@/components/product/ProductImage";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { products } from "@/lib/products";

export function BrandStory() {
  const [, , anarkali, , chikan] = products;

  return (
    <section className="bg-white py-20 md:py-28">
      <Container className="grid items-center gap-14 lg:grid-cols-2 lg:gap-24">
        <Reveal image className="relative pb-8 pr-8 md:pr-12">
          <div className="relative aspect-[4/5] overflow-hidden bg-champagne/20">
            <ProductImage product={anarkali} index={1} sizes="(min-width:1024px) 40vw, 80vw" />
          </div>
          <div className="absolute bottom-0 right-0 aspect-[4/5] w-1/3 overflow-hidden border-4 border-white bg-champagne/20">
            <ProductImage product={chikan} index={2} sizes="20vw" />
          </div>
        </Reveal>

        <Reveal>
          <p className="eyebrow">Our story</p>
          <h2 className="mt-4 font-serif text-5xl leading-[1.05] text-burgundy md:text-6xl">
            More Than Just a Kurti. <em className="text-crimson">It&apos;s Your Story.</em>
          </h2>
          <p className="mt-6 max-w-lg leading-relaxed text-espresso/75">
            At Maayil, we believe every woman deserves to feel beautiful in what she wears. Our collections bring together thoughtful designs, graceful silhouettes and the charm of Indian ethnic fashion.
          </p>
          <ButtonLink href="/about" variant="outline" className="mt-8">
            Our Story
          </ButtonLink>
        </Reveal>
      </Container>
    </section>
  );
}
