import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SiteBrand } from "@/components/molecules/site-brand";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Ejemplo Login", template: "%s | Ejemplo Login" },
  description: "Ejemplo de registro e inicio de sesión con almacenamiento del navegador.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-dvh font-sans text-ink antialiased">
        <header className="mx-auto w-full max-w-5xl px-4 py-5 sm:px-8 sm:py-7">
          <SiteBrand />
        </header>
        {children}
      </body>
    </html>
  );
}
