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
    <section id="newsletter" aria-labelledby="newsletter-title" className="bg-champagne/30 px-5 py-16 text-center md:py-20">
      <h2 id="newsletter-title" className="mx-auto max-w-xl font-serif text-4xl leading-tight text-burgundy md:text-5xl">
        A Little More Maayil in Your Inbox.
      </h2>
      <p className="mx-auto mt-4 max-w-md text-sm text-espresso/75">New arrivals and quiet offers, never noise.</p>

      <div className="mx-auto mt-8 max-w-md" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          {status === "done" ? (
            <m.p
              key="done"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 font-serif text-2xl text-burgundy"
            >
              <Check className="size-5 text-crimson" /> Thank you. You&apos;re on the list.
            </m.p>
          ) : (
            <m.form key="form" noValidate onSubmit={onSubmit} exit={{ opacity: 0 }}>
              <div className="flex border border-burgundy/40 bg-white focus-within:border-burgundy">
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
                  className="bg-burgundy px-6 text-xs font-medium uppercase tracking-[0.18em] text-ivory transition-colors hover:bg-crimson"
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
