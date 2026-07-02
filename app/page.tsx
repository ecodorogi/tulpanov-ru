import Image from "next/image";
import Reveal from "./components/Reveal";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <header className={styles.nav}>
        <span className={styles.navName}>Александр Тюльпанов</span>
        <nav className={styles.navLinks}>
          <a href="#about">О себе</a>
          <a href="#projects">Проекты</a>
          <a href="#forum-groups">Форум-группы</a>
          <a href="#sport">Спорт</a>
          <a href="#contact">Контакты</a>
        </nav>
      </header>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroMeta}>
          <Image
            src="/alexander.jpg"
            alt="Александр Тюльпанов"
            width={96}
            height={106}
            className={styles.portrait}
            priority
          />
          <div>
            <h1 className={styles.heroName}>Александр Тюльпанов</h1>
            <p className={styles.heroRole}>Предприниматель · модератор бизнес-форумов</p>
          </div>
        </div>
      </section>

      {/* О себе */}
      <Reveal as="section" id="about" className={styles.section}>
        <p className={styles.body}>
          Строю бизнесы и веду форум-группы — одно помогает понимать второе.
          15 лет в предпринимательстве: запускал проекты в России и Германии,
          вывел бренд умных устройств и продал его корпорации Garmin. Сейчас
          развиваю социальный проект «Природные дороги» и работаю модератором
          форум-групп в ведущих бизнес-клубах страны.
        </p>
        <p className={styles.body}>
          Выпускник программы «Практикум 27» Бизнес-школы СКОЛКОВО (2023).
          Сертифицированный ретрит-тренер Академии модерации. Резидент
          бизнес-клуба «Атланты» с 2020 года.
        </p>
      </Reveal>

      {/* Проекты */}
      <Reveal as="section" id="projects" className={`${styles.section} ${styles.sectionMuted}`}>
        <h2>Проекты</h2>
        <div className={styles.list}>
          <div className={styles.projectRow}>
            <div className={styles.projectHead}>
              <span className={styles.projectTitle}>Природные дороги</span>
              <a href="https://ecodorogi.ru" target="_blank" rel="noreferrer" className={styles.projectLink}>ecodorogi.ru →</a>
            </div>
            <p>
              Сеть экологических дорог рядом с городами — для ЗОЖ, туризма и
              устойчивого развития территорий. Пилот «Дорога в Лавру» (Москва
              и область). Реализован при участии региональных администраций и
              министерств.
            </p>
          </div>
          <div className={styles.projectRow}>
            <div className={styles.projectHead}>
              <span className={styles.projectTitle}>Кути Катай</span>
              <a href="https://kutikatai.ru" target="_blank" rel="noreferrer" className={styles.projectLink}>kutikatai.ru →</a>
            </div>
            <p>
              Лидер рынка проката и аттракционов в парках Москвы и области.
              CEO и управляющий партнёр, 2021–2025.
            </p>
          </div>
          <div className={styles.projectRow}>
            <div className={styles.projectHead}>
              <span className={styles.projectTitle}>Watchsport.ru</span>
              <span className={styles.projectBadge}>Экзит → Garmin</span>
            </div>
            <p>
              B2B/B2C-дистрибуция умных устройств в России и Германии.
              Основатель и CEO. Продал бренд корпорации Garmin в 2021 году.
            </p>
          </div>
        </div>
      </Reveal>

      {/* Форум-группы */}
      <Reveal as="section" id="forum-groups" className={styles.section}>
        <h2>Форум-группы и ретриты</h2>
        <p className={styles.body}>
          Форум-группа — это закрытый круг предпринимателей, где можно
          говорить честно: о том, что реально происходит в бизнесе и жизни,
          без фасада. Я веду такие группы с 2021 года в клубах «Атланты»,
          «Клуб Первых», «Основатели», «Эквиум» и других.
        </p>
        <p className={styles.body}>
          Модератор — не коуч и не терапевт. Я создаю среду, в которой
          участники сами находят решения: через глубину обсуждения, доверие
          и групповую динамику. Также провожу выездные ретриты.
        </p>

        {/* Отзывы — заглушка, будет заполнено скриншотами */}
        <div className={styles.testimonials}>
          <p className={styles.testimonialsHint}>← скриншоты отзывов появятся здесь</p>
        </div>

        <a href="#contact" className={styles.link}>Обсудить участие →</a>
      </Reveal>

      {/* Спорт */}
      <Reveal as="section" id="sport" className={`${styles.section} ${styles.sectionMuted}`}>
        <h2>Спорт</h2>

        {/* Фото спорта — заглушка */}
        <div className={styles.sportPhotoPlaceholder}>
          <span>← фото с гонки</span>
        </div>

        <p className={styles.body}>
          Бегаю ультра-трейл. Максимальная дистанция — 109,5 км.
        </p>
      </Reveal>

      {/* Контакты */}
      <Reveal as="section" id="contact" className={styles.contact}>
        <div>
          <h2>Связаться</h2>
          <p className={styles.contactLinks}>
            <a href="https://t.me/tulpanov" target="_blank" rel="noreferrer">Telegram @tulpanov</a>
            {" · "}
            <a href="mailto:a.tulpanov@gmail.com">a.tulpanov@gmail.com</a>
          </p>
        </div>
        <span className={styles.domain}>tulpanov.ru</span>
      </Reveal>
    </div>
  );
}
