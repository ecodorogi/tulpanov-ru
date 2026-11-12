import VenuesSection from "../components/VenuesSection";
import s from "../f/forum.module.css";

export const metadata = {
  title: "Площадки — Александр Тюльпанов",
  description:
    "Переговорки, рестораны с кабинками и загородные базы для форум-встреч и ретритов.",
};

// Оформление общее с опросом форумов (forum.module.css): один стиль для служебных страниц.
export default function VenuesPage() {
  return (
    <main className={s.page}>
      <a href="/" className={s.home}>← Александр Тюльпанов · tulpanov.ru</a>
      <p className={s.eyebrow}>Площадки</p>
      <h1 className={s.title}>Места для форумов и ретритов</h1>
      <p className={s.lead}>
        Собираю проверенные площадки - переговорки в Москве, рестораны
        с отдельными кабинками и загородные базы для выездных ретритов.
      </p>
      <VenuesSection />
    </main>
  );
}
