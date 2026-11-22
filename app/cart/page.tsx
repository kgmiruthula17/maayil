import type { Metadata } from "next";
import { CartView } from "@/components/cart/CartView";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = { title: "Your Bag", robots: { index: false } };

export default function CartPage() {
  return (
    <Container className="pb-24 pt-10 md:pt-16">
      <h1 className="mb-10 font-serif text-5xl text-burgundy md:text-6xl">Your Bag</h1>
      <CartView />
    </Container>
  );
}
