"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Field, Select, TextArea } from "@/components/ui/Field";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { buttonClass } from "@/components/ui/Button";
import { products, SIZES } from "@/lib/products";
import { siteConfig } from "@/lib/site";
import { enquirySchema, type EnquiryValues } from "@/lib/validations";

const compose = (v: EnquiryValues) =>
  [
    "Hello Maayil, I'd like to enquire about customisation.",
    `Name: ${v.name}`,
    `Phone: ${v.phone}`,
    `Preferred product: ${v.product}`,
    `Size: ${v.size}`,
    v.measurements && `Measurements: ${v.measurements}`,
    v.instructions && `Notes: ${v.instructions}`,
  ]
    .filter(Boolean)
    .join("\n");

// No backend: the validated enquiry is composed into a WhatsApp message the customer sends themselves.
export function EnquiryForm() {
  const [message, setMessage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EnquiryValues>({ resolver: zodResolver(enquirySchema), defaultValues: { product: "", size: "" } });

  if (message) {
    const wa = siteConfig.whatsapp && `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(message)}`;
    return (
      <div role="status" className="border border-champagne/70 bg-white p-6 md:p-8">
        <h2 className="font-serif text-3xl text-burgundy">Your enquiry is ready</h2>
        <pre className="mt-4 whitespace-pre-wrap bg-ivory p-4 font-sans text-sm text-espresso/80">{message}</pre>
        {wa ? (
          <a href={wa} target="_blank" rel="noopener noreferrer" className={buttonClass("primary", "mt-6")}>
            <WhatsAppIcon className="size-4" /> Send on WhatsApp
          </a>
        ) : (
          <p className="mt-6 text-sm text-espresso/70">
            Demo mode: enquiries are not sent anywhere yet. Add a WhatsApp number in the site settings to send this to Maayil.
          </p>
        )}
        <button type="button" onClick={() => setMessage(null)} className="mt-4 block text-xs uppercase tracking-[0.16em] text-burgundy underline underline-offset-4">
          Edit enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit((v) => setMessage(compose(v)))} noValidate className="grid gap-4 border border-champagne/70 bg-white p-6 sm:grid-cols-2 md:p-8">
      <Field label="Your name" autoComplete="name" error={errors.name?.message} {...register("name")} />
      <Field label="Contact number" type="tel" inputMode="numeric" maxLength={10} autoComplete="tel-national" error={errors.phone?.message} {...register("phone")} />
      <Select label="Preferred product" error={errors.product?.message} {...register("product")}>
        <option value="">Select a product</option>
        {products.map((p) => (
          <option key={p.slug}>{p.name}</option>
        ))}
        <option>Not sure yet</option>
      </Select>
      <Select label="Size" error={errors.size?.message} {...register("size")}>
        <option value="">Select a size</option>
        {SIZES.map((s) => (
          <option key={s}>{s}</option>
        ))}
        <option>Custom (see measurements)</option>
      </Select>
      <TextArea label="Custom measurements" placeholder="Bust, waist, hip, length, sleeve…" error={errors.measurements?.message} className="sm:col-span-2" {...register("measurements")} />
      <TextArea label="Special instructions" placeholder="Fabric, colour, neckline, anything you have in mind" error={errors.instructions?.message} className="sm:col-span-2" {...register("instructions")} />
      <button type="submit" className={buttonClass("primary", "sm:col-span-2")}>
        Prepare enquiry
      </button>
    </form>
  );
}
