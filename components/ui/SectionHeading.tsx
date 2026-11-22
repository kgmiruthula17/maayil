import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  text,
  align = "center",
  flush = false,
}: {
  eyebrow?: string;
  title: string;
  text?: string;
  align?: "center" | "left";
  /** Drop the bottom margin when the heading sits inside another layout. */
  flush?: boolean;
}) {
  const center = align === "center";
  return (
    <Reveal className={cn("max-w-2xl", !flush && "mb-10 md:mb-14", center && "mx-auto text-center")}>
      {eyebrow && (
        <p className={cn("eyebrow mb-2.5 flex items-center gap-2 text-crimson", center && "justify-center")}>
          <span className="text-gold text-[10px]" aria-hidden>✦</span>
          <span>{eyebrow}</span>
          <span className="text-gold text-[10px]" aria-hidden>✦</span>
        </p>
      )}
      <h2 className="font-serif text-4xl leading-tight text-burgundy md:text-5xl">{title}</h2>
      <div aria-hidden className={cn("mt-4 flex items-center gap-2.5", center && "justify-center")}>
        <span className="h-px w-12 bg-gradient-to-r from-transparent via-gold to-gold" />
        <span className="text-gold text-[11px] leading-none select-none">✦</span>
        <span className="h-px w-12 bg-gradient-to-l from-transparent via-gold to-gold" />
      </div>
      {text && <p className="mt-5 text-espresso/75 leading-relaxed">{text}</p>}
    </Reveal>
  );
}
