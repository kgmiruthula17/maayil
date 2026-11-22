"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { products, type Product } from "@/lib/products";
import { siteConfig } from "@/lib/site";
import { inr, EASE, cn } from "@/lib/utils";

interface SlideData {
  badge: string;
  tagline: string;
  titlePrefix: string;
  titleAccent: string;
  titleSuffix: string;
  description: string;
  primaryBtn: { label: string; href: string };
  secondaryBtn: { label: string; href: string };
  product: Product;
  highlightTag: string;
  bgImage: string;
}

const slides: SlideData[] = [
  {
    badge: "Atelier Collection 2026",
    tagline: siteConfig.tagline,
    titlePrefix: "Elegance",
    titleAccent: "in Every",
    titleSuffix: "Thread.",
    description:
      "Discover kurtis that celebrate your individuality, blending timeless Indian craftsmanship with effortless everyday style.",
    primaryBtn: { label: "Explore Collection", href: "/shop" },
    secondaryBtn: { label: "Discover Maayil", href: "/about" },
    product: products[0],
    highlightTag: "Heritage Zari Border",
    bgImage: "/images/hero-carousel.jpg",
  },
  {
    badge: "Festive Occasion Wear",
    tagline: "Regal silhouettes, effortless grace",
    titlePrefix: "Dramatic",
    titleAccent: "Royal Flare",
    titleSuffix: "Anarkalis.",
    description:
      "Flowing silhouettes in rich festive palettes, adorned with intricate champagne embroidery along the yoke and hem.",
    primaryBtn: { label: "Shop Anarkalis", href: "/shop?category=anarkali" },
    secondaryBtn: { label: "View Bestsellers", href: "/shop?filter=bestsellers" },
    product: products[2] ?? products[0],
    highlightTag: "Intricate Champagne Yoke",
    bgImage: "/images/hero-carousel.jpg",
  },
  {
    badge: "Artisanal Embroidery",
    tagline: "Understated luxury for daily wear",
    titlePrefix: "Timeless",
    titleAccent: "Chikankari",
    titleSuffix: "Craft.",
    description:
      "Straight cuts in featherlight cottons featuring artisanal needlework, tailored for long days and repeat wear in quiet luxury.",
    primaryBtn: { label: "Shop Embroidered", href: "/shop?category=embroidered" },
    secondaryBtn: { label: "Customise Yours", href: "/customise" },
    product: products[4] ?? products[0],
    highlightTag: "Pure Breathable Weave",
    bgImage: "/images/hero-carousel.jpg",
  },
];

export function Hero() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((c) => (c + 1) % slides.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((c) => (c - 1 + slides.length) % slides.length);
  }, []);

  const goTo = (i: number) => {
    if (i === current) return;
    setDirection(i > current ? 1 : -1);
    setCurrent(i);
  };

  // Autoplay with pause-on-hover
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(next, 6500);
    return () => clearInterval(interval);
  }, [isPaused, next]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  const onTouchStart = (e: React.TouchEvent) => setTouchStartX(e.touches[0].clientX);
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX;
    if (diff > 45) prev();
    else if (diff < -45) next();
    setTouchStartX(null);
  };

  const slide = slides[current];

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured Collection"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      className="relative w-full min-h-[85svh] lg:min-h-[90svh] flex items-center overflow-hidden bg-ivory text-espresso"
    >
      {/* 1. ANIMATED BACKGROUND IMAGE */}
      <div className="absolute inset-0 size-full overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <m.div
            key={current}
            custom={direction}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.85, ease: EASE }}
            className="absolute inset-0 size-full"
          >
            <Image
              src={slide.bgImage}
              alt={slide.badge}
              fill
              priority
              sizes="100vw"
              className="object-cover object-right sm:object-center"
            />
          </m.div>
        </AnimatePresence>

        {/* Luminous Warm Ivory Gradient Overlay for Text Readability without losing the silk fabric */}
        {/* On desktop: gradient from left (ivory wash) to transparent right where the red silk & gold zari live */}
        {/* On mobile: smooth gradient from bottom to top */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-ivory via-ivory/70 to-ivory/20 sm:from-ivory/90 sm:via-ivory/50 sm:to-transparent lg:bg-gradient-to-r lg:from-ivory/95 lg:via-ivory/70 lg:to-transparent"
        />

        {/* Subtle warm golden ambient sheen */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-champagne/20 via-transparent to-gold/10 mix-blend-multiply opacity-60"
        />

        {/* Fine gold baseline border */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"
        />
      </div>

      {/* 2. FOREGROUND CONTENT */}
      <Container className="relative z-10 flex min-h-[85svh] lg:min-h-[90svh] flex-col justify-between py-8 sm:py-12 lg:py-16">
        {/* TOP ROW: Badge + Craftsmanship Tag */}
        <div className="flex items-center justify-between gap-4">
          <AnimatePresence mode="wait">
            <m.div
              key={current}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="inline-flex items-center gap-2 rounded-full border border-gold/50 bg-white/80 px-4 py-1.5 text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-gold-dark shadow-xs backdrop-blur-md"
            >
              <span className="text-gold text-[9px] animate-pulse">✦</span>
              <span>{slide.badge}</span>
              <span className="text-gold text-[9px] animate-pulse">✦</span>
            </m.div>
          </AnimatePresence>

          <div className="hidden sm:inline-flex items-center gap-2 rounded-full border border-gold/40 bg-white/70 px-4 py-1 text-[11px] uppercase tracking-[0.2em] text-gold-dark shadow-xs backdrop-blur-md">
            <span className="size-1 rounded-full bg-gold" />
            <span>{slide.highlightTag}</span>
          </div>
        </div>

        {/* CENTER ROW: Headline, Subtitle, and CTAs */}
        <div className="my-auto max-w-2xl py-6 sm:py-10">
          <AnimatePresence mode="wait" custom={direction}>
            <m.div
              key={current}
              custom={direction}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <h1 className="font-serif text-[2.75rem] leading-[0.96] text-burgundy sm:text-6xl lg:text-7xl xl:text-[6.5rem]">
                <span className="block">{slide.titlePrefix}</span>
                <span className="block italic gold-text my-1 sm:my-2">{slide.titleAccent}</span>
                <span className="block">{slide.titleSuffix}</span>
              </h1>

              <p className="mt-4 sm:mt-6 max-w-lg text-sm sm:text-base leading-relaxed text-espresso/80">
                {slide.description}
              </p>

              <div className="mt-7 sm:mt-9 flex flex-wrap items-center gap-3.5 sm:gap-4">
                <ButtonLink href={slide.primaryBtn.href} variant="gold" className="px-6 py-3.5 sm:px-8 sm:py-4">
                  {slide.primaryBtn.label}
                </ButtonLink>
                <ButtonLink
                  href={slide.secondaryBtn.href}
                  variant="outline"
                  className="border-burgundy/80 bg-white/70 text-burgundy backdrop-blur-md hover:border-gold hover:bg-burgundy hover:text-gold-shimmer px-5 py-3.5 sm:px-7 sm:py-4"
                >
                  {slide.secondaryBtn.label}
                </ButtonLink>
              </div>
            </m.div>
          </AnimatePresence>
        </div>

        {/* BOTTOM ROW: Floating Product Pill + Carousel Navigation Controls */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between border-t border-gold/25 pt-4 sm:pt-6">
          {/* Floating Featured Product Pill */}
          <AnimatePresence mode="wait">
            <m.div
              key={current}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.35, delay: 0.1, ease: EASE }}
              className="w-fit"
            >
              <Link
                href={`/product/${slide.product.slug}`}
                className="group inline-flex items-center gap-3 rounded-xs border border-gold/45 bg-white/85 px-4 py-2.5 text-xs text-burgundy shadow-md backdrop-blur-md transition-all duration-300 hover:border-gold hover:bg-white hover:scale-[1.02]"
              >
                <div className="leading-tight">
                  <span className="block font-serif text-sm font-medium text-burgundy transition-colors group-hover:text-gold-dark">
                    {slide.product.name}
                  </span>
                  <span className="text-[11px] text-espresso/70">{inr(slide.product.price)}</span>
                </div>
                <span className="text-gold-dark font-medium tracking-wider uppercase text-[10px] ml-2 border-l border-gold/30 pl-3 transition-colors group-hover:text-crimson">
                  Shop now →
                </span>
              </Link>
            </m.div>
          </AnimatePresence>

          {/* Carousel Arrows, Indicators & Counter */}
          <div className="flex items-center gap-4 sm:gap-6 self-center sm:self-auto">
            {/* Prev / Next Arrows */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={prev}
                aria-label="Previous slide"
                className="grid size-10 place-items-center rounded-full border border-gold/45 bg-white/80 text-burgundy shadow-sm backdrop-blur-md transition-all duration-300 hover:border-gold hover:bg-burgundy hover:text-gold-shimmer hover:scale-105 active:scale-95"
              >
                <ChevronLeft className="size-4.5" />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next slide"
                className="grid size-10 place-items-center rounded-full border border-gold/45 bg-white/80 text-burgundy shadow-sm backdrop-blur-md transition-all duration-300 hover:border-gold hover:bg-burgundy hover:text-gold-shimmer hover:scale-105 active:scale-95"
              >
                <ChevronRight className="size-4.5" />
              </button>
            </div>

            {/* Progress Bars */}
            <div className="flex items-center gap-2" role="tablist" aria-label="Hero slides">
              {slides.map((s, i) => (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-selected={current === i}
                  aria-label={`Slide ${i + 1}: ${s.badge}`}
                  onClick={() => goTo(i)}
                  className="group relative py-2"
                >
                  <span
                    className={cn(
                      "block h-1.5 rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                      current === i
                        ? "w-8 sm:w-12 bg-gradient-to-r from-gold via-gold-light to-gold shadow-[0_0_12px_rgba(197,160,89,0.5)]"
                        : "w-2.5 sm:w-3 bg-burgundy/20 group-hover:bg-burgundy/40",
                    )}
                  />
                </button>
              ))}
            </div>

            {/* Slide Counter */}
            <span className="font-serif text-sm tracking-wider text-espresso/70">
              <strong className="text-burgundy font-semibold">0{current + 1}</strong>
              <span className="mx-1.5 text-gold">/</span>
              0{slides.length}
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}
