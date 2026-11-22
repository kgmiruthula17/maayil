import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <Container className="py-28 text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-4 font-serif text-6xl text-burgundy">This page wandered off.</h1>
      <p className="mt-4 text-espresso/70">Let&apos;s get you back to something beautiful.</p>
      <ButtonLink href="/shop" className="mt-8">Explore Collection</ButtonLink>
    </Container>
  );
}
