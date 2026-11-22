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
              "min-w-11 border text-xs transition-colors",
              compact ? "h-8 px-2" : "h-11 px-3",
              value === s ? "border-burgundy bg-burgundy text-ivory" : "border-espresso/25 hover:border-burgundy",
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
