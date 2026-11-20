import type { ComponentProps } from "react";

export function Input(props: ComponentProps<"input">) {
  return (
    <input
      {...props}
      className="min-h-12 w-full rounded-xl border border-line bg-input px-3.5 text-base text-ink placeholder:text-placeholder focus:border-accent focus:outline-2 focus:outline-offset-1 focus:outline-accent"
    />
  );
}
