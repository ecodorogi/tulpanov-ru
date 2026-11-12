"use client";

import Image from "next/image";
import { useEffect } from "react";
import Reviews from "../components/Reviews";
import s from "./page.module.css";

// Бесплатная встреча-знакомство: главная кнопка сайта.
const MEET_URL =
  "https://t.me/tulpanov?text=" +
  encodeURIComponent("Здравствуйте! Хочу записаться на встречу-знакомство (30 минут).");

const CLUBS = ["Атланты", "Клуб Первых", "Эквиум", "Основатели", "Эталон", "Миллиард в бане"];

const SITUATIONS = [
  { text: "Форум буксует: встречи стали формальными, участники приходят «отметиться».", to: "#service-forum", service: "Модерация форум-групп" },
  { text: "В группе скрытое напряжение или конфликт, о котором не говорят вслух.", to: "#service-retreat", service: "Форум-ретрит" },
  { text: "Группе нужен перезапуск: новые участники, новые правила, общая цель на год.", to: "#service-retreat", service: "Форум-ретрит" },
  { text: "Партнёры перестали договариваться, важные решения откладываются.", to: "#service-director", service: "Независимый директор" },
  { text: "Собственник один на один с большим решением: сделка, смена руководителя, выход из операционки.", to: "#service-director", service: "Независимый директор" },
  { text: "Бизнес вырос, а управление осталось прежним - нужен честный взгляд со стороны.", to: "#service-director", service: "Независимый директор" },
];

// Виды ретритов: чтобы было видно, что ретрит бывает не только для форум-группы.
const RETREATS = [
  { name: "Форум-ретрит", text: "Для форум-группы: доверие, перезапуск, правила и общая цель на год." },
  { name: "Стратегический ретрит", text: "Для собственника и топ-команды: куда идём, кто за что отвечает, первые шаги." },
  { name: "Ретрит партнёров", text: "Для совладельцев: договориться о ролях, деньгах и будущем бизнеса." },
  { name: "Тематический ретрит", text: "Открытая группа 10–15 человек на одну тему: деньги, энергия и выгорание, семья и бизнес." },
  { name: "Ретрит в движении", text: "Горы, трекинг, природа: разговор, который получается только в пути." },
];

type Service = {
  id: string;
  num: string;
  name: string;
  rows: [string, string][];
  steps?: string[];
  price: string;
  cta: string;
  msg: string;
};

const SERVICES: Service[] = [
  {
    id: "service-retreat",
    num: "01",
    name: "Форум-ретриты",
    rows: [
      ["Для кого", "Форум-группы бизнес-клубов и команды собственников."],
      ["С чем работаю", "Напряжение и скрытые конфликты в группе, потеря доверия, перезапуск группы, общая цель на год."],
      ["Как проходит", "Созвоны и онлайн-диагностика заранее, затем 1–2 дня на выезде на природе: структурированный диалог и работа с групповой динамикой."],
      ["Результат", "Группа снова доверяет друг другу, договорённости на год и личные шаги каждого участника."],
    ],
    price: "от 210 000 ₽",
    cta: "Обсудить ретрит →",
    msg: "Здравствуйте! Хочу обсудить ретрит для форум-группы.",
  },
  {
    id: "service-forum",
    num: "02",
    name: "Модерация форум-групп",
    rows: [
      ["Для кого", "Форум-группы предпринимателей в бизнес-клубах: Атланты, Клуб Первых, Эквиум, Основатели, Эталон и другие."],
      ["С чем работаю", "Встречи стали формальными, нарушаются правила и конфиденциальность, участники перестали делиться главным."],
      ["Как проходит", "Регулярные встречи по стандартам Академии Модерации: подготовка, ведение, обратная связь группе."],
      ["Результат", "Форум, на который хочется приходить: каждый участник слышит и слышан."],
    ],
    price: "от 100 000 ₽",
    cta: "Обсудить модерацию →",
    msg: "Здравствуйте! Хочу обсудить модерацию форум-группы.",
  },
  {
    id: "service-director",
    num: "03",
    name: "Независимый директор",
    rows: [
      ["Для кого", "Собственники бизнеса, которым нужен взгляд со стороны без интересов внутри компании."],
      ["С чем работаю", "Стратегия, команда и руководители, разногласия партнёров, подготовка к сделкам, сложные решения."],
      ["Результат", "Решения принимаются вовремя, у собственника есть опора и честная обратная связь."],
    ],
    steps: [
      "Знакомство и стартовая сессия: цели собственника и бизнеса - бесплатно",
      "Встреча один на один - 2 часа, раз в 2 недели",
      "Связь между встречами по срочным вопросам",
    ],
    price: "300 000 ₽ в месяц",
    cta: "Обсудить →",
    msg: "Здравствуйте! Хочу обсудить независимого директора.",
  },
];

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
          <li><a href="#tasks">Задачи</a></li>
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
          <a href={MEET_URL} target="_blank" rel="noreferrer" className={s.heroCta}>
            Встреча-знакомство · 30 минут, бесплатно →
          </a>
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
              <div className={s.statNum}>2 000+</div>
              <div className={s.statLabel}>Часов модерации и ретритов</div>
            </div>
            <div className={s.stat}>
              <div className={s.statNum}>5 400+</div>
              <div className={s.statLabel}>м - два восхождения в горы</div>
            </div>
            <div className={s.stat}>
              <div className={s.statNum}>109</div>
              <div className={s.statLabel}>км - ультра-трейл</div>
            </div>
          </div>
          <div className={s.heroTags}>
            {["Форум-ретриты", "Модерация", "Консультации", "Бизнес-клубы", "Ультра-трейл"].map((t) => (
              <span key={t} className={s.tag}>{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* CLUBS */}
      <section className={s.clubs} aria-label="Бизнес-клубы">
        <span className={s.clubsLabel}>Работаю с клубами</span>
        <ul className={s.clubsList}>
          {CLUBS.map((c) => <li key={c}>{c}</li>)}
        </ul>
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

      {/* SITUATIONS */}
      <section id="tasks" className={s.sectionCard}>
        <div className={`${s.sectionHeader} reveal`}>
          <span className={s.sectionNum}>03</span>
          <h2 className={s.sectionTitle}>С чем ко мне приходят</h2>
        </div>
        <div className={s.situations}>
          {SITUATIONS.map((x) => (
            <a key={x.text} href={x.to} className={`${s.situation} reveal`}>
              <span className={s.situationText}>{x.text}</span>
              <span className={s.situationService}>{x.service} →</span>
            </a>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className={s.section}>
        <div className={`${s.sectionHeader} reveal`}>
          <span className={s.sectionNum}>04</span>
          <h2 className={s.sectionTitle}>Услуги</h2>
        </div>
        <div className={s.servicesGrid}>
          {SERVICES.map((x) => (
            <div key={x.id} id={x.id} className={`${s.serviceCard} reveal`}>
              <span className={s.serviceNum}>{x.num}</span>
              <h3 className={s.serviceName}>{x.name}</h3>
              <dl className={s.serviceRows}>
                {x.rows.slice(0, 2).map(([k, v]) => (
                  <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
                ))}
                {x.steps ? (
                  <div>
                    <dt>Как проходит</dt>
                    <dd>
                      <ol className={s.serviceSteps}>
                        {x.steps.map((st) => <li key={st}>{st}</li>)}
                      </ol>
                    </dd>
                  </div>
                ) : null}
                {x.rows.slice(2).map(([k, v]) => (
                  <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
                ))}
              </dl>
              <p className={s.servicePrice}>{x.price}</p>
              <a
                href={`https://t.me/tulpanov?text=${encodeURIComponent(x.msg)}`}
                target="_blank"
                rel="noreferrer"
                className={s.serviceLink}
              >
                {x.cta}
              </a>
            </div>
          ))}
        </div>
        <div className={`${s.retreats} reveal`}>
          <h3 className={s.retreatsTitle}>Какие бывают ретриты</h3>
          <ul className={s.retreatsList}>
            {RETREATS.map((r) => (
              <li key={r.name}>
                <span className={s.retreatName}>{r.name}</span>
                <span className={s.retreatText}>{r.text}</span>
              </li>
            ))}
          </ul>
        </div>
        <p className={`${s.servicesNote} reveal`}>
          Не знаете, что подходит? Начните со встречи-знакомства: 30 минут, бесплатно.{" "}
          <a href={MEET_URL} target="_blank" rel="noreferrer">Записаться →</a>
        </p>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className={s.sectionCard}>
        <div className={`${s.sectionHeader} reveal`}>
          <span className={s.sectionNum}>05</span>
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
          <span className={s.sectionNum}>06</span>
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
          <span className={s.sectionNum}>07</span>
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
          <span className={s.sectionNum}>08</span>
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
          <span className={s.sectionNum}>09</span>
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
              { href: MEET_URL, label: "Знакомство", value: "30 минут, бесплатно" },
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
