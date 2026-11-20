import { isSessionToken, SESSION_COOKIE } from "./session";

const ACCOUNT_PREFIX = "ejemplo-login:account:";
const SESSION_KEY = "ejemplo-login:session";

type Profile = { name: string; email: string };
type Account = Profile & { salt: string; passwordHash: string };
type Session = { email: string; token: string };

export class AuthError extends Error {}

function parseStored<T>(value: string | null): Partial<T> | null {
  try {
    return value ? JSON.parse(value) : null;
  } catch {
    return null;
  }
}

function readAccount(email: string): Account | null {
  const account = parseStored<Account>(localStorage.getItem(ACCOUNT_PREFIX + email));

  if (
    account?.email === email &&
    typeof account.name === "string" &&
    typeof account.salt === "string" &&
    typeof account.passwordHash === "string"
  ) {
    return {
      email,
      name: account.name,
      salt: account.salt,
      passwordHash: account.passwordHash,
    };
  }

  return null;
}

async function hashPassword(password: string, salt: string) {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    "PBKDF2",
    false,
    ["deriveBits"],
  );
  const hash = await crypto.subtle.deriveBits(
    { name: "PBKDF2", hash: "SHA-256", iterations: 600_000, salt: encoder.encode(salt) },
    key,
    256,
  );

  return btoa(String.fromCharCode(...new Uint8Array(hash)));
}

function readSessionCookie() {
  return document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith(SESSION_COOKIE + "="))
    ?.slice(SESSION_COOKIE.length + 1);
}

function writeSessionCookie(token: string, expired = false) {
  const maxAge = expired ? "; Max-Age=0" : "";
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${SESSION_COOKIE}=${token}; Path=/; SameSite=Lax${maxAge}${secure}`;
}

export async function register(name: string, email: string, password: string) {
  name = name.trim();
  email = email.trim().toLowerCase();

  if (!name || !email || password.length < 8) {
    throw new AuthError("Revisa los datos. La contraseña debe tener al menos 8 caracteres.");
  }

  const salt = crypto.randomUUID();
  const account: Account = {
    name,
    email,
    salt,
    passwordHash: await hashPassword(password, salt),
  };
  const key = ACCOUNT_PREFIX + email;

  await navigator.locks.request(key, () => {
    if (readAccount(email)) {
      throw new AuthError("Ya existe una cuenta con ese correo.");
    }

    localStorage.setItem(key, JSON.stringify(account));
  });
}

export async function login(email: string, password: string) {
  email = email.trim().toLowerCase();
  const account = readAccount(email);

  if (
    !account ||
    (await hashPassword(password, account.salt)) !== account.passwordHash
  ) {
    throw new AuthError("El correo o la contraseña son incorrectos.");
  }

  const token = crypto.randomUUID();
  const session: Session = { email, token };
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
  writeSessionCookie(token);

  if (readSessionCookie() !== token) {
    sessionStorage.removeItem(SESSION_KEY);
    throw new AuthError("Permite las cookies para iniciar sesión.");
  }
}

export function logout() {
  sessionStorage.removeItem(SESSION_KEY);
  writeSessionCookie("", true);
}

// React compares these snapshots by value. Include only the fields shown in Home.
export function getSessionSnapshot(): string | null {
  try {
    const session = parseStored<Session>(sessionStorage.getItem(SESSION_KEY));

    if (
      typeof session?.email !== "string" ||
      !isSessionToken(session.token) ||
      session.token !== readSessionCookie()
    ) {
      return null;
    }

    const account = readAccount(session.email);
    return account ? JSON.stringify({ name: account.name, email: account.email }) : null;
  } catch {
    return null;
  }
}

export function getServerSessionSnapshot(): undefined {
  return undefined;
}

export function subscribeToSession(callback: () => void) {
  const events = ["focus", "pageshow", "storage"];
  events.forEach((event) => window.addEventListener(event, callback));
  return () => events.forEach((event) => window.removeEventListener(event, callback));
}

export function parseProfile(snapshot: string): Profile {
  return JSON.parse(snapshot);
}
