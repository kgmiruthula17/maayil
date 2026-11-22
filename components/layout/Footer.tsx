import Link from "next/link";
import { Newsletter } from "@/components/forms/Newsletter";
import { Container } from "@/components/ui/Container";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { siteConfig } from "@/lib/site";
import { Logo } from "./Logo";

const columns = [
  {
    title: "Shop",
    links: [
      { label: "All Kurtis", href: "/shop" },
      { label: "New Arrivals", href: "/shop?filter=new" },
      { label: "Bestsellers", href: "/shop?filter=bestsellers" },
      { label: "Customisation", href: "/customise" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Customer Support", href: "/policies/customer-support" },
      { label: "Shipping Information", href: "/policies/shipping-information" },
      { label: "Return Policy", href: "/policies/return-policy" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/policies/privacy-policy" },
      { label: "Terms & Conditions", href: "/policies/terms-and-conditions" },
      { label: "Our Story", href: "/about" },
    ],
  },
];

const link = "text-ivory/75 transition-colors hover:text-champagne";

export function Footer() {
  return (
    <>
      <Newsletter />
      <footer className="bg-burgundy text-ivory">
        <Container className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo className="text-champagne" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-ivory/75">
              Modern Indian ethnic fashion, specialising in women&apos;s kurtis. {siteConfig.tagline}
            </p>
            <div className="mt-6 flex gap-4 text-champagne">
              <a href={siteConfig.instagram} target="_blank" rel="noopener noreferrer" aria-label="Maayil on Instagram" className="hover:text-ivory">
                <InstagramIcon className="size-6" />
              </a>
              {siteConfig.whatsapp && (
                <a href={`https://wa.me/${siteConfig.whatsapp}`} target="_blank" rel="noopener noreferrer" aria-label="Chat with Maayil on WhatsApp" className="hover:text-ivory">
                  <WhatsAppIcon className="size-6" />
                </a>
              )}
            </div>
          </div>

          {columns.map((c) => (
            <nav key={c.title} aria-label={c.title}>
              <h2 className="eyebrow mb-4 text-champagne!">{c.title}</h2>
              <ul className="space-y-2.5 text-sm">
                {c.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className={link}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </Container>

        <div className="border-t border-champagne/20">
          <Container className="flex flex-col gap-2 py-5 text-xs text-ivory/60 md:flex-row md:justify-between">
            <p>© {new Date().getFullYear()} MAAYIL. All rights reserved.</p>
            {siteConfig.sampleData && <p>Demo store: products, prices and imagery are sample content.</p>}
          </Container>
        </div>
      </footer>
    </>
  );
}
