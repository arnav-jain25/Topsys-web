import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { HowWeWork } from "@/components/sections/HowWeWork";
import { CTASection } from "@/components/sections/CTASection";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { StaggerReveal } from "@/components/ui/StaggerReveal";
import { ServiceIconBadge } from "@/components/ui/ServiceIcons";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Data and AI, application modernization, cloud and platform engineering, cybersecurity, and technology talent. TOPSYS IT delivers across the full technology stack for enterprise and government clients.",
};

const CAPS = [
  {
    ord: "01",
    href: "/capabilities/ai-and-data",
    title: "AI & data",
    lead: "Data foundations, applied AI, and analytics that change what people decide.",
    body: "We start with the workflow and the data, not the model. Strategy, use-case definition, data platform work, build, integration, governance, and scale, end to end.",
    subcaps: ["AI advisory", "Generative AI", "Intelligent automation", "Machine learning", "Data platforms", "Analytics", "AI governance"],
    dark: true,
  },
  {
    ord: "02",
    href: "/capabilities/applications-and-modernization",
    title: "Applications & modernization",
    lead: "Legacy systems modernized incrementally, in production.",
    body: "Custom application development, legacy modernization, integration and APIs, and application support. We don't pause the business to modernize it.",
    subcaps: [],
    dark: false,
  },
  {
    ord: "03",
    href: "/capabilities/cloud-and-platform-engineering",
    title: "Cloud & platform engineering",
    lead: "Migration, landing zones, DevSecOps, and platforms that shorten the distance from commit to production.",
    body: "Cloud migration, DevSecOps pipeline engineering, and platform engineering. Infrastructure that teams can operate without heroics.",
    subcaps: [],
    dark: false,
  },
  {
    ord: "04",
    href: "/capabilities/cybersecurity",
    title: "Cybersecurity",
    lead: "Security engineered into delivery, not bolted on afterward.",
    body: "Assessments, identity and access, compliance and risk management. We work at the architecture level, not the checklist level.",
    subcaps: [],
    dark: false,
  },
  {
    ord: "05",
    href: "/capabilities/technology-talent",
    title: "Technology talent",
    lead: "Senior specialists and full pods, vetted by engineers.",
    body: "Embedded specialists, project pods, and specialist recruiting. Accountable to your delivery plan, not to a headcount target.",
    subcaps: [],
    dark: false,
  },
];

const ENGAGEMENT_TYPES = [
  {
    type: "SOW-based",
    desc: "We own the deliverable: scope, architecture, build, integration, and the second standup after handover. Fixed scope and milestones. Suitable for defined programs.",
  },
  {
    type: "Embedded team",
    desc: "Senior specialists and pods embedded into your delivery plan. Accountable to your sprint cadence, your definition of done, and your team standards.",
  },
  {
    type: "Hybrid",
    desc: "Many engagements start as embedded staff and grow into program ownership, or begin as a scoped program and transition to a retained team. We design for the transition.",
  },
];

export default function CapabilitiesPage() {
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
        <ScrollReveal className="wrap relative z-[1]" delay={80}>
          <Breadcrumb items={[{ label: "Services" }]} />
          <Eyebrow className="mt-6">Services</Eyebrow>
          <h1
            className="font-display font-medium text-ink mt-4"
            style={{
              fontSize: "clamp(2rem, 4.4vw, 3.5rem)",
              lineHeight: 1.06,
              letterSpacing: "-0.03em",
              maxWidth: "22ch",
            }}
          >
            Five services. One engineering standard across all of them.
          </h1>
          <p className="text-lede text-ink-2 max-w-[60ch] mt-6">
            We build and run critical technology for enterprise and government clients, across data and AI, modernization, cloud, security, and the specialized teams these programs need.
          </p>
        </ScrollReveal>
      </section>

      {/* ================================================================
          CAPABILITY GRID
          ================================================================ */}
      <section style={{ paddingBottom: "8rem" }}>
        <ScrollReveal className="wrap">
          <div className="flex flex-col gap-5">
            {/* Lead card — AI & data (full-width, already has hover effects) */}
            <Link
              href={CAPS[0].href}
              className="block rounded-panel relative overflow-hidden transition-all duration-base ease-standard hover:-translate-y-[3px] hover:shadow-field group"
              style={{ background: "linear-gradient(135deg,#0B2F38 0%,#06232A 60%,#0E3A44 100%)", padding: "3rem" }}
              aria-label={`${CAPS[0].title}: ${CAPS[0].lead}`}
            >
              {/* Ambient glow */}
              <span
                className="absolute top-[-30%] right-[-10%] w-[55%] h-[150%] pointer-events-none"
                style={{ background: "radial-gradient(circle,rgba(141,198,62,.14),transparent 65%)" }}
                aria-hidden="true"
              />
              {/* Gradient top edge on hover — one of the four permitted uses */}
              <span
                className="absolute top-0 left-0 right-0 h-[3px] bg-signature origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-base ease-standard"
                aria-hidden="true"
              />
              <div className="relative mb-5">
                <ServiceIconBadge slug="ai-and-data" size={56} />
              </div>
              <span className="font-mono text-mono-xs text-signal uppercase tracking-[.08em]">
                {CAPS[0].ord} / AI & DATA
              </span>
              <h2
                className="font-display font-medium text-on-field mt-4"
                style={{ fontSize: "clamp(1.5rem, 2.6vw, 2rem)", letterSpacing: "-0.022em", maxWidth: "22ch" }}
              >
                {CAPS[0].lead}
              </h2>
              <p className="text-body-sm text-on-field-2 max-w-[58ch] mt-3">{CAPS[0].body}</p>
              <div className="flex flex-wrap gap-2 mt-6">
                {CAPS[0].subcaps.map((s) => (
                  <span
                    key={s}
                    className="font-mono text-mono-xs px-3 py-1.5 border border-field-hairline rounded-full text-on-field-2 group-hover:border-signal/40 group-hover:text-signal transition-colors duration-fast ease-standard"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </Link>

            {/* Standard 2-column grid for the rest — stagger reveal */}
            <StaggerReveal
              className="grid grid-cols-2 gap-5 max-[767px]:grid-cols-1"
              itemDelay={80}
            >
              {CAPS.slice(1).map(({ ord, href, title, lead, body }) => (
                <Link
                  key={href}
                  href={href}
                  className="block border border-hairline rounded-card px-8 py-8 bg-white relative overflow-hidden transition-all duration-base ease-standard hover:border-transparent hover:shadow-e2 hover:-translate-y-[3px] group"
                  aria-label={`${title}: ${lead}`}
                >
                  {/* Gradient top edge on hover — one of the four permitted uses */}
                  <span
                    className="absolute top-0 left-0 right-0 h-[3px] bg-signature origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-base ease-standard"
                    aria-hidden="true"
                  />
                  <ServiceIconBadge slug={href.split("/").pop()!} size={48} />
                  <span className="block font-mono text-mono-xs text-ink-muted uppercase tracking-[.08em] mt-4">
                    {ord}
                  </span>
                  <h2 className="font-display font-medium text-heading-2 text-ink mt-2 mb-2">
                    {title}
                  </h2>
                  <p className="text-body-xs text-ink-2">{body}</p>
                </Link>
              ))}
            </StaggerReveal>
          </div>
        </ScrollReveal>
      </section>

      {/* ================================================================
          ENGAGEMENT MODEL — inverted
          ================================================================ */}
      <section className="on-field" style={{ padding: "7rem 0" }}>
        <ScrollReveal className="wrap">
          <Eyebrow>How engagements work</Eyebrow>
          <h2
            className="font-display font-medium text-on-field mt-4"
            style={{
              fontSize: "clamp(1.75rem, 3.2vw, 2.5rem)",
              letterSpacing: "-0.025em",
            }}
          >
            Three ways to engage
          </h2>
          <p className="text-body text-on-field-2 max-w-[62ch] mt-4">
            We scope the engagement model to what the program actually needs, not what simplifies our sales process.
          </p>
          <StaggerReveal
            className="grid grid-cols-3 gap-6 mt-10 max-[767px]:grid-cols-1"
            itemDelay={80}
          >
            {ENGAGEMENT_TYPES.map(({ type, desc }) => (
              <div key={type} className="border-t border-field-hairline pt-5">
                <h3 className="font-display font-medium text-heading-4 text-on-field mb-2">
                  {type}
                </h3>
                <p className="text-body-xs text-on-field-2">{desc}</p>
              </div>
            ))}
          </StaggerReveal>
        </ScrollReveal>
      </section>

      {/* ================================================================
          HOW WE WORK — paper
          ================================================================ */}
      <section style={{ padding: "7rem 0" }}>
        <ScrollReveal className="wrap">
          <Eyebrow>How we work</Eyebrow>
          <h2
            className="font-display font-medium text-ink mt-4"
            style={{
              fontSize: "clamp(1.75rem, 3.2vw, 2.5rem)",
              letterSpacing: "-0.025em",
            }}
          >
            How engagements run
          </h2>
          <HowWeWork />
        </ScrollReveal>
      </section>

      {/* ================================================================
          CROSS-LINKS
          ================================================================ */}
      <section className="bg-surface" style={{ padding: "5rem 0" }}>
        <ScrollReveal className="wrap">
          <div className="flex gap-4 flex-wrap items-center justify-between">
            <div>
              <p className="font-display font-medium text-heading-4 text-ink">
                Not sure which capability fits your program?
              </p>
              <p className="text-body-sm text-ink-2 mt-1 max-w-[56ch]">
                Most programs span two or three capabilities. We scope based on what you're trying to achieve, not which service line has availability.
              </p>
            </div>
            <div className="flex gap-3 flex-wrap">
              <Button href="/contact">Talk to us</Button>
              <Button href="/work" variant="secondary">See case studies</Button>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <CTASection />
    </>
  );
}
