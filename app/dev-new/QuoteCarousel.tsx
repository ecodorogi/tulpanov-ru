"use client";

import { useRef, useState } from "react";
import s from "./page.module.css";

// Цитаты в разделе «Отзывы». Первая - Сократ (была на сайте), остальные выбрал Александр (2026-11-17).
// Без автопрокрутки: стрелки, точки, свайп, клавиши ←/→.
const QUOTES = [
  { text: "Думай не о тех верных, которые восхваляют твои слова, а о тех, кто доброжелательно обличает твои недостатки", author: "Сократ" },
  { text: "Заговори, чтобы я тебя увидел", author: "Сократ" },
  { text: "Природа дала нам два уха и один рот, чтобы мы больше слушали и меньше говорили", author: "Зенон Китийский" },
  { text: "Не потому мы не решаемся, что трудно; потому трудно, что мы не решаемся", author: "Сенека" },
  { text: "Если человек не знает, к какой пристани держит путь, для него ни один ветер не будет попутным", author: "Сенека" },
  { text: "Если хочешь идти быстро - иди один. Если хочешь идти далеко - идите вместе", author: "Африканская пословица" },
];

export default function QuoteCarousel() {
  const [i, setI] = useState(0);
  const touchX = useRef<number | null>(null);
  const n = QUOTES.length;
  const go = (d: number) => setI((v) => (v + d + n) % n);

  return (
    <section
      className={s.quotes}
      aria-roledescription="карусель"
      aria-label="Цитаты"
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") go(-1);
        if (e.key === "ArrowRight") go(1);
      }}
      onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (dx < -40) go(1);
        else if (dx > 40) go(-1);
        touchX.current = null;
      }}
    >
      {/* Все цитаты лежат друг на друге: высота блока = самая длинная цитата, ничего не прыгает. */}
      <div className={s.quotesStack} aria-live="polite">
        {QUOTES.map((q, k) => (
          <blockquote
            key={q.text}
            className={`${s.quote} ${k === i ? s.quoteActive : ""}`}
            aria-hidden={k !== i}
            aria-roledescription="слайд"
            aria-label={`${k + 1} из ${n}`}
          >
            «{q.text}»
            <cite>- {q.author}</cite>
          </blockquote>
        ))}
      </div>
      <div className={s.quotesNav}>
        <button type="button" className={s.quotesArrow} onClick={() => go(-1)} aria-label="Предыдущая цитата">←</button>
        <div className={s.quotesDots}>
          {QUOTES.map((q, k) => (
            <button
              key={q.text}
              type="button"
              className={`${s.quotesDot} ${k === i ? s.quotesDotActive : ""}`}
              onClick={() => setI(k)}
              aria-label={`Цитата ${k + 1}`}
              aria-current={k === i ? "true" : undefined}
            />
          ))}
        </div>
        <button type="button" className={s.quotesArrow} onClick={() => go(1)} aria-label="Следующая цитата">→</button>
      </div>
    </section>
  );
}
