import type { Metadata } from "next";
import { AuthForm } from "@/components/organisms/auth-form";
import { AuthTemplate } from "@/components/templates/auth-template";

export const metadata: Metadata = { title: "Registro" };

export default function RegisterPage() {
  return (
    <AuthTemplate
      title="Crea tu cuenta"
      description="Completa tus datos para registrarte en este navegador."
    >
      <AuthForm mode="register" />
    </AuthTemplate>
  );
}
