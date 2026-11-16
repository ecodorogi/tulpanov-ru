import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Inter } from "next/font/google";
import { LEGAL_DOCS, LEGAL_LINKS, LEGAL_UPDATED, requisitesFilled } from "@/lib/legal";
import s from "../legal.module.css";

const inter = Inter({ subsets: ["latin", "cyrillic"], variable: "--font-inter" });

export const dynamicParams = false;
export const generateStaticParams = () => LEGAL_DOCS.map((d) => ({ slug: d.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const doc = LEGAL_DOCS.find((d) => d.slug === slug);
  return {
    title: `${doc?.title ?? "Документ"} - tulpanov.ru`,
    // Пока не заполнены ИНН и ОГРНИП - не индексируем.
    robots: requisitesFilled() ? undefined : { index: false, follow: false },
  };
}

export default async function LegalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = LEGAL_DOCS.find((d) => d.slug === slug);
  if (!doc) notFound();

  return (
    <div className={`${s.page} ${inter.variable}`}>
      <header className={s.header}>
        <a href="/" aria-label="На главную">
          <Image src="/logo/logo-hybrid.png" alt="Александр Тюльпанов" width={986} height={500} sizes="180px" className={s.logo} priority />
        </a>
      </header>
      <main className={s.main}>
        <p className={s.eyebrow}>Документы</p>
        <h1 className={s.title}>{doc.title}</h1>
        <p className={s.updated}>Редакция от {LEGAL_UPDATED}</p>
        {doc.intro.map((p) => <p key={p} className={s.p}>{p}</p>)}
        {doc.sections.map((sec) => (
          <section key={sec.h} className={s.section}>
            <h2 className={s.h2}>{sec.h}</h2>
            {sec.p.map((p) => <p key={p} className={s.p}>{p}</p>)}
          </section>
        ))}
      </main>
      <footer className={s.footer}>
        <nav aria-label="Документы">
          {LEGAL_LINKS.map((l) => (
            <a key={l.href} href={l.href} aria-current={l.href === `/legal/${doc.slug}` ? "page" : undefined}>{l.title}</a>
          ))}
        </nav>
        <a href="/">← tulpanov.ru</a>
      </footer>
    </div>
  );
}
