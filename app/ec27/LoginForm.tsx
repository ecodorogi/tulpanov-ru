"use client";

import { useActionState } from "react";
import { login } from "./actions";
import s from "../f/forum.module.css";

export default function LoginForm() {
  const [error, action, pending] = useActionState(login, null);
  return (
    <main className={s.page}>
      <h1 className={s.title}>Вход</h1>
      <form action={action} className={s.form}>
        <label className={s.field}>
          Логин
          <input name="login" autoComplete="username" required />
        </label>
        <label className={s.field}>
          Пароль
          <input name="password" type="password" autoComplete="current-password" required />
        </label>
        <button className={s.submit} disabled={pending}>
          {pending ? "Проверяю…" : "Войти"}
        </button>
      </form>
      {error && <p className={s.error}>{error}</p>}
    </main>
  );
}
