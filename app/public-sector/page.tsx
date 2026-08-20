import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ContentToken } from "@/components/ui/ContentToken";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { USMap } from "@/components/sections/USMap";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Public sector — TOPSYS IT",
  description:
    "Technology modernization, data, security, and engineering talent for state and local government agencies. Delivered inside real procurement, compliance, and legacy constraints.",
};

const CONSTRAINTS = [
  {
    label: "Procurement timelines",
    body: "We've worked within DIR, NASPO, and state-specific cooperative frameworks. The process isn't fast; our teams know how to stay engaged and productive across the months it takes to get to contract.",
  },
  {
    label: "Accessibility requirements",
    body: "WCAG 2.1 AA is the floor. State agencies often face state-specific mandates on top. Our delivery teams include accessibility engineering from requirements, not from QA.",
  },
  {
    label: "Records retention and audit exposure",
    body: "Government data architectures must support subpoena-ready exports, retention schedules, and audit trails by design. We've built those controls into pipeline and application architectures, not bolted them on afterward.",
  },
  {
    label: "Legacy integration",
    body: "Systems older than the people maintaining them, undocumented interfaces, and no path to full replacement. We've modernized around mainframes, migrated from COBOL dependencies, and connected decades-old benefit systems to modern APIs.",
  },
  {
    label: "Workforce continuity",
    body: "State IT staff turn over. Institutional knowledge walks out the door. We document as we go, train agency staff through delivery, and build systems that don't require a specific person to operate them.",
  },
  {
    label: "Security and compliance",
    body: "FedRAMP-aligned environments, CJIS data handling, HIPAA PHI in health agency systems. Security is an architecture input at the program level, not a checklist item at the end.",
  },
];

const SERVICES = [
  {
    title: "Modernization",
    body: "Legacy systems replaced or extended incrementally, in production, without stopping agency operations. We modernize what can be modernized and document what can't.",
  },
  {
    title: "Data and AI",
    body: "Data platforms, analytics, and AI that comply with state data governance requirements. We start with the data that exists, not the data the vendor assumes.",
  },
  {
    title: "Cybersecurity",
    body: "Security assessments, identity and access management, and compliance frameworks aligned to state security standards and the specific exposure profile of each agency.",
  },
  {
    title: "Technology talent",
    body: "Specialists and teams for state IT programs — project managers, engineers, architects, and business analysts who've worked in government technology environments.",
  },
];

export default function PublicSectorPage() {
  return (
    <>
      {/* ================================================================
          HERO
          ================================================================ */}
      <section style={{ padding: "6rem 0 5rem" }}>
        <div className="wrap">
          <Breadcrumb items={[{ label: "Public sector" }]} />
          <Eyebrow className="mt-6">Public sector</Eyebrow>
          <h1
            className="font-display font-medium text-ink mt-4"
            style={{
              fontSize: "clamp(2rem, 4.4vw, 3.5rem)",
              lineHeight: 1.06,
              letterSpacing: "-0.03em",
              maxWidth: "24ch",
            }}
          >
            Government technology, delivered to the standard it demands.
          </h1>
          <p className="text-lede text-ink-2 max-w-[60ch] mt-6">
            We work with state and local government agencies on modernization, data, security, and the specialized staff these programs run on. Long procurement cycles, accessibility requirements, audit exposure, systems older than the people maintaining them — we've worked inside all of it.
          </p>
          <div className="flex gap-3 flex-wrap mt-10">
            <Button href="/contact?re=public-sector">Request a capability briefing</Button>
            <Button href="/contract-vehicles" variant="secondary">
              DIR Contract
            </Button>
          </div>
        </div>
      </section>

      {/* ================================================================
          MAP + STATS — paper
          ================================================================ */}
      <section style={{ padding: "4rem 0 7rem" }}>
        <div className="wrap">
          <div className="grid grid-cols-[1.35fr_.65fr] gap-16 items-start max-[1023px]:grid-cols-1">
            <USMap />
            <div>
              <div className="border-t border-hairline pt-5">
                <dt className="font-mono text-mono-sm uppercase tracking-[.1em] text-ink-muted">
                  States served
                </dt>
                <dd className="font-mono text-stat text-ink mt-2">
                  <ContentToken id="STAT-01" />
                </dd>
              </div>
              <div className="border-t border-hairline pt-5 mt-6">
                <dt className="font-mono text-mono-sm uppercase tracking-[.1em] text-ink-muted">
                  Agency types served
                </dt>
                <dd className="text-body-sm text-ink-2 mt-2">
                  Health & human services · Corrections · Transportation · General services · Department of Homeland Security (DHS) · Department of Administrative Services (DOAS) · Department of Labor (DOL) · Job and Family Services (JFS)
                </dd>
              </div>
              <div className="border-t border-hairline pt-5 mt-6">
                <dt className="font-mono text-mono-sm uppercase tracking-[.1em] text-ink-muted">
                  MBE certified
                </dt>
                <dd className="text-body-sm text-ink-2 mt-2">
                  Qualifying for supplier diversity mandates in enterprise and government procurement programs.
                </dd>
              </div>
              <div className="mt-8">
                <Button href="/contact?re=public-sector">Request a briefing</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          WHAT WE DO — paper, 4 service blocks
          ================================================================ */}
      <section className="bg-surface" style={{ padding: "7rem 0" }}>
        <div className="wrap">
          <Eyebrow>Services</Eyebrow>
          <h2
            className="font-display font-medium text-ink mt-4"
            style={{
              fontSize: "clamp(1.75rem, 3.2vw, 2.5rem)",
              letterSpacing: "-0.025em",
            }}
          >
            What we do for agencies
          </h2>
          <div className="grid grid-cols-2 gap-5 mt-10 max-[767px]:grid-cols-1">
            {SERVICES.map(({ title, body }) => (
              <div
                key={title}
                className="bg-white border border-hairline rounded-card px-7 py-7 hover:shadow-e2 hover:-translate-y-[2px] transition-all duration-base ease-standard"
              >
                <h3 className="font-display font-medium text-heading-3 text-ink mb-3">
                  {title}
                </h3>
                <p className="text-body-xs text-ink-2">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          CAPABILITY AUGMENTED STAFFING (CASM) — paper
          ================================================================ */}
      <section style={{ padding: "7rem 0" }}>
        <div className="wrap">
          <Eyebrow>Capability Augmented Staffing (CASM)</Eyebrow>
          <div className="grid grid-cols-[1.2fr_.8fr] gap-12 mt-6 items-start max-[767px]:grid-cols-1">
            <p className="text-lede text-ink-2 max-w-[56ch]">
              Specialists embedded directly into client teams to reduce onboarding friction and accelerate time-to-value.
            </p>
            <div className="border border-hairline rounded-card bg-white px-7 py-7">
              <p className="font-mono text-mono-xs uppercase tracking-[.1em] text-ink-muted mb-4">
                How specialists engage
              </p>
              <ul className="list-none space-y-0">
                {["Embedded specialists", "Project pods", "Contract, contract-to-hire, direct"].map((item) => (
                  <li
                    key={item}
                    className="flex gap-2.5 py-[11px] border-t border-hairline font-mono text-mono text-ink-2 first:border-0"
                  >
                    <span className="text-teal flex-none" aria-hidden="true">·</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          WE UNDERSTAND THE CONSTRAINTS — inverted
          ================================================================ */}
      <section className="on-field" style={{ padding: "7rem 0" }}>
        <div className="wrap">
          <Eyebrow>How we're different</Eyebrow>
          <h2
            className="font-display font-medium text-on-field mt-4"
            style={{
              fontSize: "clamp(1.75rem, 3.2vw, 2.5rem)",
              letterSpacing: "-0.025em",
              maxWidth: "28ch",
            }}
          >
            We understand the constraints. All of them.
          </h2>
          <p className="text-body text-on-field-2 max-w-[62ch] mt-4">
            Vendors who've only worked in commercial environments underestimate government IT. They've never filed a records retention plan, navigated a change advisory board with a six-week turnaround, or explained a system architecture to an auditor. We have.
          </p>
          <div className="grid grid-cols-2 gap-6 mt-12 max-[767px]:grid-cols-1">
            {CONSTRAINTS.map(({ label, body }) => (
              <div
                key={label}
                className="border-t border-field-hairline pt-5"
              >
                <h3 className="font-display font-medium text-heading-4 text-on-field mb-2">
                  {label}
                </h3>
                <p className="text-body-xs text-on-field-2">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          HOW TO WORK WITH US — paper
          ================================================================ */}
      <section style={{ padding: "7rem 0" }}>
        <div className="wrap">
          <Eyebrow>How to work with us</Eyebrow>
          <h2
            className="font-display font-medium text-ink mt-4"
            style={{
              fontSize: "clamp(1.75rem, 3.2vw, 2.5rem)",
              letterSpacing: "-0.025em",
            }}
          >
            Procurement paths available
          </h2>

          <div className="grid grid-cols-3 gap-6 mt-10 max-[767px]:grid-cols-1">
            {[
              {
                title: "DIR cooperative contract",
                body: "Texas DIR contract available for state and local agencies. Allows procurement without a full RFP process. The fastest path for most government clients.",
                href: "/contract-vehicles",
              },
              {
                title: "Competitive RFP / RFQ",
                body: "We respond to competitive solicitations. We write clearly, we scope accurately, and we show up to oral presentations with the people who will do the work.",
                href: "/contact?re=public-sector",
              },
              {
                title: "Sole source and emergency",
                body: "For agency programs with urgent timelines or sole-source justification, we can mobilize quickly and document the engagement properly for audit.",
                href: "/contact?re=public-sector",
              },
            ].map(({ title, body, href }) => (
              <div
                key={title}
                className="border border-hairline rounded-card px-6 py-6 hover:shadow-e2 hover:-translate-y-[2px] hover:border-transparent transition-all duration-base ease-standard bg-white"
              >
                <h3 className="font-display font-medium text-heading-4 text-ink mb-2">
                  {title}
                </h3>
                <p className="text-body-xs text-ink-2 mb-5">{body}</p>
                <a
                  href={href}
                  className="font-mono text-mono-sm text-teal uppercase tracking-[.06em] hover:underline underline-offset-4"
                >
                  Learn more →
                </a>
              </div>
            ))}
          </div>

          <div className="mt-12 flex gap-3 flex-wrap">
            <Button href="/contact?re=public-sector">Request a capability briefing</Button>
            <Button href="/contract-vehicles" variant="secondary">
              View DIR Contract
            </Button>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
