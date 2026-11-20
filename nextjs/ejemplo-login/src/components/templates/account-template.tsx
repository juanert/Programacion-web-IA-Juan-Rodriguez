import type { ReactNode } from "react";

export function AccountTemplate({ children }: { children: ReactNode }) {
  return (
    <main className="mx-auto w-full max-w-xl px-4 py-8 sm:px-8 sm:py-16">
      <div className="grid gap-5 rounded-3xl border border-line bg-surface p-7 shadow-[0_18px_60px_-32px_#31564b59] sm:p-10">
        {children}
      </div>
    </main>
  );
}
