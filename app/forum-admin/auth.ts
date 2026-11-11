import { cookies } from "next/headers";
import { adminToken } from "@/lib/forumPolls";

export const ADMIN_COOKIE = "forum_admin";

export async function isAdmin() {
  const token = adminToken();
  return !!token && (await cookies()).get(ADMIN_COOKIE)?.value === token;
}
