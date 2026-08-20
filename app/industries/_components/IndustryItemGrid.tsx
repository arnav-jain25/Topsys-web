"use client";
import { useEffect, useRef, useState } from "react";
import type React from "react";

/** Normalised item shape — callers map their {label/title, body} to this. */
export type IndustryItem = { heading: string; body: string };

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
 * Staggered grid of labelled text items.
 *
 * scheme="field"  → on-field (inverted) colour tokens + field-hairline border
 * scheme="light"  → paper/surface colour tokens + hairline border (default)
 *
 * The top rule of each item extends left→right (topsys-rule-extend) in sync
 * with the item's opacity reveal, so both animations share the same delay.
 */
export function IndustryItemGrid({
  items,
  scheme = "light",
  className = "",
}: {
  items: IndustryItem[];
  scheme?: "field" | "light";
  /** Extra classes appended to the grid wrapper (e.g. mt-12) */
  className?: string;
}) {
  const { ref, visible } = useReveal();
  const isField = scheme === "field";

  return (
    <div
      ref={ref}
      className={`grid grid-cols-3 gap-6 max-[767px]:grid-cols-1 ${className}`}
    >
      {items.map(({ heading, body }, idx) => {
        const delay = idx * 80;
        const revealStyle: React.CSSProperties = visible
          ? { animation: `topsys-fade-in 500ms cubic-bezier(.2,0,0,1) ${delay}ms both` }
          : { opacity: 0 };
        const ruleStyle: React.CSSProperties = visible
          ? { animation: `topsys-rule-extend 500ms cubic-bezier(.2,0,0,1) ${delay}ms both` }
          : { transform: "scaleX(0)" };

        return (
          <div key={heading} className="relative pt-5" style={revealStyle}>
            {/* Extending top rule */}
            <span
              className={`absolute top-0 left-0 right-0 h-px origin-left ${
                isField ? "bg-field-hairline" : "bg-hairline"
              }`}
              style={ruleStyle}
              aria-hidden="true"
            />
            <h3
              className={`font-display font-medium text-heading-4 mb-2 ${
                isField ? "text-on-field" : "text-ink"
              }`}
            >
              {heading}
            </h3>
            <p className={`text-body-xs ${isField ? "text-on-field-2" : "text-ink-2"}`}>
              {body}
            </p>
          </div>
        );
      })}
    </div>
  );
}
