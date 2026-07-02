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
          <a href="#contact">Контакты</a>
        </nav>
      </header>

      <Reveal as="section" id="about" className={styles.hero}>
        <Image
          src="/alexander.jpg"
          alt="Александр Тюльпанов"
          width={132}
          height={146}
          className={styles.portrait}
          priority
        />
        <div>
          <h1>Спокойно. Основательно. По делу.</h1>
          <p>
            Социальный предприниматель и сертифицированный модератор форум-групп
            и ретрит-тренер (Академия модерации), выпускник программы
            «Практикум 27» Бизнес-школы СКОЛКОВО (2023). 15+ лет создаю и
            масштабирую бизнесы в России и Европе, последние годы — также веду
            форумы и ретриты в ведущих бизнес-клубах: «Атланты», «Клуб Первых»,
            «Основатели», «Эквиум».
          </p>
          <a href="#contact" className={styles.cta}>
            Написать →
          </a>
        </div>
      </Reveal>

      <Reveal as="section" id="projects" className={styles.section}>
        <p className={styles.kicker}>Проекты</p>
        <div className={styles.list}>
          <div className={styles.row}>
            <span className={styles.rowTitle}>Природные дороги</span>
            <p>
              Социальный проект: сеть природных дорог рядом с городами для ЗОЖ,
              туризма и устойчивого развития территорий. Пилот — «Дорога в
              Лавру» (Москва и область).{" "}
              <a href="https://ecodorogi.ru" target="_blank" rel="noreferrer">
                ecodorogi.ru
              </a>
            </p>
          </div>
          <div className={styles.row}>
            <span className={styles.rowTitle}>Кути Катай</span>
            <p>
              Управляющий партнёр и CEO (2021–2025) — сеть прокатов и
              аттракционов в парках Москвы и области, лидер рынка проката в
              регионе.{" "}
              <a href="https://kutikatai.ru" target="_blank" rel="noreferrer">
                kutikatai.ru
              </a>
            </p>
          </div>
          <div className={styles.row}>
            <span className={styles.rowTitle}>Watchsport.ru</span>
            <p>
              Основатель и CEO — B2B/B2C-дистрибуция умных устройств в России
              и Германии. Продал бренд корпорации Garmin (2021).
            </p>
          </div>
        </div>
      </Reveal>

      <Reveal as="section" id="forum-groups" className={`${styles.section} ${styles.sectionMuted}`}>
        <h2>Форум-группы и ретриты</h2>
        <p className={styles.lead}>
          С 2021 года — модератор форум-групп и ретрит-тренер. Резидент форум-
          группы 31 «Процветание» в бизнес-клубе «Атланты» (с 2020 года).
          Работаю с групповой динамикой, разрешением конфликтов и созданием
          среды для прорывных решений — для топ-менеджеров и собственников
          бизнеса, а также с детскими форум-группами.
        </p>
        <p className={styles.lead}>
          Результат для группы: снижение текучести, рост вовлечённости,
          разрешение скрытых конфликтов и переход обсуждений на новый уровень
          глубины.
        </p>
        <a href="#contact" className={styles.link}>
          Обсудить форум-группу или ретрит →
        </a>
      </Reveal>

      <Reveal as="section" id="contact" className={styles.contact}>
        <div>
          <h2>Связаться</h2>
          <p className={styles.lead}>
            <a href="mailto:a.tulpanov@gmail.com">a.tulpanov@gmail.com</a>
            {" · "}
            <a href="https://t.me/tulpanov" target="_blank" rel="noreferrer">
              @tulpanov
            </a>
          </p>
        </div>
        <span className={styles.domain}>tulpanov.ru</span>
      </Reveal>
    </div>
  );
}
