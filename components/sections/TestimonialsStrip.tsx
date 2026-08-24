"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { TESTIMONIALS } from "@/lib/testimonials";

/* ── Reveal settings ── */
const CHAR_INTERVAL_MS = 18;   /* ms between each character appearing */
const HOLD_MS          = 5500; /* hold fully revealed before rotating */

function useReveal(text: string) {
  const [count, setCount] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setCount(0);
    let i = 0;
    const step = () => {
      i++;
      setCount(i);
      if (i < text.length) {
        timerRef.current = setTimeout(step, CHAR_INTERVAL_MS);
      }
    };
    timerRef.current = setTimeout(step, 60); /* brief delay before first char */
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [text]);

  return count;
}

export function TestimonialsStrip() {
  const [idx, setIdx] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const featured   = TESTIMONIALS[idx];
  const revealedAt = useReveal(featured.quote);

  /* Advance after reveal completes + hold */
  const revealTotal = featured.quote.length * CHAR_INTERVAL_MS + 60;
  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(
      () => setIdx((i) => (i + 1) % TESTIMONIALS.length),
      revealTotal + HOLD_MS
    );
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx]);

  const goTo = (i: number) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setIdx(i);
  };

  const grid = [0, 1, 2, 3].map((o) =>
    TESTIMONIALS[(idx + 1 + o) % TESTIMONIALS.length]
  );

  return (
    <section aria-labelledby="testimonials-heading" style={{ padding: "7rem 0 8rem" }}>
      <div className="wrap">

        {/* ── Header row ── */}
        <div className="flex items-end justify-between mb-14 max-[767px]:flex-col max-[767px]:items-start max-[767px]:gap-5">
          <div>
            <p className="inline-flex items-center gap-2.5 font-eyebrow text-[1.0625rem] uppercase tracking-[.12em] mb-3" style={{ color: "#6D28D9" }}>
              <span className="inline-block h-0.5 w-[22px] bg-signature rounded-full" aria-hidden="true" />
              Client testimonials
            </p>
            <h2
              id="testimonials-heading"
              className="font-display font-medium text-ink"
              style={{ fontSize: "clamp(1.875rem, 3.4vw, 2.6rem)", letterSpacing: "-0.03em", lineHeight: 1.05 }}
            >
              What they said<br />when it shipped.
            </h2>
          </div>
          <Link
            href="/testimonials"
            className="inline-flex items-center gap-2 font-mono text-[0.875rem] uppercase tracking-[.08em] hover:gap-3 transition-all duration-fast ease-standard whitespace-nowrap pb-1" style={{ color: "#6D28D9" }}
          >
            All testimonials <span aria-hidden="true">&#8594;</span>
          </Link>
        </div>

        {/* ── Featured pull-quote — character scramble ── */}
        <div className="relative border-l-[3px] border-teal pl-8 md:pl-12 mb-14">
          {/* Decorative quote mark */}
          <span
            className="absolute -top-4 left-3 font-display leading-none select-none pointer-events-none"
            style={{ fontSize: "clamp(4rem, 7vw, 7rem)", color: "rgba(14,90,102,0.22)" }}
            aria-hidden="true"
          >
            &ldquo;
          </span>

          <span
            className={`inline-flex items-center px-2.5 py-1 rounded-control font-mono text-[10px] uppercase tracking-[.1em] text-white ${featured.accentClass} mb-4`}
          >
            {featured.industry}
          </span>

          {/* Quote — characters reveal left→right; full text always in DOM so no layout shift */}
          <p
            className="font-display font-medium text-ink relative z-[1]"
            style={{ fontSize: "clamp(1.35rem, 2.4vw, 2.1rem)", letterSpacing: "-0.025em", lineHeight: 1.35 }}
          >
            {featured.quote.split("").map((c, i) => (
              <span
                key={`${idx}-${i}`}
                style={{
                  opacity: i < revealedAt ? 1 : 0,
                  transition: i < revealedAt ? "opacity 160ms ease" : "none",
                }}
                aria-hidden={i >= revealedAt}
              >
                {c}
              </span>
            ))}
            <span className="sr-only">{featured.quote}</span>
          </p>

          <p className="font-mono text-mono-xs text-ink-muted mt-5 tracking-[.04em]">
            {featured.attribution}
          </p>

          {/* Progress dots */}
          <div className="flex gap-1.5 mt-6" role="tablist" aria-label="Testimonials">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === idx}
                onClick={() => goTo(i)}
                className="rounded-full transition-all duration-base ease-standard"
                style={{
                  width: i === idx ? "20px" : "6px",
                  height: "6px",
                  background: i === idx ? "var(--color-teal)" : "var(--color-hairline-strong)",
                }}
                aria-label={`Show testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* ── Hairline divider ── */}
        <div className="border-t border-hairline mb-10" />

        {/* ── 4 compact testimonials in 2×2 ── */}
        <div className="grid grid-cols-2 gap-x-16 gap-y-0 max-[767px]:grid-cols-1">
          {grid.map((t) => (
            <div key={t.id} className="py-8 border-b border-hairline">
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded-control font-mono text-[10px] uppercase tracking-[.1em] text-white ${t.accentClass} mb-3`}
              >
                {t.industry}
              </span>
              <p
                className="font-display font-medium text-ink-2"
                style={{ fontSize: "clamp(0.95rem, 1.2vw, 1.1rem)", letterSpacing: "-0.015em", lineHeight: 1.5 }}
              >
                &ldquo;{t.quote}&rdquo;
              </p>
              <p className="font-mono text-mono-xs text-ink-muted mt-4 tracking-[.04em]">
                {t.attribution}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
