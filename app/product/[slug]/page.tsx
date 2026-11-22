import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductActions } from "@/components/product/ProductActions";
import { ProductDetails } from "@/components/product/ProductDetails";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductGrid } from "@/components/product/ProductGrid";
import { SizeGuide } from "@/components/product/SizeGuide";
import { Container } from "@/components/ui/Container";
import { discountPct, getProduct, products, slugify } from "@/lib/products";
import { siteConfig } from "@/lib/site";
import { inr } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export const generateStaticParams = () => products.map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getProduct((await params).slug);
  if (!p) return {};
  return { title: p.name, description: p.description, openGraph: { title: p.name, description: p.description } };
}

export default async function ProductPage({ params }: Props) {
  const p = getProduct((await params).slug);
  if (!p) notFound();

  const off = discountPct(p);
  const related = products.filter((x) => x.slug !== p.slug).slice(0, 4);

  // Structured data is only emitted for real inventory, never for sample products.
  const jsonLd = siteConfig.sampleData
    ? null
    : {
        "@context": "https://schema.org",
        "@type": "Product",
        name: p.name,
        description: p.description,
        color: p.colour,
        material: p.fabric,
        offers: {
          "@type": "Offer",
          priceCurrency: "INR",
          price: p.price,
          availability: p.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
          url: `${siteConfig.url}/product/${p.slug}`,
        },
      };

  return (
    <Container className="pb-28 pt-6 lg:pb-20">
      {jsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />}

      <nav aria-label="Breadcrumb" className="mb-6 text-xs text-espresso/60">
        <Link href="/" className="hover:text-crimson">Home</Link> /{" "}
        <Link href="/shop" className="hover:text-crimson">Shop</Link> /{" "}
        <Link href={`/shop?category=${slugify(p.category)}`} className="hover:text-crimson">{p.category}</Link>
      </nav>

      <div className="grid items-start gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        <ProductGallery product={p} />

        <div className="lg:sticky lg:top-28">
          {p.isNew && <p className="eyebrow mb-3">New arrival</p>}
          <h1 className="font-serif text-4xl leading-tight text-burgundy md:text-5xl">{p.name}</h1>
          <p className="mt-4 flex flex-wrap items-baseline gap-x-3 text-lg">
            <span className="font-medium">{inr(p.price)}</span>
            {p.originalPrice && (
              <>
                <s className="text-espresso/50">{inr(p.originalPrice)}</s>
                <span className="text-sm text-crimson">{off}% off</span>
              </>
            )}
          </p>
          <p className="mt-1 text-xs text-espresso/60">Inclusive of all taxes</p>
          <p className="mt-5 max-w-lg leading-relaxed text-espresso/75">{p.description}</p>
          <p className="mt-4 text-sm">
            <span className="text-espresso/60">Colour:</span> {p.colour}
          </p>

          <ProductActions product={p} sizeGuide={<SizeGuide />} />
          <ProductDetails product={p} />
          {siteConfig.sampleData && (
            <p className="mt-6 text-xs text-espresso/50">Sample product: price, stock and imagery are for demonstration.</p>
          )}
        </div>
      </div>

      <section className="mt-24" aria-labelledby="related">
        <h2 id="related" className="mb-8 text-center font-serif text-4xl text-burgundy">You May Also Love</h2>
        <ProductGrid products={related} />
      </section>
    </Container>
  );
}
