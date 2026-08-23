"use client";
import { useEffect, useRef, useState } from "react";

interface Props {
  problem: string[];
}

export function ProblemSection({ problem }: Props) {
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
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="bg-paper" style={{ padding: "5rem 0" }}>
      <div className="wrap" ref={ref}>
        <div style={{ maxWidth: "68ch" }}>
          <h2
            className="font-display font-medium text-ink"
            style={{
              fontSize: "clamp(1.375rem, 2.4vw, 1.75rem)",
              lineHeight: 1.2,
              letterSpacing: "-0.022em",
              marginBottom: "1.75rem",
            }}
          >
            The problem
          </h2>
          {problem.map((para, i) => (
            <p
              key={i}
              className="text-body text-ink-2"
              style={{
                marginBottom: i < problem.length - 1 ? "1.25rem" : 0,
                ...(visible
                  ? {
                      animation: `topsys-fade-in 500ms cubic-bezier(.2,0,0,1) ${i * 80}ms both`,
                    }
                  : { opacity: 0 }),
              }}
            >
              {para}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
