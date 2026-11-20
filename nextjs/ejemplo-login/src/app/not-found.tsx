import Link from "next/link";
import { primaryButton } from "@/components/atoms/button";
import { AccountTemplate } from "@/components/templates/account-template";

export default function NotFound() {
  return (
    <AccountTemplate>
      <div className="grid gap-2">
        <p className="text-sm font-semibold text-accent">Error 404</p>
        <h1 className="text-3xl leading-tight font-semibold tracking-tight">
          Página no encontrada
        </h1>
        <p className="text-muted">
          Si intentabas acceder a tu cuenta, inicia sesión para continuar.
        </p>
      </div>
      <Link href="/login" className={`${primaryButton} w-fit`}>
        Ir al inicio de sesión
      </Link>
    </AccountTemplate>
  );
}
