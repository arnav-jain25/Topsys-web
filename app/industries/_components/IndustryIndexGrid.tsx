"use client";

import { useState, useRef } from "react";
import Link from "next/link";

type Industry = {
  slug: string;
  label: string;
  body: string;
  tags: string[];
};

export function IndustryIndexGrid({ industries }: { industries: Industry[] }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [prevIdx, setPrevIdx] = useState(0);
  const [fading, setFading] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const activate = (idx: number) => {
    if (idx === activeIdx) return;
    setPrevIdx(activeIdx);
    setFading(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setActiveIdx(idx);
      setFading(false);
    }, 120);
  };

  const active = industries[activeIdx];

  return (
    <div
      className="grid max-[767px]:block"
      style={{ gridTemplateColumns: "1fr 1px 1fr", gap: 0, alignItems: "start" }}
    >

      {/* ── Left: sector list ── */}
      <div className="border-t border-hairline divide-y divide-hairline max-[767px]:border-b">
        {industries.map(({ slug, label }, idx) => {
          const isActive = activeIdx === idx;
          return (
            <div
              key={slug}
              role="button"
              tabIndex={0}
              onMouseEnter={() => activate(idx)}
              onFocus={() => activate(idx)}
              onKeyDown={(e) => e.key === "Enter" && (window.location.href = `/industries/${slug}`)}
              aria-current={isActive ? "true" : undefined}
              className="group relative flex items-center gap-5 py-5 cursor-pointer select-none pr-6 max-[767px]:pr-3"
              style={{
                paddingLeft: isActive ? "1.25rem" : "0",
                transition: "padding-left 300ms cubic-bezier(.2,0,0,1)",
              }}
            >
              {/* Active left bar */}
              <span
                className="absolute left-0 top-3 bottom-3 w-[3px] rounded-full bg-signature"
                style={{
                  opacity: isActive ? 1 : 0,
                  transition: "opacity 250ms cubic-bezier(.2,0,0,1)",
                }}
                aria-hidden="true"
              />

              {/* Ordinal */}
              <span
                className="font-mono flex-none"
                style={{
                  fontSize: "11px",
                  letterSpacing: ".1em",
                  color: isActive ? "var(--color-teal)" : "var(--color-ink-muted)",
                  transition: "color 250ms cubic-bezier(.2,0,0,1)",
                  minWidth: "1.5rem",
                }}
              >
                {String(idx + 1).padStart(2, "0")}
              </span>

              {/* Label */}
              <span
                className="font-display font-medium flex-1"
                style={{
                  fontSize: "clamp(1.05rem, 1.5vw, 1.3rem)",
                  letterSpacing: "-0.015em",
                  color: isActive ? "var(--color-teal)" : "var(--color-ink)",
                  transition: "color 250ms cubic-bezier(.2,0,0,1)",
                }}
              >
                {label}
              </span>

              {/* Arrow */}
              <span
                className="font-mono text-teal flex-none ml-auto"
                style={{
                  fontSize: "13px",
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? "translateX(0)" : "translateX(-6px)",
                  transition: "opacity 250ms cubic-bezier(.2,0,0,1), transform 250ms cubic-bezier(.2,0,0,1)",
                }}
                aria-hidden="true"
              >
                →
              </span>
            </div>
          );
        })}
      </div>

      {/* ── Divider ── */}
      <div
        className="self-stretch max-[767px]:hidden"
        style={{ background: "var(--color-hairline)", margin: "0 3rem" }}
      />

      {/* ── Right: live detail panel ── */}
      <div
        className="pl-2 pt-1 max-[767px]:pt-8 max-[767px]:pl-0"
        style={{
          opacity: fading ? 0 : 1,
          transform: fading ? "translateY(6px)" : "translateY(0)",
          transition: "opacity 120ms cubic-bezier(.2,0,0,1), transform 120ms cubic-bezier(.2,0,0,1)",
        }}
      >
        {/* Counter */}
        <p
          className="font-mono font-medium"
          style={{ fontSize: "11px", letterSpacing: ".12em", color: "var(--color-teal)", textTransform: "uppercase" }}
        >
          {String(activeIdx + 1).padStart(2, "0")}&nbsp;/&nbsp;{String(industries.length).padStart(2, "0")}
        </p>

        {/* Sector name — large */}
        <h2
          className="font-display font-medium text-ink mt-4"
          style={{
            fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
            letterSpacing: "-0.03em",
            lineHeight: 1.08,
          }}
        >
          {active.label}
        </h2>

        {/* Underline rule — extends on render */}
        <div
          className="mt-5 mb-5 h-px bg-signature"
          style={{ width: "3rem" }}
          aria-hidden="true"
        />

        {/* Body */}
        <p className="text-body-xs text-ink-2 leading-relaxed max-w-[46ch]">
          {active.body}
        </p>

        {/* Tags */}
        <ul className="flex flex-wrap gap-2 mt-6 list-none">
          {active.tags.map((t) => (
            <li
              key={t}
              className="font-mono uppercase border border-hairline rounded text-ink-muted"
              style={{ fontSize: "10px", letterSpacing: ".06em", padding: "3px 8px" }}
            >
              {t}
            </li>
          ))}
        </ul>

        {/* CTA link */}
        <Link
          href={`/industries/${active.slug}`}
          className="inline-flex items-center gap-2 mt-8 font-mono text-teal hover:gap-3"
          style={{
            fontSize: "11px",
            letterSpacing: ".1em",
            textTransform: "uppercase",
            transition: "gap 250ms cubic-bezier(.2,0,0,1)",
          }}
        >
          Explore sector <span aria-hidden="true">→</span>
        </Link>
      </div>

      {/* ── Mobile accordion fallback ── */}
      <style>{`
        @media (max-width: 767px) {
          .industry-detail-mobile { display: block; }
        }
      `}</style>

    </div>
  );
}
