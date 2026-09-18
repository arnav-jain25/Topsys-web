import type { Metadata } from "next";
import Link from "next/link";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import {
  DossierSection,
  FootprintPanel,
  StandardLine,
  MethodStaircase,
  CredentialLedger,
  PullQuote,
  VisionaryQuotes,
  ClosingDoors,
  type Principle,
  type RegisterStat,
  type EngagementStep,
  type CredentialItem,
  type VisionaryQuote,
  type Door,
} from "./AboutSections";

export const metadata: Metadata = {
  title: "About",
  description:
    "TOPSYS IT Solutions LLC is a minority-owned technology delivery firm with offices across the United States, Canada, and India.",
};

const PRINCIPLES: Principle[] = [
  {
    title: "Professional ownership",
    body: (
      <>
        The architects who scope your program are the ones who <em>build</em> it.
      </>
    ),
  },
  {
    title: "Production, not pilots",
    body: (
      <>
        Every engagement we run ships to production. <em>None</em> of it is a pilot.
      </>
    ),
  },
  {
    title: "High-quality delivery",
    body: (
      <>
        Nothing ships until it&rsquo;s verified against source, not <em>guessed</em>.
      </>
    ),
  },
  {
    title: "One team, always on",
    body: "One accountable team, reachable from kickoff to go-live.",
  },
  {
    title: "Diverse-supplier advantage",
    body: "MBE certified. Spend with TOPSYS IT counts toward supplier-diversity goals.",
  },
];

const STANDARD_OUTCOME = "Customer success is our priority.";

const STATS: RegisterStat[] = [
  {
    value: 20,
    suffix: "+",
    label: "Years delivery",
    note: "Continuous delivery work inside enterprise and government environments.",
  },
  {
    value: 4,
    label: "Countries",
    note: "Delivery teams in four countries, working to a single engagement standard.",
  },
  {
    value: 30,
    label: "State engagements",
    note: "Programs run with state agencies and their prime contractors.",
  },
];

const SECTORS = [
  { name: "Public sector", href: "/public-sector" },
  { name: "Private enterprise", href: "/industries" },
];

const ENGAGEMENT_STEPS: EngagementStep[] = [
  {
    n: "01",
    title: "Scope with builders",
    body: (
      <>
        The engineers who scope the work are the ones who do it &mdash; not a pursuit team that
        hands off at signature.
      </>
    ),
  },
  {
    n: "02",
    title: "Staff, build, or both",
    body: (
      <>
        Senior practitioners join your team, or we take ownership of a defined deliverable
        outright. <em>You</em> decide which.
      </>
    ),
  },
  {
    n: "03",
    title: "Ship to production",
    body: "Every engagement we run goes live. Nothing ships until it is verified against source.",
  },
  {
    n: "04",
    title: "Stay reachable",
    body: "The team that built it stays on past go-live. Delivery does not end at handoff.",
  },
];

const CREDENTIALS: CredentialItem[] = [
  {
    kind: "Certification",
    label: "MBE certified",
    note: "Minority Business Enterprise. Spend with TOPSYS IT counts toward supplier-diversity goals.",
  },
  {
    kind: "Registration",
    label: "SAM.gov registered",
    note: "The federal contractor registry public buyers check before an award.",
  },
  {
    kind: "Contract",
    label: "Texas DIR · DIR-CPO-5671",
    note: "A cooperative vehicle: Texas state and local entities can buy IT staff augmentation without running a full RFP.",
    href: "/contract-vehicles",
  },
  {
    kind: "Programs",
    label: "MSP and VMS experienced",
    note: "Set up inside managed-service and vendor-management programs already in place.",
  },
];

const VISIONARY_QUOTES: [VisionaryQuote, VisionaryQuote] = [
  {
    kicker: "On finishing what you start",
    quote: "Talk is cheap. Show me the code.",
    name: "Linus Torvalds",
    role: "creator of Linux and Git",
    source: "Linux kernel mailing list, 2000",
  },
  {
    kicker: "On listening to the field",
    quote: (
      <>
        Your most unhappy customers are your{" "}
        <span style={{ color: "var(--color-signal)" }}>greatest source of learning</span>.
      </>
    ),
    name: "Bill Gates",
    role: "co-founder, Microsoft",
    source: "Business @ the Speed of Thought, 1999",
  },
];

const DOORS: Door[] = [
  {
    title: "Scope a program",
    body: "Bring the system, the constraint, and the date it has to work by.",
    href: "/contact",
    cta: "Talk to us",
  },
  {
    title: "Join the delivery team",
    body: "See what we are hiring for, and who we hire for it.",
    href: "/careers",
    cta: "View roles",
  },
  {
    title: "Read the work",
    body: "Case studies from programs that reached production.",
    href: "/work",
    cta: "See case studies",
  },
];

const JUMP_LINKS = [
  { n: "01", label: "Footprint", href: "#footprint" },
  { n: "02", label: "Standard", href: "#standard" },
  { n: "03", label: "Method", href: "#method" },
  { n: "04", label: "Procurement", href: "#procurement" },
  { n: "05", label: "Conviction", href: "#conviction" },
];

export default function AboutPage() {
  return (
    <>
      {/* ================================================================
          HERO — headline, then the lede stacked beneath it, not beside.
          ================================================================ */}
      <section className="relative overflow-hidden" style={{ padding: "5.5rem 0 3.5rem" }}>
        <span
          className="absolute top-[-10%] right-[-5%] w-[55%] h-[120%] pointer-events-none z-0"
          style={{
            background:
              "radial-gradient(circle,rgba(14,90,102,.07),rgba(141,198,62,.04) 45%,transparent 65%)",
          }}
          aria-hidden="true"
        />
        <div className="wrap relative z-[1]">
          <Breadcrumb items={[{ label: "About" }]} />
          <Eyebrow className="mt-6">About</Eyebrow>

          <h1
            className="font-display font-medium text-ink mt-4"
            style={{
              fontSize: "clamp(2rem, 4.4vw, 3.5rem)",
              lineHeight: 1.06,
              letterSpacing: "-0.03em",
              maxWidth: "22ch",
            }}
          >
            Technology delivery for complex environments.
          </h1>
          <p className="text-lede text-ink-2 max-w-[60ch] mt-5">
            TOPSYS IT Solutions LLC is a minority-owned technology firm that builds and runs
            critical systems for enterprise and government clients &mdash; the ones where an
            outage is <em>somebody&rsquo;s</em> bad day, at scale.
          </p>

          {/* Jump nav — a table of contents for the numbered file below. */}
          <nav
            aria-label="On this page"
            className="flex flex-wrap gap-x-8 gap-y-2 mt-9 pt-5 border-t border-hairline"
          >
            {JUMP_LINKS.map(({ n, label, href }) => (
              <Link
                key={href}
                href={href}
                className="group inline-flex items-center gap-2 font-mono text-mono-sm uppercase tracking-[.08em] text-ink-muted hover:text-teal transition-colors duration-fast ease-standard"
              >
                <span className="font-mono text-mono-xs text-hairline-strong">{n}</span>
                {label}
                <span
                  aria-hidden="true"
                  className="transition-transform duration-fast ease-standard group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            ))}
          </nav>
        </div>
      </section>

      {/* ================================================================
          01 — FOOTPRINT. Inverted, on a drafting grid. Figures at headline
          scale on the left, the two markets they were delivered into
          filling the right, so nothing floats in empty space.
          ================================================================ */}
      <section id="footprint" className="on-field ruled-field" style={{ padding: "4rem 0 4.25rem" }}>
        <ScrollReveal className="wrap">
          <DossierSection n="01" label="Footprint" inverted>
            <h2
              className="font-display font-medium text-on-field"
              style={{ fontSize: "clamp(1.375rem, 2.4vw, 1.875rem)", letterSpacing: "-0.025em", maxWidth: "36ch" }}
            >
              What the delivery record <em>actually</em> says.
            </h2>
            <div className="mt-7">
              <FootprintPanel stats={STATS} sectors={SECTORS} />
            </div>
          </DossierSection>
        </ScrollReveal>
      </section>

      {/* ================================================================
          02 — STANDARD. The five principles as stops on a single line,
          ending at the outcome they exist to serve.
          ================================================================ */}
      <section id="standard" className="bg-surface" style={{ padding: "4.25rem 0" }}>
        <ScrollReveal className="wrap">
          <DossierSection n="02" label="Standard">
            <h2
              className="font-display font-medium text-ink"
              style={{ fontSize: "clamp(1.5rem, 2.6vw, 2rem)", letterSpacing: "-0.025em" }}
            >
              Five principles. One engagement standard.
            </h2>
            <div className="mt-10">
              <StandardLine principles={PRINCIPLES} outcome={STANDARD_OUTCOME} />
            </div>
          </DossierSection>
        </ScrollReveal>
      </section>

      {/* ================================================================
          03 + 04 — paired. The staircase is tall and narrow, so the
          procurement ledger sits beside it rather than leaving the right
          half of the page empty.
          ================================================================ */}
      <section className="ruled-paper" style={{ padding: "4.25rem 0" }}>
        <div className="wrap grid gap-x-16 gap-y-14 min-[1024px]:grid-cols-[1.1fr_0.9fr] items-start">
          <ScrollReveal>
            <DossierSection n="03" label="Method" id="method" stacked>
              <h2
                className="font-display font-medium text-ink"
                style={{ fontSize: "clamp(1.5rem, 2.6vw, 2rem)", letterSpacing: "-0.025em", maxWidth: "22ch" }}
              >
                Four steps, the same on every engagement.
              </h2>
              <MethodStaircase steps={ENGAGEMENT_STEPS} />
            </DossierSection>
          </ScrollReveal>

          <ScrollReveal delay={120}>
            <DossierSection n="04" label="Procurement" id="procurement" stacked>
              <h2
                className="font-display font-medium text-ink"
                style={{ fontSize: "clamp(1.5rem, 2.6vw, 2rem)", letterSpacing: "-0.025em", maxWidth: "22ch" }}
              >
                Certifications and registrations.
              </h2>
              <p className="text-body-sm text-ink-2 mt-4 max-w-[44ch]">
                Four things a contracting office asks for before anything else. All four are
                current; none of them is a <em>capability</em> claim.
              </p>
              <CredentialLedger items={CREDENTIALS} />
            </DossierSection>
          </ScrollReveal>
        </div>
      </section>

      {/* ================================================================
          05 — CONVICTION. Company voice, unsigned, set as a report spread.
          ================================================================ */}
      <section id="conviction" className="bg-surface" style={{ padding: "4.5rem 0 5rem" }}>
        <ScrollReveal className="wrap">
          <DossierSection n="05" label="Conviction">
            <div className="grid gap-x-14 gap-y-6 min-[980px]:grid-cols-[1fr_1fr] items-end">
              <h2
                className="font-display font-medium text-ink"
                style={{
                  fontSize: "clamp(1.875rem, 3.6vw, 2.75rem)",
                  letterSpacing: "-0.028em",
                  maxWidth: "16ch",
                }}
              >
                Where conviction <em>meets execution</em>.
              </h2>
              <PullQuote>
                The gap between technology strategy and execution is, in the end, an
                engineering problem.
              </PullQuote>
            </div>

            <div
              className="report-columns text-body text-ink-2 mt-10 pt-9"
              style={{ borderTop: "1px solid var(--color-hairline)" }}
            >
              <p className="drop-cap mb-4">
                TOPSYS IT was founded on a simple belief: great ideas are only valuable when they
                can be built, deployed, and made to work in the real world. That requires
                experienced practitioners who understand the business challenge, know the
                technology, and take ownership of the outcome. That belief has shaped the firm
                from day one.
              </p>
              <p className="mb-4">
                For more than twenty years, we have brought senior engineers, architects, and
                delivery leaders into complex enterprise and government environments to solve
                problems where scale, security, reliability, and execution matter. Our teams have
                delivered across financial services, telecommunications, healthcare, and state
                government, working alongside our clients from the initial challenge through
                production and beyond.
              </p>
              <p className="mb-0">
                Today, TOPSYS IT is a minority-owned, MBE-certified technology company with
                delivery capabilities across four countries. Technology has changed completely
                since we began. What has not changed is <em>how</em> we put people against a
                problem.
              </p>
            </div>

            <div
              className="mt-10 pt-8 grid gap-x-14 gap-y-4 min-[980px]:grid-cols-[1.35fr_1fr] items-baseline"
              style={{ borderTop: "2px solid var(--color-teal)" }}
            >
              <p
                className="font-display font-medium text-ink"
                style={{ fontSize: "clamp(1.25rem, 2.2vw, 1.625rem)", letterSpacing: "-0.018em", lineHeight: 1.3 }}
              >
                Put the right people close to the problem. Give them ownership. Build technology
                that delivers.
              </p>
              <p className="text-body-sm text-ink-2">
                That is the conviction TOPSYS IT was founded on. It is <em>still</em> how we work
                today.
              </p>
            </div>
          </DossierSection>
        </ScrollReveal>
      </section>

      {/* ================================================================
          TWO VIEWS — the last thing on the page before the close. Split
          light/dark, each quote kickered to something this firm does and
          cited to where it was actually published. The dark panel uses
          the same field tone as the closing section below so the two run
          together instead of stepping to a darker navy.
          ================================================================ */}
      <VisionaryQuotes quotes={VISIONARY_QUOTES} />

      {/* ================================================================
          CLOSING — three doors rather than a headline and floating
          buttons. Same field tone as the quote panel above it, continuous.
          ================================================================ */}
      <section className="on-field ruled-field" style={{ padding: "4.25rem 0 4.5rem" }}>
        <div className="wrap">
          <div className="flex flex-wrap items-baseline justify-between gap-x-10 gap-y-3 mb-9">
            <h2
              className="font-display font-medium text-on-field"
              style={{ fontSize: "clamp(1.625rem, 3vw, 2.25rem)", letterSpacing: "-0.026em", maxWidth: "20ch" }}
            >
              Where would <em>you</em> like to start?
            </h2>
            <p className="font-mono text-mono-xs uppercase tracking-[.1em] text-on-field-2">
              Three ways in · one team behind all of them
            </p>
          </div>
          <ClosingDoors doors={DOORS} />
        </div>
      </section>
    </>
  );
}
