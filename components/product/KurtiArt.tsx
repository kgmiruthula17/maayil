import { useId } from "react";
import type { Art } from "@/lib/products";
import { cn } from "@/lib/utils";

// [hemLeft, hemRight, waistLeft, waistRight]
const SHAPE = {
  straight: [110, 290, 108, 292],
  aline: [84, 316, 112, 288],
  anarkali: [44, 356, 128, 272],
} as const;

// Full garment, neckline close-up, hem close-up. All 4:5.
const VIEWS = ["0 0 400 500", "110 60 180 225", "90 260 220 275"] as const;

const neck = (t: number) => ({ x: 150 + 100 * t, y: 72 + 92 * t * (1 - t) });
const row = (n: number, from: number, to: number) =>
  Array.from({ length: n }, (_, i) => from + (i * (to - from)) / (n - 1));

/** Inline-SVG stand-in for product photography: zero requests, replaced by `photos` when supplied. */
export function KurtiArt({ art, view = 0, label, className }: { art: Art; view?: number; label: string; className?: string }) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");
  const [hl, hr, wl, wr] = SHAPE[art.silhouette];
  const body = `M150 72Q200 118 250 72L306 92L338 196L298 206L${wr} 218L${hr} 452L${hl} 452L${wl} 218L102 206L62 196L94 92Z`;
  const { pattern, accent } = art;

  return (
    <svg
      viewBox={VIEWS[view % 3]}
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={label}
      className={cn("absolute inset-0 size-full", className)}
    >
      <defs>
        <clipPath id={`${id}c`}>
          <path d={body} />
        </clipPath>
        <linearGradient id={`${id}g`} x1="0" x2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".14" />
          <stop offset="1" stopColor="#000" stopOpacity=".16" />
        </linearGradient>
        <pattern id={`${id}p`} width="24" height="24" patternUnits="userSpaceOnUse">
          <circle cx="6" cy="6" r="2.6" fill={accent} opacity=".6" />
          <circle cx="18" cy="18" r="1.8" fill={accent} opacity=".45" />
        </pattern>
      </defs>

      <rect x="-200" y="-200" width="800" height="900" fill={art.bg} />
      <ellipse cx="200" cy="462" rx={(hr - hl) / 2 + 10} ry="9" fill="#000" opacity=".08" />
      <path d={body} fill={art.base} />

      <g clipPath={`url(#${id}c)`}>
        {pattern === "print" && <rect x="0" y="60" width="400" height="400" fill={`url(#${id}p)`} />}

        <path d="M200 118V452" stroke={accent} strokeOpacity=".55" />

        {pattern === "border" && (
          <>
            <rect x="0" y="418" width="400" height="7" fill={accent} />
            <rect x="0" y="432" width="400" height="2" fill={accent} />
            <path d="M150 84Q200 130 250 84" fill="none" stroke={accent} strokeWidth="3" />
          </>
        )}

        {pattern === "embroidery" && (
          <g fill={accent}>
            {row(9, 0, 1).map((t) => {
              const p = neck(t);
              return <circle key={t} cx={p.x} cy={p.y + 14} r="2.6" />;
            })}
            {row(10, hl + 10, hr - 10).map((x) => (
              <circle key={x} cx={x} cy="436" r="3" />
            ))}
            {row(8, 140, 400).map((y) => (
              <circle key={y} cx="200" cy={y} r="3.2" />
            ))}
            {row(8, hl + 14, hr - 14).map((x) => (
              <circle key={`b${x}`} cx={x} cy="420" r="1.6" opacity=".7" />
            ))}
          </g>
        )}

        {(pattern === "plain" || pattern === "print") && (
          <path d="M0 440H400" stroke={accent} strokeOpacity=".6" strokeDasharray="4 4" />
        )}

        <rect width="400" height="500" fill={`url(#${id}g)`} />
      </g>

      <path d="M150 72Q200 118 250 72Q200 100 150 72Z" fill="#000" opacity=".2" />
    </svg>
  );
}
