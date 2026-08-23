"use client";
import { useEffect, useRef, useState } from "react";
import type React from "react";
import type { Office } from "@/lib/offices";

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
        setVisible(entry.isIntersecting);
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, visible };
}

/**
 * Staggered office card grid for the Contact page.
 * Each card fades in on scroll entry; the top hairline rule extends left→right
 * in sync with the opacity reveal.
 */
export function ContactOfficeGrid({ offices }: { offices: Office[] }) {
  const { ref, visible } = useReveal();

  return (
    <div
      ref={ref}
      className="grid grid-cols-4 gap-6 mt-10 max-[767px]:grid-cols-2 max-[479px]:grid-cols-1"
    >
      {offices.map(({ id, label, address, phone, mapsUrl }, idx) => {
        const delay = idx * 80;
        const revealStyle: React.CSSProperties = visible
          ? { animation: `topsys-fade-in 500ms cubic-bezier(.2,0,0,1) ${delay}ms both` }
          : { opacity: 0 };
        const ruleStyle: React.CSSProperties = visible
          ? { animation: `topsys-rule-extend 500ms cubic-bezier(.2,0,0,1) ${delay}ms both` }
          : { transform: "scaleX(0)" };

        return (
          <div key={id} className="relative pt-5" style={revealStyle}>
            <span
              className="absolute top-0 left-0 right-0 h-px bg-hairline origin-left"
              style={ruleStyle}
              aria-hidden="true"
            />
            <h3 className="font-display font-medium text-heading-4 text-ink mb-2">
              {label}
            </h3>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-body-xs text-ink-muted hover:text-teal transition-colors duration-fast ease-standard"
            >
              {address}
            </a>
            {phone && (
              <p className="font-mono text-mono-xs text-ink-muted mt-2">{phone}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
