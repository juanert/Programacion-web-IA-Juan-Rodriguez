"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/atoms/button";
import { TextLink } from "@/components/atoms/text-link";
import { FormField } from "@/components/molecules/form-field";
import { AuthError, login, register } from "@/lib/browser-auth";

type AuthFormProps = {
  mode: "login" | "register";
  registrationComplete?: boolean;
};

export function AuthForm({ mode, registrationComplete }: AuthFormProps) {
  const isRegister = mode === "register";
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const submitLabel = isRegister ? "Crear cuenta" : "Iniciar sesión";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;

    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") ?? "");
    const password = String(data.get("password") ?? "");
    setError("");
    setPending(true);

    try {
      if (isRegister) {
        await register(String(data.get("name") ?? ""), email, password);
        window.location.assign("/login?registro=ok");
      } else {
        await login(email, password);
        window.location.replace("/home");
      }
    } catch (error) {
      setError(
        error instanceof AuthError
          ? error.message
          : "No pudimos completar la operación. Revisa que el almacenamiento del navegador esté habilitado.",
      );
      setPending(false);
    }
  }

  return (
    <>
      {registrationComplete && (
        <p role="status" className="rounded-xl bg-soft-accent px-4 py-3 text-sm text-accent">
          Cuenta creada. Ya puedes iniciar sesión.
        </p>
      )}

      <form aria-label={submitLabel} onSubmit={handleSubmit} method="post" className="grid gap-4">
        {isRegister && (
          <FormField
            label="Nombre"
            name="name"
            autoComplete="name"
            placeholder="Tu nombre"
            maxLength={80}
            required
          />
        )}
        <FormField
          label="Correo electrónico"
          name="email"
          type="email"
          autoComplete="username"
          placeholder="tu@correo.com"
          maxLength={254}
          required
        />
        <FormField
          label="Contraseña"
          name="password"
          type="password"
          autoComplete={isRegister ? "new-password" : "current-password"}
          placeholder={isRegister ? "Crea una contraseña" : "Escribe tu contraseña"}
          hint={isRegister ? "Usa al menos 8 caracteres." : undefined}
          minLength={isRegister ? 8 : undefined}
          maxLength={128}
          required
        />
        {error && (
          <p role="alert" className="rounded-xl bg-error-bg px-4 py-3 text-sm text-error">
            {error}
          </p>
        )}
        <Button type="submit" className="mt-1" disabled={pending}>
          {pending ? (isRegister ? "Creando cuenta…" : "Entrando…") : submitLabel}
        </Button>
      </form>

      <p className="text-sm text-muted">
        {isRegister ? "¿Ya tienes una cuenta?" : "¿Aún no tienes cuenta?"}{" "}
        <TextLink href={isRegister ? "/login" : "/register"}>
          {isRegister ? "Inicia sesión" : "Regístrate"}
        </TextLink>
      </p>
    </>
  );
}
