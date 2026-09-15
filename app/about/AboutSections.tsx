"use client";
import { useEffect, useRef, useState } from "react";
import type React from "react";

function useReveal<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T>(null);
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

/* -------------------------------------------------------------------------- */
/*  Principles — literal pillars. On desktop, five columns share one common   */
/*  foundation line ("one engagement standard" made visible, not just said):  */
/*  icon capital, a short shaft, then the shared baseline every column rests  */
/*  on. Below 1024px the metaphor doesn't fit five-in-a-row cleanly, so each  */
/*  item falls back to its own top rule instead — a plain card, not a broken  */
/*  pillar.                                                                    */
/* -------------------------------------------------------------------------- */
export interface Principle {
  title: string;
  body: string;
  /* A rendered element, not a component reference — component types
     (functions) can't cross the server→client boundary, but an
     already-rendered ReactNode can. */
  icon: React.ReactNode;
}

const CAPITAL = 44; // icon circle diameter, px
const SHAFT = 22;   // desktop-only connector height, px

export function PrinciplesGrid({ principles }: { principles: Principle[] }) {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <div ref={ref} className="relative">
      {/* The shared foundation line — desktop only, one row of five */}
      <span
        className="hidden min-[1024px]:block absolute left-0 right-0 bg-teal origin-left"
        style={{
          top: CAPITAL + SHAFT,
          height: 2,
          transform: visible ? "scaleX(1)" : "scaleX(0)",
          transition: "transform 700ms cubic-bezier(.2,0,0,1) 260ms",
        }}
        aria-hidden="true"
      />

      <div className="flex flex-wrap gap-x-8 gap-y-10 min-[1024px]:flex-nowrap">
        {principles.map(({ title, body, icon }, idx) => {
          const delay = idx * 90;
          const revealStyle: React.CSSProperties = visible
            ? { animation: `topsys-fade-in 500ms cubic-bezier(.2,0,0,1) ${delay}ms both` }
            : { opacity: 0 };
          const mobileRuleStyle: React.CSSProperties = visible
            ? { animation: `topsys-rule-extend 500ms cubic-bezier(.2,0,0,1) ${delay}ms both` }
            : { transform: "scaleX(0)" };

          return (
            <div
              key={title}
              className="relative flex-1 min-w-[132px] basis-[45%] min-[640px]:basis-[28%] min-[1024px]:basis-0 flex flex-col items-center text-center pt-5 min-[1024px]:pt-0"
              style={revealStyle}
            >
              {/* Mobile/tablet fallback rule — hidden once the pillar row applies */}
              <span
                className="absolute top-0 left-0 right-0 h-0.5 bg-teal origin-left min-[1024px]:hidden"
                style={mobileRuleStyle}
                aria-hidden="true"
              />

              {/* Capital */}
              <span
                className="flex-none flex items-center justify-center rounded-full"
                style={{ width: CAPITAL, height: CAPITAL, background: "var(--color-teal-tint)", color: "var(--color-teal)" }}
                aria-hidden="true"
              >
                {icon}
              </span>

              {/* Shaft — desktop only, connects the capital down to the shared line */}
              <span
                className="hidden min-[1024px]:block flex-none"
                style={{ width: 1, height: SHAFT, background: "var(--color-hairline-strong)" }}
                aria-hidden="true"
              />

              <h3
                className="font-display font-medium text-ink mt-4"
                style={{ fontSize: "1.0625rem", letterSpacing: "-0.012em" }}
              >
                {title}
              </h3>
              <p className="text-body-xs text-ink-2 mt-2 max-w-[24ch]">{body}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
