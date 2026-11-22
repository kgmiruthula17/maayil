import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Wordmark stand-in. To use the supplied logo, drop it in /public/logo.svg and replace
 * the span with <Image src="/logo.svg" alt="" width={120} height={36} priority />.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="MAAYIL, home"
      className={cn(
        "group inline-flex items-baseline font-serif text-3xl italic leading-none tracking-wide text-burgundy transition-all duration-300 hover:text-gold-dark",
        className,
      )}
    >
      <span>Maayil</span>
      <span className="ml-1 inline-block size-1.5 rounded-full bg-gold transition-transform duration-300 group-hover:scale-150 group-hover:bg-gold-light" />
    </Link>
  );
}
