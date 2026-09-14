"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/* The differentiator, given a section instead of a teaser. Rules extend
   between the stages on entry — the motion vocabulary is "lines extend",
   not fade-up. Under reduced motion the rules are simply already drawn. */

const STAGES = [
  {
    n: "01",
    title: "Scope",
    body: "We size the work with your team, inside your constraints — your stack, your compliance posture, your procurement calendar.",
  },
  {
    n: "02",
    title: "Embed",
    body: "A forward deployed engineer works in your environment. Your repositories, your standups, your definition of done. Not a status call from ours.",
  },
  {
    n: "03",
    title: "Ship",
    body: "The system reaches production with the people who built it still on it. Ownership does not change hands at go-live.",
  },
  {
    n: "04",
    title: "Continue",
    body: "The team stays embedded, or it becomes yours. That is the fork: build the solution, build the team, or both.",
  },
];

export function DeliveryModel() {
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReady(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setReady(true); },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      aria-labelledby="delivery-heading"
      className="on-field relative overflow-hidden"
      style={{ background: "var(--color-field)", padding: "6rem 0 6.5rem" }}
    >
      <span
        className="absolute bottom-[-40%] right-[-8%] w-[40%] h-[180%] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(141,198,62,0.1), transparent 65%)" }}
        aria-hidden="true"
      />

      <style>{`
        .stage-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2.5rem;
        }
        @media (max-width: 1023px) { .stage-grid { grid-template-columns: repeat(2, 1fr); gap: 2.5rem 2rem; } }
        @media (max-width: 600px)  { .stage-grid { grid-template-columns: 1fr; gap: 2rem; } }
      `}</style>

      <div className="wrap relative" ref={ref}>
        <div className="grid grid-cols-[1fr_auto] gap-12 items-end max-[767px]:grid-cols-1 max-[767px]:items-start max-[767px]:gap-6">
          <div>
            <p
              className="inline-flex items-center gap-2.5 font-mono uppercase"
              style={{ fontSize: "0.75rem", letterSpacing: ".12em", color: "var(--color-on-field-2)" }}
            >
              <span className="inline-block h-0.5 w-[26px] bg-signature rounded-full" aria-hidden="true" />
              How we deliver
            </p>
            <h2
              id="delivery-heading"
              className="font-display font-medium text-on-field mt-4"
              style={{ fontSize: "clamp(1.75rem, 3.4vw, 2.5rem)", letterSpacing: "-0.028em", maxWidth: "24ch" }}
            >
              Build the solution. Build the team. Or both.
            </h2>
            <p className="text-lede text-on-field-2 font-medium max-w-[58ch] mt-4">
              Most firms make you choose. We do both — and the engineer who owns the outcome
              works in your environment, not ours.
            </p>
          </div>
          <Link
            href="/approach"
            className="group inline-flex items-center gap-2.5 font-mono text-mono uppercase tracking-[.08em] text-signal whitespace-nowrap pb-1"
          >
            See how we work
            <span aria-hidden="true" className="transition-transform duration-fast ease-standard group-hover:translate-x-1">→</span>
          </Link>
        </div>

        {/* ── The four stages ── */}
        <ol className="stage-grid list-none p-0 mt-16">
          {STAGES.map((s, i) => (
            <li key={s.n}>
              {/* Connector rule — extends left to right, staggered down the row */}
              <span
                className="block h-[2px] rounded-full origin-left mb-5"
                style={{
                  background: i === 0
                    ? "var(--color-signal)"
                    : "linear-gradient(90deg, rgba(141,198,62,.55), rgba(255,255,255,.16))",
                  transform: ready ? "scaleX(1)" : "scaleX(0)",
                  transition: `transform 700ms ${i * 160}ms cubic-bezier(.2,0,0,1)`,
                }}
                aria-hidden="true"
              />
              <span
                className="font-mono block"
                style={{ fontSize: "0.75rem", letterSpacing: ".12em", color: "var(--color-signal)" }}
              >
                {s.n}
              </span>
              <h3
                className="font-display font-medium text-on-field mt-2"
                style={{ fontSize: "1.25rem", letterSpacing: "-0.02em" }}
              >
                {s.title}
              </h3>
              <p
                className="mt-2"
                style={{ fontSize: "0.9375rem", lineHeight: 1.6, color: "var(--color-on-field-2)" }}
              >
                {s.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
