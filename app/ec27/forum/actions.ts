"use server";

import { redirect } from "next/navigation";
import { ADMIN_PATH, requireAdmin } from "@/lib/adminAuth";
import { createPoll, deletePoll, getPoll, updatePoll } from "@/lib/forumPolls";

const BASE = `${ADMIN_PATH}/forum`;

export async function create(formData: FormData) {
  await requireAdmin();
  const days = Math.min(30, Math.max(1, Number(formData.get("days")) || 3));
  const poll = await createPoll(String(formData.get("title") ?? ""), days);
  redirect(`${BASE}/${poll.id}?new=1`);
}

export async function close(id: string) {
  await requireAdmin();
  const poll = await getPoll(id);
  if (poll) await updatePoll({ ...poll, closed: true });
  redirect(`${BASE}/${id}`);
}

export async function extend(id: string) {
  await requireAdmin();
  const poll = await getPoll(id);
  if (poll) {
    const from = Math.max(Date.now(), new Date(poll.expiresAt).getTime());
    await updatePoll({ ...poll, closed: false, expiresAt: new Date(from + 3 * 86_400_000).toISOString() });
  }
  redirect(`${BASE}/${id}`);
}

export async function remove(id: string) {
  await requireAdmin();
  await deletePoll(id);
  redirect(BASE);
}
