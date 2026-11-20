import type { Metadata } from "next";
import { AuthForm } from "@/components/organisms/auth-form";
import { AuthTemplate } from "@/components/templates/auth-template";

export const metadata: Metadata = { title: "Iniciar sesión" };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ registro?: string | string[] }>;
}) {
  const { registro } = await searchParams;

  return (
    <AuthTemplate
      title="Inicia sesión"
      description="Ingresa tus datos para acceder a tu cuenta."
    >
      <AuthForm mode="login" registrationComplete={registro === "ok"} />
    </AuthTemplate>
  );
}
