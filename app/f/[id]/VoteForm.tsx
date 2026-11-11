"use client";

import { useState, useTransition } from "react";
import { submitVote, type VoteResult } from "../actions";
import Done from "./Done";
import s from "../forum.module.css";

type Level = { name: string; year: string; text: string; note: string };

const MESSAGES: Record<Exclude<VoteResult, "ok">, string> = {
  closed: "Опрос уже закрыт.",
  full: "Опрос набрал максимум ответов.",
  invalid: "Сумма должна быть ровно 100%.",
  already: "С этого устройства ответ уже отправлен.",
};

export default function VoteForm({ id, levels }: { id: string; levels: Level[] }) {
  const [shares, setShares] = useState<number[]>(() => levels.map(() => 0));
  const [comment, setComment] = useState("");
  const [result, setResult] = useState<VoteResult | null>(null);
  const [pending, startTransition] = useTransition();

  const total = shares.reduce((a, b) => a + b, 0);
  const left = 100 - total;

  // Значение уровня не может уйти за остаток: сумма никогда не превысит 100.
  // Новое значение считается от актуального состояния: быстрые нажатия «+» не теряются.
  const set = (i: number, value: (current: number) => number) => {
    setShares((prev) => {
      const others = prev.reduce((a, b, j) => (j === i ? a : a + b), 0);
      const v = Math.max(0, Math.min(100 - others, Math.round(value(prev[i]))));
      return prev.map((x, j) => (j === i ? v : x));
    });
  };

  const submit = () =>
    startTransition(async () => {
      setResult(await submitVote(id, shares, comment));
      window.scrollTo({ top: 0 });
    });

  if (result === "ok") return <Done />;

  return (
    <div>
      <ol className={s.levels}>
        {levels.map((l, i) => (
          <li key={l.name} className={`${s.level} ${shares[i] > 0 ? s.levelActive : ""}`}>
            <div className={s.levelHead}>
              <span className={s.levelNum}>{i + 1}</span>
              <div className={s.levelInfo}>
                <span className={s.levelName}>{l.name}</span>
                <span className={s.levelYear}>обычно {l.year}</span>
              </div>
              <div className={s.stepper}>
                <button type="button" onClick={() => set(i, (v) => v - 10)} aria-label={`Уменьшить «${l.name}»`}>−</button>
                <span className={s.value}>{shares[i]}%</span>
                <button type="button" onClick={() => set(i, (v) => v + 10)} aria-label={`Увеличить «${l.name}»`}>+</button>
              </div>
            </div>
            <p className={s.levelText}>{l.text}</p>
            <p className={s.levelNote}>{l.note}</p>
            <input
              type="range"
              min={0}
              max={100}
              step={5}
              value={shares[i]}
              onChange={(e) => { const v = Number(e.target.value); set(i, () => v); }}
              className={s.range}
              aria-label={`Доля уровня «${l.name}»`}
            />
          </li>
        ))}
      </ol>

      <label className={s.comment}>
        <span>Комментарий для модератора <em>- необязательно</em></span>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          maxLength={1000}
          rows={4}
          placeholder="Если хотите что-то добавить - напишите здесь. Комментарий тоже анонимный."
        />
      </label>

      <div className={s.footerBar}>
        <div className={s.total}>
          <div className={s.totalBar}>
            <div style={{ width: `${total}%` }} />
          </div>
          <span>
            {left === 0 ? "Распределено 100%" : `Осталось: ${left}%`}
          </span>
        </div>
        <button type="button" className={s.submit} disabled={left !== 0 || pending} onClick={submit}>
          {pending ? "Отправляю…" : <>Отправить<span className={s.wide}> анонимно</span></>}
        </button>
        {result && <p className={s.error}>{MESSAGES[result]}</p>}
      </div>
    </div>
  );
}
