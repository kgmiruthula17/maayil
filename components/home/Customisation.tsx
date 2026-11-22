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
        <div className="grid items-center gap-12 border border-gold/40 bg-white/90 p-8 shadow-[0_8px_30px_-5px_rgba(197,160,89,0.12)] backdrop-blur-xs md:p-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <Reveal>
            <p className="eyebrow flex items-center gap-2">
              <span className="text-gold text-[10px]">✦</span>
              <span>Personalised for you</span>
            </p>
            <h2 className="mt-4 font-serif text-5xl leading-[1.05] text-burgundy md:text-6xl">
              Made to Feel <em className="italic gold-text">Like Yours.</em>
            </h2>
            <p className="mt-6 max-w-md leading-relaxed text-espresso/75">
              Your style, your preferences. Discover personalised options designed around the way you love to wear your kurtis.
            </p>
            <ol className="mt-6 space-y-3 text-sm text-espresso/75">
              {steps.map((s, i) => (
                <li key={s} className="flex items-center gap-3">
                  <span className="grid size-6 shrink-0 place-items-center rounded-full border border-gold/50 bg-gold/15 font-serif text-xs italic text-gold-dark font-medium">
                    {i + 1}
                  </span>
                  <span>{s}</span>
                </li>
              ))}
            </ol>
            <ButtonLink href="/customise" variant="gold" className="mt-8">
              Explore Customisation
            </ButtonLink>
          </Reveal>

          <Reveal delay={0.1} className="grid grid-cols-2 gap-4">
            <div className="relative aspect-[4/5] overflow-hidden bg-champagne/20 border border-gold/30 shadow-md">
              <ProductImage product={a} index={1} sizes="(min-width:1024px) 22vw, 40vw" />
            </div>
            <div className="relative mt-10 aspect-[4/5] overflow-hidden bg-champagne/20 border border-gold/30 shadow-md">
              <ProductImage product={b} index={2} sizes="(min-width:1024px) 22vw, 40vw" />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
