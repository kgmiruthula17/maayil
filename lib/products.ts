export const SIZES = ["XS", "S", "M", "L", "XL", "XXL"] as const;
export type Size = (typeof SIZES)[number];

export const CATEGORIES = [
  "Straight Cut",
  "A-Line",
  "Anarkali",
  "Printed",
  "Embroidered",
  "Everyday",
] as const;
export type Category = (typeof CATEGORIES)[number];

/** Drives the placeholder artwork until real photography is supplied. */
export interface Art {
  silhouette: "straight" | "aline" | "anarkali";
  pattern: "plain" | "print" | "embroidery" | "border";
  base: string;
  accent: string;
  bg: string;
}

export interface Product {
  slug: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: Category;
  fabric: string;
  colour: string;
  care: string;
  sizes: readonly Size[];
  inStock: boolean;
  isNew?: boolean;
  isBestseller?: boolean;
  art: Art;
  /** Real photos (paths under /public). When set, they replace the artwork. */
  photos?: string[];
}

const CARE_COTTON = "Machine wash cold on a gentle cycle. Dry in shade. Iron on medium heat.";
const CARE_DELICATE = "Dry clean recommended. If washing, hand wash cold with mild detergent. Iron on low.";
const SAMPLE_PHOTO = "/images/kurti-sample.jpg";

// SAMPLE DATA: names, prices and stock are for demonstration, not verified Maayil inventory.
export const products: Product[] = [
  {
    slug: "kanchi-zari-straight-kurti",
    name: "Kanchi Zari Straight Kurti",
    description:
      "A clean straight cut in deep crimson, finished with a champagne zari border at the neckline and hem.",
    price: 2499,
    originalPrice: 2999,
    category: "Straight Cut",
    fabric: "Cotton silk",
    colour: "Crimson",
    care: CARE_DELICATE,
    sizes: ["XS", "S", "M", "L", "XL"],
    inStock: true,
    isNew: true,
    isBestseller: true,
    art: { silhouette: "straight", pattern: "border", base: "#970018", accent: "#EBC9A8", bg: "#F1E2D3" },
    photos: [SAMPLE_PHOTO],
  },
  {
    slug: "madurai-a-line-kurti",
    name: "Madurai A-Line Kurti",
    description: "A softly flared A-line in warm ivory with a fine crimson placket. Easy to wear from morning to evening.",
    price: 1799,
    originalPrice: 2199,
    category: "A-Line",
    fabric: "Soft cotton",
    colour: "Ivory",
    care: CARE_COTTON,
    sizes: ["S", "M", "L", "XL", "XXL"],
    inStock: true,
    art: { silhouette: "aline", pattern: "plain", base: "#F6EBDD", accent: "#970018", bg: "#DCC6AE" },
    photos: [SAMPLE_PHOTO],
  },
  {
    slug: "rani-anarkali-kurti",
    name: "Rani Anarkali Kurti",
    description: "A dramatic Anarkali flare in burgundy with delicate champagne embroidery along the yoke and hem.",
    price: 3299,
    originalPrice: 3999,
    category: "Anarkali",
    fabric: "Georgette",
    colour: "Burgundy",
    care: CARE_DELICATE,
    sizes: ["XS", "S", "M", "L"],
    inStock: true,
    isBestseller: true,
    art: { silhouette: "anarkali", pattern: "embroidery", base: "#4A101C", accent: "#EBC9A8", bg: "#F1E3D6" },
    photos: [SAMPLE_PHOTO],
  },
  {
    slug: "jaipur-block-print-kurti",
    name: "Jaipur Block Print Kurti",
    description: "An indigo A-line with a scattered block-print motif, light and breathable for everyday days.",
    price: 1599,
    originalPrice: 1999,
    category: "Printed",
    fabric: "Cotton",
    colour: "Indigo",
    care: CARE_COTTON,
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    inStock: true,
    isNew: true,
    art: { silhouette: "aline", pattern: "print", base: "#2F3A5F", accent: "#FAF5EF", bg: "#E5DED2" },
    photos: [SAMPLE_PHOTO],
  },
  {
    slug: "lucknowi-chikankari-kurti",
    name: "Lucknowi Chikankari Kurti",
    description: "A straight kurti in off-white with chikankari-inspired embroidery down the placket and along the hem.",
    price: 2799,
    category: "Embroidered",
    fabric: "Cotton",
    colour: "Off-white",
    care: CARE_DELICATE,
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
    isNew: true,
    isBestseller: true,
    art: { silhouette: "straight", pattern: "embroidery", base: "#FBF6EE", accent: "#B98E66", bg: "#D8C5B0" },
    photos: [SAMPLE_PHOTO],
  },
  {
    slug: "everyday-mul-cotton-kurti",
    name: "Everyday Mul Cotton Kurti",
    description: "A relaxed, featherlight straight kurti in sage. Made for long days and repeat wear.",
    price: 1199,
    originalPrice: 1499,
    category: "Everyday",
    fabric: "Mul cotton",
    colour: "Sage",
    care: CARE_COTTON,
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    inStock: true,
    isBestseller: true,
    art: { silhouette: "straight", pattern: "plain", base: "#8A9A7B", accent: "#FAF5EF", bg: "#E6E3D5" },
    photos: [SAMPLE_PHOTO],
  },
  {
    slug: "banarasi-border-straight-kurti",
    name: "Banarasi Border Straight Kurti",
    description: "A mustard straight cut edged with a rich burgundy border, a festive favourite with a quiet finish.",
    price: 2999,
    originalPrice: 3499,
    category: "Straight Cut",
    fabric: "Chanderi",
    colour: "Mustard",
    care: CARE_DELICATE,
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
    isNew: true,
    art: { silhouette: "straight", pattern: "border", base: "#C99A3B", accent: "#4A101C", bg: "#EFE0CC" },
    photos: [SAMPLE_PHOTO],
  },
  {
    slug: "gulmohar-floral-print-kurti",
    name: "Gulmohar Floral Print Kurti",
    description: "A terracotta A-line scattered with a soft floral print. Bright without being loud.",
    price: 1899,
    originalPrice: 2399,
    category: "Printed",
    fabric: "Rayon",
    colour: "Terracotta",
    care: CARE_COTTON,
    sizes: ["XS", "S", "M", "L"],
    inStock: true,
    isBestseller: true,
    art: { silhouette: "aline", pattern: "print", base: "#B5573C", accent: "#FAF5EF", bg: "#EBDCCB" },
    photos: [SAMPLE_PHOTO],
  },
];

export const slugify = (s: string) => s.toLowerCase().replace(/\s+/g, "-");
export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const newArrivals = () => products.filter((p) => p.isNew);
export const bestsellers = () => products.filter((p) => p.isBestseller);
export const imageCount = (p: Product) => p.photos?.length ?? 3;
export const discountPct = (p: Product) =>
  p.originalPrice ? Math.round((1 - p.price / p.originalPrice) * 100) : 0;

/** Only categories that actually have products, so the storefront never shows empty styles. */
export function categories() {
  return CATEGORIES.flatMap((name) => {
    const items = products.filter((p) => p.category === name);
    return items.length ? [{ name, slug: slugify(name), count: items.length, cover: items[0] }] : [];
  });
}
