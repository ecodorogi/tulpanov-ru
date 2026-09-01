import VenuesSection from "../components/VenuesSection";
import styles from "./venues.module.css";

export const metadata = {
  title: "Площадки — Александр Тюльпанов",
  description:
    "Переговорки, рестораны с кабинками и загородные базы для форум-встреч и ретритов.",
};

export default function VenuesPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <a href="/" className={styles.back}>← Александр Тюльпанов</a>
      </header>
      <main className={styles.main}>
        <h1 className={styles.title}>Места для форумов и ретритов</h1>
        <p className={styles.lead}>
          Собираю проверенные площадки — переговорки в Москве, рестораны
          с отдельными кабинками и загородные базы для выездных ретритов.
        </p>
        <VenuesSection />
      </main>
    </div>
  );
}
