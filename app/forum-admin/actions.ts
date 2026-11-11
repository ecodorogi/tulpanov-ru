"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE as COOKIE, isAdmin } from "./auth";
import { adminToken, checkAdminKey, createPoll, deletePoll, getPoll, updatePoll } from "@/lib/forumPolls";

async function requireAdmin() {
  if (!(await isAdmin())) redirect("/forum-admin");
}

export async function login(formData: FormData) {
  const token = adminToken();
  if (token && checkAdminKey(String(formData.get("key") ?? ""))) {
    (await cookies()).set(COOKIE, token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 90,
      path: "/",
    });
    redirect("/forum-admin");
  }
  redirect("/forum-admin?error=1");
}

export async function logout() {
  (await cookies()).delete(COOKIE);
  redirect("/forum-admin");
}

export async function create(formData: FormData) {
  await requireAdmin();
  const days = Math.min(30, Math.max(1, Number(formData.get("days")) || 3));
  const poll = await createPoll(String(formData.get("title") ?? ""), days);
  redirect(`/forum-admin/${poll.id}?new=1`);
}

export async function close(id: string) {
  await requireAdmin();
  const poll = await getPoll(id);
  if (poll) await updatePoll({ ...poll, closed: true });
  redirect(`/forum-admin/${id}`);
}

export async function extend(id: string) {
  await requireAdmin();
  const poll = await getPoll(id);
  if (poll) {
    const from = Math.max(Date.now(), new Date(poll.expiresAt).getTime());
    await updatePoll({ ...poll, closed: false, expiresAt: new Date(from + 3 * 86_400_000).toISOString() });
  }
  redirect(`/forum-admin/${id}`);
}

export async function remove(id: string) {
  await requireAdmin();
  await deletePoll(id);
  redirect("/forum-admin");
}
