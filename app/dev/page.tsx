"use client";

import Image from "next/image";
import { useEffect } from "react";
import Reviews from "../components/Reviews";
import s from "./page.module.css";

export default function Dev() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e, i) => {
          if (e.isIntersecting) {
            setTimeout(() => e.target.classList.add("visible"), i * 80);
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      {/* NAV */}
      <nav className={s.nav}>
        <a className={s.navLogo} href="#">Тюльпанов А.С.</a>
        <ul className={s.navLinks}>
          <li><a href="#about">Обо мне</a></li>
          <li><a href="#services">Услуги</a></li>
          <li><a href="#reviews">Отзывы</a></li>
          <li><a href="#eco">Ecodorogi</a></li>
          <li><a href="#projects">Проекты</a></li>
          <li><a href="#sport">Спорт</a></li>
          <li><a href="#contact">Контакты</a></li>
        </ul>
      </nav>

      {/* HERO */}
      <section className={s.hero} id="home">
        <div className={s.heroLeft}>
          <p className={s.heroEyebrow}>tulpanov.ru</p>
          <h1 className={s.heroName}>
            Александр<br />
            <em>Тюльпанов</em>
          </h1>
          <p className={s.heroDesc}>
            Предприниматель, сертифицированный модератор и ретрит-тренер.
            С 2021 года работаю с форум-группами в бизнес-клубах России:
            Атланты, Клуб Первых, Эквиум, Основатели и других.
          </p>
          <a href="#contact" className={s.heroCta}>Связаться →</a>
        </div>
        <div className={s.heroRight}>
          <div className={s.heroPhotoWrap}>
            <Image
              src="/alexander.jpg"
              alt="Александр Тюльпанов"
              width={600}
              height={380}
              className={s.heroPhoto}
              priority
            />
          </div>
          <div className={s.heroStats}>
            <div className={s.stat}>
              <div className={s.statNum}>15+</div>
              <div className={s.statLabel}>Лет в бизнесе</div>
            </div>
            <div className={s.stat}>
              <div className={s.statNum}>2021</div>
              <div className={s.statLabel}>Старт модерации</div>
            </div>
            <div className={s.stat}>
              <div className={s.statNum}>109</div>
              <div className={s.statLabel}>км — личный рекорд</div>
            </div>
            <div className={s.stat}>
              <div className={s.statNum}>5+</div>
              <div className={s.statLabel}>Бизнес-клубов РФ</div>
            </div>
          </div>
          <div className={s.heroTags}>
            {["Форум-ретриты", "Модерация", "Консультации", "Бизнес-клубы", "Ультра-трейл"].map((t) => (
              <span key={t} className={s.tag}>{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className={s.sectionCard}>
        <div className={`${s.sectionHeader} reveal`}>
          <span className={s.sectionNum}>01</span>
          <h2 className={s.sectionTitle}>Обо мне и опыт</h2>
        </div>
        <div className={s.aboutGrid}>
          <div className={`${s.aboutLead} reveal`}>
            Работаю на стыке <em>предпринимательства, диалога</em> и природы —
            там, где рождаются настоящие решения и меняются люди.
          </div>
          <div className={`${s.aboutBody} reveal`}>
            <div className={s.aboutPhotoWrap}>
              <Image
                src="/alexander.jpg"
                alt="Александр Тюльпанов"
                width={160}
                height={200}
                className={s.aboutPhoto}
              />
            </div>
            <p>
              Сертифицированный модератор и ретрит-тренер <strong>Академии Модерации</strong>.
              Социальный предприниматель — основатель проекта «Природные дороги» (ecodorogi.ru).
              С 2021 года провожу форумы и ретриты в ведущих бизнес-клубах России.
            </p>
            <p>
              Резидент (форум-группа 31/Процветание) и лидер спортивного клуба в
              бизнес-клубе «Атланты» с 2020 года. Работаю с командами в Атланты,
              Клуб Первых, Основатели, Эквиум, Эталон и других.
            </p>
            <p>
              Серийный предприниматель с 15+ годами опыта: экзит из Watchsport.ru
              (продажа Garmin, 2021), управляющий партнёр Кути Катай, опыт в Германии.
              Образование: <strong>Сколково</strong> (Практикум 27, 2023).
            </p>
          </div>
        </div>
      </section>

      {/* CERTS */}
      <section id="certs" className={s.section}>
        <div className={`${s.sectionHeader} reveal`}>
          <span className={s.sectionNum}>02</span>
          <h2 className={s.sectionTitle}>Сертификаты и дипломы</h2>
        </div>
        <div className={`${s.certsGrid} reveal`}>
          <div className={s.certCard}>
            <Image
              src="/cert-moderation.webp"
              alt="Удостоверение Академии Модерации"
              width={480}
              height={340}
              className={s.certImg}
            />
            <p className={s.certCaption}>
              Мастер организации групповой работы · Ретрит для бизнес-форума · Академия Модерации, 2025
            </p>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className={s.section}>
        <div className={`${s.sectionHeader} reveal`}>
          <span className={s.sectionNum}>03</span>
          <h2 className={s.sectionTitle}>Услуги</h2>
        </div>
        <div className={s.servicesGrid}>
          <div className={`${s.serviceCard} reveal`}>
            <span className={s.serviceNum}>01</span>
            <h3 className={s.serviceName}>Форум-ретриты</h3>
            <p className={s.serviceDesc}>
              Выездные мероприятия для бизнес-клубов и команд. Природная среда,
              структурированный диалог, глубокая работа с групповой динамикой.
              Результат: общая цель, снятие конфликтов, прорывные решения.
            </p>
            <a href="https://t.me/tulpanov" target="_blank" rel="noreferrer" className={s.serviceLink}>
              Обсудить →
            </a>
          </div>
          <div className={`${s.serviceCard} reveal`}>
            <span className={s.serviceNum}>02</span>
            <h3 className={s.serviceName}>Модерация форум-групп</h3>
            <p className={s.serviceDesc}>
              Веду форум-группы предпринимателей на регулярной основе: Атланты,
              Клуб Первых, Эквиум, Основатели, Эталон и другие клубы.
              Создаю среду, где каждый участник слышит и слышан.
            </p>
            <a href="https://t.me/tulpanov" target="_blank" rel="noreferrer" className={s.serviceLink}>
              Обсудить →
            </a>
          </div>
          <div className={`${s.serviceCard} reveal`}>
            <span className={s.serviceNum}>03</span>
            <h3 className={s.serviceName}>Стратегическая сессия</h3>
            <p className={s.serviceDesc}>Один разговор, одна задача, план на 30 дней.</p>
            <details className={s.serviceMore}>
              <summary>Подробнее и стоимость</summary>
              <div className={s.serviceMoreBody}>
                <p><strong>Что это.</strong> 60 минут один на один. Приносите одну задачу: запуск, рост, команда, конфликт или выбор следующего шага.</p>
                <p><strong>Стоимость.</strong> 30 000 ₽ за час. Первое знакомство — 20 минут бесплатно.</p>
                <p><strong>Формат.</strong> Онлайн или очно в Москве.</p>
              </div>
            </details>
            <a
              href="https://t.me/tulpanov?text=Хочу%20записаться%20на%20стратегическую%20сессию"
              target="_blank"
              rel="noreferrer"
              className={s.serviceLink}
            >
              Записаться →
            </a>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className={s.sectionCard}>
        <div className={`${s.sectionHeader} reveal`}>
          <span className={s.sectionNum}>04</span>
          <h2 className={s.sectionTitle}>Отзывы участников</h2>
        </div>
        <blockquote className={`${s.quote} reveal`}>
          «Думай не о тех верных, которые восхваляют твои слова, а о тех,
          кто доброжелательно обличает твои недостатки»
          <cite>— Сократ</cite>
        </blockquote>
        <div className="reveal">
          <Reviews />
          <a href="/venues" className={s.serviceLink}>
            Площадки для встреч и ретритов →
          </a>
        </div>
      </section>

      {/* ECO PROJECT */}
      <section id="eco" className={s.sectionEco}>
        <div className={`${s.sectionHeader} ${s.sectionHeaderEco} reveal`}>
          <span className={s.sectionNum}>05</span>
          <h2 className={s.sectionTitle}>Проект Ecodorogi.ru</h2>
        </div>
        <div className={s.ecoInner}>
          <div className={`${s.ecoLeft} reveal`}>
            <Image
              src="/eco-logo.png"
              alt="Природные дороги"
              width={120}
              height={48}
              className={s.ecoLogo}
            />
            <h3 className={s.ecoHeadline}>
              Социальное предпринимательство — природные дороги для людей
            </h3>
            <p className={s.ecoText}>
              Мой главный проект — <strong>«Природные дороги»</strong>: создание сети доступных
              маршрутов вблизи городов. Реализуем совместно с государством.
            </p>
            <div className={s.ecoLinks}>
              <a href="https://ecodorogi.ru" target="_blank" rel="noreferrer" className={s.ecoLink}>ecodorogi.ru →</a>
              <a href="https://dorogavposad.ru" target="_blank" rel="noreferrer" className={s.ecoLink}>dorogavposad.ru →</a>
            </div>
          </div>
          <div className={`${s.ecoRight} reveal`}>
            {[
              { title: "Миссия", text: "Сеть природных дорог вблизи городов — доступных, безопасных и живых" },
              { title: "Флагманский проект", text: "«Дорога в Лавру» — маршрут к Троице-Сергиевой лавре в Сергиевом Посаде" },
              { title: "GR-опыт", text: "Реализация проекта совместно с государством" },
            ].map((f) => (
              <div key={f.title} className={s.ecoFeature}>
                <div className={s.ecoFeatureTitle}>{f.title}</div>
                <div className={s.ecoFeatureText}>{f.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className={s.section}>
        <div className={`${s.sectionHeader} reveal`}>
          <span className={s.sectionNum}>06</span>
          <h2 className={s.sectionTitle}>Проекты</h2>
        </div>
        <div className={`${s.servicesGrid} ${s.projectsGrid}`}>
          <div className={`${s.serviceCard} reveal`}>
            <span className={s.serviceNum}>CEO · 2021–2025</span>
            <h3 className={s.serviceName}>Кути Катай</h3>
            <p className={s.serviceDesc}>
              Лидер рынка проката и аттракционов в парках Москвы и области.
            </p>
            <a href="https://kutikatai.ru" target="_blank" rel="noreferrer" className={s.serviceLink}>
              kutikatai.ru →
            </a>
          </div>
          <div className={`${s.serviceCard} reveal`}>
            <span className={s.serviceNum}>Экзит → Garmin</span>
            <h3 className={s.serviceName}>Watchsport.ru</h3>
            <p className={s.serviceDesc}>
              B2B/B2C-дистрибуция умных устройств в России и Германии.
              Основатель и CEO. Продал бренд корпорации Garmin в 2021 году.
            </p>
          </div>
        </div>
      </section>

      {/* SPORT */}
      <section id="sport" className={s.sectionCard}>
        <div className={`${s.sectionHeader} reveal`}>
          <span className={s.sectionNum}>07</span>
          <h2 className={s.sectionTitle}>Спорт</h2>
        </div>
        <div className={s.sportInner}>
          <div className={`${s.sportLeft} reveal`}>
            <h3 className={s.sportHeadline}>
              Ультра-трейл —<br /><em>движение как философия</em>
            </h3>
            <p className={s.sportText}>
              Бегаю ультра-трейлы — дистанции от 50 км по горным тропам.
              Личный рекорд: <strong>109,5 км</strong>. Люблю горный трекинг.
            </p>
            <p className={s.sportText}>
              Многочасовые забеги учат тому же, чему и хорошая групповая работа:
              слушать себя, не бросать, находить ресурс там, где его, казалось, уже нет.
            </p>
            <p className={s.sportText}>
              Лидер <strong>спортивного клуба</strong> в бизнес-клубе «Атланты».
            </p>
          </div>
          <div className={`${s.sportRight} reveal`}>
            <div className={s.sportPhotos}>
              <Image src="/sport-1.webp" alt="Ультра-трейл — брод реки" width={400} height={280} className={s.sportPhoto} />
              <Image src="/sport-3.webp" alt="Перевал Торонг-Ла" width={400} height={280} className={s.sportPhoto} />
              <Image src="/sport-2.webp" alt="Ультра-трейл — лес" width={400} height={280} className={s.sportPhoto} />
            </div>
            <div className={s.sportFacts}>
              {[
                ["Дисциплина", "Ультра-трейл"],
                ["Личный рекорд", "109,5 км"],
                ["Трекинг", "5416 м, Непал"],
                ["Клуб", "Атланты"],
              ].map(([label, value]) => (
                <div key={label} className={s.sportFact}>
                  <span className={s.sportFactLabel}>{label}</span>
                  <span className={s.sportFactValue}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className={s.section}>
        <div className={`${s.sectionHeader} reveal`}>
          <span className={s.sectionNum}>08</span>
          <h2 className={s.sectionTitle}>Контакты</h2>
        </div>
        <div className={s.contactInner}>
          <div className={`${s.contactLead} reveal`}>
            Есть идея для ретрита,<br />
            нужен модератор<br />
            для форум-группы<br />
            или хотите <em>поговорить</em> —<br />
            напишите мне.
          </div>
          <div className={`${s.contactChannels} reveal`}>
            {[
              { href: "https://t.me/tulpanov", label: "Telegram", value: "@tulpanov" },
              { href: "mailto:a.tulpanov@gmail.com", label: "Email", value: "a.tulpanov@gmail.com" },
              { href: "tel:+79161429848", label: "Телефон", value: "+7 916 142-98-48" },
              { href: "https://ecodorogi.ru", label: "Проект", value: "ecodorogi.ru" },
            ].map(({ href, label, value }) => (
              <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noreferrer" : undefined}
                className={s.contactRow}>
                <span className={s.contactChannel}>{label}</span>
                <span className={s.contactValue}>{value}</span>
                <span className={s.contactArrow}>→</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className={s.footer}>
        <span className={s.footerName}>Тюльпанов Александр Сергеевич</span>
        <span className={s.footerDomain}>tulpanov.ru · 2026</span>
      </footer>
    </>
  );
}
