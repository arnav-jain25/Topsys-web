import type { Metadata } from "next";
import { Button, TextLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ContentToken } from "@/components/ui/ContentToken";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { AIArc } from "@/components/sections/AIArc";
import { CTASection } from "@/components/sections/CTASection";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { StaggerReveal } from "@/components/ui/StaggerReveal";

export const metadata: Metadata = {
  title: "AI & Data | TOPSYS IT",
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

const CAPS = [
  {
    title: "AI advisory",
    body: "Strategy before architecture. We map the workflows where AI changes the economics, name the ones that don't, and size what it takes to get the data ready.",
  },
  {
    title: "Generative AI",
    body: "Document processing, retrieval-augmented generation, conversational interfaces, and multi-step agents, built on the models and orchestration layers that match the use case.",
  },
  {
    title: "Intelligent automation",
    body: "Document-heavy, rule-heavy, or judgment-heavy workflows where AI reduces the human cost of reading, classifying, or routing work at volume.",
  },
  {
    title: "Machine learning",
    body: "Forecasting, anomaly detection, scoring, and recommendation systems built for production: latency budgets, retraining pipelines, monitoring, and drift detection included.",
  },
  {
    title: "Data platforms",
    body: "The foundation the models run on. Data modeling, pipeline architecture, quality frameworks, governance, and the contracts between producers and consumers.",
  },
  {
    title: "Analytics",
    body: "From operational reporting to self-serve analytics and executive dashboards. Metrics that connect to decisions, not metrics that cover a wall.",
  },
  {
    title: "AI governance",
    body: "Scoped permissions, replayable action logs, human checkpoints, and the compliance frameworks that let production AI survive an audit.",
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
          <Eyebrow className="mt-6">AI & data</Eyebrow>
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
          <Eyebrow>Where enterprise AI stalls</Eyebrow>
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
          CAPABILITY BLOCKS — paper
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
            Seven capabilities, one engineering standard
          </h2>

          <StaggerReveal
            className="grid grid-cols-3 gap-4 mt-10 max-[1023px]:grid-cols-2 max-[599px]:grid-cols-1"
            itemDelay={80}
          >
            {CAPS.map(({ title, body }, i) => (
              <div
                key={title}
                className="group border border-hairline rounded-card px-6 py-6 bg-white transition-all duration-base ease-standard hover:-translate-y-[3px] hover:shadow-e2 hover:border-transparent relative overflow-hidden"
              >
                {/* Gradient top edge on hover — one of the four permitted uses */}
                <span
                  className="absolute top-0 left-0 right-0 h-[3px] bg-signature origin-left scale-x-0 transition-transform duration-base ease-standard group-hover:scale-x-100"
                  aria-hidden="true"
                />
                <span className="font-mono text-mono-xs text-ink-muted uppercase tracking-[.08em]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display font-medium text-heading-3 text-ink mt-3 mb-2">
                  {title}
                </h3>
                <p className="text-body-xs text-ink-2">{body}</p>
              </div>
            ))}
          </StaggerReveal>
        </ScrollReveal>
      </section>

      {/* ================================================================
          CONVERSATIONAL & MULTI-MODEL AI — surface
          ================================================================ */}
      <section className="bg-surface" style={{ padding: "7rem 0" }}>
        <ScrollReveal className="wrap">
          <Eyebrow>Patterns we build on</Eyebrow>
          <h2
            className="font-display font-medium text-ink mt-4"
            style={{
              fontSize: "clamp(1.75rem, 3.2vw, 2.5rem)",
              letterSpacing: "-0.025em",
            }}
          >
            Two architectures that show up in most AI programs
          </h2>

          <StaggerReveal
            className="grid grid-cols-2 gap-5 mt-10 max-[767px]:grid-cols-1"
            itemDelay={90}
          >
            <div className="group relative rounded-panel px-8 py-8 overflow-hidden border-0 shadow-e1 transition-all duration-base ease-standard hover:-translate-y-[3px] hover:shadow-field bg-gradient-to-br from-field to-field-deep">
              <span
                className="absolute top-0 left-0 right-0 h-[3px] bg-signature origin-left scale-x-0 transition-transform duration-base ease-standard group-hover:scale-x-100"
                aria-hidden="true"
              />
              <span className="font-mono text-mono-xs uppercase tracking-[.08em] text-signal">01</span>
              <h3 className="font-display font-medium text-heading-2 text-on-field mt-3 mb-2.5">
                Conversational AI
              </h3>
              <p className="text-body-sm text-on-field-2">
                State-driven workspaces where the conversation carries the work: a system asks clarifying questions, proposes a plan, tracks evidence as it gathers it, and routes every action through a human approval checkpoint before it executes. Built for domains where the reasoning trail matters as much as the outcome: investigation, triage, and case handling.
              </p>
            </div>
            <div className="group relative rounded-card px-8 py-8 border border-hairline bg-white transition-all duration-base ease-standard hover:-translate-y-[3px] hover:shadow-e2 hover:border-transparent overflow-hidden">
              <span
                className="absolute top-0 left-0 right-0 h-[3px] bg-signature origin-left scale-x-0 transition-transform duration-base ease-standard group-hover:scale-x-100"
                aria-hidden="true"
              />
              <span className="font-mono text-mono-xs uppercase tracking-[.08em] text-ink-muted">02</span>
              <h3 className="font-display font-medium text-heading-2 text-ink mt-3 mb-2.5">
                Multi-model AI
              </h3>
              <p className="text-body-sm text-ink-2">
                Orchestration layers that route each step of a workflow to the model suited to it, rather than forcing one model to do everything. A fast, cheap model handles classification and routing; a stronger model handles reasoning and synthesis; deterministic logic handles anything that shouldn't be probabilistic at all.
              </p>
            </div>
          </StaggerReveal>
        </ScrollReveal>
      </section>

      {/* ================================================================
          ENGAGEMENT ARC — inverted, expanded
          ================================================================ */}
      <section id="engagement" className="on-field" style={{ padding: "7rem 0" }}>
        <ScrollReveal className="wrap">
          <Eyebrow>How AI engagements run</Eyebrow>
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
            <ContentToken id="CAP-STACK">
              <div className="py-8">
                <p className="text-body-xs text-ink-muted">
                  Platform and tool verification pending: see CONTENT-REGISTER.md.
                </p>
              </div>
            </ContentToken>
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
          <Eyebrow>Case study</Eyebrow>
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
                Financial services · Active
              </p>
              <h3 className="font-display font-medium text-heading-3 text-on-field mb-3">
                A single source of truth for cross-processor payment intelligence
              </h3>
              <p className="text-body-xs text-on-field-2 flex-1">
                Payment, interchange, fee, settlement and dispute data living in separate formats across two merchant processors. We designed a canonical architecture on Snowflake with automated pipelines, source-to-target mappings, and a data quality framework that eliminated reconciliation gaps.
              </p>
              <div className="mt-5 pt-4 border-t border-field-hairline flex gap-5 flex-wrap font-mono text-mono-sm text-on-field-2">
                <span>Snowflake</span>
                <span>Power BI</span>
                <b className="text-signal font-normal">
                  <ContentToken id="METRIC-01" />
                </b>
              </div>
              <div className="mt-5">
                <TextLink href="/work/payments-data">Read the case</TextLink>
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
