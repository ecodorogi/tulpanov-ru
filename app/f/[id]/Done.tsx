import s from "../forum.module.css";

// Экран после ответа. Показывается и сразу после отправки, и при повторном заходе по ссылке.
export default function Done() {
  return (
    <div className={s.done}>
      <p className={s.doneTitle}>Принято!</p>
      <p className={s.doneText}>
        Кто бы что ни поставил, вы точно на уровне «Совместное заполнение опросов».
        А это уже не первый год.
      </p>
      <a href="/" className={s.home}>← tulpanov.ru</a>
    </div>
  );
}
