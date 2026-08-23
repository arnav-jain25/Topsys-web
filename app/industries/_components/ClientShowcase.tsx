"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";

/* ── Data ─────────────────────────────────────────────────────────────── */

const ROW_A = [
  { name: "AT&T",               src: "/private-logos/att.png" },
  { name: "Capital One",         src: "/private-logos/capitalone_no_bg.png" },
  { name: "Wells Fargo",         src: "/private-logos/wells-fargo.png" },
  { name: "Morgan Stanley",      src: "/private-logos/morganstaley.png" },
  { name: "T-Mobile",            src: "/private-logos/T-Mobile.png" },
  { name: "UnitedHealth Group",  src: "/private-logos/UnitedHealth-Group.png" },
];

const ROW_B = [
  { name: "Freddie Mac",         src: "/private-logos/fredie-mac.png" },
  { name: "Blue Owl Capital",    src: "/private-logos/Blue_Owl_Capital_no_bg.png" },
  { name: "Eli Lilly",           src: "/private-logos/eli.jpg" },
  { name: "Prada Group",         src: "/private-logos/prada_no_bg.png" },
  { name: "Beyond",              src: "/private-logos/beyond.png" },
];

const DELIVERY_PARTNERS = [
  { name: "Cognizant", src: "/private-logos/Cognizant_no_bg.png" },
  { name: "Capgemini", src: "/private-logos/Capgemini_no_bg.png" },
  { name: "IBM",       src: "/private-logos/IBM.jpg" },
  { name: "Deloitte",  src: "/private-logos/Deloitte-Logo.png" },
  { name: "iLabor",    src: "/private-logos/ilabor.png" },
];

/* Duplicate for seamless loop */
const MARQUEE_A = [...ROW_A, ...ROW_A];
const MARQUEE_B = [...ROW_B, ...ROW_B];

/* ── Component ─────────────────────────────────────────────────────────── */

export function ClientShowcase() {
  const [active, setActive] = useState(0);
  const [ping, setPing] = useState<{ from: number; to: number; t: number } | null>(null);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    const DWELL = 1800;  // ms each logo stays lit
    const TRAVEL = 600; // ms the ping travels

    let current = 0;

    const animatePing = (from: number, to: number) => {
      startRef.current = null;
      const tick = (ts: number) => {
        if (!startRef.current) startRef.current = ts;
        const t = Math.min((ts - startRef.current) / TRAVEL, 1);
        setPing({ from, to, t });
        if (t < 1) {
          rafRef.current = requestAnimationFrame(tick);
        } else {
          setPing(null);
          current = to;
          setActive(to);
        }
      };
      rafRef.current = requestAnimationFrame(tick);
    };

    const loop = setInterval(() => {
      const next = (current + 1) % DELIVERY_PARTNERS.length;
      animatePing(current, next);
    }, DWELL);

    return () => {
      clearInterval(loop);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section className="bg-surface" style={{ padding: "7rem 0" }}>

      {/* ── Header ── */}
      <div className="wrap mb-14">
        <Eyebrow>Who we work with</Eyebrow>
        <div className="flex items-end justify-between gap-12 mt-4 max-[767px]:flex-col max-[767px]:items-start">
          <h2
            className="font-display font-medium text-ink flex-none"
            style={{ fontSize: "clamp(1.75rem, 3.2vw, 2.5rem)", letterSpacing: "-0.025em", maxWidth: "24ch" }}
          >
            Enterprise clients and delivery partners
          </h2>
          <p className="text-body-xs text-ink-2 max-w-[48ch] mb-1">
            We deliver directly for enterprise clients, and inside larger programs run by IT services firms who bring us in for specific technology and staffing capacity. The two are different relationships and we keep them separate.
          </p>
        </div>
      </div>

      {/* ── Trusted engagements label ── */}
      <div className="wrap mb-5">
        <p className="font-mono text-mono-xs font-semibold uppercase tracking-[.12em] text-ink-muted">
          Trusted engagements
        </p>
      </div>

      {/* ── Dual opposing marquee rows ── */}
      <div
        className="marquee-wrap"
        style={{
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
          maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        }}
        aria-hidden="true"
      >
        {/* Row A — scrolls left */}
        <div
          className="marquee-track-rtl flex items-center"
          style={{ gap: "5rem", width: "max-content", padding: "1.25rem 2.5rem" }}
        >
          {MARQUEE_A.map((c, i) => (
            <div key={i} className="flex-none" style={{ height: "72px" }}>
              <Image
                src={c.src}
                alt=""
                width={240}
                height={72}
                className="h-full w-auto max-w-[220px] object-contain"
                style={{ mixBlendMode: "multiply" }}
              />
            </div>
          ))}
        </div>

        {/* Row B — scrolls right (opposite direction) */}
        <div
          className="marquee-track-ltr flex items-center"
          style={{ gap: "5rem", width: "max-content", padding: "1.25rem 2.5rem" }}
        >
          {MARQUEE_B.map((c, i) => (
            <div key={i} className="flex-none" style={{ height: "72px" }}>
              <Image
                src={c.src}
                alt=""
                width={240}
                height={72}
                className="h-full w-auto max-w-[220px] object-contain"
                style={{ mixBlendMode: "multiply" }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* ── Delivery partners — live signal panel ── */}
      <div className="wrap mt-14 pt-12 border-t border-hairline">

        <div className="flex items-start gap-4 mb-8 max-[767px]:flex-col">
          <p className="font-mono text-mono-xs font-semibold uppercase tracking-[.12em] text-teal">
            Delivery partners
          </p>
          <p className="text-body-xs text-ink-2 leading-relaxed max-w-[56ch]">
            Global IT services firms we deliver technology and staffing capacity through as a subcontractor.
          </p>
        </div>

        {/* Signal panel — matches nav dropdown private-enterprise column */}
        <div
          className="relative rounded-[8px] overflow-hidden border border-hairline"
          style={{
            background: "linear-gradient(to bottom, #ffffff, #F3F1EA)",
            padding: "2.5rem 2rem 2rem",
          }}
        >
          {/* Eyebrow pulse indicator */}
          <div className="absolute top-4 right-5 flex items-center gap-1.5" aria-hidden="true">
            <span
              className="inline-block rounded-full"
              style={{
                width: "6px", height: "6px",
                background: "#0E5A66",
                boxShadow: "0 0 8px 2px rgba(14,90,102,0.4)",
                animation: "signalPulse 2s ease-in-out infinite",
              }}
            />
            <span className="font-mono text-[9px] tracking-[.14em] uppercase" style={{ color: "#0E5A66" }}>
              Active
            </span>
          </div>

          {/* Logo row */}
          <div
            className="flex items-center justify-between max-[600px]:flex-wrap max-[600px]:gap-8 max-[600px]:justify-center"
            style={{ gap: "clamp(1rem, 4vw, 3rem)" }}
          >
            {DELIVERY_PARTNERS.map((p, i) => {
              const isActive = active === i;
              return (
                <div
                  key={p.name}
                  className="flex-none flex flex-col items-center gap-3"
                  style={{
                    opacity: isActive ? 1 : 0.3,
                    transform: isActive ? "scale(1.07)" : "scale(1)",
                    transition: "opacity 500ms cubic-bezier(.2,0,0,1), transform 500ms cubic-bezier(.2,0,0,1)",
                    filter: isActive ? "drop-shadow(0 0 12px rgba(14,90,102,0.5))" : "none",
                  }}
                >
                  <div style={{ height: "56px" }}>
                    <Image
                      src={p.src}
                      alt={p.name}
                      width={160}
                      height={56}
                      className="h-full w-auto max-w-[150px] object-contain"
                      style={{ mixBlendMode: "multiply" }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Signal track — line + traveling ping */}
          <div className="relative mt-8 max-[600px]:hidden" style={{ height: "2px" }} aria-hidden="true">
            {/* Base hairline */}
            <div
              className="absolute inset-0 rounded-full"
              style={{ background: "rgba(14,90,102,0.15)" }}
            />

            {/* Node dots */}
            <div className="absolute inset-0 flex items-center" style={{ padding: "0 calc(100% / 10)" }}>
              {DELIVERY_PARTNERS.map((_, i) => (
                <div
                  key={i}
                  className="flex-1 flex justify-center"
                  style={{ transform: i === 0 ? "translateX(-50%)" : i === DELIVERY_PARTNERS.length - 1 ? "translateX(50%)" : undefined }}
                >
                  <span
                    className="inline-block rounded-full"
                    style={{
                      width: active === i ? "7px" : "4px",
                      height: active === i ? "7px" : "4px",
                      background: active === i ? "#0E5A66" : "rgba(14,90,102,0.3)",
                      boxShadow: active === i ? "0 0 8px 3px rgba(14,90,102,0.35)" : "none",
                      transition: "all 400ms cubic-bezier(.2,0,0,1)",
                      marginTop: active === i ? "-1.5px" : "0",
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Traveling ping dot */}
            {ping && (() => {
              const eased = ping.t < 0.5
                ? 2 * ping.t * ping.t
                : 1 - Math.pow(-2 * ping.t + 2, 2) / 2;
              const segW = 100 / (DELIVERY_PARTNERS.length - 1);
              const fromPct = ping.from * segW;
              const toPct = ping.to * segW;
              const pct = fromPct + (toPct - fromPct) * eased;
              return (
                <div
                  className="absolute"
                  style={{
                    left: `${pct}%`,
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: "linear-gradient(90deg,#0A454E,#0E5A66)",
                    boxShadow: "0 0 10px 4px rgba(14,90,102,0.4)",
                  }}
                />
              );
            })()}
          </div>

        </div>
      </div>

    </section>
  );
}
