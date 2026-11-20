import Link from "next/link";

export function SiteBrand() {
  return (
    <Link
      href="/login"
      className="inline-flex items-center gap-3 rounded-lg font-semibold tracking-tight focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
    >
      <span
        aria-hidden="true"
        className="grid size-9 place-items-center rounded-xl bg-accent text-on-accent"
      >
        <span className="lock-mark" />
      </span>
      Ejemplo Login
    </Link>
  );
}
