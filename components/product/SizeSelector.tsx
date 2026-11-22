import { SIZES, type Size } from "@/lib/products";
import { cn } from "@/lib/utils";

export function SizeSelector({
  sizes,
  value,
  onChange,
  compact,
}: {
  sizes: readonly Size[];
  value?: Size | null;
  onChange: (size: Size) => void;
  compact?: boolean;
}) {
  return (
    <div role="group" aria-label="Select size" className="flex flex-wrap gap-2">
      {SIZES.map((s) => {
        const available = sizes.includes(s);
        return (
          <button
            key={s}
            type="button"
            disabled={!available}
            aria-pressed={value === s}
            onClick={() => onChange(s)}
            className={cn(
              "min-w-11 border text-xs transition-all duration-300",
              compact ? "h-8 px-2" : "h-11 px-3",
              value === s
                ? "border-gold bg-burgundy text-gold-shimmer shadow-xs"
                : "border-espresso/25 hover:border-gold hover:text-burgundy",
              !available && "text-espresso/30 line-through",
            )}
          >
            {s}
          </button>
        );
      })}
    </div>
  );
}
