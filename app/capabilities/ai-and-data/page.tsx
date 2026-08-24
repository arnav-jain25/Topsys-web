import type { Metadata } from "next";
import Link from "next/link";
import { Button, TextLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { AIArc } from "@/components/sections/AIArc";
import { CTASection } from "@/components/sections/CTASection";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { StaggerReveal } from "@/components/ui/StaggerReveal";
import { ServiceIconBadge } from "@/components/ui/ServiceIcons";

export const metadata: Metadata = {
  title: "AI & Data",
  description:
    "Data foundations, applied AI, and analytics that change what people decide. TOPSYS IT takes AI from pilot to production for enterprise and government clients.",
};

const STALLS = [
  {
    label: "Data that can't be trusted",
    body: "The model is only as good as what it's trained on and what it retrieves. Most enterprise data estates weren't built for AI: lineage is missing, ownership is unclear, and quality gates don't exist. You find this out after the pilot.",
  },
  {
    label: "No clear workflow owner",
    body: "AI that doesn't connect to a specific decision, a specific person, and a specific measure of success becomes a demo that nobody maintains. The technology worked. The organizational design didn't.",
  },
  {
    label: "Integration deferred",
    body: "The model lives next to the system of record, not inside it. Users don't adopt it because it adds a step. The handoff is the product. A model alone isn't.",
  },
  {
    label: "Governance added at the end",
    body: "Permissions, audit trails, and human checkpoints designed as an afterthought rather than an architecture decision. The result: a risk committee that won't approve production, or a production system that shouldn't have been approved.",
  },
];

/* ---- Capability icons — thin monoline, 20x20, mirrors the icon set already
   established in SiteHeader and ServicesShowcase ---- */
const IconAgentic = () => (
  <svg width="20" height="20" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <circle cx="3" cy="9" r="2" stroke="currentColor" strokeWidth="1.3" />
    <circle cx="15" cy="4.5" r="2" stroke="currentColor" strokeWidth="1.3" />
    <circle cx="15" cy="13.5" r="2" stroke="currentColor" strokeWidth="1.3" />
    <path d="M5 9h4M11.2 6.2L9 8M11.2 11.8L9 10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);
const IconConversational = () => (
  <svg width="20" height="20" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <path d="M2.5 4.5h13v8h-8L4 15v-2.5H2.5v-8z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    <path d="M5.5 7.5h7M5.5 10h4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);
const IconMultimodal = () => (
  <svg width="20" height="20" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <rect x="2" y="2" width="8" height="6" rx="1.2" stroke="currentColor" strokeWidth="1.2" />
    <path d="M2 13.5h6M2 16h9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    <circle cx="14" cy="6" r="3.2" stroke="currentColor" strokeWidth="1.2" />
    <path d="M11.5 13.5l1.4-2.4 1.3 1.6 1.8-2.7 1.5 3.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const IconAdvisory = () => (
  <svg width="20" height="20" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.3" />
    <path d="M11.5 6.5L8 8l-1.5 3.5L10 10l1.5-3.5z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
  </svg>
);
const IconGenerative = () => (
  <svg width="20" height="20" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <path d="M9 2v4M9 12v4M2 9h4M12 9h4M4.3 4.3l2.8 2.8M10.9 10.9l2.8 2.8M13.7 4.3l-2.8 2.8M7.1 10.9l-2.8 2.8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);
const IconAutomation = () => (
  <svg width="20" height="20" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <circle cx="9" cy="9" r="2.4" stroke="currentColor" strokeWidth="1.3" />
    <path d="M9 1.8v2M9 14.2v2M16.2 9h-2M3.8 9h-2M14.1 3.9l-1.4 1.4M5.3 12.7l-1.4 1.4M14.1 14.1l-1.4-1.4M5.3 5.3L3.9 3.9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);
const IconML = () => (
  <svg width="20" height="20" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <path d="M2 15V3M2 15h14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    <path d="M3.5 12l3.5-4 2.5 2.5 4.5-6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const IconDataPlatforms = () => (
  <svg width="20" height="20" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <ellipse cx="9" cy="4" rx="6" ry="2" stroke="currentColor" strokeWidth="1.2" />
    <path d="M3 4v4c0 1.1 2.7 2 6 2s6-.9 6-2V4M3 8v4c0 1.1 2.7 2 6 2s6-.9 6-2V8" stroke="currentColor" strokeWidth="1.2" />
  </svg>
);
const IconAnalytics = () => (
  <svg width="20" height="20" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <path d="M2 15V3M2 15h14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    <rect x="4.5" y="9" width="2.2" height="4" stroke="currentColor" strokeWidth="1.1" />
    <rect x="8.2" y="6" width="2.2" height="7" stroke="currentColor" strokeWidth="1.1" />
    <rect x="11.9" y="3.5" width="2.2" height="9.5" stroke="currentColor" strokeWidth="1.1" />
  </svg>
);
const IconGovernance = () => (
  <svg width="20" height="20" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <path d="M9 1.5L2 4.5V9c0 3.5 3 6.5 7 7 4-1 7-3.5 7-7V4.5L9 1.5z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    <path d="M6 9l2.5 2.5L13 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CAPS = [
  {
    title: "Agentic AI",
    body: "Multi-step systems that plan, call tools, and act toward a goal instead of answering a single prompt. Built with explicit guardrails: scoped permissions, deterministic steps where the task demands them, and a human checkpoint before anything irreversible happens.",
    Icon: IconAgentic,
  },
  {
    title: "Conversational AI",
    body: "State-driven workspaces where the conversation carries the work: a system asks clarifying questions, proposes a plan, tracks evidence as it gathers it, and routes every action through a human approval checkpoint before it executes.",
    Icon: IconConversational,
    href: "/work/conversational-incident-response",
  },
  {
    title: "Multi-modal AI",
    body: "Systems that reason across text, documents, images, and audio in a single workflow instead of treating each input type as a separate pipeline. Built for the inputs that aren't a clean text field: scanned forms, call recordings, photos, PDFs with tables and signatures.",
    Icon: IconMultimodal,
  },
  {
    title: "AI advisory",
    body: "Strategy before architecture. We map the workflows where AI changes the economics, name the ones that don't, and size what it takes to get the data ready.",
    Icon: IconAdvisory,
  },
  {
    title: "Generative AI",
    body: "Document processing, retrieval-augmented generation, and content generation, built on the models and orchestration layers that match the use case.",
    Icon: IconGenerative,
  },
  {
    title: "Intelligent automation",
    body: "Document-heavy, rule-heavy, or judgment-heavy workflows where AI reduces the human cost of reading, classifying, or routing work at volume.",
    Icon: IconAutomation,
  },
  {
    title: "Machine learning",
    body: "Forecasting, anomaly detection, scoring, and recommendation systems built for production: latency budgets, retraining pipelines, monitoring, and drift detection included.",
    Icon: IconML,
  },
  {
    title: "Data platforms",
    body: "The foundation the models run on. Data modeling, pipeline architecture, quality frameworks, governance, and the contracts between producers and consumers.",
    Icon: IconDataPlatforms,
  },
  {
    title: "Analytics",
    body: "From operational reporting to self-serve analytics and executive dashboards. Metrics that connect to decisions, not metrics that cover a wall.",
    Icon: IconAnalytics,
  },
  {
    title: "AI governance",
    body: "Scoped permissions, replayable action logs, human checkpoints, and the compliance frameworks that let production AI survive an audit.",
    Icon: IconGovernance,
  },
];

const INDUSTRIES = [
  {
    sector: "Financial services",
    examples: [
      "Payment and transaction intelligence across processors",
      "Revenue forecasting and anomaly detection",
      "Real-time data pipelines under millisecond SLAs",
      "Fraud pattern modeling",
    ],
  },
  {
    sector: "State and local government",
    examples: [
      "Case management automation for health and human services",
      "Document classification for eligibility determination",
      "Data sharing across agency systems",
      "Compliance and audit-ready reporting",
    ],
  },
  {
    sector: "Telecommunications and technology",
    examples: [
      "Customer experience modeling",
      "Infrastructure event prediction",
      "GTM and revenue analytics across systems",
      "Workforce and capacity planning",
    ],
  },
];

export default function AIAndDataPage() {
  return (
    <>
      {/* ================================================================
          HERO
          ================================================================ */}
      <section
        className="relative overflow-hidden"
        style={{ padding: "6rem 0 5rem" }}
      >
        {/* Ambient glow */}
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
              { label: "AI & data" },
            ]}
          />
          <div className="mt-6">
            <ServiceIconBadge slug="ai-and-data" />
          </div>
          <Eyebrow className="mt-5">AI & data</Eyebrow>
          <h1
            className="font-display font-medium text-ink mt-4"
            style={{
              fontSize: "clamp(2rem, 4.4vw, 3.5rem)",
              lineHeight: 1.06,
              letterSpacing: "-0.03em",
              maxWidth: "22ch",
            }}
          >
            AI is an engineering problem before it's a model problem.
          </h1>
          <p className="text-lede text-ink-2 max-w-[60ch] mt-6">
            Most AI programs stall in the same place: the pilot worked, and then it met real data, real users, and real compliance requirements. We start before the model, at the workflow, the data, and the organizational design, and stay through production and scale.
          </p>
          <div className="flex gap-3 flex-wrap mt-10">
            <Button href="/contact?re=ai">Discuss your AI use case</Button>
            <Button href="#engagement" variant="secondary">
              How engagements run
            </Button>
          </div>
        </ScrollReveal>
      </section>

      {/* ================================================================
          WHERE AI STALLS — inverted, naming failure modes
          ================================================================ */}
      <section className="on-field" style={{ padding: "6rem 0" }}>
        <ScrollReveal className="wrap">
          <Eyebrow dark>Where enterprise AI stalls</Eyebrow>
          <h2
            className="font-display font-medium text-on-field mt-4"
            style={{
              fontSize: "clamp(1.75rem, 3.2vw, 2.5rem)",
              letterSpacing: "-0.025em",
              maxWidth: "28ch",
            }}
          >
            The failure modes are predictable. Most firms won't say them out loud.
          </h2>
          <StaggerReveal
            className="grid grid-cols-2 gap-6 mt-12 max-[767px]:grid-cols-1"
            itemDelay={80}
          >
            {STALLS.map(({ label, body }) => (
              <div
                key={label}
                className="border-t border-field-hairline pt-5"
              >
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
          CAPABILITY BLOCKS — numbered register layout
          ================================================================ */}
      <section style={{ padding: "7rem 0" }}>
        <ScrollReveal className="wrap">
          <Eyebrow>What we deliver</Eyebrow>
          <h2
            className="font-display font-medium text-ink mt-4"
            style={{
              fontSize: "clamp(1.75rem, 3.2vw, 2.5rem)",
              letterSpacing: "-0.025em",
            }}
          >
            Ten capabilities, one engineering standard
          </h2>

          <div className="mt-12 border-t border-hairline">
            {CAPS.map(({ title, body, Icon, href }, i) => {
              const rowInner = (
                <>
                  {/* Teal left accent — extends on hover */}
                  <span
                    className="absolute left-0 top-0 bottom-0 w-[3px] bg-teal scale-y-0 origin-top transition-transform duration-base ease-standard group-hover:scale-y-100"
                    aria-hidden="true"
                  />
                  <div className="py-7 pl-5 max-[767px]:pl-0 flex items-start gap-8 max-[767px]:gap-4">
                    {/* Ordinal — hidden on mobile */}
                    <span
                      className="font-mono leading-none font-medium select-none flex-none w-12 transition-colors duration-fast ease-standard group-hover:text-teal max-[767px]:hidden"
                      style={{ fontSize: "clamp(1.6rem, 2.4vw, 2.2rem)", color: "var(--color-hairline-strong)" }}
                      aria-hidden="true"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    {/* Icon + title */}
                    <div className="flex items-start gap-3 pt-1 w-[13rem] flex-none max-[767px]:w-auto max-[767px]:flex-1">
                      <span className="text-teal flex-none mt-0.5">
                        <Icon />
                      </span>
                      <h3 className="font-display font-medium text-ink group-hover:text-teal transition-colors duration-fast ease-standard" style={{ fontSize: "clamp(1rem, 1.3vw, 1.15rem)", lineHeight: 1.3 }}>
                        {title}
                      </h3>
                    </div>

                    {/* Body */}
                    <p className="text-body-xs text-ink-2 flex-1 max-[767px]:hidden">{body}</p>

                    {/* Link indicator */}
                    {href && (
                      <span className="font-mono text-teal text-mono-xs pt-1 flex-none" aria-hidden="true">→</span>
                    )}
                  </div>
                  {/* Body on mobile — separate row */}
                  <p className="hidden max-[767px]:block text-body-xs text-ink-2 px-0 pb-5">{body}</p>
                </>
              );

              const rowClass = "group relative border-b border-hairline transition-colors duration-fast ease-standard hover:bg-surface block";

              return href ? (
                <Link key={title} href={href} className={rowClass}>
                  {rowInner}
                </Link>
              ) : (
                <div key={title} className={rowClass}>
                  {rowInner}
                </div>
              );
            })}
          </div>
        </ScrollReveal>
      </section>

      {/* ================================================================
          ENGAGEMENT ARC — inverted, expanded
          ================================================================ */}
      <section id="engagement" className="on-field" style={{ padding: "7rem 0" }}>
        <ScrollReveal className="wrap">
          <Eyebrow dark>How AI engagements run</Eyebrow>
          <h2
            className="font-display font-medium text-on-field mt-4"
            style={{
              fontSize: "clamp(1.75rem, 3.2vw, 2.5rem)",
              letterSpacing: "-0.025em",
              maxWidth: "28ch",
            }}
          >
            Seven stages. Each one earns the next.
          </h2>
          <p className="text-body text-on-field-2 max-w-[62ch] mt-4">
            We don't skip to Build. Strategy defines what's worth building. Data defines what's feasible. Governance defines what's approvable. The model is step five of seven.
          </p>
          <AIArc />
          <div className="mt-16">
            <Button href="/contact?re=ai">Talk about your use case</Button>
          </div>
        </ScrollReveal>
      </section>

      {/* ================================================================
          TECHNOLOGY STACK — paper
          ================================================================ */}
      <section style={{ padding: "7rem 0" }}>
        <ScrollReveal className="wrap">
          <Eyebrow>Technology</Eyebrow>
          <h2
            className="font-display font-medium text-ink mt-4"
            style={{
              fontSize: "clamp(1.75rem, 3.2vw, 2.5rem)",
              letterSpacing: "-0.025em",
            }}
          >
            Named platforms, not marketing language
          </h2>
          <p className="text-body text-ink-2 max-w-[62ch] mt-4">
            We select the stack the use case demands, not the one we already know. The list below reflects what our teams have delivered in production.
          </p>

          <div className="mt-10 border-t border-hairline">
            {[
              {
                category: "Data platforms",
                tools: ["Snowflake", "BigQuery", "Databricks", "Redshift", "Azure Synapse"],
              },
              {
                category: "Pipelines & orchestration",
                tools: ["Apache Kafka", "Apache Spark", "dbt", "Airflow", "Glue"],
              },
              {
                category: "AI / ML",
                tools: ["OpenAI API", "LangChain", "SageMaker", "Vertex AI", "Hugging Face"],
              },
              {
                category: "Visualization",
                tools: ["Power BI", "Looker", "Tableau"],
              },
            ].map(({ category, tools }) => (
              <div key={category} className="py-7 border-b border-hairline grid grid-cols-[180px_1fr] gap-8 items-baseline max-[600px]:grid-cols-1 max-[600px]:gap-2">
                <p className="font-mono text-mono-xs uppercase tracking-[.09em] text-ink-muted">{category}</p>
                <div className="flex flex-wrap gap-2">
                  {tools.map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center px-3 py-1 rounded-control border border-hairline font-mono text-mono-xs text-ink-2 tracking-[.04em]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* ================================================================
          USE CASES BY INDUSTRY — paper
          ================================================================ */}
      <section
        className="bg-surface"
        style={{ padding: "7rem 0" }}
      >
        <ScrollReveal className="wrap">
          <Eyebrow>By industry</Eyebrow>
          <h2
            className="font-display font-medium text-ink mt-4"
            style={{
              fontSize: "clamp(1.75rem, 3.2vw, 2.5rem)",
              letterSpacing: "-0.025em",
            }}
          >
            Where we've delivered
          </h2>
          <StaggerReveal
            className="grid grid-cols-3 gap-8 mt-10 max-[767px]:grid-cols-1"
            itemDelay={100}
          >
            {INDUSTRIES.map(({ sector, examples }) => (
              <div key={sector}>
                <h3 className="font-display font-medium text-heading-4 text-ink pb-3 border-b border-hairline mb-5">
                  {sector}
                </h3>
                <ul className="space-y-3">
                  {examples.map((ex) => (
                    <li
                      key={ex}
                      className="text-body-xs text-ink-2 flex gap-2 items-start"
                    >
                      <span className="text-teal mt-[2px] flex-none" aria-hidden="true">
                        •
                      </span>
                      {ex}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </StaggerReveal>
        </ScrollReveal>
      </section>

      {/* ================================================================
          FEATURED CASE — inverted
          ================================================================ */}
      <section className="on-field" style={{ padding: "7rem 0" }}>
        <ScrollReveal className="wrap">
          <Eyebrow dark>Case study</Eyebrow>
          <h2
            className="font-display font-medium text-on-field mt-4"
            style={{
              fontSize: "clamp(1.75rem, 3.2vw, 2.5rem)",
              letterSpacing: "-0.025em",
            }}
          >
            Proof, not positioning.
          </h2>
          <StaggerReveal
            className="mt-10 grid grid-cols-2 gap-8 max-[767px]:grid-cols-1"
            itemDelay={120}
          >
            <div
              className="rounded-panel border border-field-hairline px-8 py-8 flex flex-col"
              style={{ background: "linear-gradient(160deg,#123F4A,#0B2F38)" }}
            >
              <p className="font-mono text-mono-xs uppercase tracking-[.09em] text-signal mb-4">
                Financial services · Conversational AI
              </p>
              <h3 className="font-display font-medium text-heading-3 text-on-field mb-3">
                A conversational AI platform for security incident response
              </h3>
              <p className="text-body-xs text-on-field-2 flex-1">
                Investigation, evidence and decisions lived in separate tools with no shared record of the reasoning behind an action. We built a conversation-first AI platform that investigates, weighs hypotheses against evidence, and routes every recommendation through human approval.
              </p>
              <div className="mt-5 pt-4 border-t border-field-hairline flex gap-5 flex-wrap font-mono text-mono-sm text-on-field-2">
                <span>React</span>
                <span>LLM orchestration</span>
              </div>
              <div className="mt-5">
                <TextLink href="/work/conversational-incident-response">Read the case</TextLink>
              </div>
            </div>
            <div
              className="rounded-panel border border-field-hairline px-8 py-8 flex flex-col"
              style={{ background: "linear-gradient(160deg,#123F4A,#0B2F38)" }}
            >
              <p className="font-mono text-mono-xs uppercase tracking-[.09em] text-signal mb-4">
                Technology · Enterprise
              </p>
              <h3 className="font-display font-medium text-heading-3 text-on-field mb-3">
                Unified revenue intelligence across five go-to-market systems
              </h3>
              <p className="text-body-xs text-on-field-2 flex-1">
                CRM, HR, quoting, payments and financials with no single view of revenue. We built a centralized BigQuery data lake with optimized ETL/ELT pipelines, then layered predictive forecasting, anomaly detection, and automation on top.
              </p>
              <div className="mt-5 pt-4 border-t border-field-hairline flex gap-5 flex-wrap font-mono text-mono-sm text-on-field-2">
                <span>BigQuery</span>
                <span>ETL/ELT</span>
                <b className="text-signal font-normal">5 systems unified</b>
              </div>
              <div className="mt-5">
                <TextLink href="/work/revenue-intelligence">Read the case</TextLink>
              </div>
            </div>
          </StaggerReveal>
          <div className="mt-10">
            <Button href="/work" variant="secondary">
              All case studies
            </Button>
          </div>
        </ScrollReveal>
      </section>

      <CTASection />
    </>
  );
}
