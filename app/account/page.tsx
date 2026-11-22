import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = { title: "Account", robots: { index: false } };

export default function AccountPage() {
  return (
    <Container className="mx-auto max-w-xl py-20 text-center md:py-28">
      <h1 className="font-serif text-5xl text-burgundy">Your Account</h1>
      <p className="mt-5 leading-relaxed text-espresso/75">
        Sign-in and order tracking arrive with the live store. Until then, we are happy to help with any order on Instagram{siteConfig.whatsapp && " or WhatsApp"}.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <ButtonLink href="/shop">Continue Shopping</ButtonLink>
        <ButtonLink href={siteConfig.instagram} target="_blank" rel="noopener noreferrer" variant="outline">
          {siteConfig.instagramHandle}
        </ButtonLink>
      </div>
    </Container>
  );
}
