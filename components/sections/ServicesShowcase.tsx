"use client";

import Link from "next/link";
import { useState } from "react";
import { SERVICES } from "@/components/ui/ServiceIcons";

/* ── Pentagon geometry ── */
const VW = 600, VH = 480;
const CX = 300, CY = 240, R = 150;

const NODES = SERVICES.map((_, i) => {
  const a = ((-90 + i * 72) * Math.PI) / 180;
  return { x: CX + R * Math.cos(a), y: CY + R * Math.sin(a) };
});

/* All 10 edge pairs */
const EDGES: [number, number][] = [];
for (let i = 0; i < 5; i++)
  for (let j = i + 1; j < 5; j++)
    EDGES.push([i, j]);

/* Animated flow dots — two per edge, bidirectional, staggered */
interface FlowDot { dur: string; begin: string; rev: boolean; r: number; op: number; }
const FLOWS: FlowDot[][] = EDGES.map((_, ei) => [
  { dur: `${2.0 + ei * 0.42}s`, begin: `${-(ei * 0.55)}s`,        rev: false, r: 2.5, op: 0.85 },
  { dur: `${3.3 + ei * 0.28}s`, begin: `${-(ei * 0.72 + 1.2)}s`,  rev: true,  r: 1.8, op: 0.60 },
]);

/* Short labels for the nodes (original titles are too long for SVG text) */
const SHORT = ["AI & data", "Applications", "Cloud", "Security", "Talent"];

/* Per-ground palettes. Dark values clear 4.2:1 against the hero navy and keep
   the white icon above 3:1 on the tile — see bgDark in ServiceIcons. */
const PALETTE = {
  light: {
    edge: "rgba(14,90,102,0.10)",
    edgeLit: "rgba(14,90,102,0.28)",
    dotA: "rgba(14,90,102,0.65)",
    dotB: "rgba(44,138,110,0.45)",
    label: "#667279",
    labelLit: "#0E1A1F",
    ord: "#B9B5A9",
    ordLit: "#0E5A66",
  },
  dark: {
    edge: "rgba(234,242,241,0.13)",
    edgeLit: "rgba(141,198,62,0.42)",
    dotA: "rgba(141,198,62,0.75)",
    dotB: "rgba(168,191,190,0.45)",
    label: "#A8BFBE",
    labelLit: "#FFFFFF",
    ord: "rgba(168,191,190,0.55)",
    ordLit: "#8DC63E",
  },
};

export function ServicesShowcase({ dark = false }: { dark?: boolean }) {
  const [hov, setHov] = useState<number | null>(null);
  const c = dark ? PALETTE.dark : PALETTE.light;

  return (
    <div role="navigation" aria-label="Service capabilities">
      <p
        className="inline-flex items-center gap-2.5 font-mono uppercase mb-0"
        style={{
          fontSize: dark ? "0.6875rem" : "1.0625rem",
          letterSpacing: ".12em",
          color: dark ? "#A8BFBE" : "#6D28D9",
        }}
      >
        <span className="inline-block h-0.5 w-[26px] bg-signature rounded-full" aria-hidden="true" />
        What we build, end to end
      </p>

      {/* ── Narrow widths: icon grid (the web is unreadable below 768px) ── */}
      <div
        className="min-[768px]:hidden rounded-[8px] p-5 mt-4"
        style={{ background: dark ? "rgba(255,255,255,0.05)" : "var(--color-field)" }}
      >
        <div className="grid grid-cols-3 gap-x-4 gap-y-5 max-[400px]:grid-cols-2">
          {SERVICES.map(({ href, title, Icon, bg, bgDark }, i) => (
            <Link
              key={href}
              href={href}
              className="flex flex-col items-center text-center gap-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 rounded"
              style={{ outlineColor: dark ? "#8DC63E" : "var(--color-teal)" }}
            >
              <span
                className="flex items-center justify-center rounded-full text-white"
                style={{ background: dark ? bgDark : bg, width: 44, height: 44 }}
              >
                <Icon />
              </span>
              <span
                className="font-mono uppercase"
                style={{ fontSize: "8.5px", letterSpacing: ".09em", color: c.label }}
              >
                {SHORT[i]}
              </span>
              <span className="sr-only">{title}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* ── Desktop: capability web ── */}
      <div
        className="max-[767px]:hidden relative w-full"
        style={{ aspectRatio: `${VW} / ${VH}` }}
      >
        <svg
          viewBox={`0 0 ${VW} ${VH}`}
          className="absolute inset-0 w-full h-full"
          aria-hidden="true"
        >
          {/* Edges + bidirectional flow dots */}
          {EDGES.map(([a, b], ei) => {
            const pa = NODES[a], pb = NODES[b];
            const lit = hov === a || hov === b;
            const fwd = `M ${pa.x} ${pa.y} L ${pb.x} ${pb.y}`;
            const rev = `M ${pb.x} ${pb.y} L ${pa.x} ${pa.y}`;
            return (
              <g key={ei}>
                <line
                  x1={pa.x} y1={pa.y} x2={pb.x} y2={pb.y}
                  stroke={lit ? c.edgeLit : c.edge}
                  strokeWidth={lit ? 1.4 : 0.8}
                  style={{ transition: "stroke 280ms cubic-bezier(.2,0,0,1), stroke-width 280ms cubic-bezier(.2,0,0,1)" }}
                />
                {FLOWS[ei].map((f, fi) => (
                  <circle key={fi} r={f.r} fill={fi === 0 ? c.dotA : c.dotB} opacity={f.op}>
                    <animateMotion
                      dur={f.dur}
                      begin={f.begin}
                      repeatCount="indefinite"
                      path={f.rev ? rev : fwd}
                    />
                  </circle>
                ))}
              </g>
            );
          })}

          {/* Node glows, icon-circle backgrounds, labels */}
          {SERVICES.map(({ bg, bgDark }, i) => {
            const { x, y } = NODES[i];
            const fill = dark ? bgDark : bg;
            const lit = hov === i;
            return (
              <g key={i} style={{ pointerEvents: "none" }}>
                <circle cx={x} cy={y} r={lit ? 48 : 38}
                  fill={fill} opacity={lit ? 0.15 : 0.07}
                  style={{ transition: "r 280ms cubic-bezier(.2,0,0,1), opacity 280ms" }} />
                <circle cx={x} cy={y} r={lit ? 34 : 28}
                  fill={fill}
                  style={{
                    transition: "r 280ms cubic-bezier(.2,0,0,1)",
                    filter: lit ? `drop-shadow(0 0 16px ${fill}88)` : "none",
                  }} />
                <text
                  x={x} y={y + 54} textAnchor="middle"
                  fill={lit ? c.labelLit : c.label}
                  fontSize="10"
                  fontFamily="var(--font-mono)"
                  letterSpacing="0.09em"
                  style={{ transition: "fill 280ms" }}
                >
                  {SHORT[i].toUpperCase()}
                </text>
                <text
                  x={x} y={y + 69} textAnchor="middle"
                  fill={lit ? c.ordLit : c.ord}
                  fontSize="8"
                  fontFamily="var(--font-mono)"
                  letterSpacing="0.12em"
                  style={{ transition: "fill 280ms" }}
                >
                  {`0${i + 1}`}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Transparent hit-target links — positioned over each node */}
        {SERVICES.map(({ href, title, Icon }, i) => {
          const { x, y } = NODES[i];
          return (
            <Link
              key={href}
              href={href}
              aria-label={title}
              className="absolute flex items-center justify-center text-white rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              style={{
                left: `${(x / VW) * 100}%`,
                top: `${(y / VH) * 100}%`,
                transform: "translate(-50%, -50%)",
                width: 56, height: 56,
                zIndex: 10,
                background: "transparent",
                outlineColor: dark ? "#8DC63E" : "var(--color-teal)",
              }}
              onMouseEnter={() => setHov(i)}
              onMouseLeave={() => setHov(null)}
              onFocus={() => setHov(i)}
              onBlur={() => setHov(null)}
            >
              <Icon />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
