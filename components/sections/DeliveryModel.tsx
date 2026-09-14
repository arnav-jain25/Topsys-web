"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/* One continuous rule runs the width of the section and the four stage
   markers sit on it. The rule extends once on entry — "lines extend" is
   the motion vocabulary; nothing fades up. */

const STAGES = [
  { n: "01", title: "Scope",    body: "We size the work inside your constraints." },
  { n: "02", title: "Embed",    body: "Our engineer works in your environment, not ours." },
  { n: "03", title: "Ship",     body: "It reaches production with the people who built it." },
  { n: "04", title: "Continue", body: "The team stays embedded, or it becomes yours." },
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
      ([e]) => { setReady(e.isIntersecting); },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      aria-labelledby="delivery-heading"
      className="on-field relative overflow-hidden"
      style={{ background: "var(--color-field)", padding: "3.75rem 0 4rem" }}
    >
      <style>{`
        .stage-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 2rem; }
        @media (max-width: 1023px) { .stage-grid { grid-template-columns: repeat(2, 1fr); gap: 2rem 1.75rem; } }
        @media (max-width: 600px)  { .stage-grid { grid-template-columns: 1fr; gap: 1.5rem; } }
      `}</style>

      <div className="wrap relative" ref={ref}>
        <div className="flex items-end justify-between gap-10 flex-wrap">
          <div>
            <p
              className="inline-flex items-center gap-2.5 font-eyebrow text-[1.0625rem] uppercase tracking-[.12em]"
              style={{ color: "#C4B5FD" }}
            >
              <span className="inline-block h-0.5 w-[22px] bg-signature rounded-full" aria-hidden="true" />
              How we deliver
            </p>
            <h2
              id="delivery-heading"
              className="font-display font-medium text-on-field mt-3"
              style={{ fontSize: "clamp(1.875rem, 3.4vw, 2.6rem)", letterSpacing: "-0.03em", maxWidth: "26ch" }}
            >
              Build the solution. Build the team. Or both.
            </h2>
          </div>
          <Link
            href="/approach"
            className="group inline-flex items-center gap-2.5 font-mono text-mono uppercase tracking-[.08em] text-signal whitespace-nowrap pb-1"
          >
            See how we work
            <span aria-hidden="true" className="transition-transform duration-fast ease-standard group-hover:translate-x-1">→</span>
          </Link>
        </div>

        {/* The rule the stages sit on */}
        <span
          className="block h-0.5 rounded-full bg-signature origin-left mt-10"
          style={{
            transform: ready ? "scaleX(1)" : "scaleX(0)",
            transition: "transform 900ms cubic-bezier(.2,0,0,1)",
          }}
          aria-hidden="true"
        />

        <ol className="stage-grid list-none p-0 mt-7">
          {STAGES.map((s, i) => (
            <li key={s.n}>
              <span
                className="font-mono block"
                style={{ fontSize: "0.75rem", letterSpacing: ".12em", color: "var(--color-signal)" }}
              >
                {s.n}
              </span>
              <h3
                className="font-display font-medium text-on-field mt-1.5"
                style={{ fontSize: "1.1875rem", letterSpacing: "-0.02em" }}
              >
                {s.title}
              </h3>
              <p
                className="mt-1.5"
                style={{ fontSize: "0.9375rem", lineHeight: 1.55, color: "var(--color-on-field-2)" }}
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
