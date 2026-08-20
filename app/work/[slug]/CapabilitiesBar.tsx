"use client";
import { useEffect, useRef, useState } from "react";

interface Props {
  capabilities: string[];
}

export function CapabilitiesBar({ capabilities }: Props) {
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
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      className="on-field"
      style={{ background: "var(--color-field)", padding: "2rem 0" }}
    >
      <div className="wrap" ref={ref}>
        <p className="font-mono text-mono-xs uppercase tracking-[.1em] text-on-field-2 mb-3">
          Capabilities involved
        </p>
        <div className="flex flex-wrap gap-2">
          {capabilities.map((cap, i) => (
            <span
              key={cap}
              className="font-mono text-mono-xs uppercase tracking-[.07em] text-on-field border border-field-hairline rounded-control px-3 py-1"
              style={
                visible
                  ? {
                      animation: `topsys-fade-in 500ms cubic-bezier(.2,0,0,1) ${i * 70}ms both`,
                    }
                  : { opacity: 0 }
              }
            >
              {cap}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
