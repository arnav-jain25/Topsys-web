"use client";

import { useState, useEffect, useRef } from "react";

const CLOSING = "Or both.";

export function CyclingModelHeading() {
  const ref = useRef<HTMLHeadingElement>(null);
  const [reduced, setReduced] = useState(false);
  const [inView, setInView] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  /* Start typing once the heading is visible */
  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  /* Typewriter — advances one character every 80ms */
  useEffect(() => {
    if (!inView || done) return;
    if (charCount < CLOSING.length) {
      const t = setTimeout(() => setCharCount((c) => c + 1), 80);
      return () => clearTimeout(t);
    }
    setDone(true);
  }, [inView, charCount, done]);

  const displayed = CLOSING.slice(0, charCount);

  return (
    <h2
      ref={ref}
      className="font-display font-medium text-on-field mt-4"
      style={{
        fontSize: "clamp(1.875rem, 3.8vw, 2.875rem)",
        letterSpacing: "-0.028em",
        maxWidth: "22ch",
      }}
    >
      Build the solution. Build the team.{" "}
      {reduced ? (
        <span style={{ color: "var(--color-signal)" }}>{CLOSING}</span>
      ) : (
        <span style={{ color: "var(--color-signal)", whiteSpace: "nowrap" }}>
          {displayed}
          <span
            aria-hidden="true"
            style={{
              display: "inline-block",
              width: 2,
              height: "0.82em",
              background: "var(--color-signal)",
              marginLeft: 3,
              verticalAlign: "middle",
              animation: "cursor-blink 1s step-end infinite",
            }}
          />
        </span>
      )}
    </h2>
  );
}
