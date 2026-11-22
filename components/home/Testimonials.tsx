import { Star } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { reviews } from "@/lib/content";

export function Testimonials() {
  return (
    <section className="bg-white py-20 md:py-28">
      <Container>
        <SectionHeading eyebrow="Reviews" title="Words From Our Maayil Family" />
        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {reviews.map((r, i) => (
            <li key={r.name}>
              <Reveal
                delay={i * 0.07}
                className="flex h-full flex-col border border-champagne/60 border-t-2 border-t-gold bg-white p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_25px_-5px_rgba(197,160,89,0.2)]"
              >
                <div role="img" aria-label={`${r.rating} out of 5 stars`} className="flex gap-1 text-gold">
                  {Array.from({ length: 5 }, (_, s) => (
                    <Star
                      key={s}
                      className="size-4"
                      strokeWidth={1}
                      fill={s < r.rating ? "currentColor" : "none"}
                    />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 font-serif text-xl leading-snug text-burgundy">{r.text}</blockquote>
                <footer className="mt-5 text-xs">
                  <p className="font-medium uppercase tracking-[0.16em] text-burgundy">{r.name}</p>
                  <p className="mt-1 text-espresso/60">{r.product}</p>
                  <p className="mt-3 text-[10px] uppercase tracking-[0.2em] text-gold-dark/60">Verified Buyer</p>
                </footer>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
