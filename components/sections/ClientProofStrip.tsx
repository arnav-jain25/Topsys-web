"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const CLIENTS = [
  { src: "/private-logos/att.png",              alt: "AT&T",              vertical: "Telecom" },
  { src: "/private-logos/capitalone.jpg",        alt: "Capital One",        vertical: "Financial services" },
  { src: "/private-logos/IBM.jpg",               alt: "IBM",                vertical: "Enterprise technology" },
  { src: "/private-logos/T-Mobile.png",          alt: "T-Mobile",           vertical: "Telecom" },
  { src: "/private-logos/UnitedHealth-Group.png",alt: "UnitedHealth Group",  vertical: "Healthcare" },
  { src: "/private-logos/wells-fargo.png",       alt: "Wells Fargo",        vertical: "Financial services" },
  { src: "/private-logos/Deloitte-Logo.png",     alt: "Deloitte",           vertical: "Professional services" },
  { src: "/private-logos/morganstaley.png",      alt: "Morgan Stanley",     vertical: "Financial services" },
  { src: "/private-logos/Capgemini.jpg",         alt: "Capgemini",          vertical: "Technology services" },
  { src: "/private-logos/fredie-mac.png",        alt: "Freddie Mac",        vertical: "Financial services" },
  { src: "/private-logos/Cognizant.jpg",         alt: "Cognizant",          vertical: "Technology services" },
  { src: "/private-logos/Blue_Owl_Capital.jpg",  alt: "Blue Owl Capital",   vertical: "Asset management" },
  { src: "/private-logos/eli.jpg",               alt: "Eli Lilly",          vertical: "Life sciences" },
  { src: "/private-logos/prada.jpg",             alt: "Prada Group",        vertical: "Luxury retail" },
  { src: "/private-logos/beyond.png",            alt: "Beyond",             vertical: "Enterprise commerce" },
  { src: "/private-logos/images.png",            alt: "Enterprise client",  vertical: "Enterprise" },
];

const TECH_PARTNERS = [
  { src: "/credentials/aws.webp",            alt: "Amazon Web Services" },
  { src: "/credentials/Microsoft-Azure.png", alt: "Microsoft Azure" },
  { src: "/credentials/oracle.jpg",          alt: "Oracle" },
  { src: "/credentials/salesforce.png",      alt: "Salesforce" },
  { src: "/credentials/uipath.png",          alt: "UiPath" },
];

const CERTS = [
  { src: "/credentials/mbe.jpg",             alt: "Minority Business Enterprise (MBE) Certified", label: "MBE Certified" },
  { src: "/credentials/sam.gov.webp",        alt: "SAM.gov Registered",                           label: "SAM.gov" },
  { src: "/credentials/db-registered.avif",  alt: "Dun & Bradstreet Registered",                  label: "D&B Registered" },
  { src: "/brand/dir-logo-tx.png",           alt: "Texas DIR Contract Holder",                    label: "DIR Contract" },
];

const MARQUEE = [...CLIENTS, ...CLIENTS];

export function ClientProofStrip() {
  /* Cycles an active "spotlight" across tech platform logos */
  const [activePlatform, setActivePlatform] = useState(0);

  useEffect(() => {
    const t = setInterval(
      () => setActivePlatform((i) => (i + 1) % TECH_PARTNERS.length),
      2400
    );
    return () => clearInterval(t);
  }, []);

  return (
    <section aria-labelledby="clients-heading" style={{ padding: "2rem 0 7rem" }}>

      {/* ── Section header ── */}
      <div className="wrap mb-8">
        <p className="inline-flex items-center gap-2.5 font-mono text-eyebrow font-semibold uppercase tracking-[.12em] text-ink-muted">
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

      {/* ── Logo marquee — full color, infinite scroll ── */}
      <div
        className="marquee-wrap relative overflow-hidden"
        aria-hidden="true"
        style={{
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 7%, black 93%, transparent 100%)",
          maskImage:
            "linear-gradient(to right, transparent 0%, black 7%, black 93%, transparent 100%)",
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
              style={{ height: "42px", minWidth: "80px" }}
            >
              <Image
                src={c.src}
                alt=""
                width={150}
                height={42}
                className="h-full w-auto max-w-[140px] object-contain transition-transform hover:scale-105"
                style={{ transitionDuration: "280ms", mixBlendMode: "multiply" }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* ── Tech platforms + Certifications ── */}
      <div className="wrap mt-14">
        <div className="border-t border-hairline pt-10 grid grid-cols-[1fr_auto] gap-x-16 gap-y-10 items-start max-[900px]:grid-cols-1">

          {/* Technology platforms — active logo cycles with spotlight glow */}
          <div>
            <p className="font-mono text-mono-xs font-semibold uppercase tracking-[.1em] text-ink-muted mb-6">
              Technology platforms
            </p>
            <div className="flex flex-wrap items-center gap-x-10 gap-y-6">
              {TECH_PARTNERS.map((p, i) => {
                const isActive = activePlatform === i;
                return (
                  <div
                    key={p.alt}
                    style={{
                      height: "34px",
                      transform: isActive ? "scale(1.1)" : "scale(1)",
                      filter: isActive
                        ? "drop-shadow(0 0 10px rgba(14,90,102,0.45))"
                        : "none",
                      transition: "transform 400ms cubic-bezier(.2,0,0,1), filter 400ms cubic-bezier(.2,0,0,1)",
                    }}
                  >
                    <Image
                      src={p.src}
                      alt={p.alt}
                      width={120}
                      height={34}
                      className="h-full w-auto object-contain"
                      style={{ mixBlendMode: "multiply" }}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Certifications — staggered border-glow pulse */}
          <div>
            <p className="font-mono text-mono-xs font-semibold uppercase tracking-[.1em] text-ink-muted mb-6">
              Credentials & certifications
            </p>
            <div className="flex flex-wrap gap-3">
              {CERTS.map((c, i) => (
                <div
                  key={c.label}
                  className="cert-pulse group flex items-center gap-2.5 border rounded-card px-3.5 py-2.5 cursor-default"
                  style={{ animationDelay: `${i * 900}ms` }}
                >
                  <div className="flex-none" style={{ height: "26px", width: "26px" }}>
                    <Image
                      src={c.src}
                      alt={c.alt}
                      width={26}
                      height={26}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <span className="font-mono text-mono-xs text-ink-2 whitespace-nowrap">
                    {c.label}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-body-sm text-ink-muted max-w-[36ch]">
              Certified minority business enterprise, qualifying for supplier diversity programs at enterprises and government agencies alike.
            </p>
          </div>

        </div>
      </div>

    </section>
  );
}
