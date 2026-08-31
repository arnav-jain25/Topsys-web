import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { IndustryItemGrid } from "../_components/IndustryItemGrid";
import { IndustryCapabilityGrid } from "../_components/IndustryCapabilityGrid";

export const metadata: Metadata = {
  title: "Financial services",
  description:
    "Data platforms, application modernization, and engineering talent for financial institutions operating under SOX, PCI-DSS, and real-time payment latency requirements.",
};

const CONTEXT = [
  {
    label: "Compliance surface area",
    body: "SOX controls, PCI-DSS scope, audit exposure across every system that touches financial data. Compliance isn't a gate at the end of the project. It's a constraint on the architecture from the first sprint.",
  },
  {
    label: "Data volume at latency requirements",
    body: "Real-time payments, fraud detection windows measured in milliseconds, risk calculations that run continuously. The data architecture has to hold those SLAs, not approximate them.",
  },
  {
    label: "Regulatory reporting on aging systems",
    body: "Reporting requirements written against systems that predate those requirements by decades. Mainframes, batch jobs, proprietary data formats: the source of record is often the hardest part of the problem.",
  },
];

const CAPABILITIES = [
  {
    title: "Data platforms",
    body: "Payment data architecture, real-time streaming pipelines, and data quality engineering under latency SLAs. We build for the throughput and correctness requirements of financial data, not for the general case.",
    tech: ["Kafka", "Spark", "Snowflake", "Python", "AWS", "Azure"],
  },
  {
    title: "Application modernization",
    body: "Replacing core banking systems incrementally, in production, without stopping transaction processing. API strategy for open banking mandates. We modernize the parts that can be modernized and document the constraints that remain.",
    tech: ["Java", "Spring Boot", "REST APIs", "AWS", "Azure"],
  },
  {
    title: "Technology staff",
    body: "Senior engineers and architects who understand the regulatory context, not just the stack. Engineers who have worked inside compliance-gated delivery know how to move fast within real constraints.",
    tech: ["Java", "Python", "Spark", "SQL", "AWS"],
  },
];

const APPROACH = [
  {
    title: "Architecture under constraint",
    body: "Financial systems have hard requirements: compliance scope, audit traceability, disaster recovery targets. Commercial systems often treat these as optional. We treat them as inputs, not afterthoughts.",
  },
  {
    title: "Incremental modernization",
    body: "Big-bang replacements fail in financial services more often than in any other vertical. We modernize in slices: a payment processor here, a reporting system there, each slice adding to, not replacing, audit coverage.",
  },
  {
    title: "Data quality as an engineering discipline",
    body: "Financial data pipelines fail in quiet ways. A subtraction happens in the wrong timezone. A currency conversion uses yesterday&rsquo;s rate. We build data quality controls into the pipeline, not into the downstream reports.",
  },
];

export default function FinancialServicesPage() {
  return (
    <>
      {/* HERO — paper */}
      <section style={{ padding: "6rem 0 5rem" }}>
        <div className="wrap">
          <Breadcrumb
            items={[
              { label: "Industries", href: "/industries" },
              { label: "Financial services" },
            ]}
          />
          <Eyebrow className="mt-6">Financial services</Eyebrow>
          <h1
            className="font-display font-medium text-ink mt-4"
            style={{
              fontSize: "clamp(2rem, 4.4vw, 3.5rem)",
              lineHeight: 1.06,
              letterSpacing: "-0.03em",
              maxWidth: "22ch",
            }}
          >
            Financial systems that can&rsquo;t be tested in production demand a different build standard.
          </h1>
          <p className="text-lede text-ink-2 max-w-[60ch] mt-6">
            We build and modernize data platforms, payment systems, and core banking infrastructure for financial institutions operating under SOX, PCI-DSS, and real-time SLA requirements. Compliance is an architecture input, not a review gate.
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
            What makes financial services technology different
          </h2>
          <p className="text-body text-on-field-2 max-w-[62ch] mt-4">
            Vendors who have only built SaaS products underestimate financial services. The data correctness requirements, the compliance surface area, and the latency constraints all have to be solved together, not sequentially.
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
            Where we work in financial services
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
            Built for correctness, not just delivery
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

    </>
  );
}
