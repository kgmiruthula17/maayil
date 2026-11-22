import Link from "next/link";
import type { CSSProperties } from "react";
import { ProductImage } from "@/components/product/ProductImage";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Parallax } from "@/components/ui/Parallax";
import { products } from "@/lib/products";
import { siteConfig } from "@/lib/site";
import { inr } from "@/lib/utils";

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

// Entrance animation is pure CSS so the hero paints without waiting for JS.
export function Hero() {
  const p = products[0];

  return (
    <section className="overflow-hidden">
      <Container className="grid items-center gap-10 py-10 lg:min-h-[calc(100svh-7.25rem)] lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:py-8">
        <div>
          <div
            className="rise mb-4 inline-flex items-center gap-2 rounded-full border border-gold/45 bg-white/70 px-4 py-1.5 text-[11px] uppercase tracking-[0.22em] text-gold-dark shadow-xs backdrop-blur-xs"
            style={delay(30)}
          >
            <span className="text-gold text-[9px] animate-pulse">✦</span>
            <span>{siteConfig.tagline}</span>
            <span className="text-gold text-[9px] animate-pulse">✦</span>
          </div>
          <h1 className="mt-3 font-serif text-[3.4rem] leading-[0.95] text-burgundy sm:text-7xl xl:text-[7rem]">
            <span className="rise block" style={delay(90)}>Elegance</span>
            <span className="rise block italic gold-text" style={delay(170)}>in Every</span>
            <span className="rise block" style={delay(250)}>Thread.</span>
          </h1>
          <p className="rise mt-7 max-w-md text-base leading-relaxed text-espresso/75" style={delay(350)}>
            Discover kurtis that celebrate your individuality, blending timeless Indian craftsmanship with effortless everyday style.
          </p>
          <div className="rise mt-9 flex flex-wrap gap-3.5" style={delay(450)}>
            <ButtonLink href="/shop" variant="gold">Explore Collection</ButtonLink>
            <ButtonLink href="/about" variant="outline">Discover Maayil</ButtonLink>
          </div>
        </div>

        <div className="group relative mx-auto w-full max-w-[34rem] lg:ml-auto">
          <div aria-hidden className="absolute -inset-6 -z-10 rounded-full bg-gradient-to-tr from-gold/25 via-gold-light/10 to-transparent blur-3xl opacity-70 pointer-events-none" />
          <div aria-hidden className="absolute -bottom-4 -left-4 size-full border border-gold/40 transition-transform duration-700 ease-out group-hover:scale-[1.02]" />
          <div className="relative aspect-[4/5] overflow-hidden bg-champagne/30 shadow-[0_12px_40px_-10px_rgba(74,16,28,0.25)]">
            <Parallax className="absolute inset-0">
              <ProductImage product={p} sizes="(min-width:1024px) 34rem, 90vw" priority />
            </Parallax>
            <div aria-hidden className="curtain absolute inset-0 origin-top bg-ivory" />
            <Link
              href={`/product/${p.slug}`}
              className="absolute bottom-5 left-5 border border-gold/40 bg-ivory/95 px-5 py-3.5 text-xs leading-snug text-burgundy shadow-[0_8px_25px_-5px_rgba(74,16,28,0.25)] backdrop-blur-md transition-all duration-300 hover:border-gold hover:bg-white hover:scale-[1.02]"
            >
              <span className="block font-serif text-base">{p.name}</span>
              {inr(p.price)} · <span className="font-medium text-gold-dark underline underline-offset-2">Shop now →</span>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
