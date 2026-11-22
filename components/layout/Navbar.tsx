"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Menu, Search, ShoppingBag, User } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Drawer } from "@/components/ui/Drawer";
import { categories } from "@/lib/products";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { SearchPanel } from "./SearchPanel";

const iconBtn =
  "relative grid size-10 place-items-center text-burgundy transition-all duration-300 hover:text-gold-dark hover:scale-105";

function Badge({ n }: { n: number }) {
  return n > 0 ? (
    <span className="absolute right-0 top-0.5 grid h-4 min-w-4 place-items-center rounded-full border border-gold-light/60 bg-gradient-to-br from-crimson to-burgundy px-1 text-[10px] font-medium text-gold-shimmer shadow-xs animate-in zoom-in-50 duration-200">
      {n}
    </span>
  ) : null;
}

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const closeMenu = useCallback(() => setMenu(false), []);
  const closeSearch = useCallback(() => setSearch(false), []);

  const bag = useCartStore((s) => s.lines.reduce((n, l) => n + l.qty, 0));
  const openCart = useCartStore((s) => s.setOpen);
  const saved = useWishlistStore((s) => s.slugs.length);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenu(false);
    setSearch(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b transition-all duration-500",
        scrolled
          ? "border-gold/30 bg-ivory/90 backdrop-blur-md shadow-[0_4px_25px_-5px_rgba(197,160,89,0.12)]"
          : "border-gold/10 bg-transparent",
      )}
    >
      <div className="mx-auto grid h-16 w-full max-w-[1440px] grid-cols-[1fr_auto_1fr] items-center px-3 md:h-20 md:px-10">
        <div className="flex items-center">
          <button type="button" aria-label="Open menu" onClick={() => setMenu(true)} className={cn(iconBtn, "lg:hidden")}>
            <Menu className="size-6" strokeWidth={1.5} />
          </button>
          <Logo className="hidden text-burgundy lg:block" />
        </div>

        <div className="flex items-center justify-center">
          <Logo className="text-burgundy lg:hidden" />
          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-9">
              {siteConfig.nav.map((l) => {
                const link = (
                  <Link
                    href={l.href}
                    aria-current={pathname === l.href ? "page" : undefined}
                    className="relative py-2 text-[13px] uppercase tracking-[0.18em] text-espresso transition-colors duration-300 after:absolute after:inset-x-0 after:bottom-0 after:h-[1.5px] after:origin-left after:scale-x-0 after:bg-gradient-to-r after:from-gold after:via-crimson after:to-gold after:transition-transform after:duration-300 hover:text-gold-dark hover:after:scale-x-100"
                  >
                    {l.label}
                  </Link>
                );
                if (l.href !== "/shop") return <li key={l.href}>{link}</li>;
                return (
                  <li key={l.href} className="group relative">
                    {link}
                    <ul className="invisible absolute left-1/2 top-full min-w-52 -translate-x-1/2 translate-y-2 border border-champagne/60 bg-ivory py-2 opacity-0 transition-[opacity,transform,visibility] duration-300 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                      {categories().map((c) => (
                        <li key={c.slug}>
                          <Link href={`/shop?category=${c.slug}`} className="block px-5 py-2 text-sm hover:bg-champagne/30 hover:text-crimson">
                            {c.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        <div className="flex items-center justify-end">
          <button type="button" aria-label="Search" onClick={() => setSearch(true)} className={iconBtn}>
            <Search className="size-[22px]" strokeWidth={1.5} />
          </button>
          <Link href="/account" aria-label="Account" className={cn(iconBtn, "hidden sm:grid")}>
            <User className="size-[22px]" strokeWidth={1.5} />
          </Link>
          <Link href="/wishlist" aria-label={`Wishlist, ${saved} saved`} className={iconBtn}>
            <Heart className="size-[22px]" strokeWidth={1.5} />
            <Badge n={saved} />
          </Link>
          <button type="button" aria-label={`Shopping bag, ${bag} items`} onClick={() => openCart(true)} className={iconBtn}>
            <ShoppingBag className="size-[22px]" strokeWidth={1.5} />
            <Badge n={bag} />
          </button>
        </div>
      </div>

      <MobileMenu open={menu} onClose={closeMenu} />
      <Drawer open={search} onClose={closeSearch} label="Search" side="top">
        <SearchPanel onClose={closeSearch} />
      </Drawer>
    </header>
  );
}
