export const SESSION_COOKIE = "ejemplo-login-session";
export const NOT_FOUND_PATH = "/404";

export function isSessionToken(value: unknown): value is string {
  return (
    typeof value === "string" &&
    /^[\da-f]{8}-[\da-f]{4}-4[\da-f]{3}-[89ab][\da-f]{3}-[\da-f]{12}$/i.test(value)
  );
}
