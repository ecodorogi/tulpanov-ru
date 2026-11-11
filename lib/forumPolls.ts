import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";

// Анонимные опросы «на каком уровне сейчас форум».
// Каждый опрос - папка в DATA_DIR: meta.json + answers.jsonl (одна строка - один ответ).
// В ответе хранятся только проценты по уровням, дата и необязательный комментарий - никаких IP, имён и cookie.

export { LEVELS } from "./forumLevels";
import { LEVELS } from "./forumLevels";

export type Poll = {
  id: string;
  title: string;
  createdAt: string;
  expiresAt: string;
  closed?: boolean;
};

export type Answer = { shares: number[]; at: string; comment?: string };

const DATA_DIR = process.env.FORUM_POLLS_DIR || path.join(/*turbopackIgnore: true*/ process.cwd(), "..", "tulpanov-ru-data", "forum-polls");
const MAX_ANSWERS = 300;
export const MAX_COMMENT = 1000;

const pollDir = (id: string) => path.join(DATA_DIR, id);
const isValidId = (id: string) => /^[A-Za-z0-9_-]{16,40}$/.test(id);

export function isOpen(poll: Poll) {
  return !poll.closed && new Date(poll.expiresAt).getTime() > Date.now();
}

export async function createPoll(title: string, days: number): Promise<Poll> {
  const id = crypto.randomBytes(15).toString("base64url");
  const now = new Date();
  const poll: Poll = {
    id,
    title: title.trim().slice(0, 120) || "Форум-группа",
    createdAt: now.toISOString(),
    expiresAt: new Date(now.getTime() + days * 86_400_000).toISOString(),
  };
  await fs.mkdir(pollDir(id), { recursive: true });
  await fs.writeFile(path.join(pollDir(id), "meta.json"), JSON.stringify(poll, null, 2));
  return poll;
}

export async function getPoll(id: string): Promise<Poll | null> {
  if (!isValidId(id)) return null;
  try {
    return JSON.parse(await fs.readFile(path.join(pollDir(id), "meta.json"), "utf8"));
  } catch {
    return null;
  }
}

export async function updatePoll(poll: Poll) {
  await fs.writeFile(path.join(pollDir(poll.id), "meta.json"), JSON.stringify(poll, null, 2));
}

export async function deletePoll(id: string) {
  if (!isValidId(id)) return;
  await fs.rm(pollDir(id), { recursive: true, force: true });
}

export async function listPolls(): Promise<Poll[]> {
  let ids: string[] = [];
  try {
    ids = await fs.readdir(DATA_DIR);
  } catch {
    return [];
  }
  const polls = await Promise.all(ids.map(getPoll));
  return polls
    .filter((p): p is Poll => p !== null)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function getAnswers(id: string): Promise<Answer[]> {
  if (!isValidId(id)) return [];
  try {
    const raw = await fs.readFile(path.join(pollDir(id), "answers.jsonl"), "utf8");
    return raw.split("\n").filter(Boolean).map((line) => JSON.parse(line));
  } catch {
    return [];
  }
}

export function validShares(shares: unknown): shares is number[] {
  return (
    Array.isArray(shares) &&
    shares.length === LEVELS.length &&
    shares.every((n) => Number.isInteger(n) && n >= 0 && n <= 100) &&
    shares.reduce((a: number, b: number) => a + b, 0) === 100
  );
}

export async function addAnswer(id: string, shares: number[], comment = ""): Promise<"ok" | "closed" | "full"> {
  const poll = await getPoll(id);
  if (!poll || !isOpen(poll)) return "closed";
  if ((await getAnswers(id)).length >= MAX_ANSWERS) return "full";
  // Время округляем до дня, чтобы по нему нельзя было угадать, кто когда отвечал.
  const answer: Answer = { shares, at: new Date().toISOString().slice(0, 10) };
  const text = comment.trim().slice(0, MAX_COMMENT);
  if (text) answer.comment = text;
  await fs.appendFile(path.join(pollDir(id), "answers.jsonl"), JSON.stringify(answer) + "\n");
  return "ok";
}

// Итоги: средняя доля каждого уровня и «средний уровень» группы (1–7).
export function summarize(answers: Answer[]) {
  const n = answers.length;
  const avg = LEVELS.map((_, i) => (n ? answers.reduce((s, a) => s + a.shares[i], 0) / n : 0));
  const levelOf = (shares: number[]) => shares.reduce((s, v, i) => s + v * (i + 1), 0) / 100;
  const personal = answers.map((a) => levelOf(a.shares));
  const groupLevel = n ? personal.reduce((a, b) => a + b, 0) / n : 0;
  const spread = n ? Math.sqrt(personal.reduce((s, x) => s + (x - groupLevel) ** 2, 0) / n) : 0;
  return { n, avg, groupLevel, spread, personal };
}

// Вход в админку: один ключ из env, в cookie лежит только его HMAC.
export function adminToken() {
  const key = process.env.FORUM_ADMIN_KEY;
  if (!key) return null;
  return crypto.createHmac("sha256", key).update("forum-admin").digest("base64url");
}

export function checkAdminKey(input: string) {
  const key = process.env.FORUM_ADMIN_KEY;
  if (!key) return false;
  const a = Buffer.from(input);
  const b = Buffer.from(key);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}
