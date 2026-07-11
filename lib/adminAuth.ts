import { createHmac, timingSafeEqual } from "crypto";

export const ADMIN_COOKIE_NAME = "admin_session";
export const ADMIN_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

function sign(payload: string, secret: string): string {
  return createHmac("sha256", secret).update(payload).digest("hex");
}

export function createSessionToken(secret: string): string {
  const expires = String(Date.now() + ADMIN_COOKIE_MAX_AGE * 1000);
  return `${expires}.${sign(expires, secret)}`;
}

export function verifySessionToken(
  token: string | undefined,
  secret: string
): boolean {
  if (!token || !secret) return false;
  const [expires, sig] = token.split(".");
  if (!expires || !sig) return false;

  const expectedSig = sign(expires, secret);
  const a = Buffer.from(sig);
  const b = Buffer.from(expectedSig);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return false;

  return Number(expires) > Date.now();
}
