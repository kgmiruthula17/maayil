import { Bestsellers } from "@/components/home/Bestsellers";
import { BrandStory } from "@/components/home/BrandStory";
import { CategoryShowcase } from "@/components/home/CategoryShowcase";
import { Customisation } from "@/components/home/Customisation";
import { Hero } from "@/components/home/Hero";
import { InstagramGallery } from "@/components/home/InstagramGallery";
import { NewArrivals } from "@/components/home/NewArrivals";
import { Testimonials } from "@/components/home/Testimonials";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategoryShowcase />
      <NewArrivals />
      <BrandStory />
      <Bestsellers />
      <Customisation />
      <Testimonials />
      <InstagramGallery />
    </>
  );
}
