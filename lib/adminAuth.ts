import crypto from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Вход в админку /ec27: логин и пароль из env.
// ADMIN_PASSWORD_HASH — «соль:хеш» scrypt, сам пароль на сервере не хранится.
// В cookie лежит HMAC от логина и хеша: смена пароля сразу разлогинивает все устройства.

export const ADMIN_PATH = "/ec27";
export const ADMIN_COOKIE = "admin_session";

function sessionToken() {
  const { ADMIN_LOGIN, ADMIN_PASSWORD_HASH, ADMIN_SESSION_SECRET } = process.env;
  if (!ADMIN_LOGIN || !ADMIN_PASSWORD_HASH || !ADMIN_SESSION_SECRET) return null;
  return crypto
    .createHmac("sha256", ADMIN_SESSION_SECRET)
    .update(`${ADMIN_LOGIN}:${ADMIN_PASSWORD_HASH}`)
    .digest("base64url");
}

const same = (a: Buffer, b: Buffer) => a.length === b.length && crypto.timingSafeEqual(a, b);

export function checkCredentials(login: string, password: string) {
  const { ADMIN_LOGIN, ADMIN_PASSWORD_HASH } = process.env;
  if (!ADMIN_LOGIN || !ADMIN_PASSWORD_HASH) return false;
  const [salt, hash] = ADMIN_PASSWORD_HASH.split(":");
  if (!salt || !hash) return false;
  const actual = crypto.scryptSync(password, salt, 32);
  // Сравниваем и логин, и пароль, даже если логин уже не совпал, — одинаковое время ответа.
  const loginOk = same(Buffer.from(login.trim()), Buffer.from(ADMIN_LOGIN));
  const passwordOk = same(actual, Buffer.from(hash, "hex"));
  return loginOk && passwordOk;
}

export async function startSession() {
  const token = sessionToken();
  if (!token) return;
  (await cookies()).set(ADMIN_COOKIE, token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });
}

export async function endSession() {
  (await cookies()).delete(ADMIN_COOKIE);
}

export async function isAdmin() {
  const token = sessionToken();
  const value = (await cookies()).get(ADMIN_COOKIE)?.value;
  return !!token && !!value && same(Buffer.from(value), Buffer.from(token));
}

// Для server actions: без входа — обратно на страницу входа.
export async function requireAdmin() {
  if (!(await isAdmin())) redirect(ADMIN_PATH);
}
