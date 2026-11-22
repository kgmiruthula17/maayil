import type { Metadata } from "next";
import { ProductImage } from "@/components/product/ProductImage";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { products } from "@/lib/products";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our Story",
  description: "Maayil is modern Indian ethnic fashion, specialising in women's kurtis. Tradition, Tailored to You.",
};

const values = [
  { title: "Thoughtful design", text: "Every silhouette is considered, from the neckline to the hem." },
  { title: "Graceful, everyday wear", text: "Kurtis made to move with you, from the morning commute to the evening out." },
  { title: "Made to feel like yours", text: "Personalised options, shaped around how you love to wear your kurtis." },
];

export default function AboutPage() {
  return (
    <>
      <Container className="grid items-center gap-12 py-12 md:py-20 lg:grid-cols-2 lg:gap-24">
        <div>
          <p className="eyebrow rise">{siteConfig.tagline}</p>
          <h1 className="rise mt-4 font-serif text-5xl leading-[1.05] text-burgundy md:text-7xl">
            More Than Just a Kurti. <em className="text-crimson">It&apos;s Your Story.</em>
          </h1>
          <p className="mt-6 max-w-lg leading-relaxed text-espresso/75">
            At Maayil, we believe every woman deserves to feel beautiful in what she wears. Our collections bring together thoughtful designs, graceful silhouettes and the charm of Indian ethnic fashion.
          </p>
        </div>
        <Reveal image className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden bg-champagne/20">
          <ProductImage product={products[2]} sizes="(min-width:1024px) 28rem, 90vw" priority />
        </Reveal>
      </Container>

      <section className="bg-white py-16 md:py-24">
        <Container>
          <ul className="grid gap-10 md:grid-cols-3">
            {values.map((v, i) => (
              <li key={v.title}>
                <Reveal delay={i * 0.08} className="border-t border-champagne pt-6">
                  <h2 className="font-serif text-3xl text-burgundy">{v.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-espresso/75">{v.text}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <Container className="py-20 text-center">
        <h2 className="font-serif text-4xl text-burgundy md:text-5xl">Find the one that feels like you.</h2>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/shop">Explore Collection</ButtonLink>
          <ButtonLink href="/customise" variant="outline">Explore Customisation</ButtonLink>
        </div>
      </Container>
    </>
  );
}
