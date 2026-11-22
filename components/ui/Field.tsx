import { useId, type ComponentProps, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const control =
  "w-full border border-espresso/25 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-burgundy aria-[invalid=true]:border-crimson";

type Base = { label: string; error?: string };

function Shell({
  id,
  label,
  error,
  className,
  children,
}: Base & { id: string; className?: string; children: ReactNode }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-xs uppercase tracking-[0.14em] text-espresso/70">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-err`} role="alert" className="mt-1 text-xs text-crimson">
          {error}
        </p>
      )}
    </div>
  );
}

const aria = (id: string, error?: string) => ({
  id,
  "aria-invalid": !!error,
  "aria-describedby": error ? `${id}-err` : undefined,
});

export function Field({ label, error, className, ...props }: Base & ComponentProps<"input">) {
  const id = useId();
  return (
    <Shell id={id} label={label} error={error} className={className}>
      <input className={control} {...aria(id, error)} {...props} />
    </Shell>
  );
}

export function TextArea({ label, error, className, ...props }: Base & ComponentProps<"textarea">) {
  const id = useId();
  return (
    <Shell id={id} label={label} error={error} className={className}>
      <textarea rows={3} className={cn(control, "resize-y")} {...aria(id, error)} {...props} />
    </Shell>
  );
}

export function Select({ label, error, className, children, ...props }: Base & ComponentProps<"select">) {
  const id = useId();
  return (
    <Shell id={id} label={label} error={error} className={className}>
      <select className={control} {...aria(id, error)} {...props}>
        {children}
      </select>
    </Shell>
  );
}
