import type { ComponentProps } from "react";

export const primaryButton =
  "inline-flex min-h-12 items-center justify-center rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-on-accent transition-colors hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent disabled:cursor-wait disabled:opacity-65";

export function Button({ className = "", ...props }: ComponentProps<"button">) {
  return <button {...props} className={`${primaryButton} ${className}`} />;
}
