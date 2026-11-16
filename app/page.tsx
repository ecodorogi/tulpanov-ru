import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "./coming-soon.module.css";

// Заглушка на главной в новом стиле (как /dev-new): белый фон, Inter, синий, логотип.
const inter = Inter({ subsets: ["latin", "cyrillic"], variable: "--font-inter" });

export default function Home() {
  return (
    <div className={`${styles.page} ${inter.variable}`}>
      <h1 className={styles.name}>
        <Image
          src="/logo/logo-hybrid.png"
          alt="Александр Тюльпанов"
          width={986}
          height={500}
          sizes="(max-width: 500px) 78vw, 380px"
          className={styles.logo}
          priority
        />
      </h1>
      <div className={styles.portraitArea}>
        <svg className={styles.ring} viewBox="0 0 460 520" fill="none" aria-hidden="true">
          <path d="M93 37C259 -38 411 58 432 173C459 322 359 460 196 494C81 518 1 459 17 379" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
        </svg>
        <Image
          src="/alexander.jpg"
          alt=""
          width={650}
          height={722}
          sizes="180px"
          className={styles.portrait}
          priority
        />
      </div>
      <p className={styles.role}>Предприниматель · ретрит-тренер и модератор бизнес-форумов</p>
      <p className={styles.status}>Сайт готовится к запуску</p>
      <a href="https://t.me/tulpanov" target="_blank" rel="noreferrer" className={styles.link}>
        Написать в Telegram <span aria-hidden="true">→</span>
      </a>
    </div>
  );
}
