"use client";
import { useEffect, useRef, useState } from "react";

interface Props {
  outcome: string;
}

/** Split the first integer out of the outcome string for count-up animation. */
function parseOutcome(text: string): {
  prefix: string;
  number: number | null;
  suffix: string;
} {
  const match = text.match(/\d+/);
  if (!match || match.index === undefined) {
    return { prefix: text, number: null, suffix: "" };
  }
  return {
    prefix: text.slice(0, match.index),
    number: parseInt(match[0], 10),
    suffix: text.slice(match.index + match[0].length),
  };
}

export function OutcomeSection({ outcome }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [count, setCount] = useState(0);

  const parsed = parseOutcome(outcome);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) {
      setVisible(true);
      if (parsed.number !== null) setCount(parsed.number);
      return;
    }

    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          io.disconnect();

          if (parsed.number !== null) {
            const target = parsed.number;
            const duration = 900;
            const start = performance.now();
            const tick = (now: number) => {
              const elapsed = now - start;
              const progress = Math.min(elapsed / duration, 1);
              // Ease-out cubic — decelerates into the final value
              const eased = 1 - Math.pow(1 - progress, 3);
              setCount(Math.round(eased * target));
              if (progress < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parsed.number]);

  const labelStyle: React.CSSProperties = visible
    ? { animation: "topsys-fade-in 500ms cubic-bezier(.2,0,0,1) 0ms both" }
    : { opacity: 0 };

  const headingStyle: React.CSSProperties = visible
    ? { animation: "topsys-fade-in 500ms cubic-bezier(.2,0,0,1) 100ms both" }
    : { opacity: 0 };

  return (
    <section
      className="on-field"
      style={{ background: "var(--color-field)", padding: "5rem 0" }}
    >
      <div className="wrap" ref={ref} style={{ maxWidth: "52ch" }}>
        <p
          className="font-mono text-mono-xs uppercase tracking-[.1em] text-on-field-2 mb-4"
          style={labelStyle}
        >
          Outcome
        </p>
        <h2
          className="font-display font-medium text-on-field"
          style={{
            fontSize: "clamp(1.375rem, 2.4vw, 1.75rem)",
            lineHeight: 1.2,
            letterSpacing: "-0.022em",
            ...headingStyle,
          }}
        >
          {parsed.number !== null
            ? `${parsed.prefix}${count}${parsed.suffix}`
            : outcome}
        </h2>
      </div>
    </section>
  );
}
