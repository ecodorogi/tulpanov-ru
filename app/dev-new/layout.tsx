import type { Metadata } from "next";
import { Inter } from "next/font/google";

// Новый дизайн сайта (синий, гротеск, рукописные акценты). Живёт на /dev-new, пока не утверждён.
const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Александр Тюльпанов - сложные разговоры, сильные решения",
  description:
    "Александр Тюльпанов - предприниматель, сертифицированный модератор и тренер бизнес-форумов. Ретриты, модерация форум-групп, независимый директор.",
  robots: { index: false, follow: false },
};

export default function DevNewLayout({ children }: { children: React.ReactNode }) {
  return <div className={inter.variable}>{children}</div>;
}
