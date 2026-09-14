"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

/* Inverted sections prove — this one carries the two things a buyer verifies:
   what we build on, and what clears their procurement. The rack scans
   left to right so the panel reads as live rather than as a logo wall. */

const TECH_PARTNERS = [
  { src: "/credentials/aws.webp",                  alt: "Amazon Web Services", category: "Cloud & infrastructure" },
  { src: "/credentials/Microsoft-Azure.png",       alt: "Microsoft Azure",     category: "Productivity & AI" },
  { src: "/credentials/databricks_no_bg.png",      alt: "Databricks",          category: "Data & AI platform" },
  { src: "/credentials/salesforce_no_bg.png",      alt: "Salesforce",          category: "CRM & field ops" },
  { src: "/credentials/oracle_no_bg.png",          alt: "Oracle",              category: "ERP & database" },
  { src: "/credentials/Adobe_Corporate_Logo.png",  alt: "Adobe",               category: "Creative & content" },
  { src: "/credentials/uipath_no_bg.png",          alt: "UiPath",              category: "Automation & RPA" },
];

const CERTS = [
  { src: "/credentials/mbe_no_bg.png",           alt: "Minority Business Enterprise (MBE) Certified", label: "MBE Certified",  note: "Supplier diversity" },
  { src: "/credentials/sam.gov_no_bg.png",       alt: "SAM.gov Registered",                           label: "SAM.gov",        note: "Federal registration" },
  { src: "/credentials/db-registered_no_bg.png", alt: "Dun & Bradstreet Registered",                  label: "D&B Registered", note: "Verified entity" },
  { src: "/brand/dir-logo-tx.png",               alt: "Texas DIR Contract Holder",                    label: "DIR Contract",   note: "Texas vehicle" },
];

/* ── Terminal verification loop ── */
const TERM_LINES = [
  { txt: "$ audit --verify credentials",         color: "rgba(234,242,241,0.82)" },
  { txt: "[1/4] MBE Certified .............. ✓", color: "#8DC63E" },
  { txt: "[2/4] SAM.gov Registered ......... ✓", color: "#8DC63E" },
  { txt: "[3/4] D&B Registered ............. ✓", color: "#8DC63E" },
  { txt: "[4/4] DIR Contract Holder ........ ✓", color: "#8DC63E" },
  { txt: "All credentials verified.",            color: "#EAF2F1" },
  { txt: "Rerunning in 2s...",                   color: "rgba(234,242,241,0.52)" },
];
const LINE_DELAYS = [0, 600, 1100, 1600, 2100, 2750, 3200];
const LOOP_MS = 5200;

function TerminalVerifier() {
  const [visible, setVisible] = useState(0);
  const [epoch, setEpoch] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(TERM_LINES.length);
      return;
    }
    setVisible(0);
    const timers: ReturnType<typeof setTimeout>[] = [];
    LINE_DELAYS.forEach((delay, i) => {
      timers.push(setTimeout(() => setVisible(i + 1), delay + 80));
    });
    timers.push(setTimeout(() => setEpoch((e) => e + 1), LOOP_MS));
    return () => timers.forEach(clearTimeout);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [epoch]);

  return (
    <div
      className="rounded-[6px] overflow-hidden h-full"
      style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,.14)", padding: "1rem 1.25rem 1.1rem" }}
    >
      <div className="flex items-center gap-1.5 mb-3" aria-hidden="true">
        <span className="inline-block w-2 h-2 rounded-full" style={{ background: "rgba(255,255,255,0.14)" }} />
        <span className="inline-block w-2 h-2 rounded-full" style={{ background: "rgba(255,255,255,0.14)" }} />
        <span className="inline-block w-2 h-2 rounded-full" style={{ background: "rgba(255,255,255,0.14)" }} />
        <span className="ml-2 font-mono text-[10px] tracking-[.1em] font-semibold" style={{ color: "rgba(234,242,241,0.65)" }}>
          TOPSYS IT SOLUTIONS LLC
        </span>
      </div>
      <div className="space-y-[3px]" aria-label="Credential verification status">
        {TERM_LINES.map((line, i) => (
          <p
            key={i}
            className="font-mono whitespace-nowrap"
            style={{
              fontSize: "12px",
              letterSpacing: "0.03em",
              color: line.color,
              opacity: i < visible ? 1 : 0,
              transition: "opacity 220ms cubic-bezier(.2,0,0,1)",
              lineHeight: 1.7,
            }}
          >
            {line.txt}
          </p>
        ))}
      </div>
    </div>
  );
}

export function PlatformsCredentials() {
  return (
    <section
      aria-labelledby="platforms-heading"
      className="on-field-deep relative overflow-hidden"
      style={{ background: "var(--color-field-deep)", padding: "6rem 0 6.5rem" }}
    >
      <style>{`
        @keyframes rack-scan {
          0%, 100% { opacity: .12; transform: scaleX(.35); }
          14%      { opacity: 1;   transform: scaleX(1); }
          32%      { opacity: .12; transform: scaleX(.35); }
        }
        @keyframes rack-dot {
          0%, 100% { opacity: .28; }
          14%      { opacity: 1; }
          32%      { opacity: .28; }
        }
        .rack {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: .75rem;
        }
        .cert-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: .75rem;
        }
        .console-split {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          align-items: stretch;
        }
        @media (max-width: 1023px) {
          .rack { grid-template-columns: repeat(4, 1fr); }
          .console-split { grid-template-columns: 1fr; gap: 2.5rem; }
        }
        @media (max-width: 600px) {
          .rack { grid-template-columns: repeat(2, 1fr); }
          .cert-grid { grid-template-columns: 1fr; }
        }
        @media (prefers-reduced-motion: reduce) {
          .rack-bar, .rack-led { animation: none !important; opacity: .5 !important; transform: none !important; }
        }
      `}</style>

      <div className="wrap relative">
        <p
          className="inline-flex items-center gap-2.5 font-mono uppercase"
          style={{ fontSize: "0.75rem", letterSpacing: ".12em", color: "var(--color-on-field-2)" }}
        >
          <span className="inline-block h-0.5 w-[26px] bg-signature rounded-full" aria-hidden="true" />
          Platforms &amp; credentials
        </p>

        <h2
          id="platforms-heading"
          className="font-display font-medium mt-4"
          style={{
            fontSize: "clamp(1.75rem, 3.4vw, 2.5rem)",
            letterSpacing: "-0.028em",
            maxWidth: "26ch",
            color: "var(--color-on-field)",
          }}
        >
          What we build on, and what clears your procurement.
        </h2>

        {/* ── Platform rack ── */}
        <p
          className="font-mono uppercase mt-14 mb-5"
          style={{ fontSize: "0.6875rem", letterSpacing: ".12em", color: "var(--color-on-field-2)" }}
        >
          Technology platforms
        </p>

        <ul className="rack list-none p-0 m-0">
          {TECH_PARTNERS.map((p, i) => (
            <li key={p.alt} className="flex flex-col gap-2.5">
              {/* Scan bar — the wave travels left to right across the rack */}
              <span
                className="rack-bar block h-[2px] rounded-full bg-signature origin-left"
                style={{ animation: `rack-scan 4.2s ${i * 0.28}s cubic-bezier(.2,0,0,1) infinite` }}
                aria-hidden="true"
              />
              {/* White plate — the logo sits on paper, never on the field */}
              <div
                className="flex items-center justify-center rounded-[6px] px-4"
                style={{ background: "#FFFFFF", height: "80px" }}
              >
                <Image
                  src={p.src}
                  alt={p.alt}
                  width={170}
                  height={52}
                  className="max-h-[48px] w-auto max-w-full object-contain"
                  style={{ mixBlendMode: "multiply" }}
                />
              </div>
              <span className="flex items-start gap-1.5">
                <span
                  className="rack-led inline-block rounded-full flex-none"
                  style={{
                    width: 5, height: 5, marginTop: 5, background: "var(--color-signal)",
                    animation: `rack-dot 4.2s ${i * 0.28}s cubic-bezier(.2,0,0,1) infinite`,
                  }}
                  aria-hidden="true"
                />
                <span
                  className="font-mono uppercase leading-tight"
                  style={{ fontSize: "0.625rem", letterSpacing: ".07em", color: "var(--color-on-field-2)" }}
                >
                  {p.category}
                </span>
              </span>
            </li>
          ))}
        </ul>

        {/* ── Credentials: plates + live audit ── */}
        <div
          className="console-split mt-16 pt-12"
          style={{ borderTop: "1px solid rgba(255,255,255,.14)" }}
        >
          <div>
            <p
              className="font-mono uppercase mb-5"
              style={{ fontSize: "0.6875rem", letterSpacing: ".12em", color: "var(--color-on-field-2)" }}
            >
              Credentials &amp; certifications
            </p>
            <ul className="cert-grid list-none p-0 m-0">
              {CERTS.map((c) => (
                <li
                  key={c.label}
                  className="flex items-center gap-3 rounded-[6px] px-4 py-3"
                  style={{ background: "#FFFFFF" }}
                >
                  <span className="flex-none" style={{ height: 36, width: 36 }}>
                    <Image
                      src={c.src} alt={c.alt}
                      width={36} height={36}
                      className="h-full w-full object-contain"
                    />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-mono text-ink whitespace-nowrap" style={{ fontSize: "0.75rem", letterSpacing: ".02em" }}>
                      {c.label}
                    </span>
                    <span className="block font-mono uppercase text-ink-muted" style={{ fontSize: "0.5625rem", letterSpacing: ".08em", marginTop: 2 }}>
                      {c.note}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
            <p
              className="mt-5"
              style={{ fontSize: "0.9375rem", lineHeight: 1.6, color: "var(--color-on-field-2)", maxWidth: "42ch" }}
            >
              Certified minority business enterprise, qualifying for supplier diversity
              programs at enterprises and government agencies alike.
            </p>
          </div>

          <div>
            <p
              className="font-mono uppercase mb-5"
              style={{ fontSize: "0.6875rem", letterSpacing: ".12em", color: "var(--color-on-field-2)" }}
            >
              Live verification
            </p>
            <TerminalVerifier />
          </div>
        </div>
      </div>
    </section>
  );
}
