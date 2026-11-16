"use client";

import Image from "next/image";
import { useEffect, useState, type ReactNode } from "react";
import Reviews from "../components/Reviews";
import LegalLinks from "../components/LegalLinks";
import { CERT_CAPTION, MEET_URL } from "@/lib/siteContent";
import s from "./page.module.css";

// Вёрстка по макету tulpanov_claude_handoff (ChatGPT). Факты, цены и контакты - как на текущем сайте.

const NAV = [
  ["#about", "Обо мне"],
  ["#needs", "Задачи"],
  ["#services", "Услуги"],
  ["#retreats", "Ретриты"],
  ["#projects", "Проекты"],
  ["#sport", "Спорт"],
  ["#contacts", "Контакты"],
];

const tg = (text: string) => `https://t.me/tulpanov?text=${encodeURIComponent(text)}`;

const NEEDS = [
  { sign: "◌", title: "Форум буксует", text: "Встречи стали формальными, участники приходят «отметиться».", href: "#services", link: "Модерация и настройка форум-групп" },
  { sign: "⌁", title: "Скрытое напряжение", text: "В группе скрытое напряжение или конфликт, о котором не говорят вслух.", href: "#retreats", link: "Форум-ретрит" },
  { sign: "◎", title: "Нужна настройка группы", text: "Новые участники, новые правила, общая цель на год.", href: "#retreats", link: "Форум-ретрит" },
  { sign: "↗", title: "Решения собственника", text: "Партнёры перестали договариваться или бизнес вырос, а управление осталось прежним.", href: "#services", link: "Независимый директор" },
];

const SERVICES = [
  { sign: "◯", title: "Форум-ретриты", text: "Для форум-групп бизнес-клубов и команды собственников. Работа с конфликтами, доверием, общей целью.", cta: "Обсудить ретрит", msg: "Здравствуйте! Хочу обсудить ретрит для форум-группы." },
  { sign: "▤", title: "Модерация и настройка форум-групп", text: "Регулярные встречи по стандартам Академии Модерации: подготовка, ведение, обратная связь группе.", cta: "Обсудить модерацию", msg: "Здравствуйте! Хочу обсудить модерацию форум-группы." },
  { sign: "✧", title: "Независимый директор", text: "Для собственников бизнеса: стратегия, команда и руководители, разногласия партнёров, подготовка к сделкам. Встреча 2 часа раз в 2 недели, знакомство и стартовая сессия - бесплатно.", cta: "Обсудить", msg: "Здравствуйте! Хочу обсудить независимого директора." },
];

const RETREATS = [
  ["Форум-ретрит", "Для форум-группы: доверие, настройка группы, правила и общая цель на год."],
  ["Стратегический ретрит", "Для собственника и топ-команды: куда идём, кто за что отвечает, первые шаги."],
  ["Ретрит партнёров", "Для совладельцев: договориться о ролях, деньгах и будущем бизнеса."],
  ["Тематический ретрит", "Открытая группа 10–15 человек на одну тему: деньги, энергия и выгорание, семья и бизнес."],
  ["Ретрит в движении", "Горы, трекинг, природа: разговор, который получается только в пути."],
];

const CONTACTS = [
  { href: MEET_URL, label: "Знакомство", value: "30 минут, бесплатно" },
  { href: "https://t.me/tulpanov", label: "Telegram", value: "@tulpanov" },
  { href: "mailto:a.tulpanov@gmail.com", label: "Email", value: "a.tulpanov@gmail.com" },
  { href: "tel:+79161429848", label: "Телефон", value: "+7 916 142-98-48" },
];

const ext = (href: string) => (href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {});

// «Сертифицированный модератор…»: при наведении показывает удостоверение, по нажатию открывает его.
function CertLink({ children }: { children: ReactNode }) {
  return (
    <a href="/cert-moderation.webp" target="_blank" rel="noreferrer" className={s.certLink}>
      {children}
      <span className={s.certPreview} aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/cert-moderation.webp" alt="" loading="lazy" />
        <span>{CERT_CAPTION}</span>
      </span>
    </a>
  );
}

const Accent = ({ children }: { children: ReactNode }) => <span className={s.handAccent}>{children}</span>;

export default function DevNew() {
  const [menu, setMenu] = useState(false);
  // Вверху страницы логотип крупный, при прокрутке шапка уменьшается.
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menu) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenu(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menu]);

  return (
    <div className={s.page}>
      <a className={s.skipLink} href="#main">Перейти к содержимому</a>

      <header className={`${s.header} ${scrolled ? s.headerScrolled : ""}`} id="top">
        <div className={`${s.container} ${s.headerInner}`}>
          <a className={s.brand} href="#top" aria-label="На главную">
            <Image
              src="/logo/logo-hybrid.png"
              alt="Александр Тюльпанов"
              width={986}
              height={500}
              priority
              sizes="(max-width: 780px) 78vw, 520px"
              className={s.brandLogo}
            />
          </a>
          <button
            className={s.menuToggle}
            type="button"
            aria-label={menu ? "Закрыть меню" : "Открыть меню"}
            aria-controls="site-nav"
            aria-expanded={menu}
            onClick={() => setMenu((v) => !v)}
          >
            <span /><span /><span />
          </button>
          <nav className={`${s.nav} ${menu ? s.navOpen : ""}`} id="site-nav" aria-label="Основная навигация">
            {NAV.map(([href, label]) => (
              <a key={href} href={href} onClick={() => setMenu(false)}>{label}</a>
            ))}
          </nav>
        </div>
      </header>

      <main id="main">
        {/* ГЛАВНЫЙ ЭКРАН */}
        <section className={`${s.section} ${s.hero}`} aria-labelledby="hero-title">
          <div className={s.container}>
            <div className={s.heroLayout}>
              <div className={s.heroCopy}>
                <p className={s.eyebrow}>Предприниматель · Модератор · Независимый директор</p>
                <h1 id="hero-title" className={s.h1}>
                  Сложные разговоры.<br />
                  <span className={s.strokeUnderline}>Сильные решения.</span>
                </h1>
                <p className={s.heroDescription}>
                  Модерация форум-групп, ретриты и партнёрство для предпринимателей
                </p>
                <a href="#contacts" className={`${s.btn} ${s.btnPrimary}`}>
                  Обсудить задачу <span aria-hidden="true">→</span>
                </a>
              </div>
              <div className={s.portraitArea}>
                <div className={s.portraitWash} aria-hidden="true" />
                <Image
                  className={s.portrait}
                  src="/alexander.jpg"
                  alt="Александр Тюльпанов"
                  width={650}
                  height={722}
                  priority
                />
                <svg className={s.portraitCurve} viewBox="0 0 460 520" fill="none" aria-hidden="true">
                  <path d="M93 37C259 -38 411 58 432 173C459 322 359 460 196 494C81 518 1 459 17 379" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                </svg>
              </div>
            </div>

            <div className={s.achievementRow} aria-label="Опыт и достижения">
              <article className={s.achievement}>
                <span className={s.achievementIcon} aria-hidden="true">◷</span>
                <span><strong>15+</strong><small>лет в бизнесе</small></span>
              </article>
              <article className={s.achievement}>
                <span className={s.achievementIcon} aria-hidden="true">◎</span>
                <span><strong>2 000+</strong><small>часов модерации<br />форумов и ретритов</small></span>
              </article>
              <article className={`${s.achievement} ${s.achievementSport}`}>
                <div className={s.achievementSportHeading}>
                  <span className={s.achievementIcon} aria-hidden="true">↗</span>
                  <b>Горы и ультра-трейл</b>
                </div>
                <div className={s.sportFigures}>
                  <div><strong>5 400+ м</strong><small>два восхождения выше 5 400 м</small></div>
                  <div><strong>110 км</strong><small>несколько ультрагонок, в том числе на 110 км</small></div>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* 01 ОБО МНЕ */}
        <section className={s.section} id="about">
          <div className={`${s.container} ${s.sectionGrid}`}>
            <div>
              <p className={s.sectionIndex}>01 / Обо мне</p>
              <h2 className={s.h2}>Обо мне <Accent>и опыт</Accent></h2>
              <p className={s.lead}>
                Работаю на стыке предпринимательства, диалога и природы - там, где рождаются
                настоящие решения и меняются люди.
              </p>
            </div>
            <div className={s.paragraphStack}>
              <p>
                <CertLink>Сертифицированный модератор и ретрит-тренер форум-групп</CertLink>{" "}
                Академии Модерации. Социальный предприниматель - основатель проекта
                «Природные дороги» (ecodorogi.ru).
              </p>
              <p>
                Резидент бизнес-клуба «Атланты» и лидер его спортивного клуба. Сам уже 6-й год
                состою в форум-группе - знаю форум и как участник, и как модератор. С 2021 года
                провожу форумы и ретриты в ведущих бизнес-клубах России.
              </p>
              <p>
                Веду форумы в клубах «Атланты», «Клуб Первых», «Основатели», «Эквиум», «Эталон»,
                «Миллиард в бане» и в независимых форум-группах. С 2023 года модерирую детские
                форум-группы.
              </p>
              <p>
                Серийный предприниматель с опытом более 15 лет: экзит из Watchsport.ru (продажа
                Garmin, 2021), управляющий партнёр «Кути Катай», опыт работы в Германии.
                Образование: Сколково (Практикум 27, 2023).
              </p>
            </div>
          </div>

          {/* О себе: по-человечески, по примеру раздела «Человек» на tildikov.ru */}
          <div className={`${s.container} ${s.personal}`}>
            <div className={s.personalHead}>
              <h3 className={s.h3}>О себе</h3>
              <p className={s.personalCredo}>
                Верю, что большинство решений в бизнесе упираются не в стратегию, а в разговор,
                который откладывают. Моя работа - помочь этот разговор провести.
              </p>
            </div>
            <div className={s.personalText}>
              <p>
                Живу в Москве. Женат, двое детей. Увлекаюсь бегом и активным отдыхом, больше всего
                люблю горы: дважды поднимался выше 5 400 м в Непале.
              </p>
              <p>
                Бегаю ультра-трейлы - самая длинная гонка 110 км. После неё понимаешь, где у тебя
                на самом деле заканчиваются силы (обычно сильно дальше, чем думал).
              </p>
              <p>
                Строю «Природные дороги» - пешие маршруты рядом с городами, чтобы до природы можно
                было дойти, а не доехать.
              </p>
            </div>
          </div>
        </section>

        {/* 02 ЗАДАЧИ */}
        <section className={`${s.section} ${s.pale}`} id="needs">
          <div className={s.container}>
            <p className={s.sectionIndex}>02 / Задачи</p>
            <h2 className={s.h2}>С чем ко мне <Accent>приходят</Accent></h2>
            <div className={`${s.cards} ${s.cardsTwo}`}>
              {NEEDS.map((n) => (
                <article key={n.title} className={s.card}>
                  <span className={s.cardSign} aria-hidden="true">{n.sign}</span>
                  <h3 className={s.h3}>{n.title}</h3>
                  <p>{n.text}</p>
                  <a href={n.href}>{n.link} →</a>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 03 УСЛУГИ */}
        <section className={s.section} id="services">
          <div className={s.container}>
            <p className={s.sectionIndex}>03 / Услуги</p>
            <h2 className={s.h2}>Форматы <Accent>работы</Accent></h2>
            <div className={`${s.cards} ${s.cardsThree}`}>
              {SERVICES.map((x) => (
                <article key={x.title} className={`${s.card} ${s.serviceCard}`}>
                  <span className={s.cardSign} aria-hidden="true">{x.sign}</span>
                  <h3 className={s.h3}>{x.title}</h3>
                  <p>{x.text}</p>
                  <a href={tg(x.msg)} target="_blank" rel="noopener noreferrer">{x.cta} →</a>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 04 РЕТРИТЫ */}
        <section className={`${s.section} ${s.pale}`} id="retreats">
          <div className={s.container}>
            <p className={s.sectionIndex}>04 / Ретриты</p>
            <h2 className={s.h2}>Какие бывают <Accent>ретриты</Accent></h2>
            <p className={s.sectionIntro}>Подбор формата под задачу группы - без универсальных сценариев.</p>
            <div className={`${s.cards} ${s.retreats}`}>
              {RETREATS.map(([title, text]) => (
                <article key={title} className={s.card}>
                  <h3 className={s.h3}>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 05 ОТЗЫВЫ */}
        <section className={s.section} id="reviews">
          <div className={`${s.container} ${s.sectionGrid}`}>
            <div>
              <p className={s.sectionIndex}>05 / Отзывы</p>
              <h2 className={s.h2}>Отзывы <Accent>участников</Accent></h2>
            </div>
            <blockquote className={s.quote}>
              «Думай не о тех верных, которые восхваляют твои слова, а о тех, кто
              доброжелательно обличает твои недостатки»
              <cite>- Сократ</cite>
            </blockquote>
          </div>
          <div className={`${s.container} ${s.reviews}`}>
            <Reviews />
            <a href="/venues" className={s.textLink}>Площадки для встреч и ретритов →</a>
          </div>
        </section>

        {/* 06 ПРОЕКТЫ */}
        <section className={`${s.section} ${s.pale}`} id="projects">
          <div className={s.container}>
            <p className={s.sectionIndex}>06 / Проекты</p>
            <h2 className={s.h2}>Проекты</h2>
            <div className={`${s.cards} ${s.cardsThree}`}>
              <article className={s.card}>
                <h3 className={s.h3}>Природные дороги</h3>
                <p>
                  Социальное предпринимательство - создание сети доступных маршрутов вблизи
                  городов. Флагманский проект - «Дорога в Лавру». Реализуем совместно с государством.
                </p>
                <a href="https://ecodorogi.ru" target="_blank" rel="noopener noreferrer">ecodorogi.ru ↗</a>
              </article>
              <article className={s.card}>
                <h3 className={s.h3}>Кути Катай</h3>
                <p>CEO, 2021–2025. Прокат и аттракционы в парках Москвы и области.</p>
                <a href="https://kutikatai.ru" target="_blank" rel="noopener noreferrer">kutikatai.ru ↗</a>
              </article>
              <article className={s.card}>
                <h3 className={s.h3}>Watchsport.ru</h3>
                <p>
                  Основатель и CEO. B2B/B2C-дистрибуция умных устройств в России и Германии.
                  Продал бренд корпорации Garmin в 2021 году.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* 07 СПОРТ */}
        <section className={`${s.section} ${s.sport}`} id="sport">
          <div className={`${s.container} ${s.sectionGrid}`}>
            <div>
              <p className={s.sectionIndex}>07 / Спорт</p>
              <h2 className={s.h2}>Ультра-трейл -<br /><em>движение как философия</em></h2>
              <p className={s.lead}>
                Бегаю ультра-трейлы - дистанции от 50 км по горным тропам. Личный рекорд: 109,5 км.
                Люблю горный трекинг.
              </p>
              <p className={s.muted}>
                Многочасовые забеги учат тому же, чему и хорошая групповая работа: слушать себя,
                не бросать, находить ресурс там, где его, казалось, уже нет.
              </p>
              <div className={s.sportSummary}>
                <strong>Горы и ультра-трейл</strong>
                <span>Два восхождения выше 5 400 м</span>
                <span>Несколько ультрагонок, включая дистанцию 110 км</span>
              </div>
            </div>
            <div className={s.sportGallery}>
              <Image src="/sport-1.webp" alt="Ультра-трейл: переход через воду" width={400} height={280} />
              <Image src="/sport-3.webp" alt="Непал, перевал Торонг-Ла" width={400} height={280} />
              <Image src="/sport-2.webp" alt="Забег по лесу" width={800} height={400} />
            </div>
          </div>
        </section>

        {/* 08 КОНТАКТЫ */}
        <section className={`${s.section} ${s.pale} ${s.contacts}`} id="contacts">
          <div className={`${s.container} ${s.sectionGrid}`}>
            <div>
              <p className={s.sectionIndex}>08 / Контакты</p>
              <h2 className={s.h2}>
                Есть идея для ретрита, нужен модератор для форум-группы или хотите поговорить -{" "}
                <Accent>напишите мне.</Accent>
              </h2>
            </div>
            <div className={s.contactList}>
              {CONTACTS.map((c) => (
                <a key={c.label} href={c.href} {...ext(c.href)}>
                  <span>{c.label}</span>
                  <strong>{c.value}</strong>
                  <span aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={`${s.container} ${s.footerInner}`}>
          <span>ИП Тюльпанов Александр Сергеевич</span>
          <a href="#top">Наверх ↑</a>
        </div>
        <div className={s.container}>
          <LegalLinks className={s.legal} />
        </div>
      </footer>
    </div>
  );
}
