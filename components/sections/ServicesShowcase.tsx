"use client";

import Link from "next/link";
import { useState } from "react";
import { SERVICES } from "@/components/ui/ServiceIcons";

/* ── Pentagon geometry ──
   CY is set so the top node's resting top edge sits at y=0 — i.e. baked
   into the viewBox itself, so alignment with the hero headline holds at
   any rendered width instead of only at the one width an external pixel
   margin was tuned for. VH is trimmed to the pentagon's actual footprint
   (bottom extent + hover headroom) rather than an arbitrary square-ish box.
   R and the node radii are sized to use nearly the full VW=600 width —
   the previous R=185 left roughly a quarter of the box as unused margin
   on both sides. */
const VW = 600, VH = 620;
const CX = 300, CY = 301, R = 255;

/* Node circle radii scale with R so they read proportionate to the wider
   spread instead of looking small inside it. */
const NODE_R = 46, NODE_R_HALO = 62, NODE_R_LIT = 56, NODE_R_HALO_LIT = 78;
const LABEL_OFFSET = 80, ORDINAL_OFFSET = 103, LABEL_SIZE = 16, ORDINAL_SIZE = 12.5;

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
  { dur: `${2.0 + ei * 0.42}s`, begin: `${-(ei * 0.55)}s`,        rev: false, r: 2.8, op: 0.85 },
  { dur: `${3.3 + ei * 0.28}s`, begin: `${-(ei * 0.72 + 1.2)}s`,  rev: true,  r: 2.0, op: 0.60 },
]);

const SHORT = ["AI & data", "Applications", "Cloud", "Security", "Talent"];

/* Node fills stay each capability's own color on every ground — only the
   label text under the nodes picks up the hero's lavender on the inverted
   hero, echoing the fork labels beside it. */
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
    label: "#C4B5FD",
    labelLit: "#FFFFFF",
    ord: "rgba(196,181,253,0.55)",
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
          fontSize: dark ? "0.8125rem" : "1.0625rem",
          letterSpacing: ".12em",
          color: dark ? "#C4B5FD" : "#6D28D9",
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
          {SERVICES.map(({ href, title, Icon, bg }, i) => (
            <Link
              key={href}
              href={href}
              className="flex flex-col items-center text-center gap-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 rounded"
              style={{ outlineColor: dark ? "#C4B5FD" : "var(--color-teal)" }}
            >
              <span
                className="flex items-center justify-center rounded-full text-white"
                style={{ background: bg, width: 46, height: 46 }}
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

      {/* ── Desktop: capability web. Sized by its grid column, which is a
           fr-based track (not tied to the headline's own width) so the web
           never resizes as the headline cycles phrases. ── */}
      <div
        className="max-[767px]:hidden relative w-full mt-8"
        style={{ aspectRatio: `${VW} / ${VH}` }}
      >
        <svg
          viewBox={`0 0 ${VW} ${VH}`}
          className="absolute inset-0 w-full h-full overflow-visible"
          aria-hidden="true"
        >
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
                  strokeWidth={lit ? 1.6 : 0.9}
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

          {SERVICES.map(({ bg }, i) => {
            const { x, y } = NODES[i];
            const fill = bg;
            const lit = hov === i;
            return (
              <g key={i} style={{ pointerEvents: "none" }}>
                <circle cx={x} cy={y} r={lit ? NODE_R_HALO_LIT : NODE_R_HALO}
                  fill={fill} opacity={lit ? 0.16 : 0.07}
                  style={{ transition: "r 280ms cubic-bezier(.2,0,0,1), opacity 280ms" }} />
                <circle cx={x} cy={y} r={lit ? NODE_R_LIT : NODE_R}
                  fill={fill}
                  style={{
                    transition: "r 280ms cubic-bezier(.2,0,0,1)",
                    filter: lit ? `drop-shadow(0 0 18px ${fill}88)` : "none",
                  }} />
                <text
                  x={x} y={y + LABEL_OFFSET} textAnchor="middle"
                  fill={lit ? c.labelLit : c.label}
                  fontSize={LABEL_SIZE}
                  fontFamily="var(--font-mono)"
                  letterSpacing="0.09em"
                  style={{ transition: "fill 280ms" }}
                >
                  {SHORT[i].toUpperCase()}
                </text>
                <text
                  x={x} y={y + ORDINAL_OFFSET} textAnchor="middle"
                  fill={lit ? c.ordLit : c.ord}
                  fontSize={ORDINAL_SIZE}
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
                width: `${((NODE_R * 2) / VW) * 100}%`,
                height: `${((NODE_R * 2) / VH) * 100}%`,
                zIndex: 10,
                background: "transparent",
                outlineColor: dark ? "#C4B5FD" : "var(--color-teal)",
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
