"use client";

import { useState } from "react";
import s from "../../f/forum.module.css";

export default function CopyLink({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      className={s.small}
      onClick={async () => {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
    >
      {copied ? "Скопировано" : "Копировать"}
    </button>
  );
}
