import Link from "next/link";
import { ADMIN_PATH, isAdmin } from "@/lib/adminAuth";
import { listPolls, isOpen } from "@/lib/forumPolls";
import s from "../f/forum.module.css";

export default async function AdminHome() {
  if (!(await isAdmin())) return null;
  const polls = await listPolls();
  const open = polls.filter(isOpen).length;

  // Новые разделы админки добавляются сюда карточкой и в меню в layout.tsx.
  const sections = [
    {
      href: `${ADMIN_PATH}/forum`,
      title: "Опросы форумов",
      text: "Анонимный опрос «на каком уровне сейчас форум»: уникальные ссылки для групп и итоги.",
      meta: `${polls.length} опросов · ${open} открыто`,
    },
  ];

  return (
    <main className={s.page}>
      <p className={s.eyebrow}>tulpanov.ru</p>
      <h1 className={s.title}>Админка</h1>
      <div className={s.tiles}>
        {sections.map((x) => (
          <Link key={x.href} href={x.href} className={s.tile}>
            <span className={s.tileTitle}>{x.title}</span>
            <span className={s.tileText}>{x.text}</span>
            <span className={s.status}>{x.meta}</span>
          </Link>
        ))}
      </div>
    </main>
  );
}
