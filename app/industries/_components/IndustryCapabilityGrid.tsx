"use client";
import { useEffect, useRef, useState } from "react";
import type React from "react";

export type Capability = {
  title: string;
  body: string;
  tech: string[];
};

function useReveal(threshold = 0.15) {
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
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, visible };
}

/**
 * Capabilities card grid with:
 * - Staggered opacity reveal on scroll entry
 * - Hover: -3px lift + e2 shadow
 * - Hover: gradient sweep on the top edge (bg-signature)
 */
export function IndustryCapabilityGrid({
  capabilities,
}: {
  capabilities: Capability[];
}) {
  const { ref, visible } = useReveal();

  return (
    <div ref={ref} className="grid grid-cols-3 gap-6 mt-10 max-[767px]:grid-cols-1">
      {capabilities.map(({ title, body, tech }, idx) => {
        const revealStyle: React.CSSProperties = visible
          ? { animation: `topsys-fade-in 500ms cubic-bezier(.2,0,0,1) ${idx * 80}ms both` }
          : { opacity: 0 };

        return (
          <div
            key={title}
            className="group relative overflow-hidden bg-white border border-hairline rounded-card px-7 py-7 hover:border-transparent hover:shadow-e2 hover:-translate-y-[3px] transition-all duration-base ease-standard"
            style={revealStyle}
          >
            {/* Top-edge gradient sweep — one of four permitted bg-signature uses */}
            <span
              className="absolute top-0 left-0 right-0 h-[3px] bg-signature scale-x-0 origin-left transition-transform duration-base ease-standard group-hover:scale-x-100"
              aria-hidden="true"
            />
            <h3 className="font-display font-medium text-heading-3 text-ink mb-3">
              {title}
            </h3>
            <p className="text-body-xs text-ink-2 mb-5">{body}</p>
            <ul className="flex flex-wrap gap-2" aria-label="Technologies">
              {tech.map((t) => (
                <li
                  key={t}
                  className="font-mono text-mono-xs px-2.5 py-1 border border-hairline rounded-full text-ink-muted"
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
