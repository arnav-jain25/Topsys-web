import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { CTASection } from "@/components/sections/CTASection";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { StaggerReveal } from "@/components/ui/StaggerReveal";
import { ServiceIconBadge } from "@/components/ui/ServiceIcons";

export const metadata: Metadata = {
  title: "Applications & modernization",
  description:
    "Legacy modernization, application development, API strategy, and microservices migration for enterprise and government. We re-architect systems. We don't just replace them.",
};

const FAILURE_MODES = [
  {
    label: "Scoped as replacement, not re-architecture",
    body: "Most migrations are funded to swap one technology for another on the same design. The new system inherits the same bottlenecks, the same data model, and the same coupling, just on a newer runtime. You spend the budget and arrive where you started.",
  },
  {
    label: "API sprawl with no contract",
    body: "Point-to-point integrations accumulate over years. Each one is load-bearing. No documentation, no versioning, no owner. Adding a new consumer means reading source code or asking the one person who remembers. The architecture is now a person.",
  },
  {
    label: "Knowledge locked to the original author",
    body: "The application works because one engineer holds the mental model. When that person leaves, the team stops shipping features and starts reading logs to figure out why production behaves the way it does.",
  },
];

/* ---- Offering icons — thin monoline, 20x20, mirrors the icon set already
   established in SiteHeader, ServicesShowcase, and the AI & data page ---- */
const IconAssessment = () => (
  <svg width="20" height="20" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.3" />
    <path d="M13.5 13.5L10.2 10.2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);
const IconDevelopment = () => (
  <svg width="20" height="20" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <path d="M6 4.5L2 9l4 4.5M12 4.5l4 4.5-4 4.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const IconMigration = () => (
  <svg width="20" height="20" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <circle cx="3.5" cy="9" r="2" stroke="currentColor" strokeWidth="1.3" />
    <circle cx="14.5" cy="9" r="2" stroke="currentColor" strokeWidth="1.3" />
    <path d="M5.5 9h7M10.5 6.5L13 9l-2.5 2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const OFFERINGS = [
  {
    title: "Assessment & architecture",
    body: "We map what you have, name the liabilities, and design an incremental path forward. Deliverable: a prioritized backlog, not a slide deck.",
    bullets: [
      "Application portfolio review and dependency mapping",
      "Domain boundary identification for service decomposition",
      "Technical debt quantification and migration sequencing",
    ],
    Icon: IconAssessment,
  },
  {
    title: "Application development",
    body: "Greenfield and brownfield delivery using the stack the problem demands. We build for operability, not for demo day.",
    bullets: [
      "Full-stack development: React, TypeScript, Node.js, Java, .NET",
      "API design and implementation: REST, GraphQL, event-driven",
      "Testing strategy: unit, integration, contract, and load",
    ],
    Icon: IconDevelopment,
  },
  {
    title: "Migration & modernization",
    body: "Incremental migration from legacy systems to modern architectures without a multi-year freeze on feature delivery.",
    bullets: [
      "Strangler fig and anti-corruption layer patterns",
      "Kafka-based event-driven decoupling",
      "Spring Boot and .NET service extraction from monoliths",
    ],
    Icon: IconMigration,
  },
];

const TECH = [
  "Java", "Spring Boot", ".NET", "Node.js", "React", "TypeScript",
  "GraphQL", "REST APIs", "Kafka", "Event-driven architecture",
  "Microservices", "PostgreSQL", "Redis",
];

const HOW_WE_WORK = [
  {
    title: "API-first design",
    body: "Every service boundary is an explicit contract. We design APIs before implementation, version from day one, and document in OpenAPI. Consumers can be added or changed without modifying producers.",
  },
  {
    title: "Strangler fig pattern",
    body: "New capability is built alongside the existing system, not instead of it. Traffic routes to the new service as each domain is ready. The legacy system shrinks as the modern one grows, with no cutover day and no high-stakes rollback.",
  },
  {
    title: "Event-driven decoupling",
    body: "Kafka-based event streams replace point-to-point calls between services. Consumers process events on their own schedule. The publishing service doesn’t know or care who’s listening.",
  },
  {
    title: "Team knowledge transfer built in",
    body: "Architecture decision records, runbooks, and documented domain models are deliverables, not documentation sprints at the end. We write code the next engineer can operate without calling us.",
  },
];

export default function ApplicationsAndModernizationPage() {
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
          <Breadcrumb
            items={[
              { label: "Capabilities", href: "/capabilities" },
              { label: "Applications & modernization" },
            ]}
          />
          <div className="mt-6">
            <ServiceIconBadge slug="applications-and-modernization" />
          </div>
          <Eyebrow className="mt-5">Applications &amp; modernization</Eyebrow>
          <h1
            className="font-display font-medium text-ink mt-4"
            style={{
              fontSize: "clamp(2rem, 4.4vw, 3.5rem)",
              lineHeight: 1.06,
              letterSpacing: "-0.03em",
              maxWidth: "22ch",
            }}
          >
            Legacy systems are a compounding liability, not a stable foundation.
          </h1>
          <p className="text-lede text-ink-2 max-w-[60ch] mt-6">
            Every quarter a legacy system stays in place, the cost of replacing it grows and the
            team that understands it shrinks. We modernize applications incrementally, without
            stopping product delivery to do it.
          </p>
          <div className="flex gap-3 flex-wrap mt-10">
            <Button href="/contact?re=enterprise">Talk to an architect</Button>
            <Button href="#services" variant="secondary">
              What we deliver
            </Button>
          </div>
        </ScrollReveal>
      </section>

      {/* ================================================================
          WHY MIGRATIONS FAIL — inverted
          ================================================================ */}
      <section className="on-field" style={{ padding: "7rem 0" }}>
        <ScrollReveal className="wrap">
          <Eyebrow dark>Why migrations fail</Eyebrow>
          <h2
            className="font-display font-medium text-on-field mt-4"
            style={{
              fontSize: "clamp(1.75rem, 3.2vw, 2.5rem)",
              letterSpacing: "-0.025em",
              maxWidth: "28ch",
            }}
          >
            The problem is rarely the technology. It&rsquo;s the scope of the question.
          </h2>
          <StaggerReveal
            className="grid grid-cols-3 gap-6 mt-12 max-[767px]:grid-cols-1"
            itemDelay={80}
          >
            {FAILURE_MODES.map(({ label, body }) => (
              <div key={label} className="border-t border-field-hairline pt-5">
                <h3 className="font-display font-medium text-heading-4 text-on-field mb-2">
                  {label}
                </h3>
                <p className="text-body-xs text-on-field-2 max-w-[52ch]">{body}</p>
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
              maxWidth: "28ch",
            }}
          >
            Incremental migration. No big bang. No feature freeze.
          </h2>
          <p className="text-body text-ink-2 max-w-[62ch] mt-4">
            We don&rsquo;t recommend rewriting systems from scratch. We use patterns that let new
            and old code coexist while ownership moves incrementally to the new architecture. The
            product team keeps shipping. The platform team keeps migrating.
          </p>

          <StaggerReveal
            className="mt-12 grid grid-cols-2 gap-8 max-[767px]:grid-cols-1"
            itemDelay={80}
          >
            {HOW_WE_WORK.map(({ title, body }) => (
              <div key={title} className="border-t border-hairline pt-6">
                <h3 className="font-display font-medium text-heading-4 text-ink mb-2">
                  {title}
                </h3>
                <p className="text-body-xs text-ink-2 max-w-[52ch]">{body}</p>
              </div>
            ))}
          </StaggerReveal>

          {/* Technology stack */}
          <div className="mt-14">
            <p className="font-mono text-mono-xs text-ink-muted uppercase tracking-[.1em] mb-5">
              Technology
            </p>
            <div className="flex flex-wrap gap-2">
              {TECH.map((t) => (
                <span
                  key={t}
                  className="font-mono text-mono-xs text-ink-2 bg-surface border border-hairline px-3 py-1 rounded-tag"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ================================================================
          SERVICE OFFERINGS — surface, 3-col cards
          ================================================================ */}
      <section id="services" className="bg-surface" style={{ padding: "7rem 0" }}>
        <ScrollReveal className="wrap">
          <Eyebrow>What we deliver</Eyebrow>
          <h2
            className="font-display font-medium text-ink mt-4"
            style={{
              fontSize: "clamp(1.75rem, 3.2vw, 2.5rem)",
              letterSpacing: "-0.025em",
            }}
          >
            Three service lines, one engagement standard
          </h2>
          <StaggerReveal
            className="grid grid-cols-3 gap-6 mt-10 max-[1023px]:grid-cols-1"
            itemDelay={100}
          >
            {OFFERINGS.map(({ title, body, bullets, Icon }, i) => (
              <div
                key={title}
                className="group border border-hairline rounded-card px-6 py-6 bg-white transition-all duration-base ease-standard hover:-translate-y-[3px] hover:shadow-e2 hover:border-transparent relative overflow-hidden"
              >
                {/* Gradient top edge on hover — one of the four permitted uses */}
                <span
                  className="absolute top-0 left-0 right-0 h-[3px] bg-signature origin-left scale-x-0 transition-transform duration-base ease-standard group-hover:scale-x-100"
                  aria-hidden="true"
                />
                <div className="flex items-start justify-between">
                  <span className="text-teal transition-colors duration-fast ease-standard">
                    <Icon />
                  </span>
                  <span className="font-mono text-mono-xs text-ink-muted uppercase tracking-[.08em]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="font-display font-medium text-heading-3 text-ink mt-3 mb-2">
                  {title}
                </h3>
                <p className="text-body-xs text-ink-2 mb-5">{body}</p>
                <ul className="space-y-2">
                  {bullets.map((b) => (
                    <li key={b} className="text-body-xs text-ink-2 flex gap-2 items-start">
                      <span className="text-teal mt-[2px] flex-none" aria-hidden="true">
                        •
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </StaggerReveal>
        </ScrollReveal>
      </section>

      <CTASection />
    </>
  );
}
