"use client";
import { useEffect, useRef, useState } from "react";

interface Step {
  heading: string;
  body: string;
}

interface Props {
  steps: Step[];
}

export function ApproachSteps({ steps }: Props) {
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
      ([e]) => {
        setVisible(e.isIntersecting);
      },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="bg-surface" style={{ padding: "5rem 0" }}>
      <div className="wrap" ref={ref}>
        <h2
          className="font-display font-medium text-ink"
          style={{
            fontSize: "clamp(1.375rem, 2.4vw, 1.75rem)",
            lineHeight: 1.2,
            letterSpacing: "-0.022em",
            marginBottom: "2.5rem",
          }}
        >
          What we did
        </h2>

        <div
          className="grid gap-4"
          style={{
            gridTemplateColumns:
              "repeat(auto-fill, minmax(min(100%, 26rem), 1fr))",
          }}
        >
          {steps.map((step, i) => (
            <div
              key={i}
              className="bg-paper border border-hairline rounded-card"
              style={{
                padding: "1.75rem 2rem",
                ...(visible
                  ? {
                      animation: `topsys-fade-in 500ms cubic-bezier(.2,0,0,1) ${i * 80}ms both`,
                    }
                  : { opacity: 0 }),
              }}
            >
              <p className="font-mono text-mono-xs uppercase tracking-[.09em] text-ink-muted mb-3">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3
                className="font-display font-medium text-ink"
                style={{
                  fontSize: "1rem",
                  lineHeight: 1.35,
                  letterSpacing: "-0.01em",
                  marginBottom: "0.75rem",
                }}
              >
                {step.heading}
              </h3>
              <p className="text-body-xs text-ink-2">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
