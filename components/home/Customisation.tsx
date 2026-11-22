import { ProductImage } from "@/components/product/ProductImage";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { products } from "@/lib/products";

const steps = [
  "Tell us the style you love and your size.",
  "Share custom measurements and any special notes.",
  "We get back to you to confirm what is possible.",
];

export function Customisation() {
  const [a, b] = [products[2], products[4]];

  return (
    <section className="py-20 md:py-28">
      <Container>
        <div className="grid items-center gap-12 border border-champagne/70 bg-white p-8 md:p-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <Reveal>
            <p className="eyebrow">Personalised for you</p>
            <h2 className="mt-4 font-serif text-5xl leading-[1.05] text-burgundy md:text-6xl">
              Made to Feel <em className="text-crimson">Like Yours.</em>
            </h2>
            <p className="mt-6 max-w-md leading-relaxed text-espresso/75">
              Your style, your preferences. Discover personalised options designed around the way you love to wear your kurtis.
            </p>
            <ol className="mt-6 space-y-2 text-sm text-espresso/75">
              {steps.map((s, i) => (
                <li key={s} className="flex gap-3">
                  <span className="font-serif text-lg italic text-crimson">{i + 1}.</span>
                  {s}
                </li>
              ))}
            </ol>
            <ButtonLink href="/customise" className="mt-8">
              Explore Customisation
            </ButtonLink>
          </Reveal>

          <Reveal delay={0.1} className="grid grid-cols-2 gap-4">
            <div className="relative aspect-[4/5] overflow-hidden bg-champagne/20">
              <ProductImage product={a} index={1} sizes="(min-width:1024px) 22vw, 40vw" />
            </div>
            <div className="relative mt-10 aspect-[4/5] overflow-hidden bg-champagne/20">
              <ProductImage product={b} index={2} sizes="(min-width:1024px) 22vw, 40vw" />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
