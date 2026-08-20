"use client";

import { useEffect, useRef, useState } from "react";

interface StatItem {
  value: number | string;
  suffix?: string;
  label: string;
  /** When true, skips the count-up and renders the value as-is (e.g. "MBE") */
  static?: boolean;
}

function useCountUp(target: number, active: boolean, duration = 1200) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    const raf = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }, [active, target, duration]);
  return count;
}

function Stat({ value, suffix = "", label, static: isStatic }: StatItem) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const numeric = typeof value === "number" ? value : 0;
  const counted = useCountUp(numeric, visible && !isStatic);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); io.disconnect(); } },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`relative pt-4 transition-all duration-slow ease-standard ${visible ? "before:scale-x-100" : "before:scale-x-0"} before:absolute before:top-0 before:left-0 before:right-0 before:h-0.5 before:bg-signature before:rounded-sm before:origin-left before:transition-transform before:duration-[700ms] before:ease-standard`}
    >
      <b
        className="block text-center font-mono font-normal leading-none"
        style={{
          fontSize: "clamp(2.125rem, 4vw, 3.375rem)",
          letterSpacing: "-0.03em",
        }}
      >
        {isStatic
          ? value
          : `${visible ? counted : 0}${suffix}`}
      </b>
      <small
        className="block text-center mt-3 font-mono text-mono-sm uppercase text-ink-muted"
        style={{ letterSpacing: "0.1em" }}
      >
        {label}
      </small>
    </div>
  );
}

const STATS: StatItem[] = [
  { value: 20, suffix: "+", label: "Years experience" },
  { value: 4, label: "Countries" },
  { value: 30, suffix: "+", label: "States served" },
  { value: "MBE", label: "Certified", static: true },
];

export function StatBar() {
  return (
    <div className="grid grid-cols-4 gap-8 max-[1023px]:grid-cols-2 max-[600px]:grid-cols-1">
      {STATS.map((s) => (
        <Stat key={s.label} {...s} />
      ))}
    </div>
  );
}
