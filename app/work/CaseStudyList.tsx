"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { CASE_STUDIES } from "@/lib/case-studies";
import { DIAGRAM_COMPONENTS } from "@/components/sections/CaseStudyGrid";

const ORDINALS = ["01", "02", "03", "04", "05", "06"];
const BG_ALTERNATES = [
  "bg-paper",
  "bg-surface",
  "bg-paper",
  "bg-surface",
  "bg-paper",
  "bg-surface",
];

function revealStyle(visible: boolean, delay: number): React.CSSProperties {
  return visible
    ? { animation: `topsys-fade-in 500ms cubic-bezier(.2,0,0,1) ${delay}ms both` }
    : { opacity: 0 };
}

/* Override SVG CSS variables for a light-background context.
   The diagram components use on-field / field-hairline / signal tokens
   that are only readable on dark. These overrides map them to ink tokens. */
const DIAGRAM_LIGHT_VARS: React.CSSProperties = {
  "--color-on-field-2": "var(--color-ink-muted)",
  "--color-field-hairline": "var(--color-hairline)",
  "--color-signal": "var(--color-teal)",
} as React.CSSProperties;

export function CaseStudyList() {
  const sectionRefs = useRef<(HTMLElement | null)[]>(
    new Array(CASE_STUDIES.length).fill(null)
  );
  const diagramsRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState<boolean[]>(
    () => new Array(CASE_STUDIES.length).fill(false)
  );

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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

  /* Running-dot animation for SVG flow diagrams */
  useEffect(() => {
    const el = diagramsRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const anims: Animation[] = [];
    const raf = requestAnimationFrame(() => {
      const paths = el.querySelectorAll<SVGPathElement>("svg.flow .fp path");
      paths.forEach((p, i) => {
        const L = p.getTotalLength();
        if (!L) return;
        p.setAttribute("stroke-dasharray", `14 ${L}`);
        anims.push(
          p.animate(
            [{ strokeDashoffset: 0 }, { strokeDashoffset: -(L + 14) }],
            { duration: 3200 + i * 260, iterations: Infinity, easing: "linear" }
          )
        );
      });
    });
    return () => {
      cancelAnimationFrame(raf);
      anims.forEach((a) => a.cancel());
    };
  }, []);

  return (
    <div ref={diagramsRef}>
      {CASE_STUDIES.map((cs, i) => {
        const Diagram = DIAGRAM_COMPONENTS[cs.slug];
        return (
          <section
            key={cs.slug}
            ref={(el) => { sectionRefs.current[i] = el; }}
            className={`${BG_ALTERNATES[i]} relative overflow-hidden`}
            style={{ padding: "5rem 0" }}
          >
            <div className="wrap relative">
              {i > 0 && (
                <div
                  className="border-t border-hairline absolute inset-x-0"
                  style={{ top: "-5rem" }}
                  aria-hidden="true"
                />
              )}

              {/* Three-column layout: metadata | title+lede | diagram+ordinal */}
              <div
                className="grid gap-x-10 gap-y-6 max-[1023px]:grid-cols-[2fr_3fr] max-[767px]:block"
                style={{ gridTemplateColumns: "2fr 3fr 2fr", alignItems: "start" }}
              >
                {/* Col 1: metadata */}
                <div style={revealStyle(visible[i], 0)}>
                  <p
                    className="font-mono text-mono-xs uppercase tracking-[.1em] text-ink-muted"
                    style={{ marginBottom: "1.25rem" }}
                  >
                    {cs.tag}
                  </p>

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

                  {cs.metric && (
                    <p
                      className="font-mono text-ink font-medium mb-5"
                      style={{ fontSize: "clamp(1.125rem, 2vw, 1.5rem)", letterSpacing: "-0.02em" }}
                    >
                      {cs.metric}
                    </p>
                  )}

                  <Link
                    href={`/work/${cs.slug}`}
                    className="group inline-flex items-center gap-1.5 text-[15px] font-semibold text-teal border-b border-current pb-0.5 transition-colors duration-fast ease-standard hover:no-underline"
                  >
                    Read case
                    <span className="inline-block transition-transform duration-fast ease-standard group-hover:translate-x-1" aria-hidden="true">→</span>
                  </Link>
                </div>

                {/* Col 2: capabilities + title + lede (exactly as before) */}
                <div style={revealStyle(visible[i], 80)}>
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

                  <p className="text-body-sm text-ink-2" style={{ maxWidth: "54ch" }}>
                    {cs.lede}
                  </p>
                </div>

                {/* Col 3: diagram + ordinal (desktop only — hidden on tablet/mobile) */}
                {Diagram && (
                  <div
                    className="flex flex-col items-end gap-4 max-[1023px]:hidden"
                    style={revealStyle(visible[i], 160)}
                  >
                    {/* Flow diagram — light-themed via CSS var overrides */}
                    <div
                      className="w-full border border-hairline rounded-card overflow-hidden p-4"
                      style={DIAGRAM_LIGHT_VARS}
                    >
                      <Diagram />
                    </div>

                    {/* Ordinal — now positioned below diagram */}
                    <span
                      aria-hidden="true"
                      className="font-mono font-medium text-sunken select-none pointer-events-none self-end"
                      style={{
                        fontSize: "clamp(3rem, 6vw, 5rem)",
                        lineHeight: 1,
                        letterSpacing: "-0.04em",
                        opacity: visible[i] ? 0.5 : 0,
                        transform: visible[i] ? "scale(1)" : "scale(0.95)",
                        transition: "opacity 500ms cubic-bezier(.2,0,0,1), transform 500ms cubic-bezier(.2,0,0,1)",
                      }}
                    >
                      {ORDINALS[i]}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {i < CASE_STUDIES.length - 1 && (
              <div className="wrap" aria-hidden="true">
                <div className="border-b border-hairline mt-12" />
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}
