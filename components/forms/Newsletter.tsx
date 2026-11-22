"use client";

import { m, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { useState, type FormEvent } from "react";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Deliberately plain: native validation keeps react-hook-form and zod out of the
// bundle on every page. FRONT-END ONLY: wire `onSubmit` to your email provider.
export function Newsletter() {
  const [status, setStatus] = useState<"idle" | "error" | "done">("idle");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = String(new FormData(e.currentTarget).get("email") ?? "").trim();
    setStatus(EMAIL.test(email) ? "done" : "error");
  };

  return (
    <section
      id="newsletter"
      aria-labelledby="newsletter-title"
      className="relative overflow-hidden bg-gradient-to-b from-champagne/30 via-champagne/20 to-ivory border-y border-gold/30 px-5 py-16 text-center md:py-20"
    >
      <div className="mx-auto mb-3 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-white/70 px-3.5 py-1 text-[10px] uppercase tracking-[0.22em] text-gold-dark shadow-xs">
        <span className="text-gold text-[8px]">✦</span>
        <span>Privilege Club</span>
        <span className="text-gold text-[8px]">✦</span>
      </div>
      <h2 id="newsletter-title" className="mx-auto max-w-xl font-serif text-4xl leading-tight text-burgundy md:text-5xl">
        A Little More Maayil in Your Inbox.
      </h2>
      <p className="mx-auto mt-4 max-w-md text-sm text-espresso/75">New arrivals, styling notes and quiet offers, never noise.</p>

      <div className="mx-auto mt-8 max-w-md" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          {status === "done" ? (
            <m.p
              key="done"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 font-serif text-2xl text-burgundy"
            >
              <Check className="size-5 text-gold-dark" /> Thank you. You&apos;re on the list.
            </m.p>
          ) : (
            <m.form key="form" noValidate onSubmit={onSubmit} exit={{ opacity: 0 }}>
              <div className="flex border border-gold/50 bg-white shadow-xs focus-within:border-gold focus-within:ring-2 focus-within:ring-gold/20 transition-all duration-300">
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Your email address"
                  aria-invalid={status === "error"}
                  aria-describedby={status === "error" ? "newsletter-error" : undefined}
                  onChange={() => status === "error" && setStatus("idle")}
                  className="min-w-0 flex-1 bg-transparent px-4 py-3.5 text-sm outline-none"
                />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-gold-dark via-gold-light to-gold px-6 text-xs font-semibold uppercase tracking-[0.18em] text-burgundy transition-all duration-300 hover:brightness-105 active:brightness-95 hover:shadow-[0_0_15px_rgba(197,160,89,0.35)]"
                >
                  Subscribe
                </button>
              </div>
              {status === "error" && (
                <p id="newsletter-error" role="alert" className="mt-2 text-left text-xs text-crimson">
                  Please enter a valid email address.
                </p>
              )}
            </m.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
