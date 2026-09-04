"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const CLIENTS = [
  { src: "/private-logos/att.png",                   alt: "AT&T",              vertical: "Telecom" },
  { src: "/private-logos/capitalone_no_bg.png",       alt: "Capital One",        vertical: "Financial services" },
  { src: "/private-logos/IBM.jpg",                    alt: "IBM",                vertical: "Enterprise technology" },
  { src: "/private-logos/T-Mobile.png",               alt: "T-Mobile",           vertical: "Telecom" },
  { src: "/private-logos/UnitedHealth-Group.png",     alt: "UnitedHealth Group",  vertical: "Healthcare" },
  { src: "/private-logos/wells-fargo.png",            alt: "Wells Fargo",        vertical: "Financial services" },
  { src: "/private-logos/Deloitte-Logo.png",          alt: "Deloitte",           vertical: "Professional services" },
  { src: "/private-logos/morganstaley.png",           alt: "Morgan Stanley",     vertical: "Financial services" },
  { src: "/private-logos/Capgemini_no_bg.png",        alt: "Capgemini",          vertical: "Technology services" },
  { src: "/private-logos/fredie-mac.png",             alt: "Freddie Mac",        vertical: "Financial services" },
  { src: "/private-logos/Cognizant_no_bg.png",        alt: "Cognizant",          vertical: "Technology services" },
  { src: "/private-logos/Blue_Owl_Capital_no_bg.png", alt: "Blue Owl Capital",   vertical: "Asset management" },
  { src: "/private-logos/eli.jpg",                    alt: "Eli Lilly",          vertical: "Life sciences" },
  { src: "/private-logos/prada_no_bg.png",            alt: "Prada Group",        vertical: "Luxury retail" },
  { src: "/private-logos/beyond.png",                 alt: "Beyond",             vertical: "Enterprise commerce" },
  { src: "/private-logos/ilabor.png",                 alt: "iLabor",             vertical: "Technology services" },
];

const TECH_PARTNERS = [
  { src: "/credentials/aws.webp",                 alt: "Amazon Web Services", category: "Cloud & infrastructure" },
  { src: "/credentials/salesforce_no_bg.png",     alt: "Salesforce",          category: "CRM & field ops" },
  { src: "/credentials/Adobe_Corporate_Logo.png", alt: "Adobe",               category: "Creative & content" },
  { src: "/credentials/Microsoft-Azure.png",      alt: "Microsoft Azure",     category: "Productivity & AI" },
  { src: "/credentials/oracle_no_bg.png",         alt: "Oracle",              category: "ERP & database" },
  { src: "/credentials/uipath_no_bg.png",         alt: "UiPath",              category: "Automation & RPA" },
];

const CERTS = [
  { src: "/credentials/mbe_no_bg.png",          alt: "Minority Business Enterprise (MBE) Certified", label: "MBE Certified" },
  { src: "/credentials/sam.gov_no_bg.png",      alt: "SAM.gov Registered",                           label: "SAM.gov" },
  { src: "/credentials/db-registered_no_bg.png",alt: "Dun & Bradstreet Registered",                  label: "D&B Registered" },
  { src: "/brand/dir-logo-tx.png",              alt: "Texas DIR Contract Holder",                    label: "DIR Contract" },
];

const MARQUEE = [...CLIENTS, ...CLIENTS];

/* Breathing durations (s) — staggered so dots pulse independently */
const BREATHE_S = [2.0, 2.6, 1.8, 2.3, 2.9, 2.1];

/* ── Terminal verification loop ── */
const TERM_LINES = [
  { txt: "$ audit --verify credentials",             color: "rgba(234,242,241,0.82)" },
  { txt: "[1/4] MBE Certified .............. ✓",     color: "#8DC63E" },
  { txt: "[2/4] SAM.gov Registered ......... ✓",     color: "#8DC63E" },
  { txt: "[3/4] D&B Registered ............. ✓",     color: "#8DC63E" },
  { txt: "[4/4] DIR Contract Holder ........ ✓",     color: "#8DC63E" },
  { txt: "All credentials verified.",                color: "#EAF2F1" },
  { txt: "Rerunning in 2s...",                       color: "rgba(234,242,241,0.52)" },
];
const LINE_DELAYS = [0, 600, 1100, 1600, 2100, 2750, 3200];
const LOOP_MS = 5200; /* last line at ~3.3s + 2s hold = 5.2s */

function TerminalVerifier() {
  const [visible, setVisible] = useState(0);
  const [epoch, setEpoch] = useState(0);

  useEffect(() => {
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
      className="rounded-[6px] overflow-hidden"
      style={{ background: "var(--color-field)", padding: "1rem 1.25rem 1.1rem" }}
    >
      {/* Terminal chrome */}
      <div className="flex items-center gap-1.5 mb-3" aria-hidden="true">
        <span className="inline-block w-2 h-2 rounded-full" style={{ background: "rgba(255,255,255,0.12)" }} />
        <span className="inline-block w-2 h-2 rounded-full" style={{ background: "rgba(255,255,255,0.12)" }} />
        <span className="inline-block w-2 h-2 rounded-full" style={{ background: "rgba(255,255,255,0.12)" }} />
        <span className="ml-2 font-mono text-[10px] tracking-[.1em] font-semibold" style={{ color: "rgba(234,242,241,0.65)" }}>
          TOPSYS IT SOLUTIONS LLC
        </span>
      </div>
      {/* Lines */}
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

export function ClientProofStrip() {
  return (
    <section aria-labelledby="clients-heading" style={{ padding: "0 0 7rem" }}>

      {/* ── Section header ── */}
      <div className="wrap mb-8">
        <p className="inline-flex items-center gap-2.5 font-eyebrow text-[1.0625rem] uppercase tracking-[.12em]" style={{ color: "#6D28D9" }}>
          <span className="inline-block h-0.5 w-[22px] bg-signature rounded-full" aria-hidden="true" />
          Trusted by
        </p>
        <h2
          id="clients-heading"
          className="font-display font-medium text-ink mt-3"
          style={{ fontSize: "clamp(1.5rem, 2.6vw, 2rem)", letterSpacing: "-0.025em" }}
        >
          Serving organizations where technology<br className="max-[600px]:hidden" /> has to work.
        </h2>
      </div>

      {/* ── Logo marquee ── */}
      <div
        className="marquee-wrap relative overflow-hidden"
        aria-hidden="true"
        style={{
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 7%, black 93%, transparent 100%)",
          maskImage: "linear-gradient(to right, transparent 0%, black 7%, black 93%, transparent 100%)",
        }}
      >
        <div
          className="marquee-track flex items-center"
          style={{ gap: "4.5rem", width: "max-content", padding: "1.5rem 2rem" }}
        >
          {MARQUEE.map((c, i) => (
            <div
              key={i}
              className="flex-none flex items-center justify-center"
              title={`${c.alt} · ${c.vertical}`}
              style={{ height: "68px", minWidth: "100px" }}
            >
              <Image
                src={c.src}
                alt=""
                width={220}
                height={68}
                className="h-full w-auto max-w-[200px] object-contain transition-transform hover:scale-105"
                style={{ transitionDuration: "280ms", mixBlendMode: "multiply" }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* ── Tech platforms + Certifications ── */}
      <div className="wrap mt-14">
        <div className="border-t border-hairline pt-10 grid grid-cols-[1fr_auto] gap-x-16 gap-y-10 items-start max-[900px]:grid-cols-1">

          {/* Technology platforms — sequential signal blocks */}
          <div>
            <p className="inline-flex items-center gap-2.5 font-eyebrow text-[1.0625rem] uppercase tracking-[.12em] mb-6" style={{ color: "#6D28D9" }}>
              <span className="inline-block h-0.5 w-[22px] bg-signature rounded-full flex-none" aria-hidden="true" />
              Technology platforms
            </p>
            <style>{`
              @keyframes partner-breathe {
                0%, 100% { opacity: 1; transform: scale(1); }
                50% { opacity: 0.3; transform: scale(0.75); }
              }
            `}</style>
            <div className="grid grid-cols-2 gap-3">
              {TECH_PARTNERS.map((p, i) => (
                <div
                  key={p.alt}
                  className="group relative flex flex-col items-start gap-4 rounded-[6px] overflow-hidden px-5 py-5"
                  style={{ border: "1px solid var(--color-hairline)", transition: "border-color 280ms cubic-bezier(.2,0,0,1)" }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = "var(--color-hairlineStrong)")}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = "var(--color-hairline)")}
                >
                  {/* Signature sweep on hover */}
                  <span
                    className="absolute top-0 left-0 right-0 h-[2px] bg-signature opacity-0 group-hover:opacity-100"
                    style={{ transition: "opacity 280ms cubic-bezier(.2,0,0,1)" }}
                    aria-hidden="true"
                  />
                  <div style={{ height: "44px" }} className="flex items-center justify-start w-full">
                    <Image
                      src={p.src}
                      alt={p.alt}
                      width={160}
                      height={44}
                      className="h-full w-auto max-w-[140px] object-contain"
                      style={{ mixBlendMode: "multiply" }}
                    />
                  </div>
                  {/* Live status: breathing dot + category label */}
                  <div className="flex items-center gap-1.5" aria-hidden="true">
                    <span
                      style={{
                        display: "inline-block",
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: "var(--color-teal)",
                        animation: `partner-breathe ${BREATHE_S[i]}s ease-in-out infinite`,
                      }}
                    />
                    <span
                      className="font-mono uppercase"
                      style={{ fontSize: "0.625rem", letterSpacing: ".08em", color: "var(--color-ink-muted)" }}
                    >
                      {p.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications — terminal verification loop */}
          <div>
            <p className="inline-flex items-center gap-2.5 font-eyebrow text-[1.0625rem] uppercase tracking-[.12em] mb-6" style={{ color: "#6D28D9" }}>
              <span className="inline-block h-0.5 w-[22px] bg-signature rounded-full flex-none" aria-hidden="true" />
              Credentials &amp; certifications
            </p>

            {/* Logo badges row */}
            <div className="flex flex-wrap gap-3 mb-4">
              {CERTS.map((c) => (
                <div
                  key={c.label}
                  className="flex items-center gap-2 border border-hairline rounded-card px-3 py-2"
                >
                  <div style={{ height: "32px", width: "32px" }}>
                    <Image
                      src={c.src} alt={c.alt}
                      width={32} height={32}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <span className="font-mono text-mono-xs text-ink-2 whitespace-nowrap">{c.label}</span>
                </div>
              ))}
            </div>

            {/* Live audit terminal */}
            <TerminalVerifier />

            <p className="mt-4 text-body-sm text-ink-muted max-w-[36ch]">
              Certified minority business enterprise, qualifying for supplier diversity programs at enterprises and government agencies alike.
            </p>
          </div>

        </div>
      </div>

    </section>
  );
}
