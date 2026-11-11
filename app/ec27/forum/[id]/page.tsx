import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ADMIN_PATH, isAdmin } from "@/lib/adminAuth";
import { getAnswers, getPoll, isOpen, LEVELS, summarize } from "@/lib/forumPolls";
import { close, extend, remove } from "../actions";
import CopyLink from "../CopyLink";
import s from "../../../f/forum.module.css";

export const metadata: Metadata = {
  title: "Итоги опроса",
  robots: { index: false, follow: false },
};

const fmt = (iso: string) =>
  new Date(iso).toLocaleString("ru-RU", { day: "numeric", month: "long", hour: "2-digit", minute: "2-digit", timeZone: "Europe/Moscow" });

export default async function ResultsPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ new?: string }>;
}) {
  if (!(await isAdmin())) return null;
  const { id } = await params;
  const { new: isNew } = await searchParams;
  const poll = await getPoll(id);
  if (!poll) notFound();

  const answers = await getAnswers(id);
  const { n, avg, groupLevel, spread, personal } = summarize(answers);
  const comments = answers
    .flatMap((a) => (a.comment ? [a.comment] : []))
    .map((c) => ({ c, k: Math.random() }))
    .sort((x, y) => x.k - y.k)
    .map(({ c }) => c);
  const url = `https://tulpanov.ru/f/${poll.id}`;
  const open = isOpen(poll);
  const nearest = LEVELS[Math.min(LEVELS.length - 1, Math.max(0, Math.round(groupLevel) - 1))];

  return (
    <main className={s.page}>
      <p className={s.eyebrow}>
        <Link href={`${ADMIN_PATH}/forum`}>← Все опросы</Link>
      </p>
      <h1 className={s.title}>{poll.title}</h1>

      {isNew && <p className={s.lead}>Ссылка готова - отправьте её в чат форум-группы.</p>}
      <div className={s.linkBox}>
        <code>{url}</code>
        <CopyLink url={url} />
      </div>

      <p className={`${s.status} ${open ? s.statusOpen : ""}`}>
        {open ? `Открыт до ${fmt(poll.expiresAt)}` : "Опрос закрыт"}
      </p>

      <div className={s.stats}>
        <div>
          <div className={s.statNum}>{n}</div>
          <div className={s.statLabel}>ответов</div>
        </div>
        {n > 0 && (
          <>
            <div>
              <div className={s.statNum}>{groupLevel.toFixed(1)}</div>
              <div className={s.statLabel}>средний уровень · ближе к «{nearest.name}»</div>
            </div>
            <div>
              <div className={s.statNum}>±{spread.toFixed(1)}</div>
              <div className={s.statLabel}>разброс мнений</div>
            </div>
          </>
        )}
      </div>

      {n > 0 && (
        <>
          <h2 className={s.h2}>Средняя доля по уровням</h2>
          <div className={s.bars}>
            {LEVELS.map((l, i) => (
              <div key={l.name} className={s.barRow}>
                <span>{i + 1}. {l.name}</span>
                <div className={s.barTrack}>
                  <div className={s.barFill} style={{ width: `${avg[i]}%` }} />
                </div>
                <span className={s.barValue}>{Math.round(avg[i])}%</span>
              </div>
            ))}
          </div>

          <h2 className={s.h2}>Ответы участников</h2>
          <p className={s.lead}>Анонимно, отсортированы по личному уровню (правая колонка), без порядка ответов.</p>
          <table className={s.table}>
            <thead>
              <tr>
                {LEVELS.map((_, i) => <th key={i}>{i + 1}</th>)}
                <th>Ур.</th>
              </tr>
            </thead>
            <tbody>
              {answers
                .map((a, i) => ({ a, level: personal[i] }))
                .sort((x, y) => x.level - y.level)
                .map(({ a, level }, i) => (
                  <tr key={i}>
                    {a.shares.map((v, j) => <td key={j}>{v ? `${v}%` : "·"}</td>)}
                    <td>{level.toFixed(1)}</td>
                  </tr>
                ))}
            </tbody>
          </table>

          {comments.length > 0 && (
            <>
              <h2 className={`${s.h2} ${s.commentsTitle}`}>Комментарии ({comments.length})</h2>
              <p className={s.lead}>Отдельно от ответов, в случайном порядке - чтобы комментарий нельзя было связать с распределением.</p>
              <ul className={s.comments}>
                {comments.map((c, i) => <li key={i}>{c}</li>)}
              </ul>
            </>
          )}
        </>
      )}

      <div className={s.actions}>
        {open ? (
          <form action={close.bind(null, poll.id)}><button className={s.small}>Закрыть опрос</button></form>
        ) : null}
        <form action={extend.bind(null, poll.id)}><button className={s.small}>Продлить на 3 дня</button></form>
        <form action={remove.bind(null, poll.id)}><button className={`${s.small} ${s.danger}`}>Удалить опрос и ответы</button></form>
      </div>
    </main>
  );
}
