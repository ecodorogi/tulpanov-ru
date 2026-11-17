"use client";

import Image from "next/image";
import { useEffect, useState, type ReactNode } from "react";
import LegalLinks from "../components/LegalLinks";
import s from "./page.module.css";

// Общая шапка (логотип, меню, бургер) и подвал для /dev-new и /dev-new/pro-menya.
// На главной пункты меню - якоря «#…», на других страницах - «/dev-new#…».
export const ABOUT_PAGE = "/dev-new/pro-menya";

const SECTIONS = [
  ["needs", "Задачи"],
  ["services", "Услуги"],
  ["retreats", "Ретриты"],
  ["reviews", "Отзывы"],
  ["ecodorogi", "Ecodorogi"],
  ["projects", "Проекты"],
  ["sport", "Спорт"],
  ["contacts", "Контакты"],
];

export default function SiteShell({ home, children }: { home: boolean; children: ReactNode }) {
  const [menu, setMenu] = useState(false);
  // Вверху страницы логотип крупный, при прокрутке шапка уменьшается.
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Разные пороги на сжатие и разжатие, чтобы шапка не дёргалась у границы.
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled((was) => (was ? y > 8 : y > 60));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Переход с другой страницы по ссылке «/dev-new#services»: браузер не всегда сам доезжает до раздела
  // (страница дорисовывается после загрузки), поэтому докручиваем вручную - сразу и после картинок.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;
    // Мгновенно (плавную прокрутку прерывает дорисовка страницы) и с повтором, пока гость сам не начал листать.
    let userScrolled = false;
    const stop = () => { userScrolled = true; };
    window.addEventListener("wheel", stop, { passive: true });
    window.addEventListener("touchstart", stop, { passive: true });
    const go = () => { if (!userScrolled) document.getElementById(id)?.scrollIntoView({ behavior: "instant" }); };
    const timers = [0, 300, 900].map((ms) => setTimeout(go, ms));
    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener("wheel", stop);
      window.removeEventListener("touchstart", stop);
    };
  }, []);

  useEffect(() => {
    if (!menu) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenu(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menu]);

  const base = home ? "" : "/dev-new";
  const NAV = [[ABOUT_PAGE, "Про меня"], ...SECTIONS.map(([id, label]) => [`${base}#${id}`, label])];

  return (
    <div className={s.page}>
      <a className={s.skipLink} href="#main">Перейти к содержимому</a>

      <header className={`${s.header} ${scrolled ? s.headerScrolled : ""}`} id="top">
        <div className={`${s.container} ${s.headerInner}`}>
          <a className={s.brand} href={home ? "#top" : "/dev-new"} aria-label="На главную">
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
      <div className={s.headerSpacer} aria-hidden="true" />

      {children}

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
