import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { CTASection } from "@/components/sections/CTASection";
import { IndustryItemGrid } from "../_components/IndustryItemGrid";
import { IndustryCapabilityGrid } from "../_components/IndustryCapabilityGrid";

export const metadata: Metadata = {
  title: "Fintech",
  description:
    "Payment infrastructure, fraud and compliance systems, and engineering talent for fintech companies shipping under PCI-DSS, SOC 2, and money transmitter regulation.",
};

const CONTEXT = [
  {
    label: "Product velocity against a fixed compliance floor",
    body: "Fintech competes on how fast it ships. PCI-DSS scope, SOC 2 controls, and state money transmitter requirements don't move at that pace. The architecture has to isolate what changes weekly from what an examiner will review annually.",
  },
  {
    label: "Payment rails with no room for silent failure",
    body: "ACH, card networks, real-time payments: each rail has its own settlement timing, reversal rules, and failure modes. A reconciliation gap that goes unnoticed for a billing cycle is a customer-facing incident, not a bug ticket.",
  },
  {
    label: "Fraud and underwriting models that run in the request path",
    body: "Risk scoring, AML screening, and identity verification have to return a decision in milliseconds, not batch overnight. The infrastructure question is throughput and latency; the model question is a separate problem entirely.",
  },
];

const CAPABILITIES = [
  {
    title: "Payments and ledger infrastructure",
    body: "Integration with card networks, ACH, and real-time payment rails. Double-entry ledger systems built for auditability first, with reconciliation and settlement logic that surfaces breaks instead of absorbing them.",
    tech: ["Java", "Kafka", "PostgreSQL", "AWS", "PCI-DSS"],
  },
  {
    title: "Fraud, risk, and compliance systems",
    body: "Real-time transaction screening, AML/KYC workflow integration, and the data pipelines that feed underwriting and risk models. Built to hold up under audit, not just under load.",
    tech: ["Python", "Kafka", "Snowflake", "SOC 2", "AML/KYC"],
  },
  {
    title: "Technology staff",
    body: "Engineers who've shipped inside payments and lending platforms know the difference between a race condition in a checkout flow and one in a content feed. That distinction is the job.",
    tech: ["Java", "Python", "Kubernetes", "AWS", "Terraform"],
  },
];

const APPROACH = [
  {
    title: "Compliance as a boundary, not a blocker",
    body: "We scope PCI-DSS and SOC 2 controls at the system boundary so product teams can iterate inside it without re-certifying every sprint. Compliance work happens once, not once per feature.",
  },
  {
    title: "Idempotency and reconciliation by default",
    body: "Every payment integration we build assumes retries, timeouts, and duplicate webhooks will happen. Idempotency keys and reconciliation jobs are part of the initial build, not a post-incident addition.",
  },
  {
    title: "Latency budgets set before the model does",
    body: "Fraud and underwriting decisions have a hard time budget set by the checkout or approval flow. We design the serving infrastructure to that budget first, then fit the model work inside it.",
  },
];

export default function FintechPage() {
  return (
    <>
      {/* HERO — paper */}
      <section style={{ padding: "6rem 0 5rem" }}>
        <div className="wrap">
          <Breadcrumb
            items={[
              { label: "Industries", href: "/industries" },
              { label: "Fintech" },
            ]}
          />
          <Eyebrow className="mt-6">Fintech</Eyebrow>
          <h1
            className="font-display font-medium text-ink mt-4"
            style={{
              fontSize: "clamp(2rem, 4.4vw, 3.5rem)",
              lineHeight: 1.06,
              letterSpacing: "-0.03em",
              maxWidth: "22ch",
            }}
          >
            Ship product weekly. Pass the audit every time.
          </h1>
          <p className="text-lede text-ink-2 max-w-[60ch] mt-6">
            We build payment infrastructure, fraud and compliance systems, and the ledger and reconciliation logic underneath fintech products operating under PCI-DSS, SOC 2, and money transmitter regulation. Compliance is scoped into the architecture, not bolted onto the release.
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
            What makes fintech technology different
          </h2>
          <p className="text-body text-on-field-2 max-w-[62ch] mt-4">
            Fintech inherits the compliance surface of financial services and the release cadence of a consumer product. Vendors who've only built one side of that underestimate the other.
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
            Where we work in fintech
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
            Built to move fast without losing the audit trail
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
