"use client";
import { useEffect, useRef, useState } from "react";
import type React from "react";
import type { Office } from "@/lib/offices";

function useReveal<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, visible };
}

/* -------------------------------------------------------------------------- */
/*  Values grid                                                                */
/*  Each value card has a teal top rule that extends left→right on reveal.    */
/* -------------------------------------------------------------------------- */
export function AboutValuesGrid({ values }: { values: string[] }) {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <div ref={ref} className="grid grid-cols-3 gap-8 max-[767px]:grid-cols-1">
      {values.map((v, idx) => {
        const delay = idx * 80;
        const revealStyle: React.CSSProperties = visible
          ? { animation: `topsys-fade-in 500ms cubic-bezier(.2,0,0,1) ${delay}ms both` }
          : { opacity: 0 };
        const ruleStyle: React.CSSProperties = visible
          ? { animation: `topsys-rule-extend 500ms cubic-bezier(.2,0,0,1) ${delay}ms both` }
          : { transform: "scaleX(0)" };

        return (
          <div key={v} className="relative pt-5" style={revealStyle}>
            {/* Extending teal top rule — replaces static border-t-2 border-teal */}
            <span
              className="absolute top-0 left-0 right-0 h-0.5 bg-teal origin-left"
              style={ruleStyle}
              aria-hidden="true"
            />
            <p className="text-body text-ink-2">{v}</p>
          </div>
        );
      })}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Credentials grid (on-field section)                                        */
/*  Items reveal staggered; top rule extends with same delay.                 */
/* -------------------------------------------------------------------------- */
export type Credential = { label: string; value: string };

export function AboutCredentialsGrid({
  credentials,
}: {
  credentials: Credential[];
}) {
  const { ref, visible } = useReveal<HTMLDListElement>();

  return (
    <dl
      ref={ref}
      className="grid grid-cols-3 gap-6 mt-10 max-[767px]:grid-cols-2 max-[479px]:grid-cols-1"
    >
      {credentials.map(({ label, value }, idx) => {
        const delay = idx * 80;
        const revealStyle: React.CSSProperties = visible
          ? { animation: `topsys-fade-in 500ms cubic-bezier(.2,0,0,1) ${delay}ms both` }
          : { opacity: 0 };
        const ruleStyle: React.CSSProperties = visible
          ? { animation: `topsys-rule-extend 500ms cubic-bezier(.2,0,0,1) ${delay}ms both` }
          : { transform: "scaleX(0)" };

        return (
          <div key={label} className="relative pt-5" style={revealStyle}>
            {/* Extending field-hairline top rule */}
            <span
              className="absolute top-0 left-0 right-0 h-px bg-field-hairline origin-left"
              style={ruleStyle}
              aria-hidden="true"
            />
            <dt className="font-mono text-mono-xs text-on-field-2 uppercase tracking-[.08em]">
              {label}
            </dt>
            <dd
              className="font-mono text-stat text-on-field mt-2"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}
            >
              {value}
            </dd>
          </div>
        );
      })}
    </dl>
  );
}

/* -------------------------------------------------------------------------- */
/*  Offices grid                                                               */
/*  Staggered fade-in + extending hairline top rule per card.                 */
/* -------------------------------------------------------------------------- */
export function AboutOfficesGrid({ offices }: { offices: Office[] }) {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className="grid grid-cols-4 gap-6 mt-12 max-[767px]:grid-cols-2 max-[479px]:grid-cols-1"
    >
      {offices.map(({ id, label, address, phone, mapsUrl }, idx) => {
        const delay = idx * 80;
        const revealStyle: React.CSSProperties = visible
          ? { animation: `topsys-fade-in 500ms cubic-bezier(.2,0,0,1) ${delay}ms both` }
          : { opacity: 0 };
        const ruleStyle: React.CSSProperties = visible
          ? { animation: `topsys-rule-extend 500ms cubic-bezier(.2,0,0,1) ${delay}ms both` }
          : { transform: "scaleX(0)" };

        return (
          <div key={id} className="relative pt-5" style={revealStyle}>
            <span
              className="absolute top-0 left-0 right-0 h-px bg-hairline origin-left"
              style={ruleStyle}
              aria-hidden="true"
            />
            <h3 className="font-display font-medium text-heading-4 text-ink mb-2">
              {label}
            </h3>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-body-xs text-ink-muted hover:text-teal transition-colors duration-fast ease-standard"
            >
              {address}
            </a>
            {phone && (
              <p className="font-mono text-mono-xs text-ink-muted mt-2">{phone}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
