"use client";

import { useEffect, useRef, useState } from "react";

interface StatItem {
  value: number | string;
  suffix?: string;
  label: string;
  static?: boolean;
}

const STATS: StatItem[] = [
  { value: 20, suffix: "+", label: "Years experience" },
  { value: 4,              label: "Countries" },
  { value: 30,             label: "State engagements" },
  { value: "MBE",          label: "Certified", static: true },
];

/* Pentagon geometry — circumradius 50 in a 110×110 viewBox */
const PR = 50, PC = 55;
function pPts(rotDeg = 0) {
  return Array.from({ length: 5 }, (_, i) => {
    const a = ((-90 + i * 72 + rotDeg) * Math.PI) / 180;
    return `${PC + PR * Math.cos(a)},${PC + PR * Math.sin(a)}`;
  }).join(" ");
}
const PERIM = 5 * 2 * PR * Math.sin(Math.PI / 5); // ≈ 293.9

/* ── Count-up hook ── */
function useCountUp(target: number, active: boolean, duration = 1400) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) { setCount(0); return; }
    const t0 = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);
  return count;
}

/* ── Horizontal row stat — original layout, unchanged ── */
function StatRow({ value, suffix = "", label, static: isStatic }: StatItem) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const numeric = typeof value === "number" ? value : 0;
  const counted = useCountUp(numeric, visible && !isStatic);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => setVisible(e.isIntersecting),
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`relative pt-4 transition-all duration-slow ease-standard ${
        visible ? "before:scale-x-100" : "before:scale-x-0"
      } before:absolute before:top-0 before:left-0 before:right-0 before:h-0.5 before:bg-signature before:rounded-sm before:origin-left before:transition-transform before:duration-[700ms] before:ease-standard`}
    >
      <b className="block text-center font-mono font-normal leading-none" style={{ fontSize: "clamp(2.125rem, 4.2vw, 4rem)", letterSpacing: "-0.03em" }}>
        {isStatic ? value : `${visible ? counted : 0}${suffix}`}
      </b>
      <small className="block text-center mt-3 font-mono text-mono-sm uppercase text-ink-muted" style={{ letterSpacing: "0.1em" }}>
        {label}
      </small>
    </div>
  );
}

/* ── Individual pentagon stat — number inside, label beside or below ── */
function PentagonStat({
  value, suffix = "", label, static: isStatic,
  ready, delay, rotDeg, stacked = false, size = 165, gradId = "stat-pent-grad",
}: StatItem & {
  ready: boolean;
  delay: number;
  rotDeg: number;
  /** Label sits under the pentagon instead of to its right. */
  stacked?: boolean;
  size?: number;
  /** id of the <linearGradient> the owning layout defined. */
  gradId?: string;
}) {
  const numeric = typeof value === "number" ? value : 0;
  const counted = useCountUp(numeric, ready && !isStatic, 1500);
  const display = isStatic ? String(value) : `${ready ? counted : 0}${suffix}`;
  const pts = pPts(rotDeg);

  return (
    <div className={stacked ? "flex flex-col items-center gap-1" : "flex items-center gap-5"}>
      {/* Pentagon with number inside */}
      <div className="relative flex-none" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox="0 0 110 110" aria-hidden="true">
          <polygon points={pts} fill="var(--color-surface)" />
          {/*
            strokeDashoffset ONLY in style (not as a prop) so the CSS
            transition can interpolate it. Prop + style conflict causes
            the animation to fire instantly (static appearance).
          */}
          <polygon
            points={pts}
            fill="none"
            stroke={`url(#${gradId})`}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={PERIM}
            style={{
              strokeDashoffset: ready ? 0 : PERIM,
              transition: `stroke-dashoffset 850ms ${delay}ms cubic-bezier(.2,0,0,1)`,
            }}
          />
        </svg>
        {/* Number centred inside the pentagon */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <b
            className="font-mono font-normal leading-none"
            style={{ fontSize: "clamp(2rem, 2.75vw, 3rem)", letterSpacing: "-0.04em", color: "var(--color-ink)" }}
          >
            {display}
          </b>
        </div>
      </div>

      {/* Label — bold mono, beside the pentagon or centred under it */}
      <p
        className={`font-mono uppercase font-bold text-ink leading-snug ${stacked ? "text-center" : ""}`}
        style={{ fontSize: "13px", letterSpacing: ".09em", maxWidth: stacked ? "14ch" : "10ch" }}
      >
        {label}
      </p>
    </div>
  );
}

/* ── Horizontal band — four pentagons spread evenly across the page width ── */
function StatBand() {
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          requestAnimationFrame(() =>
            requestAnimationFrame(() => setReady(true))
          );
        } else {
          setReady(false);
        }
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref}>
      <svg width="0" height="0" aria-hidden="true" style={{ position: "absolute", overflow: "hidden" }}>
        <defs>
          <linearGradient id="stat-band-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#0D5278" />
            <stop offset="55%"  stopColor="#2C8A6E" />
            <stop offset="100%" stopColor="#8DC63E" />
          </linearGradient>
        </defs>
      </svg>

      <div className="grid grid-cols-4 gap-6 max-[767px]:grid-cols-2 max-[767px]:gap-y-10">
        {STATS.map((stat, i) => (
          <div key={stat.label} className="flex justify-center">
            <PentagonStat
              {...stat}
              ready={ready}
              delay={i * 180}
              rotDeg={i * 36}
              stacked
              size={172}
              gradId="stat-band-grad"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Vertical zigzag column — fills the full height of its grid cell ── */
function StatColumn() {
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          /*
            Double rAF: lets the browser paint one frame with dashoffset = PERIM
            (invisible) before the CSS transition fires toward 0 (drawn).
            Works every scroll entry because the else branch resets ready=false
            while the element is off-screen.
          */
          requestAnimationFrame(() =>
            requestAnimationFrame(() => setReady(true))
          );
        } else {
          setReady(false); // reset off-screen so next entry re-animates
        }
      },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative h-full">
      {/* Shared gradient definition — one instance, referenced by all pentagons */}
      <svg width="0" height="0" aria-hidden="true" style={{ position: "absolute", overflow: "hidden" }}>
        <defs>
          <linearGradient id="stat-pent-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#0D5278" />
            <stop offset="55%"  stopColor="#2C8A6E" />
            <stop offset="100%" stopColor="#8DC63E" />
          </linearGradient>
        </defs>
      </svg>

      {/* All stats left-aligned, tightly packed */}
      <div className="flex flex-col gap-3">
        {STATS.map((stat, i) => (
          <PentagonStat
            key={stat.label}
            {...stat}
            ready={ready}
            delay={i * 200}
            rotDeg={i * 36}
          />
        ))}
      </div>
    </div>
  );
}

/* ── Public export ── */
export function StatBar({ layout = "row" }: { layout?: "row" | "column" | "band" }) {
  if (layout === "band") return <StatBand />;
  if (layout === "column") return <StatColumn />;
  return (
    <div className="grid grid-cols-4 gap-8 max-[1023px]:grid-cols-2 max-[600px]:grid-cols-1">
      {STATS.map((s) => <StatRow key={s.label} {...s} />)}
    </div>
  );
}
