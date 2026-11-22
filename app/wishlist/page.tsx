import type { Metadata } from "next";
import { WishlistView } from "@/components/product/WishlistView";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = { title: "Wishlist", robots: { index: false } };

export default function WishlistPage() {
  return (
    <Container className="pb-24 pt-10 md:pt-16">
      <h1 className="mb-10 font-serif text-5xl text-burgundy md:text-6xl">Your Wishlist</h1>
      <WishlistView />
    </Container>
  );
}
