import type { Metadata } from "next";
import { CheckoutForm } from "@/components/cart/CheckoutForm";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = { title: "Checkout", robots: { index: false } };

export default function CheckoutPage() {
  return (
    <Container className="pb-24 pt-10 md:pt-16">
      <h1 className="mb-10 font-serif text-5xl text-burgundy md:text-6xl">Checkout</h1>
      <CheckoutForm />
    </Container>
  );
}
