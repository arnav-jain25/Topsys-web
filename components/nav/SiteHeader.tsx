"use client";
// SiteHeader

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, useCallback } from "react";

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

/* FDE icon: person + commit arrow, suggesting embedded + deployment */
const IconFDE = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" className="flex-none">
    <circle cx="6.5" cy="5.5" r="2" stroke="currentColor" strokeWidth="1.3"/>
    <path d="M2.5 14c0-2.5 1.8-4 4-4s4 1.8 4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    <path d="M12 5h4M14 3l2 2-2 2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="12" cy="11" r="1.5" stroke="currentColor" strokeWidth="1.2"/>
    <path d="M13.5 11h2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
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
  {
    href: "/capabilities/forward-deployed",
    title: "Forward Deployed Engineer",
    desc: "Embedded. Accountable to production. Designed to transfer.",
    Icon: IconFDE,
    badge: "FDE" as const,
  },
];

const INTENT_LINKS = [
  { label: "Modernize a legacy system", href: "/capabilities/applications-and-modernization" },
  { label: "Apply AI to a workflow", href: "/capabilities/ai-and-data" },
  { label: "Deploy a Forward Deployed Engineer", href: "/capabilities/forward-deployed" },
  { label: "Staff a delivery team", href: "/capabilities/technology-talent" },
  { label: "Buy through the DIR Contract", href: "/contract-vehicles" },
];

/* Main nav: Services + Industries + Knowledge Hub have dropdowns; About is a plain link */
const MAIN_NAV = [
  { label: "About", href: "/about" },
];

/* Utility strip (top-right, smaller) */
const UTILITY_NAV = [
  { label: "Partners & MSP", href: "/capabilities/technology-talent#msp" },
  { label: "DIR Contract", href: "/contract-vehicles" },
  { label: "Careers", href: "/careers" },
];

const SECTOR_INDUSTRIES = [
  { label: "Fintech",             href: "/industries/fintech",              tags: ["PCI-DSS", "SOC 2", "Kafka"] },
  { label: "Financial services",  href: "/industries/financial-services",  tags: ["Kafka", "Snowflake", "SOX"] },
  { label: "Telecommunications",  href: "/industries/telecommunications",   tags: ["OSS/BSS", "Kafka", "Python"] },
  { label: "Healthcare",          href: "/industries/healthcare",           tags: ["FHIR", "HL7", "HIPAA"] },
  { label: "Technology",          href: "/industries/technology",           tags: ["Kubernetes", "Terraform", "GCP"] },
  { label: "Retail",              href: "/industries/retail",               tags: ["GraphQL", "Snowflake", "AWS"] },
  { label: "Insurance",           href: "/industries/insurance",            tags: ["Spring Boot", "NAIC", "SQL"] },
  { label: "Luxury",              href: "/industries/luxury",               tags: ["Salesforce", "SAP", "Snowflake"] },
];

/* ---- Command bar search data ---- */
const SEARCH_GROUPS = [
  {
    label: "Services",
    items: [
      { label: "AI & data", href: "/capabilities/ai-and-data" },
      { label: "Legacy & mainframe modernization", href: "/capabilities/applications-and-modernization" },
      { label: "Data platforms", href: "/capabilities/ai-and-data#data-platforms" },
    ],
  },
  {
    label: "Public sector",
    items: [
      { label: "State & local government", href: "/public-sector" },
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
  const [sectorsOpen, setSectorsOpen] = useState(false);
  const [knowledgeOpen, setKnowledgeOpen] = useState(false);
  const [knowledgePanelLeft, setKnowledgePanelLeft] = useState(0);
  const [cmdOpen, setCmdOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServices, setMobileServices] = useState(false);
  const [mobileSectors, setMobileSectors] = useState(false);
  const [mobileKnowledge, setMobileKnowledge] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const capBtnRef = useRef<HTMLButtonElement>(null);
  const sectorsPanelRef = useRef<HTMLDivElement>(null);
  const sectorsBtnRef = useRef<HTMLButtonElement>(null);
  const knowledgePanelRef = useRef<HTMLDivElement>(null);
  const knowledgeBtnRef = useRef<HTMLButtonElement>(null);
  const cmdInputRef = useRef<HTMLInputElement>(null);

  /* Close panels on outside click */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const t = e.target as Node;
      if (panelOpen && panelRef.current && !panelRef.current.contains(t) && !capBtnRef.current?.contains(t)) {
        setPanelOpen(false);
      }
      if (sectorsOpen && sectorsPanelRef.current && !sectorsPanelRef.current.contains(t) && !sectorsBtnRef.current?.contains(t)) {
        setSectorsOpen(false);
      }
      if (knowledgeOpen && knowledgePanelRef.current && !knowledgePanelRef.current.contains(t) && !knowledgeBtnRef.current?.contains(t)) {
        setKnowledgeOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [panelOpen, sectorsOpen, knowledgeOpen]);

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
        setSectorsOpen(false);
        setKnowledgeOpen(false);
        setMobileOpen(false);
        setMobileServices(false);
        setMobileSectors(false);
        setMobileKnowledge(false);
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
    setMobileSectors(false);
    setMobileKnowledge(false);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1280px)");
    const onChange = () => { if (mq.matches) closeMobile(); };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [closeMobile]);

  return (
    <>
      {/* ---- Header ---- */}
      <header className="sticky top-0 z-[100] bg-paper/90 backdrop-blur-[10px] relative">
        <div
          className="wrap flex items-stretch justify-between max-[1279px]:items-center max-[1279px]:h-[64px]"
          style={{ height: "84px" }}
        >
          {/* Logo — bottom-aligned with main nav */}
          <Link
            href="/"
            className="flex items-end self-end flex-none pr-10 pb-[13px] max-[1279px]:pb-0 max-[1279px]:pr-0 max-[1279px]:self-auto max-[1279px]:items-center"
            aria-label="TOPSYS IT home"
          >
            <Image
              src="/brand/topsys-logo.png"
              alt="TOPSYS IT"
              width={140}
              height={36}
              className="h-[36px] w-auto"
              priority
            />
          </Link>

          {/* Main nav — bottom-aligned (desktop) */}
          <nav
            className="flex items-end self-end flex-1 max-[1279px]:hidden"
            aria-label="Primary"
          >
            {/* Services */}
            <button
              ref={capBtnRef}
              className="nav-item group"
              aria-expanded={panelOpen}
              aria-controls="cap-panel"
              onClick={() => { setPanelOpen((v) => !v); setSectorsOpen(false); setKnowledgeOpen(false); }}
            >
              Services
              <span
                className={`absolute left-[11px] right-[11px] top-0 h-[2.5px] bg-signature rounded-sm z-[2] transition-transform duration-base ease-standard origin-left ${panelOpen ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
                aria-hidden="true"
              />
            </button>

            {/* Industries */}
            <button
              ref={sectorsBtnRef}
              className="nav-item group"
              aria-expanded={sectorsOpen}
              aria-controls="sectors-panel"
              onClick={() => { setSectorsOpen((v) => !v); setPanelOpen(false); setKnowledgeOpen(false); }}
            >
              Industries
              <span
                className={`absolute left-[11px] right-[11px] top-0 h-[2.5px] bg-signature rounded-sm z-[2] transition-transform duration-base ease-standard origin-left ${sectorsOpen ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
                aria-hidden="true"
              />
            </button>

            {/* Knowledge Hub dropdown */}
            <button
              ref={knowledgeBtnRef}
              className="nav-item group"
              aria-expanded={knowledgeOpen}
              aria-controls="knowledge-panel"
              onClick={() => {
                if (knowledgeBtnRef.current) {
                  const r = knowledgeBtnRef.current.getBoundingClientRect();
                  const panelW = Math.min(480, window.innerWidth - 32);
                  const centered = r.left + r.width / 2 - panelW / 2;
                  setKnowledgePanelLeft(Math.max(16, Math.min(centered, window.innerWidth - panelW - 16)));
                }
                setKnowledgeOpen((v) => !v);
                setPanelOpen(false);
                setSectorsOpen(false);
              }}
            >
              Knowledge Hub
              <span
                className={`absolute left-[11px] right-[11px] top-0 h-[2.5px] bg-signature rounded-sm z-[2] transition-transform duration-base ease-standard origin-left ${knowledgeOpen ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
                aria-hidden="true"
              />
            </button>

            {/* Plain links: About */}
            {MAIN_NAV.map(({ label, href }) => (
              <Link key={href} href={href} className="nav-item group">
                {label}
                <span className="absolute left-[11px] right-[11px] top-0 h-[2.5px] bg-signature rounded-sm z-[2] transition-transform duration-base ease-standard origin-left scale-x-0 group-hover:scale-x-100" aria-hidden="true" />
              </Link>
            ))}
          </nav>

          {/* Right utility row — floats at the top of the header */}
          <div className="flex items-center self-start gap-5 pt-[10px] max-[1279px]:hidden">
            {UTILITY_NAV.map(({ label, href }, i) => (
              <span key={href} className="flex items-center gap-5">
                <Link
                  href={href}
                  className="font-display font-semibold text-ink-muted hover:text-teal transition-colors duration-fast ease-standard whitespace-nowrap"
                  style={{ fontSize: "14px", letterSpacing: "-0.01em" }}
                >
                  {label}
                </Link>
                {i < UTILITY_NAV.length - 1 && (
                  <span className="w-px h-3.5 bg-hairline-strong inline-block flex-none" aria-hidden="true" />
                )}
              </span>
            ))}
            {/* Thin divider before CTA */}
            <span className="w-px h-3.5 bg-hairline-strong inline-block flex-none" aria-hidden="true" />
            <Link
              href="/contact"
              className="font-display font-bold text-teal hover:text-teal-hover transition-colors duration-fast ease-standard whitespace-nowrap"
              style={{ fontSize: "14px", letterSpacing: "-0.01em" }}
            >
              Talk to us →
            </Link>
          </div>

          {/* Mobile burger */}
          <button
            className="hidden max-[1279px]:inline-flex items-center justify-center min-h-11 min-w-11 relative z-[96] font-mono text-mono-sm uppercase tracking-[.09em]"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => (mobileOpen ? closeMobile() : setMobileOpen(true))}
          >
            {mobileOpen ? "Close" : "Menu"}
          </button>

          {/* Services panel — compact two-column list */}
          {panelOpen && (
            <div
              id="cap-panel"
              ref={panelRef}
              role="region"
              aria-label="Services"
              className="hidden min-[1280px]:grid fixed z-[99] animate-[panelDrop_280ms_cubic-bezier(.2,0,0,1)] grid-cols-[1fr_1px_1fr] gap-8 rounded-b-panel shadow-e2 px-10 py-8"
              style={{
                top: "84px",
                left: "clamp(1.25rem, 5vw, 5rem)",
                width: "min(960px, calc(100vw - clamp(1.25rem, 5vw, 5rem) - 1rem))",
                background: "linear-gradient(to bottom, #ffffff, #F3F1EA)",
                border: "1px solid var(--color-hairline)",
                borderTop: "2.5px solid transparent",
                borderImage: "var(--gradient-signature) 1",
              }}
            >
              {/* Compact service list */}
              <div>
                <p className="inline-flex items-center gap-2 font-mono text-eyebrow font-semibold uppercase tracking-[.1em] text-ink-muted mb-3">
                  <span className="inline-block h-0.5 w-[22px] bg-signature rounded-full" aria-hidden="true" />
                  Services
                </p>
                <div className="flex flex-col">
                  {CAP_CARDS.map((c, i) => (
                    <Link
                      key={c.href}
                      href={c.href}
                      onClick={() => setPanelOpen(false)}
                      className={`group/row flex items-center gap-3 py-3 hover:translate-x-[3px] transition-all duration-fast ease-standard ${i < CAP_CARDS.length - 1 ? "border-b border-hairline" : ""}`}
                    >
                      <span className={`flex-none transition-colors duration-fast ease-standard ${c.lead ? "text-teal" : "text-ink-muted group-hover/row:text-teal"}`}>
                        <c.Icon />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="font-display font-medium text-ink group-hover/row:text-teal transition-colors duration-fast ease-standard leading-tight flex items-center gap-2" style={{ fontSize: "14px" }}>
                          {c.title}
                          {"badge" in c && c.badge && (
                            <span className="font-mono text-[10px] tracking-[.1em] text-signal border border-signal/40 rounded-full px-1.5 py-0.5 leading-none flex-none">
                              {c.badge}
                            </span>
                          )}
                        </p>
                        <p className="text-caption text-ink-muted leading-snug mt-0.5 truncate">{c.desc}</p>
                      </div>
                      <span className="ml-auto font-mono text-teal opacity-0 group-hover/row:opacity-100 transition-opacity duration-fast ease-standard flex-none" aria-hidden="true">→</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div className="bg-hairline" />

              {/* Intent links */}
              <div>
                <p className="inline-flex items-center gap-2 font-mono text-eyebrow font-semibold uppercase tracking-[.1em] text-ink-muted mb-3">
                  <span className="inline-block h-0.5 w-[22px] bg-signature rounded-full" aria-hidden="true" />
                  I need to
                </p>
                <div className="flex flex-col gap-1.5">
                  {INTENT_LINKS.map(({ label, href }) => (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setPanelOpen(false)}
                      className="flex justify-between items-center gap-4 py-3 px-4 bg-surface border border-hairline rounded-card text-body-xs text-ink hover:border-teal hover:translate-x-[3px] transition-all duration-fast ease-standard"
                    >
                      {label}
                      <span className="font-mono text-teal flex-none" aria-hidden="true">→</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Knowledge Hub panel */}
          {knowledgeOpen && (
            <div
              id="knowledge-panel"
              ref={knowledgePanelRef}
              role="region"
              aria-label="Knowledge Hub"
              className="hidden min-[1280px]:block fixed z-[99] rounded-b-panel shadow-e2 animate-[panelDrop_280ms_cubic-bezier(.2,0,0,1)]"
              style={{
                top: "84px",
                left: knowledgePanelLeft,
                width: "min(480px, calc(100vw - 2rem))",
                background: "linear-gradient(to bottom, #ffffff, #F3F1EA)",
                border: "1px solid var(--color-hairline)",
                borderTop: "2.5px solid transparent",
                borderImage: "var(--gradient-signature) 1",
              }}
            >
              <div className="px-10 py-8">
                <p className="inline-flex items-center gap-2 font-mono text-eyebrow font-semibold uppercase tracking-[.1em] text-ink-muted mb-5">
                  <span className="inline-block h-0.5 w-[22px] bg-signature rounded-full" aria-hidden="true" />
                  Knowledge Hub
                </p>
                <div className="flex flex-col gap-3">
                  <Link
                    href="/work"
                    onClick={() => setKnowledgeOpen(false)}
                    className="group flex items-start gap-5 p-4 bg-surface border border-hairline rounded-card hover:border-teal hover:-translate-y-[2px] hover:shadow-e1 transition-all duration-fast ease-standard"
                  >
                    <span className="absolute top-0 left-0 right-0 h-[2px] bg-signature scale-x-0 origin-left transition-transform duration-fast ease-standard group-hover:scale-x-100 rounded-t-card" aria-hidden="true" />
                    <div className="flex-none mt-0.5 text-teal">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                        <rect x="2" y="4" width="14" height="2" rx="1" fill="currentColor" opacity=".5"/>
                        <rect x="2" y="8" width="10" height="2" rx="1" fill="currentColor" opacity=".8"/>
                        <rect x="2" y="12" width="12" height="2" rx="1" fill="currentColor"/>
                      </svg>
                    </div>
                    <div>
                      <p className="font-display font-medium text-ink group-hover:text-teal transition-colors duration-fast ease-standard" style={{ fontSize: "14px" }}>
                        Case studies
                      </p>
                      <p className="text-caption text-ink-muted leading-snug mt-0.5">
                        Real engagements, real outcomes — not positioning
                      </p>
                    </div>
                    <span className="ml-auto font-mono text-teal opacity-0 group-hover:opacity-100 transition-opacity duration-fast ease-standard flex-none self-center" aria-hidden="true">→</span>
                  </Link>
                  <Link
                    href="/insights"
                    onClick={() => setKnowledgeOpen(false)}
                    className="group flex items-start gap-5 p-4 bg-surface border border-hairline rounded-card hover:border-teal hover:-translate-y-[2px] hover:shadow-e1 transition-all duration-fast ease-standard"
                  >
                    <div className="flex-none mt-0.5 text-teal">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                        <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.3"/>
                        <path d="M9 6v4M9 12.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                    </div>
                    <div>
                      <p className="font-display font-medium text-ink group-hover:text-teal transition-colors duration-fast ease-standard" style={{ fontSize: "14px" }}>
                        Insights
                      </p>
                      <p className="text-caption text-ink-muted leading-snug mt-0.5">
                        What we're arguing about — AI, architecture, delivery
                      </p>
                    </div>
                    <span className="ml-auto font-mono text-teal opacity-0 group-hover:opacity-100 transition-opacity duration-fast ease-standard flex-none self-center" aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Industries panel — constrained width */}
          {sectorsOpen && (
            <div
              id="sectors-panel"
              ref={sectorsPanelRef}
              role="region"
              aria-label="Industries"
              className="hidden min-[1280px]:flex fixed z-[99] rounded-b-panel shadow-e2 overflow-hidden animate-[panelDrop_280ms_cubic-bezier(.2,0,0,1)]"
              style={{
                top: "84px",
                left: "clamp(1.25rem, 5vw, 5rem)",
                width: "min(1060px, calc(100vw - clamp(1.25rem, 5vw, 5rem) - 1rem))",
                background: "linear-gradient(to bottom, #ffffff, #F3F1EA)",
                border: "1px solid var(--color-hairline)",
                borderTop: "2.5px solid var(--color-teal)",
              }}
            >
              {/* Left column — Public sector (inverted) */}
              <div className="w-[38%] bg-field-deep px-9 py-9 flex flex-col">
                <p className="inline-flex items-center gap-2.5 font-mono text-mono-xs font-semibold uppercase tracking-[.12em] text-signal mb-1">
                  <span className="inline-block h-0.5 w-[22px] bg-signature rounded-full" aria-hidden="true" />
                  Public sector
                </p>
                <p
                  className="font-display font-medium text-on-field mt-2"
                  style={{ fontSize: "clamp(1.3rem, 1.8vw, 1.75rem)", letterSpacing: "-0.025em", lineHeight: 1.1 }}
                >
                  Government programs<br />that ship.
                </p>
                <div className="flex gap-4 mt-4 mb-6">
                  <div className="border-l-2 border-signal pl-3">
                    <p className="font-mono text-mono-xs text-signal uppercase tracking-[.08em]">30</p>
                    <p className="text-caption text-on-field-2 mt-0.5">State engagements</p>
                  </div>
                  <div className="border-l-2 border-field-hairline pl-3">
                    <p className="font-mono text-mono-xs text-on-field-2 uppercase tracking-[.08em]">4</p>
                    <p className="text-caption text-on-field-2 mt-0.5">Countries</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2 mt-auto">
                  <Link href="/public-sector" onClick={() => setSectorsOpen(false)}
                    className="flex justify-between items-center px-4 py-3 bg-field border border-field-hairline rounded-card text-body-xs text-on-field hover:border-signal/40 hover:translate-x-[3px] transition-all duration-fast ease-standard">
                    State &amp; local government <span className="text-signal font-mono" aria-hidden="true">&#8594;</span>
                  </Link>
                  <Link href="/contract-vehicles" onClick={() => setSectorsOpen(false)}
                    className="flex justify-between items-center px-4 py-3 bg-field border border-field-hairline rounded-card text-body-xs text-on-field hover:border-signal/40 hover:translate-x-[3px] transition-all duration-fast ease-standard">
                    DIR Contract <span className="text-signal font-mono" aria-hidden="true">&#8594;</span>
                  </Link>
                  <Link href="/public-sector" onClick={() => setSectorsOpen(false)}
                    className="inline-flex items-center gap-1.5 mt-3 font-mono text-mono-xs uppercase tracking-[.08em] text-on-field-2 hover:text-signal transition-colors duration-fast ease-standard">
                    Public sector overview <span aria-hidden="true">&#8594;</span>
                  </Link>
                </div>
              </div>

              {/* Right column — Private enterprise */}
              <div className="flex-1 border-l border-hairline px-9 py-9">
                <p className="inline-flex items-center gap-2.5 font-mono text-mono-xs font-semibold uppercase tracking-[.12em] text-teal mb-4">
                  <span className="inline-block h-0.5 w-[22px] bg-signature rounded-full" aria-hidden="true" />
                  Private enterprise
                </p>
                <div className="grid grid-cols-3 gap-2.5">
                  {SECTOR_INDUSTRIES.map(({ label, href }) => (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setSectorsOpen(false)}
                      className="group relative overflow-hidden bg-surface border border-hairline rounded-card flex items-center justify-center text-center hover:border-teal hover:-translate-y-[2px] hover:shadow-e1 transition-all duration-fast ease-standard"
                      style={{ height: "52px" }}
                    >
                      <span className="absolute top-0 left-0 right-0 h-[2px] bg-signature scale-x-0 origin-left transition-transform duration-fast ease-standard group-hover:scale-x-100" aria-hidden="true" />
                      <p className="font-display font-medium text-body-xs text-ink group-hover:text-teal transition-colors duration-fast ease-standard leading-tight px-3">{label}</p>
                    </Link>
                  ))}
                </div>
                <Link href="/industries" onClick={() => setSectorsOpen(false)}
                  className="inline-flex items-center gap-2 mt-5 font-mono text-mono-xs uppercase tracking-[.08em] text-teal hover:gap-3 transition-all duration-fast ease-standard">
                  More about our industries <span aria-hidden="true">&#8594;</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Mobile nav drawer */}
      {mobileOpen && (
        <>
          <div
            className="hidden max-[1279px]:block fixed inset-x-0 top-[64px] bottom-0 z-[90] bg-field-deep/40 backdrop-blur-[2px] cursor-pointer"
            onClick={closeMobile}
            aria-hidden="true"
          />
          <div
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="hidden max-[1279px]:flex flex-col fixed inset-x-0 top-[64px] bottom-0 z-[95] bg-paper border-t border-hairline overflow-y-auto overscroll-contain px-5 pt-2 pb-10"
          >
            {/* Services */}
            <button
              className="flex w-full items-center justify-between py-4 border-b border-hairline font-display font-medium text-heading-4 text-ink text-left"
              onClick={() => setMobileServices((v) => !v)}
              aria-expanded={mobileServices}
              aria-controls="mobile-services"
            >
              Services
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"
                className={`flex-none text-ink-muted transition-transform duration-base ease-standard ${mobileServices ? "rotate-180" : ""}`}>
                <path d="M3 6l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {mobileServices && (
              <div id="mobile-services" className="py-2 pl-1">
                {CAP_CARDS.map((c) => (
                  <Link key={c.href} href={c.href} onClick={closeMobile}
                    className="flex items-center gap-3 py-3 border-b border-hairline text-body-sm text-ink-2">
                    <span className="text-teal flex-none"><c.Icon /></span>
                    {c.title}
                  </Link>
                ))}
                <p className="font-mono text-mono-xs uppercase tracking-[.09em] text-ink-muted pt-5 pb-1">I need to</p>
                {INTENT_LINKS.map(({ label, href }) => (
                  <Link key={href} href={href} onClick={closeMobile}
                    className="flex items-center justify-between gap-3 py-3 border-b border-hairline text-body-sm text-ink-2">
                    {label}
                    <span className="font-mono text-teal flex-none" aria-hidden="true">→</span>
                  </Link>
                ))}
              </div>
            )}

            {/* Industries */}
            <button
              className="flex w-full items-center justify-between py-4 border-b border-hairline font-display font-medium text-heading-4 text-ink text-left"
              onClick={() => setMobileSectors((v) => !v)}
              aria-expanded={mobileSectors}
              aria-controls="mobile-sectors"
            >
              Industries
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"
                className={`flex-none text-ink-muted transition-transform duration-base ease-standard ${mobileSectors ? "rotate-180" : ""}`}>
                <path d="M3 6l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {mobileSectors && (
              <div id="mobile-sectors" className="py-2 pl-1">
                <p className="font-mono text-mono-xs uppercase tracking-[.09em] text-ink-muted pt-2 pb-1">Public sector</p>
                <Link href="/public-sector" onClick={closeMobile} className="flex items-center justify-between py-3 border-b border-hairline text-body-sm text-ink-2">
                  Overview <span className="font-mono text-teal flex-none" aria-hidden="true">&#8594;</span>
                </Link>
                <Link href="/public-sector" onClick={closeMobile} className="flex items-center justify-between py-3 border-b border-hairline text-body-sm text-ink-2">
                  State &amp; local government <span className="font-mono text-teal flex-none" aria-hidden="true">&#8594;</span>
                </Link>
                <Link href="/contract-vehicles" onClick={closeMobile} className="flex items-center justify-between py-3 border-b border-hairline text-body-sm text-ink-2">
                  DIR Contract <span className="font-mono text-teal flex-none" aria-hidden="true">&#8594;</span>
                </Link>
                <p className="font-mono text-mono-xs uppercase tracking-[.09em] text-ink-muted pt-4 pb-1">Industries</p>
                {SECTOR_INDUSTRIES.map(({ label, href }) => (
                  <Link key={href} href={href} onClick={closeMobile} className="flex items-center justify-between py-3 border-b border-hairline text-body-sm text-ink-2">
                    {label} <span className="font-mono text-teal flex-none" aria-hidden="true">&#8594;</span>
                  </Link>
                ))}
                <Link href="/industries/luxury" onClick={closeMobile} className="flex items-center justify-between py-3 border-b border-hairline text-body-sm text-ink-2">
                  Luxury <span className="font-mono text-teal flex-none" aria-hidden="true">&#8594;</span>
                </Link>
                <Link href="/industries" onClick={closeMobile} className="flex items-center justify-between py-3 border-b border-hairline text-body-sm text-ink-2">
                  All industries <span className="font-mono text-teal flex-none" aria-hidden="true">&#8594;</span>
                </Link>
              </div>
            )}

            {/* Knowledge Hub */}
            <button
              className="flex w-full items-center justify-between py-4 border-b border-hairline font-display font-medium text-heading-4 text-ink text-left"
              onClick={() => setMobileKnowledge((v) => !v)}
              aria-expanded={mobileKnowledge}
              aria-controls="mobile-knowledge"
            >
              Knowledge Hub
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"
                className={`flex-none text-ink-muted transition-transform duration-base ease-standard ${mobileKnowledge ? "rotate-180" : ""}`}>
                <path d="M3 6l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {mobileKnowledge && (
              <div id="mobile-knowledge" className="py-2 pl-1">
                <Link href="/work" onClick={closeMobile} className="flex items-center justify-between py-3 border-b border-hairline text-body-sm text-ink-2">
                  Case studies <span className="font-mono text-teal flex-none" aria-hidden="true">&#8594;</span>
                </Link>
                <Link href="/insights" onClick={closeMobile} className="flex items-center justify-between py-3 border-b border-hairline text-body-sm text-ink-2">
                  Insights <span className="font-mono text-teal flex-none" aria-hidden="true">&#8594;</span>
                </Link>
              </div>
            )}

            {/* About */}
            {MAIN_NAV.map(({ label, href }) => (
              <Link key={href} href={href} className="block py-4 border-b border-hairline font-display font-medium text-heading-4 text-ink" onClick={closeMobile}>
                {label}
              </Link>
            ))}

            {/* Utility links on mobile */}
            {UTILITY_NAV.map(({ label, href }) => (
              <Link key={href} href={href} className="block py-4 border-b border-hairline font-display font-medium text-heading-4 text-ink" onClick={closeMobile}>
                {label}
              </Link>
            ))}

            <div className="pt-6 flex flex-col gap-3">
              <Link href="/contact" onClick={closeMobile}
                className="inline-flex items-center justify-center h-12 px-5 bg-teal text-white rounded-control text-body-sm font-semibold">
                Talk to us
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
          <div className="max-w-[620px] mx-auto bg-paper rounded-panel shadow-e2 overflow-hidden"
            role="dialog" aria-modal="true" aria-label="Search">
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
                  <p className="font-mono text-mono-xs uppercase tracking-[.09em] text-ink-muted px-6 pt-3 pb-1.5">{label}</p>
                  {items.map(({ label: l, href }) => (
                    <Link key={href} href={href} onClick={closeCmd}
                      className="block px-6 py-2 text-body-sm text-ink hover:bg-teal-tint transition-colors duration-fast ease-standard">
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
