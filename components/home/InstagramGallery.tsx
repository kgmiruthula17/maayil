import { ProductImage } from "@/components/product/ProductImage";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { InstagramIcon } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { products } from "@/lib/products";
import { siteConfig } from "@/lib/site";

// [product index, view]. Sample imagery until permissioned content is supplied.
const tiles = [[0, 0], [3, 1], [2, 0], [4, 2], [5, 0], [7, 1]] as const;

export function InstagramGallery() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <SectionHeading eyebrow={siteConfig.instagramHandle} title="See Maayil Through Your Eyes" />
        <ul className="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-3 lg:grid-cols-6">
          {tiles.map(([pi, view], i) => (
            <li key={i}>
              <Reveal delay={i * 0.05}>
                <a
                  href={siteConfig.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View Maayil on Instagram"
                  className="group relative block aspect-square overflow-hidden bg-champagne/20"
                >
                  <div className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105">
                    <ProductImage product={products[pi]} index={view} sizes="(min-width:1024px) 16vw, 33vw" />
                  </div>
                  <span className="absolute inset-0 grid place-items-center bg-gradient-to-t from-burgundy/85 via-burgundy/50 to-transparent text-gold-light opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                    <InstagramIcon className="size-8 transition-transform duration-300 group-hover:scale-110" />
                  </span>
                </a>
              </Reveal>
            </li>
          ))}
        </ul>
        <div className="mt-10 text-center">
          <ButtonLink href={siteConfig.instagram} target="_blank" rel="noopener noreferrer" variant="outline">
            <InstagramIcon className="size-4" /> Follow {siteConfig.instagramHandle}
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
