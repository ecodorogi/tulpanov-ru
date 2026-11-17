import type { Metadata } from "next";
import SiteShell from "../SiteShell";
import AboutSection from "../AboutSection";
import CertLink from "../CertLink";
import { MEET_URL } from "@/lib/siteContent";
import s from "../page.module.css";

// Полная история «Про меня» - перенесена с главной /dev-new без изменений текста (ТЗ tulpanov_TZ_perenos_pro_menya).
export const metadata: Metadata = {
  title: "Про меня - Александр Тюльпанов",
  description:
    "Я Александр Тюльпанов. Предприниматель, модератор форум-групп, любитель длинных дистанций и человек, которому сложно сидеть без дела.",
  robots: { index: false, follow: false },
};

export default function AboutPage() {
  return (
    <SiteShell home={false}>
      <main id="main">
        <AboutSection cert={(text) => <CertLink>{text}</CertLink>} />
        <div className={`${s.container} ${s.aboutNext}`}>
          <a href="/dev-new#services" className={s.textLink}>К услугам →</a>
          <a href={MEET_URL} target="_blank" rel="noopener noreferrer" className={`${s.btn} ${s.btnPrimary}`}>
            Встреча-знакомство · 30 минут, бесплатно <span aria-hidden="true">→</span>
          </a>
        </div>
      </main>
    </SiteShell>
  );
}
