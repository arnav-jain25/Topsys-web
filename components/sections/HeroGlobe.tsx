"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { geoOrthographic, geoPath, geoGraticule } from "d3-geo";
import { feature } from "topojson-client";
import type { Topology, GeometryCollection } from "topojson-specification";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore — no module declaration shipped with world-atlas
import worldTopo from "world-atlas/countries-110m.json";

/* ── Globe geometry ── */
const GLOBE_R = 265;
const GLOBE_D = GLOBE_R * 2;
const PITCH   = -20; // northern tilt

/* ── Countries to highlight (ISO 3166-1 numeric) ── */
const FEATURED = [
  { id: 840, lon: -100,  lat: 38,  label: "United States" },
  { id: 124, lon: -96,   lat: 60,  label: "Canada"        },
  { id: 356, lon: 78,    lat: 22,  label: "India"         },
  { id: 702, lon: 103.8, lat: 1.3, label: "Singapore"     },
] as const;
const FEATURED_IDS = new Set<number>(FEATURED.map((f) => f.id));

/* Extract features once at module level (not per-render) */
const worldCountries = feature(
  worldTopo as unknown as Topology<{ countries: GeometryCollection }>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (worldTopo as any).objects.countries as GeometryCollection
// eslint-disable-next-line @typescript-eslint/no-explicit-any
) as any;

/* How "forward-facing" is a point? 1 = dead center, 0 = horizon, <0 = behind */
function frontalScore(lon: number, lat: number, yaw: number): number {
  const effLon = ((lon + yaw) * Math.PI) / 180;
  const effLat = (lat * Math.PI) / 180;
  return Math.cos(effLat) * Math.cos(effLon);
}

export function HeroGlobe() {
  const [yaw, setYaw] = useState(30); // start with Americas roughly centered
  const yawRef  = useRef(30);
  const rafRef  = useRef<number>(0);
  const lastRef = useRef(0);

  /* Build projection + path generator once — mutate rotation on each render */
  const projRef = useRef(
    geoOrthographic().scale(GLOBE_R).translate([GLOBE_R, GLOBE_R]).clipAngle(90)
  );
  const pathRef = useRef(geoPath(projRef.current));

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const tick = (ts: number) => {
      /* throttle to ≈30 fps — 200 country paths at 60 fps is heavy */
      if (ts - lastRef.current > 32) {
        yawRef.current = (yawRef.current + 0.75) % 360;
        setYaw(yawRef.current);
        lastRef.current = ts;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  /* Update rotation in place — no new object per render */
  projRef.current.rotate([yaw, PITCH, 0]);
  const pg = pathRef.current;
  const graticule = geoGraticule();

  return (
    <div
      className="absolute"
      style={{
        right: "3%",
        top: "50%",
        transform: "translateY(-50%)",
        width: GLOBE_D,
        height: GLOBE_D,
        pointerEvents: "none",
      }}
      aria-hidden="true"
    >
      {/* Outer ambient glow */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: "radial-gradient(circle at 45% 45%, rgba(14,90,102,0.22) 0%, transparent 70%)",
          transform: "scale(1.25)",
          filter: "blur(18px)",
        }}
      />

      <svg
        width={GLOBE_D}
        height={GLOBE_D}
        viewBox={`0 0 ${GLOBE_D} ${GLOBE_D}`}
        style={{ overflow: "visible" }}
      >
        {/* Ocean */}
        <circle cx={GLOBE_R} cy={GLOBE_R} r={GLOBE_R} fill="#072630" />

        {/* Graticule — latitude / longitude reference lines */}
        <path
          d={pg(graticule()) ?? ""}
          stroke="rgba(255,255,255,0.042)"
          strokeWidth={0.5}
          fill="none"
        />

        {/* Country land masses */}
        {worldCountries.features.map((f: any, i: number) => {
          const id  = Number(f.id);
          const hi  = FEATURED_IDS.has(id);
          const d   = pg(f);
          if (!d) return null;
          return (
            <path
              key={f.id ?? i}
              d={d}
              fill={hi ? "rgba(141,198,62,0.78)" : "rgba(14,90,102,0.48)"}
              stroke={hi ? "rgba(141,198,62,0.22)" : "rgba(0,0,0,0.12)"}
              strokeWidth={hi ? 0.5 : 0.25}
            />
          );
        })}

        {/* Highlighted country markers — appear when country faces the viewer */}
        {FEATURED.map(({ id, lon, lat, label }) => {
          const score = frontalScore(lon, lat, yaw);
          if (score < 0.08) return null;
          const pos = projRef.current([lon, lat]);
          if (!pos) return null;
          const op = Math.min(1, (score - 0.08) * 3.5);

          return (
            <g
              key={id}
              transform={`translate(${pos[0]},${pos[1]})`}
              opacity={op}
            >
              {/* Outer pulse ring */}
              <circle
                cx={0} cy={0} r={11}
                fill="none"
                stroke="rgba(141,198,62,0.38)"
                strokeWidth={0.8}
                style={{
                  transformBox: "fill-box",
                  transformOrigin: "center",
                  animation: "globe-ring-outer 2.6s ease-out infinite",
                }}
              />
              {/* Inner pulse ring */}
              <circle
                cx={0} cy={0} r={7}
                fill="none"
                stroke="rgba(141,198,62,0.7)"
                strokeWidth={1}
                style={{
                  transformBox: "fill-box",
                  transformOrigin: "center",
                  animation: "globe-ring-inner 2.6s ease-out 0.7s infinite",
                }}
              />
              {/* Core dot */}
              <circle cx={0} cy={0} r={3.5} fill="#8DC63E" />
              {/* Label — nudge left for countries near the right edge */}
              <text
                x={16}
                y={4.5}
                fill="rgba(141,198,62,0.92)"
                fontSize={9.5}
                fontFamily="'IBM Plex Mono', 'Courier New', monospace"
                letterSpacing="0.07em"
              >
                {label.toUpperCase()}
              </text>
            </g>
          );
        })}

        {/* Globe rim + inner shadow ring */}
        <circle
          cx={GLOBE_R} cy={GLOBE_R} r={GLOBE_R}
          fill="none"
          stroke="rgba(14,90,102,0.5)"
          strokeWidth={1.5}
        />
        <circle
          cx={GLOBE_R} cy={GLOBE_R} r={GLOBE_R - 4}
          fill="none"
          stroke="rgba(14,90,102,0.10)"
          strokeWidth={7}
        />
      </svg>
    </div>
  );
}
