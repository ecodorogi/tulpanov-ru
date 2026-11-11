import { LEVELS, SOURCE, STAGES } from "@/lib/forumLevels";
import s from "../forum.module.css";

export default function ForumInfo() {
  return (
    <details className={s.info}>
      <summary>Прочитать про форумы и уровни</summary>

      <h2 className={s.infoTitle}>Уровни форумов</h2>
      <div className={s.tableWrap}>
        <table className={s.infoTable}>
          <tbody>
            {LEVELS.map((l) => (
              <tr key={l.name}>
                <th>{l.name}</th>
                <td>{l.text}</td>
                <td>{l.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className={s.infoTitle}>Уровни развития форумов</h2>
      <div className={s.tableWrap}>
        <table className={s.infoTable}>
          <thead>
            <tr>
              <th>Этапы развития</th>
              <th>Возможности</th>
              <th>Вызовы</th>
              <th>Потребности</th>
            </tr>
          </thead>
          <tbody>
            {STAGES.map((st) => (
              <tr key={st.stage}>
                <th>
                  {st.stage}
                  <span>{st.year}</span>
                </th>
                <td data-label="Возможности">{st.opportunities}</td>
                <td data-label="Вызовы">{st.challenges}</td>
                <td className={s.needs} data-label="Потребности">{st.needs}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className={s.source}>Материалы Академии Модерации. {SOURCE}</p>
    </details>
  );
}
