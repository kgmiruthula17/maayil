import Link from "next/link";
import type { Product } from "@/lib/products";

const item = "group border-b border-gold/30 py-4.5 transition-colors";
const summary =
  "flex cursor-pointer list-none items-center justify-between text-xs font-medium uppercase tracking-[0.2em] transition-colors hover:text-gold-dark [&::-webkit-details-marker]:hidden";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <details className={item}>
      <summary className={summary}>
        {title}
        <span aria-hidden className="text-xl leading-none text-gold-dark transition-transform duration-300 group-open:rotate-45">+</span>
      </summary>
      <div className="mt-3.5 space-y-2 text-sm leading-relaxed text-espresso/75">{children}</div>
    </details>
  );
}

// Native <details>: accessible accordions with zero JavaScript.
export function ProductDetails({ product: p }: { product: Product }) {
  return (
    <div className="mt-8 border-t border-gold/30">
      <Section title="Product details">
        <p>{p.description}</p>
        <ul className="list-disc pl-5">
          <li>Style: {p.category} kurti</li>
          <li>Colour: {p.colour}</li>
        </ul>
      </Section>
      <Section title="Fabric & care">
        <p>Fabric: {p.fabric}.</p>
        <p>{p.care}</p>
      </Section>
      <Section title="Shipping & returns">
        <p>Free standard shipping on orders of ₹1,999 and above. Estimated delivery is 3–7 business days.</p>
        <p>
          Unworn items can be returned within 7 days. See our{" "}
          <Link href="/policies/return-policy" className="text-burgundy underline underline-offset-4">
            return policy
          </Link>
          .
        </p>
      </Section>
    </div>
  );
}
