"use client";

import Link from "next/link";
import { useState } from "react";
import { INSIGHTS } from "@/lib/insights";

export function InsightsGrid() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [featured, ...rest] = INSIGHTS;

  return (
    <div>
      {/* ── Featured article — full-width dark editorial slab ── */}
      <Link
        href={`/insights/${featured.slug}`}
        className="group relative flex overflow-hidden rounded-[8px] mb-3 transition-all duration-base ease-standard hover:-translate-y-[2px]"
        style={{ background: "var(--color-field-deep)", minHeight: "220px" }}
      >
        {/* Ghost ordinal — decorative background */}
        <span
          className="absolute right-8 bottom-0 font-mono font-bold select-none pointer-events-none leading-none"
          style={{
            fontSize: "clamp(9rem, 20vw, 22rem)",
            color: "rgba(255,255,255,0.035)",
            letterSpacing: "-0.06em",
            lineHeight: 0.85,
          }}
          aria-hidden="true"
        >
          01
        </span>

        {/* Gradient top edge */}
        <span
          className="absolute top-0 left-0 right-0 h-[3px] bg-signature origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-base ease-standard z-[1]"
          aria-hidden="true"
        />

        <div className="relative z-[1] p-9 flex flex-col justify-between w-full max-w-[820px]">
          <div>
            <span className="inline-flex items-center px-2.5 py-1 rounded-control font-mono text-[10px] uppercase tracking-[.1em] bg-signal text-field-deep mb-5">
              {featured.topic}
            </span>
            <h2
              className="font-display font-medium text-on-field"
              style={{
                fontSize: "clamp(1.5rem, 2.6vw, 2.1rem)",
                letterSpacing: "-0.025em",
                lineHeight: 1.1,
                maxWidth: "28ch",
              }}
            >
              {featured.title}
            </h2>
            <p className="text-body-sm text-on-field-2 mt-4 max-w-[58ch] leading-relaxed">
              {featured.summary}
            </p>
          </div>
          <div className="flex items-center gap-5 mt-8 border-t border-field-hairline pt-5">
            <span className="font-mono text-mono-xs text-on-field-2">{featured.readTime}</span>
            <span className="font-mono text-mono-xs text-on-field-2 opacity-60">{featured.published}</span>
            <span className="ml-auto font-mono text-mono-xs text-signal group-hover:tracking-[.06em] transition-all duration-fast ease-standard">
              Read full piece →
            </span>
          </div>
        </div>
      </Link>

      {/* ── Editorial strips for remaining articles ── */}
      <div className="border-t border-hairline mt-8">
        {rest.map((insight, i) => {
          const isHov = hovered === insight.slug;
          return (
            <div
              key={insight.slug}
              className="border-b border-hairline"
              onMouseEnter={() => setHovered(insight.slug)}
              onMouseLeave={() => setHovered(null)}
            >
              <Link
                href={`/insights/${insight.slug}`}
                className="relative flex items-start gap-5 py-6 transition-colors duration-fast ease-standard"
                style={{ background: isHov ? "var(--color-surface)" : "transparent" }}
              >
                {/* Left teal sweep */}
                <span
                  className="absolute left-0 top-0 bottom-0 w-[3px] bg-signature rounded-sm transition-transform duration-[280ms] ease-[cubic-bezier(.2,0,0,1)] origin-top"
                  style={{ transform: isHov ? "scaleY(1)" : "scaleY(0)" }}
                  aria-hidden="true"
                />

                {/* Ordinal */}
                <span
                  className="font-mono font-bold flex-none select-none pl-5 transition-colors duration-fast ease-standard"
                  style={{
                    fontSize: "clamp(1.6rem, 2.6vw, 2.4rem)",
                    lineHeight: 1,
                    letterSpacing: "-0.05em",
                    color: isHov ? "var(--color-teal)" : "var(--color-hairline-strong)",
                    width: "4.5rem",
                    marginTop: "2px",
                  }}
                  aria-hidden="true"
                >
                  {String(i + 2).padStart(2, "0")}
                </span>

                {/* Main content */}
                <div className="flex-1 min-w-0">
                  <span
                    className="inline-flex items-center px-2 py-0.5 rounded-control font-mono text-[10px] uppercase tracking-[.1em] mb-2"
                    style={{
                      background: isHov ? "var(--color-teal-tint)" : "transparent",
                      color: "var(--color-teal)",
                      border: isHov ? "none" : "1px solid var(--color-hairline)",
                      transition: "background 200ms, border 200ms",
                    }}
                  >
                    {insight.topic}
                  </span>
                  <h2
                    className="font-display font-medium transition-colors duration-fast ease-standard"
                    style={{
                      fontSize: "clamp(1.05rem, 1.65vw, 1.3rem)",
                      letterSpacing: "-0.018em",
                      lineHeight: 1.2,
                      color: isHov ? "var(--color-teal)" : "var(--color-ink)",
                    }}
                  >
                    {insight.title}
                  </h2>

                  {/* Summary reveals on hover */}
                  <div
                    style={{
                      maxHeight: isHov ? "120px" : 0,
                      opacity: isHov ? 1 : 0,
                      overflow: "hidden",
                      transition: "max-height 320ms cubic-bezier(.2,0,0,1), opacity 220ms cubic-bezier(.2,0,0,1)",
                    }}
                  >
                    <p className="text-body-xs text-ink-2 mt-3 max-w-[64ch] leading-relaxed">
                      {insight.summary}
                    </p>
                  </div>
                </div>

                {/* Right meta col */}
                <div
                  className="flex-none flex flex-col items-end gap-1 pr-5"
                  style={{ minWidth: "115px" }}
                >
                  <span className="font-mono text-mono-xs text-ink-muted whitespace-nowrap">{insight.readTime}</span>
                  <span className="font-mono text-mono-xs text-ink-muted whitespace-nowrap opacity-70">{insight.published}</span>
                  <span
                    className="font-mono text-mono-xs text-teal mt-2 transition-all duration-fast ease-standard"
                    style={{
                      opacity: isHov ? 1 : 0,
                      transform: isHov ? "translateX(0)" : "translateX(8px)",
                    }}
                  >
                    Read →
                  </span>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
