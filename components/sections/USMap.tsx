"use client";

import { useState, useEffect, useRef, useCallback } from "react";
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

const SERVED_ABBRS = Object.keys(SERVED);
const CYCLE_MS = 2200;

/* O-mark pin path — droplet pointing DOWN, circle at top, hole punched through */
function pinPath(cx: number, cy: number, R: number): string {
  const hr = R * 0.46, ccy = cy - R * 0.1, ty = cy + R * 1.72;
  const outer = `M ${cx} ${ty} C ${cx + R * 0.98} ${ccy + R * 0.62} ${cx + R} ${ccy + R * 0.28} ${cx + R} ${ccy} A ${R} ${R} 0 1 1 ${cx - R} ${ccy} C ${cx - R} ${ccy + R * 0.28} ${cx - R * 0.98} ${ccy + R * 0.62} ${cx} ${ty} Z`;
  const hole = `M ${cx + hr} ${ccy} A ${hr} ${hr} 0 1 0 ${cx - hr} ${ccy} A ${hr} ${hr} 0 1 0 ${cx + hr} ${ccy} Z`;
  return `${outer} ${hole}`;
}

type PinPhase = "hidden" | "entering" | "done";

export function USMap() {
  const [activeState, setActiveState] = useState<string | null>(null);
  const [pinPhase, setPinPhase] = useState<PinPhase>("hidden");
  const [tooltip, setTooltip] = useState<{ name: string; desc: string; x: number; y: number } | null>(null);

  const wrapRef = useRef<HTMLDivElement>(null);
  const cycleRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const activeIdxRef = useRef(0);
  const inViewRef = useRef(false);

  const startCycle = useCallback(() => {
    if (cycleRef.current) clearInterval(cycleRef.current);
    activeIdxRef.current = 0;
    setActiveState(SERVED_ABBRS[0]);
    cycleRef.current = setInterval(() => {
      activeIdxRef.current = (activeIdxRef.current + 1) % SERVED_ABBRS.length;
      setActiveState(SERVED_ABBRS[activeIdxRef.current]);
    }, CYCLE_MS);
  }, []);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !inViewRef.current) {
          inViewRef.current = true;
          /* Re-trigger pin drop every time section enters view */
          setPinPhase("hidden");
          requestAnimationFrame(() =>
            requestAnimationFrame(() => {
              setPinPhase("entering");
              const ms = 700 + SERVED_ABBRS.length * 72;
              setTimeout(() => setPinPhase("done"), ms);
            })
          );
          if (!reduced) startCycle();
        } else if (!e.isIntersecting && inViewRef.current) {
          inViewRef.current = false;
          if (cycleRef.current) clearInterval(cycleRef.current);
          setActiveState(null);
        }
      },
      { threshold: 0.18 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (cycleRef.current) clearInterval(cycleRef.current);
    };
  }, [startCycle]);

  const servedStates = US_STATES.filter(([abbr]) => abbr in SERVED);
  const activeInfo = activeState ? US_STATES.find(([abbr]) => abbr === activeState) : null;

  return (
    <div ref={wrapRef} className="relative">
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
              const isHQ = abbr === "GA";
              const isActive = abbr === activeState;

              const fill = isHQ
                ? "#F59E0B"
                : isActive
                ? "rgba(141,198,62,0.82)"
                : isServed
                ? "#0B2742"
                : "#E8E5DC";

              const stroke = isHQ
                ? "#92400E"
                : isServed
                ? "var(--color-field-deep)"
                : "#C9C4B4";

              return (
                <path
                  key={abbr}
                  d={d}
                  aria-hidden="true"
                  fill={fill}
                  stroke={stroke}
                  strokeWidth="0.9"
                  style={{ transition: "fill 480ms cubic-bezier(.2,0,0,1)" }}
                  onMouseEnter={() => {
                    if (isServed) {
                      setTooltip({
                        name,
                        desc: isHQ ? "US Headquarters — " + SERVED[abbr] : SERVED[abbr],
                        x: lx,
                        y: ly,
                      });
                    }
                  }}
                  onMouseLeave={() => setTooltip(null)}
                />
              );
            })}
          </g>

          {/* O-mark pins */}
          <g>
            {servedStates.map(([abbr, , , lx, ly], i) => {
              const cx = lx, cy = ly - 7, R = 6.6;
              const isActive = abbr === activeState;
              const delay = `${i * 72}ms`;

              return (
                <g key={`pin-${abbr}`} aria-hidden="true">
                  {/* Continuous pulse halo — staggered so all 30 don't fire at once */}
                  <circle
                    cx={cx} cy={cy} r={7}
                    fill="none"
                    stroke="var(--color-signal)"
                    strokeWidth="1"
                    className="animate-[pinHalo_3.4s_cubic-bezier(.2,0,0,1)_infinite]"
                    style={{ animationDelay: `${(i * 310) % 3400}ms` }}
                  />
                  {/* Active-state: faster, brighter double ring */}
                  {isActive && (
                    <>
                      <circle
                        cx={cx} cy={cy} r={14}
                        fill="none"
                        stroke="rgba(141,198,62,0.45)"
                        strokeWidth="1.5"
                        className="animate-[pinHalo_1.5s_cubic-bezier(.2,0,0,1)_infinite]"
                      />
                      <circle
                        cx={cx} cy={cy} r={5}
                        fill="rgba(141,198,62,0.22)"
                      />
                    </>
                  )}
                  {/* Pin body */}
                  <path
                    d={pinPath(cx, cy, R)}
                    fillRule="evenodd"
                    fill="var(--color-signal)"
                    stroke="rgba(6,35,42,0.9)"
                    strokeWidth="0.7"
                    style={
                      pinPhase === "entering"
                        ? { opacity: 0, animation: `pinIn 520ms cubic-bezier(.2,0,0,1) ${delay} forwards` }
                        : pinPhase === "done"
                        ? { opacity: 1 }
                        : { opacity: 0 }
                    }
                  />
                  {/* State abbreviation */}
                  <text
                    x={cx}
                    y={cy - 11}
                    textAnchor="middle"
                    fontFamily="var(--font-mono)"
                    fontSize="7.5"
                    fontWeight="500"
                    fill={isActive ? "#8DC63E" : "rgba(141,198,62,0.7)"}
                    letterSpacing="0.05em"
                    className="pointer-events-none"
                    style={{ transition: "fill 400ms" }}
                  >
                    {abbr}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>

        {/* Active state spotlight card */}
        {activeInfo && activeState && (
          <div
            key={activeState}
            className="absolute bottom-3 left-3 border-field-hairline rounded-card pointer-events-none"
            style={{
              padding: "10px 14px",
              animation: "map-spotlight-in 260ms cubic-bezier(.2,0,0,1) both",
              minWidth: "180px",
            }}
          >
            <p className="font-mono uppercase tracking-[.1em] field-deep" style={{ fontSize: "9px" }}>
              Active engagement
            </p>
            <p className="font-display font-medium field-deep" style={{ fontSize: "13px" }}>
              {activeInfo[1]}
            </p>
            <p className="field-deep" style={{ fontSize: "11px" }}>
              {SERVED[activeState]}
            </p>
          </div>
        )}

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
            <span className="text-on-field-2 ml-2">{tooltip.desc}</span>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="flex gap-6 mt-5 flex-wrap font-mono text-[0.875rem] uppercase tracking-[.06em]" style={{ color: "#6D28D9" }}>
        <span className="flex items-center gap-2">
          <span className="inline-block w-[11px] h-[11px] rounded-sm" style={{ backgroundColor: "#F59E0B" }} aria-hidden="true" />
          US Headquarters (GA)
        </span>
        <span className="flex items-center gap-2">
          <span className="inline-block w-[11px] h-[11px] rounded-sm bg-field" aria-hidden="true" />
          Direct state engagements
        </span>
        <span className="flex items-center gap-2">
          <span className="inline-block w-[8px] h-[8px] rounded-full bg-signal" aria-hidden="true" />
          Cycling spotlight
        </span>
      </div>
    </div>
  );
}
