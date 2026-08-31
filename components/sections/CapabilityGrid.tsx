"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface CapCard {
  ordinal: string;
  title: string;
  body: string;
  href: string;
  subcaps?: string[];
  lead?: boolean;
}

const CAPS: CapCard[] = [
  {
    ordinal: "01 / AI & DATA",
    title: "Data foundations, applied AI, and analytics that change what people decide.",
    body: "We start with the workflow and the data, not the model. Then we stay through integration, governance, and the year after launch.",
    href: "/capabilities/ai-and-data",
    subcaps: ["AI advisory", "Generative AI", "Agentic systems", "Intelligent automation", "Machine learning", "Data platforms", "Analytics", "AI governance"],
    lead: true,
  },
  {
    ordinal: "02",
    title: "Applications & modernization",
    body: "Legacy systems modernized incrementally, in production, without pausing the business. Custom applications, integration and long-term support, including COBOL, DB2, CICS and mainframe estates.",
    href: "/capabilities/applications-and-modernization",
  },
  {
    ordinal: "03",
    title: "Cloud & platform engineering",
    body: "Migration, landing zones, DevSecOps and platform engineering that shortens the distance from commit to production.",
    href: "/capabilities/cloud-and-platform-engineering",
  },
  {
    ordinal: "04",
    title: "Cybersecurity",
    body: "Assessments, identity and access, compliance and risk, engineered into delivery rather than bolted on afterward.",
    href: "/capabilities/cybersecurity",
  },
  {
    ordinal: "05",
    title: "Technology talent",
    body: "Specialists and full pods, vetted by engineers, accountable to your delivery plan. Data, AI, cloud, security and modern application skills.",
    href: "/capabilities/technology-talent",
  },
];

export function CapabilityGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => setVisible(e.isIntersecting),
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="grid grid-cols-2 gap-4 mt-12 max-[1023px]:grid-cols-1">
      {CAPS.map((cap, idx) =>
        cap.lead ? (
          /* Lead card — full width, inverted */
          <Link
            key={cap.href}
            href={cap.href}
            className="group col-span-2 relative rounded-panel px-16 py-16 overflow-hidden border-0 shadow-e2 hover:-translate-y-[3px] transition-all duration-base ease-standard hover:shadow-field max-[1023px]:col-span-1"
            style={{
              background: "linear-gradient(135deg,#0B2742 0%,#061C32 60%,#0D3150 100%)",
              ...(visible
                ? { animation: `topsys-fade-in 500ms cubic-bezier(.2,0,0,1) ${idx * 90}ms both` }
                : { opacity: 0 }),
            }}
          >
            {/* Subtle radial highlight */}
            <span
              className="absolute top-[-30%] right-[-10%] w-[55%] h-[150%] pointer-events-none"
              style={{
                background: "radial-gradient(circle,rgba(141,198,62,.14),transparent 65%)",
              }}
              aria-hidden="true"
            />
            {/* Gradient top-edge sweep on hover — one of the four permitted uses */}
            <span
              className="absolute top-0 left-0 right-0 h-[3px] bg-signature scale-x-0 origin-left transition-transform duration-base ease-standard group-hover:scale-x-100 rounded-t-panel"
              aria-hidden="true"
            />
            <span className="relative font-mono text-mono-sm uppercase tracking-[.08em] text-signal">
              {cap.ordinal}
            </span>
            <h3
              className="relative font-display font-medium text-on-field mt-4 mb-2.5"
              style={{ fontSize: "clamp(1.5rem, 2.6vw, 2rem)", maxWidth: "22ch" }}
            >
              {cap.title}
            </h3>
            <p className="relative text-body text-on-field-2 max-w-[58ch]">{cap.body}</p>
            {cap.subcaps && (
              <div className="relative flex flex-wrap gap-2 mt-6">
                {cap.subcaps.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-mono-xs px-[11px] py-1.5 border border-field-hairline rounded-tag text-on-field-2 transition-all duration-fast ease-standard group-hover:border-signal/40 group-hover:text-signal"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </Link>
        ) : (
          /* Standard card */
          <Link
            key={cap.href}
            href={cap.href}
            className="group relative rounded-panel px-8 py-8 bg-white border border-hairline overflow-hidden hover:border-transparent hover:shadow-e2 hover:-translate-y-[3px] transition-all duration-base ease-standard"
            style={
              visible
                ? { animation: `topsys-fade-in 500ms cubic-bezier(.2,0,0,1) ${idx * 90}ms both` }
                : { opacity: 0 }
            }
          >
            {/* Top-edge gradient on hover — one of the four permitted uses */}
            <span
              className="absolute top-0 left-0 right-0 h-[3px] bg-signature scale-x-0 origin-left transition-transform duration-base ease-standard group-hover:scale-x-100"
              aria-hidden="true"
            />
            <span className="font-mono text-mono-sm uppercase tracking-[.08em] text-ink-muted">
              {cap.ordinal}
            </span>
            <h3 className="font-display font-medium text-heading-2 text-ink mt-4 mb-2.5">
              {cap.title}
            </h3>
            <p className="text-body-sm text-ink-2">{cap.body}</p>
          </Link>
        )
      )}
    </div>
  );
}
