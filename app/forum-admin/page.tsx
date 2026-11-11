import type { Metadata } from "next";
import Link from "next/link";
import { getAnswers, isOpen, listPolls } from "@/lib/forumPolls";
import { isAdmin } from "./auth";
import { create, login, logout } from "./actions";
import s from "../f/forum.module.css";

export const metadata: Metadata = {
  title: "Опросы форумов",
  robots: { index: false, follow: false },
};

const fmt = (iso: string) =>
  new Date(iso).toLocaleString("ru-RU", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit", timeZone: "Europe/Moscow" });

export default async function AdminPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;

  if (!(await isAdmin())) {
    return (
      <main className={s.page}>
        <h1 className={s.title}>Опросы форумов</h1>
        <form action={login} className={s.form}>
          <label className={s.field}>
            Ключ доступа
            <input name="key" type="password" autoComplete="current-password" required />
          </label>
          <button className={s.submit}>Войти</button>
        </form>
        {error && <p className={s.error}>Неверный ключ.</p>}
      </main>
    );
  }

  const polls = await listPolls();
  const counts = await Promise.all(polls.map((p) => getAnswers(p.id).then((a) => a.length)));

  return (
    <main className={s.page}>
      <p className={s.eyebrow}>Только для модератора</p>
      <h1 className={s.title}>Опросы форумов</h1>

      <form action={create} className={s.form}>
        <label className={s.field}>
          Форум-группа
          <input name="title" placeholder="Например, Атланты 31" maxLength={120} required />
        </label>
        <label className={s.field}>
          Ссылка действует
          <select name="days" defaultValue="3">
            <option value="1">1 день</option>
            <option value="3">3 дня</option>
            <option value="7">7 дней</option>
            <option value="14">14 дней</option>
          </select>
        </label>
        <button className={s.submit}>Создать ссылку</button>
      </form>

      {polls.length === 0 ? (
        <p className={s.lead}>Пока нет ни одного опроса.</p>
      ) : (
        <table className={s.table}>
          <thead>
            <tr>
              <th>Группа</th>
              <th>Ответов</th>
              <th>Создан</th>
              <th>Статус</th>
            </tr>
          </thead>
          <tbody>
            {polls.map((p, i) => (
              <tr key={p.id}>
                <td><Link href={`/forum-admin/${p.id}`}>{p.title}</Link></td>
                <td>{counts[i]}</td>
                <td>{fmt(p.createdAt)}</td>
                <td className={`${s.status} ${isOpen(p) ? s.statusOpen : ""}`}>
                  {isOpen(p) ? `открыт до ${fmt(p.expiresAt)}` : "закрыт"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <form action={logout} className={s.actions}>
        <button className={s.small}>Выйти</button>
      </form>
    </main>
  );
}
