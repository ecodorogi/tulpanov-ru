"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./Reviews.module.css";

const images = [
  "img_2533","img_2534","img_2535","img_2536","img_2537","img_2538",
  "img_2539","img_2540","img_2541","img_2542","img_2543","img_2544",
  "img_2545","img_2546","img_2561","img_2600",
];

export default function Reviews() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <>
      <div className={styles.grid}>
        {images.map((name) => (
          <button
            key={name}
            className={styles.thumb}
            onClick={() => setActive(name)}
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

      {active && (
        <div className={styles.overlay} onClick={() => setActive(null)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button className={styles.close} onClick={() => setActive(null)} aria-label="Закрыть">×</button>
            <Image
              src={`/reviews/${active}.jpg`}
              alt="Отзыв"
              width={600}
              height={900}
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </div>
        </div>
      )}
    </>
  );
}
