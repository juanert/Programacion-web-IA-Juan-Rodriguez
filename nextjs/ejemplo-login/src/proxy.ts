import { NextResponse, type NextRequest } from "next/server";
import { isSessionToken, NOT_FOUND_PATH, SESSION_COOKIE } from "@/lib/session";

export function proxy(request: NextRequest) {
  if (!isSessionToken(request.cookies.get(SESSION_COOKIE)?.value)) {
    return NextResponse.redirect(new URL(NOT_FOUND_PATH, request.url));
  }

  return NextResponse.next();
}

export const config = { matcher: "/home" };
