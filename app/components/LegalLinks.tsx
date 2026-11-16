import { LEGAL_LINKS } from "@/lib/legal";

// Ссылки на документы для подвала любой страницы. Стиль задаёт родитель через className.
export default function LegalLinks({ className }: { className?: string }) {
  return (
    <nav className={className} aria-label="Документы">
      {LEGAL_LINKS.map((l) => (
        <a key={l.href} href={l.href}>{l.title}</a>
      ))}
    </nav>
  );
}
