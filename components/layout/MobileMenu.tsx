"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { Drawer } from "@/components/ui/Drawer";
import { InstagramIcon } from "@/components/ui/Icons";
import { categories } from "@/lib/products";
import { siteConfig } from "@/lib/site";
import { Logo } from "./Logo";

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Drawer open={open} onClose={onClose} label="Menu" side="left">
      <div className="flex items-center justify-between border-b border-champagne/60 px-6 py-5 text-burgundy">
        <Logo />
        <button type="button" onClick={onClose} aria-label="Close menu" className="grid size-9 place-items-center">
          <X className="size-5" />
        </button>
      </div>

      <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-6 py-6">
        <ul className="space-y-1">
          {siteConfig.nav.map((l) => (
            <li key={l.href}>
              <Link href={l.href} onClick={onClose} className="block py-2 font-serif text-3xl text-burgundy hover:text-crimson">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <p className="eyebrow mb-3 mt-8">Shop by style</p>
        <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
          {categories().map((c) => (
            <li key={c.slug}>
              <Link href={`/shop?category=${c.slug}`} onClick={onClose} className="py-1 hover:text-crimson">
                {c.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-xs uppercase tracking-[0.18em] text-burgundy">
          <Link href="/customise" onClick={onClose}>Customise</Link>
          <Link href="/wishlist" onClick={onClose}>Wishlist</Link>
          <Link href="/account" onClick={onClose}>Account</Link>
        </div>
      </nav>

      <a
        href={siteConfig.instagram}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 border-t border-champagne/60 px-6 py-4 text-sm text-burgundy"
      >
        <InstagramIcon className="size-5" /> {siteConfig.instagramHandle}
      </a>
    </Drawer>
  );
}
