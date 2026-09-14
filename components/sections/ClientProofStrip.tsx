"use client";

import Image from "next/image";

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

const MARQUEE = [...CLIENTS, ...CLIENTS];

export function ClientProofStrip() {
  return (
    <section aria-labelledby="clients-heading" style={{ padding: "5rem 0 6rem" }}>

      <div className="wrap mb-10">
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
          <li key={c.alt}>{c.alt} — {c.vertical}</li>
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
          style={{ gap: "4rem", width: "max-content", padding: "1.5rem 2rem" }}
        >
          {MARQUEE.map((c, i) => (
            <div
              key={i}
              className="flex-none flex flex-col items-center justify-start gap-3"
              style={{ minWidth: "120px" }}
            >
              <div className="flex items-center justify-center" style={{ height: "62px" }}>
                <Image
                  src={c.src}
                  alt=""
                  width={220}
                  height={62}
                  className="h-full w-auto max-w-[190px] object-contain transition-transform hover:scale-105"
                  style={{ transitionDuration: "280ms", mixBlendMode: "multiply" }}
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

    </section>
  );
}
