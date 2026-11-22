import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WishlistState {
  slugs: string[];
  ready: boolean;
  toggle: (slug: string) => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set) => ({
      slugs: [],
      ready: false,
      toggle: (slug) =>
        set((s) => ({
          slugs: s.slugs.includes(slug) ? s.slugs.filter((x) => x !== slug) : [...s.slugs, slug],
        })),
    }),
    {
      name: "maayil-wishlist",
      partialize: (s) => ({ slugs: s.slugs }),
      skipHydration: true,
    },
  ),
);
