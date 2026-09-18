"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
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
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function useCountUp(target: number, active: boolean, duration = 1200) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
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

/* -------------------------------------------------------------------------- */
/*  Dossier section — the page's running device. A numbered label sits        */
/*  beside (or above) every section instead of the purple-dash eyebrow used   */
/*  elsewhere on the site, so the page reads like a numbered file rather      */
/*  than another stack of marketing sections.                                 */
/* -------------------------------------------------------------------------- */
export function DossierSection({
  n,
  label,
  children,
  inverted = false,
  id,
  stacked = false,
}: {
  n: string;
  label: string;
  children: React.ReactNode;
  inverted?: boolean;
  id?: string;
  stacked?: boolean;
}) {
  const numStyle: React.CSSProperties = {
    letterSpacing: ".08em",
    color: inverted ? "var(--color-signal)" : "#6D28D9",
  };
  const labelClass = `font-mono text-mono-xs uppercase tracking-[.1em] ${
    inverted ? "text-on-field-2" : "text-ink-muted"
  }`;

  if (stacked) {
    return (
      <div id={id} style={{ scrollMarginTop: 100 }}>
        <div className="flex items-baseline gap-2.5 mb-5">
          <span className="font-mono text-mono-xs uppercase" style={numStyle}>
            {n}
          </span>
          <span aria-hidden="true" className={labelClass} style={{ opacity: 0.5 }}>
            ·
          </span>
          <span className={labelClass} style={{ opacity: 0.85 }}>
            {label}
          </span>
        </div>
        {children}
      </div>
    );
  }

  return (
    <div
      id={id}
      className="grid grid-cols-[64px_1fr] gap-x-8 max-[820px]:grid-cols-1 max-[820px]:gap-y-5"
      style={{ scrollMarginTop: 100 }}
    >
      <div className="sticky self-start max-[820px]:static" style={{ top: 128 }}>
        <span className="block font-mono text-mono-xs uppercase" style={numStyle}>
          {n}
        </span>
        <span className={`block mt-1 ${labelClass}`} style={{ opacity: 0.85 }}>
          {label}
        </span>
      </div>
      <div>{children}</div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Footprint. Three figures set at headline scale, each its own block (no    */
/*  shared hairlines — the section already sits on a ruled grid, and a line   */
/*  crossing a grid reads as noise), numbers left-aligned in a fixed column   */
/*  so they stack cleanly regardless of digit count. The sectors they were    */
/*  delivered into fill the right column instead of leaving it empty.         */
/* -------------------------------------------------------------------------- */
export interface RegisterStat {
  value: number | string;
  suffix?: string;
  label: string;
  note: string;
  static?: boolean;
}

function FootprintRow({
  stat,
  visible,
  delay,
}: {
  stat: RegisterStat;
  visible: boolean;
  delay: number;
}) {
  const numeric = typeof stat.value === "number" ? stat.value : 0;
  const counted = useCountUp(numeric, visible && !stat.static);
  const display = stat.static ? stat.value : `${visible ? counted : 0}${stat.suffix ?? ""}`;
  return (
    <div
      className="flex items-start gap-6 max-[520px]:gap-4"
      style={
        visible
          ? { animation: `topsys-fade-in 500ms cubic-bezier(.2,0,0,1) ${delay}ms both` }
          : { opacity: 0 }
      }
    >
      <b
        className="font-mono font-normal text-signal tabular-nums flex-none"
        style={{
          fontSize: "clamp(2.5rem, 5.4vw, 4.25rem)",
          lineHeight: 0.88,
          letterSpacing: "-0.04em",
          width: "3.25ch",
          textAlign: "left",
        }}
      >
        {display}
      </b>
      <div className="pt-1.5 max-[520px]:pt-1">
        <p className="font-mono text-mono-sm uppercase tracking-[.1em] text-on-field">{stat.label}</p>
        <p className="text-body-sm text-on-field-2 mt-1.5 max-w-[34ch]">{stat.note}</p>
      </div>
    </div>
  );
}

export function FootprintPanel({
  stats,
  sectors,
}: {
  stats: RegisterStat[];
  sectors: { name: string; href: string }[];
}) {
  const { ref, visible } = useReveal<HTMLDivElement>(0.2);
  return (
    <div ref={ref} className="grid gap-x-14 gap-y-10 min-[980px]:grid-cols-[1.5fr_1fr] items-start">
      <div className="flex flex-col gap-8">
        {stats.map((stat, i) => (
          <FootprintRow key={stat.label} stat={stat} visible={visible} delay={i * 140} />
        ))}
      </div>

      <div
        style={{
          background: "var(--color-field-raised)",
          border: "1px solid var(--color-field-hairline)",
          borderRadius: 6,
          padding: "1.625rem 1.5rem 1.375rem",
          ...(visible
            ? { animation: `topsys-fade-in 500ms cubic-bezier(.2,0,0,1) 320ms both` }
            : { opacity: 0 }),
        }}
      >
        <p className="font-mono text-mono-xs uppercase tracking-[.1em] text-signal">Delivered into</p>
        <div className="flex flex-col gap-3 mt-4">
          {sectors.map((sector, i) => (
            <Link
              key={sector.name}
              href={sector.href}
              className="group flex items-center justify-between gap-3 px-4 py-3.5"
              style={{ background: "var(--color-field)", borderRadius: 4 }}
            >
              <span className="flex items-baseline gap-3">
                <span className="font-mono text-mono-xs text-on-field-2" style={{ opacity: 0.7 }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-display font-medium text-on-field group-hover:text-signal transition-colors duration-fast ease-standard">
                  {sector.name}
                </span>
              </span>
              <span
                aria-hidden="true"
                className="text-on-field-2 group-hover:text-signal transition-all duration-fast ease-standard group-hover:translate-x-0.5"
              >
                →
              </span>
            </Link>
          ))}
        </div>
        <p className="text-body-xs text-on-field-2 mt-4">
          Regulated environments, audited systems, programs where an outage is a{" "}
          <em>public</em> event.
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  The five principles set as stops on a single line, because that is what  */
/*  they literally are: "one engagement standard" made visible as one        */
/*  unbroken run instead of five equal feature tiles. The line has a         */
/*  destination — the outcome every stop is in service of — set apart from   */
/*  the other five and the only node colored, because it is the only one     */
/*  that is not a rule but a result.                                         */
/* -------------------------------------------------------------------------- */
export interface Principle {
  title: string;
  body: React.ReactNode;
}

function LineStop({
  title,
  body,
  i,
  visible,
}: {
  title: string;
  body: React.ReactNode;
  i: number;
  visible: boolean;
}) {
  return (
    <div
      className="relative flex-1 min-w-[150px] flex flex-col items-start"
      style={
        visible
          ? { animation: `topsys-fade-in 500ms cubic-bezier(.2,0,0,1) ${i * 110}ms both` }
          : { opacity: 0 }
      }
    >
      <span
        aria-hidden="true"
        className="flex-none rounded-full"
        style={{
          width: 13,
          height: 13,
          background: "var(--color-paper)",
          border: "2px solid var(--color-teal)",
        }}
      />
      <div className="mt-4">
        <span className="font-mono text-mono-xs text-ink-muted">{String(i + 1).padStart(2, "0")}</span>
        <h3
          className="font-display font-medium text-ink mt-1.5"
          style={{ fontSize: "1.0625rem", letterSpacing: "-0.014em", lineHeight: 1.25 }}
        >
          {title}
        </h3>
        <p className="text-body-xs text-ink-2 mt-2 max-w-[24ch]">{body}</p>
      </div>
    </div>
  );
}

export function StandardLine({
  principles,
  outcome,
}: {
  principles: Principle[];
  outcome: string;
}) {
  const { ref, visible } = useReveal<HTMLDivElement>(0.15);

  return (
    <div ref={ref} className="relative">
      <div
        className="hidden min-[900px]:block absolute origin-left"
        style={{
          left: 0,
          right: "17%",
          top: 6,
          height: 2,
          background: "var(--color-teal)",
          transform: visible ? "scaleX(1)" : "scaleX(0)",
          transition: "transform 900ms cubic-bezier(.2,0,0,1)",
        }}
        aria-hidden="true"
      />

      <div className="flex flex-wrap min-[900px]:flex-nowrap gap-x-8 gap-y-10">
        {principles.map((p, i) => (
          <LineStop key={p.title} title={p.title} body={p.body} i={i} visible={visible} />
        ))}

        {/* The terminus — not a sixth rule, the result the other five add up to */}
        <div
          className="relative flex-1 min-w-[190px] flex flex-col items-start"
          style={
            visible
              ? { animation: `topsys-fade-in 500ms cubic-bezier(.2,0,0,1) ${principles.length * 110 + 120}ms both` }
              : { opacity: 0 }
          }
        >
          <span
            aria-hidden="true"
            className="flex-none rounded-full"
            style={{ width: 17, height: 17, background: "var(--color-teal)" }}
          />
          <div
            className="mt-4 pl-4"
            style={{ borderLeft: "2px solid var(--color-teal)" }}
          >
            <span className="font-mono text-mono-xs uppercase tracking-[.08em] text-teal">The outcome</span>
            <p
              className="text-ink mt-2"
              style={{
                fontFamily: "var(--font-accent)",
                fontWeight: 700,
                fontSize: "2.25rem",
                letterSpacing: "0",
                lineHeight: 1.1,
              }}
            >
              {outcome}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  The method as a descending staircase: each step drops and indents from    */
/*  the one above it. Filled teal nodes and a solid teal connector (rather    */
/*  than an outline on a grey hairline) give it weight; a chevron rides each  */
/*  connector to read as forward motion, not just a list with steps.          */
/* -------------------------------------------------------------------------- */
export interface EngagementStep {
  n: string;
  title: string;
  body: React.ReactNode;
}

const STEP_GAP = 42;
const NODE = 38;

function StepConnector({ visible, delay }: { visible: boolean; delay: number }) {
  return (
    <span
      aria-hidden="true"
      className="absolute flex items-center justify-center origin-top"
      style={{
        left: NODE / 2 - 1,
        top: -STEP_GAP,
        width: 2,
        height: STEP_GAP,
        background: "var(--color-teal)",
        opacity: 0.55,
        transform: visible ? "scaleY(1)" : "scaleY(0)",
        transition: `transform 420ms cubic-bezier(.2,0,0,1) ${delay}ms`,
      }}
    >
      <span
        className="font-mono"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%) rotate(90deg)",
          fontSize: 10,
          color: "var(--color-teal)",
          opacity: visible ? 0.9 : 0,
          transition: `opacity 300ms ease-out ${delay + 250}ms`,
        }}
      >
        ▸
      </span>
    </span>
  );
}

export function MethodStaircase({ steps }: { steps: EngagementStep[] }) {
  const { ref, visible } = useReveal<HTMLDivElement>(0.12);
  return (
    <div ref={ref} className="mt-9">
      {steps.map((step, i) => (
        <div
          key={step.n}
          className="relative"
          style={{
            marginLeft: i === 0 ? 0 : `clamp(0px, ${i * 3.4}vw, ${i * 36}px)`,
            marginTop: i === 0 ? 0 : STEP_GAP,
            ...(visible
              ? { animation: `topsys-fade-in 500ms cubic-bezier(.2,0,0,1) ${200 + i * 150}ms both` }
              : { opacity: 0 }),
          }}
        >
          {i > 0 && <StepConnector visible={visible} delay={90 + i * 150} />}

          <div className="flex items-start gap-4">
            <span
              className="inline-flex items-center justify-center font-mono font-medium text-mono-sm flex-none"
              style={{
                width: NODE,
                height: NODE,
                borderRadius: "50%",
                color: "#fff",
                background: "var(--color-teal)",
              }}
            >
              {step.n}
            </span>

            <div className="pt-1.5">
              <h3
                className="font-display font-medium text-ink"
                style={{ fontSize: "1.1875rem", letterSpacing: "-0.016em" }}
              >
                {step.title}
              </h3>
              <p className="text-body-sm text-ink-2 mt-1.5 max-w-[46ch]">{step.body}</p>
            </div>
          </div>
        </div>
      ))}

      {/* Terminal marker — the staircase lands somewhere */}
      <div
        className="relative"
        style={{
          marginLeft: `clamp(0px, ${steps.length * 3.4}vw, ${steps.length * 36}px)`,
          marginTop: STEP_GAP,
          ...(visible
            ? { animation: `topsys-fade-in 500ms cubic-bezier(.2,0,0,1) ${200 + steps.length * 150}ms both` }
            : { opacity: 0 }),
        }}
      >
        <StepConnector visible={visible} delay={90 + steps.length * 150} />
        <span
          className="inline-flex items-center gap-2.5 font-mono text-mono-xs uppercase tracking-[.1em]"
          style={{
            color: "#fff",
            background: "var(--color-teal)",
            borderRadius: 2,
            padding: "0.5rem 0.875rem",
          }}
        >
          <span aria-hidden="true">↳</span> In production
        </span>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Credentials grouped by what they actually are, each its own block — no    */
/*  shared hairlines running across the section's ruled-paper ground. No      */
/*  status column: every line here is current, so a column of identical      */
/*  "on file" stamps carried no information.                                  */
/* -------------------------------------------------------------------------- */
export interface CredentialItem {
  kind: string;
  label: string;
  note?: React.ReactNode;
  href?: string;
}

export function CredentialLedger({ items }: { items: CredentialItem[] }) {
  const { ref, visible } = useReveal<HTMLDivElement>(0.15);
  return (
    <div ref={ref} className="flex flex-col gap-3 mt-8">
      {items.map((item, i) => (
        <div
          key={item.label}
          className="grid grid-cols-[9.5ch_1fr] gap-x-5 gap-y-1 p-5 max-[420px]:grid-cols-1"
          style={{
            background: "var(--color-paper)",
            borderRadius: 6,
            ...(visible
              ? { animation: `topsys-fade-in 450ms cubic-bezier(.2,0,0,1) ${i * 90}ms both` }
              : { opacity: 0 }),
          }}
        >
          <span className="font-mono text-mono-xs uppercase tracking-[.09em] text-ink-muted pt-1">
            {item.kind}
          </span>
          <div>
            <p className="font-display font-medium text-ink" style={{ fontSize: "1.0625rem", letterSpacing: "-0.012em" }}>
              {item.label}
            </p>
            {item.note && <p className="text-body-xs text-ink-2 mt-1">{item.note}</p>}
            {item.href && (
              <Link
                href={item.href}
                className="inline-flex items-center gap-1.5 font-mono text-mono-xs uppercase tracking-[.08em] text-teal mt-2 group"
              >
                Contract details
                <span aria-hidden="true" className="transition-transform duration-fast ease-standard group-hover:translate-x-0.5">
                  →
                </span>
              </Link>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Pull quote — a sentence lifted out of the Conviction column, standalone   */
/*  enough to carry the accent script rather than plain italic Archivo.       */
/* -------------------------------------------------------------------------- */
export function PullQuote({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-ink"
      style={{
        fontFamily: "var(--font-accent)",
        fontWeight: 700,
        fontSize: "clamp(2.25rem, 4vw, 3rem)",
        letterSpacing: "0",
        lineHeight: 1.05,
      }}
    >
      {children}
    </p>
  );
}

/* -------------------------------------------------------------------------- */
/*  Visionary quotes — two facing pages, light and dark, each with a kicker   */
/*  tying the borrowed line to something this firm actually does, and the     */
/*  published source set in the footer the way a citation belongs.            */
/* -------------------------------------------------------------------------- */
export interface VisionaryQuote {
  kicker: string;
  quote: React.ReactNode;
  name: string;
  role: string;
  source: string;
}

function QuotePanel({ data, dark }: { data: VisionaryQuote; dark?: boolean }) {
  return (
    <div
      className={`relative flex flex-col justify-between gap-6 px-12 py-8 max-[820px]:px-6 max-[820px]:py-6 ${
        dark ? "on-field" : ""
      }`}
    >
      <p
        className={`font-mono text-mono-xs uppercase tracking-[.12em] ${dark ? "text-signal" : ""}`}
        style={dark ? undefined : { color: "#6D28D9" }}
      >
        {data.kicker}
      </p>

      <p
        className={dark ? "text-on-field" : "text-ink"}
        style={{
          fontFamily: "var(--font-accent)",
          fontWeight: 700,
          fontSize: "clamp(2.25rem, 4.2vw, 3.25rem)",
          letterSpacing: "0",
          lineHeight: 1.08,
        }}
      >
        &ldquo;{data.quote}&rdquo;
      </p>

      <div
        className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 pt-3"
        style={{ borderTop: `1px solid ${dark ? "var(--color-field-hairline)" : "var(--color-hairline)"}` }}
      >
        <p className={`font-mono text-mono-sm uppercase tracking-[.08em] ${dark ? "text-on-field" : "text-ink"}`}>
          {data.name}
        </p>
        <p className={`font-mono text-mono-xs uppercase tracking-[.08em] ${dark ? "text-on-field-2" : "text-ink-muted"}`}>
          {data.role} · {data.source}
        </p>
      </div>
    </div>
  );
}

export function VisionaryQuotes({ quotes }: { quotes: [VisionaryQuote, VisionaryQuote] }) {
  const { ref, visible } = useReveal<HTMLDivElement>(0.18);
  const [a, b] = quotes;
  return (
    <div ref={ref} className="relative grid min-[820px]:grid-cols-2">
      <span
        aria-hidden="true"
        className="hidden min-[820px]:block absolute top-0 left-1/2 origin-top"
        style={{
          width: 1,
          height: "100%",
          background: "var(--color-hairline)",
          transform: visible ? "scaleY(1)" : "scaleY(0)",
          transition: "transform 700ms cubic-bezier(.2,0,0,1) 160ms",
        }}
      />
      <QuotePanel data={a} />
      <QuotePanel data={b} dark />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Closing doors — three ways in, stated plainly, instead of a headline and  */
/*  a row of floating buttons.                                                */
/* -------------------------------------------------------------------------- */
export interface Door {
  title: string;
  body: string;
  href: string;
  cta: string;
}

export function ClosingDoors({ doors }: { doors: Door[] }) {
  const { ref, visible } = useReveal<HTMLDivElement>(0.15);
  return (
    <div ref={ref} className="grid gap-5 min-[900px]:grid-cols-3">
      {doors.map((door, i) => (
        <Link
          key={door.href}
          href={door.href}
          className="group relative overflow-hidden flex flex-col justify-between gap-8 p-7 transition-colors duration-base ease-standard"
          style={{
            background: "var(--color-field-raised)",
            border: "1px solid var(--color-field-hairline)",
            borderRadius: 6,
            ...(visible
              ? { animation: `topsys-fade-in 500ms cubic-bezier(.2,0,0,1) ${i * 110}ms both` }
              : { opacity: 0 }),
          }}
        >
          <span
            aria-hidden="true"
            className="absolute top-0 left-0 right-0 h-0.5 bg-signature origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-base ease-standard"
          />
          <div>
            <span className="font-mono text-mono-xs tracking-[.1em] text-on-field-2" style={{ opacity: 0.7 }}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3
              className="font-display font-medium text-on-field mt-3"
              style={{ fontSize: "1.25rem", letterSpacing: "-0.018em" }}
            >
              {door.title}
            </h3>
            <p className="text-body-sm text-on-field-2 mt-2 max-w-[34ch]">{door.body}</p>
          </div>
          <span className="inline-flex items-center gap-2 font-mono text-mono-xs uppercase tracking-[.09em] text-signal">
            {door.cta}
            <span aria-hidden="true" className="transition-transform duration-fast ease-standard group-hover:translate-x-1">
              →
            </span>
          </span>
        </Link>
      ))}
    </div>
  );
}
