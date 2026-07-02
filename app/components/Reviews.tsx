"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import styles from "./Reviews.module.css";

const images = [
  "img_2533","img_2534","img_2535","img_2536","img_2537","img_2538",
  "img_2539","img_2540","img_2541","img_2542","img_2543","img_2544",
  "img_2545","img_2546","img_2561","img_2600",
];

export default function Reviews() {
  const [index, setIndex] = useState<number | null>(null);

  const prev = useCallback(() => {
    setIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length));
  }, []);

  const next = useCallback(() => {
    setIndex((i) => (i === null ? null : (i + 1) % images.length));
  }, []);

  const close = useCallback(() => setIndex(null), []);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, prev, next, close]);

  return (
    <>
      <div className={styles.grid}>
        {images.map((name, i) => (
          <button
            key={name}
            className={styles.thumb}
            onClick={() => setIndex(i)}
            aria-label="Открыть отзыв"
          >
            <Image
              src={`/reviews/${name}_thumb.jpg`}
              alt=""
              fill
              sizes="80px"
              style={{ objectFit: "cover", objectPosition: "top" }}
            />
          </button>
        ))}
      </div>

      {index !== null && (
        <div className={styles.overlay} onClick={close}>
          <button className={styles.navBtn} onClick={(e) => { e.stopPropagation(); prev(); }} aria-label="Предыдущий">‹</button>

          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button className={styles.close} onClick={close} aria-label="Закрыть">×</button>
            <Image
              src={`/reviews/${images[index]}.jpg`}
              alt="Отзыв"
              width={600}
              height={900}
              style={{ width: "100%", height: "auto", display: "block" }}
            />
            <p className={styles.counter}>{index + 1} / {images.length}</p>
          </div>

          <button className={styles.navBtn} onClick={(e) => { e.stopPropagation(); next(); }} aria-label="Следующий">›</button>
        </div>
      )}
    </>
  );
}
