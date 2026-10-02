import Image from "next/image";
import styles from "./coming-soon.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <Image
        src="/alexander.jpg"
        alt="Александр Тюльпанов"
        width={80}
        height={88}
        className={styles.portrait}
        priority
      />
      <h1 className={styles.name}>Александр Тюльпанов</h1>
      <p className={styles.role}>Предприниматель · модератор бизнес-форумов</p>
      <p className={styles.status}>Сайт готовится к запуску</p>
      <a href="https://t.me/tulpanov" target="_blank" rel="noreferrer" className={styles.link}>
        Написать в Telegram →
      </a>
    </div>
  );
}
