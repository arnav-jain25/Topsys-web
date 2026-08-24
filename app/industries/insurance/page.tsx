import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { CTASection } from "@/components/sections/CTASection";
import { IndustryItemGrid } from "../_components/IndustryItemGrid";
import { IndustryCapabilityGrid } from "../_components/IndustryCapabilityGrid";

export const metadata: Metadata = {
  title: "Insurance",
  description:
    "Claims processing, underwriting and actuarial data platforms, and policy administration modernization for carriers operating under NAIC and state insurance department reporting requirements.",
};

const CONTEXT = [
  {
    label: "Policy systems older than the regulations",
    body: "Many carriers run policy administration on mainframe systems built decades before current reporting requirements existed. The data exists, but pulling it out in the shape a regulator expects is its own engineering problem.",
  },
  {
    label: "Regulatory reporting across states",
    body: "NAIC filing standards, state insurance department requirements, and rate filing rules vary by jurisdiction. A national carrier's reporting pipeline has to reconcile fifty sets of rules against one data model.",
  },
  {
    label: "Claims and fraud on a clock",
    body: "Claims adjudication speed is a competitive factor, and fraud detection has to run inline, not as a batch job three days later. The two goals pull against each other unless the data architecture supports both.",
  },
];

const CAPABILITIES = [
  {
    title: "Claims and policy platforms",
    body: "Claims processing system integration, policy administration modernization, and underwriting workflow tooling. We work with what's already in production and modernize around the parts that can't move.",
    tech: ["Java", "Spring Boot", "REST APIs", "SQL", "AWS", "Azure"],
  },
  {
    title: "Data platforms",
    body: "Actuarial and underwriting data pipelines, fraud detection infrastructure, and regulatory reporting data marts built to NAIC and state filing formats. Built for auditability, not just throughput.",
    tech: ["Kafka", "Spark", "Snowflake", "Python", "dbt"],
  },
  {
    title: "Technology staff",
    body: "Engineers who understand actuarial data conventions and regulatory filing cycles, not just the codebase. That context is what keeps a modernization project from breaking a filing deadline.",
    tech: ["Java", "Python", "SQL", "Spark", "AWS"],
  },
];

const APPROACH = [
  {
    title: "Modernize around the mainframe, not against it",
    body: "Replacing a core policy administration system in one pass is a multi-year bet with a high failure rate. We build integration layers that expose mainframe data to modern applications while the underlying system stays in production.",
  },
  {
    title: "Reporting pipelines built for audit",
    body: "Regulatory data has to be traceable back to source, not just correct on the day it's filed. We build reporting pipelines where every transformation is logged and every number can be reconciled.",
  },
  {
    title: "Fraud detection inline, not in a batch job",
    body: "Detection that runs after a claim has already paid out is a reporting exercise, not fraud prevention. We build scoring into the claims workflow itself, at the point a decision is still reversible.",
  },
];

export default function InsurancePage() {
  return (
    <>
      {/* HERO — paper */}
      <section style={{ padding: "6rem 0 5rem" }}>
        <div className="wrap">
          <Breadcrumb
            items={[
              { label: "Industries", href: "/industries" },
              { label: "Insurance" },
            ]}
          />
          <Eyebrow className="mt-6">Insurance</Eyebrow>
          <h1
            className="font-display font-medium text-ink mt-4"
            style={{
              fontSize: "clamp(2rem, 4.4vw, 3.5rem)",
              lineHeight: 1.06,
              letterSpacing: "-0.03em",
              maxWidth: "22ch",
            }}
          >
            Policy systems built for a regulatory environment that never stops changing.
          </h1>
          <p className="text-lede text-ink-2 max-w-[60ch] mt-6">
            We build and modernize claims processing systems, underwriting and actuarial data platforms, and regulatory reporting pipelines for carriers operating under NAIC standards and state insurance department requirements.
          </p>
          <div className="flex gap-3 flex-wrap mt-10">
            <Button href="/contact?re=enterprise">Talk to us</Button>
            <Button href="/capabilities" variant="secondary">Our capabilities</Button>
          </div>
        </div>
      </section>

      {/* CONTEXT — inverted */}
      <section className="on-field" style={{ padding: "7rem 0" }}>
        <div className="wrap">
          <Eyebrow dark>The environment</Eyebrow>
          <h2
            className="font-display font-medium text-on-field mt-4"
            style={{
              fontSize: "clamp(1.75rem, 3.2vw, 2.5rem)",
              letterSpacing: "-0.025em",
              maxWidth: "28ch",
            }}
          >
            What makes insurance technology different
          </h2>
          <p className="text-body text-on-field-2 max-w-[62ch] mt-4">
            Carriers run some of the oldest production systems in any industry, against some of the most jurisdiction-specific reporting rules. Neither one is going away, so the architecture has to work with both.
          </p>
          <IndustryItemGrid
            items={CONTEXT.map(({ label, body }) => ({ heading: label, body }))}
            scheme="field"
            className="mt-12"
          />
        </div>
      </section>

      {/* WHAT WE DO — paper */}
      <section style={{ padding: "7rem 0" }}>
        <div className="wrap">
          <Eyebrow>What we do</Eyebrow>
          <h2
            className="font-display font-medium text-ink mt-4"
            style={{
              fontSize: "clamp(1.75rem, 3.2vw, 2.5rem)",
              letterSpacing: "-0.025em",
            }}
          >
            Where we work in insurance
          </h2>
          <IndustryCapabilityGrid capabilities={CAPABILITIES} />
        </div>
      </section>

      {/* APPROACH — surface */}
      <section className="bg-surface" style={{ padding: "7rem 0" }}>
        <div className="wrap">
          <Eyebrow>How we approach it</Eyebrow>
          <h2
            className="font-display font-medium text-ink mt-4"
            style={{
              fontSize: "clamp(1.75rem, 3.2vw, 2.5rem)",
              letterSpacing: "-0.025em",
              maxWidth: "30ch",
            }}
          >
            Built for audit, not just delivery
          </h2>
          <IndustryItemGrid
            items={APPROACH.map(({ title, body }) => ({ heading: title, body }))}
            scheme="light"
            className="mt-10"
          />
          <div className="mt-12 flex gap-3 flex-wrap">
            <Button href="/contact?re=enterprise">Talk to us</Button>
            <Button href="/capabilities/ai-and-data" variant="secondary">AI &amp; data capability</Button>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
