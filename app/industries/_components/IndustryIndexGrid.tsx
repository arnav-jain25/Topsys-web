"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type React from "react";

type Industry = {
  slug: string;
  label: string;
  body: string;
  tags: string[];
};

function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, visible };
}

function itemStyle(visible: boolean, delay: number): React.CSSProperties {
  return visible
    ? { animation: `topsys-fade-in 500ms cubic-bezier(.2,0,0,1) ${delay}ms both` }
    : { opacity: 0 };
}

export function IndustryIndexGrid({ industries }: { industries: Industry[] }) {
  const { ref, visible } = useReveal();

  return (
    <div ref={ref} className="grid grid-cols-2 gap-5 max-[767px]:grid-cols-1">
      {industries.map(({ slug, label, body, tags }, idx) => (
        <Link
          key={slug}
          href={`/industries/${slug}`}
          className="group relative overflow-hidden block bg-white border border-hairline rounded-card px-8 py-8 transition-all duration-base ease-standard hover:border-transparent hover:shadow-e2 hover:-translate-y-[3px]"
          style={itemStyle(visible, idx * 80)}
        >
          {/* Top-edge gradient sweep — one of four permitted bg-signature uses */}
          <span
            className="absolute top-0 left-0 right-0 h-[3px] bg-signature scale-x-0 origin-left transition-transform duration-base ease-standard group-hover:scale-x-100"
            aria-hidden="true"
          />
          <div className="flex items-start justify-between gap-4">
            <h2 className="font-display font-medium text-heading-3 text-ink group-hover:text-teal transition-colors duration-fast ease-standard">
              {label}
            </h2>
            <span
              className="font-mono text-mono-sm text-ink-muted mt-1 flex-none transition-transform duration-base ease-standard group-hover:translate-x-1"
              aria-hidden="true"
            >
              →
            </span>
          </div>
          <p className="text-body-xs text-ink-2 mt-3 max-w-[52ch]">{body}</p>
          <ul className="flex flex-wrap gap-2 mt-5 list-none">
            {tags.map((t) => (
              <li
                key={t}
                className="font-mono text-mono-xs uppercase tracking-[.05em] text-ink-muted border border-hairline rounded px-2 py-0.5"
              >
                {t}
              </li>
            ))}
          </ul>
        </Link>
      ))}
    </div>
  );
}
