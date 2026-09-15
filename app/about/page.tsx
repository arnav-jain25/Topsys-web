import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { PrinciplesGrid, type Principle } from "./AboutSections";

export const metadata: Metadata = {
  title: "About",
  description:
    "TOPSYS IT Solutions LLC is a minority-owned technology delivery firm with offices across the United States, Canada, and India. Founded by Abhishek Reddy Baddam.",
};

/* ---- Principle icons — thin monoline, 20x20, matches the icon set already
   established across ServiceIcons and each capability page's own hero ---- */
const IconOwnership = () => (
  <svg width="20" height="20" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <circle cx="9" cy="6.5" r="4" stroke="currentColor" strokeWidth="1.3" />
    <path d="M6.5 9.8L5.5 16l3.5-2 3.5 2-1-6.2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const IconLive = () => (
  <svg width="20" height="20" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <circle cx="9" cy="9" r="1.6" fill="currentColor" />
    <path d="M5.8 5.8a4.5 4.5 0 000 6.4M12.2 5.8a4.5 4.5 0 010 6.4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    <path d="M3.3 3.3a8.5 8.5 0 000 11.4M14.7 3.3a8.5 8.5 0 010 11.4" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" opacity="0.55" />
  </svg>
);
const IconVerified = () => (
  <svg width="20" height="20" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <rect x="4" y="3" width="10" height="13" rx="1.3" stroke="currentColor" strokeWidth="1.3" />
    <path d="M6.5 3V2.3a1 1 0 011-1h3a1 1 0 011 1V3" stroke="currentColor" strokeWidth="1.2" />
    <path d="M6.3 9.3l1.8 1.8 3.4-3.8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const IconOneTeam = () => (
  <svg width="20" height="20" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <circle cx="6.5" cy="6" r="2.3" stroke="currentColor" strokeWidth="1.3" />
    <path d="M2 16c0-2.8 2-4.8 4.5-4.8S11 13.2 11 16" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    <circle cx="12.5" cy="5.5" r="1.7" stroke="currentColor" strokeWidth="1.2" />
    <path d="M10.7 16c0-2 1-3.6 2.5-4.2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);
const IconCertified = () => (
  <svg width="20" height="20" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <circle cx="9" cy="9" r="6.5" stroke="currentColor" strokeWidth="1.3" />
    <path d="M6 9l2 2 4-4.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PRINCIPLES: Principle[] = [
  {
    title: "Professional ownership",
    body: "The architects who scope your program are the ones who build it.",
    icon: <IconOwnership />,
  },
  {
    title: "Production, not pilots",
    body: "Every engagement we run ships to production. None of it is a pilot.",
    icon: <IconLive />,
  },
  {
    title: "High-quality delivery",
    body: "Nothing ships until it's verified against source, not guessed.",
    icon: <IconVerified />,
  },
  {
    title: "One team, always on",
    body: "One accountable team, reachable from kickoff to go-live.",
    icon: <IconOneTeam />,
  },
  {
    title: "Diverse-supplier advantage",
    body: "MBE certified. Spend with TOPSYS IT counts toward supplier-diversity goals.",
    icon: <IconCertified />,
  },
];

export default function AboutPage() {
  return (
    <>
      {/* ================================================================
          HERO
          ================================================================ */}
      <section className="relative overflow-hidden" style={{ padding: "6rem 0 5rem" }}>
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
              maxWidth: "24ch",
            }}
          >
            Technology delivery for complex environments.
          </h1>
          <p className="text-lede text-ink-2 max-w-[60ch] mt-6">
            TOPSYS IT Solutions LLC is a minority-owned technology firm that builds and runs critical systems for enterprise and government clients. We&rsquo;ve been doing this for years across multiple countries.
          </p>
        </div>
      </section>

      {/* ================================================================
          OPERATING PRINCIPLES — five concrete standards, rendered as
          pillars sharing one foundation line on desktop
          ================================================================ */}
      <section className="bg-surface" style={{ padding: "4.5rem 0" }}>
        <ScrollReveal className="wrap">
          <Eyebrow>Our standard</Eyebrow>
          <h2
            className="font-display font-medium text-ink mt-4"
            style={{
              fontSize: "clamp(1.5rem, 2.6vw, 2rem)",
              letterSpacing: "-0.025em",
            }}
          >
            Five principles. One engagement standard.
          </h2>
          <div className="mt-12">
            <PrinciplesGrid principles={PRINCIPLES} />
          </div>
        </ScrollReveal>
      </section>

      {/* ================================================================
          OUR STORY — a CEO letter, quietly typeset. Light background, no
          panel, no watermark: the words carry it, not the graphic.
          ================================================================ */}
      <section style={{ padding: "6rem 0 6.5rem" }}>
        <ScrollReveal className="wrap">
          <div className="grid gap-x-16 gap-y-10 min-[1024px]:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
            {/* Left column — eyebrow, headline, and the signature moved up
                to read as a byline, giving the section a real editorial
                width instead of one narrow column stranded on the left */}
            <div>
              <Eyebrow>Our story</Eyebrow>
              <h2
                className="font-display font-medium text-ink mt-4"
                style={{
                  fontSize: "clamp(1.875rem, 3.6vw, 2.75rem)",
                  letterSpacing: "-0.028em",
                  maxWidth: "14ch",
                }}
              >
                Where conviction{" "}
                <span style={{ color: "var(--color-signal)" }}>meets execution</span>.
              </h2>

              <div
                className="mt-9 pt-6 flex items-center gap-3.5 max-[1023px]:hidden"
                style={{ borderTop: "1px solid var(--color-hairline)" }}
              >
                <span
                  className="flex-none flex items-center justify-center rounded-full font-display font-medium"
                  style={{ width: 40, height: 40, fontSize: "0.9375rem", background: "#0D3150", color: "var(--color-signal)" }}
                  aria-hidden="true"
                >
                  AB
                </span>
                <div>
                  <p className="text-body-xs text-ink font-semibold">Abhishek Reddy Baddam</p>
                  <p className="font-mono text-mono-xs uppercase tracking-[.06em]" style={{ color: "var(--color-signal)" }}>
                    Founder &amp; CEO
                  </p>
                  <p className="font-mono text-mono-xs text-ink-muted uppercase tracking-[.06em]" style={{ opacity: 0.75 }}>
                    25+ yrs delivery · M.S. CS, CUNY
                  </p>
                </div>
              </div>
            </div>

            {/* Right column — the letter itself, measure capped for
                readability even though the section now spans full width */}
            <div className="max-w-[62ch]">
              <p
                className="font-display font-medium text-ink"
                style={{ fontSize: "clamp(1.1875rem, 2.1vw, 1.4375rem)", letterSpacing: "-0.016em", lineHeight: 1.4 }}
              >
                I founded TOPSYS IT with a simple belief: the gap between technology strategy and
                execution is ultimately an engineering problem.
              </p>

              <div className="mt-6 space-y-4 text-body text-ink-2">
                <p>
                  Great ideas are only valuable when they can be built, deployed, and made to work
                  in the real world. That requires experienced practitioners who understand the
                  business challenge, know the technology, and take ownership of the outcome.
                </p>
                <p>That belief has shaped TOPSYS IT from day one.</p>
                <p>
                  For more than twenty years, we have brought senior engineers, architects, and
                  delivery leaders into complex enterprise and government environments to solve
                  problems where scale, security, reliability, and execution matter. Our teams
                  have delivered across financial services, telecommunications, healthcare, and
                  state government, working alongside our clients from the initial challenge
                  through production and beyond.
                </p>
                <p>
                  Today, TOPSYS IT is a minority-owned, MBE-certified technology company with
                  delivery capabilities across four countries. While technology has evolved
                  dramatically since we began, our approach has remained remarkably consistent in
                  evolving with the technology.
                </p>
              </div>

              {/* Closing imperative — a quiet blockquote, not a graphic panel */}
              <div className="mt-8 pl-5" style={{ borderLeft: "2px solid var(--color-teal)" }}>
                <p
                  className="font-display font-medium text-ink"
                  style={{ fontSize: "1.1875rem", letterSpacing: "-0.014em", lineHeight: 1.35 }}
                >
                  Put the right people close to the problem. Give them ownership. Build
                  technology that delivers.
                </p>
                <p className="text-body-sm text-ink-2 mt-3">
                  That is the conviction TOPSYS IT was founded on. It is still how we work today.
                </p>
              </div>

              {/* Signature — mobile/tablet only; desktop shows it in the left column */}
              <div
                className="mt-9 pt-6 flex items-center gap-3.5 min-[1024px]:hidden"
                style={{ borderTop: "1px solid var(--color-hairline)" }}
              >
                <span
                  className="flex-none flex items-center justify-center rounded-full font-display font-medium"
                  style={{ width: 40, height: 40, fontSize: "0.9375rem", background: "#0D3150", color: "var(--color-signal)" }}
                  aria-hidden="true"
                >
                  AB
                </span>
                <div>
                  <p className="text-body-xs text-ink font-semibold">Abhishek Reddy Baddam</p>
                  <p className="font-mono text-mono-xs text-ink-muted uppercase tracking-[.06em]">
                    <span style={{ color: "var(--color-signal)" }}>Founder &amp; CEO</span> · 25+ years in technology delivery · M.S. Computer Science, CUNY
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ================================================================
          CROSS-LINKS
          ================================================================ */}
      <section className="bg-surface" style={{ padding: "5rem 0" }}>
        <div className="wrap">
          <div className="flex gap-3 flex-wrap">
            <Button href="/careers">View open roles</Button>
            <Button href="/contact" variant="secondary">Get in touch</Button>
            <Button href="/work" variant="secondary">See our work</Button>
          </div>
        </div>
      </section>

    </>
  );
}
