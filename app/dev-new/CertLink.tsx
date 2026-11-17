import type { ReactNode } from "react";
import { CERT_CAPTION } from "@/lib/siteContent";
import s from "./page.module.css";

// «Сертифицированный модератор…»: при наведении показывает удостоверение, по нажатию открывает его.
export default function CertLink({ children }: { children: ReactNode }) {
  return (
    <a href="/cert-moderation.webp" target="_blank" rel="noreferrer" className={s.certLink}>
      {children}
      <span className={s.certPreview} aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/cert-moderation.webp" alt="" loading="lazy" />
        <span>{CERT_CAPTION}</span>
      </span>
    </a>
  );
}

