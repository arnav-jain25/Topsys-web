"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

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

const PLATFORMS = [
  { src: "/credentials/Adobe_Corporate_Logo.png",  alt: "Adobe",               category: "Creative & content" },
  { src: "/credentials/aws.webp",                  alt: "Amazon Web Services", category: "Cloud & infrastructure" },
  { src: "/credentials/Microsoft-Azure.png",       alt: "Microsoft Azure",     category: "Productivity & AI" },
  { src: "/credentials/databricks_no_bg.png",      alt: "Databricks",          category: "Data & AI platform" },
  { src: "/credentials/salesforce_no_bg.png",      alt: "Salesforce",          category: "CRM & field ops" },
  { src: "/credentials/oracle_no_bg.png",          alt: "Oracle",              category: "ERP & database" },
  { src: "/credentials/uipath_no_bg.png",          alt: "UiPath",              category: "Automation & RPA" },
];

const CERTS = [
  { src: "/credentials/mbe_no_bg.png",           alt: "Minority Business Enterprise (MBE) Certified", label: "MBE Certified",  note: "Supplier diversity" },
  { src: "/credentials/sam.gov_no_bg.png",       alt: "SAM.gov Registered",                           label: "SAM.gov",        note: "Federal registration" },
  { src: "/credentials/db-registered_no_bg.png", alt: "Dun & Bradstreet Registered",                  label: "D&B Registered", note: "Verified entity" },
  { src: "/brand/dir-logo-tx.png",               alt: "Texas DIR Contract Holder",                    label: "DIR Contract",   note: "Texas vehicle" },
];

const MARQUEE = [...CLIENTS, ...CLIENTS];
const DWELL_MS = 1800;

/* ── Platform spotlight — one partner holds focus at a time, the rest
   recede to greyscale. A rule fills beneath the active plate for the
   length of its dwell, so the rail reads as running rather than static. ── */
function PlatformSpotlight() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [motion, setMotion] = useState(true);

  useEffect(() => {
    setMotion(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (paused || !motion) return;
    const t = setTimeout(() => setActive((i) => (i + 1) % PLATFORMS.length), DWELL_MS);
    return () => clearTimeout(t);
  }, [active, paused, motion]);

  return (
    <ul className="platform-rail list-none p-0 m-0">
      {PLATFORMS.map((p, i) => {
        const on = !motion || i === active;
        return (
          <li
            key={p.alt}
            className="flex flex-col gap-3"
            onMouseEnter={() => { setPaused(true); setActive(i); }}
            onMouseLeave={() => { setActive((prev) => (prev + 1) % PLATFORMS.length); setPaused(false); }}
          >
            <div
              className="flex items-center justify-center rounded-[6px] px-4"
              style={{
                height: "84px",
                border: "1px solid var(--color-hairline)",
                background: on ? "#FFFFFF" : "transparent",
                transform: on ? "translateY(-2px)" : "none",
                transition: "background 280ms cubic-bezier(.2,0,0,1), transform 280ms cubic-bezier(.2,0,0,1), border-color 280ms",
                borderColor: on ? "var(--color-hairline-strong)" : "var(--color-hairline)",
              }}
            >
              <Image
                src={p.src}
                alt={p.alt}
                width={170}
                height={52}
                className="max-h-[46px] w-auto max-w-full object-contain"
                style={{
                  mixBlendMode: "multiply",
                  filter: on ? "none" : "grayscale(1)",
                  opacity: on ? 1 : 0.55,
                  transition: "filter 280ms cubic-bezier(.2,0,0,1), opacity 280ms cubic-bezier(.2,0,0,1)",
                }}
              />
            </div>

            {/* Dwell rule — fills across the plate for as long as it holds focus */}
            <span
              className="block h-0.5 rounded-full bg-signature origin-left"
              style={{
                transform: on ? "scaleX(1)" : "scaleX(0)",
                transition: on && motion && !paused
                  ? `transform ${DWELL_MS}ms linear`
                  : "transform 240ms cubic-bezier(.2,0,0,1)",
              }}
              aria-hidden="true"
            />

            <span
              className="font-mono uppercase leading-tight"
              style={{
                fontSize: "0.625rem",
                letterSpacing: ".07em",
                color: on ? "var(--color-ink-2)" : "var(--color-ink-muted)",
                opacity: on ? 1 : 0.45,
                transition: "opacity 280ms, color 280ms",
              }}
            >
              {p.category}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

/* ── Credential checks — each mark draws once when the row is reached. ── */
function CredentialRow() {
  const ref = useRef<HTMLUListElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReady(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setReady(true); },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <ul ref={ref} className="cert-rail list-none p-0 m-0">
      {CERTS.map((c, i) => (
        <li
          key={c.label}
          className="flex items-center gap-3 rounded-[6px] px-4 py-3"
          style={{ border: "1px solid var(--color-hairline)", background: "#FFFFFF" }}
        >
          <span className="flex-none" style={{ height: 38, width: 38 }}>
            <Image
              src={c.src} alt={c.alt}
              width={38} height={38}
              className="h-full w-full object-contain"
            />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block font-mono text-ink whitespace-nowrap" style={{ fontSize: "0.75rem", letterSpacing: ".02em" }}>
              {c.label}
            </span>
            <span className="block font-mono uppercase text-ink-muted" style={{ fontSize: "0.5625rem", letterSpacing: ".08em", marginTop: 2 }}>
              {c.note}
            </span>
          </span>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="flex-none" role="img" aria-label="Verified">
            <circle cx="10" cy="10" r="9" stroke="var(--color-hairline)" strokeWidth="1.4" />
            <path
              d="M5.8 10.2l2.9 2.9 5.5-6"
              stroke="#2C8A6E"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="13"
              style={{
                strokeDashoffset: ready ? 0 : 13,
                transition: `stroke-dashoffset 520ms ${i * 180 + 200}ms cubic-bezier(.2,0,0,1)`,
              }}
            />
          </svg>
        </li>
      ))}
    </ul>
  );
}

export function ClientProofStrip() {
  return (
    <section aria-labelledby="clients-heading" style={{ padding: "3rem 0 3.5rem" }}>
      <style>{`
        .platform-rail {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: .75rem;
        }
        .cert-rail {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: .75rem;
        }
        @media (max-width: 1023px) {
          .platform-rail { grid-template-columns: repeat(4, 1fr); }
          .cert-rail { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 600px) {
          .platform-rail { grid-template-columns: repeat(2, 1fr); }
          .cert-rail { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="wrap mb-7">
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

      {/* Names carry a descriptor rather than standing alone; the marquee itself
          is decorative, so the readable list is exposed to assistive tech here. */}
      <ul className="sr-only">
        {CLIENTS.map((c) => (
          <li key={c.alt}>{c.alt}, {c.vertical}</li>
        ))}
      </ul>

      <div
        className="marquee-wrap relative overflow-hidden"
        aria-hidden="true"
        style={{
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 7%, black 93%, transparent 100%)",
          maskImage: "linear-gradient(to right, transparent 0%, black 7%, black 93%, transparent 100%)",
        }}
      >
        <div
          className="marquee-track flex items-stretch"
          style={{ gap: "4rem", width: "max-content", padding: "1rem 2rem" }}
        >
          {MARQUEE.map((c, i) => (
            <div
              key={i}
              className="flex-none flex flex-col items-center justify-start gap-2.5"
              style={{ minWidth: "120px" }}
            >
              {/* fill instead of a hardcoded width/height: every client
                  logo file has its own intrinsic ratio, so one fixed pair
                  is wrong for all but one of them — this was the source
                  of the Next.js "width or height modified" warnings. fill
                  plus object-contain lets each logo size itself correctly
                  inside a common box regardless of its native dimensions. */}
              <div className="relative" style={{ height: "58px", width: "180px" }}>
                <Image
                  src={c.src}
                  alt=""
                  fill
                  sizes="180px"
                  className="object-contain"
                  style={{ mixBlendMode: "multiply" }}
                />
              </div>
              <span
                className="font-mono uppercase whitespace-nowrap"
                style={{ fontSize: "0.5625rem", letterSpacing: ".09em", color: "var(--color-ink-muted)" }}
              >
                {c.vertical}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Same ground, same section: what we build on, and what clears
           procurement. Both are extensions of the same proof. ── */}
      <div className="wrap">
        <div className="border-t border-hairline mt-10 pt-8">
          <p
            className="inline-flex items-center gap-2.5 font-eyebrow text-[1.0625rem] uppercase tracking-[.12em] mb-5"
            style={{ color: "#6D28D9" }}
          >
            <span className="inline-block h-0.5 w-[22px] bg-signature rounded-full" aria-hidden="true" />
            Technology platforms
          </p>
          <PlatformSpotlight />
        </div>

        <div className="border-t border-hairline mt-9 pt-8">
          <div className="flex items-baseline justify-between gap-6 mb-5 flex-wrap">
            <p
              className="inline-flex items-center gap-2.5 font-eyebrow text-[1.0625rem] uppercase tracking-[.12em]"
              style={{ color: "#6D28D9" }}
            >
              <span className="inline-block h-0.5 w-[22px] bg-signature rounded-full" aria-hidden="true" />
              Credentials &amp; certifications
            </p>
            <p className="text-body-sm text-ink-muted" style={{ maxWidth: "52ch" }}>
              Certified minority business enterprise, qualifying for supplier diversity
              programs at enterprises and government agencies alike.
            </p>
          </div>
          <CredentialRow />
        </div>
      </div>

    </section>
  );
}
