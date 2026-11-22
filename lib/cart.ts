import { getProduct, type Size } from "./products";
import { siteConfig } from "./site";

export interface CartLine {
  slug: string;
  size: Size;
  qty: number;
}

export const MAX_QTY = 10;

export function summarize(lines: CartLine[]) {
  const items = lines.flatMap((l) => {
    const product = getProduct(l.slug);
    return product ? [{ ...l, product }] : [];
  });
  const count = items.reduce((n, i) => n + i.qty, 0);
  const subtotal = items.reduce((n, i) => n + i.qty * i.product.price, 0);
  const shipping = subtotal === 0 || subtotal >= siteConfig.freeShippingOver ? 0 : siteConfig.shippingFee;
  return {
    items,
    count,
    subtotal,
    shipping,
    total: subtotal + shipping,
    toFree: Math.max(0, siteConfig.freeShippingOver - subtotal),
  };
}

export type CartEntry = ReturnType<typeof summarize>["items"][number];
