"use client";
import { Children, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

interface StaggerRevealProps {
  children: ReactNode;
  className?: string;
  itemDelay?: number;
  baseDelay?: number;
}

export function StaggerReveal({
  children,
  className,
  itemDelay = 80,
  baseDelay = 0,
}: StaggerRevealProps) {
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
      ([e]) => setVisible(e.isIntersecting),
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {Children.map(children, (child, i) => (
        <div
          style={
            visible
              ? { animation: `topsys-fade-in 500ms cubic-bezier(.2,0,0,1) ${baseDelay + i * itemDelay}ms both` }
              : { opacity: 0 }
          }
        >
          {child}
        </div>
      ))}
    </div>
  );
}
