import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ContentToken } from "@/components/ui/ContentToken";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { CTASection } from "@/components/sections/CTASection";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ServiceIconBadge } from "@/components/ui/ServiceIcons";
import { StaggerReveal } from "@/components/ui/StaggerReveal";
import { HashScrollFix } from "@/components/ui/HashScrollFix";

export const metadata: Metadata = {
  title: "Technology talent",
  description:
    "Senior engineers, architects, and full delivery pods for enterprise technology programs. Screened by practitioners, accountable to your delivery plan.",
};

const SKILLS = [
  { group: "Data & AI", items: ["Python", "Spark", "dbt", "Snowflake", "BigQuery", "Databricks", "PyTorch", "LangChain", "Airflow", "Kafka"] },
  { group: "Cloud & platform", items: ["AWS", "Azure", "GCP", "Terraform", "Kubernetes", "Helm", "ArgoCD", "GitHub Actions", "Jenkins", "Ansible"] },
  { group: "Applications", items: ["Java", "Node.js", "React", "TypeScript", "Spring Boot", "FastAPI", ".NET", "Go", "GraphQL", "REST APIs"] },
  { group: "Cybersecurity", items: ["SIEM", "IAM", "Okta", "CyberArk", "Splunk", "NIST CSF", "CMMC", "penetration testing", "cloud security"] },
];

/* ---- Engagement model icons — thin monoline, 20x20, mirrors the icon set
   already established in SiteHeader, ServicesShowcase, and the AI & data page ---- */
const IconEmbedded = () => (
  <svg width="20" height="20" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <circle cx="9" cy="5.5" r="2.5" stroke="currentColor" strokeWidth="1.3" />
    <path d="M3.5 15c0-2.8 2.5-5 5.5-5s5.5 2.2 5.5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    <rect x="1.5" y="1.5" width="15" height="15" rx="2" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
  </svg>
);
const IconPods = () => (
  <svg width="20" height="20" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <circle cx="6" cy="6.5" r="2" stroke="currentColor" strokeWidth="1.2" />
    <circle cx="12.5" cy="6" r="2" stroke="currentColor" strokeWidth="1.2" />
    <circle cx="9" cy="12.5" r="2" stroke="currentColor" strokeWidth="1.2" />
    <path d="M7.4 8L8.3 10.9M10.6 8L9.7 10.9M8 6.3h3" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
  </svg>
);
const IconRecruiting = () => (
  <svg width="20" height="20" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <circle cx="7.5" cy="7.5" r="5" stroke="currentColor" strokeWidth="1.3" />
    <path d="M11.2 11.2L16 16" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    <path d="M5.8 7.5l1.2 1.2 2.2-2.4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const MODELS = [
  {
    ord: "01",
    title: "Embedded specialists",
    body: "Individual senior contributors placed into your delivery team. Not a warm body to fill a seat, but an engineer or architect who joins your sprint, attends your standups, and is accountable to your definition of done.",
    features: [
      "Screened by engineers, not recruiters",
      "Contract, contract-to-hire, or direct placement",
      "7-day replacement guarantee on poor fits",
    ],
    Icon: IconEmbedded,
  },
  {
    ord: "02",
    title: "Project pods",
    body: "A self-contained team, typically a lead engineer, two to four contributors, and a delivery manager, organized around your program's outcome and accountable to milestones, not hours.",
    features: [
      "Skills assembled for the specific program",
      "Delivery manager included",
      "Accountable to milestones",
    ],
    Icon: IconPods,
  },
  {
    ord: "03",
    title: "Specialist recruiting",
    body: "Direct-hire placement for roles where you need someone permanently. Technical phone screens, reference checks, and a structured offer process, handled by people who've done the job they're hiring for.",
    features: [
      "Technical screening included",
      "Reduced rate for clients with active engagements",
      "Placement guarantee",
    ],
    Icon: IconRecruiting,
  },
];

const MARKET_FAILURES = [
  {
    label: "Résumé volume over technical fit",
    body: "Staffing vendors optimize for volume: more candidates, faster submissions, higher margin on more roles. The result is a long queue of people who've listed the technology, not demonstrated it.",
  },
  {
    label: "No screening that matters",
    body: "Most technical screens are conducted by recruiters reading a checklist. A senior engineer asking about system design, failure handling, and production decisions is a different conversation. Most agencies don't run that conversation.",
  },
  {
    label: "No accountability after placement",
    body: "The vendor made the placement and moved on. When the contractor isn't performing, the client manages it. We stay engaged, because our delivery teams work alongside the talent we place.",
  },
];

const HOW_DIFFERENT = [
  "Technical phone screens conducted by engineers, not recruiters",
  "Domain-specific assessment: what systems have you built, at what scale, and what broke",
  "Reference checks with previous engineering managers",
  "Offer process structured to set expectations, not just close",
  "30-day check-in after placement; we manage underperformance alongside you",
];

const MSP_LOGOS = [
  { name: "Covendis",          src: "/msp-partner-logos/covendis.png",               delay: 0 },
  { name: "OST Global",        src: "/msp-partner-logos/ost-global.png",              delay: 0.5 },
  { name: "CAI",               src: "/msp-partner-logos/cai.png",                     delay: 1.0 },
  { name: "Knowledge Services",src: "/msp-partner-logos/Knowledge_Services_no_bg.png",delay: 0.3 },
  { name: "Upglide",           src: "/msp-partner-logos/upglide_no_bg.png",           delay: 0.8 },
  { name: "iLabor",            src: "/private-logos/ilabor.png",                      delay: 1.3 },
  { name: "Innova Sol",        src: "/msp-partner-logos/Innova-sol_no_bg.png",        delay: 0.6 },
];


export default function TechnologyTalentPage() {
  return (
    <>
      <HashScrollFix />
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
              { label: "Technology talent" },
            ]}
          />
          <div className="mt-6">
            <ServiceIconBadge slug="technology-talent" />
          </div>
          <Eyebrow className="mt-5">Technology talent</Eyebrow>
          <h1
            className="font-display font-medium text-ink mt-4"
            style={{
              fontSize: "clamp(2rem, 4.4vw, 3.5rem)",
              lineHeight: 1.06,
              letterSpacing: "-0.03em",
              maxWidth: "22ch",
            }}
          >
            Engineers who vet engineers.
          </h1>
          <p className="text-lede text-ink-2 max-w-[60ch] mt-6">
            Résumés tell you what someone has done. They don't tell you whether it worked, at what scale, or under what kind of pressure. Our technical reviewers have built the systems they're hiring people to build.
          </p>
          <div className="flex gap-3 flex-wrap mt-10">
            <Button href="/contact?re=talent">Tell us what you need to staff</Button>
            <Button href="#models" variant="secondary">
              Three engagement models
            </Button>
          </div>
        </ScrollReveal>
      </section>

      {/* ================================================================
          MSP / WORKFORCE PROGRAMS — surface (before "The Problem")
          ================================================================ */}
      <section id="msp" className="bg-surface" style={{ padding: "6rem 0", scrollMarginTop: "100px" }}>
        <ScrollReveal className="wrap">
          <Eyebrow>Partner and MSP ecosystem</Eyebrow>
          <h2
            className="font-display font-medium text-ink mt-4"
            style={{
              fontSize: "clamp(1.75rem, 3.2vw, 2.5rem)",
              letterSpacing: "-0.025em",
            }}
          >
            Vendor-of-record compliance, built in
          </h2>
          <p className="text-body text-ink-2 max-w-[62ch] mt-4">
            We work inside managed service provider programs and workforce management platforms for clients who require vendor-of-record compliance.
          </p>
          <div className="grid grid-cols-4 gap-4 mt-10 max-[1023px]:grid-cols-3 max-[767px]:grid-cols-2">
            {MSP_LOGOS.map(({ name, src, delay }) => (
              <div
                key={name}
                className="group relative bg-white border border-hairline rounded-card flex items-center justify-center px-6 py-7 hover:border-teal/50 hover:-translate-y-[2px] hover:shadow-e1 transition-all duration-base ease-standard overflow-hidden"
              >
                {/* Status dot + ripple ring */}
                <span className="absolute top-3 right-3 flex items-center justify-center" aria-hidden="true">
                  {/* Ripple ring */}
                  <span
                    className="absolute rounded-full border border-teal"
                    style={{
                      width: "10px",
                      height: "10px",
                      animation: `partner-ripple 2.4s ease-out infinite`,
                      animationDelay: `${delay}s`,
                    }}
                  />
                  {/* Solid dot */}
                  <span
                    className="relative rounded-full bg-teal"
                    style={{ width: "6px", height: "6px", opacity: 0.75 }}
                  />
                </span>

                <Image
                  src={src}
                  alt={name}
                  width={160}
                  height={56}
                  className="object-contain w-auto"
                  style={{ maxHeight: "44px" }}
                />
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* ================================================================
          MARKET FAILURE — inverted
          ================================================================ */}
      <section className="on-field" style={{ padding: "7rem 0" }}>
        <ScrollReveal className="wrap">
          <Eyebrow>The problem</Eyebrow>
          <h2
            className="font-display font-medium text-on-field mt-4"
            style={{
              fontSize: "clamp(1.75rem, 3.2vw, 2.5rem)",
              letterSpacing: "-0.025em",
              maxWidth: "28ch",
            }}
          >
            Why the standard staffing model fails technology programs.
          </h2>
          <StaggerReveal
            className="grid grid-cols-3 gap-6 mt-12 max-[767px]:grid-cols-1"
            itemDelay={80}
          >
            {MARKET_FAILURES.map(({ label, body }) => (
              <div key={label} className="border-t border-field-hairline pt-5">
                <h3 className="font-display font-medium text-heading-4 text-on-field mb-2">
                  {label}
                </h3>
                <p className="text-body-xs text-on-field-2">{body}</p>
              </div>
            ))}
          </StaggerReveal>
        </ScrollReveal>
      </section>

      {/* ================================================================
          HOW WE'RE DIFFERENT — paper
          ================================================================ */}
      <section style={{ padding: "7rem 0" }}>
        <ScrollReveal className="wrap">
          <Eyebrow>How we're different</Eyebrow>
          <h2
            className="font-display font-medium text-ink mt-4"
            style={{
              fontSize: "clamp(1.75rem, 3.2vw, 2.5rem)",
              letterSpacing: "-0.025em",
              maxWidth: "28ch",
            }}
          >
            Recruiters who work alongside delivery teams.
          </h2>
          <div className="grid grid-cols-[1fr_1fr] gap-12 mt-10 items-start max-[767px]:grid-cols-1">
            <div>
              <p className="text-body text-ink-2">
                Our recruiting function sits inside our delivery practice, not alongside it. The people screening candidates for a data engineering role are working on data engineering programs. They know what a production dbt model looks like. They know the questions worth asking.
              </p>
              <p className="text-body text-ink-2 mt-4">
                <ContentToken id="CAP-03">
                  <span className="text-ink-muted">
                    Verification pending: confirm whether recruiting works alongside delivery teams or operates independently. This is the central differentiator claim for this page.
                  </span>
                </ContentToken>
              </p>
            </div>
            <div className="space-y-4">
              {HOW_DIFFERENT.map((item) => (
                <div key={item} className="flex gap-3 items-start text-body-xs text-ink-2">
                  <span className="text-teal mt-[2px] flex-none font-mono" aria-hidden="true">•</span>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ================================================================
          THREE MODELS — surface
          ================================================================ */}
      <section id="models" className="bg-surface" style={{ padding: "7rem 0" }}>
        <ScrollReveal className="wrap">
          <Eyebrow>Engagement models</Eyebrow>
          <h2
            className="font-display font-medium text-ink mt-4"
            style={{
              fontSize: "clamp(1.75rem, 3.2vw, 2.5rem)",
              letterSpacing: "-0.025em",
            }}
          >
            Three ways to work with us on talent
          </h2>
          <StaggerReveal
            className="grid grid-cols-3 gap-5 mt-10 max-[767px]:grid-cols-1"
            itemDelay={100}
          >
            {MODELS.map(({ ord, title, body, features, Icon }) => (
              <div
                key={ord}
                className="group bg-white border border-hairline rounded-card px-7 py-7 transition-all duration-base ease-standard hover:-translate-y-[3px] hover:shadow-e2 hover:border-transparent relative overflow-hidden"
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
                    {ord}
                  </span>
                </div>
                <h3 className="font-display font-medium text-heading-3 text-ink mt-3 mb-3">
                  {title}
                </h3>
                <p className="text-body-xs text-ink-2 mb-5">{body}</p>
                <ul className="space-y-2 border-t border-hairline pt-4">
                  {features.map((f) => (
                    <li key={f} className="flex gap-2 text-body-xs text-ink-muted">
                      <span className="text-teal mt-[2px] flex-none font-mono" aria-hidden="true">•</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </StaggerReveal>
        </ScrollReveal>
      </section>

      {/* ================================================================
          SKILLS COVERAGE — paper
          ================================================================ */}
      <section style={{ padding: "7rem 0" }}>
        <ScrollReveal className="wrap">
          <Eyebrow>Skills coverage</Eyebrow>
          <h2
            className="font-display font-medium text-ink mt-4"
            style={{
              fontSize: "clamp(1.75rem, 3.2vw, 2.5rem)",
              letterSpacing: "-0.025em",
            }}
          >
            Technologies we staff for
          </h2>
          <p className="text-body text-ink-2 max-w-[60ch] mt-4">
            Not "IT professionals." Specific technologies, specific domains. If it's not on this list, we'll tell you directly.
          </p>
          <StaggerReveal
            className="grid grid-cols-4 gap-8 mt-10 max-[767px]:grid-cols-2 max-[479px]:grid-cols-1"
            itemDelay={80}
          >
            {SKILLS.map(({ group, items }) => (
              <div key={group}>
                <h3 className="font-mono text-mono-sm uppercase tracking-[.08em] text-ink-muted mb-4">
                  {group}
                </h3>
                <ul className="space-y-2">
                  {items.map((item) => (
                    <li key={item} className="text-body-xs text-ink-2">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </StaggerReveal>
        </ScrollReveal>
      </section>

      {/* ================================================================
          THE BRIDGE — paper
          ================================================================ */}
      <section style={{ padding: "5rem 0" }}>
        <ScrollReveal className="wrap border-t border-hairline pt-10">
          <div className="grid grid-cols-[1fr_auto] gap-10 items-center max-[767px]:grid-cols-1">
            <div>
              <p className="font-display font-medium text-heading-4 text-ink">
                Many clients start with a team and end with a program.
              </p>
              <p className="text-body-sm text-ink-2 mt-2 max-w-[64ch]">
                What starts as embedded staff to accelerate a delivery often becomes a scoped engagement once we understand the system. We design for that transition: the team you hire from us can become the team that owns the deliverable.
              </p>
            </div>
            <Button href="/capabilities">See all capabilities</Button>
          </div>
        </ScrollReveal>
      </section>

      <CTASection />
    </>
  );
}
