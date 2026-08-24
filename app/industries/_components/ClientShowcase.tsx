"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";

/* ── Enterprise client logos — dual opposing marquee ─────────────────── */

const ROW_A = [
  { name: "AT&T",              src: "/private-logos/att.png" },
  { name: "Capital One",        src: "/private-logos/capitalone_no_bg.png" },
  { name: "Wells Fargo",        src: "/private-logos/wells-fargo.png" },
  { name: "Morgan Stanley",     src: "/private-logos/morganstaley.png" },
  { name: "T-Mobile",           src: "/private-logos/T-Mobile.png" },
  { name: "UnitedHealth Group", src: "/private-logos/UnitedHealth-Group.png" },
];

const ROW_B = [
  { name: "Freddie Mac",      src: "/private-logos/fredie-mac.png" },
  { name: "Blue Owl Capital", src: "/private-logos/Blue_Owl_Capital_no_bg.png" },
  { name: "Eli Lilly",        src: "/private-logos/eli.jpg" },
  { name: "Prada Group",      src: "/private-logos/prada_no_bg.png" },
  { name: "Beyond",           src: "/private-logos/beyond.png" },
];

const MARQUEE_A = [...ROW_A, ...ROW_A];
const MARQUEE_B = [...ROW_B, ...ROW_B];

/* ── Delivery partners ───────────────────────────────────────────────── */

const DELIVERY_PARTNERS = [
  { name: "Cognizant",  role: "Global IT delivery",         src: "/private-logos/Cognizant_no_bg.png", scale: 1    },
  { name: "Capgemini",  role: "Technology services partner", src: "/private-logos/Capgemini_no_bg.png", scale: 1    },
  { name: "IBM",        role: "Managed services",           src: "/private-logos/IBM.jpg",             scale: 1    },
  { name: "Deloitte",   role: "Consulting & technology",    src: "/private-logos/Deloitte-Logo.png",   scale: 1    },
  { name: "iLabor",     role: "Workforce partner",          src: "/private-logos/ilabor.png",          scale: 1.9  },
];

const CYCLE_MS = 2600;

/* ── Component ──────────────────────────────────────────────────────────── */

export function ClientShowcase() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [visible, setVisible] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const lenRef = useRef(DELIVERY_PARTNERS.length);

  const startCycle = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      /* fade out → swap → fade in */
      setVisible(false);
      setTimeout(() => {
        setActiveIdx((i) => (i + 1) % lenRef.current);
        setVisible(true);
      }, 300);
    }, CYCLE_MS);
  };

  useEffect(() => {
    startCycle();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goTo = (i: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setVisible(false);
    setTimeout(() => { setActiveIdx(i); setVisible(true); startCycle(); }, 300);
  };

  const partner = DELIVERY_PARTNERS[activeIdx];

  return (
    <section className="bg-surface" style={{ padding: "7rem 0" }}>

      {/* Header */}
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
            We deliver directly for enterprise clients, and inside larger programs run by IT services firms who bring us in for specific technology and staffing capacity.
          </p>
        </div>
      </div>

      {/* Trusted engagements label */}
      <div className="wrap mb-5">
        <p className="font-mono font-semibold uppercase tracking-[.12em] text-ink" style={{ fontSize: "0.8125rem" }}>
          Trusted engagements
        </p>
      </div>

      {/* Dual opposing marquee rows */}
      <div
        className="marquee-wrap"
        style={{
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
          maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        }}
        aria-hidden="true"
      >
        <div
          className="marquee-track-rtl flex items-center"
          style={{ gap: "5rem", width: "max-content", padding: "1.25rem 2.5rem" }}
        >
          {MARQUEE_A.map((c, i) => (
            <div key={i} className="flex-none" style={{ height: "72px" }}>
              <Image
                src={c.src} alt=""
                width={240} height={72}
                className="h-full w-auto max-w-[220px] object-contain"
                style={{ mixBlendMode: "multiply" }}
              />
            </div>
          ))}
        </div>

        <div
          className="marquee-track-ltr flex items-center"
          style={{ gap: "5rem", width: "max-content", padding: "1.25rem 2.5rem" }}
        >
          {MARQUEE_B.map((c, i) => (
            <div key={i} className="flex-none" style={{ height: "72px" }}>
              <Image
                src={c.src} alt=""
                width={240} height={72}
                className="h-full w-auto max-w-[220px] object-contain"
                style={{ mixBlendMode: "multiply" }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Delivery partners — cinematic crossfade focal display */}
      <div className="wrap mt-14 pt-12 border-t border-hairline">

        <div className="flex items-start justify-between gap-6 mb-10 max-[639px]:flex-col">
          <p className="font-mono font-semibold uppercase tracking-[.12em] text-ink" style={{ fontSize: "0.8125rem" }}>
            Delivery partners
          </p>
          <p className="text-body-xs text-ink-2 max-w-[52ch] text-right max-[639px]:text-left">
            Global IT services firms we deliver technology and staffing capacity through as a subcontractor.
          </p>
        </div>

        {/* Featured display — logo as hero, info strip below */}
        <div
          className="relative overflow-hidden border border-hairline rounded-[6px] bg-white"
          onMouseEnter={() => { if (timerRef.current) clearInterval(timerRef.current); }}
          onMouseLeave={startCycle}
        >
          {/* Signature top edge */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-signature" aria-hidden="true" />

          {/* Hero logo zone */}
          <div
            className="flex items-center justify-center"
            style={{
              height: "220px",
              padding: "2.5rem 3rem",
              transition: "opacity 300ms cubic-bezier(.2,0,0,1)",
              opacity: visible ? 1 : 0,
            }}
          >
            <Image
              key={partner.src}
              src={partner.src}
              alt={partner.name}
              width={320}
              height={140}
              className="object-contain"
              style={{
                maxHeight: "140px",
                maxWidth: "320px",
                width: "auto",
                mixBlendMode: "multiply",
                transform: partner.scale !== 1 ? `scale(${partner.scale})` : undefined,
                transformOrigin: "center center",
              }}
            />
          </div>

          {/* Info bar */}
          <div
            className="flex items-center justify-between gap-8 border-t border-hairline px-8 py-5 max-[639px]:flex-col max-[639px]:items-start max-[639px]:gap-4"
            style={{
              background: "rgba(0,0,0,0.018)",
              transition: "opacity 300ms cubic-bezier(.2,0,0,1)",
              opacity: visible ? 1 : 0,
            }}
          >
            {/* Name + role */}
            <div>
              <p
                className="font-display font-medium text-ink"
                style={{ fontSize: "1.375rem", letterSpacing: "-0.02em", lineHeight: 1.2 }}
              >
                {partner.name}
              </p>
              <p
                className="font-mono uppercase tracking-[.08em] text-ink-muted mt-1"
                style={{ fontSize: "0.6875rem" }}
              >
                {partner.role}
              </p>
            </div>

            {/* Nav dots + counter */}
            <div className="flex items-center gap-5 flex-none">
              <div className="flex items-center gap-2" role="tablist" aria-label="Select partner">
                {DELIVERY_PARTNERS.map((p, i) => (
                  <button
                    key={p.name}
                    role="tab"
                    aria-selected={i === activeIdx}
                    aria-label={p.name}
                    onClick={() => goTo(i)}
                    className="rounded-full transition-all duration-[280ms] focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal focus-visible:outline-offset-2"
                    style={{
                      width: i === activeIdx ? "22px" : "6px",
                      height: "6px",
                      background: i === activeIdx ? "var(--color-teal)" : "rgba(14,90,102,0.2)",
                    }}
                  />
                ))}
              </div>
              <span className="font-mono text-ink-muted" style={{ fontSize: "0.6875rem" }}>
                {String(activeIdx + 1).padStart(2, "0")} / {String(DELIVERY_PARTNERS.length).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>

      </div>

    </section>
  );
}
