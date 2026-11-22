import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { policies } from "@/lib/content";
import { siteConfig } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export const generateStaticParams = () => Object.keys(policies).map((slug) => ({ slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const policy = policies[(await params).slug];
  return policy ? { title: policy.title, description: policy.intro } : {};
}

export default async function PolicyPage({ params }: Props) {
  const policy = policies[(await params).slug];
  if (!policy) notFound();

  return (
    <Container className="mx-auto max-w-2xl pb-24 pt-12 md:pt-20">
      <h1 className="font-serif text-5xl text-burgundy md:text-6xl">{policy.title}</h1>
      <p className="mt-4 text-lg text-espresso/75">{policy.intro}</p>
      <ul className="mt-8 space-y-4 border-t border-champagne/60 pt-8 leading-relaxed">
        {policy.points.map((point) => (
          <li key={point} className="flex gap-3">
            <span aria-hidden className="mt-2.5 h-px w-4 shrink-0 bg-crimson" />
            {point}
          </li>
        ))}
      </ul>
      {siteConfig.sampleData && (
        <p className="mt-10 text-xs text-espresso/50">Draft wording for the demo store. To be confirmed by Maayil before launch.</p>
      )}
    </Container>
  );
}
