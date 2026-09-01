import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { venueName, comment } = await req.json();

  if (!venueName) {
    return NextResponse.json({ error: "Не указано место" }, { status: 400 });
  }

  const lines = [`Площадка: ${venueName}`];
  if (comment) lines.push(`Комментарий: ${comment}`);
  else lines.push("Комментарий не оставлен.");

  const { error } = await resend.emails.send({
    from: "tulpanov.ru <noreply@ecodorogi.ru>",
    to: ["a.tulpanov@gmail.com"],
    subject: `Отзыв о площадке: ${venueName}`,
    text: lines.join("\n"),
  });

  if (error) {
    return NextResponse.json({ error: "Ошибка отправки" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
