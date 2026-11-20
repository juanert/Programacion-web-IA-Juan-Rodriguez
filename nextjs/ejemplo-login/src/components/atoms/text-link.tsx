import Link from "next/link";
import type { ComponentProps } from "react";

export function TextLink(props: ComponentProps<typeof Link>) {
  return (
    <Link
      {...props}
      className="rounded-sm font-semibold text-accent underline underline-offset-4 hover:text-accent-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
    />
  );
}
