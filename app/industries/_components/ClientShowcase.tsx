"use client";

import Image from "next/image";
import { Eyebrow } from "@/components/ui/Eyebrow";

/* ── Data ─────────────────────────────────────────────────────────────── */

const ROW_A = [
  { name: "AT&T",               src: "/private-logos/att.png" },
  { name: "Capital One",         src: "/private-logos/capitalone.jpg" },
  { name: "Wells Fargo",         src: "/private-logos/wells-fargo.png" },
  { name: "Morgan Stanley",      src: "/private-logos/morganstaley.png" },
  { name: "T-Mobile",            src: "/private-logos/T-Mobile.png" },
  { name: "UnitedHealth Group",  src: "/private-logos/UnitedHealth-Group.png" },
];

const ROW_B = [
  { name: "Freddie Mac",         src: "/private-logos/fredie-mac.png" },
  { name: "Blue Owl Capital",    src: "/private-logos/Blue_Owl_Capital.jpg" },
  { name: "Eli Lilly",           src: "/private-logos/eli.jpg" },
  { name: "Prada Group",         src: "/private-logos/prada.jpg" },
  { name: "Beyond",              src: "/private-logos/beyond.png" },
];

const DELIVERY_PARTNERS = [
  { name: "Cognizant", src: "/private-logos/Cognizant.jpg" },
  { name: "Capgemini", src: "/private-logos/Capgemini.jpg" },
  { name: "IBM",       src: "/private-logos/IBM.jpg" },
  { name: "Deloitte",  src: "/private-logos/Deloitte-Logo.png" },
  { name: "iLabor",    src: null },
];

/* Duplicate for seamless loop */
const MARQUEE_A = [...ROW_A, ...ROW_A];
const MARQUEE_B = [...ROW_B, ...ROW_B];

/* ── Component ─────────────────────────────────────────────────────────── */

export function ClientShowcase() {
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
      {/* mix-blend-mode: multiply removes white logo backgrounds on the light surface */}
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
            <div key={i} className="flex-none" style={{ height: "48px" }}>
              <Image
                src={c.src}
                alt=""
                width={180}
                height={48}
                className="h-full w-auto max-w-[160px] object-contain"
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
            <div key={i} className="flex-none" style={{ height: "48px" }}>
              <Image
                src={c.src}
                alt=""
                width={180}
                height={48}
                className="h-full w-auto max-w-[160px] object-contain"
                style={{ mixBlendMode: "multiply" }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* ── Delivery partners ── */}
      <div className="wrap mt-14 pt-12 border-t border-hairline">
        <div className="flex items-start gap-12 max-[767px]:flex-col">

          {/* Left: label + blurb */}
          <div className="flex-none w-[240px] max-[767px]:w-full">
            <p className="font-mono text-mono-xs font-semibold uppercase tracking-[.12em] text-teal mb-3">
              Delivery partners
            </p>
            <p className="text-body-xs text-ink-2 leading-relaxed">
              Global IT services firms we deliver technology and staffing capacity through as a subcontractor. They hold the prime contract; we execute the work.
            </p>
          </div>

          {/* Right: logo chips */}
          <div className="flex flex-wrap gap-4 flex-1 items-center">
            {DELIVERY_PARTNERS.map((p) => (
              <div
                key={p.name}
                className="flex items-center gap-3 border border-hairline rounded-card px-5 py-3 bg-white hover:border-teal hover:shadow-e1 hover:-translate-y-[2px] transition-all"
                style={{ transitionDuration: "200ms" }}
              >
                {p.src && (
                  <div style={{ height: "28px" }}>
                    <Image
                      src={p.src}
                      alt={p.name}
                      width={90}
                      height={28}
                      className="h-full w-auto max-w-[80px] object-contain"
                      style={{ mixBlendMode: "multiply" }}
                    />
                  </div>
                )}
                <span className="font-display font-medium text-body-sm text-ink whitespace-nowrap">
                  {p.name}
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>

    </section>
  );
}
