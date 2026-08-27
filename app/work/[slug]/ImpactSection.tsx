"use client";

import { useEffect, useRef, useState } from "react";
import type { ImpactMetric, ImpactStatement } from "@/lib/case-studies";

/* ── Numeric count-up helper ──────────────────────────────────────────── */

function parseMetricValue(v: string): { pre: string; num: number; post: string } | null {
  const m = v.match(/^(\D*)([\d.]+)(\D*)$/);
  if (!m) return null;
  return { pre: m[1], num: parseFloat(m[2]), post: m[3] };
}

function formatNum(raw: number, isFloat: boolean): string {
  if (!isFloat) return String(Math.round(raw));
  // Keep up to 2 decimal places, strip trailing zeros
  return raw.toFixed(2).replace(/\.?0+$/, "");
}

/* ── Single stat tile ─────────────────────────────────────────────────── */

function MetricTile({
  metric,
  visible,
  delay,
}: {
  metric: ImpactMetric;
  visible: boolean;
  delay: number;
}) {
  const parsed = parseMetricValue(metric.value);
  const isFloat = parsed ? parsed.num % 1 !== 0 : false;
  const [displayed, setDisplayed] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!visible || !parsed) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setDisplayed(parsed.num);
      return;
    }

    // Wait `delay` ms then count up over 900 ms with ease-out-cubic
    const target = parsed.num;
    const duration = 900;
    let startTs: number | null = null;

    const tick = (ts: number) => {
      if (startTs === null) startTs = ts;
      const elapsed = ts - startTs;
      if (elapsed < delay) { rafRef.current = requestAnimationFrame(tick); return; }
      const adjusted = elapsed - delay;
      const progress = Math.min(adjusted / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayed(eased * target);
      if (progress < 1) rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, parsed?.num]);

  const displayValue = parsed
    ? `${parsed.pre}${formatNum(displayed, isFloat)}${parsed.post}`
    : metric.value;

  return (
    <div
      className={[
        "flex flex-col py-10",
        "px-8 first:pl-0 last:pr-0",
        "max-[767px]:py-8 max-[767px]:px-0",
        "border-r border-field-hairline last:border-r-0",
        "max-[767px]:border-r-0 max-[767px]:border-b max-[767px]:last:border-b-0",
      ].join(" ")}
      style={
        visible
          ? { animation: `topsys-fade-in 500ms cubic-bezier(.2,0,0,1) ${delay}ms both` }
          : { opacity: 0 }
      }
    >
      <span
        className="font-mono font-medium text-signal tabular-nums"
        style={{
          fontSize: "clamp(2.25rem, 5vw, 3.75rem)",
          lineHeight: 1,
          letterSpacing: "-0.035em",
        }}
      >
        {displayValue}
      </span>
      <span className="font-mono text-mono-xs uppercase tracking-[.08em] text-on-field-2 mt-3">
        {metric.label}
      </span>
      {metric.detail && (
        <span
          className="font-body text-body-xs mt-1"
          style={{ color: "rgba(168,191,190,0.55)" }}
        >
          {metric.detail}
        </span>
      )}
    </div>
  );
}

/* ── Single statement pillar ──────────────────────────────────────────── */

function StatementPillar({
  statement,
  visible,
  delay,
  first,
}: {
  statement: ImpactStatement;
  visible: boolean;
  delay: number;
  first: boolean;
}) {
  return (
    <div
      className={[
        "py-8",
        first ? "pr-8 max-[767px]:pr-0" : "px-8 max-[767px]:px-0",
        "border-r border-field-hairline last:border-r-0",
        "max-[767px]:border-r-0 max-[767px]:border-b max-[767px]:last:border-b-0",
      ].join(" ")}
      style={
        visible
          ? { animation: `topsys-fade-in 500ms cubic-bezier(.2,0,0,1) ${delay}ms both` }
          : { opacity: 0 }
      }
    >
      {/* Eyebrow — signal green on field = accent per design rules */}
      <p
        className="font-mono text-mono-xs uppercase tracking-[.08em] text-signal mb-3"
        style={{ lineHeight: 1.4 }}
      >
        {statement.heading}
      </p>
      {/* Extending accent line */}
      <div
        className="mb-4"
        style={{
          height: "1px",
          width: "2rem",
          background: "var(--color-signal)",
          opacity: 0.45,
        }}
        aria-hidden="true"
      />
      <p className="text-body-sm text-on-field-2" style={{ maxWidth: "30ch", lineHeight: 1.65 }}>
        {statement.body}
      </p>
    </div>
  );
}

/* ── Main section ─────────────────────────────────────────────────────── */

interface ImpactSectionProps {
  headline: string;
  metrics?: ImpactMetric[];
  statements?: ImpactStatement[];
}

export function ImpactSection({ headline, metrics, statements }: ImpactSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) { setVisible(true); return; }

    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) { setVisible(true); io.disconnect(); }
      },
      { threshold: 0.08 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const hasMetrics = metrics && metrics.length > 0;
  const hasStatements = statements && statements.length > 0;

  // Delay budget: eyebrow 0ms, headline 80ms, first metric/statement 200ms
  const statementBase = hasMetrics ? 200 + metrics!.length * 80 : 200;

  return (
    <section
      className="on-field"
      style={{ background: "var(--color-field)", padding: "5rem 0" }}
    >
      <div className="wrap" ref={ref}>
        {/* ── Eyebrow ── */}
        <p
          className="font-mono text-mono-xs uppercase tracking-[.1em] text-on-field-2 mb-4"
          style={visible ? { animation: "topsys-fade-in 500ms cubic-bezier(.2,0,0,1) 0ms both" } : { opacity: 0 }}
        >
          Outcome
        </p>

        {/* ── Headline ── */}
        <h2
          className="font-display font-medium text-on-field"
          style={{
            fontSize: "clamp(1.375rem, 2.4vw, 1.875rem)",
            lineHeight: 1.18,
            letterSpacing: "-0.022em",
            maxWidth: "40ch",
            marginBottom: hasMetrics || hasStatements ? "3rem" : 0,
            ...(visible
              ? { animation: "topsys-fade-in 500ms cubic-bezier(.2,0,0,1) 80ms both" }
              : { opacity: 0 }),
          }}
        >
          {headline}
        </h2>

        {/* ── Metrics grid ── */}
        {hasMetrics && (
          <div
            className="border-t border-b border-field-hairline"
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${metrics!.length}, 1fr)`,
            }}
          >
            {metrics!.map((m, i) => (
              <MetricTile
                key={m.label}
                metric={m}
                visible={visible}
                delay={200 + i * 80}
              />
            ))}
          </div>
        )}

        {/* ── Statements grid ── */}
        {hasStatements && (
          <div
            className="border-t border-field-hairline max-[767px]:border-t"
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${Math.min(statements!.length, 3)}, 1fr)`,
              marginTop: hasMetrics ? "3rem" : 0,
            }}
          >
            {statements!.map((s, i) => (
              <StatementPillar
                key={s.heading}
                statement={s}
                visible={visible}
                delay={statementBase + i * 80}
                first={i === 0}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
