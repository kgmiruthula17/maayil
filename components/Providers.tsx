"use client";

import { LazyMotion, MotionConfig } from "framer-motion";
import { useEffect, type ReactNode } from "react";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";

const loadFeatures = () => import("@/lib/motion-features").then((m) => m.default);

export function Providers({ children }: { children: ReactNode }) {
  // allSettled guarantees `ready` flips even if storage is blocked (private mode).
  useEffect(() => {
    Promise.allSettled([useCartStore.persist.rehydrate(), useWishlistStore.persist.rehydrate()]).then(() => {
      useCartStore.setState({ ready: true });
      useWishlistStore.setState({ ready: true });
    });
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={loadFeatures} strict>
        {children}
      </LazyMotion>
    </MotionConfig>
  );
}
