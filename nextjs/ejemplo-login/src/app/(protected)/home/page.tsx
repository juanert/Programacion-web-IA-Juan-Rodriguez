"use client";

import { useEffect, useSyncExternalStore } from "react";
import { AccountSummary } from "@/components/organisms/account-summary";
import {
  getServerSessionSnapshot,
  getSessionSnapshot,
  parseProfile,
  subscribeToSession,
} from "@/lib/browser-auth";
import { NOT_FOUND_PATH } from "@/lib/session";

export default function HomePage() {
  const session = useSyncExternalStore(
    subscribeToSession,
    getSessionSnapshot,
    getServerSessionSnapshot,
  );

  useEffect(() => {
    if (session === null) window.location.replace(NOT_FOUND_PATH);
  }, [session]);

  if (!session) {
    return (
      <p role="status" className="text-muted">
        Comprobando tu sesión…
      </p>
    );
  }

  return <AccountSummary {...parseProfile(session)} />;
}
