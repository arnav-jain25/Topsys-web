"use client";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Override the intersection threshold (default 0.15) */
  threshold?: number;
}

/**
 * Wraps content in a div that fades in (via topsys-fade-in keyframe) when
 * scrolled into view via IntersectionObserver. Respects prefers-reduced-motion.
 * Pages stay as server components — this is the leaf client boundary.
 */
export function ScrollReveal({
  children,
  className,
  delay = 0,
  threshold = 0.15,
}: ScrollRevealProps) {
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
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  const style: CSSProperties = visible
    ? { animation: `topsys-fade-in 500ms cubic-bezier(.2,0,0,1) ${delay}ms both` }
    : { opacity: 0 };

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
