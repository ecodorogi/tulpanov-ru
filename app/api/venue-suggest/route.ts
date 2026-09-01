import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { name, location, url, comment, from } = await req.json();

  if (!name || !location || !comment) {
    return NextResponse.json({ error: "Заполните обязательные поля" }, { status: 400 });
  }

  const { error } = await resend.emails.send({
    from: "tulpanov.ru <noreply@ecodorogi.ru>",
    to: ["a.tulpanov@gmail.com"],
    subject: `Новая площадка: ${name}`,
    text: [
      `Название: ${name}`,
      `Адрес: ${location}`,
      url ? `Ссылка: ${url}` : "",
      `Комментарий: ${comment}`,
      from ? `От кого: ${from}` : "",
    ]
      .filter(Boolean)
      .join("\n"),
  });

  if (error) {
    return NextResponse.json({ error: "Ошибка отправки" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
