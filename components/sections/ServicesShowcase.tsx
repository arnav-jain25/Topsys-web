"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { SERVICES } from "@/components/ui/ServiceIcons";

export function ServicesShowcase() {
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
      ([e]) => { if (e.isIntersecting) { setVisible(true); io.disconnect(); } },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="mt-16">
      <p className="inline-flex items-center gap-2.5 font-mono text-eyebrow font-medium uppercase tracking-[.1em] text-ink-muted mb-7">
        <span className="inline-block h-0.5 w-[26px] bg-signature rounded-full" aria-hidden="true" />
        What we build, end to end
      </p>
      <div className="relative grid grid-cols-5 gap-4 min-[1440px]:gap-8 max-[900px]:grid-cols-3 max-[600px]:grid-cols-2">
        {/* Threaded rail behind the icons */}
        <div
          className="absolute left-0 right-0 hidden min-[901px]:block"
          style={{ top: "40px", height: "1px", background: "var(--color-hairline)" }}
          aria-hidden="true"
        />
        {SERVICES.map(({ href, title, Icon, bg, hoverBg }, i) => (
          <Link
            key={href}
            href={href}
            className="group relative flex flex-col items-center text-center px-2 py-3"
            style={
              visible
                ? { animation: `topsys-fade-in 500ms cubic-bezier(.2,0,0,1) ${i * 90}ms both` }
                : { opacity: 0 }
            }
          >
            <span
              className="relative z-[1] flex items-center justify-center w-[68px] h-[68px] min-[1440px]:w-20 min-[1440px]:h-20 rounded-panel text-white shadow-e1 transition-all duration-base ease-standard group-hover:-translate-y-[4px] group-hover:shadow-e2 group-focus-visible:-translate-y-[4px] group-focus-visible:shadow-e2"
              style={{ background: bg }}
              onMouseEnter={(e) => { e.currentTarget.style.background = hoverBg; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = bg; }}
              onFocus={(e) => { e.currentTarget.style.background = hoverBg; }}
              onBlur={(e) => { e.currentTarget.style.background = bg; }}
            >
              <Icon />
            </span>
            <span className="mt-4 font-mono text-mono-xs text-ink-muted tracking-[.08em]">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="mt-2 font-display font-semibold uppercase tracking-[.01em] text-heading-5 min-[1440px]:text-heading-4 text-ink transition-colors duration-fast ease-standard">
              {title}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
