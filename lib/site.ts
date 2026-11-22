export const siteConfig = {
  name: "MAAYIL",
  tagline: "Tradition, Tailored to You.",
  description:
    "Modern Indian ethnic fashion, specialising in women's kurtis. Thoughtful designs, graceful silhouettes and personalised options from Maayil.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  instagram: "https://www.instagram.com/maayil_clothing/",
  instagramHandle: "@maayil_clothing",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP ?? "",
  /** Flip to false once real products, prices and photography are in place. */
  sampleData: true as boolean,
  freeShippingOver: 1999,
  shippingFee: 99,
  nav: [
    { label: "Home", href: "/" },
    { label: "Shop All Kurtis", href: "/shop" },
    { label: "New Arrivals", href: "/shop?filter=new" },
    { label: "Bestsellers", href: "/shop?filter=bestsellers" },
    { label: "Our Story", href: "/about" },
  ],
} as const;
