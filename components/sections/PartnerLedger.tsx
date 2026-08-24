"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface Partner {
  name: string;
  label: string;
  src: string;
  /** Scale to compensate for excess whitespace in source image (default 1) */
  logoScale?: number;
}

interface Props {
  partners: Partner[];
  /** How long each row is active, ms (default 2200) */
  cycleMs?: number;
}

export function PartnerLedger({ partners, cycleMs = 1200 }: Props) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const partnersLenRef = useRef(partners.length);
  const cycleMsRef = useRef(cycleMs);
  partnersLenRef.current = partners.length;
  cycleMsRef.current = cycleMs;

  const startCycle = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActiveIdx((i) => (i + 1) % partnersLenRef.current);
    }, cycleMsRef.current);
  };

  useEffect(() => {
    startCycle();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleMouseEnter = (i: number) => {
    setHovered(i);
    setActiveIdx(i);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const handleMouseLeave = () => {
    setHovered(null);
    startCycle();
  };

  return (
    <div role="list" aria-label="Partner and MSP logos">
      {partners.map(({ name, label, src, logoScale = 1 }, i) => {
        const isActive = hovered === i || (hovered === null && activeIdx === i);

        return (
          <div
            key={name}
            role="listitem"
            onMouseEnter={() => handleMouseEnter(i)}
            onMouseLeave={handleMouseLeave}
            className="relative border-t border-hairline flex items-center gap-10 py-7 cursor-default max-[639px]:flex-col max-[639px]:items-start max-[639px]:gap-3 max-[639px]:py-5"
            style={{
              background: isActive ? "rgba(14,90,102,.06)" : "transparent",
              transition: `background 300ms cubic-bezier(.2,0,0,1)`,
            }}
          >
            {/* Left accent rail — slides down when active */}
            <span
              className="absolute left-0 top-0 bottom-0 w-[3px] bg-signature"
              style={{
                transform: isActive ? "scaleY(1)" : "scaleY(0)",
                transformOrigin: "top",
                transition: "transform 300ms cubic-bezier(.2,0,0,1)",
              }}
              aria-hidden="true"
            />

            {/* Progress bar — fills left-to-right over cycleMs, re-mounts on each activation */}
            {isActive && (
              <span
                key={`progress-${activeIdx}`}
                className="absolute bottom-0 left-0 h-[2px] w-full bg-signature"
                style={{
                  transform: "scaleX(0)",
                  transformOrigin: "left",
                  animation: `partner-progress ${cycleMs}ms linear forwards`,
                }}
                aria-hidden="true"
              />
            )}

            {/* Ordinal */}
            <span
              className="font-mono uppercase tracking-[.08em] flex-none select-none pl-5 transition-colors duration-[280ms] max-[639px]:hidden"
              style={{
                fontSize: "0.6875rem",
                width: "2.5rem",
                color: isActive ? "var(--color-teal)" : "var(--color-ink-muted)",
              }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>

            {/* Logo — unboxed, no overflow clip so scaled logos don't get cut */}
            <div className="flex-none flex items-center" style={{ width: "240px" }}>
              <Image
                src={src}
                alt={name}
                width={240}
                height={80}
                className="object-contain object-left w-full h-auto"
                style={{
                  maxHeight: "76px",
                  transform: logoScale !== 1 ? `scale(${logoScale})` : undefined,
                  transformOrigin: "left center",
                }}
              />
            </div>

            {/* Name + descriptor */}
            <div className="flex-1 min-w-0">
              <p
                className="font-display font-medium text-ink"
                style={{ fontSize: "1.25rem", lineHeight: 1.2 }}
              >
                {name}
              </p>
              <p
                className="font-mono uppercase tracking-[.08em] text-ink-muted mt-1"
                style={{ fontSize: "0.8125rem" }}
              >
                {label}
              </p>
            </div>

            {/* Active status badge — right edge */}
            <div className="flex-none flex items-center gap-2 pr-4 max-[639px]:hidden">
              <span className="relative flex items-center justify-center w-4 h-4" aria-hidden="true">
                {isActive && (
                  <span
                    key={`ripple-${activeIdx}`}
                    className="absolute rounded-full border border-teal"
                    style={{
                      width: "12px",
                      height: "12px",
                      animation: "partner-ripple 1.6s ease-out infinite",
                    }}
                  />
                )}
                <span
                  className="rounded-full transition-all duration-[280ms]"
                  style={{
                    width: "7px",
                    height: "7px",
                    background: isActive ? "var(--color-teal)" : "var(--color-ink-muted)",
                    opacity: isActive ? 1 : 0.3,
                  }}
                />
              </span>
              <span
                className="font-mono uppercase tracking-[.08em] transition-colors duration-[280ms]"
                style={{
                  fontSize: "0.625rem",
                  color: isActive ? "var(--color-teal)" : "var(--color-ink-muted)",
                  opacity: isActive ? 1 : 0.4,
                }}
              >
                Active
              </span>
            </div>
          </div>
        );
      })}

      {/* Closing rule */}
      <div className="border-t border-hairline" />
    </div>
  );
}
