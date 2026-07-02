import type { Metadata } from "next";
import { IBM_Plex_Sans, Source_Serif_4 } from "next/font/google";
import "./globals.css";

const plexSans = IBM_Plex_Sans({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500"],
  variable: "--font-sans",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin", "cyrillic"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "Александр Тюльпанов",
  description:
    "Предприниматель и фасилитатор форум-групп и форум-ретритов. Проекты, в том числе «Природные дороги».",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${plexSans.variable} ${sourceSerif.variable}`}>
      <body>{children}</body>
    </html>
  );
}
