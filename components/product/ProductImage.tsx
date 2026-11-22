import Image from "next/image";
import type { Product } from "@/lib/products";
import { cn } from "@/lib/utils";
import { KurtiArt } from "./KurtiArt";

/**
 * Renders real photography (next/image: AVIF/WebP, srcset, lazy by default) when
 * `product.photos` is set; otherwise the built-in artwork. Parent must be `relative` with an aspect ratio.
 */
export function ProductImage({
  product,
  index = 0,
  sizes,
  priority,
  className,
}: {
  product: Product;
  index?: number;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  const src = product.photos?.[index] ?? product.photos?.[0];
  const alt = `${product.name} in ${product.colour}${index ? `, view ${index + 1}` : ""}`;

  return src ? (
    <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={cn("object-cover", className)} />
  ) : (
    <KurtiArt art={product.art} view={index} label={alt} className={className} />
  );
}
