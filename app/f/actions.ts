"use server";

import { cookies } from "next/headers";
import { addAnswer, validShares } from "@/lib/forumPolls";

export type VoteResult = "ok" | "closed" | "full" | "invalid" | "already";

export async function submitVote(id: string, shares: number[]): Promise<VoteResult> {
  if (!validShares(shares)) return "invalid";
  const jar = await cookies();
  // Метка «уже голосовал» живёт только в браузере участника и на сервере не сохраняется.
  if (jar.get(`fv_${id}`)) return "already";
  const result = await addAnswer(id, shares);
  if (result === "ok") {
    jar.set(`fv_${id}`, "1", { httpOnly: true, sameSite: "lax", secure: true, maxAge: 60 * 60 * 24 * 60, path: "/f" });
  }
  return result;
}
