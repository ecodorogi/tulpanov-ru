"use server";

import { redirect } from "next/navigation";
import { ADMIN_PATH, checkCredentials, endSession, startSession } from "@/lib/adminAuth";

export async function login(_prev: string | null, formData: FormData): Promise<string | null> {
  const ok = checkCredentials(String(formData.get("login") ?? ""), String(formData.get("password") ?? ""));
  if (!ok) {
    // Пауза после неверного ввода замедляет подбор пароля.
    await new Promise((r) => setTimeout(r, 1500));
    return "Неверный логин или пароль.";
  }
  await startSession();
  redirect(ADMIN_PATH);
}

export async function logout() {
  await endSession();
  redirect(ADMIN_PATH);
}
