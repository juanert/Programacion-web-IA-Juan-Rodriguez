import type { ReactNode } from "react";

type AuthTemplateProps = {
  title: string;
  description: string;
  children: ReactNode;
};

export function AuthTemplate({ title, description, children }: AuthTemplateProps) {
  return (
    <main className="mx-auto grid w-full max-w-5xl p-4 pt-4 sm:px-8 sm:pt-8 lg:pt-12">
      <div className="grid overflow-hidden rounded-3xl border border-line bg-surface shadow-[0_18px_60px_-32px_#31564b59] md:grid-cols-[0.9fr_1.1fr]">
        <aside className="order-last flex flex-col justify-between gap-4 bg-soft-accent px-7 py-6 sm:px-10 md:order-first md:gap-9 md:p-10 lg:p-12">
          <div className="lock-illustration hidden md:grid" aria-hidden="true">
            <span className="grid size-32 place-items-center rounded-full border border-accent/20 bg-accent/8 text-4xl text-accent">
              <span className="lock-mark" />
            </span>
          </div>
          <div className="max-w-70">
            <p className="mb-2 text-lg font-semibold tracking-tight text-accent md:text-2xl">
              Tu cuenta local
            </p>
            <p className="text-muted">
              Tu cuenta se guarda en este navegador y tu sesión se mantiene en esta pestaña.
            </p>
          </div>
        </aside>
        <section className="mx-auto grid w-full max-w-lg content-center gap-6 px-7 py-8 sm:px-10 md:px-12 md:py-12">
          <div className="grid gap-2">
            <h1 className="text-3xl leading-tight font-semibold tracking-tight sm:text-4xl">
              {title}
            </h1>
            <p className="text-muted">{description}</p>
          </div>
          {children}
        </section>
      </div>
    </main>
  );
}
