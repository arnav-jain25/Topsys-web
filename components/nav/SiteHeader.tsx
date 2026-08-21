"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, useCallback } from "react";

/* ---- Capabilities panel data ---- */
/* ---- Service icons (inline SVG, decorative, aria-hidden) ---- */
const IconAI = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" className="flex-none">
    <circle cx="9" cy="9" r="2" stroke="currentColor" strokeWidth="1.3"/>
    <circle cx="2.5" cy="9" r="1.5" stroke="currentColor" strokeWidth="1.3"/>
    <circle cx="15.5" cy="9" r="1.5" stroke="currentColor" strokeWidth="1.3"/>
    <circle cx="9" cy="2.5" r="1.5" stroke="currentColor" strokeWidth="1.3"/>
    <circle cx="9" cy="15.5" r="1.5" stroke="currentColor" strokeWidth="1.3"/>
    <path d="M4 9H7M11 9H14M9 4V7M9 11V14" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
  </svg>
);

const IconApps = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" className="flex-none">
    <path d="M6 4L2 9l4 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 4l4 5-4 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10.5 3L7.5 15" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
  </svg>
);

const IconCloud = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" className="flex-none">
    <path d="M13.5 12a3 3 0 000-6 3.5 3.5 0 00-6.8-.5A2.5 2.5 0 104 12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    <path d="M9 12v4M7 14.5L9 16l2-1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconSecurity = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" className="flex-none">
    <path d="M9 1.5L2 4.5V9c0 3.5 3 6.5 7 7 4-1 7-3.5 7-7V4.5L9 1.5z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
    <path d="M6 9l2.5 2.5L13 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconTalent = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" className="flex-none">
    <circle cx="7" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.3"/>
    <path d="M2 16c0-3 2.2-5 5-5s5 2.2 5 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    <circle cx="13" cy="5.5" r="1.8" stroke="currentColor" strokeWidth="1.2"/>
    <path d="M11 16c0-2 .9-3.5 2.5-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
);

const CAP_CARDS = [
  {
    href: "/capabilities/ai-and-data",
    title: "AI & data",
    desc: "Data foundations, applied AI, and analytics that change what people decide.",
    sub: "Advisory · Generative AI · Automation · ML · Data platforms · Analytics · Governance",
    lead: true,
    Icon: IconAI,
  },
  {
    href: "/capabilities/applications-and-modernization",
    title: "Applications & modernization",
    desc: "Legacy systems modernized in production",
    Icon: IconApps,
  },
  {
    href: "/capabilities/cloud-and-platform-engineering",
    title: "Cloud & platform engineering",
    desc: "Migration, DevSecOps, platform teams",
    Icon: IconCloud,
  },
  {
    href: "/capabilities/cybersecurity",
    title: "Cybersecurity",
    desc: "Identity, compliance, risk",
    Icon: IconSecurity,
  },
  {
    href: "/capabilities/technology-talent",
    title: "Technology talent",
    desc: "Specialists and full delivery pods",
    Icon: IconTalent,
  },
];

const INTENT_LINKS = [
  { label: "Modernize a legacy system", href: "/capabilities/applications-and-modernization" },
  { label: "Apply AI to a workflow", href: "/capabilities/ai-and-data" },
  { label: "Staff a delivery team", href: "/capabilities/technology-talent" },
  { label: "Buy through the DIR Contract", href: "/contract-vehicles" },
];

const NAV_LINKS = [
  { label: "Industries", href: "/industries" },
  { label: "Public sector", href: "/public-sector" },
  { label: "Case studies", href: "/work" },
  { label: "Insights", href: "/insights" },
  { label: "About", href: "/about" },
  { label: "Partners & MSP", href: "/capabilities/technology-talent#msp" },
  { label: "DIR Contract", href: "/contract-vehicles" },
];

/* ---- Command bar search data ---- */
const SEARCH_GROUPS = [
  {
    label: "Services",
    items: [
      { label: "AI & data", href: "/capabilities/ai-and-data" },
      { label: "Legacy & mainframe modernization", href: "/capabilities/applications-and-modernization" },
      { label: "Data platforms", href: "/capabilities/ai-and-data" },
    ],
  },
  {
    label: "Public sector",
    items: [
      { label: "State & local government", href: "/public-sector/state-and-local" },
      { label: "DIR Contract", href: "/contract-vehicles" },
    ],
  },
  {
    label: "Case studies",
    items: [
      { label: "Cross-processor payment intelligence", href: "/work/payments-data" },
    ],
  },
];

/* ========================================================================= */

export function SiteHeader() {
  const [panelOpen, setPanelOpen] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  /* Separate from `panelOpen`: the mobile drawer expands an inline list, it does
     not open the desktop mega-panel, so the two must not share a flag. */
  const [mobileServices, setMobileServices] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const capBtnRef = useRef<HTMLButtonElement>(null);
  const cmdInputRef = useRef<HTMLInputElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  /* Close panel on outside click */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        panelOpen &&
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        !capBtnRef.current?.contains(e.target as Node)
      ) {
        setPanelOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [panelOpen]);

  /* ⌘K / Ctrl+K shortcut */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCmdOpen((v) => !v);
      }
      if (e.key === "Escape") {
        setCmdOpen(false);
        setPanelOpen(false);
        setMobileOpen(false);
        setMobileServices(false);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  /* Focus input when command bar opens */
  useEffect(() => {
    if (cmdOpen) {
      setTimeout(() => cmdInputRef.current?.focus(), 50);
    }
  }, [cmdOpen]);

  /* Lock scroll when overlays open */
  useEffect(() => {
    const open = cmdOpen || mobileOpen;
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => { document.documentElement.style.overflow = ""; };
  }, [cmdOpen, mobileOpen]);

  const closeCmd = useCallback(() => setCmdOpen(false), []);
  const closeMobile = useCallback(() => {
    setMobileOpen(false);
    setMobileServices(false);
  }, []);

  /* Close the drawer if the viewport grows past the mobile breakpoint while it is
     open — otherwise the fixed sheet stays pinned over the desktop layout. */
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => { if (mq.matches) closeMobile(); };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [closeMobile]);

  return (
    <>
      {/* ---- Header ---- */}
      <header
        ref={headerRef}
        className="sticky top-0 z-[100] bg-paper/90 backdrop-blur-[10px]"
      >
        <div className="wrap flex items-end gap-8 h-20 relative max-[1023px]:items-center max-[1023px]:justify-between max-[1023px]:h-[70px]">
          {/* Logo */}
          <Link
            href="/"
            className="pb-4 max-[1023px]:pb-0 flex-none"
            aria-label="TOPSYS IT home"
          >
            <Image
              src="/brand/topsys-logo.png"
              alt="TOPSYS IT"
              width={120}
              height={30}
              className="h-[30px] w-auto"
              priority
            />
          </Link>

          {/* Datum-rule nav (desktop) */}
          <nav
            className="flex-1 flex items-end relative after:absolute after:left-0 after:right-0 after:bottom-0 after:h-px after:bg-hairline max-[1023px]:hidden"
            aria-label="Primary"
          >
            {/* Services — has panel */}
            <button
              ref={capBtnRef}
              className="nav-item group"
              aria-expanded={panelOpen}
              aria-controls="cap-panel"
              onClick={() => setPanelOpen((v) => !v)}
            >
              Services
              {/* Gradient tick — one of the four permitted uses */}
              <span
                className={`absolute left-[17px] right-[17px] bottom-[-1px] h-0.5 bg-signature rounded-sm z-[2] transition-transform duration-base ease-standard origin-left ${panelOpen ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
                aria-hidden="true"
              />
            </button>

            {NAV_LINKS.map(({ label, href }) => (
              <Link key={href} href={href} className="nav-item group">
                {label}
                <span
                  className="absolute left-[17px] right-[17px] bottom-[-1px] h-0.5 bg-signature rounded-sm z-[2] transition-transform duration-base ease-standard origin-left scale-x-0 group-hover:scale-x-100"
                  aria-hidden="true"
                />
              </Link>
            ))}
          </nav>

          {/* Right controls (desktop) */}
          <div className="flex items-center gap-3.5 pb-3.5 max-[1023px]:hidden">
            <button
              className="flex items-center gap-2.5 h-9 px-3 bg-surface border border-hairline rounded-control font-mono text-mono-sm text-ink-muted hover:border-teal hover:text-teal transition-colors duration-fast ease-standard"
              onClick={() => setCmdOpen(true)}
              aria-label="Open search"
            >
              Search <span aria-hidden="true">⌘K</span>
            </button>
            <Link
              href="/careers"
              className="text-caption text-ink-muted hover:text-ink transition-colors duration-fast ease-standard"
            >
              Careers
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center h-10 px-5 bg-teal text-white rounded-control text-body-xs font-semibold hover:bg-teal-hover transition-colors duration-fast ease-standard"
            >
              Talk to us
            </Link>
          </div>

          {/* Mobile burger */}
          <button
            className="hidden max-[1023px]:inline-flex items-center justify-center min-h-11 min-w-11 relative z-[96] font-mono text-mono-sm uppercase tracking-[.09em]"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => (mobileOpen ? closeMobile() : setMobileOpen(true))}
          >
            {mobileOpen ? "Close" : "Menu"}
          </button>

          {/* Capability mega-panel */}
          {panelOpen && (
            <div
              id="cap-panel"
              ref={panelRef}
              role="region"
              aria-label="Services"
              /* Desktop only. Its 3-column grid and 3rem padding have no viable
                 mobile rendering — on a phone the columns collapsed to ~140px and
                 every service title broke mid-word. Mobile gets the inline list
                 in the drawer below instead. */
              className="hidden min-[1024px]:grid absolute top-20 left-0 right-0 bg-gradient-to-b from-white to-[#F3F1EA] border border-hairline border-t-[2px] rounded-b-panel shadow-e2 px-12 py-12 grid-cols-[1.55fr_1px_1fr] gap-12 z-[99] animate-[panelDrop_280ms_cubic-bezier(.2,0,0,1)]"
              style={{
                borderTopColor: "transparent",
                borderImage: "var(--gradient-signature) 1",
              }}
            >
              {/* Cap cards */}
              <div>
                <p className="inline-flex items-center gap-2.5 font-mono text-eyebrow font-medium uppercase tracking-[.1em] text-ink-muted mb-4">
                  <span className="inline-block h-0.5 w-[26px] bg-signature rounded-full" aria-hidden="true" />
                  Service map
                </p>
                <div className="grid grid-cols-2 gap-3 mt-4">
                  {CAP_CARDS.map((c) =>
                    c.lead ? (
                      <Link
                        key={c.href}
                        href={c.href}
                        onClick={() => setPanelOpen(false)}
                        className="col-span-2 bg-gradient-to-r from-field to-field-raised border-0 rounded-card p-6 shadow-e1 hover:-translate-y-0.5 hover:shadow-field transition-all duration-fast ease-standard"
                      >
                        <div className="flex items-center gap-2.5 text-signal mb-2">
                          <c.Icon />
                          <span className="font-mono text-mono-xs uppercase tracking-[.08em] text-signal">01</span>
                        </div>
                        <h4 className="text-heading-5 font-display font-medium text-on-field mb-1">
                          {c.title}
                        </h4>
                        <p className="text-caption text-on-field-2 leading-relaxed">{c.desc}</p>
                        {c.sub && (
                          <p className="mt-3 font-mono text-mono-xs uppercase tracking-[.06em] text-signal">
                            {c.sub}
                          </p>
                        )}
                      </Link>
                    ) : (
                      <Link
                        key={c.href}
                        href={c.href}
                        onClick={() => setPanelOpen(false)}
                        className="group/card border border-hairline rounded-card p-4 bg-white hover:border-teal hover:shadow-e1 hover:-translate-y-0.5 transition-all duration-fast ease-standard"
                      >
                        <div className="text-ink-muted group-hover/card:text-teal transition-colors duration-fast ease-standard mb-2">
                          <c.Icon />
                        </div>
                        <h4 className="text-heading-5 font-display font-medium text-ink mb-0.5">
                          {c.title}
                        </h4>
                        <p className="text-caption text-ink-muted leading-relaxed">{c.desc}</p>
                      </Link>
                    )
                  )}
                </div>
              </div>

              {/* Divider */}
              <div className="bg-hairline" />

              {/* Intent links */}
              <div>
                <p className="inline-flex items-center gap-2.5 font-mono text-eyebrow font-medium uppercase tracking-[.1em] text-ink-muted mb-4">
                  <span className="inline-block h-0.5 w-[26px] bg-signature rounded-full" aria-hidden="true" />
                  I need to
                </p>
                <div className="flex flex-col gap-2 mt-4">
                  {INTENT_LINKS.map(({ label, href }) => (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setPanelOpen(false)}
                      className="flex justify-between items-center p-4 bg-white border border-hairline rounded-card text-body-xs text-ink hover:border-teal hover:translate-x-[3px] hover:shadow-e1 transition-all duration-fast ease-standard"
                    >
                      {label}
                      <span className="font-mono text-teal" aria-hidden="true">→</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

      </header>

      {/* Mobile nav drawer — a fixed sheet under the header bar rather than an
          in-flow block, so it scrolls independently and the page behind it
          cannot be reached by accident. Dismissed by the backdrop, Escape, the
          Close control, or picking any destination.

          Deliberately a SIBLING of <header>, not a child: the header carries
          `backdrop-blur`, and any filter/backdrop-filter makes an element a
          containing block for `position: fixed` descendants. Nested inside, the
          sheet resolved `top:70px; bottom:0` against the 70px header box and
          collapsed to a ~49px strip with a zero-height backdrop — which is why
          the menu looked broken on a phone and could only be dismissed by the
          Close control. */}
      {mobileOpen && (
          <>
            <div
              className="hidden max-[1023px]:block fixed inset-x-0 top-[70px] bottom-0 z-[90] bg-field-deep/40 backdrop-blur-[2px]"
              onClick={closeMobile}
              aria-hidden="true"
            />
            <div
              id="mobile-nav"
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              className="hidden max-[1023px]:flex flex-col fixed inset-x-0 top-[70px] bottom-0 z-[95] bg-paper border-t border-hairline overflow-y-auto overscroll-contain px-5 pt-2 pb-10"
            >
              {/* Services — inline disclosure, not the desktop mega-panel */}
              <button
                className="flex w-full items-center justify-between py-4 border-b border-hairline font-display font-medium text-heading-4 text-ink text-left"
                onClick={() => setMobileServices((v) => !v)}
                aria-expanded={mobileServices}
                aria-controls="mobile-services"
              >
                Services
                <svg
                  width="16" height="16" viewBox="0 0 16 16" fill="none"
                  aria-hidden="true"
                  className={`flex-none text-ink-muted transition-transform duration-base ease-standard ${mobileServices ? "rotate-180" : ""}`}
                >
                  <path d="M3 6l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {mobileServices && (
                <div id="mobile-services" className="py-2 pl-1">
                  {CAP_CARDS.map((c) => (
                    <Link
                      key={c.href}
                      href={c.href}
                      onClick={closeMobile}
                      className="flex items-center gap-3 py-3 border-b border-hairline text-body-sm text-ink-2"
                    >
                      <span className="text-teal flex-none"><c.Icon /></span>
                      {c.title}
                    </Link>
                  ))}
                  <p className="font-mono text-mono-xs uppercase tracking-[.09em] text-ink-muted pt-5 pb-1">
                    I need to
                  </p>
                  {INTENT_LINKS.map(({ label, href }) => (
                    <Link
                      key={href}
                      href={href}
                      onClick={closeMobile}
                      className="flex items-center justify-between gap-3 py-3 border-b border-hairline text-body-sm text-ink-2"
                    >
                      {label}
                      <span className="font-mono text-teal flex-none" aria-hidden="true">→</span>
                    </Link>
                  ))}
                </div>
              )}

              {NAV_LINKS.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className="block py-4 border-b border-hairline font-display font-medium text-heading-4 text-ink"
                  onClick={closeMobile}
                >
                  {label}
                </Link>
              ))}

              <div className="pt-6 flex flex-col gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center h-12 px-5 bg-teal text-white rounded-control text-body-sm font-semibold"
                  onClick={closeMobile}
                >
                  Talk to us
                </Link>
                <Link
                  href="/careers"
                  className="inline-flex items-center justify-center h-12 text-body-sm text-ink-muted"
                  onClick={closeMobile}
                >
                  Careers
                </Link>
              </div>
            </div>
          </>
      )}

      {/* ---- Command bar overlay ---- */}
      {cmdOpen && (
        <div
          className="fixed inset-0 bg-field-deep/[.45] backdrop-blur-[3px] z-[150] pt-[12vh]"
          onClick={(e) => { if (e.target === e.currentTarget) closeCmd(); }}
          role="presentation"
        >
          <div
            className="max-w-[620px] mx-auto bg-paper rounded-panel shadow-e2 overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Search"
          >
            <input
              ref={cmdInputRef}
              type="text"
              placeholder="Search: try COBOL, Snowflake, Pennsylvania, agentic AI"
              className="w-full h-[62px] px-6 border-0 border-b border-hairline bg-transparent font-body text-[17px] text-ink focus:outline-none placeholder:text-ink-muted"
              autoComplete="off"
            />
            <div className="py-3 max-h-[50vh] overflow-auto">
              {SEARCH_GROUPS.map(({ label, items }) => (
                <div key={label}>
                  <p className="font-mono text-mono-xs uppercase tracking-[.09em] text-ink-muted px-6 pt-3 pb-1.5">
                    {label}
                  </p>
                  {items.map(({ label: l, href }) => (
                    <Link
                      key={href}
                      href={href}
                      onClick={closeCmd}
                      className="block px-6 py-2 text-body-sm text-ink hover:bg-teal-tint transition-colors duration-fast ease-standard"
                    >
                      {l}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
