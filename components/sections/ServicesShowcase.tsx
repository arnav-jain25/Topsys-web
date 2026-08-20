"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/* ---- Service icons (inline SVG, decorative) — mirrors SiteHeader's set ---- */
const IconAI = () => (
  <svg width="26" height="26" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <circle cx="9" cy="9" r="2" stroke="currentColor" strokeWidth="1.3" />
    <circle cx="2.5" cy="9" r="1.5" stroke="currentColor" strokeWidth="1.3" />
    <circle cx="15.5" cy="9" r="1.5" stroke="currentColor" strokeWidth="1.3" />
    <circle cx="9" cy="2.5" r="1.5" stroke="currentColor" strokeWidth="1.3" />
    <circle cx="9" cy="15.5" r="1.5" stroke="currentColor" strokeWidth="1.3" />
    <path d="M4 9H7M11 9H14M9 4V7M9 11V14" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

const IconApps = () => (
  <svg width="26" height="26" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <path d="M6 4L2 9l4 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 4l4 5-4 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10.5 3L7.5 15" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

const IconCloud = () => (
  <svg width="26" height="26" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <path d="M13.5 12a3 3 0 000-6 3.5 3.5 0 00-6.8-.5A2.5 2.5 0 104 12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    <path d="M9 12v4M7 14.5L9 16l2-1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconSecurity = () => (
  <svg width="26" height="26" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <path d="M9 1.5L2 4.5V9c0 3.5 3 6.5 7 7 4-1 7-3.5 7-7V4.5L9 1.5z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    <path d="M6 9l2.5 2.5L13 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconTalent = () => (
  <svg width="26" height="26" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <circle cx="7" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.3" />
    <path d="M2 16c0-3 2.2-5 5-5s5 2.2 5 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    <circle cx="13" cy="5.5" r="1.8" stroke="currentColor" strokeWidth="1.2" />
    <path d="M11 16c0-2 .9-3.5 2.5-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

/* Each service gets its own light tint + a deeper accent for the icon and
   hover fill, so the row reads as five distinct offerings rather than one
   repeated blue tile. Values are inline (not Tailwind classes) since the
   palette here is intentionally broader than the core brand tokens. */
const SERVICES = [
  { ord: "01", href: "/capabilities/ai-and-data", title: "AI & data", Icon: IconAI, bg: "#E2EEEF", fg: "#0E5A66" },
  { ord: "02", href: "/capabilities/applications-and-modernization", title: "Applications & modernization", Icon: IconApps, bg: "#F6E9D2", fg: "#8A5A18" },
  { ord: "03", href: "/capabilities/cloud-and-platform-engineering", title: "Cloud & platform", Icon: IconCloud, bg: "#DCEAF5", fg: "#235A82" },
  { ord: "04", href: "/capabilities/cybersecurity", title: "Cybersecurity", Icon: IconSecurity, bg: "#F1E1E6", fg: "#7A2E45" },
  { ord: "05", href: "/capabilities/technology-talent", title: "Technology talent", Icon: IconTalent, bg: "#E7EEDD", fg: "#55692F" },
];

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
        {SERVICES.map(({ ord, href, title, Icon, bg, fg }, i) => (
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
              className="relative z-[1] flex items-center justify-center w-[68px] h-[68px] min-[1440px]:w-20 min-[1440px]:h-20 rounded-panel border border-transparent transition-all duration-base ease-standard group-hover:-translate-y-[4px] group-hover:shadow-e2 group-focus-visible:-translate-y-[4px] group-focus-visible:shadow-e2"
              style={{ background: bg, color: fg }}
              onMouseEnter={(e) => { e.currentTarget.style.background = fg; e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = bg; e.currentTarget.style.color = fg; }}
              onFocus={(e) => { e.currentTarget.style.background = fg; e.currentTarget.style.color = "#fff"; }}
              onBlur={(e) => { e.currentTarget.style.background = bg; e.currentTarget.style.color = fg; }}
            >
              <Icon />
            </span>
            <span className="mt-4 font-mono text-mono-xs text-ink-muted tracking-[.08em]">
              {ord}
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
