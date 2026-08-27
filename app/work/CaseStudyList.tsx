"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { CASE_STUDIES } from "@/lib/case-studies";

const ORDINALS = ["01", "02", "03", "04", "05", "06"];
const BG_ALTERNATES = [
  "bg-paper",
  "bg-surface",
  "bg-paper",
  "bg-surface",
  "bg-paper",
  "bg-surface",
];

function revealStyle(
  visible: boolean,
  delay: number
): React.CSSProperties {
  return visible
    ? {
        animation: `topsys-fade-in 500ms cubic-bezier(.2,0,0,1) ${delay}ms both`,
      }
    : { opacity: 0 };
}

export function CaseStudyList() {
  const sectionRefs = useRef<(HTMLElement | null)[]>(
    new Array(CASE_STUDIES.length).fill(null)
  );
  const [visible, setVisible] = useState<boolean[]>(
    () => new Array(CASE_STUDIES.length).fill(false)
  );

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) {
      setVisible(new Array(CASE_STUDIES.length).fill(true));
      return;
    }

    const observers = sectionRefs.current.map((el, i) => {
      if (!el) return null;
      const io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible((prev) => {
              const next = [...prev];
              next[i] = true;
              return next;
            });
            io.disconnect();
          }
        },
        { threshold: 0.12 }
      );
      io.observe(el);
      return io;
    });

    return () => observers.forEach((io) => io?.disconnect());
  }, []);

  return (
    <>
      {CASE_STUDIES.map((cs, i) => (
        <section
          key={cs.slug}
          ref={(el) => {
            sectionRefs.current[i] = el;
          }}
          className={`${BG_ALTERNATES[i]} relative overflow-hidden`}
          style={{ padding: "5rem 0" }}
        >
          {/* Faint ordinal background number — scale + opacity transition */}
          <span
            aria-hidden="true"
            className="absolute select-none pointer-events-none font-mono font-medium text-sunken"
            style={{
              fontSize: "clamp(6rem, 18vw, 14rem)",
              lineHeight: 1,
              top: "50%",
              right: "2rem",
              letterSpacing: "-0.04em",
              userSelect: "none",
              opacity: visible[i] ? 0.6 : 0,
              transform: visible[i]
                ? "translateY(-50%) scale(1)"
                : "translateY(-50%) scale(0.95)",
              transition:
                "opacity 500ms cubic-bezier(.2,0,0,1), transform 500ms cubic-bezier(.2,0,0,1)",
            }}
          >
            {ORDINALS[i]}
          </span>

          <div className="wrap relative">
            {/* Separator above all but the first entry */}
            {i > 0 && (
              <div
                className="border-t border-hairline absolute inset-x-0"
                style={{ top: "-5rem" }}
                aria-hidden="true"
              />
            )}

            {/* Two-column layout */}
            <div
              className="grid gap-10"
              style={{
                gridTemplateColumns: "2fr 3fr",
                alignItems: "start",
              }}
            >
              {/* Left: metadata column — reveals first (delay 0) */}
              <div
                className="max-[767px]:contents"
                style={revealStyle(visible[i], 0)}
              >
                <p
                  className="font-mono text-mono-xs uppercase tracking-[.1em] text-ink-muted"
                  style={{ marginBottom: "1.25rem" }}
                >
                  {cs.tag}
                </p>

                {/* Tech pills */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {cs.tech.slice(0, 4).map((t) => (
                    <span
                      key={t}
                      className="font-mono text-mono-xs uppercase tracking-[.07em] text-ink-muted border border-hairline rounded-control px-2 py-0.5"
                    >
                      {t}
                    </span>
                  ))}
                  {cs.tech.length > 4 && (
                    <span className="font-mono text-mono-xs text-ink-muted px-1">
                      +{cs.tech.length - 4}
                    </span>
                  )}
                </div>

                {/* Metric */}
                {cs.metric && (
                  <p
                    className="font-mono text-ink font-medium mb-5"
                    style={{
                      fontSize: "clamp(1.125rem, 2vw, 1.5rem)",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {cs.metric}
                  </p>
                )}

                {/* Read case link with animated arrow */}
                <Link
                  href={`/work/${cs.slug}`}
                  className="group inline-flex items-center gap-1.5 text-[15px] font-semibold text-teal border-b border-current pb-0.5 transition-colors duration-fast ease-standard hover:no-underline"
                >
                  Read case
                  <span
                    className="inline-block transition-transform duration-fast ease-standard group-hover:translate-x-1"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </Link>
              </div>

              {/* Right: title + lede — reveals 80ms after metadata */}
              <div style={revealStyle(visible[i], 80)}>
                {/* Capabilities */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {cs.capabilities.map((cap) => (
                    <span
                      key={cap}
                      className="font-mono text-mono-xs uppercase tracking-[.07em] text-teal border border-teal-tint rounded-control px-2 py-0.5"
                    >
                      {cap}
                    </span>
                  ))}
                </div>

                <h2
                  className="font-display font-medium text-ink"
                  style={{
                    fontSize: "clamp(1.375rem, 2.6vw, 2rem)",
                    lineHeight: 1.14,
                    letterSpacing: "-0.022em",
                    maxWidth: "28ch",
                    marginBottom: "1rem",
                  }}
                >
                  {cs.title}
                </h2>

                <p
                  className="text-body-sm text-ink-2"
                  style={{ maxWidth: "54ch" }}
                >
                  {cs.lede}
                </p>
              </div>
            </div>
          </div>

          {/* Bottom hairline separator */}
          {i < CASE_STUDIES.length - 1 && (
            <div className="wrap" aria-hidden="true">
              <div className="border-b border-hairline mt-12" />
            </div>
          )}
        </section>
      ))}
    </>
  );
}
