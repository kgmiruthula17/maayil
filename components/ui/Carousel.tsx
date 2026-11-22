"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, type PointerEvent, type ReactNode } from "react";

/** Native scroll-snap carousel with mouse drag and arrow buttons. No animation library needed. */
export function Carousel({ heading, label, children }: { heading: ReactNode; label: string; children: ReactNode }) {
  const rail = useRef<HTMLDivElement>(null);
  const drag = useRef({ x: 0, left: 0, moved: false });

  const nudge = (dir: 1 | -1) => {
    const el = rail.current;
    el?.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    const el = rail.current;
    if (!el || e.pointerType !== "mouse" || e.button !== 0) return;
    drag.current = { x: e.clientX, left: el.scrollLeft, moved: false };
    el.dataset.dragging = "";
    const move = (ev: globalThis.PointerEvent) => {
      const dx = ev.clientX - drag.current.x;
      if (Math.abs(dx) > 4) drag.current.moved = true;
      el.scrollLeft = drag.current.left - dx;
    };
    const up = () => {
      delete el.dataset.dragging;
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  };

  // Swallow the click that ends a drag so cards don't navigate.
  const onClickCapture = (e: React.MouseEvent) => {
    if (!drag.current.moved) return;
    e.preventDefault();
    e.stopPropagation();
    drag.current.moved = false;
  };

  const arrow =
    "grid size-11 place-items-center border border-burgundy/30 text-burgundy transition-colors hover:bg-burgundy hover:text-ivory";

  return (
    <div>
      <div className="mx-auto mb-8 flex w-full max-w-[1440px] items-end justify-between gap-6 px-5 md:px-10">
        {heading}
        <div className="hidden gap-2 md:flex">
          <button type="button" aria-label="Previous" onClick={() => nudge(-1)} className={arrow}>
            <ChevronLeft className="size-5" />
          </button>
          <button type="button" aria-label="Next" onClick={() => nudge(1)} className={arrow}>
            <ChevronRight className="size-5" />
          </button>
        </div>
      </div>
      <div
        ref={rail}
        role="region"
        aria-label={label}
        onPointerDown={onPointerDown}
        onClickCapture={onClickCapture}
        onDragStart={(e) => e.preventDefault()}
        className="no-scrollbar flex cursor-grab snap-x snap-mandatory gap-4 overflow-x-auto scroll-pl-5 px-5 select-none data-dragging:cursor-grabbing data-dragging:snap-none md:scroll-pl-10 md:gap-6 md:px-10"
      >
        {children}
      </div>
    </div>
  );
}
