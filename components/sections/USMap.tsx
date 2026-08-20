"use client";

import { useState } from "react";
import { US_STATES } from "@/lib/us-states-geometry";

/* States with direct state engagements (30) */
const SERVED: Record<string, string> = {
  AL: "State agency modernization",
  AZ: "Enterprise systems",
  AR: "Direct state engagement",
  CA: "Enterprise modernization",
  CO: "Digital services",
  CT: "Enterprise technology",
  FL: "Health",
  GA: "Health and human services",
  ID: "Direct state engagement",
  IL: "State government technology",
  IA: "Direct state engagement",
  KS: "Direct state engagement",
  MD: "Enterprise systems",
  MA: "Public health",
  MI: "Enterprise technology programs",
  MN: "Data platforms",
  MS: "Direct state engagement",
  MO: "Enterprise systems",
  NY: "Agency data platforms",
  OH: "Transportation",
  OK: "Direct state engagement",
  OR: "Digital modernization",
  PA: "Corrections and enterprise systems",
  RI: "State agency delivery",
  TN: "Enterprise technology",
  TX: "Statewide technology services",
  UT: "Direct state engagement",
  VT: "Direct state engagement",
  VA: "Cybersecurity and modernization",
  WI: "State agency technology",
};

/* O-mark pin path — droplet pointing DOWN, circle at top, hole punched through.
   Used in exactly one place per CLAUDE.md. */
function pinPath(cx: number, cy: number, R: number): string {
  const hr = R * 0.46, ccy = cy - R * 0.1, ty = cy + R * 1.72;
  const outer = `M ${cx} ${ty} C ${cx + R * 0.98} ${ccy + R * 0.62} ${cx + R} ${ccy + R * 0.28} ${cx + R} ${ccy} A ${R} ${R} 0 1 1 ${cx - R} ${ccy} C ${cx - R} ${ccy + R * 0.28} ${cx - R * 0.98} ${ccy + R * 0.62} ${cx} ${ty} Z`;
  const hole = `M ${cx + hr} ${ccy} A ${hr} ${hr} 0 1 0 ${cx - hr} ${ccy} A ${hr} ${hr} 0 1 0 ${cx + hr} ${ccy} Z`;
  return `${outer} ${hole}`;
}

export function USMap() {
  const [tooltip, setTooltip] = useState<{ name: string; desc: string; x: number; y: number } | null>(null);

  const servedStates = US_STATES.filter(([abbr]) => abbr in SERVED);

  return (
    <div className="relative">
      {/* SR-only list precedes the map */}
      <p className="sr-only-text">
        TOPSYS IT serves state government agencies directly across 30 states:{" "}
        {servedStates.map(([, name]) => name).join(", ")}.
      </p>

      <div className="relative mapwrap">
        <svg
          viewBox="0 0 960 600"
          role="img"
          aria-label="Map of the United States showing states where TOPSYS IT serves government agencies."
          className="w-full h-auto"
        >
          {/* Base state fills */}
          <g>
            {US_STATES.map(([abbr, name, d, lx, ly]) => {
              const isServed = abbr in SERVED;
              return (
                <path
                  key={abbr}
                  d={d}
                  aria-hidden="true"
                  className={`transition-colors duration-base ease-standard ${
                    isServed
                      ? "fill-field hover:fill-teal cursor-default"
                      : "fill-[#E8E5DC]"
                  }`}
                  stroke={isServed ? "var(--color-field-deep)" : "#C9C4B4"}
                  strokeWidth="0.9"
                  onMouseEnter={() => {
                    if (isServed) {
                      setTooltip({ name, desc: SERVED[abbr], x: lx, y: ly });
                    }
                  }}
                  onMouseLeave={() => setTooltip(null)}
                />
              );
            })}
          </g>

          {/* O-mark pins for served states — point down, circle head up, hole preserved */}
          <g>
            {servedStates.map(([abbr,, , lx, ly], i) => {
              const cx = lx, cy = ly - 7, R = 6.6;
              return (
                <g key={`pin-${abbr}`} aria-hidden="true">
                  {/* Pulse halo */}
                  <circle
                    cx={cx}
                    cy={cy}
                    r={7}
                    fill="none"
                    stroke="var(--color-signal)"
                    strokeWidth="1.2"
                    className="animate-[pinHalo_2.8s_cubic-bezier(.2,0,0,1)_infinite]"
                    style={{ animationDelay: `${i * 250}ms` }}
                  />
                  {/* O-mark droplet — signal fill, field-deep stroke */}
                  <path
                    d={pinPath(cx, cy, R)}
                    fillRule="evenodd"
                    fill="var(--color-signal)"
                    stroke="var(--color-field-deep)"
                    strokeWidth="0.7"
                    className="animate-[pinIn_520ms_cubic-bezier(.2,0,0,1)_forwards]"
                    style={{
                      opacity: 0,
                      animationDelay: `${600 + i * 70}ms`,
                    }}
                  />
                  {/* State abbreviation label */}
                  <text
                    x={cx}
                    y={cy - 11}
                    textAnchor="middle"
                    fontFamily="var(--font-ibm-plex-mono)"
                    fontSize="7.5"
                    fontWeight="500"
                    fill="var(--color-signal)"
                    letterSpacing="0.05em"
                    className="pointer-events-none"
                  >
                    {abbr}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>

        {/* Tooltip */}
        {tooltip && (
          <div
            className="absolute pointer-events-none px-3 py-2 bg-field-deep text-on-field rounded-card text-caption shadow-e2 whitespace-nowrap z-20 -translate-x-1/2 -translate-y-full"
            style={{
              left: `${(tooltip.x / 960) * 100}%`,
              top: `${(tooltip.y / 600) * 100}%`,
            }}
          >
            <b className="text-signal font-normal">{tooltip.name}</b>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="flex gap-6 mt-5 flex-wrap font-mono text-mono-xs uppercase tracking-[.06em] text-ink-muted">
        <span className="flex items-center gap-2">
          <span className="inline-block w-[11px] h-[11px] rounded-sm bg-field" aria-hidden="true" />
          Direct state engagements
        </span>
      </div>
    </div>
  );
}
