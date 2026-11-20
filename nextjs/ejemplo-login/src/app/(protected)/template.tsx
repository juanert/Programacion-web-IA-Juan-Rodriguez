import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { AccountTemplate } from "@/components/templates/account-template";
import { isSessionToken, NOT_FOUND_PATH, SESSION_COOKIE } from "@/lib/session";

export default async function ProtectedTemplate({ children }: { children: ReactNode }) {
  const cookieStore = await cookies();

  if (!isSessionToken(cookieStore.get(SESSION_COOKIE)?.value)) {
    redirect(NOT_FOUND_PATH);
  }

  return <AccountTemplate>{children}</AccountTemplate>;
}
