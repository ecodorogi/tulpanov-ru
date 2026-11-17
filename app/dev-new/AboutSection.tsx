import Image from "next/image";
import type { ReactNode } from "react";
import s from "./about-section.module.css";

// Раздел «01 / Про меня» по макету tulpanov_pro_menya (ChatGPT): тексты дословно из CONTENT_TEXTS_IN_ORDER.md.
// Исключение: «тренер бизнес-форумов» -> «ретрит-тренер форум-групп» (правило владельца: «бизнес-форумов» не бывает).
// Фото - оригиналы из public/, а не вырезки со скриншотов. id="about" сохранён для меню.
export default function AboutSection({ cert }: { cert: (text: string) => ReactNode }) {
  return (
    <section className={s["tn-about"]} id="about" aria-labelledby="about-title">
      <div className={s["tn-about__container"]}>
        <div className={s["tn-about__heading"]}>
          <p className={s["tn-about__section-index"]}>01 <span>/</span> Про меня</p>
          <h2 id="about-title" className={s["tn-about__h1"]}>Про меня
            <svg className={s["tn-about__hand-underline"]} viewBox="0 0 340 27" preserveAspectRatio="none" aria-hidden="true"><path d="M6 17C105 4 222 10 333 6"/></svg>
          </h2>
          <p className={s["tn-about__heading-note"]}>Не только о работе</p>
        </div>

        <div className={s["tn-about__intro"]}>
          <div className={s["tn-about__intro-copy"]}>
            <p className={s["tn-about__eyebrow"]}>Давайте знакомиться</p>
            <p className={s["tn-about__lead"]}>Я Александр Тюльпанов. Предприниматель, модератор форум-групп, любитель длинных дистанций и человек, которому сложно сидеть без дела.</p>
            <p>Люблю жену и детей, бег, хорошую компанию и новые проекты. Особенно когда можно собрать вокруг себя людей и вместе довести дело до результата.</p>
            <p>Дорожу репутацией, люблю организовывать людей и ценю чувство юмора. Друзья говорят, что на меня можно положиться. И что у меня всегда новый проект. Похоже, они правы.</p>
          </div>
          <figure className={s["tn-about__portrait"]}>
            <Image src="/alexander.jpg" alt="Александр Тюльпанов" width={650} height={722} sizes="(max-width: 720px) 76vw, 408px" />
            <figcaption>Александр Тюльпанов</figcaption>
            <svg className={s["tn-about__portrait-swoosh"]} viewBox="0 0 420 530" preserveAspectRatio="none" aria-hidden="true"><path d="M83 35C195 -17 407 48 406 168S338 469 234 517"/></svg>
          </figure>
        </div>

        <div className={s["tn-about__story-grid"]}>
          <article className={`${s["tn-about__story"]} ${s["tn-about__story--business"]}`}>
            <span className={s["tn-about__story-num"]}>01 / Бизнес</span>
            <h3>Как всё начиналось</h3>
            <p>В предпринимательство я пришёл осознанно. Потому что жена сказала.</p>
            <p className={s["tn-about__aside"]}>Шучу, конечно.</p>
            <p>На самом деле всё началось с каталога OTTO. Я увидел там спортивные часы и подумал: а почему бы не попробовать их привозить и продавать?</p>
            <p>Я сам занимался спортом, понимал этот продукт, и всё как-то совпало. Случился тот самый мэтч.</p>
            <p>После успеха со спортивными часами я решил, что смогу так же успешно продавать и другие туристические товары. Попробовал развить это направление в Германии, но потерпел неудачу.</p>
            <p>Так тоже бывает. Успех в одном деле не гарантирует успеха в другом.</p>
            <svg className={s["tn-about__accent"]} viewBox="0 0 114 34" aria-hidden="true"><path d="M3 21C35 7 81 10 110 4"/></svg>
          </article>

          <article className={`${s["tn-about__story"]} ${s["tn-about__story--moderation"]}`}>
            <span className={s["tn-about__story-num"]}>02 / Люди</span>
            <h3>Почему я стал модератором</h3>
            <p>В какой-то момент я задумался: как мой опыт может быть полезен другим людям?</p>
            <p>Ответ помогла найти моя собственная форум-группа. Ребята поддержали меня и сказали, что у меня получится.</p>
            <p>Больше всего мне нравится момент, когда люди снимают маски успешных предпринимателей и начинают говорить честно - о сомнениях, ошибках и непростых решениях.</p>
            <p>Иногда человек занимается бизнесом, который ему не близок. А иногда продолжает вкладывать свои деньги в компанию, которая уже не приносит прибыли.</p>
            <p>На форуме он может услышать опыт тех, кто уже проходил через похожее, и сам увидеть свою ситуацию по-другому. Я много раз наблюдал такие моменты.</p>
            <p className={s["tn-about__story-takeaway"]}>Мне нравится не давать готовые ответы, а помогать людям находить свои.</p>
          </article>
        </div>

        <article className={s["tn-about__roads"]}>
          <div className={s["tn-about__roads-copy"]}>
            <p className={s["tn-about__eyebrow"]}>03 / Природные дороги</p>
            <h3>Проект, который хочется сделать большим</h3>
            <p>Мне всегда нравилось не просто придумывать идеи, а собирать вокруг них людей и вместе делать что-то полезное.</p>
            <p>Программа «Практикум» в Сколково помогла мне создать проект «Природные дороги» и посмотреть на него гораздо масштабнее.</p>
            <p>Хочется не просто создавать маршруты для прогулок и путешествий. Мне важно <strong>связывать людей через тропы и природные дороги</strong> - чтобы люди встречались, открывали новые места и делали что-то вместе.</p>
            <p>И чтобы такие маршруты появлялись по всей стране.</p>
          </div>
          <div className={s["tn-about__roads-visual"]}>
            <svg viewBox="0 0 410 360" role="img" aria-label="Нарисованная от руки линия маршрута, соединяющая точки" xmlns="http://www.w3.org/2000/svg">
              <defs><linearGradient id="routegrad" x1="0" y1="1" x2="1" y2="0"><stop stopColor="#086ECF"/><stop offset="1" stopColor="#45B5FA"/></linearGradient></defs>
              <path d="M44 297C101 315 83 230 151 240S231 230 238 184 324 138 318 85 359 70 373 36" stroke="url(#routegrad)" strokeWidth="6" strokeLinecap="round" fill="none" strokeDasharray="2 0"/>
              <circle cx="44" cy="297" r="16" fill="#FFFFFF" stroke="#086ECF" strokeWidth="4"/><circle cx="151" cy="240" r="13" fill="#FFFFFF" stroke="#086ECF" strokeWidth="4"/><circle cx="318" cy="85" r="14" fill="#FFFFFF" stroke="#45B5FA" strokeWidth="4"/><circle cx="373" cy="36" r="19" fill="#086ECF"/>
              <path d="M367 36l5 6 10-13" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round"/>
              <path d="M30 38l9 13 11-10M110 91l18 4M137 67l-7 18M270 310l16-11 8 13" fill="none" stroke="#8BCFFA" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <p>Общая цель. Общий путь.</p>
          </div>
        </article>

        <div className={s["tn-about__personal"]}>
          <div className={s["tn-about__personal-copy"]}>
            <p className={s["tn-about__eyebrow"]}>04 / Вне работы</p>
            <h3>Когда я не работаю</h3>
            <p>Бегаю ультратрейлы, хожу в горы и люблю сам организовывать путешествия. Нравится собрать людей, придумать маршрут и вместе дойти до цели, несмотря на препятствия.</p>
            <p>Ещё я занимаюсь волонтёрством и помогаю развивать некоммерческий проект «Дорога в Лавру».</p>
            <p>Когда у меня появляется свободная суббота, я обычно придумываю себе субботник. Надо же что-нибудь полезное сделать на маршруте!</p>
          </div>
          <div className={s["tn-about__photos"]}>
            <figure className={`${s["tn-about__photo"]} ${s["tn-about__photo--big"]}`}><Image src="/sport-1.webp" alt="Александр на ультратрейле, переход через воду" width={400} height={280} sizes="(max-width: 720px) 50vw, 330px" /></figure>
            <figure className={s["tn-about__photo"]}><Image src="/sport-3.webp" alt="Поход в Непале" width={400} height={280} sizes="(max-width: 720px) 50vw, 330px" /></figure>
            <figure className={s["tn-about__photo"]}><Image src="/sport-2.webp" alt="Александр на беговой дистанции в лесу" width={400} height={280} sizes="(max-width: 720px) 50vw, 330px" /></figure>
          </div>
        </div>

        <div className={s["tn-about__closing"]}>
          <p className={s["tn-about__closing-statement"]}>Мне нравится соединять людей. Иногда для этого нужен честный разговор, иногда - общая цель, а иногда - просто тропа, по которой можно пойти вместе.</p>
          <svg className={s["tn-about__closing-line"]} viewBox="0 0 600 28" preserveAspectRatio="none" aria-hidden="true"><path d="M5 20C170 0 400 9 593 8"/></svg>
          <div className={s["tn-about__life-rule"]}>
            <span>Моё жизненное правило</span>
            <strong>«Всё можно успеть, главное отдохнуть!»</strong>
          </div>
        </div>

        <details className={s["tn-about__credentials"]}>
          <summary>Опыт и факты <span>Подробнее <span className={s["tn-about__chevron"]} aria-hidden="true">+</span></span></summary>
          <div className={s["tn-about__credentials-content"]}>
            <p>{cert("Сертифицированный модератор и ретрит-тренер форум-групп")} Академии Модерации. Социальный предприниматель - основатель проекта «Природные дороги» (ecodorogi.ru).</p>
            <p>Резидент бизнес-клуба «Атланты» и лидер его спортивного клуба. Сам уже 6-й год состою в форум-группе - знаю форум и как участник, и как модератор. С 2021 года провожу форумы и ретриты в ведущих бизнес-клубах России.</p>
            <p>Веду форумы в клубах «Атланты», «Клуб Первых», «Основатели», «Эквиум», «Эталон», «Миллиард в бане» и в независимых форум-группах. С 2023 года модерирую детские форум-группы.</p>
            <p>Серийный предприниматель с опытом более 15 лет: экзит из Watchsport.ru (продажа Garmin, 2021), управляющий партнёр «Кути Катай», опыт работы в Германии. Образование: Сколково (Практикум 27, 2023).</p>
          </div>
        </details>
      </div>
    </section>
  );
}
