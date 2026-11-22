import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const variants = {
  primary:
    "bg-burgundy text-ivory border border-gold/40 shadow-[0_4px_18px_-4px_rgba(74,16,28,0.4)] hover:bg-crimson hover:border-gold hover:shadow-[0_8px_25px_-5px_rgba(151,0,24,0.45),0_0_15px_rgba(197,160,89,0.3)]",
  outline:
    "border border-burgundy/80 text-burgundy bg-transparent hover:border-gold hover:bg-burgundy hover:text-gold-shimmer hover:shadow-[0_4px_20px_rgba(197,160,89,0.22)]",
  gold:
    "bg-gradient-to-r from-gold-dark via-gold-light to-gold text-burgundy font-semibold border border-gold-shimmer/60 shadow-[0_4px_20px_rgba(197,160,89,0.35)] hover:shadow-[0_8px_30px_rgba(197,160,89,0.55)] hover:brightness-105 active:brightness-95",
  light:
    "bg-ivory text-burgundy border border-gold/30 hover:border-gold hover:bg-white hover:shadow-sm",
} as const;
type Variant = keyof typeof variants;

export const buttonClass = (variant: Variant = "primary", className?: string) =>
  cn(
    "inline-flex items-center justify-center gap-2 px-7 py-3.5 text-xs font-medium uppercase tracking-[0.2em] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50",
    variants[variant],
    className,
  );

export function Button({ variant, className, ...props }: { variant?: Variant } & ComponentProps<"button">) {
  return <button type="button" className={buttonClass(variant, className)} {...props} />;
}

export function ButtonLink({ variant, className, ...props }: { variant?: Variant } & ComponentProps<typeof Link>) {
  return <Link className={buttonClass(variant, className)} {...props} />;
}
