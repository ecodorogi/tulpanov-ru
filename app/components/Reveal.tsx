"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

export default function Reveal({
  as: Tag = "div",
  children,
  className,
  id,
}: {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag ref={ref} id={id} className={`reveal ${className ?? ""}`}>
      {children}
    </Tag>
  );
}
