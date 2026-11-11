import type { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { getPoll, isOpen, LEVELS } from "@/lib/forumPolls";
import ForumInfo from "./ForumInfo";
import VoteForm from "./VoteForm";
import s from "../forum.module.css";

export const metadata: Metadata = {
  title: "Уровень форума — анонимный опрос",
  robots: { index: false, follow: false },
};

export default async function PollPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const poll = await getPoll(id);
  if (!poll) notFound();

  const voted = (await cookies()).get(`fv_${id}`);

  return (
    <main className={s.page}>
      <p className={s.eyebrow}>Анонимный опрос · {poll.title}</p>
      <h1 className={s.title}>На каком уровне сейчас наш форум?</h1>

      {!isOpen(poll) ? (
        <p className={s.notice}>Опрос закрыт. Спасибо всем, кто ответил.</p>
      ) : voted ? (
        <p className={s.notice}>Ваш ответ уже учтён. Спасибо!</p>
      ) : (
        <>
          <p className={s.lead}>
            Распределите 100% между уровнями так, как вы ощущаете форум сейчас.
            Например: 70% — «Интересы» и 30% — «Решения». Ответ анонимный:
            не сохраняется ни имя, ни контакты, а итоги видит только модератор.
            Описания уровней — материалы Академии Модерации.
          </p>
          <ForumInfo />
          <VoteForm id={id} levels={LEVELS.map((l) => ({ ...l }))} />
        </>
      )}
    </main>
  );
}
