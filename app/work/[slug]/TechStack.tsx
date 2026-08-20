"use client";
import { useEffect, useRef, useState } from "react";

interface Props {
  tech: string[];
  metric: string | null;
}

export function TechStack({ tech, metric }: Props) {
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
        if (e.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="bg-paper" style={{ padding: "4rem 0" }}>
      <div className="wrap" ref={ref}>
        <div className="border-t border-hairline pt-6">
          <p className="font-mono text-mono-xs uppercase tracking-[.1em] text-ink-muted mb-4">
            Technologies used
          </p>
          <div className="flex flex-wrap gap-2 items-center">
            {tech.map((t, i) => (
              <span
                key={t}
                className="font-mono text-mono-sm text-ink-2 border border-hairline rounded-control px-3 py-1"
                style={
                  visible
                    ? {
                        animation: `topsys-fade-in 500ms cubic-bezier(.2,0,0,1) ${i * 50}ms both`,
                      }
                    : { opacity: 0 }
                }
              >
                {t}
              </span>
            ))}
            {metric && (
              <span
                className="font-mono text-mono-sm font-medium text-teal border border-teal-tint rounded-control px-3 py-1 ml-2"
                style={
                  visible
                    ? {
                        animation: `topsys-fade-in 500ms cubic-bezier(.2,0,0,1) ${tech.length * 50}ms both`,
                      }
                    : { opacity: 0 }
                }
              >
                {metric}
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
