import type { Metadata } from "next";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Customisation Enquiry",
  description: "Share your size, measurements and preferences and Maayil will confirm what is possible.",
};

export default function CustomisePage() {
  return (
    <Container className="grid gap-12 pb-24 pt-10 md:pt-16 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
      <div className="lg:sticky lg:top-28 lg:self-start">
        <p className="eyebrow">Personalised for you</p>
        <h1 className="mt-4 font-serif text-5xl leading-[1.05] text-burgundy md:text-6xl">
          Made to Feel <em className="text-crimson">Like Yours.</em>
        </h1>
        <p className="mt-6 max-w-md leading-relaxed text-espresso/75">
          Your style, your preferences. Tell us what you have in mind and our team will get back to you to confirm what is possible for the style you love.
        </p>
        <p className="mt-4 max-w-md text-sm text-espresso/60">
          Availability and pricing for customised pieces are confirmed individually.
        </p>
      </div>
      <EnquiryForm />
    </Container>
  );
}
