"use client";
import { Children, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

interface StaggerRevealProps {
  children: ReactNode;
  /** Applied to the container div — put your grid/flex classes here */
  className?: string;
  /** Delay added per item, in ms (default 80) */
  itemDelay?: number;
  /** Initial delay before the first item animates, in ms (default 0) */
  baseDelay?: number;
}

/**
 * Grid/flex container that stagger-reveals its direct children as the section
 * scrolls into view. Each child is wrapped in a transparent div that carries the
 * animation; the child's own styles (border, padding, hover effects) are unaffected.
 * Respects prefers-reduced-motion.
 */
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
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
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
              ? {
                  animation: `topsys-fade-in 500ms cubic-bezier(.2,0,0,1) ${baseDelay + i * itemDelay}ms both`,
                }
              : { opacity: 0 }
          }
        >
          {child}
        </div>
      ))}
    </div>
  );
}
