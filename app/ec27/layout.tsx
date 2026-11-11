import type { Metadata } from "next";
import Link from "next/link";
import { ADMIN_PATH, isAdmin } from "@/lib/adminAuth";
import { logout } from "./actions";
import LoginForm from "./LoginForm";
import s from "../f/forum.module.css";

export const metadata: Metadata = {
  title: "Админка",
  robots: { index: false, follow: false },
};

// Без входа любая страница админки показывает только форму входа.
export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  if (!(await isAdmin())) return <LoginForm />;

  return (
    <>
      <nav className={s.adminNav}>
        <Link href={ADMIN_PATH}>Админка</Link>
        <Link href={`${ADMIN_PATH}/forum`}>Опросы форумов</Link>
        <a href="/" target="_blank" rel="noreferrer">Сайт ↗</a>
        <form action={logout}>
          <button className={s.small}>Выйти</button>
        </form>
      </nav>
      {children}
    </>
  );
}
