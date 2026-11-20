"use client";

import { Button } from "@/components/atoms/button";
import { logout } from "@/lib/browser-auth";

export function AccountSummary({ name, email }: { name: string; email: string }) {
  function handleLogout() {
    logout();
    window.location.replace("/login");
  }

  return (
    <>
      <div className="inline-flex w-fit items-center gap-2 rounded-full bg-soft-accent px-3 py-1 text-sm font-semibold text-accent">
        <span aria-hidden="true" className="size-2 rounded-full bg-accent" />
        Sesión activa
      </div>
      <h1 className="text-4xl font-semibold tracking-tight [overflow-wrap:anywhere]">
        Hola, {name}
      </h1>
      <dl className="rounded-2xl border border-line bg-input px-4 py-3.5">
        <dt className="text-sm font-medium text-muted">Correo de tu cuenta</dt>
        <dd className="mt-0.5 font-semibold [overflow-wrap:anywhere]">{email}</dd>
      </dl>
      <Button type="button" className="w-fit" onClick={handleLogout}>
        Cerrar sesión
      </Button>
    </>
  );
}
