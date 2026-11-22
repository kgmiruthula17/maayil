import type { MetadataRoute } from "next";
import { policies } from "@/lib/content";
import { products } from "@/lib/products";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/shop",
    "/about",
    "/customise",
    ...products.map((p) => `/product/${p.slug}`),
    ...Object.keys(policies).map((s) => `/policies/${s}`),
  ];
  return paths.map((path) => ({ url: `${siteConfig.url}${path}` }));
}
