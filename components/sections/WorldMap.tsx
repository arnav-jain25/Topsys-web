"use client";

import { useState } from "react";

// Equirectangular projection — viewBox 1000×500
// x = (lon + 180) / 360 * 1000
// y = (90 - lat) / 180 * 500

function xy(lon: number, lat: number): [number, number] {
  return [(lon + 180) / 360 * 1000, (90 - lat) / 180 * 500];
}

const PINS = [
  { id: "us-hq",  lon: -84.3, lat: 34.1, label: "Alpharetta, GA", sub: "US HQ" },
  { id: "us-clt", lon: -80.8, lat: 35.2, label: "Charlotte, NC",  sub: "US Office" },
  { id: "ca",     lon: -79.4, lat: 43.7, label: "Toronto",         sub: "Canada" },
  { id: "ae",     lon:  55.3, lat: 25.2, label: "Dubai",           sub: "UAE" },
  { id: "in",     lon:  78.5, lat: 17.4, label: "Hyderabad",       sub: "India" },
];

// Background continental shapes (drawn first, in surface tone)
const LAND_BG = [
  // North America (includes Alaska stub)
  "M 33,53 L 252,46 L 322,82 L 348,119 L 314,125 L 277,181 L 252,184 L 231,178 L 175,161 L 175,114 L 125,82 L 33,53 Z",
  // South America
  "M 275,217 L 356,236 L 403,261 L 403,292 L 389,403 L 292,403 L 278,236 Z",
  // Greenland
  "M 355,83 L 430,19 L 450,56 L 430,83 Z",
  // Europe
  "M 475,147 L 498,100 L 542,53 L 582,56 L 611,125 L 600,150 L 557,165 L 533,168 L 520,158 L 507,148 Z",
  // Africa
  "M 453,150 L 540,140 L 603,217 L 638,217 L 620,300 L 597,347 L 553,347 L 547,331 L 506,236 L 462,200 Z",
  // Asia (full — highlighted countries drawn on top)
  "M 600,144 L 660,100 L 860,50 L 972,69 L 903,139 L 832,236 L 728,233 L 717,228 L 703,189 L 655,189 L 606,208 L 600,144 Z",
  // SE Asia islands
  "M 762,200 L 808,208 L 838,228 L 828,242 L 798,242 L 768,222 Z",
  "M 830,232 L 862,242 L 866,268 L 846,278 L 820,268 L 818,250 Z",
  // Australia
  "M 818,292 L 880,283 L 924,317 L 918,356 L 818,347 Z",
  // New Zealand
  "M 961,348 L 993,348 L 993,374 L 961,380 Z",
  // Japan
  "M 862,128 L 898,122 L 902,154 L 878,164 L 858,158 Z",
  // UK / Ireland
  "M 478,100 L 496,96 L 500,115 L 487,122 L 478,116 Z",
  // Madagascar
  "M 628,294 L 645,288 L 648,320 L 634,334 L 624,324 Z",
];

// Highlighted country fills (drawn on top of background land)
const COUNTRIES = [
  // USA (continental)
  {
    id: "usa",
    d: "M 156,114 L 252,113 L 314,119 L 308,132 L 296,142 L 290,152 L 277,181 L 252,184 L 231,178 L 208,186 L 192,192 L 172,186 L 156,175 L 146,162 L 149,138 L 155,125 Z",
  },
  // Canada
  {
    id: "can",
    d: "M 33,53 L 252,46 L 322,82 L 348,119 L 314,119 L 252,113 L 156,114 L 155,125 L 148,138 L 118,124 L 33,53 Z",
  },
  // UAE (small)
  {
    id: "uae",
    d: "M 641,178 L 658,175 L 663,183 L 658,192 L 641,193 Z",
  },
  // India
  {
    id: "ind",
    d: "M 703,147 L 749,140 L 770,174 L 762,201 L 740,220 L 722,229 L 712,229 L 698,219 L 692,201 L 695,174 Z",
  },
];

export function WorldMap() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="relative">
      <p className="sr-only-text">
        TOPSYS IT operates globally with offices in the United States (Alpharetta, GA and Charlotte, NC), Canada (Toronto), and India (Hyderabad, Telangana), with regional presence in the UAE (Dubai).
      </p>

      <svg
        viewBox="0 0 1000 500"
        role="img"
        aria-label="World map showing TOPSYS IT office locations in the United States, Canada, UAE, and India."
        className="w-full h-auto rounded-panel overflow-hidden"
        style={{ background: "var(--color-teal-tint)" }}
      >
        {/* Ocean */}
        <rect width="1000" height="500" fill="var(--color-teal-tint)" />

        {/* Background land */}
        {LAND_BG.map((d, i) => (
          <path
            key={i}
            d={d}
            fill="var(--color-surface)"
            stroke="var(--color-hairline)"
            strokeWidth="0.8"
            aria-hidden="true"
          />
        ))}

        {/* Highlighted countries */}
        {COUNTRIES.map(({ id, d }) => (
          <path
            key={id}
            d={d}
            fill="var(--color-field)"
            stroke="var(--color-field-deep)"
            strokeWidth="0.8"
            aria-hidden="true"
          />
        ))}

        {/* Office pins */}
        {PINS.map(({ id, lon, lat, label, sub }, i) => {
          const [cx, cy] = xy(lon, lat);
          const isActive = active === id;
          return (
            <g
              key={id}
              onMouseEnter={() => setActive(id)}
              onMouseLeave={() => setActive(null)}
              className="cursor-default"
              aria-hidden="true"
            >
              {/* Pulse halo */}
              <circle
                cx={cx}
                cy={cy}
                r={9}
                fill="none"
                stroke="var(--color-signal)"
                strokeWidth="1.2"
                className="animate-[pinHalo_2.8s_cubic-bezier(.2,0,0,1)_infinite]"
                style={{ animationDelay: `${i * 300}ms` }}
              />
              {/* Pin dot */}
              <circle
                cx={cx}
                cy={cy}
                r={4.5}
                fill="var(--color-signal)"
                stroke="var(--color-field-deep)"
                strokeWidth="0.8"
                className="animate-[pinIn_500ms_cubic-bezier(.2,0,0,1)_forwards]"
                style={{ opacity: 0, animationDelay: `${400 + i * 80}ms` }}
              />
              {/* Tooltip on hover */}
              {isActive && (
                <g>
                  <rect
                    x={cx - 54}
                    y={cy - 42}
                    width={108}
                    height={30}
                    rx={2}
                    fill="var(--color-field-deep)"
                  />
                  <text
                    x={cx}
                    y={cy - 28}
                    textAnchor="middle"
                    fontFamily="var(--font-mono)"
                    fontSize="8"
                    fontWeight="500"
                    fill="var(--color-signal)"
                    letterSpacing="0.04em"
                  >
                    {label}
                  </text>
                  <text
                    x={cx}
                    y={cy - 17}
                    textAnchor="middle"
                    fontFamily="var(--font-mono)"
                    fontSize="6.5"
                    fill="var(--color-on-field-2)"
                    letterSpacing="0.03em"
                  >
                    {sub}
                  </text>
                </g>
              )}
            </g>
          );
        })}
      </svg>

      {/* Legend */}
      <div className="flex gap-6 mt-4 flex-wrap font-mono text-mono-xs uppercase tracking-[.06em] text-ink-muted">
        <span className="flex items-center gap-2">
          <span className="inline-block w-[11px] h-[11px] rounded-sm bg-field" aria-hidden="true" />
          Office locations
        </span>
        <span className="flex items-center gap-2">
          <span className="inline-block w-3 h-3 rounded-full bg-signal" aria-hidden="true" />
          Hover pins for details
        </span>
      </div>
    </div>
  );
}
