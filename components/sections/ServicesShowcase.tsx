"use client";

import Link from "next/link";
import { useState } from "react";
import { SERVICES } from "@/components/ui/ServiceIcons";

/* ── Pentagon geometry ── */
const VW = 600, VH = 500;
const CX = 190, CY = 220, R = 145;

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
interface FlowDot { dur: string; begin: string; rev: boolean; fill: string; r: number; op: number; }
const FLOWS: FlowDot[][] = EDGES.map((_, ei) => [
  { dur: `${2.0 + ei * 0.42}s`, begin: `${-(ei * 0.55)}s`,         rev: false, fill: "#8DC63E", r: 2.5, op: 0.85 },
  { dur: `${3.3 + ei * 0.28}s`, begin: `${-(ei * 0.72 + 1.2)}s`,  rev: true,  fill: "#2C8A6E", r: 1.8, op: 0.60 },
]);

/* Short labels for the nodes (original titles are too long for SVG text) */
const SHORT = ["AI & data", "Applications", "Cloud", "Security", "Talent"];

export function ServicesShowcase() {
  const [hov, setHov] = useState<number | null>(null);

  return (
    <div className="mt-6" role="navigation" aria-label="Service capabilities">
      <p className="inline-flex items-center gap-2.5 font-mono text-eyebrow font-medium uppercase tracking-[.1em] text-ink-muted mb-0">
        <span className="inline-block h-0.5 w-[26px] bg-signature rounded-full" aria-hidden="true" />
        What we build, end to end
      </p>


      {/* ── Mobile: simple icon grid (web is unreadable at narrow widths) ── */}
      <div
        className="min-[768px]:hidden rounded-[8px] p-6"
        style={{ background: "var(--color-field)" }}
      >
        <div className="grid grid-cols-3 gap-x-4 gap-y-6 max-[400px]:grid-cols-2">
          {SERVICES.map(({ href, title, Icon, bg }, i) => (
            <Link
              key={href}
              href={href}
              className="flex flex-col items-center text-center gap-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal rounded"
            >
              <span
                className="flex items-center justify-center rounded-full text-white"
                style={{ background: bg, width: 48, height: 48 }}
              >
                <Icon />
              </span>
              <span
                className="font-mono uppercase"
                style={{ fontSize: "8.5px", letterSpacing: ".09em", color: "rgba(168,191,190,0.7)" }}
              >
                {SHORT[i]}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* ── Desktop: capability web ── */}
      <div
        className="max-[767px]:hidden relative w-full"
        style={{ aspectRatio: `${VW} / ${VH}` }}
      >
        {/* SVG layer — edges, flow dots, node glows, labels */}
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
                  stroke={lit ? "rgba(14,90,102,0.28)" : "rgba(14,90,102,0.10)"}
                  strokeWidth={lit ? 1.4 : 0.8}
                  style={{ transition: "stroke 280ms cubic-bezier(.2,0,0,1), stroke-width 280ms cubic-bezier(.2,0,0,1)" }}
                />
                {FLOWS[ei].map((f, fi) => (
                  <circle key={fi} r={f.r} fill={fi === 0 ? "rgba(14,90,102,0.65)" : "rgba(44,138,110,0.45)"} opacity={f.op}>
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
          {SERVICES.map(({ bg }, i) => {
            const { x, y } = NODES[i];
            const lit = hov === i;
            return (
              <g key={i} style={{ pointerEvents: "none" }}>
                {/* Outer halo */}
                <circle cx={x} cy={y} r={lit ? 48 : 38}
                  fill={bg} opacity={lit ? 0.15 : 0.07}
                  style={{ transition: "r 280ms cubic-bezier(.2,0,0,1), opacity 280ms" }} />
                {/* Icon circle bg */}
                <circle cx={x} cy={y} r={lit ? 34 : 28}
                  fill={bg}
                  style={{
                    transition: "r 280ms cubic-bezier(.2,0,0,1)",
                    filter: lit ? `drop-shadow(0 0 16px ${bg}88)` : "none",
                  }} />
                {/* Short label */}
                <text
                  x={x} y={y + 54} textAnchor="middle"
                  fill={lit ? "var(--color-ink)" : "var(--color-ink-muted)"}
                  fontSize="9"
                  fontFamily="'IBM Plex Mono', 'Courier New', monospace"
                  letterSpacing="0.09em"
                  style={{ transition: "fill 280ms" }}
                >
                  {SHORT[i].toUpperCase()}
                </text>
                {/* Ordinal */}
                <text
                  x={x} y={y + 68} textAnchor="middle"
                  fill={lit ? "var(--color-teal)" : "var(--color-hairline-strong)"}
                  fontSize="7.5"
                  fontFamily="'IBM Plex Mono', 'Courier New', monospace"
                  letterSpacing="0.12em"
                  style={{ transition: "fill 280ms" }}
                >
                  {`0${i + 1}`}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Transparent hit-target links — positioned over each node so icons are clickable */}
        {SERVICES.map(({ href, title, Icon }, i) => {
          const { x, y } = NODES[i];
          return (
            <Link
              key={href}
              href={href}
              aria-label={title}
              className="absolute flex items-center justify-center text-white rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
              style={{
                left: `${(x / VW) * 100}%`,
                top: `${(y / VH) * 100}%`,
                transform: "translate(-50%, -50%)",
                width: 56, height: 56,
                zIndex: 10,
                background: "transparent",
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
