"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ButtonLink } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { Skeleton } from "@/components/ui/LoadingSkeleton";
import { inr } from "@/lib/utils";
import { checkoutSchema, type CheckoutValues } from "@/lib/validations";
import { useCartStore, useCartSummary } from "@/store/cart-store";
import { CartTotals } from "./CartLines";

const PAYMENTS = [
  { id: "upi", label: "UPI", hint: "Pay with any UPI app" },
  { id: "card", label: "Credit / Debit card", hint: "Visa, Mastercard, RuPay" },
  { id: "cod", label: "Cash on delivery", hint: "Pay when it arrives" },
] as const;

const legend = "mb-4 font-serif text-2xl text-burgundy";

export function CheckoutForm() {
  const ready = useCartStore((s) => s.ready);
  const clear = useCartStore((s) => s.clear);
  const { items, count, total } = useCartSummary();
  const [placed, setPlaced] = useState<{ id: string; total: number } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutValues>({ resolver: zodResolver(checkoutSchema), defaultValues: { payment: "upi" } });

  const onSubmit = handleSubmit(async () => {
    await new Promise((r) => setTimeout(r, 700)); // simulated latency; no request is made
    setPlaced({ id: `DEMO-${Date.now().toString(36).toUpperCase()}`, total });
    clear();
  });

  if (!ready) return <Skeleton className="h-96" />;

  if (placed) {
    return (
      <div className="mx-auto max-w-lg py-10 text-center" role="status">
        <p className="eyebrow">Demo order</p>
        <h2 className="mt-3 font-serif text-5xl text-burgundy">Thank you.</h2>
        <p className="mt-4 text-espresso/75">
          This was a demonstration checkout. No payment was taken and no order was placed.
        </p>
        <p className="mt-6 text-sm text-espresso/60">
          Reference {placed.id} · {inr(placed.total)}
        </p>
        <ButtonLink href="/shop" className="mt-8">Continue Shopping</ButtonLink>
      </div>
    );
  }

  if (count === 0) {
    return (
      <p className="py-16 text-center text-espresso/70">
        Your bag is empty.{" "}
        <Link href="/shop" className="text-burgundy underline underline-offset-4">Browse the collection</Link>
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid items-start gap-12 lg:grid-cols-[1.4fr_1fr]">
      <div className="space-y-10">
        <p className="border border-champagne bg-champagne/20 px-4 py-3 text-sm text-burgundy">
          Demo checkout: no payment is taken and no order is placed.
        </p>

        <fieldset className="grid gap-4 sm:grid-cols-2">
          <legend className={legend}>Contact</legend>
          <Field label="Full name" autoComplete="name" error={errors.name?.message} className="sm:col-span-2" {...register("name")} />
          <Field label="Email" type="email" autoComplete="email" error={errors.email?.message} {...register("email")} />
          <Field label="Mobile number" type="tel" inputMode="numeric" maxLength={10} autoComplete="tel-national" error={errors.phone?.message} {...register("phone")} />
        </fieldset>

        <fieldset className="grid gap-4 sm:grid-cols-2">
          <legend className={legend}>Shipping address</legend>
          <Field label="Address" autoComplete="address-line1" error={errors.address1?.message} className="sm:col-span-2" {...register("address1")} />
          <Field label="Apartment, landmark (optional)" autoComplete="address-line2" error={errors.address2?.message} className="sm:col-span-2" {...register("address2")} />
          <Field label="City" autoComplete="address-level2" error={errors.city?.message} {...register("city")} />
          <Field label="State" autoComplete="address-level1" error={errors.state?.message} {...register("state")} />
          <Field label="Pincode" inputMode="numeric" maxLength={6} autoComplete="postal-code" error={errors.pincode?.message} {...register("pincode")} />
        </fieldset>

        <section>
          <h2 className={legend}>Delivery</h2>
          <p className="text-sm text-espresso/75">Standard shipping · estimated 3–7 business days.</p>
        </section>

        <fieldset>
          <legend className={legend}>Payment method</legend>
          <div className="grid gap-3 sm:grid-cols-3">
            {PAYMENTS.map((p) => (
              <div key={p.id}>
                <input id={`pay-${p.id}`} type="radio" value={p.id} className="peer sr-only" {...register("payment")} />
                <label
                  htmlFor={`pay-${p.id}`}
                  className="block h-full cursor-pointer border border-espresso/25 p-4 text-sm transition-colors peer-checked:border-burgundy peer-checked:bg-champagne/20 peer-focus-visible:outline-2 peer-focus-visible:outline-crimson"
                >
                  <span className="block font-medium">{p.label}</span>
                  <span className="mt-1 block text-xs text-espresso/60">{p.hint}</span>
                </label>
              </div>
            ))}
          </div>
        </fieldset>
      </div>

      <aside className="border border-champagne/60 bg-white p-6 lg:sticky lg:top-28" aria-labelledby="summary">
        <h2 id="summary" className="mb-5 font-serif text-2xl text-burgundy">Order summary</h2>
        <ul className="mb-5 space-y-3 text-sm">
          {items.map((i) => (
            <li key={`${i.slug}-${i.size}`} className="flex justify-between gap-4">
              <span>
                {i.product.name}
                <span className="block text-xs text-espresso/60">Size {i.size} · Qty {i.qty}</span>
              </span>
              <span>{inr(i.product.price * i.qty)}</span>
            </li>
          ))}
        </ul>
        <CartTotals />
        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-6 w-full bg-burgundy px-7 py-3.5 text-xs font-medium uppercase tracking-[0.18em] text-ivory transition-colors hover:bg-crimson disabled:opacity-60"
        >
          {isSubmitting ? "Placing demo order…" : "Place demo order"}
        </button>
      </aside>
    </form>
  );
}
